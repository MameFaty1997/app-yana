import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Card } from '../../components/ui';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from '../../theme';
import { ExperienceLevel } from '../../types';
import { TranslationKey } from '../../translations';

const { width } = Dimensions.get('window');
const isSmallDevice = width < 375;

interface LevelStepProps {
    selectedLevel: ExperienceLevel;
    onSelect: (level: ExperienceLevel) => void;
    onNext: () => void;
    onBack: () => void;
    t: (key: TranslationKey) => string;
}

const LevelStep: React.FC<LevelStepProps> = ({
    selectedLevel,
    onSelect,
    onNext,
    onBack,
    t,
}) => {
    const levels = useMemo(() => [
        {
            id: 'beginner' as ExperienceLevel,
            emoji: '🌱',
            titleKey: 'level_beginner' as TranslationKey,
            descriptionKey: 'desc_beginner' as TranslationKey,
        },
        {
            id: 'intermediate' as ExperienceLevel,
            emoji: '📚',
            titleKey: 'level_intermediate' as TranslationKey,
            descriptionKey: 'desc_intermediate' as TranslationKey,
        },
        {
            id: 'advanced' as ExperienceLevel,
            emoji: '🎯',
            titleKey: 'level_advanced' as TranslationKey,
            descriptionKey: 'desc_advanced' as TranslationKey,
        },
    ], []);

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={onBack} style={styles.backButton}>
                    <Text style={styles.backIcon}>←</Text>
                </TouchableOpacity>
                <Text style={styles.title}>{t('your_level')}</Text>
                <Text style={styles.subtitle}>
                    {t('level_subtitle')}
                </Text>
            </View>

            {/* Levels */}
            <View style={styles.content}>
                {levels.map((level) => {
                    const isSelected = selectedLevel === level.id;
                    return (
                        <TouchableOpacity
                            key={level.id}
                            onPress={() => {
                                onSelect(level.id);
                                setTimeout(() => onNext(), 300);
                            }}
                            activeOpacity={0.7}
                        >
                            <View style={[
                                styles.levelCard,
                                isSelected && styles.selectedCard
                            ]}>
                                <View style={styles.emojiContainer}>
                                    <Text style={styles.emoji}>{level.emoji}</Text>
                                </View>
                                <View style={styles.levelInfo}>
                                    <Text style={[
                                        styles.levelTitle,
                                        isSelected && styles.selectedText
                                    ]}>
                                        {t(level.titleKey)}
                                    </Text>
                                    <Text style={styles.levelDescription}>
                                        {t(level.descriptionKey)}
                                    </Text>
                                </View>
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

            {/* Footer */}
            <View style={styles.footer}>
                <Button
                    title={t('validate')}
                    variant="primary"
                    size="lg"
                    fullWidth
                    onPress={onNext}
                    disabled={!selectedLevel}
                    style={styles.nextBtn}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FDF7F0',
    },
    header: {
        paddingHorizontal: isSmallDevice ? 20 : 25,
        paddingTop: isSmallDevice ? 15 : 25,
        paddingBottom: 15,
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
    content: {
        flex: 1,
        paddingHorizontal: isSmallDevice ? 20 : 25,
        gap: 10,
        justifyContent: 'center',
    },
    levelCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        borderRadius: 25,
        padding: isSmallDevice ? 12 : 18,
        ...SHADOWS.md,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    selectedCard: {
        borderColor: COLORS.primary,
        backgroundColor: COLORS.secondaryLight,
        transform: [{ scale: 1.02 }],
    },
    emojiContainer: {
        width: isSmallDevice ? 45 : 55,
        height: isSmallDevice ? 45 : 55,
        borderRadius: 18,
        backgroundColor: '#FDF7F0',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    emoji: {
        fontSize: isSmallDevice ? 24 : 32,
    },
    levelInfo: {
        flex: 1,
    },
    levelTitle: {
        fontSize: isSmallDevice ? 16 : 18,
        color: COLORS.text.primary,
        fontWeight: '900',
        marginBottom: 2,
    },
    selectedText: {
        color: COLORS.primary,
    },
    levelDescription: {
        fontSize: 12,
        color: COLORS.text.secondary,
        fontWeight: '500',
    },
    checkmark: {
        width: 24,
        height: 24,
        borderRadius: 12,
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
    },
});

export default LevelStep;
