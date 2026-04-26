import React from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet,
    ViewStyle,
    ImageSourcePropType,
} from 'react-native';
import { COLORS, TYPOGRAPHY, BORDER_RADIUS, SIZES, SHADOWS } from '../../theme';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

interface AvatarProps {
    source?: ImageSourcePropType | string;
    name?: string;
    size?: AvatarSize;
    badge?: React.ReactNode;
    badgePosition?: 'top-right' | 'bottom-right';
    style?: ViewStyle;
}

const Avatar: React.FC<AvatarProps> = ({
    source,
    name,
    size = 'md',
    badge,
    badgePosition = 'bottom-right',
    style,
}) => {
    const avatarSize = SIZES.avatar[size];
    const initials = name
        ? name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2)
        : '?';

    const fontSize = {
        sm: 12,
        md: 16,
        lg: 20,
        xl: 28,
        xxl: 36,
    }[size];

    return (
        <View style={[styles.container, { width: avatarSize, height: avatarSize }, style]}>
            {source ? (
                <Image
                    source={typeof source === 'string' ? { uri: source } : source}
                    style={[styles.image, { width: avatarSize, height: avatarSize }]}
                />
            ) : (
                <View
                    style={[
                        styles.placeholder,
                        { width: avatarSize, height: avatarSize },
                    ]}
                >
                    <Text style={[styles.initials, { fontSize }]}>{initials}</Text>
                </View>
            )}

            {badge && (
                <View
                    style={[
                        styles.badge,
                        badgePosition === 'top-right' ? styles.badgeTopRight : styles.badgeBottomRight,
                    ]}
                >
                    {badge}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },

    image: {
        borderRadius: BORDER_RADIUS.full,
        backgroundColor: COLORS.gray[200],
    },

    placeholder: {
        borderRadius: BORDER_RADIUS.full,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },

    initials: {
        ...TYPOGRAPHY.button,
        color: COLORS.white,
    },

    badge: {
        position: 'absolute',
        backgroundColor: COLORS.white,
        borderRadius: BORDER_RADIUS.full,
        ...SHADOWS.sm,
    },

    badgeTopRight: {
        top: 0,
        right: 0,
    },

    badgeBottomRight: {
        bottom: 0,
        right: 0,
    },
});

export default Avatar;
