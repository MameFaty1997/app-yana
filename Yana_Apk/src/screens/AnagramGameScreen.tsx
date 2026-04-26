import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Alert, Animated, Image, ScrollView, Dimensions, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UserState } from '../types';
import { TranslationKey } from '../translations';
import { theme } from '../tokens/theme';
import { KenteBar, GoldTitle, CornerDeco, StatPill } from '../components/TerangaComponents';
import { audioService } from '../services/audioService';
import { motMystereDB } from '../data/reference/languages/motMystereDB';

const { width } = Dimensions.get('window');
const SPACING = { md: 16, lg: 24, xl: 32 };

interface Props {
    user: UserState;
    t: (key: TranslationKey) => string;
    onClose: () => void;
}

const MAX_SCORE_BUMP = 10;
type ScreenState = 'ETHNIE_SELECT' | 'INTRO' | 'PLAYING';

export default function AnagramGameScreen({ user, t, onClose }: Props) {
    const navigation = useNavigation();

    const [screenState, setScreenState] = useState<ScreenState>('ETHNIE_SELECT');
    const [selectedEthnieId, setSelectedEthnieId] = useState<string | null>(null);

    const [wordsList, setWordsList] = useState<any[]>([]);
    const [wordIndex, setWordIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [streak, setStreak] = useState(0);
    const [feedback, setFeedback] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    const [scrambledLetters, setScrambledLetters] = useState<Array<{ id: string, char: string }>>([]);
    const [selectedLetters, setSelectedLetters] = useState<Array<{ id: string, char: string }>>([]);

    const dbList = Object.keys(motMystereDB).map(k => ({ id: k, ...motMystereDB[k] }));

    const handleSelectEthnie = (id: string) => {
        setSelectedEthnieId(id);
        const data = motMystereDB[id];
        
        // Extract words for the chosen ethnie, filter for suitable anagram sizes without spaces
        let availableWords = data.words
            .filter(entry => !entry.word.includes(' ') && entry.word.length > 2 && entry.word.length <= 10)
            .map((entry, index) => ({
                id: String(index),
                term: entry.word,
                fr: entry.clue
            }));

        // Shuffle the words list for variety without repetitions
        availableWords = availableWords.sort(() => 0.5 - Math.random());
        
        if (availableWords.length === 0) {
            // Fallback just in case a language has entirely multi-word answers
            availableWords = [{ id: "1", term: "SALAAM", fr: "Bonjour" }];
        }

        setWordsList(availableWords);
        setWordIndex(0);
        setScore(0);
        setStreak(0);
        initWord(availableWords[0].term);
        setScreenState('INTRO');
    };

    const initWord = (targetWord: string) => {
        const normalized = targetWord.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
        const letters = normalized.split('').map((char, index) => ({
            id: `${index}-${char}`,
            char
        }));

        let shuffled = [...letters].sort(() => 0.5 - Math.random());
        while (shuffled.length > 1 && shuffled.map(l => l.char).join('') === normalized) {
            shuffled = [...letters].sort(() => 0.5 - Math.random());
        }

        setScrambledLetters(shuffled);
        setSelectedLetters([]);
    };

    const handleLetterSelect = (letterObj: { id: string, char: string }) => {
        setScrambledLetters(prev => prev.filter(l => l.id !== letterObj.id));
        setSelectedLetters(prev => [...prev, letterObj]);
    };

    const handleLetterDeselect = (letterObj: { id: string, char: string }) => {
        setSelectedLetters(prev => prev.filter(l => l.id !== letterObj.id));
        setScrambledLetters(prev => [...prev, letterObj]);
    };

    const handleClear = () => {
        setScrambledLetters(prev => [...prev, ...selectedLetters]);
        setSelectedLetters([]);
    };

    const handleCheck = () => {
        if (!wordsList[wordIndex]) return;

        const currentWord = wordsList[wordIndex].term;
        const normalized = currentWord.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
        const guessed = selectedLetters.map(l => l.char).join('');

        if (guessed === normalized) {
            audioService.playSound('success');
            setScore(prev => prev + MAX_SCORE_BUMP);
            setStreak(prev => prev + 1);
            setFeedback({ type: 'success', message: "Waaw Goor Jambar !" });

            setTimeout(() => {
                setFeedback(null);
                if (wordIndex + 1 < wordsList.length) {
                    setWordIndex(prev => prev + 1);
                    initWord(wordsList[wordIndex + 1].term);
                } else {
                    Alert.alert("Bravo !", `Vous avez terminé tous les mots pour cette langue avec ${score + MAX_SCORE_BUMP} points !`, [
                        { text: "Retour", onPress: onClose }
                    ]);
                }
            }, 2000);
        } else {
            audioService.playSound('wrong');
            setStreak(0);
            setFeedback({ type: 'error', message: "Ce n'est pas le bon mot. Essaie encore !" });
            setTimeout(() => {
                setFeedback(null);
                handleClear();
            }, 2000);
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
                {renderHeader("Anagramme", "Choisis une langue pour jouer")}
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
        const ethnieName = motMystereDB[selectedEthnieId!]?.ethnie || '';
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
                    <Image source={motMystereDB[selectedEthnieId!]?.img} style={styles.heroImg} />
                    <Text style={styles.introTitle}>L'Anagramme</Text>
                    <Text style={styles.introText}>
                        Reconstituez le mot en {ethnieName} à partir des lettres mélangées. Utilisez la traduction française comme indice !
                    </Text>
                    <TouchableOpacity style={styles.startBtn} onPress={() => setScreenState('PLAYING')}>
                        <Text style={styles.startBtnText}>C'est parti !</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    const currentEntry = wordsList[wordIndex];

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

            <View style={styles.progressContainer}>
                <View style={[styles.progressBar, { width: `${((wordIndex + 1) / wordsList.length) * 100}%` }]} />
            </View>

            <View style={styles.titleRow}>
                <Image source={motMystereDB[selectedEthnieId!]?.img} style={styles.scoreImg} />
                <GoldTitle title={`Anagramme ${motMystereDB[selectedEthnieId!]?.ethnie}`} />
            </View>

            <View style={styles.questionBox}>
                <Text style={styles.clueLabel}>TRADUCTION</Text>
                <Text style={styles.clueText}>{currentEntry.fr}</Text>
            </View>

            <View style={{ flex: 1, justifyContent: 'center' }}>
                <View style={[styles.letterTray, selectedLetters.length === 0 && { borderColor: 'rgba(255,255,255,0.1)' }]}>
                    {selectedLetters.map((l, i) => (
                        <TouchableOpacity key={l.id} onPress={() => handleLetterDeselect(l)} style={styles.letterTileSelected}>
                            <Text style={styles.letterTextSelected}>{l.char}</Text>
                        </TouchableOpacity>
                    ))}
                    {selectedLetters.length === 0 && (
                        <Text style={styles.emptyTrayText}>Touche les lettres pour former le mot</Text>
                    )}
                </View>

                <View style={styles.poolContainer}>
                    {scrambledLetters.map((l) => (
                        <TouchableOpacity key={l.id} onPress={() => handleLetterSelect(l)} style={styles.letterTileScrambled}>
                            <Text style={styles.letterTextScrambled}>{l.char}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <View style={styles.actionRow}>
                <TouchableOpacity style={[styles.actionBtn, styles.clearBtn]} onPress={handleClear} disabled={selectedLetters.length === 0}>
                    <Text style={styles.actionBtnText}>Effacer</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.actionBtn, styles.checkBtn, selectedLetters.length === 0 && { opacity: 0.5 }]}
                    onPress={handleCheck}
                    disabled={selectedLetters.length === 0 || feedback !== null}
                >
                    <Text style={styles.checkBtnText}>Vérifier</Text>
                </TouchableOpacity>
            </View>

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
    scrollContent: { alignItems: 'center', paddingBottom: 40 },
    grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', width: '100%', marginTop: SPACING.md },
    card: { width: (width - SPACING.md * 2 - 20) / 3, backgroundColor: '#241508', borderRadius: 12, borderWidth: 1, borderColor: theme.colors.gold, marginBottom: 15, overflow: 'hidden' },
    cardImg: { width: '100%', height: 70, resizeMode: 'contain', borderBottomWidth: 1, borderBottomColor: 'rgba(244, 160, 38, 0.3)' },
    cardName: { fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif-condensed', color: '#fbbf24', fontSize: 10, textAlign: 'center', paddingVertical: 8, fontWeight: 'bold' },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 15, marginBottom: 10 },
    backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(244, 160, 38, 0.1)', borderWidth: 1, borderColor: theme.colors.gold, justifyContent: 'center', alignItems: 'center' },
    backText: { color: theme.colors.gold, fontSize: 18, fontWeight: 'bold' },
    statsRow: { flexDirection: 'row', gap: 10 },
    progressContainer: { width: '90%', height: 6, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 3, alignSelf: 'center', marginBottom: 10, overflow: 'hidden' },
    progressBar: { height: '100%', backgroundColor: theme.colors.gold },
    questionBox: { backgroundColor: theme.colors.surface, borderWidth: 1, borderColor: 'rgba(244, 160, 38, 0.5)', borderRadius: 15, padding: 15, marginHorizontal: 20, alignItems: 'center', marginBottom: 10, ...theme.shadow.gold },
    clueLabel: { color: theme.colors.orange, fontFamily: theme.fonts.body, fontSize: 10, fontWeight: 'bold', letterSpacing: 2, marginBottom: 6 },
    clueText: { color: theme.colors.cream, fontFamily: theme.fonts.body, fontSize: 18, textAlign: 'center', lineHeight: 22, fontWeight: 'bold' },
    letterTray: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', marginHorizontal: 20, minHeight: 80, padding: 10, backgroundColor: 'rgba(0,0,0,0.3)', borderWidth: 2, borderColor: theme.colors.gold, borderRadius: 15, marginBottom: 40 },
    emptyTrayText: { color: 'rgba(255,255,255,0.3)', fontStyle: 'italic', fontSize: 14 },
    poolContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginHorizontal: 20, gap: 10 },
    letterTileScrambled: { backgroundColor: theme.colors.surface, borderWidth: 2, borderColor: theme.colors.gold, borderRadius: 12, width: 50, height: 50, justifyContent: 'center', alignItems: 'center', ...theme.shadow.gold },
    letterTextScrambled: { color: theme.colors.cream, fontSize: 24, fontWeight: 'bold' },
    letterTileSelected: { backgroundColor: theme.colors.gold, borderRadius: 12, width: 45, height: 45, justifyContent: 'center', alignItems: 'center', margin: 4 },
    letterTextSelected: { color: theme.colors.bg, fontSize: 20, fontWeight: 'bold' },
    actionRow: { flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 20, marginBottom: 30 },
    actionBtn: { paddingVertical: 15, paddingHorizontal: 30, borderRadius: 25, minWidth: 140, alignItems: 'center', ...theme.shadow.gold },
    clearBtn: { backgroundColor: theme.colors.surface, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
    actionBtnText: { color: theme.colors.cream, fontSize: 16, fontWeight: 'bold' },
    checkBtn: { backgroundColor: theme.colors.gold },
    checkBtnText: { color: theme.colors.bg, fontSize: 16, fontWeight: 'bold' },
    heroImg: { width: 100, height: 100, borderRadius: 50, borderWidth: 3, borderColor: theme.colors.gold, marginBottom: 20 },
    scoreImg: { width: 40, height: 40, borderRadius: 20, borderWidth: 2, borderColor: theme.colors.gold, marginRight: 10 },
    titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
    introContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 30 },
    introTitle: { color: theme.colors.gold, fontFamily: theme.fonts.display, fontSize: 32, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    introText: { color: theme.colors.cream, fontFamily: theme.fonts.body, fontSize: 18, textAlign: 'center', lineHeight: 28, marginBottom: 40 },
    startBtn: { backgroundColor: theme.colors.orange, paddingVertical: 15, paddingHorizontal: 40, borderRadius: 30, ...theme.shadow.orange },
    startBtnText: { color: theme.colors.bg, fontSize: 18, fontWeight: 'bold' },
    feedbackOverlay: { position: 'absolute', top: '40%', alignSelf: 'center', paddingVertical: 20, paddingHorizontal: 40, borderRadius: 20, ...theme.shadow.gold, zIndex: 100, width: '80%' },
    successFeedback: { backgroundColor: theme.colors.gold },
    errorFeedback: { backgroundColor: '#E53935' },
    feedbackText: { color: theme.colors.bg, fontSize: 22, fontWeight: '900', textAlign: 'center' }
});
