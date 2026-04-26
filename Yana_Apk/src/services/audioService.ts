import { Audio } from 'expo-av';
import { AUDIO_ASSETS } from '../config/audioAssets';

const SOUNDS = {
    correct: AUDIO_ASSETS.sfx.correct,
    wrong: AUDIO_ASSETS.sfx.wrong,
    click: AUDIO_ASSETS.sfx.click,
    success: AUDIO_ASSETS.sfx.success,
    lesson_complete: AUDIO_ASSETS.sfx.lesson_complete,
};

class AudioService {
    private sounds: { [key: string]: Audio.Sound } = {};
    public isEnabled: boolean = true;

    async playSound(type: keyof typeof SOUNDS) {
        if (!this.isEnabled) return;
        const source = SOUNDS[type];
        if (source) {
            await this.playFromUrl(source);
        }
    }

    async playFromUrl(source: string | number) {
        if (!this.isEnabled || !source) return;
        try {
            const { sound } = await Audio.Sound.createAsync(
                typeof source === 'string' ? { uri: source } : source,
                { shouldPlay: true }
            );

            sound.setOnPlaybackStatusUpdate((status) => {
                if (status.isLoaded && status.didJustFinish) {
                    sound.unloadAsync();
                }
            });
        } catch (error) {
            console.warn('Error playing audio:', error, source);
        }
    }

    async playExternalSound(url: string) {
        return this.playFromUrl(url);
    }

    async speak(text: string, language: string = 'fr') {
        if (!this.isEnabled || !text) return;

        try {
            const HF_TOKEN = process.env.EXPO_PUBLIC_HF_TOKEN; // Get token from environment
            if (!HF_TOKEN) {
                console.warn("No Hugging Face token found. Playing fallback system speech if possible.");
                const Speech = require('expo-speech');
                await Speech.speak(text, {
                    language: language,
                    rate: 0.9,
                    pitch: 1.0,
                });
                return;
            }

            let modelId = "CONCREE/Adia_TTS"; // Default Wolof model
            
            // Map languages to specific premium models
            const languageModels: Record<string, string> = {
                'wol': "galsenai/xTTS-v2-wolof", // Premium Wolof (Waxal based)
                'wolof': "galsenai/xTTS-v2-wolof",
                'bam': "oza75/bambara-tts",      // Bambara
                'bambara': "oza75/bambara-tts",
                'ful': "facebook/mms-tts-ful",   // Pulaar/Fulfulde
                'pulaar': "facebook/mms-tts-ful",
                'fr': "system",                  // French uses system TTS
                'french': "system"
            };

            const targetModel = languageModels[language.toLowerCase()];

            // If it's a system language or 'fr', use Expo Speech (cleaner, non-robotic system voice)
            if (targetModel === "system" || language.toLowerCase() === 'fr' || language.toLowerCase() === 'french') {
                const Speech = require('expo-speech');
                await Speech.speak(text, {
                    language: 'fr-FR',
                    rate: 0.9,
                    pitch: 1.0,
                });
                return;
            }

            if (targetModel) {
                modelId = targetModel;
            }

            const response = await fetch(
                `https://api-inference.huggingface.co/models/${modelId}`,
                {
                    headers: {
                        Authorization: `Bearer ${HF_TOKEN}`,
                        "Content-Type": "application/json",
                    },
                    method: "POST",
                    body: JSON.stringify({ 
                        inputs: text,
                        // Some models expect parameters for better quality
                        parameters: {
                            speaking_rate: 1.0,
                            pitch: 1.0
                        }
                    }),
                }
            );

            if (!response.ok) {
                console.warn(`HF API error for ${modelId}:`, response.statusText);
                // Fallback
                const Speech = require('expo-speech');
                await Speech.speak(text, { language: language === 'wol' ? 'fr' : language }); // Fallback to fr if wol not supported by system
                return;
            }

            const blob = await response.blob();

            // To play a blob in React Native / Expo, we need to save it to the file system as a URI
            const FileSystem = require('expo-file-system');
            const fileReaderInstance = new FileReader();

            fileReaderInstance.readAsDataURL(blob);
            fileReaderInstance.onload = async () => {
                const base64data = fileReaderInstance.result as string;
                // The base64data includes the data URI prefix (e.g. data:audio/wav;base64,....)
                // We save the raw base64 part
                const base64 = base64data.split(',')[1];

                const uri = FileSystem.documentDirectory + `tts_${Date.now()}.wav`; // or .flac based on models
                await FileSystem.writeAsStringAsync(uri, base64, {
                    encoding: FileSystem.EncodingType.Base64,
                });

                await this.playFromUrl(uri);
            }
        } catch (error) {
            console.warn('Speech error:', error);
            // Fallback
            const Speech = require('expo-speech');
            await Speech.speak(text, { language: language });
        }
    }
}

export const audioService = new AudioService();
