import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Button, Card } from '../../components/ui';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from '../../theme';
import { TranslationKey } from '../../translations';
import Constants from 'expo-constants';

const { width } = Dimensions.get('window');
const isSmallDevice = width < 375;

interface MotivationStepProps {
    selectedMotivations: string[];
    onSelect: (motivations: string[]) => void;
    onNext: () => void;
    onBack: () => void;
    t: (key: TranslationKey) => string;
}

const MotivationStep: React.FC<MotivationStepProps> = ({
    selectedMotivations,
    onSelect,
    onNext,
    onBack,
    t,
}) => {
    const motivations = useMemo(() => [
        {
            id: 'roots',
            emoji: '🌍',
            titleKey: 'motivation_roots' as TranslationKey,
        },
        {
            id: 'work',
            emoji: '💼',
            titleKey: 'motivation_work' as TranslationKey,
        },
        {
            id: 'family',
            emoji: '👨‍👩‍👧',
            titleKey: 'motivation_family' as TranslationKey,
        },
        {
            id: 'fun',
            emoji: '🎓',
            titleKey: 'motivation_fun' as TranslationKey,
        },
        {
            id: 'travel',
            emoji: '✈️',
            titleKey: 'motivation_travel' as TranslationKey,
        },
        {
            id: 'social',
            emoji: '💬',
            titleKey: 'motivation_social' as TranslationKey,
        },
    ], []);

    const toggleMotivation = (id: string) => {
        if (selectedMotivations.includes(id)) {
            onSelect(selectedMotivations.filter((m) => m !== id));
        } else {
            onSelect([...selectedMotivations, id]);
        }
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={onBack} style={styles.backButton}>
                    <Text style={styles.backIcon}>←</Text>
                </TouchableOpacity>
                <Text style={styles.title}>{t('why_learn')}</Text>
                <Text style={styles.subtitle}>
                    {t('choose_lang')}
                </Text>
            </View>

            {/* Motivations Grid */}
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.grid}>
                    {motivations.map((motivation) => {
                        const isSelected = selectedMotivations.includes(motivation.id);
                        return (
                            <TouchableOpacity
                                key={motivation.id}
                                onPress={() => toggleMotivation(motivation.id)}
                                activeOpacity={0.7}
                                style={styles.gridItem}
                            >
                                <View style={[
                                    styles.motivationCard,
                                    isSelected && styles.selectedCard
                                ]}>
                                    <View style={styles.emojiContainer}>
                                        <Text style={styles.emoji}>{motivation.emoji}</Text>
                                    </View>
                                    <Text style={[
                                        styles.motivationTitle,
                                        isSelected && styles.selectedText
                                    ]}>
                                        {t(motivation.titleKey)}
                                    </Text>
                                    {isSelected && (
                                        <View style={styles.checkmark}>
                                            <Text style={styles.checkmarkIcon}>✓</Text>
                                        </View>
                                    )}
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </ScrollView>

            {/* Footer */}
            <View style={styles.footer}>
                <Button
                    title={t('continue')}
                    variant="primary"
                    size="lg"
                    fullWidth
                    onPress={onNext}
                    disabled={selectedMotivations.length === 0}
                    style={styles.nextBtn}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FDF7F0',
    },
    header: {
        paddingHorizontal: isSmallDevice ? 20 : 25,
        paddingTop: Constants.statusBarHeight + 20,
        paddingBottom: 20,
    },
    backButton: {
        width: 36,
        height: 36,
        justifyContent: 'center',
        marginBottom: 10,
    },
    backIcon: {
        fontSize: 22,
        color: COLORS.secondary,
        fontWeight: '900',
    },
    title: {
        fontSize: isSmallDevice ? 24 : 32,
        color: COLORS.secondary,
        fontWeight: '900',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        color: COLORS.text.secondary,
        fontWeight: '500',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: isSmallDevice ? 15 : 20,
        paddingBottom: 30,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    gridItem: {
        width: '48%',
        marginBottom: 12,
    },
    motivationCard: {
        backgroundColor: COLORS.white,
        borderRadius: 25,
        padding: isSmallDevice ? 15 : 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: 'transparent',
        position: 'relative',
        ...SHADOWS.md,
        minHeight: isSmallDevice ? 100 : 120,
    },
    selectedCard: {
        borderColor: COLORS.primary,
        backgroundColor: COLORS.secondaryLight,
        transform: [{ scale: 1.02 }],
    },
    emojiContainer: {
        width: isSmallDevice ? 45 : 55,
        height: isSmallDevice ? 45 : 55,
        borderRadius: 15,
        backgroundColor: '#FDF7F0',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    emoji: {
        fontSize: isSmallDevice ? 24 : 30,
    },
    motivationTitle: {
        fontSize: isSmallDevice ? 12 : 14,
        color: COLORS.text.primary,
        textAlign: 'center',
        fontWeight: '900',
    },
    selectedText: {
        color: COLORS.primary,
    },
    checkmark: {
        position: 'absolute',
        top: 10,
        right: 10,
        width: 22,
        height: 22,
        borderRadius: 11,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkmarkIcon: {
        color: COLORS.white,
        fontSize: 12,
        fontWeight: '900',
    },
    footer: {
        paddingHorizontal: isSmallDevice ? 20 : 25,
        paddingVertical: 20,
        backgroundColor: COLORS.white,
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
    },
    nextBtn: {
        height: isSmallDevice ? 56 : 64,
        borderRadius: 20,
    }
});

export default MotivationStep;
