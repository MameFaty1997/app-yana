import React, { useRef, useMemo, useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Platform, ActivityIndicator, Image, ScrollView, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserState } from '../types';
import { TranslationKey } from '../translations';
import { COLORS, SPACING, TYPOGRAPHY } from '../theme';
import { theme } from '../tokens/theme';
import { CROSSWORD_HTML_TEMPLATE } from '../services/crosswordTemplate';
import { motMystereDB } from '../data/reference/languages/motMystereDB';
import { KenteBar, CornerDeco } from '../components/TerangaComponents';

const { width } = Dimensions.get('window');
const WORDS_PER_LEVEL = 10;

const styles = StyleSheet.create({
    webview: { flex: 1, backgroundColor: 'transparent' },
    container: { flex: 1, backgroundColor: '#0a0a0f' },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm, borderBottomWidth: 1, borderBottomColor: 'rgba(244, 160, 38, 0.2)' },
    backButton: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(244, 160, 38, 0.1)', borderRadius: 20, borderWidth: 1, borderColor: theme.colors.gold },
    backIcon: { fontSize: 18, color: theme.colors.gold, fontWeight: 'bold' },
    title: { fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif-condensed', fontSize: 18, color: theme.colors.gold, fontWeight: 'bold' },
    titleRow: { flexDirection: 'row', alignItems: 'center' },
    scoreImg: { width: 30, height: 30, borderRadius: 15, borderWidth: 1, borderColor: theme.colors.gold, marginRight: 8 },
    errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: SPACING.xl },
    errorEmoji: { fontSize: 48, marginBottom: SPACING.md },
    errorText: { ...TYPOGRAPHY.body1, color: COLORS.white, textAlign: 'center', lineHeight: 24, marginBottom: SPACING.xl },
    closeBtn: { backgroundColor: 'rgba(240, 192, 64, 0.2)', paddingHorizontal: SPACING.xl, paddingVertical: SPACING.sm, borderRadius: 20, borderWidth: 1, borderColor: COLORS.gold },
    closeBtnText: { ...TYPOGRAPHY.body1, color: COLORS.gold },
    fullScreen: { flex: 1, paddingHorizontal: SPACING.md, paddingBottom: SPACING.xl },
    scrollContent: { paddingBottom: 40 },
    grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', width: '100%', marginTop: SPACING.md, paddingHorizontal: 10 },
    card: { width: (width - SPACING.md * 2 - 30) / 3, backgroundColor: '#241508', borderRadius: 12, borderWidth: 1, borderColor: theme.colors.gold, marginBottom: 15, overflow: 'hidden' },
    cardImg: { width: '100%', height: 70, resizeMode: 'contain', borderBottomWidth: 1, borderBottomColor: 'rgba(244, 160, 38, 0.3)' },
    cardName: { fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif-condensed', color: '#fbbf24', fontSize: 10, textAlign: 'center', paddingVertical: 8, fontWeight: 'bold' },
    introTitle: { color: theme.colors.gold, fontSize: 32, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    introText: { color: theme.colors.cream, fontSize: 18, textAlign: 'center', lineHeight: 28, marginBottom: 40 },
    startBtn: { backgroundColor: theme.colors.orange, paddingVertical: 15, paddingHorizontal: 40, borderRadius: 30 },
    startBtnText: { color: theme.colors.bg, fontSize: 18, fontWeight: 'bold' },
    introContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 30 },
    heroImg: { width: 100, height: 100, borderRadius: 50, borderWidth: 3, borderColor: theme.colors.gold, marginBottom: 20 },
    ethnieHeaderArea: { alignItems: 'center', paddingVertical: SPACING.lg, position: 'relative' },
    btnHome: { position: 'absolute', top: SPACING.lg, right: 0, width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(232, 93, 4, 0.2)', borderWidth: 1, borderColor: theme.colors.orange, justifyContent: 'center', alignItems: 'center', zIndex: 10 },
    ethnieMainTitle: { fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif-condensed', fontSize: 24, color: theme.colors.gold, textAlign: 'center', marginBottom: 5, textShadowColor: 'rgba(0,0,0,0.5)', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 2 },
    ethnieSubtitle: { fontSize: 14, color: '#c4a882', textAlign: 'center' },
});

const CrosswordView = ({ html, onMessage, webViewRef }: { html: string, onMessage: (data: any) => void, webViewRef: any }) => {
    if (Platform.OS === 'web') {
        return (
            <iframe id="crossword-iframe" srcDoc={html} style={{ flex: 1, border: 'none', width: '100%', height: '100%' }} title="Crossword Game" onLoad={(e) => {
                const win = (e.target as any).contentWindow;
                if (win) {
                    window.addEventListener('message', (event) => {
                        if (event.source === win) {
                            onMessage(event.data);
                        }
                    });
                }
            }} />
        );
    }

    return (
        <WebView ref={webViewRef} originWhitelist={['*']} source={{ html }} style={styles.webview} javaScriptEnabled={true} domStorageEnabled={true} onMessage={(event) => {
            try { onMessage(JSON.parse(event.nativeEvent.data)); } catch (e) { console.error('Error parsing message from webview:', e); }
        }} />
    );
};

interface CrosswordScreenProps {
    user: UserState;
    t: (key: TranslationKey) => string;
    onClose: () => void;
}

type ScreenState = 'ETHNIE_SELECT' | 'INTRO' | 'PLAYING';

const CrosswordScreen: React.FC<CrosswordScreenProps> = ({ user, t, onClose }) => {
    const webViewRef = useRef<WebView>(null);
    const [screenState, setScreenState] = useState<ScreenState>('ETHNIE_SELECT');
    const [selectedEthnieId, setSelectedEthnieId] = useState<string>('wolof');
    const [level, setLevel] = useState<number | null>(null);
    const [words, setWords] = useState<any[]>([]);

    const dbList = Object.keys(motMystereDB).map(k => ({ id: k, ...motMystereDB[k] }));

    useEffect(() => {
        if (screenState === 'PLAYING') {
            const loadLevel = async () => {
                try {
                    const storedLevel = await AsyncStorage.getItem(`@crossword_level_${selectedEthnieId}`);
                    setLevel(storedLevel !== null ? parseInt(storedLevel, 10) : 0);
                } catch (e) {
                    setLevel(0);
                }
            };
            loadLevel();
        }
    }, [screenState, selectedEthnieId]);

    const handleSelectEthnie = (id: string) => {
        setSelectedEthnieId(id);
        const data = motMystereDB[id];
        // Filter out words with spaces for crosswords and normalize
        const validWords = data.words
            .filter(w => !w.word.includes(' ') && !w.word.includes('-'))
            .map(w => ({ word: w.word.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase(), clue: w.clue }));
        
        setWords(validWords);
        setScreenState('INTRO');
    };

    const handleNextLevel = async () => {
        if (level === null) return;
        const next = level + 1;
        setLevel(next);
        try {
            await AsyncStorage.setItem(`@crossword_level_${selectedEthnieId}`, next.toString());
        } catch (e) {}
    };

    const levelWords = useMemo(() => {
        if (level === null || words.length === 0) return [];
        let startIndex = (level * WORDS_PER_LEVEL) % words.length;
        let endIndex = startIndex + WORDS_PER_LEVEL;
        
        let slice = words.slice(startIndex, endIndex);
        if (slice.length < WORDS_PER_LEVEL) {
            // wrap around
            slice = [...slice, ...words.slice(0, WORDS_PER_LEVEL - slice.length)];
        }
        return slice;
    }, [words, level]);

    const finalHtml = useMemo(() => {
        if (level === null || levelWords.length === 0) return '';
        return CROSSWORD_HTML_TEMPLATE.replace(
            '<head>',
            `<head><script>window.__EXT_WORDS__ = ${JSON.stringify(levelWords)}; window.__LEVEL__ = ${level + 1};</script>`
        );
    }, [levelWords, level]);

    const handleMessage = (data: any) => {
        if (data && data.type === 'LEVEL_COMPLETE') {
            handleNextLevel();
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
            <SafeAreaView style={styles.container}>
                <KenteBar />
                <View style={styles.fullScreen}>
                    {renderHeaderTitle("Mots Croisés", "Choisis une langue pour jouer")}
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
            <SafeAreaView style={styles.container}>
                <KenteBar />
                <CornerDeco />
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => setScreenState('ETHNIE_SELECT')} style={styles.backButton}>
                        <Text style={styles.backIcon}>◀</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.introContainer}>
                    <Image source={motMystereDB[selectedEthnieId]?.img} style={styles.heroImg} />
                    <Text style={styles.introTitle}>Mots Croisés</Text>
                    <Text style={styles.introText}>Complète la grille des mots croisés en utilisant le vocabulaire {ethnieName} !</Text>
                    <TouchableOpacity style={styles.startBtn} onPress={() => setScreenState('PLAYING')}>
                        <Text style={styles.startBtnText}>C'est parti !</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    if (level === null) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                    <ActivityIndicator size="large" color={COLORS.gold} />
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => setScreenState('ETHNIE_SELECT')} style={styles.backButton}>
                    <Text style={styles.backIcon}>◀</Text>
                </TouchableOpacity>
                <View style={styles.titleRow}>
                    <Image source={motMystereDB[selectedEthnieId]?.img} style={styles.scoreImg} />
                    <Text style={styles.title}>Niveau {level + 1}</Text>
                </View>
                <View style={{ width: 40 }} />
            </View>

            {words.length < 3 ? (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorEmoji}>📭</Text>
                    <Text style={styles.errorText}>
                        Désolé, pas assez de mots disponibles pour générer une grille en {motMystereDB[selectedEthnieId]?.ethnie}.
                    </Text>
                    <TouchableOpacity style={styles.closeBtn} onPress={() => setScreenState('ETHNIE_SELECT')}>
                        <Text style={styles.closeBtnText}>Retour</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <CrosswordView
                    html={finalHtml}
                    onMessage={handleMessage}
                    webViewRef={webViewRef}
                />
            )}
        </SafeAreaView>
    );
};

export default CrosswordScreen;
