import * as React from 'react';
import { useState, Dispatch, SetStateAction } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    StatusBar,
    Dimensions,
    Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UserState, PlanType } from '../types';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from '../theme';
import { TranslationKey } from '../translations';
import LevelRanksModal from '../components/LevelRanksModal';
import AvatarPickerModal from '../components/AvatarPickerModal';
import MarketplaceScreen from './MarketplaceScreen';
import XPProgressBar from '../components/ui/XPProgressBar';
import Constants from 'expo-constants';
import { WISDOM_GRADES, CULTURAL_TREASURES, GOLD_CAURI_IMAGE } from '../constants';
import SupportModal from '../components/SupportModal';

const { width } = Dimensions.get('window');
const isSmallDevice = width < 375;

interface ProfileScreenProps {
    user: UserState;
    setUser: React.Dispatch<React.SetStateAction<UserState>>;
    t: (key: TranslationKey) => string;
    onShowSettings: () => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ user, setUser, t, onShowSettings }) => {
    const navigation = useNavigation();
    const [isAvatarModalVisible, setIsAvatarModalVisible] = useState(false);
    const [isMarketplaceVisible, setIsMarketplaceVisible] = useState(false);
    const [isRanksModalVisible, setIsRanksModalVisible] = useState(false);
    const [isSupportModalVisible, setIsSupportModalVisible] = useState(false);

    const getPlanBadge = (plan: PlanType) => {
        switch (plan) {
            case 'premium':
                return t('status_premium');
            case 'student':
                return t('status_student');
            case 'family':
                return t('status_family');
            default:
                return t('status_explorer');
        }
    };

    const getGrade = (xp: number) => {
        const grade = [...WISDOM_GRADES].reverse().find(g => xp >= g.minXp);
        return grade ? t(grade.labelKey) : t('grade_beginner');
    };

    const handleAvatarSelect = (url: string) => {
        setUser(prev => ({ ...prev, avatar: url }));
    };

    const userAvatar = user.avatar || '👩🏾';
    const isEmojiAvatar = !userAvatar.startsWith('http');

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />

            {/* Top Bar Stats */}
            <View style={styles.topStatsBar}>
                <TouchableOpacity style={styles.avatarCircleSmall} onPress={() => setIsAvatarModalVisible(true)}>
                    {isEmojiAvatar ? (
                        <Text style={{ fontSize: 24, textAlign: 'center' }}>{userAvatar}</Text>
                    ) : (
                        <Image source={{ uri: userAvatar }} style={styles.avatarSmall} />
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
                style={styles.content}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Main Profile Header with Vibrant Background */}
                <View style={[styles.profileCard, { backgroundColor: COLORS.primary, paddingBottom: 30 }]}>
                    {/* Marketplace Button */}
                    <TouchableOpacity
                        style={styles.marketplaceBtn}
                        onPress={() => setIsMarketplaceVisible(true)}
                    >
                        <Text style={styles.marketplaceIcon}>🏪</Text>
                    </TouchableOpacity>

                    {/* Settings Gear */}
                    <TouchableOpacity style={styles.settingsBtn} onPress={onShowSettings}>
                        <Text style={styles.settingsIcon}>⚙️</Text>
                    </TouchableOpacity>

                    {/* Avatar with Border */}
                    <View style={styles.avatarContainer}>
                        <View style={[styles.avatarBorder, { borderColor: COLORS.white }]}>
                            {isEmojiAvatar ? (
                                <Text style={{ fontSize: 60, textAlign: 'center' }}>{userAvatar}</Text>
                            ) : (
                                <Image source={{ uri: userAvatar }} style={styles.mainAvatar} />
                            )}
                            <TouchableOpacity
                                style={styles.avatarEditBtn}
                                onPress={() => setIsAvatarModalVisible(true)}
                            >
                                <Text style={styles.avatarEditIcon}>✏️</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={() => setIsAvatarModalVisible(true)} style={styles.changeAvatarBtn}>
                            <Text style={styles.changeAvatarText}>{t('change_avatar')}</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Name */}
                    <View style={styles.nameSection}>
                        <Text style={[styles.nameText, { color: COLORS.white }]}>{user.firstName || "Ami"} {user.lastName || "Yana"}</Text>
                    </View>
                </View>


                <View style={styles.secondaryCard}>
                    {/* Proficiency (Niveau) */}
                    <View style={styles.levelSection}>
                        <View style={styles.levelHeader}>
                            <Text style={styles.levelTitle}>{t('mastery_of')} {user.currentLanguage || 'Wolof'}</Text>
                            <Text style={styles.levelValue}>{t(`level_${user.experienceLevel || 'beginner'}` as TranslationKey)}</Text>
                        </View>
                        <View style={styles.levelBarBg}>
                            <View style={[styles.levelBarFill, { width: user.experienceLevel === 'beginner' ? '25%' : user.experienceLevel === 'intermediate' ? '50%' : '75%' }]} />
                        </View>
                    </View>



                    {/* Stats Grid Buttons */}
                    <View style={styles.statsGrid}>
                        <TouchableOpacity
                            style={[styles.statGridBtn, { backgroundColor: COLORS.primary }]}
                            onPress={() => setIsMarketplaceVisible(true)}
                        >
                            <View style={[styles.pillIconBg, { backgroundColor: '#FFFBEB', marginBottom: 8 }]}>
                                <Image source={GOLD_CAURI_IMAGE} style={{ width: 24, height: 24 }} resizeMode="contain" />
                            </View>
                            <Text style={styles.statGridValue}>{user.shells || 0}</Text>
                            <Text style={styles.statGridLabel}>{t('cauris' as any)}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.statGridBtn, { backgroundColor: COLORS.secondary }]}>
                            <Text style={styles.statGridIcon}>☀️</Text>
                            <Text style={styles.statGridValue}>{user.streak || 0}</Text>
                            <Text style={styles.statGridLabel}>{t('streak')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Grade & Badges Interactive Card */}
                <TouchableOpacity style={styles.gradeInteractiveCard} onPress={() => setIsRanksModalVisible(true)}>
                    <View style={styles.gradeIconBox}>
                        <Text style={styles.gradeEmoji}>🏆</Text>
                    </View>
                    <View style={styles.gradeInfo}>
                        <Text style={styles.gradeLabel}>{t('current_rank')}</Text>
                        <Text style={styles.gradeValue}>{getGrade(user.xp || 0)}</Text>
                        <Text style={styles.gradeHint}>{t('discover_badges')} {'>'}</Text>
                    </View>
                </TouchableOpacity>

                {/* Treasure Palace (Le Palais des Trésors) */}
                <View style={styles.treasureCard}>
                    <View style={styles.treasureHeader}>
                        <Text style={styles.treasureTitle}>🏛️ {t('wisdom_palace')}</Text>
                        <Text style={styles.treasureSubtitle}>{t('heritage_collection')}</Text>
                    </View>
                    <View style={styles.treasureGrid}>
                        {CULTURAL_TREASURES.map((item) => {
                            const isCollected = user.treasures?.includes(item.id);
                            return (
                                <View key={item.id} style={styles.treasureItem}>
                                    <View style={[
                                        styles.treasureIconBox,
                                        !isCollected && styles.treasureLocked
                                    ]}>
                                        <Text style={[
                                            styles.treasureIcon,
                                            !isCollected && { opacity: 0.3 }
                                        ]}>{item.icon}</Text>
                                    </View>
                                    <View style={styles.treasureLabelBox}>
                                        <Text style={[
                                            styles.treasureLabelSmall,
                                            !isCollected && { color: COLORS.gray[400] }
                                        ]}>{t(item.nameKey)}</Text>
                                    </View>
                                </View>
                            );
                        })}
                    </View>
                </View>

                {/* Bottom Menu Grid */}
                <View style={styles.menuGrid}>

                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={() => (navigation as any).navigate('Tutoring')}
                    >
                        <View style={styles.menuIconBox}>
                            <Text style={styles.menuIcon}>🧑‍🏫</Text>
                        </View>
                        <Text style={styles.menuLabel}>{t('tutors')}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={() => setIsSupportModalVisible(true)}
                    >
                        <View style={[styles.menuIconBox, { backgroundColor: '#F0F9FF' }]}>
                            <Text style={styles.menuIcon}>🌍</Text>
                        </View>
                        <Text style={styles.menuLabel}>{t('support_app' as any)}</Text>
                    </TouchableOpacity>
                </View>

                {/* Mission Card */}
                <View style={styles.missionCard}>
                    <Text style={styles.missionTitle}>{t('our_mission_title')}</Text>
                    <Text style={styles.missionText}>
                        {t('yana_mission')}
                    </Text>
                    <Text style={styles.missionSlogan}>"{t('yana_slogan')}"</Text>
                </View>

                {/* Footer Section */}
                <View style={styles.footer}>
                    <Text style={styles.versionText}>{t('version')} 1.0.0</Text>
                </View>
            </ScrollView>

            <LevelRanksModal
                isVisible={isRanksModalVisible}
                onClose={() => setIsRanksModalVisible(false)}
                currentXP={user.xp || 0}
            />

            <AvatarPickerModal
                isVisible={isAvatarModalVisible}
                onClose={() => setIsAvatarModalVisible(false)}
                onSelect={handleAvatarSelect}
            />

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

            <SupportModal
                visible={isSupportModalVisible}
                onClose={() => setIsSupportModalVisible(false)}
                t={t}
            />
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FDF7F0',
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
    content: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: isSmallDevice ? 15 : 20,
        paddingBottom: 40,
        paddingTop: 10,
    },
    profileCard: {
        borderRadius: 40,
        padding: isSmallDevice ? 20 : 25,
        alignItems: 'center',
        ...SHADOWS.lg,
        position: 'relative',
        marginBottom: 20,
    },
    secondaryCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 35,
        padding: isSmallDevice ? 20 : 25,
        alignItems: 'center',
        ...SHADOWS.md,
        marginBottom: 20,
    },
    settingsBtn: {
        position: 'absolute',
        top: 20,
        right: 20,
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        ...SHADOWS.md,
    },
    settingsIcon: {
        fontSize: 22,
    },
    marketplaceBtn: {
        position: 'absolute',
        top: 20,
        left: 20,
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        ...SHADOWS.md,
    },
    marketplaceIcon: {
        fontSize: 22,
    },
    avatarContainer: {
        marginTop: 15,
        marginBottom: 10,
        alignItems: 'center',
    },
    changeAvatarBtn: {
        backgroundColor: 'rgba(255,255,255,0.25)',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
        marginTop: 12,
    },
    changeAvatarText: {
        color: COLORS.white,
        fontWeight: '900',
        fontSize: 12,
        letterSpacing: 1,
    },
    avatarBorder: {
        width: isSmallDevice ? 110 : 130,
        height: isSmallDevice ? 110 : 130,
        borderRadius: 45,
        borderWidth: 4,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.3)',
    },
    mainAvatar: {
        width: '100%',
        height: '100%',
        borderRadius: 35,
    },
    avatarEditBtn: {
        position: 'absolute',
        bottom: -5,
        right: -5,
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
        ...SHADOWS.md,
        borderWidth: 1,
        borderColor: '#EEEEEE',
    },
    avatarEditIcon: {
        fontSize: 16,
    },
    nameSection: {
        alignItems: 'center',
        marginBottom: 0,
    },
    nameText: {
        fontSize: isSmallDevice ? 24 : 28,
        fontWeight: '900',
    },
    gradeInteractiveCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 25,
        padding: 20,
        marginBottom: 20,
        ...SHADOWS.md,
        borderWidth: 2,
        borderColor: '#F0F0F0',
    },
    gradeIconBox: {
        width: 60,
        height: 60,
        borderRadius: 20,
        backgroundColor: '#FFF7ED',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    gradeEmoji: {
        fontSize: 32,
    },
    gradeInfo: {
        flex: 1,
    },
    // Treasure Palace Styles
    treasureCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        padding: 20,
        marginBottom: 20,
        ...SHADOWS.md,
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    treasureHeader: {
        marginBottom: 15,
    },
    treasureTitle: {
        fontSize: 16,
        fontWeight: '900',
        color: COLORS.secondary,
    },
    treasureSubtitle: {
        fontSize: 11,
        color: COLORS.text.tertiary,
        fontWeight: '600',
    },
    treasureGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
    },
    treasureItem: {
        flex: 1,
        alignItems: 'center',
    },
    treasureIconBox: {
        width: 64,
        height: 64,
        borderRadius: 20,
        backgroundColor: '#F8FAFC',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    treasureLocked: {
        backgroundColor: '#F1F5F9',
        borderStyle: 'dashed',
    },
    treasureIcon: {
        fontSize: 28,
    },
    treasureLabelBox: {
        height: 32,
        justifyContent: 'center',
    },
    treasureLabelSmall: {
        fontSize: 9,
        fontWeight: '900',
        color: COLORS.secondary,
        textAlign: 'center',
    },
    gradeLabel: {
        fontSize: 12,
        color: COLORS.text.tertiary,
        fontWeight: '900',
        letterSpacing: 1,
    },
    gradeValue: {
        fontSize: 22,
        fontWeight: '900',
        color: COLORS.secondary,
        marginVertical: 4,
    },
    gradeHint: {
        fontSize: 11,
        color: COLORS.primary,
        fontWeight: '700',
    },
    levelSection: {
        width: '100%',
        backgroundColor: '#F8F9FA',
        padding: 15,
        borderRadius: 20,
        marginBottom: 20,
    },
    levelHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    levelTitle: {
        fontSize: 10,
        fontWeight: '900',
        color: COLORS.text.tertiary,
        letterSpacing: 0.5,
    },
    levelValue: {
        fontSize: 10,
        fontWeight: '900',
        color: COLORS.secondary,
    },
    levelBarBg: {
        height: 8,
        backgroundColor: '#EEEEEE',
        borderRadius: 4,
        overflow: 'hidden',
    },
    levelBarFill: {
        height: '100%',
        backgroundColor: COLORS.secondary,
        borderRadius: 4,
    },
    planBadgeContainer: {
        marginBottom: 20,
    },
    planBadge: {
        backgroundColor: '#FDF7F0',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#F5ECE0',
    },
    planBadgeText: {
        fontSize: 11,
        fontWeight: '900',
        color: '#A67C52',
        letterSpacing: 1,
    },
    statsGrid: {
        flexDirection: 'row',
        width: '100%',
        gap: 15,
    },
    statGridBtn: {
        flex: 1,
        height: isSmallDevice ? 120 : 140,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        ...SHADOWS.md,
    },
    statGridIcon: {
        fontSize: 28,
        marginBottom: 8,
    },
    statGridValue: {
        fontSize: 24,
        fontWeight: '900',
        color: '#FFFFFF',
    },
    statGridLabel: {
        fontSize: 10,
        fontWeight: '900',
        color: '#FFFFFF',
        marginTop: 2,
        letterSpacing: 1,
    },
    menuGrid: {
        gap: 15,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: isSmallDevice ? 15 : 20,
        borderRadius: 25,
        ...SHADOWS.md,
    },
    menuIconBox: {
        width: 48,
        height: 48,
        borderRadius: 15,
        backgroundColor: '#F8F9FA',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    menuIcon: {
        fontSize: 24,
    },
    menuLabel: {
        fontSize: 16,
        fontWeight: '900',
        color: COLORS.secondary,
    },
    footer: {
        marginTop: 30,
        alignItems: 'center',
    },
    versionText: {
        fontSize: 11,
        color: '#BDBDBD',
        fontWeight: '700',
    },
    missionCard: {
        backgroundColor: COLORS.primary,
        borderRadius: 25,
        padding: 20,
        marginTop: 20,
        alignItems: 'center',
        ...SHADOWS.md,
    },
    missionTitle: {
        fontSize: 12,
        fontWeight: '900',
        color: 'rgba(255,255,255,0.8)',
        letterSpacing: 2,
        marginBottom: 10,
    },
    missionText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#FFFFFF',
        textAlign: 'center',
        lineHeight: 20,
        marginBottom: 15,
    },
    missionSlogan: {
        fontSize: 12,
        fontWeight: '900',
        color: '#FFFFFF',
        fontStyle: 'italic',
        opacity: 0.9,
    },
});

export default ProfileScreen;
