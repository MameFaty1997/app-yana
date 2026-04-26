import * as React from 'react';
import { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { Audio } from 'expo-av';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from '../theme';
import { audioService } from '../services/audioService';
import { TranslationKey } from '../translations';

interface VoiceContributionCardProps {
    phrase: string;
    translation: string;
    language: string;
    localAudioSource?: any;
    t: (key: TranslationKey) => string;
}

const VoiceContributionCard: React.FC<VoiceContributionCardProps> = ({ phrase, translation, language, localAudioSource, t }) => {
    const [recording, setRecording] = useState<Audio.Recording | null>(null);
    const [recordingUri, setRecordingUri] = useState<string | null>(null);
    const [isRecording, setIsRecording] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [sound, setSound] = useState<Audio.Sound | null>(null);

    useEffect(() => {
        return sound
            ? () => {
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);

    const handleListen = async () => {
        setIsSpeaking(true);
        try {
            if (localAudioSource) {
                const { sound } = await Audio.Sound.createAsync(
                    localAudioSource,
                    { shouldPlay: true }
                );
                setSound(sound);
                sound.setOnPlaybackStatusUpdate((status) => {
                    if (status.isLoaded && status.didJustFinish) {
                        setIsSpeaking(false);
                    }
                });
            } else {
                await audioService.speak(phrase, language);
                setIsSpeaking(false);
            }
        } catch (error) {
            console.error('Error speaking phrase:', error);
            setIsSpeaking(false);
        }
    };

    const startRecording = async () => {
        try {
            const permission = await Audio.requestPermissionsAsync();
            if (permission.status !== 'granted') {
                Alert.alert("Permission requise", "L'accès au micro est nécessaire pour enregistrer votre voix.");
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
        }
    };

    const stopRecording = async () => {
        setIsRecording(false);
        try {
            await recording?.stopAndUnloadAsync();
            const uri = recording?.getURI();
            setRecordingUri(uri || null);
            setRecording(null);
        } catch (err) {
            console.error('Failed to stop recording', err);
        }
    };

    const playRecording = async () => {
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
    };

    const handleSubmit = () => {
        setIsSubmitting(true);
        // Simulation d'envoi à la communauté
        setTimeout(() => {
            setIsSubmitting(false);
            setRecordingUri(null);
            Alert.alert("Succès", "Votre contribution a été envoyée ! Merci d'aider la communauté Yana.");
        }, 2000);
    };

    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <Text style={styles.badge}>DÉFI COMMUNAUTÉ 🌍</Text>
            </View>

            <View style={styles.content}>
                <Text style={styles.phrase}>"{phrase}"</Text>
                <Text style={styles.translation}>{translation}</Text>

                <View style={styles.actions}>
                    <TouchableOpacity
                        style={[styles.actionBtn, styles.listenBtn]}
                        onPress={handleListen}
                        disabled={isSpeaking}
                    >
                        {isSpeaking ? (
                            <ActivityIndicator size="small" color={COLORS.primary} />
                        ) : (
                            <>
                                <Text style={styles.actionIcon}>{localAudioSource ? "👤" : "🔊"}</Text>
                                <Text style={styles.actionText}>{localAudioSource ? "NATIVE" : "ÉCOUTER"}</Text>
                            </>
                        )}
                    </TouchableOpacity>

                    {!recordingUri ? (
                        <TouchableOpacity
                            style={[styles.actionBtn, styles.recordBtn, isRecording && styles.recordingBtn]}
                            onPress={isRecording ? stopRecording : startRecording}
                        >
                            <Text style={styles.actionIcon}>{isRecording ? "⏹️" : "🎤"}</Text>
                            <Text style={[styles.actionText, { color: '#FFFFFF' }]}>{isRecording ? "ARRÊTER" : "RÉPÉTER"}</Text>
                        </TouchableOpacity>
                    ) : (
                        <View style={styles.playbackRow}>
                            <TouchableOpacity style={[styles.actionBtn, styles.playBtn]} onPress={playRecording}>
                                <Text style={styles.actionIcon}>▶️</Text>
                                <Text style={[styles.actionText, { color: '#FFFFFF' }]}>RÉÉCOUTER</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.retryBtn} onPress={() => setRecordingUri(null)}>
                                <Text style={styles.retryIcon}>🔄</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>

                {recordingUri && (
                    <TouchableOpacity
                        style={styles.submitBtn}
                        onPress={handleSubmit}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <ActivityIndicator size="small" color="#FFFFFF" />
                        ) : (
                            <Text style={styles.submitBtnText}>PUBLIER MA CONTRIBUTION</Text>
                        )}
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 25,
        padding: 20,
        marginBottom: 20,
        ...SHADOWS.md,
        borderWidth: 1,
        borderColor: '#F0F0F0',
    },
    header: {
        marginBottom: 15,
        alignItems: 'flex-start',
    },
    badge: {
        fontSize: 10,
        fontWeight: '900',
        color: COLORS.primary,
        backgroundColor: '#FFF3E0',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
        letterSpacing: 0.5,
    },
    content: {
        alignItems: 'center',
    },
    phrase: {
        fontSize: 22,
        fontWeight: '900',
        color: COLORS.secondary,
        textAlign: 'center',
        marginBottom: 5,
    },
    translation: {
        fontSize: 14,
        color: '#A8927D',
        fontWeight: '600',
        marginBottom: 25,
        textAlign: 'center',
    },
    actions: {
        flexDirection: 'row',
        gap: 15,
        marginBottom: 20,
        width: '100%',
    },
    actionBtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 15,
        gap: 8,
        ...SHADOWS.sm,
    },
    listenBtn: {
        backgroundColor: '#F0F9FF',
        borderWidth: 1,
        borderColor: '#BAE6FD',
    },
    recordBtn: {
        backgroundColor: COLORS.secondary,
    },
    recordingBtn: {
        backgroundColor: COLORS.error,
    },
    playBtn: {
        backgroundColor: COLORS.success,
        flex: 1,
    },
    playbackRow: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    retryBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#F3F4F6',
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionIcon: {
        fontSize: 16,
    },
    actionText: {
        fontSize: 11,
        fontWeight: '900',
        color: COLORS.secondary,
    },
    retryIcon: {
        fontSize: 16,
    },
    submitBtn: {
        backgroundColor: COLORS.primary,
        width: '100%',
        paddingVertical: 15,
        borderRadius: 15,
        alignItems: 'center',
        ...SHADOWS.md,
    },
    submitBtnText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '900',
        letterSpacing: 1,
    },
});

export default VoiceContributionCard;
