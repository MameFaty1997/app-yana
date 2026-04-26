import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { theme } from '../tokens/theme';

interface LetterSlotProps {
    letter: string;
    isRevealed: boolean;
    isGameOver: boolean;
}

export const LetterSlot = ({ letter, isRevealed, isGameOver }: LetterSlotProps) => {
    const scaleValue = useRef(new Animated.Value(0)).current;

    // Animate when revealed
    useEffect(() => {
        if (isRevealed) {
            Animated.spring(scaleValue, {
                toValue: 1,
                friction: 4,
                tension: 40,
                useNativeDriver: true
            }).start();
        }
    }, [isRevealed]);

    // If game over and not revealed by player, show it as missed (red)
    const isMissed = isGameOver && !isRevealed;

    return (
        <View style={[
            styles.slotContainer,
            isRevealed && styles.slotRevealed,
            isMissed && styles.slotMissed
        ]}>
            {(isRevealed || isMissed) && (
                <Animated.Text style={[
                    styles.letterText,
                    isMissed && styles.textMissed,
                    { transform: [{ scale: isMissed ? 1 : scaleValue }] }
                ]}>
                    {letter}
                </Animated.Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    slotContainer: {
        width: 36,
        height: 42,
        backgroundColor: theme.colors.surface2,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: 'rgba(244, 160, 38, 0.2)', // faint gold
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 4,
        marginVertical: 6,
    },
    slotRevealed: {
        backgroundColor: 'rgba(244, 160, 38, 0.12)', // gold/12
        borderColor: theme.colors.gold,
    },
    slotMissed: {
        backgroundColor: 'rgba(239, 68, 68, 0.15)', // red/15
        borderColor: theme.colors.red,
    },
    letterText: {
        fontFamily: theme.fonts.display, // Cinzel Decorative or fallback
        fontSize: 22,
        color: theme.colors.cream,
        fontWeight: 'bold',
        marginTop: 4, // adjustment for decorative font baseline
    },
    textMissed: {
        color: theme.colors.red,
    }
});
