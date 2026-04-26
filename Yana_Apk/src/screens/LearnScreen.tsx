import * as React from 'react';
import { useState, useMemo, Dispatch, SetStateAction } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    Alert,
    StatusBar,
    Modal,
    Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UserState, Unit, Lesson } from '../types';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from '../theme';
import { BEAVER_POSES, DISCOVERY_CONTENT, CAURI_IMAGE, GOLD_CAURI_IMAGE } from '../constants';
import { TranslationKey } from '../translations';
import { generateLessonExercises } from '../services/geminiService';
import ExerciseScreen from '../components/ExerciseScreen';
import LessonIntroduction from '../components/LessonIntroduction';
import BayoGuideChatbot from '../components/BayoGuideChatbot';
import DailyObjectivesModal from '../components/DailyObjectivesModal';
import StreakPopover from '../components/StreakPopover';
import { Bayo, Button } from '../components/ui';
import XPProgressBar from '../components/ui/XPProgressBar';
import { audioService } from '../services/audioService';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { isTablet, isSmallDevice, isExtraSmallDevice, SCREEN_WIDTH, SCREEN_HEIGHT, MAX_CONTENT_WIDTH } from '../utils/responsive';

import Constants from 'expo-constants';

interface LearnScreenProps {
    user: UserState;
    setUser: Dispatch<SetStateAction<UserState>>;
    units: Unit[];
    t: (key: TranslationKey) => string;
    onShowSubscription?: () => void;
}

const VipEnergyModal: React.FC<{ visible: boolean, onClose: () => void, onUpgrade: () => void, t: any }> = ({ visible, onClose, onUpgrade, t }) => {
    return (
        <Modal transparent visible={visible} animationType="slide">
            <View style={styles.modalOverlay}>
                <View style={styles.vipContainer}>
                    <TouchableOpacity onPress={onClose} style={styles.closeModalBtn}>
                        <FontAwesome5 name="times" size={24} color="rgba(255,255,255,0.4)" />
                    </TouchableOpacity>

                    <Bayo emotion="sad" size="lg" />

                    <Text style={styles.vipTitle}>{t('out_of_hearts') || "Plus d'énergie !"}</Text>
                    <Text style={styles.vipDesc}>
                        Exprime la Teranga envers toi-même ! Passe à **YANA PRO** pour une énergie illimitée et soutiens la préservation des langues.
                    </Text>

                    {/* Promo Section */}
                    <View style={styles.promoBox}>
                        <View style={styles.promoBadge}>
                            <Text style={styles.promoCodeText}>YANA-1910</Text>
                        </View>
                        <Text style={styles.promoBenefit}>🎁 -10% SUR TON ABONNEMENT</Text>
                        <Text style={styles.promoTimer}>Offre expire dans 14:59</Text>
                    </View>

                    <TouchableOpacity style={styles.upgradeBtn} onPress={onUpgrade}>
                        <Text style={styles.upgradeBtnText}>DEVENIR PRO MAINTENANT</Text>
                    </TouchableOpacity>

                    <View style={styles.separatorRow}>
                        <View style={styles.sepLine} />
                        <Text style={styles.sepText}>OU ATTENDRE</Text>
                        <View style={styles.sepLine} />
                    </View>

                    <Text style={styles.waitText}>Prochaine vie dans</Text>
                    <Text style={styles.timerText}>04:59</Text>
                </View>
            </View>
        </Modal>
    );
};

