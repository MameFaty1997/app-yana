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
import { UserState } from '../types';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from '../theme';
import { TranslationKey } from '../translations';
import TutorApplicationModal from '../components/TutorApplicationModal';
import MarketplaceScreen from './MarketplaceScreen';
import XPProgressBar from '../components/ui/XPProgressBar';
import { GOLD_CAURI_IMAGE } from '../constants';
import Constants from 'expo-constants';

const { width } = Dimensions.get('window');
const isSmallDevice = width < 375;

interface TutoringScreenProps {
    user: UserState;
    setUser: Dispatch<SetStateAction<UserState>>;
    t: (key: TranslationKey) => string;
}

const TutoringScreen: React.FC<TutoringScreenProps> = ({ user, setUser, t }) => {
    const navigation = useNavigation();
    const [isApplicationModalVisible, setIsApplicationModalVisible] = useState(false);
    const [isMarketplaceVisible, setIsMarketplaceVisible] = useState(false);

    const tutors = [
        {
            id: '1',
            name: 'Fatou Diop',
            bio: 'Native de Dakar, spécialiste de la grammaire Wolof.',
            price: '15000 FCFA',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fatou&backgroundColor=FF9633',
        },
        {
            id: '2',
            name: 'Moussa Sall',
            bio: 'Expert en Pulaar et traditions orales du Fouta.',
            price: '15000 FCFA',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Moussa&backgroundColor=4B3621',
        }
    ];

    const handleSelectTutor = (tutorId: string) => {
        setUser(prev => ({
            ...prev,
            tutorId,
            scheduledSessions: [
                { id: 'sess-1', date: 'Demain, 14:00', topic: 'Conversation courante' },
                { id: 'sess-2', date: 'Vendredi, 10:30', topic: 'Grammaire et conjugaison' }
            ]
        }));
    };

    const myTutor = tutors.find(t => t.id === user.tutorId);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />

            {/* Top Bar Stats */}
            <View style={styles.topStatsBar}>
                <TouchableOpacity
                    style={styles.avatarCircleSmall}
                    onPress={() => (navigation as any).navigate('Profile')}
                >
                    {(!user?.avatar || !user.avatar.startsWith('http')) ? (
                        <Text style={{ fontSize: 24, textAlign: 'center' }}>{user?.avatar || '👩🏾'}</Text>
                    ) : (
                        <Image
                            source={{ uri: user.avatar }}
                            style={styles.avatarSmall}
                        />
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
                {!user.tutorId ? (
                    <>
                        {/* Header Section for choosing */}
                        <View style={styles.headerSection}>
                            <Text style={styles.title}>{t('tutoring_title')}</Text>
                            <Text style={styles.subtitle}>{t('tutoring_sub')}</Text>

                            <TouchableOpacity
                                style={styles.becomeTutorBtn}
                                onPress={() => setIsApplicationModalVisible(true)}
                            >
                                <Text style={styles.becomeTutorText}>{t('become_tutor')}</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Tutors List */}
                        {tutors.map((tutor) => (
                            <View key={tutor.id} style={styles.tutorCard}>
                                <View style={styles.tutorInfo}>
                                    <Image source={{ uri: tutor.avatar }} style={styles.tutorAvatar} />
                                    <View style={styles.tutorDetails}>
                                        <Text style={styles.tutorName}>{tutor.name}</Text>
                                        <Text style={styles.tutorBio}>{tutor.bio}</Text>
                                    </View>
                                </View>

                                <View style={styles.divider} />

                                <View style={styles.cardFooter}>
                                    <View>
                                        <Text style={styles.label}>{t('price_label')}</Text>
                                        <Text style={styles.price}>{tutor.price}</Text>
                                    </View>
                                    <TouchableOpacity
                                        style={styles.bookBtn}
                                        onPress={() => handleSelectTutor(tutor.id)}
                                    >
                                        <Text style={styles.bookBtnText}>{t('reserve')}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}
                    </>
                ) : (
                    <>
                        {/* Dashboard Mode (Moodle style) */}
                        <View style={styles.dashboardHeader}>
                            <Text style={styles.dashboardTitle}>{t('my_tutoring_space')}</Text>
                            <TouchableOpacity
                                onPress={() => setUser(prev => ({ ...prev, tutorId: undefined }))}
                            >
                                <Text style={styles.changeTutorLink}>{t('change_tutor')}</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Tutor Stats Card */}
                        <View style={styles.statsOverview}>
                            <View style={styles.statBox}>
                                <Text style={styles.statNum}>{user.completedTutorSessions || 0}</Text>
                                <Text style={styles.statLabel}>{t('lessons_done')}</Text>
                            </View>
                            <View style={styles.statBox}>
                                <Text style={[styles.statNum, { color: COLORS.primary }]}>{user.scheduledSessions.length}</Text>
                                <Text style={styles.statLabel}>{t('upcoming')}</Text>
                            </View>
                        </View>

                        {/* Active Tutor Card */}
                        <View style={styles.activeTutorCard}>
                            <Image source={{ uri: myTutor?.avatar }} style={styles.activeTutorAvatar} />
                            <View style={styles.activeTutorInfo}>
                                <Text style={styles.activeTutorName}>{myTutor?.name}</Text>
                                <View style={styles.onlineBadge}>
                                    <View style={styles.onlineDot} />
                                    <Text style={styles.onlineText}>{t('online_status')}</Text>
                                </View>
                            </View>
                            <TouchableOpacity style={styles.chatBtn}>
                                <Text style={styles.chatIcon}>💬</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Agenda / Scheduled Sessions */}
                        <Text style={styles.sectionTitle}>📅 {t('your_agenda')}</Text>
                        {user.scheduledSessions.map((session) => (
                            <View key={session.id} style={styles.agendaItem}>
                                <View style={styles.agendaDateBox}>
                                    <Text style={styles.agendaDateText}>{session.date.split(',')[0]}</Text>
                                    <Text style={styles.agendaTimeText}>{session.date.split(',')[1]}</Text>
                                </View>
                                <View style={styles.agendaInfo}>
                                    <Text style={styles.agendaTopic}>{session.topic}</Text>
                                    <Text style={styles.agendaStatus}>{t('confirmed')}</Text>
                                </View>
                                <TouchableOpacity style={styles.joinBtn}>
                                    <Text style={styles.joinBtnText}>{t('join')}</Text>
                                </TouchableOpacity>
                            </View>
                        ))}

                        <TouchableOpacity style={styles.newSessionBtn}>
                            <Text style={styles.newSessionText}>+ {t('plan_new_lesson')}</Text>
                        </TouchableOpacity>
                    </>
                )}
            </ScrollView>

            <TutorApplicationModal
                isVisible={isApplicationModalVisible}
                onClose={() => setIsApplicationModalVisible(false)}
                t={t}
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
        </View>
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
    headerSection: {
        backgroundColor: '#FFFFFF',
        borderRadius: 35,
        padding: isSmallDevice ? 20 : 25,
        alignItems: 'center',
        ...SHADOWS.lg,
        marginBottom: 20,
    },
    title: {
        fontSize: isSmallDevice ? 24 : 28,
        fontWeight: '900',
        color: COLORS.secondary,
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: '#A8927D',
        textAlign: 'center',
        marginBottom: 20,
        fontWeight: '600',
        lineHeight: 18,
    },
    becomeTutorBtn: {
        width: '100%',
        paddingVertical: 12,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#E6D5C3',
        borderStyle: 'dashed',
        alignItems: 'center',
        justifyContent: 'center',
    },
    becomeTutorText: {
        fontSize: 12,
        fontWeight: '900',
        color: '#D4A373',
        letterSpacing: 0.5,
    },
    tutorCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 35,
        padding: isSmallDevice ? 20 : 25,
        marginBottom: 15,
        ...SHADOWS.md,
    },
    tutorInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    tutorAvatar: {
        width: isSmallDevice ? 60 : 70,
        height: isSmallDevice ? 60 : 70,
        borderRadius: 20,
        backgroundColor: '#FDF7F0',
    },
    tutorDetails: {
        flex: 1,
        marginLeft: 15,
    },
    tutorName: {
        fontSize: isSmallDevice ? 18 : 20,
        fontWeight: '900',
        color: COLORS.secondary,
        marginBottom: 2,
    },
    tutorBio: {
        fontSize: 12,
        color: '#A8927D',
        lineHeight: 16,
        fontWeight: '500',
    },
    divider: {
        height: 1,
        backgroundColor: '#F0F0F0',
        width: '100%',
        marginBottom: 15,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    label: {
        fontSize: 9,
        fontWeight: '900',
        color: '#D1D1D1',
        letterSpacing: 1,
        marginBottom: 1,
    },
    price: {
        fontSize: 18,
        fontWeight: '900',
        color: '#D4A373',
    },
    bookBtn: {
        backgroundColor: '#D4A373',
        paddingHorizontal: 22,
        paddingVertical: 10,
        borderRadius: 12,
    },
    bookBtnText: {
        color: '#FFFFFF',
        fontSize: 13,
        fontWeight: '900',
        letterSpacing: 0.5,
    },

    // Dashboard Styles
    dashboardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: 20,
        paddingHorizontal: 5,
    },
    dashboardTitle: {
        fontSize: 24,
        fontWeight: '900',
        color: COLORS.secondary,
    },
    changeTutorLink: {
        fontSize: 12,
        fontWeight: '700',
        color: COLORS.primary,
        textDecorationLine: 'underline',
    },
    statsOverview: {
        flexDirection: 'row',
        gap: 15,
        marginBottom: 20,
    },
    statBox: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 25,
        padding: 15,
        alignItems: 'center',
        ...SHADOWS.sm,
    },
    statNum: {
        fontSize: 24,
        fontWeight: '900',
        color: COLORS.secondary,
    },
    statLabel: {
        fontSize: 10,
        fontWeight: '900',
        color: '#D1D1D1',
        marginTop: 2,
    },
    activeTutorCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.secondary,
        borderRadius: 30,
        padding: 15,
        marginBottom: 30,
        ...SHADOWS.lg,
    },
    activeTutorAvatar: {
        width: 60,
        height: 60,
        borderRadius: 18,
        borderWidth: 2,
        borderColor: '#FFFFFF',
    },
    activeTutorInfo: {
        flex: 1,
        marginLeft: 15,
    },
    activeTutorName: {
        fontSize: 18,
        fontWeight: '900',
        color: '#FFFFFF',
    },
    onlineBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    onlineDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#4CAF50',
        marginRight: 6,
    },
    onlineText: {
        fontSize: 10,
        fontWeight: '900',
        color: '#FFFFFF',
        opacity: 0.8,
    },
    chatBtn: {
        width: 44,
        height: 44,
        borderRadius: 15,
        backgroundColor: 'rgba(255,255,255,0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    chatIcon: {
        fontSize: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '900',
        color: COLORS.secondary,
        marginBottom: 15,
    },
    agendaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 25,
        padding: 15,
        marginBottom: 12,
        ...SHADOWS.sm,
    },
    agendaDateBox: {
        alignItems: 'center',
        paddingRight: 15,
        borderRightWidth: 1,
        borderRightColor: '#F0F0F0',
        width: 80,
    },
    agendaDateText: {
        fontSize: 11,
        fontWeight: '900',
        color: COLORS.primary,
    },
    agendaTimeText: {
        fontSize: 11,
        fontWeight: '700',
        color: COLORS.secondary,
        marginTop: 2,
    },
    agendaInfo: {
        flex: 1,
        paddingHorizontal: 15,
    },
    agendaTopic: {
        fontSize: 13,
        fontWeight: '900',
        color: COLORS.secondary,
    },
    agendaStatus: {
        fontSize: 10,
        fontWeight: '700',
        color: '#4CAF50',
        marginTop: 2,
    },
    joinBtn: {
        backgroundColor: '#FDF7F0',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 10,
    },
    joinBtnText: {
        fontSize: 9,
        fontWeight: '900',
        color: COLORS.primary,
    },
    newSessionBtn: {
        marginTop: 10,
        paddingVertical: 15,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: COLORS.primary,
        borderStyle: 'dashed',
        alignItems: 'center',
    },
    newSessionText: {
        fontSize: 11,
        fontWeight: '900',
        color: COLORS.primary,
    },
});

export default TutoringScreen;
