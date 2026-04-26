import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    TouchableOpacity,
    ScrollView,
    Animated,
    Dimensions
} from 'react-native';
import { COLORS, SHADOWS, BORDER_RADIUS } from '../theme';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';

interface DailyObjective {
    id: string;
    label: string;
    current: number;
    target: number;
    reward: number;
    type: string;
    isClaimed: boolean;
}

interface DailyObjectivesModalProps {
    visible: boolean;
    onClose: () => void;
    objectives: DailyObjective[];
}

const { width } = Dimensions.get('window');

const DailyObjectivesModal: React.FC<DailyObjectivesModalProps> = ({ visible, onClose, objectives }) => {
    const [timeLeft, setTimeLeft] = useState('2 heures');

    const renderObjective = (obj: DailyObjective) => {
        const progress = Math.min(obj.current / obj.target, 1);
        const isCompleted = obj.current >= obj.target;

        return (
            <View key={obj.id} style={[styles.objectiveCard, isCompleted && styles.completedCard]}>
                <View style={styles.objectiveHeader}>
                    <Text style={[styles.objectiveLabel, isCompleted && styles.completedText]}>{obj.label}</Text>
                </View>

                <View style={styles.progressContainer}>
                    <View style={styles.progressBarBg}>
                        <LinearGradient
                            colors={isCompleted ? [COLORS.success, '#388E3C'] : [COLORS.primary, '#E67E22']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={[styles.progressBarFill, { width: `${progress * 100}%` }]}
                        />
                    </View>
                    <View style={styles.chestContainer}>
                        <MaterialCommunityIcons
                            name="treasure-chest"
                            size={32}
                            color={isCompleted ? COLORS.gold : '#5D4037'}
                            style={[
                                styles.chestIcon,
                                isCompleted && styles.activeChest
                            ]}
                        />
                        {isCompleted && (
                            <View style={[styles.glowEffect, { backgroundColor: `${COLORS. gold}33` }]} />
                        )}
                    </View>
                </View>
                <Text style={styles.progressText}>{obj.current}/{obj.target}</Text>
            </View>
        );
    };

    return (
        <Modal
            transparent
            visible={visible}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <BlurView intensity={20} tint="dark" style={StyleSheet.absoluteFill} />
                <View style={styles.content}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Objectifs Quotidiens</Text>
                        <View style={styles.timerBadge}>
                            <Text style={styles.timerTitle}>Restant : </Text>
                            <Text style={styles.timerValue}>{timeLeft}</Text>
                        </View>
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                        {objectives.map(renderObjective)}

                        <TouchableOpacity style={styles.citationCard}>
                            <View style={styles.citationHeader}>
                                <Text style={styles.citationLabel}>Citation Motivationnelle</Text>
                                <FontAwesome5 name="chevron-down" size={14} color="white" />
                            </View>
                            <Text style={styles.citationWeek}>Semaine 15, 2026</Text>
                        </TouchableOpacity>
                    </ScrollView>

                    <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
                        <Text style={styles.closeBtnText}>Fermer</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'flex-end',
    },
    content: {
        backgroundColor: COLORS.secondary, // Brun Terre Premium
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        padding: 24,
        maxHeight: '85%',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 32,
    },
    title: {
        fontSize: 24,
        fontWeight: '900',
        color: COLORS.white,
        letterSpacing: -0.5,
    },
    timerBadge: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 150, 51, 0.15)', // Light Primary
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(255, 150, 51, 0.3)',
    },
    timerTitle: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 14,
        fontWeight: '600',
    },
    timerValue: {
        color: COLORS.primary,
        fontSize: 14,
        fontWeight: '900',
    },
    scrollContent: {
        paddingBottom: 20,
    },
    objectiveCard: {
        marginBottom: 24,
    },
    completedCard: {
        opacity: 0.5,
    },
    objectiveHeader: {
        marginBottom: 12,
    },
    objectiveLabel: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: '600',
    },
    completedText: {
        color: 'rgba(255,255,255,0.5)',
    },
    progressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    progressBarBg: {
        flex: 1,
        height: 12,
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: 6,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        borderRadius: 6,
    },
    progressText: {
        color: 'rgba(255,255,255,0.4)',
        fontSize: 12,
        fontWeight: '600',
        alignSelf: 'flex-end',
        marginTop: 4,
        marginRight: 45,
    },
    chestContainer: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    chestIcon: {
        zIndex: 2,
    },
    activeChest: {
        transform: [{ scale: 1.1 }],
    },
    glowEffect: {
        position: 'absolute',
        width: 50,
        height: 50,
        borderRadius: 25,
        zIndex: 1,
    },
    citationCard: {
        marginTop: 20,
        padding: 20,
        borderRadius: BORDER_RADIUS.lg,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.15)',
        borderStyle: 'dashed',
        backgroundColor: 'rgba(0,0,0,0.1)',
    },
    citationHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    citationLabel: {
        color: COLORS.white,
        fontSize: 18,
        fontWeight: '700',
    },
    citationWeek: {
        color: 'rgba(255,255,255,0.4)',
        fontSize: 12,
    },
    closeBtn: {
        marginTop: 24,
        backgroundColor: 'rgba(255,255,255,0.1)',
        paddingVertical: 16,
        borderRadius: BORDER_RADIUS.lg,
        alignItems: 'center',
    },
    closeBtnText: {
        color: COLORS.white,
        fontWeight: '700',
    }
});

export default DailyObjectivesModal;
