import React from 'react';
import {
    View,
    StyleSheet,
    ViewStyle,
    TouchableOpacity,
    TouchableOpacityProps,
} from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '../../theme';

export type CardVariant = 'elevated' | 'outlined' | 'filled';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

interface CardProps extends TouchableOpacityProps {
    children: React.ReactNode;
    variant?: CardVariant;
    padding?: CardPadding;
    onPress?: () => void;
    style?: ViewStyle | ViewStyle[];
}

const Card: React.FC<CardProps> = ({
    children,
    variant = 'elevated',
    padding = 'md',
    onPress,
    style,
    ...props
}) => {
    const cardStyles = [
        styles.base,
        styles[variant],
        styles[`padding_${padding}`],
        ...(Array.isArray(style) ? style : style ? [style] : []),
    ];

    if (onPress) {
        return (
            <TouchableOpacity
                style={cardStyles}
                onPress={onPress}
                activeOpacity={0.9}
                {...props}
            >
                {children}
            </TouchableOpacity>
        );
    }

    return <View style={cardStyles}>{children}</View>;
};

const styles = StyleSheet.create({
    base: {
        borderRadius: BORDER_RADIUS.lg,
        backgroundColor: COLORS.white,
    },

    // Variants
    elevated: {
        ...SHADOWS.md,
        borderWidth: 0,
    },
    outlined: {
        borderWidth: 1,
        borderColor: COLORS.border.light,
        shadowOpacity: 0,
        elevation: 0,
    },
    filled: {
        backgroundColor: COLORS.secondary,
        borderWidth: 0,
        shadowOpacity: 0,
        elevation: 0,
    },

    // Padding
    padding_none: {
        padding: 0,
    },
    padding_sm: {
        padding: SPACING.sm,
    },
    padding_md: {
        padding: SPACING.md,
    },
    padding_lg: {
        padding: SPACING.lg,
    },
});

export default Card;
