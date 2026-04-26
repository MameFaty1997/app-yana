import * as React from 'react';
import { useState, useEffect } from 'react';
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
    ActivityIndicator,
} from 'react-native';
import { Audio } from 'expo-av';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from '../theme';
import { LANGUAGES } from '../constants';
import { TranslationKey } from '../translations';
import { Language } from '../types';

interface TongueTwisterModalProps {
    isVisible: boolean;
    onClose: () => void;
    t: (key: TranslationKey) => string;
}

const TongueTwisterModal: React.FC<TongueTwisterModalProps> = ({ isVisible, onClose, t }) => {
    const [formData, setFormData] = useState({
        language: 'wolof' as Language,
        text: '',
    });

    const [recording, setRecording] = useState<Audio.Recording | null>(null);
    const [recordingUri, setRecordingUri] = useState<string | null>(null);
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [isRecording, setIsRecording] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showLanguagePicker, setShowLanguagePicker] = useState(false);
    const [recordingDuration, setRecordingDuration] = useState(0);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isRecording) {
            interval = setInterval(() => {
                setRecordingDuration(prev => prev + 1);
            }, 1000);
        } else {
            setRecordingDuration(0);
        }
        return () => clearInterval(interval);
    }, [isRecording]);

    useEffect(() => {
        return sound
            ? () => {
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);

    async function startRecording() {
        try {
            const permission = await Audio.requestPermissionsAsync();
            if (permission.status !== 'granted') {
                Alert.alert("Permission refusée", "L'accès au micro est nécessaire pour enregistrer.");
                return;
            }

            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });

            const { recording } = await Audio.Recording.createAsync(
                Audio.RecordingOptionsPresets.HIGH_QUALITY
            );
            setRecording(recording);
            setIsRecording(true);
        } catch (err) {
            console.error('Failed to start recording', err);
            Alert.alert("Erreur", "Impossible de démarrer l'enregistrement.");
        }
    }

    async function stopRecording() {
        setIsRecording(false);
        setRecording(null);
        try {
            await recording?.stopAndUnloadAsync();
            const uri = recording?.getURI();
            setRecordingUri(uri || null);
        } catch (err) {
            console.error('Failed to stop recording', err);
        }
    }

    async function playSound() {
        if (!recordingUri) return;

        try {
            const { sound } = await Audio.Sound.createAsync(
                { uri: recordingUri },
                { shouldPlay: true }
            );
            setSound(sound);
            setIsPlaying(true);
            sound.setOnPlaybackStatusUpdate((status) => {
                if (status.isLoaded && status.didJustFinish) {
                    setIsPlaying(false);
                }
            });
        } catch (err) {
            console.error('Failed to play sound', err);
        }
    }

    async function stopSound() {
        if (sound) {
            await sound.stopAsync();
            setIsPlaying(false);
        }
    }

    const handleSubmit = () => {
        if (!recordingUri) {
            Alert.alert("Enregistrement manquant", "Merci d'enregistrer un virelangue avant de partager.");
            return;
        }

        setIsSubmitting(true);

        // Simulation de l'envoi
        setTimeout(() => {
            setIsSubmitting(false);
            Alert.alert(
                t('tt_shared_success' as TranslationKey),
                "",
                [{
                    text: "OK", onPress: () => {
                        setFormData({ language: 'wolof', text: '' });
                        setRecordingUri(null);
                        onClose();
                    }
                }]
            );
        }, 1500);
    };

    const formatDuration = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
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
                            <Text style={styles.headerTitle}>{t('share_tt_title' as TranslationKey)}</Text>
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

                            {/* Zone d'enregistrement */}
                            <View style={styles.recorderContainer}>
                                {isRecording ? (
                                    <View style={styles.recordingStatus}>
                                        <View style={styles.recordingDot} />
                                        <Text style={styles.recordingTimer}>{formatDuration(recordingDuration)}</Text>
                                        <Text style={styles.recordingText}>{t('recording_label' as TranslationKey)}</Text>
                                    </View>
                                ) : recordingUri ? (
                                    <View style={styles.playbackContainer}>
                                        <Text style={styles.readyText}>Prêt à partager !</Text>
                                        <View style={styles.playbackControls}>
                                            <TouchableOpacity
                                                style={styles.playBtnSmall}
                                                onPress={isPlaying ? stopSound : playSound}
                                            >
                                                <Text style={styles.playIcon}>{isPlaying ? "⏹️" : "▶️"}</Text>
                                                <Text style={styles.playText}>{isPlaying ? t('stop_btn' as TranslationKey) : t('play_btn' as TranslationKey)}</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={styles.retryBtn}
                                                onPress={() => setRecordingUri(null)}
                                            >
                                                <Text style={styles.retryIcon}>🔄</Text>
                                                <Text style={styles.retryTextBtn}>{t('re_record_btn' as TranslationKey)}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                ) : (
                                    <View style={styles.idleRecorder}>
                                        <Text style={styles.recorderHint}>Appuie sur le micro pour commencer</Text>
                                    </View>
                                )}

                                {!recordingUri && (
                                    <TouchableOpacity
                                        style={[styles.recordBtn, isRecording && styles.recordBtnActive]}
                                        onPress={isRecording ? stopRecording : startRecording}
                                    >
                                        <Text style={styles.micIconLarge}>{isRecording ? "⏹️" : "🎤"}</Text>
                                    </TouchableOpacity>
                                )}
                            </View>

                            {/* Transcription (Optionnelle) */}
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Texte du virelangue (Optionnel)</Text>
                                <TextInput
                                    style={[styles.input, styles.textArea]}
                                    placeholder="Ecris le virelangue ici..."
                                    multiline
                                    numberOfLines={3}
                                    value={formData.text}
                                    onChangeText={(text: string) => setFormData(prev => ({ ...prev, text }))}
                                />
                            </View>

                            <TouchableOpacity
                                style={[styles.submitBtn, (!recordingUri || isSubmitting) && styles.submitBtnDisabled]}
                                onPress={handleSubmit}
                                disabled={!recordingUri || isSubmitting}
                            >
                                {isSubmitting ? (
                                    <ActivityIndicator color="#FFFFFF" />
                                ) : (
                                    <Text style={styles.submitBtnText}>{t('submit_tt_btn' as TranslationKey)}</Text>
                                )}
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
        height: '85%',
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
        fontSize: 18,
        fontWeight: '900',
        color: COLORS.secondary,
        letterSpacing: 1,
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
        height: 150,
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
    recorderContainer: {
        backgroundColor: '#FDF7F0',
        borderRadius: 30,
        padding: 24,
        alignItems: 'center',
        marginBottom: 25,
        borderWidth: 1,
        borderColor: '#FDE0B1',
    },
    idleRecorder: {
        marginBottom: 20,
    },
    recorderHint: {
        fontSize: 14,
        color: COLORS.text.tertiary,
        fontStyle: 'italic',
    },
    recordingStatus: {
        alignItems: 'center',
        marginBottom: 20,
    },
    recordingDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: COLORS.error,
        marginBottom: 8,
    },
    recordingTimer: {
        fontSize: 32,
        fontWeight: '900',
        color: COLORS.secondary,
        marginBottom: 4,
    },
    recordingText: {
        fontSize: 12,
        fontWeight: '700',
        color: COLORS.error,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    recordBtn: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: COLORS.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        ...SHADOWS.lg,
    },
    recordBtnActive: {
        backgroundColor: COLORS.error,
        transform: [{ scale: 1.1 }],
    },
    micIconLarge: {
        fontSize: 32,
        color: '#FFFFFF',
    },
    playbackContainer: {
        alignItems: 'center',
    },
    readyText: {
        fontSize: 16,
        fontWeight: '900',
        color: COLORS.success,
        marginBottom: 15,
    },
    playbackControls: {
        flexDirection: 'row',
        gap: 15,
    },
    playBtnSmall: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#EEEEEE',
        ...SHADOWS.sm,
    },
    playIcon: {
        fontSize: 18,
        marginRight: 8,
    },
    playText: {
        fontSize: 14,
        fontWeight: '700',
        color: COLORS.secondary,
    },
    retryBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
    retryIcon: {
        fontSize: 18,
        marginRight: 6,
    },
    retryTextBtn: {
        fontSize: 14,
        fontWeight: '700',
        color: COLORS.text.tertiary,
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

export default TongueTwisterModal;
