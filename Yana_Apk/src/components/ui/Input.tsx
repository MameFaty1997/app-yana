import React, { useState } from 'react';
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    TextInputProps,
    ViewStyle,
} from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SIZES } from '../../theme';

export type InputSize = 'sm' | 'md' | 'lg';

interface InputProps extends TextInputProps {
    label?: string;
    error?: string;
    helperText?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    size?: InputSize;
    containerStyle?: ViewStyle;
}

const Input: React.FC<InputProps> = ({
    label,
    error,
    helperText,
    leftIcon,
    rightIcon,
    size = 'md',
    containerStyle,
    style,
    ...props
}) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View style={[styles.container, containerStyle]}>
            {label && <Text style={styles.label}>{label}</Text>}

            <View
                style={[
                    styles.inputContainer,
                    styles[`size_${size}`],
                    isFocused && styles.focused,
                    error && styles.error,
                ]}
            >
                {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}

                <TextInput
                    style={[styles.input, style]}
                    placeholderTextColor={COLORS.gray[400]}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    {...props}
                />

                {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
            </View>

            {error && <Text style={styles.errorText}>{error}</Text>}
            {helperText && !error && <Text style={styles.helperText}>{helperText}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: SPACING.md,
    },

    label: {
        ...TYPOGRAPHY.caption,
        color: COLORS.text.primary,
        marginBottom: SPACING.xs,
        textTransform: 'uppercase',
    },

    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.border.light,
        borderRadius: BORDER_RADIUS.md,
        paddingHorizontal: SPACING.md,
    },

    focused: {
        borderColor: COLORS.primary,
        borderWidth: 2,
    },

    error: {
        borderColor: COLORS.error,
        borderWidth: 2,
    },

    input: {
        flex: 1,
        ...TYPOGRAPHY.body1,
        color: COLORS.text.primary,
    },

    leftIcon: {
        marginRight: SPACING.sm,
    },

    rightIcon: {
        marginLeft: SPACING.sm,
    },

    errorText: {
        ...TYPOGRAPHY.caption,
        color: COLORS.error,
        marginTop: SPACING.xs,
    },

    helperText: {
        ...TYPOGRAPHY.caption,
        color: COLORS.text.tertiary,
        marginTop: SPACING.xs,
    },

    // Sizes
    size_sm: {
        height: SIZES.input.sm,
    },
    size_md: {
        height: SIZES.input.md,
    },
    size_lg: {
        height: SIZES.input.lg,
    },
});

export default Input;
