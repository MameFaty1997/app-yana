import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    TouchableOpacity,
    TextInput,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
    Dimensions,
} from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from '../theme';
import Bayo, { BayoEmotion } from './ui/Bayo';
import { chatWithDictionary } from '../services/geminiService';
import Markdown from 'react-native-markdown-display';

import { TranslationKey } from '../translations';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bayo';
    emotion?: BayoEmotion;
}

interface BayoGuideChatbotProps {
    isVisible: boolean;
    onClose: () => void;
    targetLanguage: string;
    interfaceLanguage: string;
    t: (key: TranslationKey) => string;
}

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const BayoGuideChatbot: React.FC<BayoGuideChatbotProps> = ({
    isVisible,
    onClose,
    targetLanguage,
    interfaceLanguage,
    t,
}) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [suggestions, setSuggestions] = useState<string[]>([]);

    useEffect(() => {
        setSuggestions([
            `Comment dit-on "Merci" en ${targetLanguage} ?`,
            `Raconte-moi une anecdote sur la culture sénégalaise.`,
            `Comment puis-je gagner plus de Cauris ?`,
            `Qui est Soundiata Keïta ?`
        ]);
    }, [targetLanguage]);

    const scrollViewRef = useRef<ScrollView>(null);

    // Load initial greeting when chatbot becomes visible or target language changes
    useEffect(() => {
        if (isVisible && messages.length === 0) {
            setMessages([
                {
                    id: '1',
                    text: t('dict_greeting').replace('{{lang}}', targetLanguage),
                    sender: 'bayo',
                    emotion: 'greeting',
                },
            ]);
        }
    }, [isVisible, targetLanguage, t]);

    useEffect(() => {
        if (scrollViewRef.current) {
            setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100);
        }
    }, [messages]);

    const handleSend = async (text: string) => {
        if (!text.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            text,
            sender: 'user',
        };

        setMessages(prev => [...prev, userMsg]);
        setInputText('');
        setIsLoading(true);

        try {
            const response = await chatWithDictionary(text, targetLanguage, interfaceLanguage);

            const bayoMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: response.response,
                sender: 'bayo',
                emotion: response.emotion,
            };

            setMessages(prev => [...prev, bayoMsg]);
            if (response.suggestions) {
                setSuggestions(response.suggestions);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal
            visible={isVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                        style={styles.keyboardView}
                    >
                        <View style={styles.header}>
                            <View style={styles.headerTitleRow}>
                                <Bayo size="sm" emotion={messages[messages.length - 1]?.emotion || 'happy'} />
                                <View style={styles.headerTextContainer}>
                                    <Text style={styles.headerTitle}>Bayo Guide 🌟</Text>
                                    <Text style={styles.headerSubtitle}>Ton assistant omniscient</Text>
                                </View>
                            </View>
                            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                                <Text style={styles.closeIcon}>✕</Text>
                            </TouchableOpacity>
                        </View>

                        <ScrollView
                            ref={scrollViewRef}
                            style={styles.chatContainer}
                            contentContainerStyle={styles.chatContent}
                            showsVerticalScrollIndicator={false}
                        >
                            {messages.map(msg => (
                                <View
                                    key={msg.id}
                                    style={[
                                        styles.messageWrapper,
                                        msg.sender === 'user' ? styles.userMessageWrapper : styles.bayoMessageWrapper
                                    ]}
                                >
                                    {msg.sender === 'bayo' && (
                                        <View style={styles.bayoAvatarSmall}>
                                            <Text style={{ fontSize: 16 }}>🦫</Text>
                                        </View>
                                    )}
                                    <View
                                        style={[
                                            styles.messageBubble,
                                            msg.sender === 'user' ? styles.userBubble : styles.bayoBubble
                                        ]}
                                    >
                                        {msg.sender === 'user' ? (
                                            <Text style={[styles.messageText, styles.userText]}>
                                                {msg.text}
                                            </Text>
                                        ) : (
                                            <Markdown style={markdownStyles}>
                                                {msg.text}
                                            </Markdown>
                                        )}
                                    </View>
                                </View>
                            ))}
                            {isLoading && (
                                <View style={styles.loadingWrapper}>
                                    <ActivityIndicator color={COLORS.primary} />
                                    <Text style={styles.loadingText}>{t('bayo_thinking')}</Text>
                                </View>
                            )}
                        </ScrollView>

                        <View style={styles.footer}>
                            {suggestions.length > 0 && !isLoading && (
                                <ScrollView
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    style={styles.suggestionsScroll}
                                    contentContainerStyle={styles.suggestionsContent}
                                >
                                    {suggestions.map((suggestion, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            style={styles.suggestionPill}
                                            onPress={() => handleSend(suggestion)}
                                        >
                                            <Text style={styles.suggestionText}>{suggestion}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            )}

                            <View style={styles.inputRow}>
                                <TextInput
                                    style={styles.input}
                                    placeholder={t('ask_question')}
                                    placeholderTextColor={COLORS.text.tertiary}
                                    value={inputText}
                                    onChangeText={setInputText}
                                    onSubmitEditing={() => handleSend(inputText)}
                                />
                                <TouchableOpacity
                                    style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
                                    onPress={() => handleSend(inputText)}
                                    disabled={!inputText.trim() || isLoading}
                                >
                                    <Text style={styles.sendIcon}>➔</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'flex-end',
    },
    modalContainer: {
        flex: 0.9,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        overflow: 'hidden',
        ...SHADOWS.xl,
    },
    keyboardView: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    headerTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    headerTextContainer: {
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: '900',
        color: COLORS.secondary,
        letterSpacing: 1,
    },
    headerSubtitle: {
        fontSize: 12,
        color: COLORS.text.tertiary,
        fontWeight: '600',
    },
    closeButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeIcon: {
        fontSize: 18,
        color: COLORS.secondary,
        fontWeight: 'bold',
    },
    chatContainer: {
        flex: 1,
        backgroundColor: '#FDF7F0',
    },
    chatContent: {
        padding: 20,
        paddingBottom: 40,
    },
    messageWrapper: {
        flexDirection: 'row',
        marginBottom: 20,
        maxWidth: '85%',
    },
    userMessageWrapper: {
        alignSelf: 'flex-end',
        flexDirection: 'row-reverse',
    },
    bayoMessageWrapper: {
        alignSelf: 'flex-start',
    },
    bayoAvatarSmall: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
        ...SHADOWS.sm,
    },
    messageBubble: {
        padding: 15,
        borderRadius: 20,
        flexShrink: 1,
        ...SHADOWS.sm,
    },
    userBubble: {
        backgroundColor: COLORS.primary,
        borderTopRightRadius: 4,
    },
    bayoBubble: {
        backgroundColor: COLORS.white,
        borderTopLeftRadius: 4,
    },
    messageText: {
        fontSize: 15,
        lineHeight: 22,
        fontWeight: '600',
    },
    userText: {
        color: COLORS.white,
    },
    bayoText: {
        color: COLORS.secondary,
    },
    loadingWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        padding: 10,
    },
    loadingText: {
        fontSize: 14,
        color: COLORS.text.tertiary,
        fontStyle: 'italic',
    },
    footer: {
        backgroundColor: COLORS.white,
        padding: 15,
        paddingBottom: Platform.OS === 'ios' ? 40 : 20,
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
    },
    suggestionsScroll: {
        marginBottom: 15,
    },
    suggestionsContent: {
        gap: 10,
        paddingRight: 20,
    },
    suggestionPill: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#FDF7F0',
        borderWidth: 1,
        borderColor: '#FDE0C3',
    },
    suggestionText: {
        fontSize: 13,
        fontWeight: '700',
        color: COLORS.primary,
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    input: {
        flex: 1,
        height: 50,
        backgroundColor: '#F5F5F5',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.secondary,
    },
    sendButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        ...SHADOWS.md,
    },
    sendButtonDisabled: {
        backgroundColor: COLORS.gray[300],
    },
    sendIcon: {
        color: COLORS.white,
        fontSize: 20,
        fontWeight: 'bold',
    },
});

const markdownStyles = StyleSheet.create({
    body: {
        fontSize: 15,
        lineHeight: 22,
        fontWeight: '600',
        color: COLORS.secondary,
    },
    strong: {
        fontWeight: 'bold',
        color: COLORS.primaryDark,
    },
    em: {
        fontStyle: 'italic',
    },
    paragraph: {
        marginTop: 0,
        marginBottom: 8,
    },
    bullet_list: {
        marginVertical: 4,
    },
    listItem: {
        marginBottom: 4,
    }
});

export default BayoGuideChatbot;
