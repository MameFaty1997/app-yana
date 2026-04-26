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

import { TranslationKey } from '../translations';

interface TutorApplicationModalProps {
    isVisible: boolean;
    onClose: () => void;
    t: (key: TranslationKey) => string;
}

const TutorApplicationModal: React.FC<TutorApplicationModalProps> = ({ isVisible, onClose, t }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        skills: '',
        experience: '',
        diploma: '',
        cvLink: '', // Simulation de l'upload par un lien ou un champ texte
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = () => {
        if (!formData.name || !formData.email || !formData.skills) {
            Alert.alert(t('missing_fields_alert' as TranslationKey), t('missing_fields_msg' as TranslationKey));
            return;
        }

        setIsSubmitting(true);

        // Simuler un envoi
        setTimeout(() => {
            setIsSubmitting(false);
            Alert.alert(
                t('application_sent_title' as TranslationKey),
                t('application_sent_msg' as TranslationKey),
                [{ text: "OK", onPress: onClose }]
            );
        }, 1500);
    };

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
                            <Text style={styles.headerTitle}>{t('become_tutor_title' as TranslationKey)}</Text>
                            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                                <Text style={styles.closeText}>✕</Text>
                            </TouchableOpacity>
                        </View>

                        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.formContent}>
                            <View style={styles.infoBanner}>
                                <Text style={styles.infoText}>
                                    {t('join_community_text' as TranslationKey)}
                                </Text>
                                <View style={styles.commissionBadge}>
                                    <Text style={styles.commissionText}>{t('service_fee_text' as TranslationKey)}</Text>
                                </View>
                            </View>

                            {/* Nom Complet */}
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>{t('full_name_label' as TranslationKey)}</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder={t('full_name_placeholder' as TranslationKey)}
                                    value={formData.name}
                                    onChangeText={(text: string) => setFormData(prev => ({ ...prev, name: text }))}
                                />
                            </View>

                            {/* Email */}
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>{t('email_label' as TranslationKey)}</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="votre@email.com"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    value={formData.email}
                                    onChangeText={(text: string) => setFormData(prev => ({ ...prev, email: text }))}
                                />
                            </View>

                            {/* Compétences */}
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>{t('skills_label' as TranslationKey)}</Text>
                                <TextInput
                                    style={[styles.input, styles.textArea]}
                                    placeholder={t('skills_placeholder' as TranslationKey)}
                                    multiline
                                    numberOfLines={3}
                                    value={formData.skills}
                                    onChangeText={(text: string) => setFormData(prev => ({ ...prev, skills: text }))}
                                />
                            </View>

                            {/* Expériences */}
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>{t('experience_label' as TranslationKey)}</Text>
                                <TextInput
                                    style={[styles.input, styles.textArea]}
                                    placeholder={t('experience_placeholder' as TranslationKey)}
                                    multiline
                                    numberOfLines={4}
                                    value={formData.experience}
                                    onChangeText={(text: string) => setFormData(prev => ({ ...prev, experience: text }))}
                                />
                            </View>

                            {/* Diplôme */}
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>{t('diploma_label' as TranslationKey)}</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Titre de tes diplômes les plus pertinents"
                                    value={formData.diploma}
                                    onChangeText={(text: string) => setFormData(prev => ({ ...prev, diploma: text }))}
                                />
                            </View>

                            {/* CV Link / Placeholder */}
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>{t('cv_link_label' as TranslationKey)}</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="https://..."
                                    autoCapitalize="none"
                                    value={formData.cvLink}
                                    onChangeText={(text: string) => setFormData(prev => ({ ...prev, cvLink: text }))}
                                />
                                <Text style={styles.fieldHint}>
                                    {t('cv_link_hint' as TranslationKey)}
                                </Text>
                            </View>

                            <TouchableOpacity
                                style={[styles.submitBtn, isSubmitting && styles.submitBtnDisabled]}
                                onPress={handleSubmit}
                                disabled={isSubmitting}
                            >
                                <Text style={styles.submitBtnText}>
                                    {isSubmitting ? t('submitting_application' as TranslationKey) : t('submit_application' as TranslationKey)}
                                </Text>
                            </TouchableOpacity>

                            <Text style={styles.footerNote}>
                                {t('footer_disclaimer' as TranslationKey)}
                            </Text>
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
        height: '92%',
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
    infoBanner: {
        backgroundColor: '#FDF7F0',
        padding: 16,
        borderRadius: 20,
        marginBottom: 25,
        borderWidth: 1,
        borderColor: '#FDE0B1',
    },
    infoText: {
        fontSize: 14,
        color: COLORS.secondary,
        fontWeight: '700',
        textAlign: 'center',
        lineHeight: 20,
    },
    commissionBadge: {
        backgroundColor: '#FFE8D6',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 10,
        marginTop: 10,
        alignSelf: 'center',
    },
    commissionText: {
        fontSize: 11,
        fontWeight: '900',
        color: '#B08968',
        letterSpacing: 0.5,
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
        minHeight: 80,
        textAlignVertical: 'top',
    },
    fieldHint: {
        fontSize: 10,
        color: COLORS.text.tertiary,
        marginTop: 6,
        fontStyle: 'italic',
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
    footerNote: {
        fontSize: 11,
        color: COLORS.text.tertiary,
        textAlign: 'center',
        marginTop: 20,
        lineHeight: 16,
        fontWeight: '500',
    }
});

export default TutorApplicationModal;
