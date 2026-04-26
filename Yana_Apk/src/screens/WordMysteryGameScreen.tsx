import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Alert, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { theme } from '../tokens/theme';
import { KenteBar, GoldTitle, PopupFact, StarBurst, CornerDeco, StatPill } from '../components/TerangaComponents';
import { HangmanDrawing } from '../components/HangmanDrawing';
import { Keyboard } from '../components/Keyboard';
import { LetterSlot } from '../components/LetterSlot';
import { useMotMystereData } from '../data/reference/languages/motMystereDB';

type RootStackParamList = {
    WordMysteryHome: undefined;
    WordMysteryGame: { ethnieKey: string };
};

type Props = NativeStackScreenProps<RootStackParamList, 'WordMysteryGame'>;

const MAX_ERRORS = 7;

function WordMysteryGameScreen({ route, navigation }: Props) {
    const { ethnieKey } = route.params;
    const db = useMotMystereData();
    const ethnieData = db[ethnieKey];

    // Game State
    const [shuffledWords, setShuffledWords] = useState<any[]>(() => {
        if (!ethnieData || !ethnieData.words) return [];
        return [...ethnieData.words].sort(() => 0.5 - Math.random());
    });
    const [wordIndex, setWordIndex] = useState(0);
    const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set());
    const [errors, setErrors] = useState(0);
    const [score, setScore] = useState(0);

    const [isVictory, setIsVictory] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);
    const [showFact, setShowFact] = useState(false);
    const [hintUsed, setHintUsed] = useState(false);

    if (!ethnieData || shuffledWords.length === 0) {
        return (
            <SafeAreaView style={[styles.safeArea, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={{ color: theme.colors.gold, fontSize: 18 }}>Erreur ou données introuvables...</Text>
            </SafeAreaView>
        );
    }

    const currentWordItem = shuffledWords[wordIndex];
    // Remove accents and uppercase, allow spaces if any
    const normalizedWord = currentWordItem.word.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
    const wordLetters = new Set<string>(normalizedWord.split('').filter((c: string) => c !== ' '));

    useEffect(() => {
        checkGameStatus();
    }, [guessedLetters, errors]);

    const checkGameStatus = () => {
        if (isVictory || isGameOver) return;

        // Check loss
        if (errors >= MAX_ERRORS) {
            setIsGameOver(true);
            setTimeout(() => {
                setShowFact(true);
            }, 1000);
            return;
        }

        // Check victory
        let won = true;
        for (const letter of wordLetters) {
            if (!guessedLetters.has(letter)) {
                won = false;
                break;
            }
        }

        if (won && wordLetters.size > 0) {
            setIsVictory(true);
            setScore(prev => prev + 10 + (MAX_ERRORS - errors) * 2); // bonus for lives left
            setTimeout(() => {
                setShowFact(true);
            }, 1500);
        }
    };

    const handleKeyPress = (letter: string) => {
        if (isVictory || isGameOver || guessedLetters.has(letter)) return;

        const newGuessed = new Set(guessedLetters);
        newGuessed.add(letter);
        setGuessedLetters(newGuessed);

        if (!wordLetters.has(letter)) {
            setErrors(prev => prev + 1);
        }
    };

    const useHint = () => {
        if (hintUsed || isVictory || isGameOver) return;

        // Find a random unrevealed letter
        const unrevealed = Array.from(wordLetters).filter(l => !guessedLetters.has(l));
        if (unrevealed.length > 0) {
            const randomLetter = unrevealed[Math.floor(Math.random() * unrevealed.length)];
            handleKeyPress(randomLetter);
            setHintUsed(true);
        }
    };

    const nextWord = () => {
        setShowFact(false);
        if (wordIndex + 1 < shuffledWords.length) {
            setWordIndex(prev => prev + 1);
            resetGameState();
        } else {
            // End of ethnie words
            Alert.alert("Bravo !", "Vous avez terminé tous les mots pour cette culture.", [
                { text: "Menu", onPress: () => navigation.navigate('WordMysteryHome') }
            ]);
        }
    };

    const resetGameState = () => {
        setGuessedLetters(new Set());
        setErrors(0);
        setIsVictory(false);
        setIsGameOver(false);
        setHintUsed(false);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <KenteBar />
            <CornerDeco />

            {/* Header / Stats */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Text style={styles.backText}>◀</Text>
                </TouchableOpacity>
                <View style={styles.statsRow}>
                    <TouchableOpacity
                        style={[styles.btnHintHeader, hintUsed && styles.btnHintUsed]}
                        onPress={useHint}
                        disabled={hintUsed || isVictory || isGameOver}
                    >
                        <Text style={styles.btnHintHeaderText}>💡</Text>
                    </TouchableOpacity>
                    <StatPill icon="🏆" value={score} />
                    <StatPill icon="✦" value={MAX_ERRORS - errors} />
                </View>
            </View>

            <View style={styles.progressContainer}>
                <View style={[styles.progressBar, { width: `${((wordIndex + 1) / shuffledWords.length) * 100}%` }]} />
            </View>

            <View style={styles.titleRow}>
                <Image source={ethnieData.img} style={styles.scoreImg} />
                <GoldTitle title={ethnieData.ethnie} />
            </View>

            {/* Clue Section */}
            <View style={styles.questionBox}>
                <Text style={styles.clueLabel}>INDICE CULTUREL</Text>
                <Text style={styles.clueText}>{currentWordItem.clue}</Text>
            </View>

            {/* Animation / Graphics */}
            <HangmanDrawing errors={errors} maxErrors={MAX_ERRORS} isVictory={isVictory} />

            {/* Words rendering */}
            <View style={styles.wordContainer}>
                {normalizedWord.split('').map((char: string, index: number) => {
                    if (char === ' ') {
                        return <View key={index} style={styles.space} />;
                    }
                    const isRevealed = guessedLetters.has(char);
                    return (
                        <LetterSlot
                            key={index}
                            letter={char}
                            isRevealed={isRevealed || isVictory}
                            isGameOver={isGameOver}
                        />
                    );
                })}
            </View>



            <View style={{ flex: 1 }} />

            {/* Keyboard */}
            <Keyboard
                guessedLetters={guessedLetters}
                wordLetters={wordLetters}
                onKeyPress={handleKeyPress}
                disabled={isVictory || isGameOver}
            />

            <StarBurst isVisible={isVictory} />
            <PopupFact
                fact={currentWordItem.fact}
                isVisible={showFact}
                onClose={() => {
                    setShowFact(false);
                    // Add slight delay before moving to next word to let animation finish
                    setTimeout(isGameOver ? resetGameState : nextWord, 300);
                }}
            />
        </SafeAreaView>
    );
}

class WordMysteryErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean, error: any}> {
    constructor(props: any) {
        super(props);
        this.state = { hasError: false, error: null };
    }
    static getDerivedStateFromError(error: any) {
        return { hasError: true, error };
    }
    render() {
        if (this.state.hasError) {
            return (
                <View style={{ flex: 1, backgroundColor: 'red', justifyContent: 'center', padding: 20 }}>
                    <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Error Caught:</Text>
                    <Text style={{ color: 'white', marginTop: 10 }}>{String(this.state.error)}</Text>
                </View>
            );
        }
        return this.props.children;
    }
}

export default function WordMysteryGameScreenWithBoundary(props: Props) {
    return (
        <WordMysteryErrorBoundary>
            <WordMysteryGameScreen {...props} />
        </WordMysteryErrorBoundary>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: theme.colors.bg,
        paddingBottom: 70, // Prevents bottom tab bar from obscuring content
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 15,
        marginBottom: 10,
    },
    backBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(244, 160, 38, 0.1)',
        borderWidth: 1,
        borderColor: theme.colors.gold,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backText: {
        color: theme.colors.gold,
        fontSize: 18,
        fontWeight: 'bold',
    },
    statsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    btnHintHeader: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        borderColor: theme.colors.gold,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnHintHeaderText: {
        fontSize: 16,
    },
    progressContainer: {
        width: '90%',
        height: 6,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 3,
        alignSelf: 'center',
        marginBottom: 10,
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        backgroundColor: theme.colors.gold,
    },
    scoreImg: { width: 40, height: 40, borderRadius: 20, borderWidth: 2, borderColor: theme.colors.gold, marginRight: 10 },
    titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
    questionBox: {
        backgroundColor: theme.colors.surface,
        borderWidth: 1,
        borderColor: 'rgba(244, 160, 38, 0.5)',
        borderRadius: 15,
        padding: 15,
        marginHorizontal: 20,
        alignItems: 'center',
        marginBottom: 10,
        ...theme.shadow.gold,
    },
    clueLabel: {
        color: theme.colors.orange,
        fontFamily: theme.fonts.body,
        fontSize: 10,
        fontWeight: 'bold',
        letterSpacing: 2,
        marginBottom: 6,
    },
    clueText: {
        color: theme.colors.cream,
        fontFamily: theme.fonts.body,
        fontSize: 15,
        textAlign: 'center',
        lineHeight: 22,
    },
    wordContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        paddingHorizontal: 15,
        marginVertical: 10,
        minHeight: 60,
    },
    space: {
        width: 20,
    },
    btnHintUsed: {
        opacity: 0.3,
        borderColor: '#555',
    }
});

