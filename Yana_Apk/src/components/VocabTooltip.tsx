import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../tokens/theme';
import { VocabWord } from '../data/stories';

interface VocabTooltipProps {
    isVisible: boolean;
    word: VocabWord | null;
    onClose: () => void;
}

export const VocabTooltip = ({ isVisible, word, onClose }: VocabTooltipProps) => {
    if (!word) return null;

    return (
        <Modal
            visible={isVisible}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
        >
            <TouchableOpacity
                activeOpacity={1}
                style={styles.backdrop}
                onPress={onClose}
            >
                <View style={styles.tooltipContainer}>
                    <Text style={styles.title}>{word.word}</Text>
                    <Text style={styles.definition}>{word.definition}</Text>
                    {word.etymology && (
                        <Text style={styles.etymology}>💡 {word.etymology}</Text>
                    )}
                    <View style={styles.arrow} />
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

export const VocabChip = ({ word, onPress }: { word: string, onPress: () => void }) => (
    <TouchableOpacity style={styles.chip} onPress={onPress}>
        <Text style={styles.chipText}>{word}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    tooltipContainer: {
        backgroundColor: '#1a120b', // Darker for more contrast
        borderRadius: 20,
        padding: 24,
        width: '90%',
        borderWidth: 1.5,
        borderColor: theme.colors.gold,
        ...theme.shadow.gold,
    },
    title: {
        color: theme.colors.orange,
        fontFamily: theme.fonts.display,
        fontSize: 18,
        marginBottom: 8,
    },
    definition: {
        color: theme.colors.cream,
        fontFamily: theme.fonts.body,
        fontSize: 15,
        lineHeight: 22,
    },
    etymology: {
        color: theme.colors.muted,
        fontFamily: theme.fonts.body,
        fontSize: 13,
        fontStyle: 'italic',
        marginTop: 10,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.1)',
        paddingTop: 8,
    },
    arrow: {
        // Simplified tooltip design, centered modal for now is more robust than absolute positioning over words in scrollview
    },
    chip: {
        backgroundColor: 'rgba(244, 160, 38, 0.25)', // More visible highlight
        paddingHorizontal: 6,
        paddingVertical: 1,
        borderRadius: 2,
        marginHorizontal: 2,
        borderBottomWidth: 3,
        borderBottomColor: 'rgba(244, 160, 38, 0.6)',
        // Slight rotation for a more "hand-drawn highlight" feel
        transform: [{ rotate: '-1deg' }],
    },
    chipText: {
        color: theme.colors.goldLight,
        fontFamily: theme.fonts.body,
        fontWeight: 'bold',
        fontSize: 18,
    }
});