const LearnScreen: React.FC<LearnScreenProps> = ({ user, setUser, units, t, onShowSubscription }) => {
    const navigation = useNavigation();
    const [activeLesson, setActiveLesson] = useState<{ unitId: number, lesson: Lesson, isStory: boolean } | null>(null);
    const [currentExerciseIdx, setCurrentExerciseIdx] = useState(0);
    const [correctCount, setCorrectCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [showSummary, setShowSummary] = useState(false);
    // For Unit 0: stores the 5 intro/cours slides separately from the 5 interactive exercises
    const [activeIntroSteps, setActiveIntroSteps] = useState<any[]>([]);
    const [activeQuizExercises, setActiveQuizExercises] = useState<any[]>([]);
    const [lessonPhase, setLessonPhase] = useState<'intro' | 'quiz' | 'practice'>('intro');
    const [isChatbotVisible, setIsChatbotVisible] = useState(false);
    const [showDailyGoals, setShowDailyGoals] = useState(false);
    const [showStreak, setShowStreak] = useState(false);
    const [noHeartsVisible, setNoHeartsVisible] = useState(false);

    // Filter units based on user state
    const displayUnits = useMemo(() => {
        return units.map((u, index) => {
            const isCompleted = u.lessons.every(l => user.completedLessons.includes(l.id));
            const isFirstUnfinished = index === 0 || units[index - 1].lessons.every(l => user.completedLessons.includes(l.id));

            return {
                ...u,
                status: isCompleted ? 'completed' : (isFirstUnfinished ? 'active' : 'locked'),
                completedCount: u.lessons.filter(l => user.completedLessons.includes(l.id)).length,
                totalLessons: u.lessons.length,
            };
        });
    }, [units, user.completedLessons]);

    const startLesson = async (unitId: number, lesson: Lesson) => {
        if (user.hearts <= 0 && user.user_plan === 'freemium') {
            setNoHeartsVisible(true);
            return;
        }

        setIsLoading(true);
        try {
            const unit = units.find(u => u.id === unitId);
            const exercises = await generateLessonExercises(
                user.currentLanguage,
                unit?.theme || "Bases",
                lesson.isStory || false,
                user.interfaceLanguage,
                lesson.title,
                unitId
            );

            if (exercises && exercises.length > 0) {
                audioService.playSound('click');

                // For Unit 0: split the 5 FLASHCARD intro slides from the 5 interactive exercises
                const flashcards = exercises.filter(ex => ex.type === 'FLASHCARD' as any);
                const interactiveExercises = exercises.filter(ex => ex.type !== 'FLASHCARD' as any);

                const emotions: any[] = ['greeting', 'happy', 'excited', 'motivated', 'taking_note'];
                
                // --- PHASE 1: COURS (Intro) ---
                // We take 5 slides for the intro
                const introSteps = flashcards.slice(0, 5).map((ex, idx) => ({
                    text: ex.explanation || ex.prompt,
                    translation: ex.translation,
                    wolof: ex.content,
                    emotion: emotions[idx % emotions.length],
                }));

                // --- PHASE 2: QUIZ (Validation) ---
                // We take 5 interactive exercises for the quiz (low friction)
                const quizEx = interactiveExercises.filter(ex => 
                    ex.type === 'CHOOSE_TRANSLATION' || ex.type === 'CHOOSE_IMAGE' || ex.type === 'LISTEN_AND_CHOICE'
                ).slice(0, 5);

                // --- PHASE 3: PRATIQUE (Application) ---
                // The rest of interactive exercises (complex ones)
                const practiceEx = interactiveExercises.filter(ex => !quizEx.find(q => q.id === ex.id));

                setActiveIntroSteps(introSteps);
                setActiveQuizExercises(quizEx);
                setLessonPhase('intro');
                setActiveLesson({
                    unitId,
                    isStory: lesson.isStory || false,
                    lesson: { ...lesson, exercises: practiceEx }
                });
                setCurrentExerciseIdx(0);
                setCorrectCount(0);
                setShowSummary(false);
            } else {
                throw new Error("Aucun exercice généré.");
            }
        } catch (err) {
            console.error("Start Lesson Error:", err);
            Alert.alert(t('bayo_error_title' as TranslationKey), t('bayo_error_msg' as TranslationKey));
        } finally {
            setIsLoading(false);
        }
    };

    const finishLesson = () => {
        const lessonId = activeLesson!.lesson.id;
        // totalEx = number of interactive exercises (5 for Unit 0)
        const totalEx = activeLesson!.lesson.exercises.length;
        const percentage = (correctCount / totalEx);
        const earnedXP = Math.round(100 * percentage);
        const isPerfect = correctCount === totalEx;

        setUser(prev => {
            const newXP = prev.xp + earnedXP;
            
            // Daily Goals Logic
            const updatedObjectives = prev.dailyGoals?.objectives.map(obj => {
                let current = obj.current;
                if (obj.type === 'XP_GAINED') current += earnedXP;
                if (obj.type === 'EXERCISES_COMPLETED') current += totalEx;
                if (obj.type === 'PERFECT_LESSON' && isPerfect) current += 1;
                return { ...obj, current: Math.min(current, obj.target) };
            }) || [];

            return {
                ...prev,
                completedLessons: prev.completedLessons.includes(lessonId) ? prev.completedLessons : [...prev.completedLessons, lessonId],
                streak: prev.streak + 1,
                xp: newXP,
                hearts: prev.user_plan === 'freemium' ? Math.max(0, prev.hearts - (percentage < 0.5 ? 1 : 0)) : 5,
                dailyGoals: prev.dailyGoals ? { ...prev.dailyGoals, objectives: updatedObjectives } : undefined
            };
        });
        setActiveLesson(null);
        setShowSummary(false);
    };

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <Bayo emotion="taking_note" size={isSmallDevice ? "lg" : "xl"} />
                <View style={styles.loadingTextWrapper}>
                    <Text style={styles.loadingTitle}>{t('bayo_preparing_lesson' as TranslationKey)}</Text>
                    <Text style={styles.loadingSubtitle}>{t('transmission_wisdom' as TranslationKey)}</Text>
                </View>
                <ActivityIndicator size="large" color={COLORS.primary} style={{ marginTop: 40 }} />
            </View>
        );
    }

    if (showSummary && activeLesson) {
        // total = number of interactive exercises (5 for Unit 0)
        const total = activeLesson.lesson.exercises.length;
        const isPerfect = correctCount === total;
        const wrongCount = total - correctCount;

        return (
            <View style={styles.summaryContainer}>
                <View style={[styles.summaryCard, isPerfect ? styles.perfectSummary : styles.failedSummary]}>
                    <Bayo emotion={isPerfect ? 'excited' : 'thinking'} size={isSmallDevice ? "lg" : "xl"} />

                    <Text style={styles.summaryTitle}>
                        {isPerfect ? t('summary_perfect' as TranslationKey) : t('summary_failed' as TranslationKey)}
                    </Text>

                    <View style={styles.statsGrid}>
                        <View style={styles.statBox}>
                            <Text style={styles.statBoxValue}>{correctCount}</Text>
                            <Text style={styles.statBoxLabel}>{t('stat_success' as TranslationKey)}</Text>
                        </View>
                        <View style={styles.statBox}>
                            <Text style={[styles.statBoxValue, { color: COLORS.error }]}>{wrongCount}</Text>
                            <Text style={styles.statBoxLabel}>{t('stat_errors' as TranslationKey)}</Text>
                        </View>
                    </View>

                    {!isPerfect && (
                        <View style={styles.objectiveBanner}>
                            <Text style={styles.objectiveText}>
                                {t('perfect_objective' as TranslationKey).replace('{{total}}', String(total))}
                            </Text>
                        </View>
                    )}
                </View>

                <View style={styles.summaryFooter}>
                    {isPerfect ? (
                        <Button
                            title={t('validate_course' as TranslationKey)}
                            variant="primary"
                            size="lg"
                            fullWidth
                            onPress={finishLesson}
                        />
                    ) : (
                        <Button
                            title={t('retry' as TranslationKey)}
                            variant="primary"
                            size="lg"
                            fullWidth
                            onPress={() => startLesson(activeLesson.unitId, activeLesson.lesson)}
                        />
                    )}

                    <TouchableOpacity
                        style={styles.quitButton}
                        onPress={() => {
                            setActiveLesson(null);
                            setShowSummary(false);
                        }}
                    >
                        <Text style={styles.quitButtonText}>{t('quit_for_now' as TranslationKey)}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    if (activeLesson && !showSummary) {
        // --- STEP 1: COURS (Intro) ---
        if (lessonPhase === 'intro' && activeIntroSteps.length > 0) {
            return (
                <LessonIntroduction
                    steps={activeIntroSteps}
                    onFinish={() => {
                        if (activeQuizExercises.length > 0) {
                            setLessonPhase('quiz');
                        } else {
                            setLessonPhase('practice');
                        }
                        setCurrentExerciseIdx(0);
                    }}
                    t={t}
                    targetLanguage={user.currentLanguage}
                />
            );
        }

        // --- STEP 2: QUIZ (Validation) ---
        if (lessonPhase === 'quiz' && activeQuizExercises.length > 0) {
            const totalQuiz = activeQuizExercises.length;
            return (
                <ExerciseScreen
                    exercise={activeQuizExercises[currentExerciseIdx]}
                    progress={(currentExerciseIdx / totalQuiz) * 100}
                    onQuit={() => setActiveLesson(null)}
                    targetLanguage={user.currentLanguage}
                    interfaceLanguage={user.interfaceLanguage}
                    isQuizMode={true} // Add this prop to style it differently if needed
                    onNext={(isCorrect) => {
                        // Scores in quiz don't always count for hearts but for validation
                        if (currentExerciseIdx < totalQuiz - 1) {
                            setCurrentExerciseIdx(i => i + 1);
                        } else {
                            setLessonPhase('practice');
                            setCurrentExerciseIdx(0);
                        }
                    }}
                    t={t}
                />
            );
        }

        // --- STEP 3: PRATIQUE (Application) ---
        const totalEx = activeLesson.lesson.exercises.length;
        return (
            <ExerciseScreen
                exercise={activeLesson.lesson.exercises[currentExerciseIdx]}
                progress={(currentExerciseIdx / totalEx) * 100}
                onQuit={() => setActiveLesson(null)}
                targetLanguage={user.currentLanguage}
                interfaceLanguage={user.interfaceLanguage}
                onNext={(isCorrect) => {
                    if (isCorrect) setCorrectCount(c => c + 1);
                    if (currentExerciseIdx < totalEx - 1) {
                        setCurrentExerciseIdx(i => i + 1);
                    } else {
                        setShowSummary(true);
                        const finalCorrect = isCorrect ? correctCount + 1 : correctCount;
                        if (finalCorrect === totalEx) {
                            audioService.playSound('success');
                        }
                    }
                }}
                t={t}
            />
        );
    }

    const userAvatar = user.avatar || '👩🏾';
    const isEmojiAvatar = !userAvatar.startsWith('http');

    return (
        <LinearGradient
            colors={['#FFF9F2', '#FEF1E4', '#FDF7F0']}
            style={styles.container}
        >
            <StatusBar barStyle="dark-content" />

            {/* Top Bar Stats */}
            <View style={styles.topStatsBar}>
                <TouchableOpacity
                    style={styles.avatarCircleSmall}
                    onPress={() => (navigation as any).navigate('Profile')}
                >
                    {isEmojiAvatar ? (
                        <Text style={{ fontSize: 24, textAlign: 'center' }}>{userAvatar}</Text>
                    ) : (
                        <Image
                            source={{ uri: userAvatar }}
                            style={styles.avatarSmall}
                        />
                    )}
                </TouchableOpacity>
                <View style={styles.pillsContainer}>
                    <XPProgressBar xp={user.xp || 0} />
                    <TouchableOpacity style={styles.statPill} onPress={() => setShowStreak(true)}>
                        <View style={[styles.pillIconBg, { backgroundColor: '#FFF3E0' }]}>
                            <FontAwesome5 name="fire-alt" size={14} color="#FF9633" />
                        </View>
                        <Text style={styles.statPillValue}>{user.streak || 0}</Text>
                    </TouchableOpacity>
                    <View style={styles.statPill}>
                        <View style={[styles.pillIconBg, { backgroundColor: '#FFEBEE' }]}>
                            <Text style={styles.statPillIcon}>❤️</Text>
                        </View>
                        <Text style={[styles.statPillValue, { color: COLORS.heart }]}>{user.hearts || 5}</Text>
                    </View>
                    <View style={styles.statPill}>
                        <View style={[styles.pillIconBg, { backgroundColor: '#FFFBEB' }]}>
                            <MaterialCommunityIcons name="diamond" size={16} color="#F59E0B" />
                        </View>
                        <Text style={[styles.statPillValue, { color: '#D97706' }]}>{user.shells || 0}</Text>
                    </View>
                    <TouchableOpacity style={styles.statPill} onPress={() => setShowDailyGoals(true)}>
                        <View style={[styles.pillIconBg, { backgroundColor: '#F0F9FF' }]}>
                            <MaterialCommunityIcons name="treasure-chest" size={16} color="#3B82F6" />
                        </View>
                        <View style={styles.goalDot} />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView
                style={styles.mainScroll}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Section Header */}
                <View style={styles.sectionHeader}>
                    <View style={styles.apprendreHeader}>
                        <View style={styles.apprendreIconBox}>
                            <Text style={styles.apprendreIcon}>🌍</Text>
                        </View>
                        <View>
                            <Text style={styles.apprendreTitle}>{t('learn_title' as TranslationKey)}</Text>
                            <Text style={styles.apprendreSubtitle}>{t('mastery_cultural_level' as TranslationKey)}</Text>
                        </View>
                    </View>
                </View>

                {/* Units Path */}
                <View style={[styles.pathContainer, { paddingHorizontal: 0 }]}>
                    {displayUnits.map((unit, index) => {
                        const isCompleted = unit.status === 'completed';
                        const isActive = unit.status === 'active';
                        const isLocked = unit.status === 'locked';

                        const unitBannerColor = isLocked ? COLORS.gray[300] : (isCompleted ? COLORS.success : COLORS.primary);
                        const unitBannerBorderColor = isLocked ? COLORS.gray[400] : (isCompleted ? '#2E7D32' : '#E65100');
                        const headerTextColor = isLocked ? COLORS.gray[500] : COLORS.white;

                        return (
                            <View key={unit.id} style={styles.unitSection}>
                                {/* SECTION HEADER */}
                                <View style={[styles.unitBanner, { backgroundColor: unitBannerColor, borderBottomColor: unitBannerBorderColor }]}>
                                    <View style={styles.unitBannerHeader}>
                                        <Text style={[styles.unitBannerLabel, { color: headerTextColor }]}>
                                            {t('section_unit_label' as TranslationKey)} {index + 1}, {t('unit' as TranslationKey)} {unit.id}
                                        </Text>
                                        <TouchableOpacity style={[
                                            styles.unitBannerButton,
                                            { backgroundColor: isLocked ? COLORS.gray[400] : (isCompleted ? '#4CAF50' : '#F57C00') }
                                        ]}>
                                            <FontAwesome5 name="list-alt" size={16} color={isLocked ? COLORS.gray[300] : COLORS.white} />
                                        </TouchableOpacity>
                                    </View>
                                    <Text style={[styles.unitBannerTitle, { color: headerTextColor }]}>{unit.title}</Text>
                                    <Text style={[styles.unitBannerSubtitle, { color: headerTextColor }]}>{unit.theme}</Text>

                                    {isActive && (
                                        <View style={styles.progressRow}>
                                            <View style={styles.progressBarBg}>
                                                <View style={[
                                                    styles.progressBarFill,
                                                    { width: `${(unit.completedCount / unit.totalLessons) * 100}%` }
                                                ]} />
                                            </View>
                                            <Text style={styles.progressFraction}>
                                                {unit.completedCount}/{unit.totalLessons}
                                            </Text>
                                        </View>
                                    )}
                                </View>

                                {/* LE PARCOURS DES 11 LEÇONS (visible for all units) */}
                                <View style={styles.lessonsPathContainer}>
                                    {unit.lessons.map((lesson, lIndex) => {
                                        const isEvaluation = lIndex === 10;
                                        const isLessonCompleted = user.completedLessons.includes(lesson.id);

                                        const isLessonActive = isActive && !isLessonCompleted &&
                                            (lIndex === 0 || user.completedLessons.includes(unit.lessons[lIndex - 1].id));

                                        const isLessonLocked = isLocked || (!isLessonCompleted && !isLessonActive);

                                        // Winding pattern offsets map (Duolingo style)
                                        const baseCurveOffsets = [0, 30, 60, 35, 0, -35, -60, -30, 0, 35, 60];
                                        const curveScale = isTablet ? 1.4 : 1;
                                        const offset = (baseCurveOffsets[lIndex] || 0) * curveScale;

                                        return (
                                            <TouchableOpacity
                                                key={lesson.id}
                                                style={[
                                                    styles.lessonNodeWrapper,
                                                    { transform: [{ translateX: offset }] }
                                                ]}
                                                disabled={isLessonLocked}
                                                onPress={() => startLesson(unit.id, lesson)}
                                            >
                                                <View style={[
                                                    styles.lessonNode,
                                                    isLessonCompleted && styles.lessonNodeCompleted,
                                                    isLessonActive && styles.lessonNodeActive,
                                                    isLessonLocked && styles.lessonNodeLocked,
                                                    isEvaluation && styles.lessonNodeEvaluation
                                                ]}>
                                                    {isEvaluation ? (
                                                        <FontAwesome5 name={isLessonCompleted ? 'trophy' : 'crown'} size={isSmallDevice ? 24 : 32} color={isLessonLocked ? COLORS.gray[400] : COLORS.white} />
                                                    ) : isLessonCompleted ? (
                                                        <FontAwesome5 name="check" size={isSmallDevice ? 22 : 28} color={COLORS.white} />
                                                    ) : isLessonActive ? (
                                                        <FontAwesome5 name="star" size={isSmallDevice ? 22 : 28} color={COLORS.white} />
                                                    ) : (
                                                        <View style={styles.lessonNodeLockedInner} />
                                                    )}

                                                    {/* If it's the active lesson, render Bayo jumping on it */}
                                                    {isLessonActive && (
                                                        <>
                                                            <View style={styles.bayoAvatarContainer}>
                                                                <View style={styles.bayoAvatarFloating}>
                                                                    <Bayo size="lg" emotion="motivated" />
                                                                </View>
                                                            </View>
                                                            <View style={styles.startBadgeFloating}>
                                                                <Text style={styles.startBadgeText}>{t('start' as TranslationKey)}</Text>
                                                            </View>
                                                        </>
                                                    )}
                                                </View>
                                            </TouchableOpacity>
                                        );
                                    })}
                                </View>
                            </View>
                        );
                    })}
                </View>
            </ScrollView>

            {/* Floating Bayo FAB */}
            <TouchableOpacity
                style={styles.fab}
                onPress={() => setIsChatbotVisible(true)}
            >
                <Bayo size="sm" emotion="happy" />
                <View style={styles.fabBadge}>
                    <Text style={styles.fabBadgeText}>?</Text>
                </View>
            </TouchableOpacity>

            <BayoGuideChatbot
                isVisible={isChatbotVisible}
                onClose={() => setIsChatbotVisible(false)}
                targetLanguage={user.currentLanguage}
                interfaceLanguage={user.interfaceLanguage}
                t={t}
            />

            <DailyObjectivesModal
                visible={showDailyGoals}
                onClose={() => setShowDailyGoals(false)}
                objectives={user.dailyGoals?.objectives || []}
            />

            <StreakPopover
                visible={showStreak}
                onClose={() => setShowStreak(false)}
                streak={user.streak || 0}
            />

            <VipEnergyModal 
                visible={noHeartsVisible} 
                onClose={() => setNoHeartsVisible(false)}
                onUpgrade={() => {
                    setNoHeartsVisible(false);
                    onShowSubscription?.();
                }}
                t={t}
            />
        </LinearGradient >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: isTablet ? 'center' as const : undefined,
    },
    topStatsBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: isTablet ? SPACING.xl : SPACING.md,
        paddingTop: Constants.statusBarHeight + 10,
        paddingBottom: SPACING.sm,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderBottomWidth: 1,
        borderBottomColor: '#F5F5F5',
        width: '100%',
        maxWidth: isTablet ? MAX_CONTENT_WIDTH + 100 : undefined,
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
    goalDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#D97706',
        position: 'absolute',
        top: -2,
        right: -2,
        borderWidth: 1.5,
        borderColor: 'white',
    },
    statPillIcon: {
        fontSize: 14,
    },
    statPillValue: {
        fontSize: 12,
        fontWeight: '900',
        color: COLORS.secondary,
    },
    mainScroll: {
        flex: 1,
        width: '100%',
        maxWidth: isTablet ? MAX_CONTENT_WIDTH + 40 : undefined,
    },
    scrollContent: {
        paddingVertical: SPACING.lg,
        paddingBottom: 100,
    },
    sectionHeader: {
        paddingHorizontal: isSmallDevice ? SPACING.md : SPACING.xl,
        marginBottom: isSmallDevice ? SPACING.lg : SPACING.xxl,
    },
    apprendreHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.md,
        backgroundColor: COLORS.white,
        padding: SPACING.md,
        borderRadius: BORDER_RADIUS.xl,
        ...SHADOWS.lg,
        borderWidth: 1,
        borderColor: '#FEF1E4',
    },
    apprendreIconBox: {
        width: isSmallDevice ? 40 : 50,
        height: isSmallDevice ? 40 : 50,
        borderRadius: BORDER_RADIUS.lg,
        backgroundColor: '#FFF0D4', // Soft warm orange 
        justifyContent: 'center',
        alignItems: 'center',
    },
    apprendreIcon: {
        fontSize: isSmallDevice ? 20 : 24,
    },
    apprendreTitle: {
        fontSize: isSmallDevice ? 18 : 20,
        color: COLORS.text.primary,
        fontWeight: '900',
    },
    apprendreSubtitle: {
        fontSize: isSmallDevice ? 9 : 10,
        color: COLORS.primaryDark,
        marginTop: -2,
        fontWeight: '900',
        letterSpacing: 1,
    },
    pathContainer: {
        position: 'relative',
        paddingHorizontal: isTablet ? 30 : (isSmallDevice ? 15 : 20),
    },
    // DUOLINGO STYLE UNIT HEADER
    unitSection: {
        marginBottom: 30,
    },
    unitBanner: {
        marginHorizontal: 15,
        padding: 15, // Reduced from 20
        borderRadius: 15,
        borderWidth: 0,
        borderBottomWidth: 5, // Reduced from 6
        marginBottom: 5, // Reduced from 10
    },
    unitBannerHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5, // Reduced from 10
    },
    unitBannerLabel: {
        fontSize: 12, // Reduced from 14
        fontWeight: '900',
        letterSpacing: 0.5,
    },
    unitBannerButton: {
        padding: 6, // Reduced from 8
        borderRadius: 8,
    },
    unitBannerTitle: {
        fontSize: isSmallDevice ? 18 : 22, // Reduced from 22:26
        fontWeight: '900',
        marginBottom: 2, // Reduced from 5
    },
    unitBannerSubtitle: {
        fontSize: 12, // Reduced from 14
        fontWeight: '600',
    },
    progressRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10, // Reduced from 12
        backgroundColor: 'rgba(255,255,255,0.2)',
        padding: 8, // Reduced from 10
        borderRadius: 12, // Reduced from 15
        marginTop: 10, // Reduced from 15
    },
    progressBarBg: {
        flex: 1,
        height: 10,
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: 5,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: COLORS.white,
    },
    progressFraction: {
        fontSize: 11,
        fontWeight: '900',
        color: COLORS.white,
    },

    // DUOLINGO STYLE PATH NODES
    lessonsPathContainer: {
        alignItems: 'center',
        position: 'relative',
        paddingVertical: isTablet ? 20 : 15,
    },
    lessonNodeWrapper: {
        marginVertical: isTablet ? 25 : (isSmallDevice ? 15 : 20),
        zIndex: 1,
        alignItems: 'center',
    },
    lessonNode: {
        width: isTablet ? 85 : (isSmallDevice ? 65 : 75),
        height: isTablet ? 85 : (isSmallDevice ? 65 : 75),
        borderRadius: isTablet ? 45 : 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0,
        borderBottomWidth: isTablet ? 10 : 8,
    },
    lessonNodeCompleted: {
        backgroundColor: COLORS.primary,
        borderBottomColor: '#E65100', // darker orange
    },
    lessonNodeActive: {
        backgroundColor: COLORS.primary,
        borderBottomColor: '#E65100',
    },
    lessonNodeLocked: {
        backgroundColor: '#E5E7EB',
        borderBottomColor: '#D1D5DB',
    },
    lessonNodeLockedInner: {
        width: 25,
        height: 25,
        borderRadius: 12.5,
        backgroundColor: '#D1D5DB',
        borderBottomWidth: 2,
        borderBottomColor: '#9CA3AF',
    },
    lessonNodeEvaluation: {
        width: isTablet ? 110 : (isSmallDevice ? 85 : 95),
        height: isTablet ? 110 : (isSmallDevice ? 85 : 95),
        borderRadius: isTablet ? 25 : 20,
        backgroundColor: COLORS.accent,
        borderBottomColor: '#FF8F00',
        borderBottomWidth: isTablet ? 12 : 10,
    },
    bayoAvatarContainer: {
        position: 'absolute',
        top: -65,
        alignItems: 'center',
    },
    bayoAvatarFloating: {
        transform: [{ scale: 0.8 }],
    },
    startBadgeFloating: {
        position: 'absolute',
        top: 25, // Placed below Bayo (whose container is at top: -65)
        backgroundColor: COLORS.white,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: COLORS.primary,
        ...SHADOWS.md,
    },
    startBadgeText: {
        color: COLORS.primaryDark,
        fontSize: 9,
        fontWeight: '900',
        letterSpacing: 1,
    },
    commencerButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: 12,
        borderRadius: 15,
        alignItems: 'center',
        ...SHADOWS.md,
    },
    commencerText: {
        fontSize: 14,
        color: COLORS.white,
        fontWeight: '900',
        letterSpacing: 1,
    },
    lockedOverlay: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 5,
    },
    lockInfo: {
        flex: 1,
    },
    lockedLabel: {
        fontSize: 10,
        color: COLORS.text.tertiary,
        fontWeight: '900',
    },
    lockIcon: {
        fontSize: 20,
        color: '#FFCC80',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        padding: SPACING.xl,
    },
    loadingTextWrapper: {
        alignItems: 'center',
        marginTop: SPACING.xl,
    },
    loadingTitle: {
        fontSize: 20,
        color: COLORS.text.primary,
        fontWeight: '900',
        textAlign: 'center',
    },
    loadingSubtitle: {
        fontSize: 14,
        color: COLORS.text.tertiary,
        marginTop: 4,
        textAlign: 'center',
    },
    summaryContainer: {
        flex: 1,
        backgroundColor: '#FDF7F0',
        padding: isTablet ? 40 : (isSmallDevice ? 15 : 25),
        justifyContent: 'center',
        alignItems: isTablet ? 'center' as const : undefined,
    },
    summaryCard: {
        backgroundColor: COLORS.white,
        borderRadius: 40,
        padding: isTablet ? 40 : (isSmallDevice ? 20 : 30),
        alignItems: 'center',
        ...SHADOWS.xl,
        borderWidth: 4,
        maxWidth: isTablet ? MAX_CONTENT_WIDTH : undefined,
        width: isTablet ? '100%' as const : undefined,
    },
    perfectSummary: {
        borderColor: COLORS.success,
    },
    failedSummary: {
        borderColor: COLORS.primary,
    },
    summaryTitle: {
        fontSize: isSmallDevice ? 24 : 28,
        color: COLORS.text.primary,
        fontWeight: '900',
        marginTop: 20,
        textAlign: 'center',
    },
    statsGrid: {
        flexDirection: 'row',
        gap: 15,
        marginTop: 20,
        marginBottom: 20,
    },
    statBox: {
        alignItems: 'center',
        backgroundColor: '#FDF7F0',
        padding: 15,
        borderRadius: 20,
        minWidth: isSmallDevice ? 80 : 100,
    },
    statBoxValue: {
        fontSize: isSmallDevice ? 24 : 32,
        fontWeight: '900',
        color: COLORS.success,
    },
    statBoxLabel: {
        fontSize: 10,
        color: COLORS.text.tertiary,
        fontWeight: '900',
        marginTop: 4,
    },
    objectiveBanner: {
        backgroundColor: COLORS.secondaryLight,
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 15,
    },
    objectiveText: {
        fontSize: 12,
        color: COLORS.primaryDark,
        fontWeight: '900',
    },
    summaryFooter: {
        marginTop: 30,
        gap: 12,
    },
    quitButton: {
        paddingVertical: 15,
        alignItems: 'center',
    },
    quitButtonText: {
        fontSize: 13,
        color: COLORS.text.tertiary,
        fontWeight: '900',
        textDecorationLine: 'underline',
    },
    fab: {
        position: 'absolute',
        bottom: isTablet ? 40 : 30,
        right: isTablet ? 40 : 25,
        width: isTablet ? 70 : 60,
        height: isTablet ? 70 : 60,
        borderRadius: isTablet ? 24 : 20,
        backgroundColor: '#FFA726',
        justifyContent: 'center',
        alignItems: 'center',
        ...SHADOWS.lg,
        borderBottomWidth: 4,
        borderBottomColor: '#F57C00',
    },
    fabIcon: {
        fontSize: 30,
    },
    fabBadge: {
        position: 'absolute',
        top: -5,
        right: -5,
        backgroundColor: COLORS.secondary,
        width: 20,
        height: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: COLORS.white,
    },
    fabBadgeText: {
        color: COLORS.white,
        fontSize: 10,
        fontWeight: '900',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.8)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    vipContainer: {
        backgroundColor: '#1E293B',
        borderRadius: 30,
        padding: 30,
        width: '100%',
        maxWidth: 400,
        alignItems: 'center',
        ...SHADOWS.xl,
        borderWidth: 1,
        borderColor: '#334155',
    },
    closeModalBtn: {
        position: 'absolute',
        top: 20,
        right: 20,
        zIndex: 10,
    },
    closeModalText: {
        color: 'rgba(255,255,255,0.4)',
        fontSize: 20,
        fontWeight: 'bold',
    },
    vipTitle: {
        fontSize: 32,
        fontWeight: '900',
        color: COLORS.white,
        marginBottom: 8,
    },
    vipSubtitle: {
        fontSize: 18,
        color: COLORS.white,
        opacity: 0.9,
        marginBottom: 20,
        textAlign: 'center',
    },
    vipDesc: {
        fontSize: 15,
        color: COLORS.white,
        textAlign: 'center',
        marginBottom: 8,
        lineHeight: 22,
    },
    proBadge: {
        color: '#F59E0B',
        fontWeight: '900',
    },
    boldText: {
        fontWeight: '900',
    },
    vipSupport: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.5)',
        textAlign: 'center',
        marginBottom: 25,
        paddingHorizontal: 10,
    },
    promoBox: {
        backgroundColor: '#0F172A',
        width: '100%',
        borderRadius: 24,
        padding: 20,
        alignItems: 'center',
        marginBottom: 25,
        borderWidth: 1,
        borderColor: '#334155',
    },
    promoBadge: {
        backgroundColor: '#92400E',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 12,
        marginBottom: 15,
    },
    promoCodeText: {
        color: '#FCD34D',
        fontSize: 22,
        fontWeight: '900',
        letterSpacing: 3,
    },
    promoBenefit: {
        color: COLORS.white,
        fontWeight: '900',
        textAlign: 'center',
        fontSize: 14,
        marginBottom: 6,
    },
    promoTimer: {
        color: 'rgba(255,255,255,0.4)',
        fontSize: 11,
        textAlign: 'center',
    },
    upgradeBtn: {
        backgroundColor: '#92400E',
        width: '100%',
        paddingVertical: 18,
        borderRadius: 20,
        alignItems: 'center',
        ...SHADOWS.md,
    },
    upgradeBtnText: {
        color: COLORS.white,
        fontWeight: '900',
        fontSize: 18,
        letterSpacing: 1,
    },
    separatorRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 25,
        width: '100%',
    },
    sepLine: {
        flex: 1,
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.1)',
    },
    sepText: {
        color: 'rgba(255,255,255,0.3)',
        fontSize: 12,
        fontWeight: '900',
        marginHorizontal: 15,
    },
    waitText: {
        color: 'rgba(255,255,255,0.4)',
        fontSize: 13,
        marginBottom: 6,
    },
    timerText: {
        color: COLORS.white,
        fontSize: 22,
        fontWeight: '900',
        fontVariant: ['tabular-nums'],
    },
});

export default LearnScreen;
