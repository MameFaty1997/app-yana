import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, Animated, Dimensions, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UserState } from '../types';
import { TranslationKey } from '../translations';
import { SPACING, TYPOGRAPHY, COLORS } from '../theme';
import { quizCultureDB, QuizCultureData, QuizQuestion } from '../data/reference/languages/quizCultureDB';
import { getMemoryTerangaImage } from '../data/memoryTerangaImages';

const { width } = Dimensions.get('window');

interface QuizCultureScreenProps {
    user: UserState;
    t: (key: TranslationKey) => string;
    onClose: () => void;
}

type ScreenState = 'ETHNIE_SELECT' | 'LEVEL_SELECT' | 'PLAYING' | 'RESULT';

const QuizCultureScreen: React.FC<QuizCultureScreenProps> = ({ user, onClose }) => {
    // --- State ---
    const [screenState, setScreenState] = useState<ScreenState>('ETHNIE_SELECT');
    const [selectedEthnieId, setSelectedEthnieId] = useState<string | null>(null);
    const [selectedLevel, setSelectedLevel] = useState<'Facile' | 'Intermédiaire' | 'Expert' | null>(null);

    // Game State
    const [questions, setQuestions] = useState<QuizQuestion[]>([]);
    const [currentQIndex, setCurrentQIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [livesTotal, setLivesTotal] = useState(3);
    const [livesLeft, setLivesLeft] = useState(3);
    const [timeLeft, setTimeLeft] = useState(0);
    const [hintUsed, setHintUsed] = useState(false);
    const [showFactPopup, setShowFactPopup] = useState(false);
    const [showAnswerFact, setShowAnswerFact] = useState(false);

    // UI State for answering
    const [selectedAnswerIdx, setSelectedAnswerIdx] = useState<number | null>(null);
    const [correctAnswerIdx, setCorrectAnswerIdx] = useState<number | null>(null);
    const [isAnswering, setIsAnswering] = useState(false);

    // --- Animations ---
    const slideAnim = useRef(new Animated.Value(50)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;

    const dbList = Object.keys(quizCultureDB).map(k => ({ id: k, ...quizCultureDB[k] }));

    // Timer logic
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const startTimer = (maxTime: number) => {
        if (timerRef.current) clearInterval(timerRef.current);
        setTimeLeft(maxTime);
        timerRef.current = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timerRef.current!);
                    handleTimeout();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const stopTimer = () => {
        if (timerRef.current) clearInterval(timerRef.current);
    };

    useEffect(() => {
        return () => stopTimer();
    }, []);

    // --- Actions ---
    const handleSelectEthnie = (id: string) => {
        if (!quizCultureDB[id] || quizCultureDB[id].questions.length === 0) return;
        setSelectedEthnieId(id);
        setScreenState('LEVEL_SELECT');
    };

    const handleRandomEthnie = () => {
        const valid = dbList.filter(d => d.questions && d.questions.length > 0);
        if (valid.length > 0) {
            const rand = valid[Math.floor(Math.random() * valid.length)];
            handleSelectEthnie(rand.id);
        }
    };

    const startGame = (level: 'Facile' | 'Intermédiaire' | 'Expert') => {
        setSelectedLevel(level);
        const data = quizCultureDB[selectedEthnieId!];

        // Shuffle questions
        const shuffled = [...data.questions].sort(() => 0.5 - Math.random());
        setQuestions(shuffled);

        let maxTime = 45;
        let lives = 3;
        if (level === 'Intermédiaire') { maxTime = 30; lives = 2; }
        else if (level === 'Expert') { maxTime = 20; lives = 1; }

        setLivesTotal(lives);
        setLivesLeft(lives);
        setCurrentQIndex(0);
        setScore(0);
        setHintUsed(false);
        setScreenState('PLAYING');
        setShowFactPopup(false);
        setShowAnswerFact(false);

        loadQuestion(maxTime);
    };

    const loadQuestion = (timeToSet?: number) => {
        setSelectedAnswerIdx(null);
        setCorrectAnswerIdx(null);
        setIsAnswering(false);

        // Animations
        slideAnim.setValue(50);
        fadeAnim.setValue(0);
        Animated.parallel([
            Animated.timing(slideAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
            Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true })
        ]).start();

        const maxTime = selectedLevel === 'Facile' ? 45 : (selectedLevel === 'Intermédiaire' ? 30 : 20);
        startTimer(timeToSet || maxTime);
    };

    const handleTimeout = () => {
        if (isAnswering) return;
        setIsAnswering(true);
        const actualCorrect = questions[currentQIndex].correct;
        setCorrectAnswerIdx(actualCorrect);

        setLivesLeft(prev => {
            const newLives = prev - 1;
            setTimeout(() => setShowAnswerFact(true), 1200);
            return newLives;
        });
    };

    const handleAnswer = (idx: number) => {
        if (isAnswering) return;
        setIsAnswering(true);
        stopTimer();

        setSelectedAnswerIdx(idx);
        const actualCorrect = questions[currentQIndex].correct;
        setCorrectAnswerIdx(actualCorrect);

        if (idx === actualCorrect) {
            setScore(s => s + 1);
            setTimeout(() => setShowAnswerFact(true), 1200);
        } else {
            setLivesLeft(prev => {
                const newLives = prev - 1;
                setTimeout(() => setShowAnswerFact(true), 1200);
                return newLives;
            });
        }
    };

    const continueAfterFact = () => {
        setShowAnswerFact(false);
        if (livesLeft <= 0) {
            setScreenState('RESULT');
        } else {
            nextQuestion();
        }
    };

    const nextQuestion = () => {
        setCurrentQIndex(prev => {
            const nextIdx = prev + 1;
            // Endless mode: If we run out of unique questions, shuffle and restart the pool
            if (nextIdx >= questions.length) {
                setQuestions(prevQ => [...prevQ].sort(() => 0.5 - Math.random()));
                return 0;
            }
            return nextIdx;
        });
    };

    // Load next question whenever index changes and we are playing
    useEffect(() => {
        if (screenState === 'PLAYING' && livesLeft > 0) {
            const maxTime = selectedLevel === 'Facile' ? 45 : (selectedLevel === 'Intermédiaire' ? 30 : 20);
            loadQuestion(maxTime);
        }
    }, [currentQIndex]);

    const handleUseHint = () => {
        if (hintUsed || isAnswering) return;
        setHintUsed(true);
        setShowFactPopup(true);
    };

    // --- Renderers ---

    const renderHeader = (title: string, subtitle: string) => (
        <View style={styles.headerArea}>
            <TouchableOpacity style={styles.btnHome} onPress={onClose}>
                <Text style={{ fontSize: 16 }}>🏠</Text>
            </TouchableOpacity>
            <Text style={styles.mainTitle}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
    );

    const renderEthnieSelect = () => (
        <View style={styles.fullScreen}>
            {renderHeader("Quiz Culture Teranga", "Quelle culture veux-tu découvrir ?")}
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.grid}>
                    {dbList.map((ethnie) => (
                        <TouchableOpacity key={ethnie.id} style={styles.card} onPress={() => handleSelectEthnie(ethnie.id)} activeOpacity={0.8}>
                            <Image source={getMemoryTerangaImage(ethnie.img)} style={styles.cardImg} />
                            <Text style={styles.cardName}>{ethnie.ethnie}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <TouchableOpacity style={styles.btnPrimary} onPress={handleRandomEthnie}>
                    <Text style={styles.btnPrimaryText}>Choisir au hasard</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );

    const renderLevelSelect = () => {
        if (!selectedEthnieId) return null;
        const data = quizCultureDB[selectedEthnieId];
        return (
            <View style={styles.fullScreen}>
                {renderHeader("Quiz Culture Teranga", "Choisis ton niveau")}
                <View style={styles.levelContainer}>
                    <Image source={getMemoryTerangaImage(data.img)} style={styles.levelHeroImg} />
                    <Text style={styles.levelHeroName}>{data.ethnie}</Text>

                    {[
                        { id: 'Facile', icon: '🌱', time: '45s', lives: '3 Vies' },
                        { id: 'Intermédiaire', icon: '🌳', time: '30s', lives: '2 Vies' },
                        { id: 'Expert', icon: '🦁', time: '20s', lives: '1 Vie' }
                    ].map(lvl => (
                        <TouchableOpacity key={lvl.id} style={styles.btnLevel} onPress={() => startGame(lvl.id as any)}>
                            <Text style={styles.btnLevelTitle}>{lvl.icon} {lvl.id}</Text>
                            <Text style={styles.btnLevelDesc}>{lvl.time}  ·  {lvl.lives}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        );
    };

    const renderPlaying = () => {
        if (!selectedEthnieId || questions.length === 0) return null;
        const data = quizCultureDB[selectedEthnieId];
        const q = questions[currentQIndex];

        // Timer color logic
        const maxTime = selectedLevel === 'Facile' ? 45 : (selectedLevel === 'Intermédiaire' ? 30 : 20);
        let timerColor = COLORS.success;
        if (timeLeft <= 5) timerColor = COLORS.error;
        else if (timeLeft <= maxTime / 2) timerColor = COLORS.primary;

        const progressWidth = ((currentQIndex) / questions.length) * 100;

        return (
            <View style={styles.fullScreen}>
                {/* Top Info Bar */}
                <View style={styles.gameTopBar}>
                    <View style={styles.livesRow}>
                        {Array.from({ length: livesTotal }).map((_, i) => (
                            <Text key={i} style={[styles.lifeIcon, i >= livesLeft && styles.lifeLost]}>✦</Text>
                        ))}
                    </View>
                    <View style={styles.scoreRow}>
                        <Image source={getMemoryTerangaImage(data.img)} style={styles.scoreImg} />
                        <Text style={styles.scoreText}>Score: {score}</Text>
                    </View>
                </View>

                {/* Progress (Now visual indicator for the current question in the pool) */}
                <View style={styles.progressContainer}>
                    <View style={[styles.progressBar, { width: `${progressWidth}%` }]} />
                </View>

                {/* Question Area */}
                <Animated.View style={[styles.questionBox, { transform: [{ translateY: slideAnim }], opacity: fadeAnim }]}>
                    <Text style={[styles.timerText, { color: timerColor }]}>{timeLeft}</Text>
                    <Text style={styles.questionText}>{q.question}</Text>
                </Animated.View>

                {/* Answers Area */}
                <View style={styles.answersContainer}>
                    {q.answers.map((ans, idx) => {
                        let btnStyle = styles.btnAnswer;
                        let textStyle = styles.btnAnswerText;

                        if (isAnswering) {
                            if (idx === correctAnswerIdx) {
                                btnStyle = [styles.btnAnswer, styles.btnAnswerCorrect] as any;
                                textStyle = [styles.btnAnswerText, { color: 'white' }] as any;
                            } else if (idx === selectedAnswerIdx && idx !== correctAnswerIdx) {
                                btnStyle = [styles.btnAnswer, styles.btnAnswerWrong] as any;
                                textStyle = [styles.btnAnswerText, { color: 'white' }] as any;
                            } else {
                                // Dim others
                                btnStyle = [styles.btnAnswer, { opacity: 0.5 }] as any;
                            }
                        }

                        return (
                            <TouchableOpacity
                                key={idx}
                                style={btnStyle}
                                onPress={() => handleAnswer(idx)}
                                disabled={isAnswering}
                                activeOpacity={0.7}
                            >
                                <Text style={[textStyle, { color: isAnswering && (idx === correctAnswerIdx || idx === selectedAnswerIdx) ? 'white' : COLORS.gold }]}>✦</Text>
                                <Text style={textStyle} numberOfLines={2} adjustsFontSizeToFit>{ans}</Text>
                                <Text style={[textStyle, { color: isAnswering && (idx === correctAnswerIdx || idx === selectedAnswerIdx) ? 'white' : COLORS.gold }]}>✦</Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {/* Hint Button */}
                <TouchableOpacity
                    style={[styles.btnHint, hintUsed && styles.btnHintUsed]}
                    onPress={handleUseHint}
                    disabled={hintUsed || isAnswering}
                >
                    <Text style={styles.btnHintText}>💡</Text>
                </TouchableOpacity>

                {/* Fact Popup (Hint) */}
                {showFactPopup && (
                    <View style={styles.factPopup}>
                        <Text style={styles.factTitle}>💡 Indice</Text>
                        <Text style={styles.factText}>{q.hint || "Pas d'indice"}</Text>
                        <TouchableOpacity style={styles.btnPrimary} onPress={() => setShowFactPopup(false)}>
                            <Text style={styles.btnPrimaryText}>Fermer</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {/* Answer Fact Popup */}
                {showAnswerFact && (
                    <View style={styles.factPopup}>
                        <Text style={styles.factTitle}>{selectedAnswerIdx === correctAnswerIdx ? "✅ Bonne réponse !" : "❌ Mauvaise réponse..."}</Text>
                        <Text style={styles.factText}>{q.fact || "Pas d'explication disponible."}</Text>
                        <TouchableOpacity style={styles.btnPrimary} onPress={continueAfterFact}>
                            <Text style={styles.btnPrimaryText}>Continuer</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        );
    };

    const renderResult = () => {
        if (!selectedEthnieId) return null;

        // Endless mode: Since they can go forever, their score can exceed the total questions.
        let icon = score >= questions.length ? "🏆" : (score > 0 ? "🌍" : "💔");
        let titleColor = score >= questions.length ? COLORS.gold : (score > 0 ? COLORS.primary : COLORS.error);
        let title = score >= questions.length ? "Brillant !" : (score > 0 ? "Bien joué !" : "Plus de vies");

        // Get fact from last played question if possible
        const lastQ = questions[currentQIndex < questions.length ? currentQIndex : currentQIndex - 1];
        const factText = lastQ ? lastQ.fact : "Continuez à découvrir les richesses du Sénégal !";

        return (
            <View style={styles.fullScreen}>
                <View style={styles.resultContainer}>
                    <Text style={styles.resultIcon}>{icon}</Text>
                    <Text style={[styles.resultTitle, { color: titleColor }]}>{title}</Text>
                    <Text style={styles.resultScore}>Score Final: {score}</Text>

                    <Text style={styles.resultFact}>Le saviez-vous ? {factText}</Text>

                    <TouchableOpacity style={[styles.btnPrimary, { width: '100%', marginBottom: 15 }]} onPress={() => startGame(selectedLevel!)}>
                        <Text style={styles.btnPrimaryText}>Rejouer cette ethnie</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btnLevel, { justifyContent: 'center' }]} onPress={() => setScreenState('ETHNIE_SELECT')}>
                        <Text style={[styles.btnLevelTitle, { color: COLORS.gold }]}>Choisir une autre ethnie</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.kenteBar} />
            {screenState === 'ETHNIE_SELECT' && renderEthnieSelect()}
            {screenState === 'LEVEL_SELECT' && renderLevelSelect()}
            {screenState === 'PLAYING' && renderPlaying()}
            {screenState === 'RESULT' && renderResult()}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a0e05',
    },
    // Adding a repeating linear gradient via images or simple views is complex in pure RN without expo-linear-gradient repeat.
    // For now we use a solid gold bar that mimics the top styling intent.
    kenteBar: {
        height: 8,
        width: '100%',
        backgroundColor: COLORS.gold,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 5,
    },
    fullScreen: {
        flex: 1,
        paddingHorizontal: SPACING.md,
        paddingBottom: SPACING.xl
    },
    headerArea: {
        alignItems: 'center',
        paddingVertical: SPACING.lg,
        position: 'relative'
    },
    btnHome: {
        position: 'absolute',
        top: SPACING.lg,
        right: 0,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(232, 93, 4, 0.2)',
        borderWidth: 1,
        borderColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10
    },
    mainTitle: {
        fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif-condensed',
        fontSize: 24,
        color: COLORS.gold,
        textAlign: 'center',
        marginBottom: 5,
        textShadowColor: 'rgba(0,0,0,0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    subtitle: {

        fontSize: 14,
        color: '#c4a882',
        textAlign: 'center'
    },
    scrollContent: {
        alignItems: 'center',
        paddingBottom: 40
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: SPACING.md
    },
    card: {
        width: (width - SPACING.md * 2 - 20) / 3, // 3 cols
        backgroundColor: '#241508',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.gold,
        marginBottom: 15,
        overflow: 'hidden',
    },
    cardImg: {
        width: '100%',
        height: 70,
        resizeMode: 'contain',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(244, 160, 38, 0.3)',
    },
    cardName: {
        fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif-condensed',
        color: '#fbbf24',
        fontSize: 10,
        textAlign: 'center',
        paddingVertical: 8,
        fontWeight: 'bold'
    },
    btnPrimary: {
        backgroundColor: COLORS.primary, // Fallback gradient via design
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        marginTop: 20,
        shadowColor: COLORS.primary,
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 4
    },
    btnPrimaryText: {
        color: '#1a0e05',

        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center'
    },
    levelContainer: {
        flex: 1,
        alignItems: 'center',
        paddingTop: SPACING.xl
    },
    levelHeroImg: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 3,
        borderColor: COLORS.gold,
        marginBottom: 15
    },
    levelHeroName: {
        fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif-condensed',
        fontSize: 24,
        color: COLORS.gold,
        marginBottom: 30
    },
    btnLevel: {
        width: '100%',
        backgroundColor: '#241508',
        borderWidth: 2,
        borderColor: COLORS.primary,
        borderRadius: 12,
        padding: 15,
        marginBottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    btnLevelTitle: {

        fontSize: 16,
        fontWeight: 'bold',
        color: '#fdf3e3'
    },
    btnLevelDesc: {

        fontSize: 12,
        color: '#c4a882'
    },
    gameTopBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: SPACING.lg,
        marginBottom: SPACING.md
    },
    livesRow: {
        flexDirection: 'row',
        gap: 5
    },
    lifeIcon: {
        color: COLORS.gold,
        fontSize: 20
    },
    lifeLost: {
        opacity: 0.2
    },
    scoreRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    scoreImg: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: COLORS.gold
    },
    scoreText: {
        color: '#fdf3e3',
        fontWeight: 'bold',
        fontSize: 16
    },
    progressContainer: {
        width: '100%',
        height: 6,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 3,
        marginBottom: SPACING.xl,
        overflow: 'hidden'
    },
    progressBar: {
        height: '100%',
        backgroundColor: COLORS.gold
    },
    questionBox: {
        backgroundColor: '#241508',
        borderWidth: 1,
        borderColor: 'rgba(244, 160, 38, 0.5)',
        borderRadius: 15,
        padding: 20,
        alignItems: 'center',
        marginBottom: SPACING.xl
    },
    timerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10
    },
    questionText: {

        fontSize: 16,
        color: '#fdf3e3',
        fontWeight: 'bold',
        textAlign: 'center',
        lineHeight: 24
    },
    answersContainer: {
        width: '100%',
        gap: 12
    },
    btnAnswer: {
        backgroundColor: '#fdf3e3',
        borderRadius: 50,
        paddingVertical: 15,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12
    },
    btnAnswerCorrect: {
        backgroundColor: COLORS.success,
    },
    btnAnswerWrong: {
        backgroundColor: COLORS.error,
    },
    btnAnswerText: {

        fontSize: 14,
        fontWeight: 'bold',
        color: '#1a0e05',
        textAlign: 'center',
        flex: 1,
        paddingHorizontal: 10
    },
    btnHint: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#241508',
        borderWidth: 2,
        borderColor: COLORS.primary,
        alignSelf: 'center',
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnHintUsed: {
        opacity: 0.3,
        borderColor: '#555'
    },
    btnHintText: {
        fontSize: 24
    },
    factPopup: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: 'rgba(26, 14, 5, 0.98)',
        borderWidth: 2,
        borderColor: COLORS.gold,
        borderRadius: 15,
        padding: 20,
        alignItems: 'center',
        zIndex: 100
    },
    factTitle: {
        fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif-condensed',
        color: COLORS.primary,
        fontSize: 16,
        marginBottom: 10
    },
    factText: {

        color: '#fdf3e3',
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 15
    },
    resultContainer: {
        flex: 1,
        backgroundColor: '#241508',
        borderWidth: 3,
        borderColor: COLORS.gold,
        borderRadius: 20,
        marginTop: 40,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    resultIcon: {
        fontSize: 60,
        marginBottom: 10
    },
    resultTitle: {
        fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif-condensed',
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10
    },
    resultScore: {

        fontSize: 18,
        color: '#fdf3e3',
        fontWeight: 'bold',
        marginBottom: 20
    },
    resultFact: {

        fontSize: 14,
        color: '#fbbf24',
        fontStyle: 'italic',
        textAlign: 'center',
        marginBottom: 30,
        lineHeight: 20
    }
});

export default QuizCultureScreen;
