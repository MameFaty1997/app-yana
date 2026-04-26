import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { theme } from '../tokens/theme';

interface KidModeToggleProps {
    isKidMode: boolean;
    onToggle: (value: boolean) => void;
}

export const KidModeToggle = ({ isKidMode, onToggle }: KidModeToggleProps) => {
    const [animation] = useState(new Animated.Value(isKidMode ? 1 : 0));

    const handleToggle = () => {
        const newValue = !isKidMode;
        Animated.spring(animation, {
            toValue: newValue ? 1 : 0,
            useNativeDriver: false,
        }).start();
        onToggle(newValue);
    };

    const translateX = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [2, 28],
    });

    const backgroundColor = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [theme.colors.surface, theme.colors.goldLight],
    });

    return (
        <TouchableOpacity activeOpacity={0.8} onPress={handleToggle} style={styles.container}>
            <Text style={styles.label}>{isKidMode ? '☀️ Enfant' : '📖 Normal'}</Text>
            <Animated.View style={[styles.track, { backgroundColor }]}>
                <Animated.View style={[styles.thumb, { transform: [{ translateX }] }]} />
            </Animated.View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.05)',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(244, 160, 38, 0.3)',
    },
    label: {
        color: theme.colors.cream,
        fontSize: 12,
        fontFamily: theme.fonts.body,
        marginRight: 8,
        fontWeight: 'bold',
    },
    track: {
        width: 50,
        height: 24,
        borderRadius: 12,
        justifyContent: 'center',
        paddingHorizontal: 2,
    },
    thumb: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: theme.colors.cream,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.5,
    },
});
