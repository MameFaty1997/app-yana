import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import { COLORS, SHADOWS, BORDER_RADIUS } from '../theme';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';

interface StreakPopoverProps {
    visible: boolean;
    onClose: () => void;
    streak: number;
}

const StreakPopover: React.FC<StreakPopoverProps> = ({ visible, onClose, streak }) => {
    const days = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
    const currentDayIdx = 0; // Mock current day as Sunday (D)

    return (
        <Modal
            transparent
            visible={visible}
            animationType="fade"
            onRequestClose={onClose}
        >
            <TouchableOpacity 
                activeOpacity={1} 
                style={styles.overlay} 
                onPress={onClose}
            >
                <BlurView intensity={20} tint="dark" style={StyleSheet.absoluteFill} />
                
                <View style={styles.popoverContainer} onStartShouldSetResponder={() => true}>
                    {/* Main Orange Card */}
                    <View style={styles.streakCard}>
                        <View style={styles.streakHeader}>
                            <View style={styles.streakTexts}>
                                <Text style={styles.streakTitle}>{streak} jours de série</Text>
                                <Text style={styles.streakSubtitle}>Reviens demain pour garder ta série !</Text>
                            </View>
                            <FontAwesome5 name="fire-alt" size={48} color="white" style={styles.bigFlame} />
                        </View>

                        {/* Weekly Days */}
                        <View style={styles.daysGrid}>
                            {days.map((day, idx) => {
                                const isCompleted = idx <= currentDayIdx;
                                const isLast = idx === 6;
                                
                                return (
                                    <View key={idx} style={styles.dayContainer}>
                                        <Text style={[styles.dayLabel, isCompleted && styles.dayLabelActive]}>{day}</Text>
                                        <View style={[
                                            styles.dayCircle, 
                                            isCompleted && styles.dayCircleActive,
                                            isLast && !isCompleted && styles.dayCircleLast
                                        ]}>
                                            {isCompleted ? (
                                                <FontAwesome5 name="check" size={12} color={COLORS.primary} />
                                            ) : isLast ? (
                                                <FontAwesome5 name="star" size={14} color="rgba(255,255,255,0.1)" />
                                            ) : null}
                                        </View>
                                    </View>
                                );
                            })}
                        </View>
                    </View>

                    {/* Club Card */}
                    <View style={styles.clubCard}>
                        <View style={styles.clubHeader}>
                            <View style={styles.lockBg}>
                                <FontAwesome5 name="lock" size={24} color="rgba(255,255,255,0.4)" />
                            </View>
                            <View style={styles.clubTexts}>
                                <Text style={styles.clubTitle}>Club des séries</Text>
                                <Text style={styles.clubSubtitle}>
                                    Atteignez une série de 3 jours pour rejoindre un club de série et gagner des avantages exclusifs.
                                </Text>
                            </View>
                        </View>

                        <View style={styles.progressSection}>
                            <View style={styles.progressBarBg}>
                                <View style={[styles.progressBarFill, { width: `${(streak / 3) * 100}%` }]} />
                            </View>
                            <View style={styles.targetIcon}>
                                <FontAwesome5 name="star" size={14} color="#FBBF24" />
                            </View>
                        </View>
                    </View>

                    {/* Action Button */}
                    <TouchableOpacity style={styles.actionBtn}>
                        <Text style={styles.actionBtnText}>VOIR PLUS</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    popoverContainer: {
        width: '100%',
        maxWidth: 380,
        backgroundColor: '#1E293B',
        borderRadius: 24,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        ...SHADOWS.xl,
    },
    streakCard: {
        backgroundColor: COLORS.primaryDark || '#C47E2F',
        padding: 24,
    },
    streakHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    streakTexts: {
        flex: 1,
    },
    streakTitle: {
        fontSize: 22,
        fontWeight: '900',
        color: 'white',
        marginBottom: 4,
    },
    streakSubtitle: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.8)',
        lineHeight: 20,
    },
    bigFlame: {
        marginLeft: 10,
    },
    daysGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(0,0,0,0.2)',
        padding: 16,
        borderRadius: 16,
    },
    dayContainer: {
        alignItems: 'center',
    },
    dayLabel: {
        color: 'rgba(255,255,255,0.4)',
        fontSize: 12,
        fontWeight: '700',
        marginBottom: 8,
    },
    dayLabelActive: {
        color: '#FBBF24',
    },
    dayCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: 'rgba(255,255,255,0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dayCircleActive: {
        backgroundColor: 'white',
    },
    dayCircleLast: {
        // Star circle
    },
    clubCard: {
        padding: 20,
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    clubHeader: {
        flexDirection: 'row',
        gap: 16,
    },
    lockBg: {
        width: 60,
        height: 60,
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    clubTexts: {
        flex: 1,
    },
    clubTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 4,
    },
    clubSubtitle: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: 14,
        lineHeight: 20,
    },
    progressSection: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    progressBarBg: {
        flex: 1,
        height: 10,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 5,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: COLORS.success,
        borderRadius: 5,
    },
    targetIcon: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: 'rgba(255,255,255,0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionBtn: {
        backgroundColor: '#0EA5E9', // Duolingo blue
        margin: 20,
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        ...SHADOWS.md,
    },
    actionBtnText: {
        color: 'white',
        fontWeight: '900',
        fontSize: 16,
        letterSpacing: 1,
    }
});

export default StreakPopover;
