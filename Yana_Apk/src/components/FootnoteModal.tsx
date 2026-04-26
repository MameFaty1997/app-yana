import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { theme } from '../tokens/theme';
import { Footnote } from '../data/stories';
import { BtnPrimary } from './TerangaComponents';

interface FootnoteModalProps {
    isVisible: boolean;
    footnote: Footnote | null;
    onClose: () => void;
}

export const FootnoteModal = ({ isVisible, footnote, onClose }: FootnoteModalProps) => {
    if (!footnote) return null;

    return (
        <Modal
            visible={isVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.backdrop}>
                <TouchableOpacity style={styles.dismissArea} onPress={onClose} />
                <View style={styles.modalContent}>
                    <View style={styles.indicator} />

                    <View style={styles.header}>
                        <Text style={styles.number}>{footnote.id}</Text>
                        <Text style={styles.term}>{footnote.term}</Text>
                    </View>

                    <View style={styles.separator} />

                    <ScrollView style={styles.scrollArea}>
                        <Text style={styles.explanation}>{footnote.explanation}</Text>
                    </ScrollView>

                    <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
                        <Text style={styles.closeBtnText}>J'ai compris</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export const FootnoteChip = ({ id, onPress }: { id: number, onPress: () => void }) => (
    <TouchableOpacity style={styles.chip} onPress={onPress}>
        <Text style={styles.chipText}>{id}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'flex-end',
    },
    dismissArea: {
        flex: 1,
    },
    modalContent: {
        backgroundColor: theme.colors.surface,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        padding: 24,
        paddingTop: 12,
        borderTopWidth: 2,
        borderTopColor: theme.colors.gold,
        maxHeight: '50%',
    },
    indicator: {
        width: 40,
        height: 4,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 2,
        alignSelf: 'center',
        marginBottom: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    number: {
        color: theme.colors.gold,
        fontFamily: theme.fonts.display,
        fontSize: 24,
        marginRight: 10,
    },
    term: {
        color: theme.colors.gold,
        fontFamily: theme.fonts.display,
        fontSize: 20,
        flex: 1,
    },
    separator: {
        height: 1,
        backgroundColor: 'rgba(244, 160, 38, 0.3)',
        marginBottom: 20,
    },
    scrollArea: {
        marginBottom: 20,
    },
    explanation: {
        color: theme.colors.cream,
        fontFamily: theme.fonts.body,
        fontSize: 16,
        lineHeight: 24,
    },
    closeBtn: {
        backgroundColor: theme.colors.gold,
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: 'center',
    },
    closeBtnText: {
        color: theme.colors.bg,
        fontFamily: theme.fonts.body,
        fontWeight: 'bold',
        fontSize: 16,
    },
    chip: {
        width: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: 'rgba(244, 160, 38, 0.2)',
        borderWidth: 1,
        borderColor: theme.colors.gold,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 2,
        transform: [{ translateY: -4 }],
    },
    chipText: {
        color: theme.colors.gold,
        fontSize: 10,
        fontWeight: 'bold',
    }
});
