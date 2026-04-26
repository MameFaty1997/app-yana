import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, SafeAreaView, Dimensions, Linking } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { theme } from '../tokens/theme';
import { KenteBar, GoldTitle, BtnPrimary } from '../components/TerangaComponents';
import { Story } from '../data/stories';
import { ALL_STORIES } from '../data/all-stories';
import { KidModeToggle } from '../components/KidModeToggle';
import { UserState } from '../types';

const { width } = Dimensions.get('window');

type RootStackParamList = {
    BookShelf: undefined;
    BookReader: { storyId: string };
};

type Props = NativeStackScreenProps<RootStackParamList, 'BookShelf'> & {
    user?: UserState;
    setUser?: any;
    initialCategory?: string;
};

export default function BookShelfScreen({ navigation, route, user, initialCategory: manualInitialCategory }: Props) {
    const initialCategory = manualInitialCategory || (route.params as any)?.initialCategory;
    const [isKidMode, setIsKidMode] = useState(false);

    // Grouping stories
    const leukStories = ALL_STORIES.filter(s => s.id.includes('leuk'));
    const soundiataStories = ALL_STORIES.filter(s => s.id.includes('soundiata'));
    const baolStories = ALL_STORIES.filter(s => s.id.includes('baol'));
    const ieuhStories = ALL_STORIES.filter(s => s.id.includes('ieuh'));
    const senegalStories = ALL_STORIES.filter(s => s.id.includes('senegal'));

    const showLeuk = !initialCategory || initialCategory === 'contes';
    const showSoundiata = !initialCategory || initialCategory === 'soundiata';
    const showBaol = !initialCategory || initialCategory === 'baol' || initialCategory === 'contes_baol';
    const showIeuh = !initialCategory || initialCategory === 'ieuh';
    const showSenegal = !initialCategory || initialCategory === 'senegal';

    const renderStoryCard = (item: Story) => (
        <View key={item.id} style={styles.card}>
            <View style={[styles.coverColor, { backgroundColor: item.coverColor }]}>
                {item.scenes.length > 0 && (
                    <Image
                        source={item.scenes[0].illustration.path || { uri: 'https://via.placeholder.com/300x150' }}
                        style={[styles.coverImage, user?.completedStories?.includes(item.id) && { opacity: 0.4 }]}
                    />
                )}
            </View>

            <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                    <Text style={styles.storyTitle}>{item.title}</Text>
                    <View style={styles.ethnieBadge}>
                        <Text style={styles.ethnieText}>{item.ethnie}</Text>
                    </View>
                </View>

                <Text style={styles.subtitle}>{item.subtitle}</Text>

                <View style={styles.metaRow}>
                    <View style={styles.metaItem}>
                        <Text style={styles.metaIcon}>⏳</Text>
                        <Text style={styles.metaText}>{item.readingTime} min</Text>
                    </View>
                    <View style={styles.metaItem}>
                        <Text style={styles.metaIcon}>👶</Text>
                        <Text style={styles.metaText}>{item.ageMin}+ ans</Text>
                    </View>
                    <View style={styles.metaItem}>
                        <Text style={styles.metaIcon}>📊</Text>
                        <Text style={[styles.metaText, styles.difficultyText]}>{item.difficulty}</Text>
                    </View>
                    {user?.completedStories?.includes(item.id) && (
                        <View style={[styles.metaItem, styles.completedBadge]}>
                            <Text style={styles.completedBadgeText}>✓ Lu</Text>
                        </View>
                    )}
                </View>

                <BtnPrimary
                    text="Lire ce conte"
                    onPress={() => navigation.navigate('BookReader', { storyId: item.id })}
                />
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <KenteBar />

            <View style={styles.topActions}>
                <KidModeToggle isKidMode={isKidMode} onToggle={setIsKidMode} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.listContainer}>
                {showLeuk && (
                    <>
                        <GoldTitle title="Contes de la Brousse" />
                        <Text style={styles.librarySubtitle}>Bibliothèque Teranga</Text>
                        {leukStories.map(s => renderStoryCard(s))}
                    </>
                )}

                {showLeuk && showBaol && <View style={styles.sectionDivider} />}

                {showBaol && (
                    <>
                        <GoldTitle title="Contes du Baol" />
                        <Text style={styles.librarySubtitle}>La sagesse paysanne</Text>
                        {baolStories.map(renderStoryCard)}
                    </>
                )}

                {showBaol && showSoundiata && <View style={styles.sectionDivider} />}

                {showSoundiata && (
                    <>
                        <GoldTitle title="L'épopée de Soundiata Keïta - Tradition orale" />
                        <View style={{ height: 20 }} />
                        {soundiataStories.map(s => renderStoryCard(s))}
                    </>
                )}

                {showSoundiata && showIeuh && <View style={styles.sectionDivider} />}

                {showIeuh && (
                    <>
                        <GoldTitle title="Il était une histoire" />
                        <Text style={styles.librarySubtitle}>Contes et Légendes</Text>
                        <Image
                            source={require('../../assets/ieuh_cover.png')}
                            style={{ width: '100%', height: 200, borderRadius: 15, marginBottom: 20 }}
                        />
                        {ieuhStories.map(s => renderStoryCard(s))}
                    </>
                )}

                {showIeuh && showSenegal && <View style={styles.sectionDivider} />}

                {showSenegal && (
                    <>
                        <GoldTitle title="Contes du Sénégal" />
                        <Text style={styles.librarySubtitle}>Sagesse et tradition orale</Text>
                        <Image
                            source={require('../../assets/discovery/senegal_flag.png')}
                            style={{ width: '100%', height: 200, borderRadius: 15, marginBottom: 20 }}
                        />
                        {senegalStories.map(s => renderStoryCard(s))}
                    </>
                )}

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: theme.colors.bg,
    },
    topActions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    librarySubtitle: {
        color: theme.colors.muted,
        textAlign: 'center',
        fontFamily: theme.fonts.body,
        fontSize: 14,
        marginTop: -10,
        marginBottom: 20,
        letterSpacing: 1.5,
        textTransform: 'uppercase',
    },
    listContainer: {
        padding: 20,
        paddingTop: 0,
    },
    sectionDivider: {
        height: 60,
    },
    card: {
        backgroundColor: theme.colors.surface,
        borderRadius: 20,
        marginBottom: 25,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(244, 160, 38, 0.2)',
        ...theme.shadow.gold,
    },
    coverColor: {
        height: 160,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    coverImage: {
        width: '100%',
        height: '100%',
        opacity: 0.8,
    },
    cardContent: {
        padding: 20,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 5,
    },
    storyTitle: {
        color: theme.colors.gold,
        fontFamily: theme.fonts.display,
        fontSize: 22,
        flex: 1,
        marginRight: 10,
    },
    ethnieBadge: {
        backgroundColor: 'rgba(45, 106, 79, 0.2)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: theme.colors.green,
    },
    ethnieText: {
        color: theme.colors.green,
        fontSize: 10,
        fontWeight: 'bold',
    },
    subtitle: {
        color: theme.colors.cream,
        fontFamily: theme.fonts.body,
        fontSize: 14,
        opacity: 0.7,
        marginBottom: 15,
    },
    metaRow: {
        flexDirection: 'row',
        gap: 15,
        marginBottom: 20,
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    metaIcon: {
        fontSize: 12,
    },
    metaText: {
        color: theme.colors.cream,
        fontSize: 12,
        fontFamily: theme.fonts.body,
    },
    difficultyText: {
        textTransform: 'capitalize',
        color: theme.colors.orange,
        fontWeight: 'bold',
    },
    completedBadge: {
        backgroundColor: 'rgba(45, 106, 79, 0.2)',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: theme.colors.green,
    },
    completedBadgeText: {
        color: theme.colors.green,
        fontSize: 10,
        fontWeight: 'bold',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 10,
    }
});
