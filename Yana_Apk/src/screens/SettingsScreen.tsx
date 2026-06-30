import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    StatusBar,
    Switch,
    Dimensions,
    Modal,
    Alert,
    Pressable,
    Linking,
    Image,
} from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from '../theme';
import { UserState, Language, LanguageProgression } from '../types';
import { TranslationKey } from '../translations';
import { GUMBA_YANA_ABOUT, LANGUAGES, GOLD_CAURI_IMAGE } from '../constants';
import Bayo from '../components/ui/Bayo';
import Button from '../components/ui/Button';
import TermsModal from '../components/TermsModal';
import PrivacyPolicyModal from '../components/PrivacyPolicyModal';

import Constants from 'expo-constants';

const { width, height } = Dimensions.get('window');
const isSmallDevice = width < 375;

const getFlagUrl = (codeOrEmojiOrId: string): string | undefined => {
    const flagMap: Record<string, string> = {
        'fr': 'fr',
        'en': 'gb',
        'de': 'de',
        'ar': 'sa',
        'ja': 'jp',
        'ko': 'kr',
        'es': 'es',
        'wolof': 'sn',
        'serer': 'sn',
        'diola': 'sn',
        'bainouk': 'sn',
        'manjak': 'gw',
        'balante': 'gw',
        'mankagne': 'sn',
        'mandinka': 'sn',
        'bassari': 'sn',
        'hassaniya': 'mr',
        'saafi_saafi': 'sn',
        'menik': 'sn',
        '🇸🇳': 'sn',
        '🇬🇼': 'gw',
        '🇲🇷': 'mr',
        '🇫🇷': 'fr',
        '🇬🇧': 'gb',
        '🇩🇪': 'de',
        '🇸🇦': 'sa',
        '🇯🇵': 'jp',
        '🇰🇷': 'kr',
        '🇪🇸': 'es',
    };
    const c = flagMap[codeOrEmojiOrId];
    return c ? `https://flagcdn.com/w80/${c}.png` : undefined;
};

