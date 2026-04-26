import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    TouchableOpacity,
    Image,
    ScrollView,
} from 'react-native';
import { COLORS, SHADOWS } from '../theme';

interface LevelRanksModalProps {
    isVisible: boolean;
    onClose: () => void;
    currentXP: number;
}

const RANKS = [
    { title: 'DÉBUTANT', xp: 0, emoji: '🌱', color: '#81C784' },
    { title: 'APPRENTI', xp: 500, emoji: '📖', color: '#64B5F6' },
    { title: 'EXPLORATEUR', xp: 1500, emoji: '🧭', color: '#FFB74D' },
    { title: 'GUIDE', xp: 3000, emoji: '🏔️', color: '#BA68C8' },
    { title: 'MAÎTRE', xp: 6000, emoji: '🎖️', color: '#FF8A65' },
    { title: 'LÉGENDE', xp: 10000, emoji: '👑', color: '#FFD700' },
];

const LevelRanksModal: React.FC<LevelRanksModalProps> = ({ isVisible, onClose, currentXP }) => {
    return (
        <Modal
            visible={isVisible}
            animationType="fade"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>GRADES & NIVEAUX</Text>
                        <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                            <Text style={styles.closeText}>✕</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.subtitle}>Gagne des Cauris pour grimper dans la hiérarchie !</Text>

                    <ScrollView showsVerticalScrollIndicator={false}>
                        {RANKS.map((rank, index) => {
                            const isReached = currentXP >= rank.xp;
                            const isNext = !isReached && (index === 0 || currentXP >= RANKS[index - 1].xp);

                            return (
                                <View
                                    key={rank.title}
                                    style={[
                                        styles.rankItem,
                                        isReached && { backgroundColor: rank.color + '15', borderColor: rank.color }
                                    ]}
                                >
                                    <View style={[styles.rankIconBox, { backgroundColor: rank.color }]}>
                                        <Text style={styles.rankEmoji}>{rank.emoji}</Text>
                                    </View>

                                    <View style={styles.rankInfo}>
                                        <Text style={[styles.rankTitle, isReached && { color: rank.color }]}>
                                            {rank.title}
                                        </Text>
                                        <Text style={styles.rankXP}>{rank.xp} XP requis</Text>
                                    </View>

                                    {isReached ? (
                                        <View style={styles.statusBadge}>
                                            <Text style={styles.statusText}>ATTEINT</Text>
                                        </View>
                                    ) : isNext ? (
                                        <View style={[styles.statusBadge, { backgroundColor: '#F0F0F0' }]}>
                                            <Text style={[styles.statusText, { color: '#999' }]}>SUIVANT</Text>
                                        </View>
                                    ) : (
                                        <Text style={styles.lockIcon}>🔒</Text>
                                    )}
                                </View>
                            );
                        })}
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalContent: {
        backgroundColor: '#FFFFFF',
        borderRadius: 35,
        width: '100%',
        maxHeight: '80%',
        padding: 24,
        ...SHADOWS.lg,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '900',
        color: COLORS.secondary,
        letterSpacing: 1,
    },
    subtitle: {
        fontSize: 13,
        color: '#A8927D',
        fontWeight: '600',
        marginBottom: 20,
        lineHeight: 18,
    },
    closeBtn: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.secondary,
    },
    rankItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderRadius: 20,
        marginBottom: 10,
        borderWidth: 2,
        borderColor: '#F5F5F5',
        backgroundColor: '#FFFFFF',
    },
    rankIconBox: {
        width: 44,
        height: 44,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    rankEmoji: {
        fontSize: 22,
    },
    rankInfo: {
        flex: 1,
    },
    rankTitle: {
        fontSize: 14,
        fontWeight: '900',
        color: '#D1D1D1',
    },
    rankXP: {
        fontSize: 11,
        color: '#A8927D',
        fontWeight: '600',
        marginTop: 2,
    },
    statusBadge: {
        backgroundColor: '#E8F5E9',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 8,
    },
    statusText: {
        fontSize: 10,
        fontWeight: '900',
        color: '#4CAF50',
    },
    lockIcon: {
        fontSize: 16,
        opacity: 0.3,
    }
});

export default LevelRanksModal;
