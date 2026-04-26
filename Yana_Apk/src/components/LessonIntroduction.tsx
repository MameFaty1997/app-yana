import * as React from 'react';
import { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Animated,
} from 'react-native';
import { Bayo, Button } from './ui';
import { LessonStep } from '../types';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from '../theme';
import { audioService } from '../services/audioService';
import { isTablet, isSmallDevice, MAX_CONTENT_WIDTH } from '../utils/responsive';

interface LessonIntroductionProps {
    steps: LessonStep[];
    onFinish: () => void;
    t: (key: any) => string;
    targetLanguage?: string;
}

const LessonIntroduction: React.FC<LessonIntroductionProps> = ({ steps, onFinish, t, targetLanguage }) => {
    const [currentStepIdx, setCurrentStepIdx] = useState(0);
    const fadeAnim = React.useRef(new Animated.Value(1)).current;
    const slideAnim = React.useRef(new Animated.Value(0)).current;

    const step = steps[currentStepIdx];

    // Auto-speak the vocabulary word when slide changes
    useEffect(() => {
        if (step?.wolof && targetLanguage) {
            audioService.speak(step.wolof, targetLanguage);
        }
        // Animate in
        Animated.parallel([
            Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
            Animated.spring(slideAnim, { toValue: 0, useNativeDriver: true, speed: 14, bounciness: 4 }),
        ]).start();
    }, [currentStepIdx]);

    const animateOut = (callback: () => void) => {
        Animated.parallel([
            Animated.timing(fadeAnim, { toValue: 0, duration: 150, useNativeDriver: true }),
            Animated.timing(slideAnim, { toValue: -20, duration: 150, useNativeDriver: true }),
        ]).start(callback);
    };

    const nextStep = () => {
        audioService.playSound('click');
        animateOut(() => {
            if (currentStepIdx < steps.length - 1) {
                slideAnim.setValue(30);
                setCurrentStepIdx(currentStepIdx + 1);
            } else {
                onFinish();
            }
        });
    };

    const prevStep = () => {
        if (currentStepIdx > 0) {
            audioService.playSound('click');
            animateOut(() => {
                slideAnim.setValue(-30);
                setCurrentStepIdx(currentStepIdx - 1);
            });
        }
    };

    const speakWord = () => {
        if (step?.wolof && targetLanguage) {
            audioService.speak(step.wolof, targetLanguage);
        } else if (step?.wolof) {
            audioService.speak(step.wolof, 'wolof');
        }
    };

    const isLast = currentStepIdx === steps.length - 1;
    const progress = (currentStepIdx + 1) / steps.length;

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <View style={styles.bayoBadge}>
                        <Text style={styles.bayoBadgeText}>{t('bayo_explains' as any)}</Text>
                    </View>
                    <Text style={styles.stepCounter}>{currentStepIdx + 1} / {steps.length}</Text>
                </View>
                {/* Progress bar */}
                <View style={styles.progressBarBg}>
                    <Animated.View style={[styles.progressBarFill, { width: `${progress * 100}%` as any }]} />
                </View>
            </View>

            {/* Main Content */}
            <Animated.View
                style={[
                    styles.content,
                    { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }
                ]}
            >
                {/* Bayo character */}
                <View style={styles.bayoWrapper}>
                    <Bayo
                        emotion={step?.emotion || 'happy'}
                        size={isSmallDevice ? 'lg' : 'xl'}
                    />
                </View>

                {/* Speech bubble */}
                <View style={styles.speechBubble}>
                    <View style={styles.bubbleTail} />

                    {/* Explanation text (what Bayo says) */}
                    <Text style={styles.explanationText}>{step?.text}</Text>

                    {/* Vocabulary card */}
                    {step?.wolof && (
                        <View style={styles.vocabCard}>
                            <TouchableOpacity style={styles.vocabRow} onPress={speakWord} activeOpacity={0.8}>
                                <View style={styles.vocabMain}>
                                    <Text style={styles.vocabWord}>{step.wolof}</Text>
                                    {step.translation && (
                                        <Text style={styles.vocabTranslation}>{step.translation}</Text>
                                    )}
                                </View>
                                <View style={styles.speakerButton}>
                                    <Text style={styles.speakerIcon}>🔊</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </Animated.View>

            {/* Footer navigation */}
            <View style={styles.footer}>
                <View style={styles.footerButtons}>
                    {currentStepIdx > 0 && (
                        <TouchableOpacity style={styles.backBtn} onPress={prevStep}>
                            <Text style={styles.backBtnText}>← {t('back' as any)}</Text>
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity
                        style={[styles.nextBtn, isLast && styles.nextBtnFinish, currentStepIdx === 0 && styles.nextBtnFull]}
                        onPress={nextStep}
                    >
                        <Text style={styles.nextBtnText}>
                            {isLast ? `🎯 ${t('start_exercises' as any)}` : `${t('next' as any)} →`}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FDF7F0',
    },
    header: {
        paddingTop: 50,
        paddingHorizontal: SPACING.lg,
        paddingBottom: SPACING.md,
        gap: 10,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    bayoBadge: {
        backgroundColor: COLORS.primary,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },
    bayoBadgeText: {
        color: COLORS.white,
        fontSize: 10,
        fontWeight: '900',
        letterSpacing: 1,
    },
    stepCounter: {
        fontSize: 12,
        fontWeight: '700',
        color: COLORS.text.tertiary,
    },
    progressBarBg: {
        height: 8,
        backgroundColor: COLORS.gray[200],
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: COLORS.primary,
        borderRadius: 4,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: isTablet ? SPACING.xxl : SPACING.lg,
        maxWidth: isTablet ? MAX_CONTENT_WIDTH : undefined,
        width: '100%',
        alignSelf: 'center',
    },
    bayoWrapper: {
        marginBottom: isSmallDevice ? 10 : 16,
    },
    speechBubble: {
        backgroundColor: COLORS.white,
        borderRadius: 24,
        padding: isSmallDevice ? 18 : 24,
        width: '100%',
        ...SHADOWS.lg,
        borderWidth: 2,
        borderColor: '#FEE9D4',
        position: 'relative',
    },
    bubbleTail: {
        position: 'absolute',
        top: -14,
        left: '50%',
        marginLeft: -14,
        width: 0,
        height: 0,
        borderLeftWidth: 14,
        borderRightWidth: 14,
        borderBottomWidth: 14,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#FEE9D4',
    },
    explanationText: {
        fontSize: isTablet ? 19 : (isSmallDevice ? 15 : 17),
        color: COLORS.text.primary,
        fontWeight: '700',
        textAlign: 'center',
        lineHeight: isTablet ? 28 : (isSmallDevice ? 22 : 26),
        marginBottom: 16,
    },
    vocabCard: {
        backgroundColor: '#FFF7ED',
        borderRadius: 16,
        borderWidth: 1.5,
        borderColor: '#FDDCB7',
        overflow: 'hidden',
    },
    vocabRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 14,
        gap: 12,
    },
    vocabMain: {
        flex: 1,
    },
    vocabWord: {
        fontSize: isSmallDevice ? 22 : 26,
        fontWeight: '900',
        color: COLORS.primary,
        letterSpacing: 0.5,
    },
    vocabTranslation: {
        fontSize: 13,
        color: COLORS.text.secondary,
        fontWeight: '600',
        marginTop: 2,
    },
    speakerButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
        ...SHADOWS.sm,
    },
    speakerIcon: {
        fontSize: 20,
    },
    footer: {
        paddingHorizontal: isTablet ? SPACING.xxl : SPACING.lg,
        paddingBottom: isTablet ? 44 : 36,
        maxWidth: isTablet ? MAX_CONTENT_WIDTH : undefined,
        width: '100%',
        alignSelf: 'center',
    },
    footerButtons: {
        flexDirection: 'row',
        gap: 12,
    },
    backBtn: {
        flex: 1,
        paddingVertical: 16,
        borderRadius: 16,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: COLORS.gray[200],
    },
    backBtnText: {
        fontSize: 15,
        fontWeight: '800',
        color: COLORS.text.secondary,
    },
    nextBtn: {
        flex: 2,
        paddingVertical: 16,
        borderRadius: 16,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        ...SHADOWS.md,
        borderBottomWidth: 4,
        borderBottomColor: '#E65100',
    },
    nextBtnFull: {
        flex: 1,
    },
    nextBtnFinish: {
        backgroundColor: COLORS.success,
        borderBottomColor: '#2E7D32',
    },
    nextBtnText: {
        fontSize: 15,
        fontWeight: '900',
        color: COLORS.white,
        letterSpacing: 0.3,
    },
});

export default LessonIntroduction;
