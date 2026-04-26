import React, { useState } from 'react';
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
    Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UserState } from '../types';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from '../theme';
import { TranslationKey } from '../translations';
import { GOLD_CAURI_IMAGE } from '../constants';
import Bayo from '../components/ui/Bayo';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const isSmallDevice = width < 375;

interface SubscriptionScreenProps {
    user: UserState;
    onClose: () => void;
    t: (key: TranslationKey) => string;
}

const SubscriptionScreen: React.FC<SubscriptionScreenProps> = ({ user, onClose, t }) => {
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly' | 'family'>('yearly');
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    interface Plan {
        id: string;
        title: string;
        price: string;
        unit: string;
        subtext: string;
        color: string;
        perks: string[];
        popular?: boolean;
        limited?: boolean;
        badge?: string;
    }

    const plans: Record<'monthly' | 'yearly' | 'family', Plan[]> = {
        monthly: [
            { id: 'plus', title: 'Plus', price: '9.99', unit: '/mois', subtext: 'Facturé mensuellement', color: '#EA580C', perks: ['Parcours & Cours', 'Défis Quotidiens', 'Certifications', 'Énergie illimitée', 'Sans publicités', 'Quiz complets', 'Premium sur iOS et Android'] },
            { id: 'pro', title: 'PRO', price: '19.99', unit: '/mois', subtext: 'Facturé mensuellement', color: '#0EA5E9', perks: ['Tout dans Plus, plus :', 'Assistant IA illimité', 'Modèle IA Avancé', 'Analyse de solution', 'Défis premium', 'Projets illimités', 'Support prioritaire'], popular: true },
            { id: 'lifetime', title: 'À vie', price: '299.99', unit: '/unique', subtext: 'Payez une fois, apprenez pour toujours.', color: '#F59E0B', perks: ['Tout dans PRO, plus :', 'Accès à vie', 'Badge exclusif', 'Titre exclusif', 'Thème exclusif'], limited: true }
        ],
        yearly: [
            { id: 'plus', title: 'Plus', price: '9.99', unit: '/mois', subtext: '$119.99 Facturé annuellement', color: '#EA580C', perks: ['Parcours & Cours', 'Défis Quotidiens', 'Certifications', 'Énergie illimitée', 'Sans publicités', 'Quiz complets', 'Premium sur iOS et Android'] },
            { id: 'pro', title: 'PRO', price: '13.33', unit: '/mois', subtext: '$159.99 Facturé annuellement', color: '#0EA5E9', perks: ['Tout dans Plus, plus :', 'Assistant IA illimité', 'Modèle IA Avancé', 'Analyse de solution', 'Défis premium', 'Projets illimités', 'Support prioritaire'], popular: true },
            { id: 'lifetime', title: 'À vie', price: '299.99', unit: '/unique', subtext: 'Payez une fois, apprenez pour toujours.', color: '#F59E0B', perks: ['Tout dans PRO, plus :', 'Accès à vie', 'Badge exclusif', 'Titre exclusif', 'Thème exclusif'], limited: true }
        ],
        family: [
            { id: 'family_pro', title: 'Plan Famille', price: '35.99', unit: '/mois', subtext: "Jusqu'à 5 membres de la famille", color: '#0EA5E9', perks: ['Tout le PRO, plus :', "Jusqu'à 5 membres", 'Progression individuelle', 'Économisez 64% vs plans individuels', 'Une facturation, toute la famille'], badge: 'Plan Famille' }
        ]
    };

    const currentPlans = plans[billingCycle];

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#0F172A" />

            <View style={styles.header}>
                <View style={styles.tabsContainer}>
                    <TouchableOpacity 
                        style={[styles.tab, billingCycle === 'monthly' && styles.tabActive]} 
                        onPress={() => setBillingCycle('monthly')}
                    >
                        <Text style={[styles.tabText, billingCycle === 'monthly' && styles.tabTextActive]}>Mensuel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.tab, billingCycle === 'yearly' && styles.tabActive]} 
                        onPress={() => setBillingCycle('yearly')}
                    >
                        <Text style={[styles.tabText, billingCycle === 'yearly' && styles.tabTextActive]}>Annuel</Text>
                        <View style={styles.discountBadge}>
                            <Text style={styles.discountText}>Économisez 33%</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.tab, billingCycle === 'family' && styles.tabActive]} 
                        onPress={() => setBillingCycle('family')}
                    >
                        <Text style={[styles.tabText, billingCycle === 'family' && styles.tabTextActive]}>Famille</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                    <Text style={styles.closeBtnText}>✕</Text>
                </TouchableOpacity>
            </View>

            <ScrollView 
                contentContainerStyle={styles.scrollContent}
                showsHorizontalScrollIndicator={false}
                horizontal={billingCycle !== 'family'}
                pagingEnabled={billingCycle !== 'family'}
                style={styles.mainScroll}
            >
                {currentPlans.map((plan, idx) => (
                    <View key={plan.id} style={[styles.planCard, billingCycle === 'family' && styles.familyCard]}>
                        <View style={styles.planHeader}>
                            {plan.popular && (
                                <View style={styles.tagPopular}>
                                    <Text style={styles.tagText}>Populaire</Text>
                                </View>
                            )}
                            {plan.limited && (
                                <View style={styles.tagLimited}>
                                    <Text style={styles.tagText}>Offre Limitée</Text>
                                </View>
                            )}
                            {plan.badge && (
                                <View style={styles.tagBadge}>
                                    <Text style={styles.tagText}>{plan.badge}</Text>
                                </View>
                            )}
                            
                            <View style={styles.planTitleBox}>
                                <Text style={[styles.planLabel, { color: plan.color, borderColor: plan.color }]}>{plan.title}</Text>
                            </View>

                            <View style={styles.priceRow}>
                                <Text style={styles.currency}>$</Text>
                                <Text style={styles.priceValue}>{plan.price.split('.')[0]}</Text>
                                <Text style={styles.priceDecimal}>.{plan.price.split('.')[1]}</Text>
                                <Text style={styles.priceUnit}>{plan.unit}</Text>
                            </View>

                            <Text style={styles.subtext}>{plan.subtext}</Text>
                        </View>

                        <ScrollView style={styles.perksScroll} showsVerticalScrollIndicator={false}>
                            {plan.perks.map((perk, pIdx) => (
                                <View key={pIdx} style={styles.perkRow}>
                                    <View style={[styles.checkCircle, { backgroundColor: '#10B981' }]}>
                                        <Text style={styles.checkIcon}>✓</Text>
                                    </View>
                                    <Text style={styles.perkText}>{perk}</Text>
                                    <Text style={styles.infoIcon}>ⓘ</Text>
                                </View>
                            ))}
                        </ScrollView>

                        <TouchableOpacity 
                            style={[styles.actionBtn, { backgroundColor: plan.color }]}
                            onPress={() => setShowPaymentModal(true)}
                        >
                            <Text style={styles.actionBtnText}>
                                {plan.id === 'lifetime' ? 'DÉBLOQUER POUR TOUJOURS' : 
                                 plan.id === 'family_pro' ? 'OBTENIR LE PLAN FAMILLE' : 
                                `PASSER À ${plan.title.toUpperCase()}`}
                            </Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>

            <View style={styles.footer}>
                <Text style={styles.footerText}>Paiement sécurisé par <Text style={styles.stripeText}>stripe</Text></Text>
            </View>

            {/* Simple Payment Modal Fallback */}
            <Modal visible={showPaymentModal} transparent animationType="slide">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Mode de Paiement</Text>
                        <TouchableOpacity style={styles.paymentBtn} onPress={() => { setShowPaymentModal(false); onClose(); }}>
                            <Text style={styles.paymentBtnText}>Payer avec Mobile Money</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.paymentBtn} onPress={() => { setShowPaymentModal(false); onClose(); }}>
                            <Text style={styles.paymentBtnText}>Payer par Carte</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setShowPaymentModal(false)}>
                            <Text style={styles.modalCancel}>Annuler</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0F172A', // Deep dark blue
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        position: 'relative',
    },
    tabsContainer: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 25,
        padding: 4,
    },
    tab: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    tabActive: {
        backgroundColor: 'rgba(255,255,255,0.15)',
    },
    tabText: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: 13,
        fontWeight: '700',
    },
    tabTextActive: {
        color: '#FFFFFF',
    },
    discountBadge: {
        backgroundColor: '#0369A1',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 10,
    },
    discountText: {
        color: '#7DD3FC',
        fontSize: 9,
        fontWeight: '900',
    },
    closeBtn: {
        position: 'absolute',
        right: 20,
    },
    closeBtnText: {
        color: 'rgba(255,255,255,0.3)',
        fontSize: 20,
    },
    mainScroll: {
        flex: 1,
    },
    scrollContent: {
        paddingVertical: 10,
        alignItems: 'center',
    },
    planCard: {
        width: width * 0.85,
        height: '95%',
        marginHorizontal: width * 0.075,
        backgroundColor: '#1E293B',
        borderRadius: 30,
        padding: 25,
        borderWidth: 1.5,
        borderColor: 'rgba(255,255,255,0.1)',
        ...SHADOWS.xl,
    },
    familyCard: {
        width: width * 0.9,
        marginHorizontal: 0,
        height: 'auto',
        minHeight: 500,
    },
    planHeader: {
        alignItems: 'center',
        marginBottom: 20,
        position: 'relative',
    },
    tagPopular: {
        position: 'absolute',
        top: -45,
        backgroundColor: '#1E293B',
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 15,
        borderWidth: 1.5,
        borderColor: '#0EA5E9',
    },
    tagLimited: {
        position: 'absolute',
        top: -45,
        backgroundColor: '#1E293B',
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 15,
        borderWidth: 1.5,
        borderColor: '#EF4444',
    },
    tagBadge: {
        position: 'absolute',
        top: -45,
        backgroundColor: '#1E293B',
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 15,
        borderWidth: 1.5,
        borderColor: '#8B5CF6',
    },
    tagText: {
        color: '#0EA5E9',
        fontSize: 12,
        fontWeight: '900',
    },
    planTitleBox: {
        marginBottom: 20,
    },
    planLabel: {
        paddingHorizontal: 15,
        paddingVertical: 4,
        borderRadius: 8,
        borderWidth: 1.5,
        fontSize: 14,
        fontWeight: '900',
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    currency: {
        color: '#0EA5E9',
        fontSize: 32,
        fontWeight: '900',
    },
    priceValue: {
        color: '#FFFFFF',
        fontSize: 50,
        fontWeight: '900',
    },
    priceDecimal: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: '900',
    },
    priceUnit: {
        color: 'rgba(255,255,255,0.4)',
        fontSize: 16,
        marginLeft: 5,
        fontWeight: '700',
    },
    subtext: {
        color: '#0EA5E9',
        fontSize: 13,
        fontWeight: '700',
        marginTop: 5,
    },
    perksScroll: {
        flex: 1,
        marginBottom: 20,
    },
    perkRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        gap: 12,
    },
    checkCircle: {
        width: 22,
        height: 22,
        borderRadius: 11,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkIcon: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '900',
    },
    perkText: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 14,
        fontWeight: '600',
        flex: 1,
    },
    infoIcon: {
        color: 'rgba(255,255,255,0.3)',
        fontSize: 16,
    },
    actionBtn: {
        paddingVertical: 18,
        borderRadius: 15,
        alignItems: 'center',
        ...SHADOWS.md,
    },
    actionBtnText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '900',
        letterSpacing: 1,
    },
    footer: {
        paddingVertical: 30,
        alignItems: 'center',
    },
    footerText: {
        color: 'rgba(255,255,255,0.4)',
        fontSize: 13,
        fontWeight: '600',
    },
    stripeText: {
        color: '#6366F1',
        fontWeight: '900',
        textTransform: 'lowercase',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.8)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalContent: {
        backgroundColor: '#1E293B',
        width: '100%',
        borderRadius: 25,
        padding: 25,
        alignItems: 'center',
    },
    modalTitle: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: '900',
        marginBottom: 20,
    },
    paymentBtn: {
        backgroundColor: '#334155',
        width: '100%',
        paddingVertical: 15,
        borderRadius: 15,
        alignItems: 'center',
        marginBottom: 10,
    },
    paymentBtnText: {
        color: '#FFFFFF',
        fontWeight: '700',
    },
    modalCancel: {
        color: 'rgba(255,255,255,0.4)',
        marginTop: 10,
        fontWeight: '700',
    }
});

export default SubscriptionScreen;
