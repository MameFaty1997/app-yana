import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { theme } from '../tokens/theme';

interface ReadingProgressProps {
    progress: Animated.Value;
}

export const ReadingProgress = ({ progress }: ReadingProgressProps) => {
    const scaleX = progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolate: 'clamp',
    });

    return (
        <View style={styles.container}>
            <Animated.View
                style={[
                    styles.bar,
                    { transform: [{ scaleX }, { translateX: -0.5 }] }
                ]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 3,
        backgroundColor: 'rgba(255,255,255,0.1)',
        width: '100%',
        overflow: 'hidden',
    },
    bar: {
        height: '100%',
        backgroundColor: theme.colors.gold,
        width: '100%',
    }
});
