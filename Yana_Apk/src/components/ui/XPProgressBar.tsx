import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { WISDOM_GRADES, COLORS } from '../../constants';
import { SHADOWS } from '../../theme';

interface XPProgressBarProps {
    xp: number;
    containerStyle?: any;
}

const XPProgressBar: React.FC<XPProgressBarProps> = ({ xp, containerStyle }) => {
    // Determine current grade and next grade
    const { currentGrade, nextGrade, progress } = useMemo(() => {
        const sortedGrades = [...WISDOM_GRADES].sort((a, b) => a.minXp - b.minXp);
        let currentIdx = 0;

        for (let i = sortedGrades.length - 1; i >= 0; i--) {
            if (xp >= sortedGrades[i].minXp) {
                currentIdx = i;
                break;
            }
        }

        const currentGrade = sortedGrades[currentIdx];
        const nextGrade = sortedGrades[currentIdx + 1] || null;

        let progress = 1; // Default to full if at max grade
        if (nextGrade) {
            const range = nextGrade.minXp - currentGrade.minXp;
            const earned = xp - currentGrade.minXp;
            progress = Math.min(1, Math.max(0, earned / range));
        }

        return { currentGrade, nextGrade, progress };
    }, [xp]);

    return (
        <View style={[styles.container, containerStyle]}>
            {/* XP Circle Badge */}
            <View style={styles.circleBadge}>
                <View style={styles.innerCircle}>
                    <Text style={styles.xpText}>XP</Text>
                </View>
                {/* 3D highlights and bubbles */}
                <View style={styles.circleHighlight} />
                <View style={[styles.bubble, { top: 18, left: 6, width: 4, height: 4 }]} />
                <View style={[styles.bubble, { top: 22, left: 12, width: 2, height: 2 }]} />
            </View>

            {/* Progress Bar */}
            <View style={styles.barContainer}>
                <View style={styles.barBackground}>
                    <View
                        style={[
                            styles.barFill,
                            { width: `${progress * 100}%` }
                        ]}
                    />
                    {/* Glossy highlight on the bar */}
                    <View style={styles.barHighlight} />

                    {/* Bubbles on the bar fill */}
                    {progress > 0.3 && (
                        <View style={[styles.barBubble, { left: '20%', width: 3, height: 3 }]} />
                    )}
                    {progress > 0.7 && (
                        <View style={[styles.barBubble, { left: '50%', width: 5, height: 5, top: 4 }]} />
                    )}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
    },
    circleBadge: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#FFB347', // Yana Caury/Gold
        borderWidth: 2,
        borderColor: '#4B3621', // Terre Brune border
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
        ...SHADOWS.sm,
    },
    innerCircle: {
        width: '100%',
        height: '100%',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    xpText: {
        color: '#FFFFFF', // White text for brand contrast
        fontSize: 13,
        fontWeight: '900',
        textShadowColor: '#4B3621',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
    },
    circleHighlight: {
        position: 'absolute',
        top: 3,
        left: 5,
        width: 10,
        height: 5,
        backgroundColor: 'rgba(255,255,255,0.4)',
        borderRadius: 5,
        transform: [{ rotate: '-15deg' }],
    },
    bubble: {
        position: 'absolute',
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 10,
    },
    barContainer: {
        height: 14, // Slightly slimmer
        width: 80,
        marginLeft: -12, // More overlap
        backgroundColor: '#1A2F33', // Darker background for more contrast
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#B0D8DA', // Lighter border
        justifyContent: 'center',
        paddingHorizontal: 1,
        overflow: 'visible', // Allow highlights to show maybe? Actually hidden is safer for fill.
        zIndex: 1,
        ...SHADOWS.sm,
    },
    barBackground: {
        width: '100%',
        height: '100%',
        borderRadius: 6,
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: '#1A2F33',
    },
    barFill: {
        height: '100%',
        backgroundColor: '#FFD700', // Golden fill
        borderRadius: 6,
    },
    barHighlight: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '40%',
        backgroundColor: 'rgba(255,255,255,0.2)',
    },
    barBubble: {
        position: 'absolute',
        top: 2,
        backgroundColor: 'rgba(255,255,255,0.15)',
        borderRadius: 10,
    }
});

export default XPProgressBar;
