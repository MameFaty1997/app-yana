import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Alert, TextInput, Image, Dimensions, ScrollView, Platform } from 'react-native';
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

const MAX_SCORE_BUMP = 15;
type ScreenState = 'ETHNIE_SELECT' | 'INTRO' | 'PLAYING';

export default function AlphabetParlantGameScreen({ user, t, onClose }: Props) {
    const navigation = useNavigation();

    const [screenState, setScreenState] = useState<ScreenState>('ETHNIE_SELECT');
    const [selectedEthnieId, setSelectedEthnieId] = useState<string>('wolof');

    const [puzzles, setPuzzles] = useState<any[]>([]);
    const [puzzleIndex, setPuzzleIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [streak, setStreak] = useState(0);
    const [userInput, setUserInput] = useState('');
    const [feedback, setFeedback] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    const dbList = Object.keys(motMystereDB).map(k => ({ id: k, ...motMystereDB[k] }));

    const handleSelectEthnie = (id: string) => {
        setSelectedEthnieId(id);
        const data = motMystereDB[id];

        // Create phonetic/abbreviation puzzles dynamically from the language's words
        let generatedPuzzles = data.words
            .filter(w => !w.word.includes(' ') && w.word.length > 2)
            .map(w => {
                const normalized = w.word.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
                // Extract consonants as the code
                const consonants = normalized.replace(/[AEIOUY]/g, '');
                const code = consonants.split('').join(' ');
                
                return {
                    code: code.length > 0 ? code : normalized.charAt(0), // fallback if somehow no consonants
                    answer: normalized,
                    hint: w.clue
                };
            });

        generatedPuzzles = generatedPuzzles.sort(() => 0.5 - Math.random());
        setPuzzles(generatedPuzzles);
        setPuzzleIndex(0);
        setScore(0);
        setStreak(0);
        setUserInput('');
        setScreenState('INTRO');
    };

    const currentPuzzle = puzzles[puzzleIndex];

    const handleCheck = () => {
        if (!currentPuzzle) return;
        const normalizedInput = userInput.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();

        if (normalizedInput === currentPuzzle.answer) {
            audioService.playSound('success');
            setScore(prev => prev + MAX_SCORE_BUMP);
            setStreak(prev => prev + 1);
            setFeedback({ type: 'success', message: "Waaw Goor Jambar !" });

            setTimeout(() => {
                setFeedback(null);
                if (puzzleIndex + 1 < puzzles.length) {
                    setPuzzleIndex(prev => prev + 1);
                    setUserInput('');
                } else {
                    Alert.alert("Terminé !", `Bravo, tu as décodé tous les messages pour cette langue ! Score: ${score + MAX_SCORE_BUMP}`, [
                        { text: "Quitter", onPress: onClose }
                    ]);
                }
            }, 2000);
        } else {
            audioService.playSound('wrong');
            setStreak(0);
            setFeedback({ type: 'error', message: "Pas tout à fait... Essaie encore !" });
            setTimeout(() => setFeedback(null), 2000);
        }
    };

    const renderHeaderTitle = (title: string, subtitle: string) => (
        <View style={styles.ethnieHeaderArea}>
            <TouchableOpacity style={styles.btnHome} onPress={onClose}>
                <Text style={{ fontSize: 16 }}>🏠</Text>
            </TouchableOpacity>
            <Text style={styles.ethnieMainTitle}>{title}</Text>
            <Text style={styles.ethnieSubtitle}>{subtitle}</Text>
        </View>
    );

    if (screenState === 'ETHNIE_SELECT') {
        return (
            <SafeAreaView style={styles.safeArea}>
                <KenteBar />
                <View style={styles.fullScreen}>
                    {renderHeaderTitle("Alphabet Parlant", "Choisis une langue pour jouer")}
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
    }

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
                    <Text style={styles.introTitle}>L'Alphabet Parlant</Text>
                    <Text style={styles.introText}>
                        Lisez les consonnes à voix haute pour deviner le mot en {ethnieName} caché derrière leur prononciation !
                    </Text>

                    <View style={styles.exampleBox}>
                        <Text style={styles.exampleTitle}>Exemple en Wolof :</Text>
                        <Text style={styles.exampleText}>Si tu vois <Text style={{ fontWeight: '900', color: theme.colors.gold }}>K R</Text></Text>
                        <Text style={styles.exampleText}>Prononce : "ka - re" → <Text style={{ fontWeight: '900', color: theme.colors.orange }}>KËR !</Text> (Maison)</Text>
                    </View>

                    <TouchableOpacity style={styles.startBtn} onPress={() => setScreenState('PLAYING')}>
                        <Text style={styles.startBtnText}>C'est parti !</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    if (!currentPuzzle) return null;

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
                <View style={[styles.progressBar, { width: `${((puzzleIndex + 1) / puzzles.length) * 100}%` }]} />
            </View>

            <View style={styles.titleRow}>
                <Image source={motMystereDB[selectedEthnieId]?.img} style={styles.scoreImg} />
                <GoldTitle title={`Alphabet Parlant ${motMystereDB[selectedEthnieId]?.ethnie}`} />
            </View>

            <View style={styles.mainContent}>
                <Text style={styles.instructionText}>
                    Lis ces lettres à voix haute et devine le mot caché !
                </Text>

                <View style={styles.puzzleBox}>
                    <Text style={styles.puzzleCode}>{currentPuzzle.code}</Text>
                </View>

                {streak < 1 && (
                    <Text style={styles.hintText}>💡 Indice : {currentPuzzle.hint}</Text>
                )}

                <TextInput
                    style={styles.inputField}
                    value={userInput}
                    onChangeText={setUserInput}
                    placeholder="Tape ta réponse ici..."
                    placeholderTextColor="rgba(255,255,255,0.4)"
                    autoCapitalize="characters"
                    autoCorrect={false}
                    returnKeyType="done"
                    onSubmitEditing={handleCheck}
                />

                <TouchableOpacity
                    style={[styles.checkBtn, userInput.length === 0 && { opacity: 0.5 }]}
                    onPress={handleCheck}
                    disabled={userInput.length === 0 || feedback !== null}
                >
                    <Text style={styles.checkBtnText}>Vérifier</Text>
                </TouchableOpacity>

                {feedback && (
                    <View style={[styles.feedbackOverlay, feedback.type === 'success' ? styles.successFeedback : styles.errorFeedback]}>
                        <Text style={styles.feedbackText}>{feedback.message}</Text>
                    </View>
                )}
            </View>

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
    grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', width: '100%', marginTop: SPACING.md, paddingHorizontal: 10 },
    card: { width: (width - SPACING.md * 2 - 30) / 3, backgroundColor: '#241508', borderRadius: 12, borderWidth: 1, borderColor: theme.colors.gold, marginBottom: 15, overflow: 'hidden' },
    cardImg: { width: '100%', height: 70, resizeMode: 'contain', borderBottomWidth: 1, borderBottomColor: 'rgba(244, 160, 38, 0.3)' },
    cardName: { fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif-condensed', color: '#fbbf24', fontSize: 10, textAlign: 'center', paddingVertical: 8, fontWeight: 'bold' },
    heroImg: { width: 100, height: 100, borderRadius: 50, borderWidth: 3, borderColor: theme.colors.gold, marginBottom: 20 },
    scoreImg: { width: 40, height: 40, borderRadius: 20, borderWidth: 2, borderColor: theme.colors.gold, marginRight: 10 },
    titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 15, marginBottom: 10 },
    backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(244, 160, 38, 0.1)', borderWidth: 1, borderColor: theme.colors.gold, justifyContent: 'center', alignItems: 'center' },
    backText: { color: theme.colors.gold, fontSize: 18, fontWeight: 'bold' },
    statsRow: { flexDirection: 'row', gap: 10 },
    progressContainer: { width: '90%', height: 6, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 3, alignSelf: 'center', marginBottom: 20, overflow: 'hidden' },
    progressBar: { height: '100%', backgroundColor: theme.colors.gold },
    mainContent: { flex: 1, paddingHorizontal: 20, alignItems: 'center', marginTop: 10 },
    instructionText: { color: theme.colors.cream, fontSize: 16, textAlign: 'center', marginBottom: 30, fontFamily: theme.fonts.body, opacity: 0.9 },
    puzzleBox: { backgroundColor: theme.colors.surface, borderWidth: 2, borderColor: theme.colors.gold, borderRadius: 20, paddingVertical: 40, paddingHorizontal: 50, marginBottom: 30, ...theme.shadow.gold },
    puzzleCode: { color: theme.colors.gold, fontSize: 48, fontWeight: '900', letterSpacing: 10, textAlign: 'center' },
    hintText: { color: theme.colors.orange, fontSize: 14, marginBottom: 30, fontStyle: 'italic', textAlign: 'center' },
    inputField: { width: '100%', backgroundColor: 'rgba(0,0,0,0.3)', borderWidth: 1, borderColor: theme.colors.gold, borderRadius: 15, color: theme.colors.cream, fontSize: 20, padding: 20, textAlign: 'center', marginBottom: 30, fontWeight: 'bold' },
    checkBtn: { backgroundColor: theme.colors.gold, paddingVertical: 18, paddingHorizontal: 40, borderRadius: 30, width: '100%', alignItems: 'center', ...theme.shadow.gold },
    checkBtnText: { color: theme.colors.bg, fontSize: 18, fontWeight: 'bold' },
    introContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 30 },
    introTitle: { color: theme.colors.gold, fontFamily: theme.fonts.display, fontSize: 32, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    introText: { color: theme.colors.cream, fontFamily: theme.fonts.body, fontSize: 18, textAlign: 'center', lineHeight: 28, marginBottom: 30 },
    startBtn: { backgroundColor: theme.colors.orange, paddingVertical: 15, paddingHorizontal: 40, borderRadius: 30, ...theme.shadow.orange },
    startBtnText: { color: theme.colors.bg, fontSize: 18, fontWeight: 'bold' },
    exampleBox: { backgroundColor: 'rgba(255,255,255,0.05)', padding: 20, borderRadius: 15, width: '100%', marginBottom: 30, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
    exampleTitle: { color: theme.colors.gold, fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
    exampleText: { color: theme.colors.cream, fontSize: 15, marginBottom: 5 },
    feedbackOverlay: { position: 'absolute', top: '40%', paddingVertical: 20, paddingHorizontal: 40, borderRadius: 20, ...theme.shadow.gold, zIndex: 100 },
    successFeedback: { backgroundColor: theme.colors.gold },
    errorFeedback: { backgroundColor: '#E53935' },
    feedbackText: { color: theme.colors.bg, fontSize: 22, fontWeight: '900', textAlign: 'center' },
});
