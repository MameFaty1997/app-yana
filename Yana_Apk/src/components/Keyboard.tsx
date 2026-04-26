import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { theme } from '../tokens/theme';

const { width } = Dimensions.get('window');
const CONTAINER_PADDING = 20;
const MAX_KEYS_PER_ROW = 10;
const KEY_MARGIN = 2; // Reduced margin slightly to give more room for the key itself on small screens
const AVAILABLE_WIDTH = width - CONTAINER_PADDING;
const KEY_WIDTH = Math.floor((AVAILABLE_WIDTH / MAX_KEYS_PER_ROW) - (KEY_MARGIN * 2));
const FINAL_KEY_WIDTH = Math.min(34, KEY_WIDTH); // Perfectly scales down

interface KeyboardProps {
    guessedLetters: Set<string>;
    wordLetters: Set<string>;
    onKeyPress: (letter: string) => void;
    disabled?: boolean;
}

const ROWS = [
    ['A', 'Z', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['Q', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M'],
    ['W', 'X', 'C', 'V', 'B', 'N']
];

export const Keyboard = ({ guessedLetters, wordLetters, onKeyPress, disabled = false }: KeyboardProps) => {

    const renderKey = (letter: string) => {
        const isGuessed = guessedLetters.has(letter);
        const isCorrect = isGuessed && wordLetters.has(letter);
        const isWrong = isGuessed && !wordLetters.has(letter);

        const isDisabled = disabled || isGuessed;

        return (
            <TouchableOpacity
                key={letter}
                style={[
                    styles.key,
                    isCorrect && styles.keyCorrect,
                    isWrong && styles.keyWrong,
                    isDisabled && !isCorrect && !isWrong && styles.keyDisabled
                ]}
                onPress={() => onKeyPress(letter)}
                disabled={isDisabled}
                activeOpacity={0.7}
            >
                <Text style={[
                    styles.keyText,
                    isCorrect && styles.keyTextCorrect,
                    isWrong && styles.keyTextWrong
                ]}>
                    {letter}
                </Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.keyboardContainer}>
            {ROWS.map((row, rowIndex) => (
                <View key={rowIndex} style={styles.row}>
                    {row.map(renderKey)}
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    keyboardContainer: {
        paddingHorizontal: 10,
        paddingBottom: 20,
        width: '100%',
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 8,
    },
    key: {
        width: FINAL_KEY_WIDTH,
        height: 38,
        backgroundColor: theme.colors.surface2,
        borderRadius: 7,
        borderWidth: 1,
        borderColor: 'rgba(244, 160, 38, 0.2)', // gold/20
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: KEY_MARGIN,
        ...theme.shadow.orange,
        shadowOpacity: 0.1,
    },
    keyCorrect: {
        backgroundColor: theme.colors.green,
        borderColor: theme.colors.green,
    },
    keyWrong: {
        backgroundColor: 'rgba(239, 68, 68, 0.2)', // red/20
        borderColor: theme.colors.red,
    },
    keyDisabled: {
        opacity: 0.25,
    },
    keyText: {
        fontFamily: theme.fonts.body,
        fontSize: FINAL_KEY_WIDTH < 28 ? 14 : 18,
        color: theme.colors.cream,
        fontWeight: 'bold',
    },
    keyTextCorrect: {
        color: theme.colors.bg, // dark background for contrast
    },
    keyTextWrong: {
        color: theme.colors.red,
    }
});
