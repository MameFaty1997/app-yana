import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, Animated, Dimensions, ScrollView, Platform, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UserState } from '../types';
import { TranslationKey } from '../translations';
import { theme } from '../tokens/theme';
import { KenteBar, GoldTitle, CornerDeco, StatPill } from '../components/TerangaComponents';
import { audioService } from '../services/audioService';
import { motMystereDB } from '../data/reference/languages/motMystereDB';

const { width } = Dimensions.get('window');
const IMAGE_SIZE = (width - 70) / 2;
const SPACING = { md: 16, lg: 24, xl: 32 };

const PUZZLES = [
    {
        id: '1', fr: 'Eau', 
        translations: { wolof: 'NDOX', peulh: 'NDIYAN', serere: 'FOFO', diola: 'MUNEN', mandinka: 'JIYO', soninke: 'JI', balante: 'MIN', manjack: 'ME', mankagne: 'MIN', bassari: 'MEN', bambara: 'JI', bainouk: 'MUN' },
        images: [ require('../../assets/games/four_images/ndox_1.png'), require('../../assets/games/four_images/ndox_2.png'), require('../../assets/games/four_images/ndox_3.png'), require('../../assets/games/four_images/ndox_4.png') ]
    },
    {
        id: '2', fr: 'Maison', 
        translations: { wolof: 'KER', peulh: 'SUUDU', serere: 'MBIND', diola: 'ELUP', mandinka: 'SUO', soninke: 'KA', balante: 'BIF', manjack: 'UCAK', mankagne: 'PEX', bassari: 'BAP', bambara: 'SO', bainouk: 'BINK' },
        images: [ require('../../assets/games/four_images/ker_1.png'), require('../../assets/games/four_images/ker_2.png'), require('../../assets/games/four_images/ker_3.png'), require('../../assets/games/four_images/ker_4.png') ]
    },
    {
        id: '3', fr: 'Riz', 
        translations: { wolof: 'CEEB', peulh: 'MAARO', serere: 'MAALO', diola: 'EMANO', mandinka: 'MANO', soninke: 'MARO', balante: 'MAN', manjack: 'MAN', mankagne: 'MAN', bassari: 'MAR', bambara: 'MALO', bainouk: 'CEEB' },
        images: [ require('../../assets/games/four_images/ceeb_1.png'), require('../../assets/games/four_images/ceeb_2.png'), require('../../assets/games/four_images/ceeb_3.png'), require('../../assets/games/four_images/ceeb_4.png') ]
    },
    {
        id: '4', fr: 'Soleil', 
        translations: { wolof: 'NAJJ', peulh: 'NAANGE', serere: 'NAANG', diola: 'UNAY', mandinka: 'TILOO', soninke: 'KIINE', balante: 'TEN', manjack: 'TAN', mankagne: 'TEN', bassari: 'TEN', bambara: 'TELE', bainouk: 'TEN' },
        images: [ require('../../assets/games/four_images/najj_1.png'), require('../../assets/games/four_images/najj_2.png'), require('../../assets/games/four_images/najj_3.png'), require('../../assets/games/four_images/najj_4.png') ]
    },
    {
        id: '5', fr: 'Pain', 
        translations: { wolof: 'MBURU', peulh: 'MBURU', serere: 'MBURU', diola: 'MBURU', mandinka: 'MBURU', soninke: 'MBURU', balante: 'MBURU', manjack: 'MBURU', mankagne: 'MBURU', bassari: 'BURU', bambara: 'BURU', bainouk: 'MBURU' },
        images: [ require('../../assets/games/four_images/mburu_1.png'), require('../../assets/games/four_images/mburu_2.png'), require('../../assets/games/four_images/mburu_3.png'), require('../../assets/games/four_images/mburu_4.png') ]
    },
    {
        id: '6', fr: 'Feu', 
        translations: { wolof: 'SAFARA', peulh: 'YITE', serere: 'KIM', diola: 'SAMP', mandinka: 'DIMBA', soninke: 'XULLU', balante: 'KID', manjack: 'XAF', mankagne: 'KIM', bassari: 'KIM', bambara: 'TASA', bainouk: 'KIM' },
        images: [ require('../../assets/games/four_images/safara_1.png'), require('../../assets/games/four_images/safara_2.png'), require('../../assets/games/four_images/safara_3.png'), require('../../assets/games/four_images/safara_4.png') ]
    },
    {
        id: '7', fr: 'Mer', 
        translations: { wolof: 'GEEJ', peulh: 'MAAYO', serere: 'NDOXOM', diola: 'GEEJ', mandinka: 'BAA', soninke: 'XAE', balante: 'MAR', manjack: 'GEEJ', mankagne: 'GEEJ', bassari: 'BAA', bambara: 'BAA', bainouk: 'GEEJ' },
        images: [ require('../../assets/games/four_images/geej_1.png'), require('../../assets/games/four_images/geej_2.png'), require('../../assets/games/four_images/geej_3.png'), require('../../assets/games/four_images/geej_4.png') ]
    },
    {
        id: '8', fr: 'Oeuf', 
        translations: { wolof: 'NEN', peulh: 'BOCCOONDE', serere: 'NEN', diola: 'ECIL', mandinka: 'KILOO', soninke: 'XALLU', balante: 'KIL', manjack: 'NEN', mankagne: 'NEN', bassari: 'NEN', bambara: 'KILI', bainouk: 'NEN' },
        images: [ require('../../assets/games/four_images/nen_1.png'), require('../../assets/games/four_images/nen_2.png'), require('../../assets/games/four_images/nen_3.png'), require('../../assets/games/four_images/nen_4.png') ]
    },
    {
        id: '9', fr: 'Poisson', 
        translations: { wolof: 'JEN', peulh: 'LIINGU', serere: 'LIP', diola: 'EJA', mandinka: 'NYEO', soninke: 'NYEXEE', balante: 'LUX', manjack: 'JEN', mankagne: 'JEN', bassari: 'JEX', bambara: 'JEGE', bainouk: 'JEN' },
        images: [ require('../../assets/games/four_images/jenn_1.png'), require('../../assets/games/four_images/jenn_2.png'), require('../../assets/games/four_images/jenn_3.png'), require('../../assets/games/four_images/jenn_4.png') ]
    },
    {
        id: '10', fr: 'Viande', 
        translations: { wolof: 'YAPP', peulh: 'TEW', serere: 'YAP', diola: 'EBE', mandinka: 'SUBOO', soninke: 'TIIYE', balante: 'YAP', manjack: 'YAP', mankagne: 'YAP', bassari: 'YAP', bambara: 'SOGO', bainouk: 'YAP' },
        images: [ require('../../assets/games/four_images/yapp_1.png'), require('../../assets/games/four_images/yapp_2.png'), require('../../assets/games/four_images/yapp_3.png'), require('../../assets/games/four_images/yapp_4.png') ]
    },
    {
        id: '11', fr: 'Chat', 
        translations: { wolof: 'MUUS', peulh: 'ULLUUNDU', serere: 'MUUS', diola: 'NJAW', mandinka: 'NYAANKOO', soninke: 'MUSAA', balante: 'MUS', manjack: 'MUS', mankagne: 'MUS', bassari: 'MUS', bambara: 'JAKUMA', bainouk: 'MUS' },
        images: [ require('../../assets/games/four_images/muus_1.png'), require('../../assets/games/four_images/muus_2.png'), require('../../assets/games/four_images/muus_3.png'), require('../../assets/games/four_images/muus_4.png') ]
    }
];

