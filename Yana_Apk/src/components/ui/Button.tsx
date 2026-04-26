import React from 'react';
import {
    Pressable,
    Text,
    StyleSheet,
    ActivityIndicator,
    ViewStyle,
    TextStyle,
    PressableProps,
} from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS, SIZES } from '../../theme';

export type ButtonVariant = 'primary' | 'secondary' | 'outlined' | 'text' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends PressableProps {
    title: string;
    variant?: ButtonVariant;
    size?: ButtonSize;
    loading?: boolean;
    disabled?: boolean;
    fullWidth?: boolean;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
    style?: ViewStyle | ViewStyle[];
}

const Button: React.FC<ButtonProps> = ({
    title,
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled = false,
    fullWidth = false,
    icon,
    iconPosition = 'left',
    style,
    ...props
}) => {
    const getVariantStyle = (pressed: boolean): ViewStyle => {
        if (pressed) {
            switch (variant) {
                case 'primary': return { backgroundColor: COLORS.pressed.primary };
                case 'secondary': return { backgroundColor: COLORS.pressed.secondary };
                case 'danger': return { backgroundColor: COLORS.pressed.danger };
                case 'outlined': return { backgroundColor: COLORS.pressed.outlined };
                case 'text': return { backgroundColor: 'rgba(255, 150, 51, 0.1)' };
                default: return {};
            }
        }
        return styles[variant];
    };

    const textStyles: TextStyle[] = [
        styles.text,
        styles[`text_${variant}`],
        styles[`text_${size}`],
    ];

    return (
        <Pressable
            disabled={disabled || loading}
            style={({ pressed }) => [
                styles.base,
                getVariantStyle(pressed),
                styles[`size_${size}`],
                fullWidth && styles.fullWidth,
                (disabled || loading) && styles.disabled,
                ...(Array.isArray(style) ? style : [style]),
            ]}
            {...props}
        >
            {loading ? (
                <ActivityIndicator
                    color={variant === 'primary' ? COLORS.white : COLORS.primary}
                    size="small"
                />
            ) : (
                <>
                    {icon && iconPosition === 'left' && icon}
                    <Text style={textStyles}>{title}</Text>
                    {icon && iconPosition === 'right' && icon}
                </>
            )}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    // Base
    base: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: BORDER_RADIUS.lg,
        gap: SPACING.sm,
        ...SHADOWS.sm,
    },

    // Variants
    primary: {
        backgroundColor: COLORS.primary,
        borderWidth: 0,
    },
    secondary: {
        backgroundColor: COLORS.secondary,
        borderWidth: 1,
        borderColor: COLORS.border.light,
    },
    outlined: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: COLORS.primary,
    },
    text: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        shadowOpacity: 0,
        elevation: 0,
    },
    danger: {
        backgroundColor: COLORS.error,
        borderWidth: 0,
    },

    // Sizes
    size_sm: {
        height: SIZES.button.sm,
        paddingHorizontal: SPACING.md,
    },
    size_md: {
        height: SIZES.button.md,
        paddingHorizontal: SPACING.lg,
    },
    size_lg: {
        height: SIZES.button.lg,
        paddingHorizontal: SPACING.xl,
    },

    // States
    disabled: {
        opacity: 0.5,
    },
    fullWidth: {
        width: '100%',
    },

    // Text styles
    text_primary: {
        color: COLORS.white,
        ...TYPOGRAPHY.button,
    },
    text_secondary: {
        color: COLORS.text.primary,
        ...TYPOGRAPHY.button,
    },
    text_outlined: {
        color: COLORS.primary,
        ...TYPOGRAPHY.button,
    },
    text_text: {
        color: COLORS.primary,
        ...TYPOGRAPHY.button,
    },
    text_danger: {
        color: COLORS.white,
        ...TYPOGRAPHY.button,
    },

    // Text sizes
    text_sm: {
        fontSize: 14,
    },
    text_md: {
        fontSize: 16,
    },
    text_lg: {
        fontSize: 18,
    },
});

export default Button;
