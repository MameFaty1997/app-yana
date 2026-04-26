import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    Dimensions,
    Alert,
    Modal,
    Image,
    Pressable,
} from 'react-native';
import { UserState, Language } from '../types';
import { LANGUAGES, GOLD_CAURI_IMAGE } from '../constants';
import { COLORS, SHADOWS } from '../theme';
import { TranslationKey } from '../translations';
import Bayo from '../components/ui/Bayo';

const { width } = Dimensions.get('window');
const isSmallDevice = width < 375;

interface MarketplaceScreenProps {
    user: UserState;
    setUser: React.Dispatch<React.SetStateAction<UserState>>;
    onClose: () => void;
    t: (key: TranslationKey) => string;
    onShowSubscription?: () => void;
}

const MarketplaceScreen: React.FC<MarketplaceScreenProps> = ({ user, setUser, onClose, t, onShowSubscription }) => {
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [selectedPack, setSelectedPack] = useState<{ id: string, amount: number, price: string, bonus: string | null } | null>(null);

    const caurisPacks = [
        { id: 'pack1', amount: 100, price: '1 000 FCFA', bonus: null },
        { id: 'pack2', amount: 300, price: '2 500 FCFA', bonus: '+20%' },
        { id: 'pack3', amount: 800, price: '5 000 FCFA', bonus: '+60%' },
        { id: 'pack4', amount: 2000, price: '10 000 FCFA', bonus: '+100%' },
    ];

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

            {/* Header */}
            <View style={styles.headerBar}>
                <Pressable
                    onPress={onClose}
                    style={({ pressed }) => [
                        styles.closeBtn,
                        pressed && { backgroundColor: '#F5F5F5', borderRadius: 20 }
                    ]}
                >
                    <Text style={styles.closeText}>✕</Text>
                </Pressable>
                <Text style={styles.headerLabel}>BOUTIQUE</Text>
                <View style={styles.balanceBadge}>
                    <Image source={GOLD_CAURI_IMAGE} style={{ width: 22, height: 22, marginRight: 6 }} resizeMode="contain" />
                    <Text style={styles.balanceText}>{user.shells || 0}</Text>
                </View>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                {/* Hero Section */}
                <View style={styles.heroSection}>
                    <Bayo emotion="excited" size="lg" />
                    <Text style={styles.title}>Recharge tes Cauris !</Text>
                    <Text style={styles.subtitle}>Les Cauris te permettent de débloquer de nouvelles langues, regagner des vies, ou faire des traductions instantanées.</Text>
                </View>

                {/* Cauris Packs */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Packs de Cauris</Text>
                    <View style={styles.grid}>
                        {caurisPacks.map((pack) => (
                            <Pressable
                                key={pack.id}
                                style={({ pressed }) => [
                                    styles.packCard,
                                    pressed && { backgroundColor: '#F8F9FA', transform: [{ scale: 0.98 }] }
                                ]}
                                onPress={() => {
                                    setSelectedPack(pack);
                                    setShowPaymentModal(true);
                                }}
                            >
                                {pack.bonus && (
                                    <View style={styles.bonusBadge}>
                                        <Text style={styles.bonusText}>{pack.bonus}</Text>
                                    </View>
                                )}
                                <View style={styles.packIconBox}>
                                    {pack.amount >= 800 ? (
                                        <Text style={styles.packIcon}>💰</Text>
                                    ) : (
                                        <Image source={GOLD_CAURI_IMAGE} style={{ width: 40, height: 40 }} resizeMode="contain" />
                                    )}
                                </View>
                                <Text style={styles.packAmount}>{pack.amount} Cauris</Text>
                                <View style={styles.priceBtn}>
                                    <Text style={styles.priceBtnText}>{pack.price}</Text>
                                </View>
                            </Pressable>
                        ))}
                    </View>
                </View>

                {/* Challenges & Hearts Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{t('market_boosts' as TranslationKey) || 'Défis & Vies'}</Text>
                    <View style={styles.boostList}>
                        <Pressable
                            style={({ pressed }) => [
                                styles.boostCard,
                                pressed && { transform: [{ scale: 0.98 }], backgroundColor: '#F8FAFC' }
                            ]}
                            onPress={() => {
                                const cost = 500;
                                if ((user.shells || 0) >= cost) {
                                    Alert.alert(
                                        t('refill_hearts' as TranslationKey),
                                        `Voulez-vous recharger vos 5 vies pour ${cost} Cauris ?`,
                                        [
                                            { text: t('cancel' as TranslationKey), style: 'cancel' },
                                            {
                                                text: t('validate' as TranslationKey), onPress: () => {
                                                    setUser(prev => ({ ...prev, shells: (prev.shells || 0) - cost, hearts: 5 }));
                                                    Alert.alert("Succès", "Vos vies ont été rechargées ! ❤️");
                                                }
                                            }
                                        ]
                                    );
                                } else {
                                    Alert.alert("Erreur", t('insufficient_cauris' as TranslationKey));
                                }
                            }}
                        >
                            <View style={[styles.boostIconBox, { backgroundColor: '#FEE2E2' }]}>
                                <Text style={styles.boostIcon}>❤️</Text>
                            </View>
                            <View style={styles.boostInfo}>
                                <Text style={styles.boostTitle}>{t('refill_hearts' as TranslationKey)}</Text>
                                <Text style={styles.boostDesc}>{t('refill_hearts_desc' as TranslationKey)}</Text>
                            </View>
                            <View style={styles.boostPrice}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={styles.boostPriceText}>500 </Text>
                                    <Image source={GOLD_CAURI_IMAGE} style={{ width: 14, height: 14 }} resizeMode="contain" />
                                </View>
                            </View>
                        </Pressable>

                        <Pressable
                            style={({ pressed }) => [
                                styles.boostCard,
                                pressed && { transform: [{ scale: 0.98 }], backgroundColor: '#F8FAFC' }
                            ]}
                            onPress={() => {
                                const cost = 250;
                                if ((user.shells || 0) >= cost) {
                                    Alert.alert(
                                        t('streak_freeze' as TranslationKey),
                                        `Voulez-vous acheter une protection de série pour ${cost} Cauris ?`,
                                        [
                                            { text: t('cancel' as TranslationKey), style: 'cancel' },
                                            {
                                                text: t('validate' as TranslationKey), onPress: () => {
                                                    setUser(prev => ({ ...prev, shells: (prev.shells || 0) - cost }));
                                                    Alert.alert("Succès", "Votre série est maintenant protégée ! 🔥");
                                                }
                                            }
                                        ]
                                    );
                                } else {
                                    Alert.alert("Erreur", t('insufficient_cauris' as TranslationKey));
                                }
                            }}
                        >
                            <View style={[styles.boostIconBox, { backgroundColor: '#FEF3C7' }]}>
                                <Text style={styles.boostIcon}>🧊</Text>
                            </View>
                            <View style={styles.boostInfo}>
                                <Text style={styles.boostTitle}>{t('streak_freeze' as TranslationKey)}</Text>
                                <Text style={styles.boostDesc}>{t('streak_freeze_desc' as TranslationKey)}</Text>
                            </View>
                            <View style={styles.boostPrice}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={styles.boostPriceText}>250 </Text>
                                    <Image source={GOLD_CAURI_IMAGE} style={{ width: 14, height: 14 }} resizeMode="contain" />
                                </View>
                            </View>
                        </Pressable>
                    </View>
                </View>

                {/* Languages Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{t('unlock_all_languages' as TranslationKey) || 'Débloquer des Langues'}</Text>
                    <View style={styles.grid}>
                        {LANGUAGES.map((lang) => {
                            const learnedLangs = Object.keys(user.languageProgressions || {});
                            const totalLangs = Array.from(new Set([...learnedLangs, user.currentLanguage || ''])).filter(Boolean);
                            const isLearned = learnedLangs.includes(lang.id) || user.currentLanguage === lang.id;
                            const isFreeUnlock = (!user.user_plan || user.user_plan === 'freemium') && totalLangs.length < 3;
                            const caurisCost = isFreeUnlock ? 0 : 1000;
                            const displayPrice = isFreeUnlock ? 'Gratuit' : '1000 ';

                            return (
                                <View key={lang.id} style={styles.cardTouch}>
                                    <View style={styles.languageCard}>
                                        {/* Character Illustration */}
                                        <View style={styles.characterContainer}>
                                            <Image
                                                source={lang.image}
                                                style={styles.characterImage}
                                                resizeMode="cover"
                                            />

                                            {/* Stylized Corners */}
                                            <View style={[styles.corner, styles.topLeft, { borderColor: COLORS.primary }]} />
                                            <View style={[styles.corner, styles.topRight, { borderColor: COLORS.primary }]} />
                                            <View style={[styles.corner, styles.bottomLeft, { borderColor: COLORS.primary }]} />
                                            <View style={[styles.corner, styles.bottomRight, { borderColor: COLORS.primary }]} />
                                        </View>

                                        {/* Info Box */}
                                        <View style={styles.infoBox}>
                                            <Text style={[styles.languageName, { color: COLORS.text.primary }]} numberOfLines={1}>
                                                {lang.name}
                                            </Text>

                                            <View style={styles.actionContainer}>
                                                {isLearned ? (
                                                    <View style={[styles.actionBtn, { backgroundColor: '#E8F5E9' }]}>
                                                        <Text style={[styles.actionBtnText, { color: '#2E7D32' }]}>Possédé</Text>
                                                    </View>
                                                ) : (
                                                    <Pressable
                                                        style={({ pressed }) => [
                                                            styles.actionBtn,
                                                            { backgroundColor: pressed ? '#FEF3C7' : '#FFFBEB' }
                                                        ]}
                                                        onPress={() => {
                                                            const userShells = user.shells || 0;
                                                            if (userShells >= caurisCost) {
                                                                Alert.alert(
                                                                    t('buy_lang' as TranslationKey) || 'Débloquer la langue',
                                                                    isFreeUnlock ? `Voulez-vous débloquer le ${lang.name} gratuitement ?` : `Voulez-vous débloquer le ${lang.name} pour ${caurisCost} Cauris ?`,
                                                                    [
                                                                        { text: t('cancel' as TranslationKey) || 'Annuler', style: 'cancel' },
                                                                        {
                                                                            text: t('validate' as TranslationKey) || 'Confirmer',
                                                                            onPress: () => {
                                                                                setUser(prev => ({
                                                                                    ...prev,
                                                                                    shells: (prev.shells || 0) - caurisCost,
                                                                                    languageProgressions: {
                                                                                        ...prev.languageProgressions,
                                                                                        [lang.id]: {
                                                                                            level: 1,
                                                                                            xp: 0,
                                                                                            completedLessons: [],
                                                                                            completedUnits: [],
                                                                                            lessonScores: {}
                                                                                        }
                                                                                    }
                                                                                }));
                                                                                Alert.alert("Succès", t('buy_lang_success' as TranslationKey) || 'Langue débloquée avec succès !');
                                                                            }
                                                                        }
                                                                    ]
                                                                );
                                                            } else {
                                                                Alert.alert("Erreur", t('insufficient_cauris' as TranslationKey) || "Pas assez de Cauris !");
                                                            }
                                                        }}
                                                    >
                                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                            <Text style={[styles.actionBtnText, { color: '#D97706' }]}>{displayPrice}</Text>
                                                            {!isFreeUnlock && <Image source={GOLD_CAURI_IMAGE} style={{ width: 16, height: 16 }} resizeMode="contain" />}
                                                        </View>
                                                    </Pressable>
                                                )}
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            );
                        })}
                    </View>
                </View>

                {/* Premium Banner */}
                {onShowSubscription && user.user_plan !== 'premium' && (
                    <TouchableOpacity
                        style={styles.premiumBanner}
                        onPress={() => {
                            onClose();
                            onShowSubscription();
                        }}
                    >
                        <View style={styles.premiumIconBox}>
                            <Text style={styles.premiumIcon}>👑</Text>
                        </View>
                        <View style={styles.premiumInfo}>
                            <Text style={styles.premiumTitle}>Passer à Premium</Text>
                            <Text style={styles.premiumDesc}>Débloque tout en illimité !</Text>
                        </View>
                        <View style={styles.premiumArrowBox}>
                            <Text style={styles.premiumArrow}>›</Text>
                        </View>
                    </TouchableOpacity>
                )}

                <View style={{ height: 40 }} />
            </ScrollView>

            {/* Payment Modal */}
            <Modal
                visible={showPaymentModal}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setShowPaymentModal(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Moyen de paiement</Text>
                            <TouchableOpacity onPress={() => setShowPaymentModal(false)} style={styles.modalCloseBtn}>
                                <Text style={styles.modalCloseText}>✕</Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.modalSubtitle}>
                            Choisissez comment vous souhaitez régler votre pack de {selectedPack?.amount} Cauris ({selectedPack?.price}).
                        </Text>

                        <TouchableOpacity
                            style={styles.paymentOption}
                            onPress={() => {
                                setShowPaymentModal(false);
                                Alert.alert("Intégration Mobile Money", "L'API Mobile Money sera connectée ici prochainement.");
                            }}
                        >
                            <View style={[styles.paymentIconBox, { backgroundColor: '#FFF3E0' }]}>
                                <Text style={styles.paymentIcon}>📱</Text>
                            </View>
                            <View style={styles.paymentInfo}>
                                <Text style={styles.paymentTitle}>Mobile Money</Text>
                                <Text style={styles.paymentDesc}>Orange Money, Wave, Mixx by Yas, Expresso, InTouch</Text>
                            </View>
                            <Text style={styles.paymentArrow}>›</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.paymentOption}
                            onPress={() => {
                                setShowPaymentModal(false);
                                Alert.alert("Intégration Paiement", "L'API de paiement par Carte Bancaire sera connectée ici prochainement.");
                            }}
                        >
                            <View style={[styles.paymentIconBox, { backgroundColor: '#E3F2FD' }]}>
                                <Text style={styles.paymentIcon}>💳</Text>
                            </View>
                            <View style={styles.paymentInfo}>
                                <Text style={styles.paymentTitle}>Carte Bancaire</Text>
                                <Text style={styles.paymentDesc}>Paiement sécurisé via Stripe</Text>
                            </View>
                            <Text style={styles.paymentArrow}>›</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    headerBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 20,
        backgroundColor: COLORS.white,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    closeBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#F1F5F9',
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.secondary,
    },
    headerLabel: {
        fontSize: 14,
        fontWeight: '900',
        color: COLORS.text.tertiary,
        letterSpacing: 2,
    },
    balanceBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFBEB',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#FEF3C7',
    },
    balanceIcon: {
        fontSize: 16,
        marginRight: 6,
    },
    balanceText: {
        fontSize: 14,
        fontWeight: '900',
        color: '#D97706',
    },
    content: {
        flex: 1,
    },
    scrollContent: {
        paddingTop: 30,
        paddingBottom: 50,
    },
    heroSection: {
        alignItems: 'center',
        paddingHorizontal: 30,
        marginBottom: 30,
    },
    title: {
        fontSize: isSmallDevice ? 22 : 26,
        fontWeight: '900',
        color: COLORS.secondary,
        textAlign: 'center',
        marginTop: 15,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: COLORS.text.tertiary,
        textAlign: 'center',
        fontWeight: '600',
        lineHeight: 20,
    },
    section: {
        paddingHorizontal: 20,
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '900',
        color: COLORS.secondary,
        marginBottom: 15,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 15,
    },
    packCard: {
        backgroundColor: COLORS.white,
        width: '47%',
        borderRadius: 24,
        padding: 15,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#F1F5F9',
        ...SHADOWS.sm,
        position: 'relative',
    },
    bonusBadge: {
        position: 'absolute',
        top: -10,
        right: -5,
        backgroundColor: '#F59E0B',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: COLORS.white,
        zIndex: 2,
    },
    bonusText: {
        color: COLORS.white,
        fontSize: 10,
        fontWeight: '900',
    },
    packIconBox: {
        width: 60,
        height: 60,
        borderRadius: 20,
        backgroundColor: '#FFFBEB',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 5,
    },
    packIcon: {
        fontSize: 32,
    },
    packAmount: {
        fontSize: 18,
        fontWeight: '900',
        color: COLORS.secondary,
        marginBottom: 15,
    },
    priceBtn: {
        backgroundColor: '#F8FAFC',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 15,
        width: '100%',
        alignItems: 'center',
    },
    priceBtnText: {
        fontSize: 14,
        fontWeight: '800',
        color: COLORS.primary,
    },
    // Boost Section Styles
    boostList: {
        gap: 12,
    },
    boostCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        borderRadius: 20,
        padding: 15,
        borderWidth: 1,
        borderColor: '#F1F5F9',
        ...SHADOWS.sm,
    },
    boostIconBox: {
        width: 48,
        height: 48,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    boostIcon: {
        fontSize: 22,
    },
    boostInfo: {
        flex: 1,
    },
    boostTitle: {
        fontSize: 15,
        fontWeight: '900',
        color: COLORS.secondary,
        marginBottom: 2,
    },
    boostDesc: {
        fontSize: 12,
        color: COLORS.text.tertiary,
        fontWeight: '600',
    },
    boostPrice: {
        backgroundColor: '#FFFBEB',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#FEF3C7',
    },
    boostPriceText: {
        fontSize: 13,
        fontWeight: '900',
        color: '#D97706',
    },
    // Language Cards (from TargetLanguageStep)
    cardTouch: {
        width: '47%',
        aspectRatio: isSmallDevice ? 0.75 : 0.7,
        marginBottom: 15,
    },
    languageCard: {
        flex: 1,
        borderRadius: 25,
        backgroundColor: '#1a1a1a',
        overflow: 'hidden',
        ...SHADOWS.md,
        borderWidth: 2,
        borderColor: '#F1F5F9',
    },
    characterContainer: {
        flex: 1.5,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        backgroundColor: '#2c2c2c',
    },
    characterImage: {
        width: '100%',
        height: '100%',
    },
    corner: {
        position: 'absolute',
        width: 12,
        height: 12,
        borderWidth: 2.5,
    },
    topLeft: {
        top: 10,
        left: 10,
        borderRightWidth: 0,
        borderBottomWidth: 0,
    },
    topRight: {
        top: 10,
        right: 10,
        borderLeftWidth: 0,
        borderBottomWidth: 0,
    },
    bottomLeft: {
        bottom: 10,
        left: 10,
        borderRightWidth: 0,
        borderTopWidth: 0,
    },
    bottomRight: {
        bottom: 10,
        right: 10,
        borderLeftWidth: 0,
        borderTopWidth: 0,
    },
    infoBox: {
        backgroundColor: '#FFFFFF',
        padding: 10,
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        minHeight: isSmallDevice ? 65 : 80,
        justifyContent: 'center',
    },
    languageName: {
        fontSize: isSmallDevice ? 15 : 17,
        fontWeight: '900',
        marginBottom: 8,
        textAlign: 'center',
    },
    actionContainer: {
        width: '100%',
        alignItems: 'center',
    },
    actionBtn: {
        paddingHorizontal: 15,
        paddingVertical: 6,
        borderRadius: 15,
        width: '100%',
        alignItems: 'center',
    },
    actionBtnText: {
        fontSize: 13,
        fontWeight: '900',
    },
    premiumBanner: {
        marginHorizontal: 20,
        backgroundColor: COLORS.secondary,
        borderRadius: 24,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        ...SHADOWS.md,
    },
    premiumIconBox: {
        width: 50,
        height: 50,
        borderRadius: 16,
        backgroundColor: 'rgba(255,255,255,0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    premiumIcon: {
        fontSize: 24,
    },
    premiumInfo: {
        flex: 1,
    },
    premiumTitle: {
        color: COLORS.white,
        fontSize: 18,
        fontWeight: '900',
        marginBottom: 4,
    },
    premiumDesc: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 13,
        fontWeight: '600',
    },
    premiumArrowBox: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    premiumArrow: {
        color: COLORS.white,
        fontSize: 20,
        fontWeight: 'bold',
    },
    // Modal Styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        padding: 25,
        paddingBottom: 40,
        ...SHADOWS.lg,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '900',
        color: COLORS.secondary,
        letterSpacing: 1,
    },
    modalCloseBtn: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalCloseText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.secondary,
    },
    modalSubtitle: {
        fontSize: 14,
        color: COLORS.text.tertiary,
        marginBottom: 25,
        lineHeight: 20,
        fontWeight: '500',
    },
    paymentOption: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 15,
        marginBottom: 15,
        borderWidth: 2,
        borderColor: '#F5F5F5',
        ...SHADOWS.sm,
    },
    paymentIconBox: {
        width: 50,
        height: 50,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    paymentIcon: {
        fontSize: 24,
    },
    paymentInfo: {
        flex: 1,
    },
    paymentTitle: {
        fontSize: 16,
        fontWeight: '900',
        color: COLORS.secondary,
        marginBottom: 3,
    },
    paymentDesc: {
        fontSize: 12,
        color: COLORS.text.tertiary,
        fontWeight: '600',
    },
    paymentArrow: {
        fontSize: 24,
        color: '#BDBDBD',
        marginLeft: 10,
    },
});

export default MarketplaceScreen;
