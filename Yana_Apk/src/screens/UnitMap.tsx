import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    Dimensions,
    Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from '../theme';
import { GOLD_CAURI_IMAGE } from '../constants';

const { width } = Dimensions.get('window');
const isSmallDevice = width < 375;

interface Unit {
    id: string;
    title: string;
    subtitle: string;
    progress: number;
    status: 'active' | 'locked' | 'completed';
    icon: string;
}

const UNITS: Unit[] = [
    {
        id: '1',
        title: 'Premiers Pas',
        subtitle: 'Salutations et présentations',
        progress: 1.0,
        status: 'completed',
        icon: '👋',
    },
    {
        id: '2',
        title: 'La Famille',
        subtitle: 'Décrire son entourage',
        progress: 0.6,
        status: 'active',
        icon: '👨‍👩‍👧‍👦',
    },
    {
        id: '3',
        title: 'Au Marché',
        subtitle: 'Faire des achats',
        progress: 0,
        status: 'locked',
        icon: '🛍️',
    },
    {
        id: '4',
        title: 'La Teranga',
        subtitle: 'L\'art de recevoir',
        progress: 0,
        status: 'locked',
        icon: '🍲',
    },
];

const UnitMap: React.FC = () => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />

            {/* Header Stats */}
            <View style={styles.header}>
                <View style={styles.statContainer}>
                    <Text style={styles.statIcon}>☀️</Text>
                    <Text style={styles.statValue}>12</Text>
                </View>
                <View style={styles.statContainer}>
                    <View style={[styles.statIconBox, { backgroundColor: '#FFFBEB' }]}>
                        <Image source={GOLD_CAURI_IMAGE} style={{ width: 14, height: 14 }} resizeMode="contain" />
                    </View>
                    <Text style={styles.statValue}>450</Text>
                </View>
                <View style={styles.statContainer}>
                    <Text style={styles.statIcon}>❤️</Text>
                    <Text style={styles.statValue}>5</Text>
                </View>
            </View>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.pageTitle}>Votre parcours</Text>

                <View style={styles.mapContainer}>
                    {/* Lance de sagesse (Ligne verticale) */}
                    <View style={styles.pathLine} />

                    {UNITS.map((unit, index) => (
                        <View key={unit.id} style={styles.unitWrapper}>
                            <TouchableOpacity
                                disabled={unit.status === 'locked'}
                                style={[
                                    styles.unitCard,
                                    unit.status === 'active' && styles.activeUnitCard,
                                    unit.status === 'locked' && styles.lockedUnitCard,
                                ]}
                            >
                                <View style={styles.unitIconContainer}>
                                    <Text style={styles.unitIcon}>{unit.icon}</Text>
                                    {unit.status === 'locked' && (
                                        <View style={styles.lockOverlay}>
                                            <Text style={styles.lockIcon}>🔒</Text>
                                        </View>
                                    )}
                                </View>

                                <View style={styles.unitInfo}>
                                    <Text style={[
                                        styles.unitTitle,
                                        unit.status === 'locked' && styles.lockedText
                                    ]}>
                                        {unit.title}
                                    </Text>
                                    <Text style={[
                                        styles.unitSubtitle,
                                        unit.status === 'locked' && styles.lockedText
                                    ]}>
                                        {unit.subtitle}
                                    </Text>

                                    {unit.status !== 'locked' && (
                                        <View style={styles.progressContainer}>
                                            <View style={styles.progressBar}>
                                                <View
                                                    style={[
                                                        styles.progressFill,
                                                        { width: `${unit.progress * 100}%` }
                                                    ]}
                                                />
                                            </View>
                                            <Text style={styles.progressText}>
                                                {Math.round(unit.progress * 100)}%
                                            </Text>
                                        </View>
                                    )}
                                </View>
                            </TouchableOpacity>

                            {unit.status === 'active' && (
                                <TouchableOpacity style={styles.startButton}>
                                    <Text style={styles.startButtonText}>Commencer</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    ))}
                </View>
            </ScrollView>

            {/* Bouton Bayo flottant */}
            <TouchableOpacity style={styles.bayoFab}>
                <Text style={styles.bayoFabIcon}>🦫</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FDF7F0',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 12,
        backgroundColor: COLORS.white,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
        ...SHADOWS.sm,
    },
    statContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    statIconBox: {
        width: 18,
        height: 18,
        borderRadius: 9,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 4,
    },
    statIcon: {
        fontSize: 14,
    },
    statValue: {
        fontSize: 14,
        color: COLORS.text.primary,
        fontWeight: '900',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: isSmallDevice ? 15 : 20,
        paddingBottom: 100,
    },
    pageTitle: {
        fontSize: isSmallDevice ? 24 : 28,
        color: COLORS.secondary,
        fontWeight: '900',
        marginBottom: 25,
        textAlign: 'center',
    },
    mapContainer: {
        alignItems: 'center',
        position: 'relative',
    },
    pathLine: {
        position: 'absolute',
        width: 8,
        height: '100%',
        backgroundColor: '#D7CCC8',
        opacity: 0.3,
        borderRadius: 4,
    },
    unitWrapper: {
        width: '100%',
        alignItems: 'center',
        marginBottom: isSmallDevice ? 25 : 35,
    },
    unitCard: {
        flexDirection: 'row',
        backgroundColor: COLORS.white,
        borderRadius: 30,
        padding: isSmallDevice ? 12 : 18,
        width: '100%',
        alignItems: 'center',
        ...SHADOWS.md,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    activeUnitCard: {
        borderColor: COLORS.primary,
        transform: [{ scale: 1.02 }],
        ...SHADOWS.lg,
    },
    lockedUnitCard: {
        backgroundColor: COLORS.gray[50],
        opacity: 0.8,
    },
    unitIconContainer: {
        width: isSmallDevice ? 50 : 60,
        height: isSmallDevice ? 50 : 60,
        borderRadius: BORDER_RADIUS.full,
        backgroundColor: '#FDF7F0',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    unitIcon: {
        fontSize: isSmallDevice ? 24 : 30,
    },
    lockOverlay: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    lockIcon: {
        fontSize: 16,
    },
    unitInfo: {
        flex: 1,
    },
    unitTitle: {
        fontSize: isSmallDevice ? 16 : 18,
        color: COLORS.secondary,
        fontWeight: '900',
    },
    unitSubtitle: {
        fontSize: 12,
        color: COLORS.text.secondary,
        marginBottom: 5,
        fontWeight: '600',
    },
    lockedText: {
        color: COLORS.text.tertiary,
    },
    progressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    progressBar: {
        flex: 1,
        height: 8,
        backgroundColor: '#F0F0F0',
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: COLORS.primary,
    },
    progressText: {
        fontSize: 10,
        color: COLORS.primary,
        fontWeight: '900',
    },
    startButton: {
        backgroundColor: COLORS.primary,
        paddingHorizontal: 25,
        paddingVertical: 10,
        borderRadius: BORDER_RADIUS.full,
        marginTop: -15,
        ...SHADOWS.md,
    },
    startButtonText: {
        fontSize: 13,
        color: COLORS.white,
        fontWeight: '900',
        letterSpacing: 1,
    },
    bayoFab: {
        position: 'absolute',
        bottom: 25,
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 20,
        backgroundColor: '#FFA726',
        justifyContent: 'center',
        alignItems: 'center',
        ...SHADOWS.lg,
        borderBottomWidth: 4,
        borderBottomColor: '#F57C00',
    },
    bayoFabIcon: {
        fontSize: 30,
    },
});

export default UnitMap;