interface SettingsScreenProps {
    user: UserState;
    setUser: React.Dispatch<React.SetStateAction<UserState>>;
    t: (key: TranslationKey) => string;
    onClose: () => void;
    onLogout: () => void;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ user, setUser, t, onClose, onLogout }) => {
    const [showConfirmModal, setShowConfirmModal] = React.useState(false);
    const [pendingLanguage, setPendingLanguage] = React.useState<string | null>(null);
    const [showInterfaceLangModal, setShowInterfaceLangModal] = React.useState(false);
    const [showTargetLangModal, setShowTargetLangModal] = React.useState(false);
    const [showTermsModal, setShowTermsModal] = React.useState(false);
    const [showPrivacyModal, setShowPrivacyModal] = React.useState(false);

    const interfaceLanguages: { code: 'fr' | 'en' | 'de' | 'ar' | 'ja' | 'ko' | 'es'; name: string; flag: string }[] = [
        { code: 'fr', name: 'Français', flag: '🇫🇷' },
        { code: 'en', name: 'English', flag: '🇬🇧' },
        { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
        { code: 'ar', name: 'العربية', flag: '🇸🇦' },
        { code: 'ja', name: '日本語', flag: '🇯🇵' },
        { code: 'ko', name: '한국어', flag: '🇰🇷' },
        { code: 'es', name: 'Español', flag: '🇪🇸' },
    ];

    const targetLanguagesList = LANGUAGES.map(l => {
        const learnedLangs = Object.keys(user.languageProgressions || {});
        const isUnlocked = learnedLangs.includes(l.id) || user.currentLanguage === l.id;

        return {
            id: l.id,
            name: t(`lang_${l.id}_name` as TranslationKey),
            emoji: l.flag,
            isUnlocked
        };
    });

    const handleLanguageChange = (lang: 'fr' | 'en' | 'de' | 'ar' | 'ja' | 'ko' | 'es') => {
        setUser(prev => ({ ...prev, interfaceLanguage: lang }));
        setShowInterfaceLangModal(false);
    };

    const handleTargetLanguageChange = (langId: string) => {
        setShowTargetLangModal(false);
        if (langId === user.currentLanguage) return;

        const learnedLangs = Object.keys(user.languageProgressions || {});
        if (!learnedLangs.includes(langId) && langId !== user.currentLanguage) {
            Alert.alert(
                "Langue verrouillée",
                "Vous devez d'abord acheter cette langue dans la boutique (Marketplace) pour 6 500 FCFA.",
                [
                    { text: "OK", style: "default" }
                ]
            );
            return;
        }

        setPendingLanguage(langId);
        setShowConfirmModal(true);
    };

    const confirmLanguageChange = () => {
        if (!pendingLanguage) return;

        setUser(prev => {
            const currentLang = prev.currentLanguage;
            const progressions = { ...(prev.languageProgressions || {}) };

            // Sauvegarder la progression actuelle
            progressions[currentLang] = {
                completedLessons: prev.completedLessons || [],
                completedUnits: prev.completedUnits || [],
                lessonScores: prev.lessonScores || {}
            };

            // Charger la progression de la nouvelle langue
            const nextLang = pendingLanguage;
            const nextProg: LanguageProgression = progressions[nextLang] || {
                completedLessons: [],
                completedUnits: [],
                lessonScores: {}
            };

            return {
                ...prev,
                currentLanguage: nextLang,
                completedLessons: nextProg.completedLessons,
                completedUnits: nextProg.completedUnits,
                lessonScores: nextProg.lessonScores,
                languageProgressions: progressions
            };
        });

        setShowConfirmModal(false);
        setPendingLanguage(null);
    };

    const handleVolumeChange = (increase: boolean) => {
        setUser(prev => ({
            ...prev,
            musicVolume: increase
                ? Math.min(1, prev.musicVolume + 0.1)
                : Math.max(0, prev.musicVolume - 0.1)
        }));
    };

    const toggleSFX = (value: boolean) => {
        setUser(prev => ({ ...prev, soundEnabled: value }));
    };

    const handleLogoutPress = () => {
        Alert.alert(
            t('logout_confirm_title'),
            t('logout_confirm_msg'),
            [
                { text: t('cancel'), style: "cancel" },
                {
                    text: t('logout'),
                    style: "destructive",
                    onPress: () => onLogout && onLogout()
                }
            ]
        );
    };

    const renderSettingItem = (icon: string, label: string, value: string | React.ReactNode, onPress?: () => void) => (
        <Pressable
            style={({ pressed }) => [
                styles.settingItem,
                onPress && pressed && { backgroundColor: '#F8F9FA' }
            ]}
            onPress={onPress}
            disabled={!onPress}
        >
            <View style={styles.settingIconBox}>
                <Text style={styles.settingIcon}>{icon}</Text>
            </View>
            <View style={styles.settingContent}>
                <Text style={styles.settingLabel}>{label}</Text>
                {typeof value === 'string' ? (
                    <Text style={styles.settingDescription}>{value}</Text>
                ) : (
                    value
                )}
            </View>
            {onPress && <Text style={styles.chevron}>›</Text>}
        </Pressable>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />

            {/* Header */}
            <View style={styles.header}>
                <Pressable
                    onPress={onClose}
                    style={({ pressed }) => [
                        styles.backBtn,
                        pressed && { backgroundColor: '#F5F5F5', borderRadius: 20 }
                    ]}
                >
                    <Text style={styles.backIcon}>←</Text>
                </Pressable>
                <Text style={styles.headerTitle}>{t('settings')}</Text>
                <View style={{ width: 44 }} />
            </View>

            <ScrollView
                style={styles.content}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Languages Section */}
                <Text style={styles.sectionTitle}>{t('languages_section')}</Text>
                <View style={styles.sectionCard}>
                    {renderSettingItem(
                        '🌐',
                        t('interface_lang'),
                        interfaceLanguages.find(l => l.code === user.interfaceLanguage)?.name || 'Français',
                        () => setShowInterfaceLangModal(true)
                    )}

                    <View style={styles.divider} />

                    {renderSettingItem(
                        '🎯',
                        t('target_lang_label'),
                        targetLanguagesList.find(l => l.id === user.currentLanguage)?.name || 'Wolof',
                        () => setShowTargetLangModal(true)
                    )}

                </View>

                {/* Audio Section */}
                <Text style={styles.sectionTitle}>{t('audio_pref')}</Text>
                <View style={styles.sectionCard}>
                    <View style={styles.audioItem}>
                        <View style={styles.settingIconBox}>
                            <Text style={styles.settingIcon}>🎵</Text>
                        </View>
                        <View style={styles.audioContent}>
                            <Text style={styles.settingLabel}>{t('music')}</Text>
                            <View style={styles.volumeRow}>
                                <TouchableOpacity
                                    onPress={() => handleVolumeChange(false)}
                                    style={styles.volumeBtn}
                                >
                                    <Text style={styles.volumeBtnText}>-</Text>
                                </TouchableOpacity>
                                <View style={styles.volumeTrack}>
                                    <View style={[styles.volumeFill, { width: `${(user.musicVolume || 0.5) * 100}%` }]} />
                                </View>
                                <TouchableOpacity
                                    onPress={() => handleVolumeChange(true)}
                                    style={styles.volumeBtn}
                                >
                                    <Text style={styles.volumeBtnText}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.audioItem}>
                        <View style={styles.settingIconBox}>
                            <Text style={styles.settingIcon}>🔊</Text>
                        </View>
                        <View style={styles.audioContent}>
                            <Text style={styles.settingLabel}>{t('sounds')}</Text>
                        </View>
                        <Switch
                            value={user.soundEnabled}
                            onValueChange={toggleSFX}
                            trackColor={{ false: '#EEEEEE', true: COLORS.primary }}
                            thumbColor={'#FFFFFF'}
                        />
                    </View>
                </View>

                {/* Support & Legal */}
                <Text style={styles.sectionTitle}>{t('about')}</Text>
                <View style={styles.sectionCard}>
                    {renderSettingItem('ℹ️', t('about'), t('about_gumba_yana_site'), () => { Linking.openURL('https://gumbayana.com/') })}
                    <View style={styles.divider} />
                    {renderSettingItem('🛡️', t('privacy_policy_title'), t('privacy_policy_sub'), () => { setShowPrivacyModal(true) })}
                    <View style={styles.divider} />
                    {renderSettingItem('📁', t('terms_of_use_title'), t('terms_of_use_sub'), () => { setShowTermsModal(true) })}
                </View>

                {/* Version */}
                <View style={styles.versionContainer}>
                    <Text style={styles.versionLabel}>{t('version')}</Text>
                    <Text style={styles.versionValue}>Gümba Yana v1.0.0-gold</Text>
                </View>

                {/* Logout Button */}
                <Pressable
                    style={({ pressed }) => [
                        styles.logoutBtn,
                        pressed && { backgroundColor: '#FAD1D1' }
                    ]}
                    onPress={handleLogoutPress}
                >
                    <Text style={styles.logoutBtnText}>{t('logout')}</Text>
                </Pressable>
            </ScrollView>

            {/* Interface Language Modal */}
            <Modal
                visible={showInterfaceLangModal}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setShowInterfaceLangModal(false)}
            >
                <View style={styles.bottomSheetOverlay}>
                    <View style={styles.bottomSheetContent}>
                        <View style={styles.bottomSheetHeader}>
                            <Text style={styles.bottomSheetTitle}>{t('interface_lang')}</Text>
                            <TouchableOpacity onPress={() => setShowInterfaceLangModal(false)} style={styles.bottomSheetClose}>
                                <Text style={styles.bottomSheetCloseText}>✕</Text>
                            </TouchableOpacity>
                        </View>
                        <ScrollView showsVerticalScrollIndicator={false} style={{ width: '100%', maxHeight: height * 0.6 }}>
                            {interfaceLanguages.map((l) => (
                                <Pressable
                                    key={l.code}
                                    style={({ pressed }) => [
                                        styles.dropdownItem,
                                        user.interfaceLanguage === l.code && styles.dropdownItemSelected,
                                        pressed && { backgroundColor: COLORS.secondaryLight }
                                    ]}
                                    onPress={() => handleLanguageChange(l.code)}
                                >
                                    {getFlagUrl(l.code) ? (
                                        <Image source={{ uri: getFlagUrl(l.code) }} style={styles.dropdownFlagImage} />
                                    ) : (
                                        <Text style={styles.dropdownFlag}>{l.flag}</Text>
                                    )}
                                    <Text style={[styles.dropdownName, user.interfaceLanguage === l.code && styles.dropdownNameSelected]}>{l.name}</Text>
                                    {user.interfaceLanguage === l.code && <Text style={styles.dropdownCheck}>✓</Text>}
                                </Pressable>
                            ))}
                        </ScrollView>
                    </View>
                </View>
            </Modal>

            {/* Target Language Modal */}
            <Modal
                visible={showTargetLangModal}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setShowTargetLangModal(false)}
            >
                <View style={styles.bottomSheetOverlay}>
                    <View style={styles.bottomSheetContent}>
                        <View style={styles.bottomSheetHeader}>
                            <Text style={styles.bottomSheetTitle}>{t('target_lang_label')}</Text>
                            <Pressable
                                onPress={() => setShowTargetLangModal(false)}
                                style={({ pressed }) => [
                                    styles.bottomSheetClose,
                                    pressed && { backgroundColor: '#E5E5E5' }
                                ]}
                            >
                                <Text style={styles.bottomSheetCloseText}>✕</Text>
                            </Pressable>
                        </View>
                        <ScrollView showsVerticalScrollIndicator={false} style={{ width: '100%', maxHeight: height * 0.6 }}>
                            {targetLanguagesList.map((tl) => (
                                <Pressable
                                    key={tl.id}
                                    style={({ pressed }) => [
                                        styles.dropdownItem,
                                        user.currentLanguage === tl.id && styles.dropdownItemSelected,
                                        !tl.isUnlocked && styles.dropdownItemLocked,
                                        pressed && { backgroundColor: COLORS.secondaryLight }
                                    ]}
                                    onPress={() => handleTargetLanguageChange(tl.id)}
                                >
                                    {getFlagUrl(tl.id) ? (
                                        <Image source={{ uri: getFlagUrl(tl.id) }} style={[styles.dropdownFlagImage, !tl.isUnlocked && { opacity: 0.5 }]} />
                                    ) : (
                                        <Text style={[styles.dropdownFlag, !tl.isUnlocked && { opacity: 0.5 }]}>{tl.emoji}</Text>
                                    )}
                                    <Text style={[
                                        styles.dropdownName,
                                        user.currentLanguage === tl.id && styles.dropdownNameSelected,
                                        !tl.isUnlocked && styles.dropdownNameLocked
                                    ]}>
                                        {tl.name}
                                    </Text>
                                    {user.currentLanguage === tl.id ? (
                                        <Text style={styles.dropdownCheck}>✓</Text>
                                    ) : !tl.isUnlocked ? (
                                        <View style={styles.lockBadge}>
                                            <Text style={styles.lockText}>1000 </Text>
                                            <Image source={GOLD_CAURI_IMAGE} style={{ width: 14, height: 14 }} resizeMode="contain" />
                                        </View>
                                    ) : null}
                                </Pressable>
                            ))}
                        </ScrollView>
                    </View>
                </View>
            </Modal>

            {/* Confirmation Modal for Language Change */}
            <Modal
                visible={showConfirmModal}
                transparent={true}
                animationType="fade"
                onRequestClose={() => {
                    setShowConfirmModal(false);
                    setPendingLanguage(null);
                }}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Bayo emotion="thinking" size="lg" style={{ marginBottom: 20 }} />

                        <Text style={styles.modalTitle}>{t('lang_switch_title')}</Text>
                        <Text style={styles.modalText}>
                            {t('lang_switch_msg')}
                        </Text>

                        <View style={styles.modalButtons}>
                            <Pressable
                                style={({ pressed }) => [
                                    styles.modalBtn,
                                    styles.modalBtnSecondary,
                                    pressed && { backgroundColor: '#E5E5E5' }
                                ]}
                                onPress={() => {
                                    setShowConfirmModal(false);
                                    setPendingLanguage(null);
                                }}
                            >
                                <Text style={styles.modalBtnTextSecondary}>{t('lang_switch_cancel')}</Text>
                            </Pressable>
                            <Pressable
                                style={({ pressed }) => [
                                    styles.modalBtn,
                                    styles.modalBtnPrimary,
                                    pressed && { backgroundColor: COLORS.pressed.primary }
                                ]}
                                onPress={confirmLanguageChange}
                            >
                                <Text style={styles.modalBtnTextPrimary}>{t('lang_switch_continue')}</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>

            <TermsModal
                visible={showTermsModal}
                onClose={() => setShowTermsModal(false)}
                t={t}
            />

            <PrivacyPolicyModal
                visible={showPrivacyModal}
                onClose={() => setShowPrivacyModal(false)}
                t={t}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FDF7F0',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SPACING.md,
        paddingTop: Constants.statusBarHeight + 10,
        paddingBottom: 20,
        backgroundColor: '#FFFFFF',
        ...SHADOWS.sm,
    },
    backBtn: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backIcon: {
        fontSize: 24,
        color: COLORS.secondary,
        fontWeight: '900',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '900',
        color: COLORS.secondary,
        letterSpacing: 1,
    },
    content: {
        flex: 1,
    },
    scrollContent: {
        padding: isSmallDevice ? 15 : 20,
        paddingBottom: 50,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: '900',
        color: COLORS.text.tertiary,
        marginBottom: 10,
        marginTop: 20,
        marginLeft: 10,
        letterSpacing: 1.5,
        textTransform: 'uppercase',
    },
    sectionCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 25,
        padding: 5,
        ...SHADOWS.md,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
    },
    settingIconBox: {
        width: 44,
        height: 44,
        borderRadius: 15,
        backgroundColor: '#F8F9FA',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    settingIcon: {
        fontSize: 20,
    },
    settingContent: {
        flex: 1,
    },
    settingLabel: {
        fontSize: 15,
        fontWeight: '900',
        color: COLORS.secondary,
        marginBottom: 2,
    },
    settingDescription: {
        fontSize: 12,
        color: COLORS.text.tertiary,
        fontWeight: '600',
    },
    chevron: {
        fontSize: 24,
        color: '#BDBDBD',
        marginLeft: 10,
        fontWeight: '300',
    },
    divider: {
        height: 1,
        backgroundColor: '#F5F5F5',
        marginHorizontal: 15,
    },
    limitContainer: {
        padding: 15,
        alignItems: 'center',
    },
    limitInfo: {
        marginBottom: 10,
    },
    limitLabel: {
        fontSize: 13,
        fontWeight: '700',
        color: COLORS.text.secondary,
    },
    unlockBtn: {
        backgroundColor: COLORS.secondaryLight,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: COLORS.primaryDark + '30',
    },
    unlockBtnText: {
        color: COLORS.primaryDark,
        fontSize: 13,
        fontWeight: '800',
    },
    langGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        padding: 15,
        paddingTop: 0,
    },
    langPill: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 15,
        backgroundColor: '#F8F9FA',
        borderWidth: 1.5,
        borderColor: 'transparent',
    },
    langPillActive: {
        backgroundColor: COLORS.secondaryLight,
        borderColor: COLORS.primary,
    },
    langFlag: {
        fontSize: 16,
        marginRight: 8,
    },
    langName: {
        fontSize: 12,
        fontWeight: '800',
        color: COLORS.text.secondary,
    },
    langNameActive: {
        color: COLORS.primary,
    },
    langPillDisabled: {
        opacity: 0.5,
    },
    warningContainer: {
        paddingHorizontal: 15,
        paddingBottom: 10,
    },
    warningText: {
        fontSize: 11,
        color: COLORS.primary,
        fontWeight: '700',
        backgroundColor: COLORS.secondaryLight,
        padding: 8,
        borderRadius: 10,
        textAlign: 'center',
    },
    audioItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
    },
    audioContent: {
        flex: 1,
    },
    volumeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
        gap: 12,
    },
    volumeBtn: {
        width: 30,
        height: 30,
        borderRadius: 10,
        backgroundColor: '#F8F9FA',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#EEEEEE',
    },
    volumeBtnText: {
        fontSize: 18,
        fontWeight: '900',
        color: COLORS.secondary,
    },
    volumeTrack: {
        flex: 1,
        height: 8,
        backgroundColor: '#EEEEEE',
        borderRadius: 4,
        overflow: 'hidden',
    },
    volumeFill: {
        height: '100%',
        backgroundColor: COLORS.primary,
    },
    versionContainer: {
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 20,
    },
    versionLabel: {
        fontSize: 10,
        fontWeight: '900',
        color: COLORS.text.tertiary,
        letterSpacing: 1,
        marginBottom: 4,
    },
    versionValue: {
        fontSize: 13,
        fontWeight: '700',
        color: COLORS.secondary,
    },
    logoutBtn: {
        height: 60,
        borderRadius: 20,
        backgroundColor: '#FADBD8',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        ...SHADOWS.sm,
    },
    logoutBtnText: {
        fontSize: 14,
        fontWeight: '900',
        color: '#C0392B',
        letterSpacing: 1,
    },
    // Modal Styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 25,
    },
    modalContent: {
        backgroundColor: '#FFFFFF',
        borderRadius: 35,
        width: '100%',
        padding: 30,
        alignItems: 'center',
        ...SHADOWS.lg,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: '900',
        color: COLORS.secondary,
        marginBottom: 10,
        textAlign: 'center',
    },
    modalText: {
        fontSize: 15,
        color: COLORS.text.tertiary,
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 25,
        fontWeight: '600',
    },
    modalButtons: {
        flexDirection: 'row',
        gap: 15,
        width: '100%',
    },
    modalBtn: {
        flex: 1,
        height: 55,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        ...SHADOWS.sm,
    },
    modalBtnPrimary: {
        backgroundColor: COLORS.primary,
    },
    modalBtnSecondary: {
        backgroundColor: '#F5F5F5',
    },
    modalBtnTextPrimary: {
        color: '#FFFFFF',
        fontWeight: '900',
        fontSize: 15,
    },
    modalBtnTextSecondary: {
        color: COLORS.secondary,
        fontWeight: '900',
        fontSize: 15,
    },
    // Bottom Sheet Styles for Dropdowns
    bottomSheetOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    bottomSheetContent: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        padding: 25,
        paddingBottom: 40,
        ...SHADOWS.lg,
        alignItems: 'center',
    },
    bottomSheetHeader: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    bottomSheetTitle: {
        fontSize: 18,
        fontWeight: '900',
        color: COLORS.secondary,
        letterSpacing: 1,
    },
    bottomSheetClose: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomSheetCloseText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.secondary,
    },
    dropdownItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: '#F8F9FA',
        borderRadius: 20,
        marginBottom: 10,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    dropdownItemSelected: {
        backgroundColor: COLORS.secondaryLight,
        borderColor: COLORS.primary,
    },
    dropdownFlag: {
        fontSize: 24,
        marginRight: 15,
    },
    dropdownFlagImage: {
        width: 30,
        height: 20,
        marginRight: 15,
        borderRadius: 3,
    },
    dropdownName: {
        flex: 1,
        fontSize: 16,
        fontWeight: '800',
        color: COLORS.text.primary,
    },
    dropdownNameSelected: {
        color: COLORS.primary,
    },
    dropdownCheck: {
        fontSize: 20,
        fontWeight: '900',
        color: COLORS.primary,
    },
    dropdownItemLocked: {
        backgroundColor: '#F1F5F9',
        borderColor: 'transparent',
    },
    dropdownNameLocked: {
        color: '#94A3B8',
    },
    lockBadge: {
        backgroundColor: '#FFFBEB',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#FEF3C7',
    },
    lockText: {
        fontSize: 11,
        fontWeight: '900',
        color: '#D97706',
    },
});

export default SettingsScreen;
