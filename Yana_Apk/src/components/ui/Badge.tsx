import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../../theme';

export type BadgeVariant = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
export type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps {
    label: string;
    variant?: BadgeVariant;
    size?: BadgeSize;
    icon?: React.ReactNode;
    style?: ViewStyle;
}

const Badge: React.FC<BadgeProps> = ({
    label,
    variant = 'primary',
    size = 'md',
    icon,
    style,
}) => {
    return (
        <View style={[styles.base, styles[variant], styles[`size_${size}`], style]}>
            {icon && <View style={styles.icon}>{icon}</View>}
            <Text style={[styles.text, styles[`text_${variant}`], styles[`text_${size}`]]}>
                {label}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    base: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        borderRadius: BORDER_RADIUS.full,
        gap: SPACING.xs,
    },

    // Variants
    primary: {
        backgroundColor: COLORS.primary,
    },
    secondary: {
        backgroundColor: COLORS.secondary,
        borderWidth: 1,
        borderColor: COLORS.border.light,
    },
    success: {
        backgroundColor: COLORS.success,
    },
    error: {
        backgroundColor: COLORS.error,
    },
    warning: {
        backgroundColor: COLORS.warning,
    },
    info: {
        backgroundColor: COLORS.info,
    },

    // Sizes
    size_sm: {
        paddingHorizontal: SPACING.sm,
        paddingVertical: 2,
    },
    size_md: {
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.xs,
    },
    size_lg: {
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.sm,
    },

    // Text styles
    text: {
        ...TYPOGRAPHY.caption,
    },
    text_primary: {
        color: COLORS.white,
    },
    text_secondary: {
        color: COLORS.text.primary,
    },
    text_success: {
        color: COLORS.white,
    },
    text_error: {
        color: COLORS.white,
    },
    text_warning: {
        color: COLORS.white,
    },
    text_info: {
        color: COLORS.white,
    },

    // Text sizes
    text_sm: {
        fontSize: 10,
    },
    text_md: {
        fontSize: 12,
    },
    text_lg: {
        fontSize: 14,
    },

    icon: {
        marginRight: -SPACING.xs,
    },
});

export default Badge;
