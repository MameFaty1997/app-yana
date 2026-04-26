import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Button, Avatar, Card } from '../../components/ui';
import { COLORS, TYPOGRAPHY, SPACING } from '../../theme';
import { TranslationKey } from '../../translations';

interface FriendsStepProps {
    onNext: () => void;
    onSkip: () => void;
    t: (key: TranslationKey) => string;
}

const FriendsStep: React.FC<FriendsStepProps> = ({ onNext, onSkip, t }) => {
    const [invited, setInvited] = useState<string[]>([]);

    const suggestedFriends = useMemo(() => [
        {
            id: '1',
            name: 'Aminata Diallo',
            languageKey: 'lang_wolof_name' as TranslationKey,
            avatar: '👩🏾',
        },
        {
            id: '2',
            name: 'Mamadou Sow',
            languageKey: 'lang_pulaar_name' as TranslationKey,
            avatar: '👨🏿',
        },
        {
            id: '3',
            name: 'Fatou Sarr',
            languageKey: 'lang_serere_name' as TranslationKey,
            avatar: '👩🏾',
        },
        {
            id: '4',
            name: 'Ousmane Ba',
            languageKey: 'lang_wolof_name' as TranslationKey,
            avatar: '👨🏿',
        },
        {
            id: '5',
            name: 'Aïssatou Ndiaye',
            languageKey: 'lang_diola_name' as TranslationKey,
            avatar: '👩🏾',
        },
    ], []);

    const handleInvite = (friendId: string) => {
        if (invited.includes(friendId)) {
            setInvited(invited.filter((id) => id !== friendId));
        } else {
            setInvited([...invited, friendId]);
        }
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={onSkip} style={styles.skipButton}>
                    <Text style={styles.skipText}>{t('skip')}</Text>
                </TouchableOpacity>
                <Text style={styles.title}>{t('invite_friends_title')}</Text>
                <Text style={styles.subtitle}>
                    {t('invite_friends_subtitle')}
                </Text>
            </View>

            {/* Friends List */}
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {suggestedFriends.map((friend) => {
                    const isInvited = invited.includes(friend.id);
                    return (
                        <Card
                            key={friend.id}
                            variant="outlined"
                            padding="md"
                            style={styles.friendCard}
                        >
                            <View style={styles.friendInfo}>
                                <View style={styles.avatarContainer}>
                                    <Text style={styles.avatarEmoji}>{friend.avatar}</Text>
                                </View>
                                <View style={styles.friendDetails}>
                                    <Text style={styles.friendName}>{friend.name}</Text>
                                    <Text style={styles.friendLanguage}>
                                        {t('learning_prefix')} {t(friend.languageKey)}
                                    </Text>
                                </View>
                            </View>
                            <TouchableOpacity
                                onPress={() => handleInvite(friend.id)}
                                activeOpacity={0.7}
                            >
                                <View
                                    style={[
                                        styles.inviteButton,
                                        isInvited && styles.inviteButtonInvited,
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.inviteButtonText,
                                            isInvited && styles.inviteButtonTextInvited,
                                        ]}
                                    >
                                        {isInvited ? t('invited_status') : t('invite_action')}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </Card>
                    );
                })}

                {/* Benefits */}
                <View style={styles.benefits}>
                    <Text style={styles.benefitsTitle}>{t('why_invite_friends')}</Text>
                    <View style={styles.benefit}>
                        <Text style={styles.benefitIcon}>🏆</Text>
                        <Text style={styles.benefitText}>
                            {t('benefit_cauris')}
                        </Text>
                    </View>
                    <View style={styles.benefit}>
                        <Text style={styles.benefitIcon}>📊</Text>
                        <Text style={styles.benefitText}>
                            {t('benefit_compare')}
                        </Text>
                    </View>
                    <View style={styles.benefit}>
                        <Text style={styles.benefitIcon}>💪</Text>
                        <Text style={styles.benefitText}>
                            {t('benefit_motivate')}
                        </Text>
                    </View>
                </View>
            </ScrollView>

            {/* Footer */}
            <View style={styles.footer}>
                <Button
                    title={invited.length > 0 ? `${t('continue')} (${invited.length})` : t('continue')}
                    variant="primary"
                    size="lg"
                    fullWidth
                    onPress={onNext}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background.secondary,
    },
    header: {
        padding: SPACING.xl,
        paddingTop: SPACING.lg,
    },
    skipButton: {
        alignSelf: 'flex-end',
        marginBottom: SPACING.md,
    },
    skipText: {
        ...TYPOGRAPHY.button,
        color: COLORS.text.tertiary,
        fontSize: 14,
    },
    title: {
        ...TYPOGRAPHY.h3,
        color: COLORS.text.primary,
        marginBottom: SPACING.sm,
    },
    subtitle: {
        ...TYPOGRAPHY.body1,
        color: COLORS.text.secondary,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: SPACING.xl,
        paddingTop: SPACING.md,
    },
    friendCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: SPACING.md,
    },
    friendInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        gap: SPACING.md,
    },
    avatarContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: COLORS.secondary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarEmoji: {
        fontSize: 28,
    },
    friendDetails: {
        flex: 1,
    },
    friendName: {
        ...TYPOGRAPHY.subtitle2,
        color: COLORS.text.primary,
        marginBottom: SPACING.xs,
    },
    friendLanguage: {
        ...TYPOGRAPHY.caption,
        color: COLORS.text.tertiary,
    },
    inviteButton: {
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        backgroundColor: COLORS.primary,
        borderRadius: 20,
    },
    inviteButtonInvited: {
        backgroundColor: COLORS.success,
    },
    inviteButtonText: {
        ...TYPOGRAPHY.button,
        color: COLORS.white,
        fontSize: 12,
    },
    inviteButtonTextInvited: {
        color: COLORS.white,
    },
    benefits: {
        marginTop: SPACING.xl,
        padding: SPACING.lg,
        backgroundColor: COLORS.white,
        borderRadius: 16,
    },
    benefitsTitle: {
        ...TYPOGRAPHY.subtitle1,
        color: COLORS.text.primary,
        marginBottom: SPACING.md,
    },
    benefit: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.sm,
        marginBottom: SPACING.sm,
    },
    benefitIcon: {
        fontSize: 24,
    },
    benefitText: {
        ...TYPOGRAPHY.body2,
        color: COLORS.text.secondary,
        flex: 1,
    },
    footer: {
        padding: SPACING.xl,
        paddingTop: SPACING.md,
        backgroundColor: COLORS.white,
    },
});

export default FriendsStep;
