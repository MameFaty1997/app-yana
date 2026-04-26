import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../../theme';

export type ProgressBarVariant = 'linear' | 'circular';

interface ProgressBarProps {
    progress: number; // 0-100
    variant?: ProgressBarVariant;
    showLabel?: boolean;
    height?: number;
    color?: string;
    backgroundColor?: string;
    style?: ViewStyle;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
    progress,
    variant = 'linear',
    showLabel = false,
    height = 8,
    color = COLORS.primary,
    backgroundColor = COLORS.gray[200],
    style,
}) => {
    const clampedProgress = Math.min(Math.max(progress, 0), 100);

    if (variant === 'circular') {
        // Pour l'instant, retournons un placeholder
        // On peut implémenter un vrai cercle avec react-native-svg plus tard
        return (
            <View style={[styles.circularContainer, style]}>
                <Text style={styles.circularText}>{Math.round(clampedProgress)}%</Text>
            </View>
        );
    }

    return (
        <View style={[styles.container, style]}>
            <View style={[styles.track, { height, backgroundColor }]}>
                <View
                    style={[
                        styles.fill,
                        {
                            width: `${clampedProgress}%`,
                            backgroundColor: color,
                        },
                    ]}
                >
                    {/* Glossy overlay effect like in screenshots */}
                    <View style={styles.glossyOverlay} />
                </View>
            </View>
            {showLabel && (
                <Text style={styles.label}>{Math.round(clampedProgress)}%</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },

    track: {
        width: '100%',
        borderRadius: BORDER_RADIUS.full,
        overflow: 'hidden',
    },

    fill: {
        height: '100%',
        borderRadius: BORDER_RADIUS.full,
        overflow: 'hidden',
    },
    glossyOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '40%',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: BORDER_RADIUS.full,
    },

    label: {
        ...TYPOGRAPHY.caption,
        color: COLORS.text.secondary,
        marginTop: SPACING.xs,
        textAlign: 'right',
    },

    circularContainer: {
        width: 60,
        height: 60,
        borderRadius: BORDER_RADIUS.full,
        backgroundColor: COLORS.gray[200],
        alignItems: 'center',
        justifyContent: 'center',
    },

    circularText: {
        ...TYPOGRAPHY.subtitle2,
        color: COLORS.text.primary,
    },
});

export default ProgressBar;
