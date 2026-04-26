import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Card } from '../../components/ui';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from '../../theme';
import { TranslationKey } from '../../translations';

const { width } = Dimensions.get('window');
const isSmallDevice = width < 375;

interface GoalStepProps {
    selectedGoal: number;
    onSelect: (goal: number) => void;
    onNext: () => void;
    onBack: () => void;
    t: (key: TranslationKey) => string;
}

const GoalStep: React.FC<GoalStepProps> = ({
    selectedGoal,
    onSelect,
    onNext,
    onBack,
    t,
}) => {
    const goals = useMemo(() => [
        {
            minutes: 5,
            emoji: '⚡',
            titleKey: 'goal_relaxed' as TranslationKey,
        },
        {
            minutes: 10,
            emoji: '🎯',
            titleKey: 'goal_regular' as TranslationKey,
            recommended: true,
        },
        {
            minutes: 20,
            emoji: '🔥',
            titleKey: 'goal_serious' as TranslationKey,
        },
    ], []);

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={onBack} style={styles.backButton}>
                    <Text style={styles.backIcon}>←</Text>
                </TouchableOpacity>
                <Text style={styles.title}>{t('your_goal')}</Text>
                <Text style={styles.subtitle}>
                    {t('goal_question')}
                </Text>
            </View>

            {/* Goals List */}
            <View style={styles.content}>
                {goals.map((goal) => {
                    const isSelected = selectedGoal === goal.minutes;
                    return (
                        <TouchableOpacity
                            key={goal.minutes}
                            onPress={() => {
                                onSelect(goal.minutes);
                                setTimeout(() => onNext(), 300);
                            }}
                            activeOpacity={0.7}
                        >
                            <View style={[
                                styles.goalCard,
                                isSelected && styles.selectedCard
                            ]}>
                                {goal.recommended && (
                                    <View style={styles.badge}>
                                        <Text style={styles.badgeText}>{t('popular')}</Text>
                                    </View>
                                )}

                                <View style={styles.emojiCircle}>
                                    <Text style={styles.emoji}>{goal.emoji}</Text>
                                </View>

                                <View style={styles.goalInfo}>
                                    <Text style={[
                                        styles.goalTitle,
                                        isSelected && styles.selectedText
                                    ]}>
                                        {t(goal.titleKey)}
                                    </Text>
                                    <Text style={styles.goalDescription}>
                                        {goal.minutes} {t('min_day')}
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
                    disabled={!selectedGoal}
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
    content: {
        flex: 1,
        paddingHorizontal: isSmallDevice ? 20 : 25,
        gap: 12,
        justifyContent: 'center',
    },
    goalCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        borderRadius: 25,
        padding: isSmallDevice ? 15 : 20,
        ...SHADOWS.md,
        borderWidth: 2,
        borderColor: 'transparent',
        position: 'relative',
    },
    selectedCard: {
        borderColor: COLORS.primary,
        backgroundColor: COLORS.secondaryLight,
        transform: [{ scale: 1.02 }],
    },
    badge: {
        position: 'absolute',
        top: -10,
        right: 20,
        backgroundColor: COLORS.accent,
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
        ...SHADOWS.sm,
    },
    badgeText: {
        fontSize: 9,
        color: COLORS.white,
        fontWeight: '900',
        letterSpacing: 1,
    },
    emojiCircle: {
        width: isSmallDevice ? 50 : 60,
        height: isSmallDevice ? 50 : 60,
        borderRadius: 20,
        backgroundColor: '#FDF7F0',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    emoji: {
        fontSize: isSmallDevice ? 24 : 32,
    },
    goalInfo: {
        flex: 1,
    },
    goalTitle: {
        fontSize: isSmallDevice ? 16 : 18,
        color: COLORS.text.primary,
        fontWeight: '900',
        marginBottom: 2,
    },
    selectedText: {
        color: COLORS.primary,
    },
    goalDescription: {
        fontSize: 13,
        color: COLORS.text.secondary,
        fontWeight: '500',
    },
    checkmark: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkmarkIcon: {
        color: COLORS.white,
        fontSize: 14,
        fontWeight: '900',
    },
    footer: {
        paddingHorizontal: isSmallDevice ? 20 : 25,
        paddingVertical: 25,
        backgroundColor: COLORS.white,
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
    },
    nextBtn: {
        height: isSmallDevice ? 56 : 64,
        borderRadius: 20,
    },
});

export default GoalStep;
