import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { theme } from '../tokens/theme';
import { StoryScene as StorySceneType, Footnote, VocabWord } from '../data/stories';
import { FootnoteChip } from './FootnoteModal';
import { VocabChip } from './VocabTooltip';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import * as Speech from 'expo-speech';

const { width } = Dimensions.get('window');

interface StorySceneProps {
    scene: StorySceneType;
    kidMode: boolean;
    onPressFootnote: (footnote: Footnote) => void;
    onPressVocab: (word: VocabWord) => void;
}

export const StoryScene = ({ scene, kidMode, onPressFootnote, onPressVocab }: StorySceneProps) => {
    const [isPlaying, setIsPlaying] = useState(false);

    // Stop speech when component unmounts or scene changes
    useEffect(() => {
        Speech.stop();
        setIsPlaying(false);
        return () => {
            Speech.stop();
        };
    }, [scene]);

    const playSound = async () => {
        if (isPlaying) {
            Speech.stop();
            setIsPlaying(false);
            return;
        }

        // Clean text from glossary [[ ]] and footnote {{id}} annotations
        const cleanText = scene.paragraph
            .replace(/\[\[/g, '')
            .replace(/\]\]/g, '')
            .replace(/\{\{\d+\}\}/g, '');

        setIsPlaying(true);
        Speech.speak(cleanText, {
            language: 'fr-FR',
            rate: 0.9,
            pitch: 1.0,
            onDone: () => setIsPlaying(false),
            onStopped: () => setIsPlaying(false),
            onError: () => setIsPlaying(false),
        });
    };

    const renderContent = () => {
        let text = scene.paragraph;
        const parts: (string | React.ReactNode)[] = [];

        const highlightRegex = /\[\[(.*?)\]\]/g;
        let lastEnd = 0;
        let match;

        while ((match = highlightRegex.exec(text)) !== null) {
            const before = text.substring(lastEnd, match.index);
            parts.push(...parseFootnotes(before));

            const wordText = match[1];
            const vocab = scene.vocabWords.find(v => v.word.toLowerCase() === wordText.toLowerCase());

            if (vocab) {
                parts.push(
                    <VocabChip
                        key={`vocab-${match.index}`}
                        word={wordText}
                        onPress={() => onPressVocab(vocab)}
                    />
                );
            } else {
                parts.push(wordText);
            }
            lastEnd = highlightRegex.lastIndex;
        }

        parts.push(...parseFootnotes(text.substring(lastEnd)));
        return parts;
    };

    const parseFootnotes = (text: string) => {
        const parts: (string | React.ReactNode)[] = [];
        const fnRegex = /\{\{(\d+)\}\}/g;
        let lastEnd = 0;
        let match;

        while ((match = fnRegex.exec(text)) !== null) {
            parts.push(text.substring(lastEnd, match.index));
            const fnId = parseInt(match[1]);
            parts.push(
                <FootnoteChip
                    key={`fn-${fnId}-${match.index}`}
                    id={fnId}
                    onPress={() => {
                        const note = scene.footnotes.find(f => f.id === fnId);
                        if (note) onPressFootnote(note);
                    }}
                />
            );
            lastEnd = fnRegex.lastIndex;
        }
        parts.push(text.substring(lastEnd));
        return parts;
    };

    const renderAudioButton = () => {
        return (
            <TouchableOpacity style={styles.audioButton} onPress={playSound}>
                <Ionicons
                    name={isPlaying ? "pause-circle" : "volume-high"}
                    size={32}
                    color={theme.colors.gold}
                />
                <Text style={styles.audioText}>Écouter l'histoire</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <View style={[styles.textBlock, kidMode && styles.textBlockKid]}>
                <Text style={[styles.paragraph, kidMode && styles.paragraphKid]}>
                    {renderContent()}
                </Text>
                {renderAudioButton()}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: width,
        padding: 20,
    },
    textBlock: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        padding: 20,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(244, 160, 38, 0.2)',
    },
    textBlockKid: {
        padding: 25,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    paragraph: {
        fontSize: 18,
        lineHeight: 28,
        color: theme.colors.cream,
        fontFamily: theme.fonts.body,
    },
    paragraphKid: {
        fontSize: 22,
        lineHeight: 34,
        fontWeight: '500',
    },
    audioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
        alignSelf: 'flex-start',
        padding: 8,
        borderRadius: 12,
        backgroundColor: 'rgba(244, 160, 38, 0.1)',
        borderWidth: 1,
        borderColor: 'rgba(244, 160, 38, 0.3)',
    },
    audioText: {
        marginLeft: 10,
        color: theme.colors.gold,
        fontFamily: theme.fonts.body,
        fontWeight: 'bold',
        fontSize: 16,
    }
});
