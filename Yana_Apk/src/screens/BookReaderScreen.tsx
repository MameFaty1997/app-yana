import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { theme } from '../tokens/theme';
import { storyLeuk } from '../data/story-leuk';
import { StoryScene } from '../components/StoryScene';
import { ReadingProgress } from '../components/ReadingProgress';
import { FootnoteModal } from '../components/FootnoteModal';
import { VocabTooltip } from '../components/VocabTooltip';
import { KidModeToggle } from '../components/KidModeToggle';
import { Story, Footnote, VocabWord } from '../data/stories';
import { getStoryById } from '../data/all-stories';
import { BtnPrimary } from '../components/TerangaComponents';
import { UserState } from '../types';

const { height } = Dimensions.get('window');

type RootStackParamList = {
    BookReader: { storyId: string };
    BookShelf: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'BookReader'> & {
    user?: UserState;
    setUser?: any;
};

export default function BookReaderScreen({ route, navigation, user, setUser }: Props) {
    const { storyId } = route.params;
    const story = getStoryById(storyId) || storyLeuk;

    const [isKidMode, setIsKidMode] = useState(false);
    const [selectedFootnote, setSelectedFootnote] = useState<Footnote | null>(null);
    const [selectedVocab, setSelectedVocab] = useState<VocabWord | null>(null);
    const [showReachedEnd, setShowReachedEnd] = useState(false);

    const scrollY = useRef(new Animated.Value(0)).current;
    const scrollViewRef = useRef<ScrollView>(null);

    const handleScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: false }
    );

    const readingProgress = scrollY.interpolate({
        inputRange: [0, height * 2], // Approximate length, normally we'd measure content
        outputRange: [0, 1],
        extrapolate: 'clamp',
    }) as any;

    const checkEndOfContent = (event: any) => {
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
        const isCloseToBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 50;
        if (isCloseToBottom && !showReachedEnd) {
            setShowReachedEnd(true);
            if (user && setUser && !user.completedStories?.includes(storyId)) {
                setUser((prev: UserState) => ({
                    ...prev,
                    completedStories: [...(prev.completedStories || []), storyId]
                }));
            }
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <Text style={styles.backIcon}>←</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle} numberOfLines={1}>{story.title}</Text>
                    <KidModeToggle isKidMode={isKidMode} onToggle={setIsKidMode} />
                </View>
                <ReadingProgress progress={readingProgress} />
            </View>

            <ScrollView
                ref={scrollViewRef}
                style={styles.scrollView}
                onScroll={(e) => {
                    handleScroll(e);
                    checkEndOfContent(e);
                }}
                scrollEventThrottle={16}
                contentContainerStyle={styles.contentContainer}
            >
                <View style={styles.intro}>
                    <Text style={styles.ethnieLabel}>{story.ethnie}</Text>
                    <Text style={styles.storyTitle}>{story.title}</Text>
                    <View style={styles.divider} />
                </View>

                {story.scenes.map((scene) => (
                    <StoryScene
                        key={scene.id}
                        scene={scene}
                        kidMode={isKidMode}
                        onPressFootnote={setSelectedFootnote}
                        onPressVocab={setSelectedVocab}
                    />
                ))}

                <View style={styles.footer}>
                    {showReachedEnd ? (
                        <View style={styles.endBox}>
                            <Text style={styles.moralTitle}>La Morale</Text>
                            <Text style={styles.moralText}>{story.moralLesson}</Text>
                            <BtnPrimary
                                text="Revenir à la bibliothèque"
                                onPress={() => navigation.navigate('BookShelf')}
                            />
                        </View>
                    ) : (
                        <Text style={styles.scrollHint}>Continuez à lire pour découvrir la fin...</Text>
                    )}
                </View>
            </ScrollView>

            <FootnoteModal
                isVisible={!!selectedFootnote}
                footnote={selectedFootnote}
                onClose={() => setSelectedFootnote(null)}
            />

            <VocabTooltip
                isVisible={!!selectedVocab}
                word={selectedVocab}
                onClose={() => setSelectedVocab(null)}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: theme.colors.bg,
    },
    header: {
        backgroundColor: theme.colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.05)',
    },
    headerTop: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        gap: 15,
    },
    backBtn: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(255,255,255,0.05)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    backIcon: {
        color: theme.colors.gold,
        fontSize: 20,
        fontWeight: 'bold',
    },
    headerTitle: {
        flex: 1,
        color: theme.colors.cream,
        fontFamily: theme.fonts.display,
        fontSize: 16,
    },
    scrollView: {
        flex: 1,
    },
    contentContainer: {
        paddingBottom: 50,
    },
    intro: {
        alignItems: 'center',
        paddingVertical: 40,
        paddingHorizontal: 20,
    },
    ethnieLabel: {
        color: theme.colors.orange,
        fontFamily: theme.fonts.body,
        fontWeight: 'bold',
        letterSpacing: 3,
        fontSize: 12,
        marginBottom: 10,
        textTransform: 'uppercase',
    },
    storyTitle: {
        color: theme.colors.gold,
        fontFamily: theme.fonts.display,
        fontSize: 32,
        textAlign: 'center',
        lineHeight: 40,
    },
    divider: {
        width: 60,
        height: 3,
        backgroundColor: theme.colors.gold,
        marginTop: 20,
        borderRadius: 2,
    },
    footer: {
        padding: 20,
        alignItems: 'center',
    },
    scrollHint: {
        color: theme.colors.muted,
        fontStyle: 'italic',
        fontSize: 14,
    },
    endBox: {
        width: '100%',
        backgroundColor: 'rgba(244, 160, 38, 0.05)',
        padding: 25,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(244, 160, 38, 0.2)',
        alignItems: 'center',
    },
    moralTitle: {
        color: theme.colors.gold,
        fontFamily: theme.fonts.display,
        fontSize: 20,
        marginBottom: 10,
    },
    moralText: {
        color: theme.colors.cream,
        fontFamily: theme.fonts.body,
        fontSize: 16,
        fontStyle: 'italic',
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 25,
    }
});
