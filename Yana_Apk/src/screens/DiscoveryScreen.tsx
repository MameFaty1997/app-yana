import React, { useState, Dispatch, SetStateAction } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Pressable,
    Image,
    Dimensions,
    StatusBar,
    Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { UserState } from '../types';
import { TranslationKey } from '../translations';
import { COLORS, TYPOGRAPHY, SHADOWS, SPACING, BORDER_RADIUS } from '../theme';
import { GOLD_CAURI_IMAGE } from '../constants';
import XPProgressBar from '../components/ui/XPProgressBar';
import { KenteBar, GoldTitle, CornerDeco, BtnPrimary, BtnSecondary } from '../components/TerangaComponents';
import MarketplaceScreen from './MarketplaceScreen';
import Constants from 'expo-constants';
import CrosswordScreen from './CrosswordScreen';
import MemoryTerangaScreen from './MemoryTerangaScreen';
import QuizCultureScreen from './QuizCultureScreen';
import MotMystereNavigator from './MotMystereNavigator';
import ContesNavigator from '../ContesNavigator';
import AnagramGameScreen from './AnagramGameScreen';
import AlphabetParlantGameScreen from './AlphabetParlantGameScreen';
import FourImagesOneWordGameScreen from './FourImagesOneWordGameScreen';

const { width } = Dimensions.get('window');
const isSmallDevice = width < 375;

interface DiscoveryScreenProps {
    user: UserState;
    setUser: Dispatch<SetStateAction<UserState>>;
    t: (key: TranslationKey) => string;
}


const GAMES = [
    {
        id: 'crossword',
        titleKey: 'game_crossword' as TranslationKey,
        image: require('../../assets/illustration_game_crossword.jpg'),
        descriptionKey: 'game_crossword_desc' as TranslationKey
    },
    {
        id: 'quiz',
        titleKey: 'game_quiz' as TranslationKey,
        image: require('../../assets/illustration_game_quiz.jpg'),
        descriptionKey: 'game_quiz_desc' as TranslationKey
    },
    {
        id: 'memory',
        titleKey: 'game_memory' as TranslationKey,
        image: require('../../assets/illustration_game_memory.jpg'),
        descriptionKey: 'game_memory_desc' as TranslationKey
    },
    {
        id: 'motmystere',
        titleKey: 'game_mystery_word' as TranslationKey,
        image: require('../../assets/illustration_game_quiz.jpg'),
        descriptionKey: 'game_mystery_word_desc' as TranslationKey
    },
    {
        id: 'anagram',
        titleKey: 'game_anagram' as TranslationKey,
        image: require('../../assets/illustration_game_crossword.jpg'),
        descriptionKey: 'game_anagram_desc' as TranslationKey
    },
    {
        id: 'alphabet_parlant',
        titleKey: 'game_alphabet_parlant' as TranslationKey,
        image: require('../../assets/illustration_game_memory.jpg'),
        descriptionKey: 'game_alphabet_parlant_desc' as TranslationKey
    },
    {
        id: 'four_images_1word',
        titleKey: 'game_4images_1word' as TranslationKey,
        image: require('../../assets/illustration_game_quiz.jpg'),
        descriptionKey: 'game_4images_1word_desc' as TranslationKey
    },
];

const STORIES = [
    {
        id: 'contes',
        title: 'Contes de la Brousse',
        image: require('../../assets/discovery/lievre_hyene.jpg'),
        subtitle: 'Les contes de Leuk le Lièvre'
    },
    {
        id: 'baol',
        title: 'Contes du Baol',
        image: require('../../assets/stories/baol_cover.png'),
        subtitle: 'La sagesse paysanne'
    },
    {
        id: 'soundiata',
        title: 'L\'épopée de Soundiata Keïta - Tradition orale',
        image: require('../../assets/discovery/soundiata.jpg'),
        subtitle: 'Malinké (Mandingue)\nContée par le griot Mamadou Kouyaté'
    },
    {
        id: 'ieuh',
        title: 'Il était une histoire',
        image: require('../../assets/ieuh_cover.png'),
        subtitle: 'Contes et Légendes'
    },
    {
        id: 'senegal',
        title: 'Contes du Sénégal',
        image: require('../../assets/discovery/senegal_flag.png'),
        subtitle: 'Sagesse et tradition orale'
    },
];

import KaabuScreen from './KaabuScreen';
import BainounkScreen from './BainounkScreen';
import BallaabaScreen from './BallaabaScreen';

