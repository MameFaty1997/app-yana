import * as React from 'react';
import { useState } from 'react';
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
    Alert,
} from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from '../theme';
import { LANGUAGES } from '../constants';
import { TranslationKey } from '../translations';
import { Language } from '../types';

interface AddWordModalProps {
    isVisible: boolean;
    onClose: () => void;
    t: (key: TranslationKey) => string;
}

const AddWordModal: React.FC<AddWordModalProps> = ({ isVisible, onClose, t }) => {
    const [formData, setFormData] = useState({
        language: 'wolof' as Language,
        word: '',
        meaning: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showLanguagePicker, setShowLanguagePicker] = useState(false);

    const handleSubmit = () => {
        if (!formData.word || !formData.meaning) {
            Alert.alert("Champs manquants", "Merci de remplir tous les champs.");
            return;
        }

        setIsSubmitting(true);

        // Simulation de l'envoi
        setTimeout(() => {
            setIsSubmitting(false);
            Alert.alert(
                t('word_added_success' as TranslationKey),
                "",
                [{
                    text: "OK", onPress: () => {
                        setFormData({ language: 'wolof', word: '', meaning: '' });
                        onClose();
                    }
                }]
            );
        }, 1500);
    };

    const selectedLanguageInfo = LANGUAGES.find(l => l.id === formData.language);

    return (
        <Modal
            visible={isVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.keyboardView}
                >
                    <View style={styles.modalContent}>
                        <View style={styles.header}>
                            <Text style={styles.headerTitle}>{t('add_word_title' as TranslationKey)}</Text>
                            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                                <Text style={styles.closeText}>✕</Text>
                            </TouchableOpacity>
                        </View>

                        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.formContent}>

                            {/* Choix de la langue */}
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>{t('label_language' as TranslationKey)}</Text>
                                <TouchableOpacity
                                    style={styles.pickerTrigger}
                                    onPress={() => setShowLanguagePicker(!showLanguagePicker)}
                                >
                                    <View style={styles.pickerContent}>
                                        <Text style={styles.pickerFlag}>{selectedLanguageInfo?.flag}</Text>
                                        <Text style={styles.pickerText}>{selectedLanguageInfo?.name}</Text>
                                    </View>
                                    <Text style={styles.pickerArrow}>▼</Text>
                                </TouchableOpacity>

                                {showLanguagePicker && (
                                    <View style={styles.languageList}>
                                        <ScrollView nestedScrollEnabled={true}>
                                            {LANGUAGES.map((lang) => (
                                                <TouchableOpacity
                                                    key={lang.id}
                                                    style={styles.langItem}
                                                    onPress={() => {
                                                        setFormData(prev => ({ ...prev, language: lang.id as Language }));
                                                        setShowLanguagePicker(false);
                                                    }}
                                                >
                                                    <Text style={styles.langItemFlag}>{lang.flag}</Text>
                                                    <Text style={styles.langItemText}>{lang.name}</Text>
                                                </TouchableOpacity>
                                            ))}
                                        </ScrollView>
                                    </View>
                                )}
                            </View>

                            {/* Mot ou Expression */}
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>{t('label_word' as TranslationKey)}</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder={t('placeholder_word' as TranslationKey)}
                                    value={formData.word}
                                    onChangeText={(text: string) => setFormData(prev => ({ ...prev, word: text }))}
                                />
                            </View>

                            {/* Signification */}
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>{t('label_meaning' as TranslationKey)}</Text>
                                <TextInput
                                    style={[styles.input, styles.textArea]}
                                    placeholder={t('placeholder_meaning' as TranslationKey)}
                                    multiline
                                    numberOfLines={4}
                                    value={formData.meaning}
                                    onChangeText={(text: string) => setFormData(prev => ({ ...prev, meaning: text }))}
                                />
                            </View>

                            <TouchableOpacity
                                style={[styles.submitBtn, isSubmitting && styles.submitBtnDisabled]}
                                onPress={handleSubmit}
                                disabled={isSubmitting}
                            >
                                <Text style={styles.submitBtnText}>
                                    {isSubmitting ? "..." : t('btn_submit_word' as TranslationKey)}
                                </Text>
                            </TouchableOpacity>

                        </ScrollView>
                    </View>
                </KeyboardAvoidingView>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'flex-end',
    },
    keyboardView: {
        width: '100%',
        height: '80%',
    },
    modalContent: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        flex: 1,
        padding: 24,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '900',
        color: COLORS.secondary,
        letterSpacing: 1.5,
    },
    closeBtn: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.secondary,
    },
    formContent: {
        paddingBottom: 40,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 11,
        fontWeight: '900',
        color: COLORS.text.tertiary,
        marginBottom: 8,
        letterSpacing: 1,
    },
    pickerTrigger: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#F8F9FA',
        borderRadius: 15,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: '#EEEEEE',
    },
    pickerContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    pickerFlag: {
        fontSize: 20,
        marginRight: 10,
    },
    pickerText: {
        fontSize: 15,
        fontWeight: '600',
        color: COLORS.secondary,
    },
    pickerArrow: {
        fontSize: 10,
        color: COLORS.text.tertiary,
    },
    languageList: {
        marginTop: 5,
        backgroundColor: '#F8F9FA',
        borderRadius: 15,
        height: 200,
        borderWidth: 1,
        borderColor: '#EEEEEE',
        overflow: 'hidden',
    },
    langItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
    },
    langItemFlag: {
        fontSize: 18,
        marginRight: 10,
    },
    langItemText: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.secondary,
    },
    input: {
        backgroundColor: '#F8F9FA',
        borderRadius: 15,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 15,
        fontWeight: '600',
        color: COLORS.secondary,
        borderWidth: 1,
        borderColor: '#EEEEEE',
    },
    textArea: {
        minHeight: 100,
        textAlignVertical: 'top',
    },
    submitBtn: {
        backgroundColor: COLORS.secondary,
        borderRadius: 20,
        paddingVertical: 18,
        alignItems: 'center',
        marginTop: 10,
        ...SHADOWS.md,
    },
    submitBtnDisabled: {
        opacity: 0.6,
    },
    submitBtnText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '900',
        letterSpacing: 1,
    },
});

export default AddWordModal;