interface Props {
    user: UserState;
    t: (key: TranslationKey) => string;
    onClose: () => void;
}

type ScreenState = 'ETHNIE_SELECT' | 'INTRO' | 'PLAYING';

export default function FourImagesOneWordGameScreen({ user, t, onClose }: Props) {
    const navigation = useNavigation();
    
    const [screenState, setScreenState] = useState<ScreenState>('ETHNIE_SELECT');
    const [selectedEthnieId, setSelectedEthnieId] = useState<string>('wolof');

    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [streak, setStreak] = useState(0);
    const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
    const [keyboardLetters, setKeyboardLetters] = useState<string[]>([]);
    const [feedback, setFeedback] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    const dbList = Object.keys(motMystereDB).map(k => ({ id: k, ...motMystereDB[k] }));
    const currentPuzzle = PUZZLES[currentIndex];

    // Compute active answer based on selected ethnie
    const getActiveAnswer = (puzzle: any) => {
        const trans = puzzle.translations[selectedEthnieId];
        return (trans || puzzle.translations['wolof']).toUpperCase();
    };

    const handleSelectEthnie = (id: string) => {
        setSelectedEthnieId(id);
        setScreenState('INTRO');
    };

    const startGame = () => {
        setScreenState('PLAYING');
        setCurrentIndex(0);
        setScore(0);
        setStreak(0);
        initLevel(getActiveAnswer(PUZZLES[0]));
    };

    useEffect(() => {
        if (screenState === 'PLAYING' && currentPuzzle) {
            initLevel(getActiveAnswer(currentPuzzle));
        }
    }, [currentIndex, screenState]);

    const initLevel = (answer: string) => {
        setSelectedLetters(new Array(answer.length).fill(''));

        // Create keyboard: correct letters + random ones to reach 12
        let letters = answer.split('');
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        while (letters.length < 12) {
            const randomChar = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
            letters.push(randomChar);
        }
        setKeyboardLetters([...letters].sort(() => 0.5 - Math.random()));
    };

    const handleLetterPress = (char: string) => {
        if (feedback) return;

        const nextEmptyIndex = selectedLetters.findIndex(l => l === '');
        if (nextEmptyIndex !== -1) {
            const newSelection = [...selectedLetters];
            newSelection[nextEmptyIndex] = char;
            setSelectedLetters(newSelection);

            if (nextEmptyIndex === selectedLetters.length - 1) {
                checkAnswer(newSelection.join(''));
            }
        }
    };

    const handleRemoveLetter = (index: number) => {
        if (feedback || selectedLetters[index] === '') return;
        const newSelection = [...selectedLetters];
        newSelection[index] = '';
        setSelectedLetters(newSelection);
    };

    const checkAnswer = (guess: string) => {
        const answerVal = getActiveAnswer(currentPuzzle);
        if (guess === answerVal) {
            audioService.playSound('success');
            setScore(prev => prev + 10);
            setStreak(prev => prev + 1);
            setFeedback({ type: 'success', message: "Waaw Goor Jambar !" });

            setTimeout(() => {
                setFeedback(null);
                if (currentIndex + 1 < PUZZLES.length) {
                    setCurrentIndex(prev => prev + 1);
                } else {
                    Alert.alert("Bravo !", `Vous avez terminé tous les niveaux pour cette langue avec ${score + 10} points !`, [
                        { text: "Retour", onPress: onClose }
                    ]);
                }
            }, 2000);
        } else {
            audioService.playSound('wrong');
            setStreak(0);
            setFeedback({ type: 'error', message: "Essaie encore !" });
            setTimeout(() => {
                setFeedback(null);
                setSelectedLetters(new Array(answerVal.length).fill(''));
            }, 1500);
        }
    };

    const renderHeader = (title: string, subtitle: string) => (
        <View style={styles.ethnieHeaderArea}>
            <TouchableOpacity style={styles.btnHome} onPress={onClose}>
                <Text style={{ fontSize: 16 }}>🏠</Text>
            </TouchableOpacity>
            <Text style={styles.ethnieMainTitle}>{title}</Text>
            <Text style={styles.ethnieSubtitle}>{subtitle}</Text>
        </View>
    );

    const renderEthnieSelect = () => (
        <SafeAreaView style={styles.safeArea}>
            <KenteBar />
            <View style={styles.fullScreen}>
                {renderHeader("4 Images 1 Mot", "Choisis une langue pour jouer")}
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                    <View style={styles.grid}>
                        {dbList.map((ethnie) => (
                            <TouchableOpacity key={ethnie.id} style={styles.card} onPress={() => handleSelectEthnie(ethnie.id)} activeOpacity={0.8}>
                                <Image source={ethnie.img} style={styles.cardImg} />
                                <Text style={styles.cardName}>{ethnie.ethnie}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );

    if (screenState === 'ETHNIE_SELECT') return renderEthnieSelect();

    if (screenState === 'INTRO') {
        const ethnieName = motMystereDB[selectedEthnieId]?.ethnie || '';
        return (
            <SafeAreaView style={styles.safeArea}>
                <KenteBar />
                <CornerDeco />
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => setScreenState('ETHNIE_SELECT')} style={styles.backBtn}>
                        <Text style={styles.backText}>◀</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.introContainer}>
                    <Image source={motMystereDB[selectedEthnieId]?.img} style={styles.heroImg} />
                    <Text style={styles.introTitle}>4 Images 1 Mot</Text>
                    <Text style={styles.introText}>
                        Trouve le point commun entre ces 4 images et écris le mot correspondant en {ethnieName} !
                    </Text>
                    <TouchableOpacity style={styles.startBtn} onPress={startGame}>
                        <Text style={styles.startBtnText}>C'est parti !</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <KenteBar />
            <CornerDeco />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => setScreenState('ETHNIE_SELECT')} style={styles.backBtn}>
                    <Text style={styles.backText}>◀</Text>
                </TouchableOpacity>
                <View style={styles.statsRow}>
                    <StatPill icon="🏆" value={score} />
                    <StatPill icon="🔥" value={streak} />
                </View>
            </View>

            <View style={styles.titleRow}>
                <Image source={motMystereDB[selectedEthnieId]?.img} style={styles.scoreImg} />
                <GoldTitle title={`4 Images 1 Mot ${motMystereDB[selectedEthnieId]?.ethnie}`} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.gameContainer}>
                    {/* Clue helper */}
                    <Text style={styles.clueLabel}>Traduction : {currentPuzzle.fr}</Text>

                    <View style={styles.imageGrid}>
                        {currentPuzzle.images.map((img, idx) => (
                            <View key={idx} style={styles.imageWrapper}>
                                <Image source={img} style={styles.puzzleImage} resizeMode="cover" />
                            </View>
                        ))}
                    </View>

                    <View style={styles.answerRow}>
                        {selectedLetters.map((char, idx) => (
                            <TouchableOpacity
                                key={idx}
                                style={styles.answerSlot}
                                onPress={() => handleRemoveLetter(idx)}
                            >
                                <Text style={styles.answerText}>{char}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <View style={styles.keyboard}>
                        {keyboardLetters.map((char, idx) => (
                            <TouchableOpacity
                                key={idx}
                                style={styles.keyTile}
                                onPress={() => handleLetterPress(char)}
                            >
                                <Text style={styles.keyText}>{char}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <TouchableOpacity onPress={() => setSelectedLetters(new Array(getActiveAnswer(currentPuzzle).length).fill(''))} style={styles.clearBtn}>
                        <Text style={styles.clearBtnText}>Effacer</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {feedback && (
                <View style={[styles.feedbackOverlay, feedback.type === 'success' ? styles.successFeedback : styles.errorFeedback]}>
                    <Text style={styles.feedbackText}>{feedback.message}</Text>
                </View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: theme.colors.bg },
    fullScreen: { flex: 1, paddingHorizontal: SPACING.md, paddingBottom: SPACING.xl },
    ethnieHeaderArea: { alignItems: 'center', paddingVertical: SPACING.lg, position: 'relative' },
    btnHome: { position: 'absolute', top: SPACING.lg, right: 0, width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(232, 93, 4, 0.2)', borderWidth: 1, borderColor: theme.colors.orange, justifyContent: 'center', alignItems: 'center', zIndex: 10 },
    ethnieMainTitle: { fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif-condensed', fontSize: 24, color: theme.colors.gold, textAlign: 'center', marginBottom: 5, textShadowColor: 'rgba(0,0,0,0.5)', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 2 },
    ethnieSubtitle: { fontSize: 14, color: '#c4a882', textAlign: 'center' },
    scrollContent: { paddingBottom: 40 },
    grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', width: '100%', marginTop: SPACING.md, paddingHorizontal: 20 },
    card: { width: (width - SPACING.md * 2 - 20) / 3, backgroundColor: '#241508', borderRadius: 12, borderWidth: 1, borderColor: theme.colors.gold, marginBottom: 15, overflow: 'hidden' },
    cardImg: { width: '100%', height: 70, resizeMode: 'contain', borderBottomWidth: 1, borderBottomColor: 'rgba(244, 160, 38, 0.3)' },
    cardName: { fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif-condensed', color: '#fbbf24', fontSize: 10, textAlign: 'center', paddingVertical: 8, fontWeight: 'bold' },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 15, marginBottom: 10 },
    backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(244, 160, 38, 0.1)', borderWidth: 1, borderColor: theme.colors.gold, justifyContent: 'center', alignItems: 'center' },
    backText: { color: theme.colors.gold, fontSize: 18, fontWeight: 'bold' },
    statsRow: { flexDirection: 'row', gap: 10 },
    heroImg: { width: 100, height: 100, borderRadius: 50, borderWidth: 3, borderColor: theme.colors.gold, marginBottom: 20 },
    scoreImg: { width: 40, height: 40, borderRadius: 20, borderWidth: 2, borderColor: theme.colors.gold, marginRight: 10 },
    titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
    introContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 30 },
    introTitle: { color: theme.colors.gold, fontSize: 32, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    introText: { color: theme.colors.cream, fontSize: 18, textAlign: 'center', lineHeight: 28, marginBottom: 40 },
    startBtn: { backgroundColor: theme.colors.orange, paddingVertical: 15, paddingHorizontal: 40, borderRadius: 30 },
    startBtnText: { color: theme.colors.bg, fontSize: 18, fontWeight: 'bold' },
    gameContainer: { alignItems: 'center', paddingHorizontal: 20 },
    clueLabel: { color: theme.colors.orange, fontSize: 14, fontWeight: 'bold', marginBottom: 5, letterSpacing: 1 },
    imageGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginVertical: 10 },
    imageWrapper: { width: IMAGE_SIZE, height: IMAGE_SIZE, borderRadius: 15, overflow: 'hidden', borderWidth: 2, borderColor: theme.colors.gold, margin: 5 },
    puzzleImage: { width: '100%', height: '100%' },
    answerRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginVertical: 20, gap: 5 },
    answerSlot: { width: 40, height: 40, backgroundColor: 'rgba(0,0,0,0.3)', borderWidth: 2, borderColor: theme.colors.gold, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginHorizontal: 2 },
    answerText: { color: theme.colors.gold, fontSize: 20, fontWeight: 'bold' },
    keyboard: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: 10 },
    keyTile: { width: 45, height: 45, backgroundColor: theme.colors.surface, borderWidth: 1, borderColor: theme.colors.gold, borderRadius: 10, justifyContent: 'center', alignItems: 'center', margin: 4 },
    keyText: { color: theme.colors.cream, fontSize: 18, fontWeight: 'bold' },
    clearBtn: { marginTop: 30, paddingVertical: 10, paddingHorizontal: 20, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 10, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
    clearBtnText: { color: theme.colors.muted, fontSize: 14, fontWeight: 'bold' },
    feedbackOverlay: { position: 'absolute', top: '40%', alignSelf: 'center', paddingVertical: 20, paddingHorizontal: 40, borderRadius: 20, zIndex: 100, width: '80%' },
    successFeedback: { backgroundColor: theme.colors.gold },
    errorFeedback: { backgroundColor: '#E53935' },
    feedbackText: { color: theme.colors.bg, fontSize: 22, fontWeight: '900', textAlign: 'center' }
});