const DiscoveryScreen: React.FC<DiscoveryScreenProps> = ({ user, setUser, t }) => {
    const navigation = useNavigation();
    const [activeGame, setActiveGame] = React.useState<string | null>(null);
    const [isMarketplaceVisible, setIsMarketplaceVisible] = useState(false);

    if (activeGame === 'kaabu') {
        return <KaabuScreen onClose={() => setActiveGame(null)} />;
    }

    if (activeGame === 'bainounk') {
        return <BainounkScreen onClose={() => setActiveGame(null)} />;
    }

    if (activeGame === 'ballaaba') {
        return <BallaabaScreen onClose={() => setActiveGame(null)} />;
    }

    if (activeGame === 'crossword') {
        return <CrosswordScreen user={user} t={t} onClose={() => setActiveGame(null)} />;
    }

    if (activeGame === 'memory') {
        return <MemoryTerangaScreen user={user} t={t} onClose={() => setActiveGame(null)} />;
    }

    if (activeGame === 'quiz') {
        return <QuizCultureScreen user={user} t={t} onClose={() => setActiveGame(null)} />;
    }

    if (activeGame === 'motmystere') {
        return <MotMystereNavigator onClose={() => setActiveGame(null)} />;
    }

    if (activeGame === 'anagram') {
        return <AnagramGameScreen user={user} t={t} onClose={() => setActiveGame(null)} />;
    }

    if (activeGame === 'alphabet_parlant') {
        return <AlphabetParlantGameScreen user={user} t={t} onClose={() => setActiveGame(null)} />;
    }

    if (activeGame === 'four_images_1word') {
        return <FourImagesOneWordGameScreen user={user} t={t} onClose={() => setActiveGame(null)} />;
    }

    if (activeGame === 'contes' || activeGame === 'soundiata' || activeGame === 'baol' || activeGame === 'ieuh' || activeGame === 'senegal') {
        return (
            <View style={{ flex: 1 }}>
                <ContesNavigator initialCategory={activeGame} user={user} setUser={setUser} />
                <TouchableOpacity
                    style={{ position: 'absolute', top: 50, right: 20, zIndex: 999 }}
                    onPress={() => setActiveGame(null)}
                >
                    <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 20, padding: 5 }}>
                        <Text style={{ fontSize: 24, color: 'white' }}>✕</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />

            {/* Top Bar Stats */}
            <View style={styles.topStatsBar}>
                <TouchableOpacity
                    style={styles.avatarCircleSmall}
                    onPress={() => (navigation as any).navigate('Profile')}
                >
                    {(!user?.avatar || !user.avatar.startsWith('http')) ? (
                        <Text style={{ fontSize: 24, textAlign: 'center' }}>{user?.avatar || '👩🏾'}</Text>
                    ) : (
                        <Image
                            source={{ uri: user.avatar }}
                            style={styles.avatarSmall}
                        />
                    )}
                </TouchableOpacity>
                <View style={styles.pillsContainer}>
                    <XPProgressBar xp={user.xp || 0} />
                    <View style={styles.statPill}>
                        <View style={[styles.pillIconBg, { backgroundColor: '#FFF3E0' }]}>
                            <Text style={styles.statPillIcon}>☀️</Text>
                        </View>
                        <Text style={styles.statPillValue}>{user.streak || 0}</Text>
                    </View>
                    <View style={styles.statPill}>
                        <View style={[styles.pillIconBg, { backgroundColor: '#FFEBEE' }]}>
                            <Text style={styles.statPillIcon}>❤️</Text>
                        </View>
                        <Text style={[styles.statPillValue, { color: COLORS.heart }]}>{user.hearts || 5}</Text>
                    </View>
                    <TouchableOpacity style={styles.statPill} onPress={() => setIsMarketplaceVisible(true)}>
                        <View style={[styles.pillIconBg, { backgroundColor: '#FFFBEB' }]}>
                            <Image source={GOLD_CAURI_IMAGE} style={{ width: 18, height: 18 }} resizeMode="contain" />
                        </View>
                        <Text style={[styles.statPillValue, { color: '#D97706' }]}>{user.shells || 0}</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <View style={[styles.header, { marginTop: 20 }]}>
                    <Text style={styles.headerTitle}>{t('discovery')}</Text>
                    <Text style={styles.headerSubtitle}>{t('discovery_subtitle')}</Text>
                </View>
                {/* Historical Dossiers Section */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>{t('savoir_traditions')}</Text>
                    <Text style={styles.sectionBadge}>{t('explore_badge')}</Text>
                </View>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
                >
                    {/* Kaabu Card */}
                    <TouchableOpacity
                        style={[styles.kaabuCard, { width: width * 0.7, margin: 0, marginRight: 15, backgroundColor: '#241508', ...SHADOWS.md }]}
                        onPress={() => setActiveGame('kaabu')}
                        activeOpacity={0.9}
                    >
                        <View style={styles.kaabuBadge}>
                            <Text style={styles.kaabuBadgeText}>EMPIRE DU KAABU</Text>
                        </View>
                        <View style={styles.kaabuContent}>
                            <Text style={styles.kaabuTitle}>Secrets du Soleil Couchant</Text>
                            <Text style={styles.kaabuDescription}>
                                L'épopée de Tiramakhan et de la cité de Kansala.
                            </Text>
                        </View>
                    </TouchableOpacity>

                    {/* Bainounk Card */}
                    <TouchableOpacity
                        style={[styles.kaabuCard, { width: width * 0.7, margin: 0, backgroundColor: COLORS.secondary, borderColor: COLORS.primary + '40', ...SHADOWS.md, marginRight: 15 }]}
                        onPress={() => setActiveGame('bainounk')}
                        activeOpacity={0.9}
                    >
                        <View style={[styles.kaabuBadge, { backgroundColor: COLORS.primary }]}>
                            <Text style={styles.kaabuBadgeText}>PEUPLE BAÏNOUNK</Text>
                        </View>
                        <View style={styles.kaabuContent}>
                            <Text style={[styles.kaabuTitle, { color: COLORS.primaryLight }]}>L'Odyssée Perdue</Text>
                            <Text style={styles.kaabuDescription}>
                                L'exode, la trappe de Birikama et la malédiction royale.
                            </Text>
                        </View>
                    </TouchableOpacity>

                    {/* Ballaaba Card */}
                    <TouchableOpacity
                        style={[styles.kaabuCard, { width: width * 0.7, margin: 0, backgroundColor: '#2e1c0c', borderColor: '#f4a02640', ...SHADOWS.md }]}
                        onPress={() => setActiveGame('ballaaba')}
                        activeOpacity={0.9}
                    >
                        <View style={[styles.kaabuBadge, { backgroundColor: '#f4a026' }]}>
                            <Text style={styles.kaabuBadgeText}>LÉGENDE DU GABOU</Text>
                        </View>
                        <View style={styles.kaabuContent}>
                            <Text style={[styles.kaabuTitle, { color: '#fbbf24' }]}>La Reine Ballaaba</Text>
                            <Text style={styles.kaabuDescription}>
                                Le choix du cœur, l'exil en forêt et les origines des lois.
                            </Text>
                        </View>
                    </TouchableOpacity>
                </ScrollView>

                {/* Games Section */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>{t('linguistic_games')}</Text>
                </View>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.carouselContainer}
                >
                    {GAMES.map(game => (
                        <Pressable
                            key={game.id}
                            style={({ pressed }) => [
                                styles.carouselCard,
                                pressed && { transform: [{ scale: 0.98 }] }
                            ]}
                            onPress={() => setActiveGame(game.id)}
                        >
                            <Image source={game.image} style={styles.carouselImage} />
                            <View style={styles.cardInfo}>
                                <Text style={styles.carouselTitle}>{t(game.titleKey)}</Text>
                                <Text style={styles.cardSubtitle}>{t(game.descriptionKey)}</Text>
                            </View>
                        </Pressable>
                    ))}
                </ScrollView>

                {/* Stories Section (Horizontal as requested "à côté de") */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>{t('library_oral_tradition')}</Text>
                </View>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.carouselContainer}
                >
                    {STORIES.map(story => (
                        <Pressable
                            key={story.id}
                            style={({ pressed }) => [
                                styles.storyCard,
                                pressed && { transform: [{ scale: 0.98 }] }
                            ]}
                            onPress={() => setActiveGame(story.id)}
                        >
                            <Image source={story.image} style={styles.storyImage} />
                            <View style={styles.cardInfo}>
                                <Text style={styles.carouselTitle}>{story.title}</Text>
                                <Text style={styles.cardSubtitle}>{story.subtitle}</Text>
                            </View>
                        </Pressable>
                    ))}
                </ScrollView>

            </ScrollView>

            <Modal
                visible={isMarketplaceVisible}
                animationType="slide"
                presentationStyle="pageSheet"
                onRequestClose={() => setIsMarketplaceVisible(false)}
            >
                <MarketplaceScreen
                    user={user}
                    setUser={setUser}
                    onClose={() => setIsMarketplaceVisible(false)}
                    t={t}
                />
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FCFBFA', // Standard Light BG
    },
    header: {
        paddingHorizontal: SPACING.md,
        paddingBottom: SPACING.sm,
    },
    topStatsBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SPACING.md,
        paddingTop: Constants.statusBarHeight + 10,
        paddingBottom: SPACING.sm,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#F5F5F5',
    },
    avatarCircleSmall: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: COLORS.secondaryLight,
        borderWidth: 1.5,
        borderColor: COLORS.border.light,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    avatarSmall: {
        width: '100%',
        height: '100%',
    },
    pillsContainer: {
        flexDirection: 'row',
        gap: 4,
    },
    statPill: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingLeft: 4,
        paddingRight: 8,
        paddingVertical: 3,
        borderRadius: BORDER_RADIUS.full,
        borderWidth: 1,
        borderColor: '#F0F0F0',
        ...SHADOWS.sm,
        gap: 6,
    },
    pillIconBg: {
        width: 28,
        height: 28,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    statPillIcon: {
        fontSize: 14,
    },
    statPillValue: {
        fontSize: 12,
        fontWeight: '900',
        color: COLORS.secondary,
    },
    headerTitle: {
        ...TYPOGRAPHY.h1,
        color: COLORS.text.primary,
        marginBottom: 5,
    },
    headerSubtitle: {
        ...TYPOGRAPHY.body2,
        color: COLORS.text.secondary,
        lineHeight: 20,
    },
    scrollContent: {
        paddingBottom: 60,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: SPACING.md,
        marginTop: 30,
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: '900',
        color: COLORS.text.primary,
    },
    carouselContainer: {
        paddingLeft: SPACING.md,
        paddingRight: SPACING.md,
    },
    carouselCard: {
        width: 170,
        marginRight: 15,
        backgroundColor: COLORS.white,
        borderRadius: 20,
        overflow: 'hidden',
        ...SHADOWS.sm,
        borderWidth: 1,
        borderColor: COLORS.gray[100],
    },
    carouselImage: {
        width: '100%',
        height: 100,
        backgroundColor: COLORS.gray[200],
    },
    storyCard: {
        width: 280,
        marginRight: 15,
        backgroundColor: COLORS.white,
        borderRadius: 20,
        overflow: 'hidden',
        ...SHADOWS.sm,
        borderWidth: 1,
        borderColor: COLORS.gray[100],
        marginBottom: 5,
    },
    storyImage: {
        width: '100%',
        height: 160,
        backgroundColor: COLORS.gray[200],
    },
    cardInfo: {
        padding: 15,
    },
    carouselTitle: {
        fontSize: 16,
        fontWeight: '800',
        color: COLORS.text.primary,
        marginBottom: 4,
    },
    cardSubtitle: {
        fontSize: 13,
        fontWeight: '500',
        color: COLORS.text.secondary,
        lineHeight: 18,
    },
    placeholderArticleContainer: {
        paddingHorizontal: SPACING.md,
        marginTop: 20,
    },
    kaabuCard: {
        backgroundColor: '#241508',
        margin: 20,
        borderRadius: 24,
        padding: 20,
        borderWidth: 1,
        borderColor: '#f4a02640',
        overflow: 'hidden',
        ...SHADOWS.md,
    },
    kaabuBadge: {
        backgroundColor: '#f4a026',
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderRadius: 12,
        alignSelf: 'flex-start',
        marginBottom: 15,
    },
    kaabuBadgeText: {
        color: '#1a0e05',
        fontSize: 10,
        fontWeight: '900',
        letterSpacing: 1,
    },
    kaabuContent: {
        gap: 8,
    },
    kaabuTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fbbf24',
    },
    kaabuDescription: {
        fontSize: 14,
        color: '#fdf3e3',
        opacity: 0.8,
        lineHeight: 20,
    },
    kaabuFooter: {
        marginTop: 10,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.05)',
    },
    kaabuLink: {
        color: '#f4a026',
        fontWeight: '700',
        fontSize: 14,
    },
    sectionBadge: {
        backgroundColor: COLORS.primary + '20',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: COLORS.primary,
    },
    sectionBadgeText: {
        color: COLORS.primary,
        fontSize: 10,
        fontWeight: 'bold',
    },
});

export default DiscoveryScreen;
