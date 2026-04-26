import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    Animated,
    StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from '../theme';
import { Button, ProgressBar, Bayo } from './ui';
import { Audio } from 'expo-av';
import { Exercise, ExerciseType, BayoEmotion } from '../types';
import { TranslationKey } from '../translations';
import { audioService } from '../services/audioService';
import { CHARACTER_IMAGES } from '../config/assets';
import BayoGuideChatbot from './BayoGuideChatbot';
import { isTablet, isSmallDevice, isExtraSmallDevice, SCREEN_WIDTH, SCREEN_HEIGHT, MAX_CONTENT_WIDTH } from '../utils/responsive';

interface ExerciseScreenProps {
    exercise: Exercise;
    progress: number;
    onQuit: () => void;
    onNext: (isCorrect: boolean, bountyReceived?: number) => void;
    t: (key: TranslationKey) => string;
    targetLanguage: string;
    interfaceLanguage: string;
    isQuizMode?: boolean;
}

const ExerciseScreen: React.FC<ExerciseScreenProps> = ({
    exercise,
    progress,
    onQuit,
    onNext,
    t,
    targetLanguage,
    interfaceLanguage,
    isQuizMode = false,
}) => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [syntaxSelected, setSyntaxSelected] = useState<string[]>([]);
    const [isAnswerChecked, setIsAnswerChecked] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [bayoEmotion, setBayoEmotion] = useState<BayoEmotion>('thinking');

    // New states for advanced exercises
    const [isFlipped, setIsFlipped] = useState(false);
    const [matchPairs, setMatchPairs] = useState<{ id: string, content: string, type: 'left' | 'right', isMatched: boolean }[]>([]);
    const [selectedPairLeft, setSelectedPairLeft] = useState<string | null>(null);
    const [selectedPairRight, setSelectedPairRight] = useState<string | null>(null);
    const [identifiedSoundIdx, setIdentifiedSoundIdx] = useState<number | null>(null);
    const [isChatbotVisible, setIsChatbotVisible] = useState(false);

    // Audio recording states
    const [recording, setRecording] = useState<Audio.Recording | null>(null);
    const [recordingUri, setRecordingUri] = useState<string | null>(null);
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [isRecording, setIsRecording] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [recordingDuration, setRecordingDuration] = useState(0);

    // Speed bonus tracking
    const [startTime, setStartTime] = useState<number>(Date.now());
    const [hasAttempted, setHasAttempted] = useState(false);
    const [earnedBounty, setEarnedBounty] = useState(0);

    // Animation for feedback drawer
    const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

    useEffect(() => {
        setSelectedOption(null);
        setSyntaxSelected([]);
        setIsAnswerChecked(false);
        setIsCorrect(false);
        setBayoEmotion('thinking');
        setIsFlipped(false);
        setIdentifiedSoundIdx(null);
        setSelectedPairLeft(null);
        setSelectedPairRight(null);
        setStartTime(Date.now());
        setHasAttempted(false);
        setEarnedBounty(0);

        // Reset audio state
        setRecordingUri(null);
        setIsRecording(false);
        setIsPlaying(false);
        setRecordingDuration(0);
        if (sound) {
            sound.unloadAsync();
            setSound(null);
        }

        // Initialize Match Pairs if needed
        if (exercise.type === ExerciseType.MATCH_PAIRS && exercise.options) {
            const pairs = exercise.options.map((opt, i) => {
                const [left, right] = opt.split('|');
                return [
                    { id: `left-${i}`, content: left, type: 'left' as const, isMatched: false },
                    { id: `right-${i}`, content: right, type: 'right' as const, isMatched: false }
                ];
            }).flat().sort(() => 0.5 - Math.random());
            setMatchPairs(pairs);
        }

        Animated.timing(slideAnim, {
            toValue: SCREEN_HEIGHT,
            duration: 0,
            useNativeDriver: true,
        }).start();

        return () => {
            if (sound) {
                sound.unloadAsync();
            }
            if (recording) {
                recording.stopAndUnloadAsync();
            }
        };
    }, [exercise.id, SCREEN_HEIGHT, slideAnim, exercise.type, exercise.options]);

    // Timer for recording
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

    const startRecording = async () => {
        try {
            const permission = await Audio.requestPermissionsAsync();
            if (permission.status !== 'granted') return;

            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });

            const { recording } = await Audio.Recording.createAsync(
                Audio.RecordingOptionsPresets.HIGH_QUALITY
            );
            setRecording(recording);
            setIsRecording(true);
            audioService.playSound('click');
        } catch (err) {
            console.error('Failed to start recording', err);
        }
    };

    const stopRecording = async () => {
        setIsRecording(false);
        setRecording(null);
        try {
            await recording?.stopAndUnloadAsync();
            const uri = recording?.getURI();
            setRecordingUri(uri || null);
            // Auto register that the user "answered" for SPEAK type if they recorded something
            if (uri) setSelectedOption(exercise.correctAnswer as string);
        } catch (err) {
            console.error('Failed to stop recording', err);
        }
    };

    const playRecordedSound = async () => {
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

    const stopRecordedSound = async () => {
        if (sound) {
            await sound.stopAsync();
            setIsPlaying(false);
        }
    };

    const formatDuration = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleCheck = () => {
        let correct = false;

        if (exercise.type === ExerciseType.CULTURAL_NOTE) {
            correct = true;
        } else if (exercise.type === ExerciseType.STORY_DIALOGUE) {
            // Un dialogue est correct si on a choisi une option (ou pas d'option requise)
            // Mais si une réponse correcte est définie, on la vérifie
            if (exercise.correctAnswer && exercise.options) {
                correct = selectedOption === exercise.correctAnswer;
            } else {
                correct = !!selectedOption || !exercise.options;
            }
        } else if (exercise.type === ExerciseType.IDENTIFY_SOUND) {
            correct = identifiedSoundIdx !== null && exercise.options?.[identifiedSoundIdx] === exercise.correctAnswer;
        } else if (exercise.type === ExerciseType.TRANSLATE_AND_ORDER || exercise.type === ExerciseType.LISTEN_AND_ORDER) {
            correct = syntaxSelected.join(' ') === (Array.isArray(exercise.correctAnswer) ? exercise.correctAnswer[0] : exercise.correctAnswer);
        } else if (exercise.type === ExerciseType.MATCH_PAIRS) {
            correct = matchPairs.length > 0 && matchPairs.every(p => p.isMatched);
        } else if (exercise.type === ExerciseType.FLASHCARD) {
            correct = isFlipped;
        } else if (exercise.type === ExerciseType.FILL_BLANKS) {
            correct = selectedOption === exercise.correctAnswer;
        } else {
            correct = selectedOption === exercise.correctAnswer;
        }

        setIsCorrect(correct);
        setIsAnswerChecked(true);
        setBayoEmotion(correct ? 'excited' : 'sad');

        // Logic for speed bonus
        if (correct && !hasAttempted) {
            const timeTaken = Date.now() - startTime;
            if (timeTaken <= 5000) { // Under 5 seconds
                setEarnedBounty(5);
            }
        }
        setHasAttempted(true);

        // Play sound
        audioService.playSound(correct ? 'correct' : 'wrong');

        Animated.spring(slideAnim, {
            toValue: 0,
            useNativeDriver: true,
            bounciness: 0,
            speed: 12,
        }).start();
    };

    const handleContinue = () => {
        onNext(isCorrect, isCorrect ? earnedBounty : 0);
    };

    const renderBayoBox = (content: string, translation?: string) => {
        const avatar = exercise.avatar || 'bayo';
        const characterName = t({
            'bayo': 'char_bayo',
            'pere': 'char_father',
            'mere': 'char_mother',
            'grand-pere': 'char_grandfather',
            'grand-mere': 'char_grandmother',
            'fille': 'char_girl',
            'garcon': 'char_boy',
            'fils': 'char_son',
            'sage': 'char_sage',
            'mythic': 'char_lion',
            'faux_lion': 'char_lion',
            'hyene': 'char_hyena',
            'lievre': 'char_hare',
            'ecureuil': 'char_squirrel',
        }[avatar] as TranslationKey || 'char_bayo');

        return (
            <View style={styles.bayoBoxContainer}>
                <View style={styles.bayoAvatarFrame}>
                    {avatar === 'bayo' ? (
                        <Bayo size={isSmallDevice ? "md" : "lg"} emotion={bayoEmotion} />
                    ) : (
                        <Image
                            source={CHARACTER_IMAGES[avatar] || CHARACTER_IMAGES.sage}
                            style={{
                                width: isSmallDevice ? 100 : 150,
                                height: isSmallDevice ? 100 : 150,
                                borderRadius: isSmallDevice ? 50 : 75,
                                backgroundColor: COLORS.gray[100],
                                borderWidth: 3,
                                borderColor: COLORS.white,
                            }}
                            resizeMode="contain"
                        />
                    )}
                </View>
                <View style={styles.speechBubble}>
                    <View style={styles.bubbleTail} />
                    <View style={styles.bubbleContentRow}>
                        <View style={styles.bubbleTextContainer}>
                            <Text style={styles.bubbleHeaderLabel}>YANA • {characterName}</Text>
                            <Text style={styles.bubbleMainText}>{content}</Text>
                            {translation && <Text style={styles.bubbleSubText}>{translation}</Text>}
                        </View>
                        <TouchableOpacity
                            style={styles.speakerBtn}
                            onPress={() => {
                                if (exercise.audioUrl) {
                                    audioService.playFromUrl(exercise.audioUrl);
                                } else {
                                    audioService.speak(content, targetLanguage);
                                }
                            }}
                        >
                            <Text style={styles.speakerIcon}>🔊</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    };

    const renderExerciseContent = () => {
        return (
            <View style={styles.exerciseContent}>
                {isQuizMode && (
                    <View style={styles.quizBadge}>
                        <Text style={styles.quizBadgeText}>⚡ {t('quiz_validation' as TranslationKey)}</Text>
                    </View>
                )}
                {/* ... rest of the content remains the same, I will just call the specific renderers ... */}
                {renderSpecificExerciseContent()}
            </View>
        );
    };

    const renderSpecificExerciseContent = () => {
        switch (exercise.type) {
            case ExerciseType.CHOOSE_IMAGE:
                return (
                    <View style={styles.exerciseContent}>
                        <Text style={styles.mainPrompt}>{exercise.prompt}</Text>
                        {renderBayoBox(exercise.content)}
                        <View>
                            <View style={styles.imageGrid}>
                                {exercise.images?.map((img, idx) => {
                                    const optionLabel = exercise.options?.[idx] || '';
                                    const isSelected = selectedOption === optionLabel;
                                    return (
                                        <TouchableOpacity
                                            key={idx}
                                            style={[
                                                styles.imageCard,
                                                isSelected && styles.imageCardSelected,
                                                isAnswerChecked && optionLabel === exercise.correctAnswer && styles.imageCardCorrect,
                                            ]}
                                            onPress={() => setSelectedOption(optionLabel)}
                                            disabled={isAnswerChecked}
                                        >
                                            <View style={styles.cardVisualContainer}>
                                                <Image
                                                    source={typeof img === 'string' ? { uri: img } : img}
                                                    style={styles.cardVisual}
                                                    resizeMode="contain"
                                                />
                                            </View>
                                            <Text style={styles.cardLabel} numberOfLines={1}>{optionLabel}</Text>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                        </View>
                    </View>
                );

            case ExerciseType.SPEAK:
                return (
                    <View style={styles.exerciseContent}>
                        <Text style={styles.mainPrompt}>{exercise.prompt}</Text>
                        {renderBayoBox(exercise.content, exercise.translation)}

                        <View style={styles.micZone}>
                            {isRecording ? (
                                <View style={styles.activeRecordingContainer}>
                                    <View style={styles.recordingIndicator}>
                                        <View style={styles.recordingPulse} />
                                        <Text style={styles.recordingTimerText}>{formatDuration(recordingDuration)}</Text>
                                    </View>
                                    <TouchableOpacity
                                        style={styles.stopRecordingBtn}
                                        onPress={stopRecording}
                                    >
                                        <View style={styles.stopIcon} />
                                        <Text style={styles.stopBtnText}>{t('stop_btn' as TranslationKey)}</Text>
                                    </TouchableOpacity>
                                </View>
                            ) : recordingUri ? (
                                <View style={styles.recordedAudioControls}>
                                    <Text style={styles.recordedStatusText}>✓ {t('recording_label' as TranslationKey)}</Text>
                                    <View style={styles.recordedButtonsRow}>
                                        <TouchableOpacity
                                            style={styles.recordedPlayBtn}
                                            onPress={isPlaying ? stopRecordedSound : playRecordedSound}
                                        >
                                            <Text style={styles.recordedPlayIcon}>{isPlaying ? "⏹" : "▶"}</Text>
                                            <Text style={styles.recordedPlayText}>{isPlaying ? t('stop_btn' as TranslationKey) : t('play_btn' as TranslationKey)}</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={styles.recordedRetryBtn}
                                            onPress={() => {
                                                setRecordingUri(null);
                                                setSelectedOption(null);
                                                audioService.playSound('click');
                                            }}
                                            disabled={isAnswerChecked}
                                        >
                                            <Text style={styles.recordedRetryIcon}>🔄</Text>
                                            <Text style={styles.recordedRetryText}>{t('re_record_btn' as TranslationKey)}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ) : (
                                <TouchableOpacity
                                    style={[styles.micRound, isAnswerChecked && styles.micRoundDisabled]}
                                    onPress={startRecording}
                                    disabled={isAnswerChecked}
                                >
                                    <View style={styles.micInner}>
                                        <Text style={styles.micEmoji}>🎙️</Text>
                                    </View>
                                </TouchableOpacity>
                            )}

                            {!isRecording && !recordingUri && (
                                <Text style={styles.micHint}>{isAnswerChecked ? t('continue') : t('mic_hint')}</Text>
                            )}
                        </View>
                    </View>
                );

            case ExerciseType.CHOOSE_TRANSLATION:
            case ExerciseType.LISTEN_AND_CHOICE:
                return (
                    <View style={styles.exerciseContent}>
                        <Text style={styles.mainPrompt}>{exercise.prompt}</Text>
                        {renderBayoBox(exercise.content)}
                        <View style={styles.optionsStack}>
                            {exercise.options?.map((option, idx) => {
                                const isSelected = selectedOption === option;
                                return (
                                    <TouchableOpacity
                                        key={idx}
                                        style={[styles.optionRow, isSelected && styles.optionRowSelected]}
                                        onPress={() => setSelectedOption(option)}
                                        disabled={isAnswerChecked}
                                    >
                                        <View style={[styles.optionCircle, isSelected && styles.optionCircleSelected]}>
                                            <Text style={[styles.optionCircleText, isSelected && styles.optionCircleTextSelected]}>{idx + 1}</Text>
                                        </View>
                                        <Text style={styles.optionRowText} numberOfLines={2}>{option}</Text>
                                        <TouchableOpacity
                                            style={styles.optionAudioBtn}
                                            onPress={() => audioService.speak(option, targetLanguage)}
                                            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                                        >
                                            <Text style={styles.optionAudioIcon}>🔊</Text>
                                        </TouchableOpacity>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </View>
                );

            case ExerciseType.TRANSLATE_AND_ORDER:
            case ExerciseType.LISTEN_AND_ORDER:
                return (
                    <View style={styles.exerciseContent}>
                        <Text style={styles.mainPrompt}>{exercise.prompt}</Text>
                        {renderBayoBox(exercise.content)}
                        <View style={styles.syntaxSection}>
                            <View style={styles.syntaxDropZone}>
                                {syntaxSelected.map((word, idx) => (
                                    <TouchableOpacity
                                        key={idx}
                                        style={styles.selectedWord}
                                        onPress={() => setSyntaxSelected(prev => prev.filter((_, i) => i !== idx))}
                                        disabled={isAnswerChecked}
                                    >
                                        <Text style={styles.selectedWordText}>{word}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                            <View style={styles.syntaxBank}>
                                {exercise.options?.map((word, idx) => {
                                    const isUsed = syntaxSelected.includes(word);
                                    return (
                                        <TouchableOpacity
                                            key={idx}
                                            style={[styles.bankWordBox, isUsed && styles.bankWordUsed]}
                                            onPress={() => {
                                                if (!isUsed) {
                                                    setSyntaxSelected(prev => [...prev, word]);
                                                }
                                            }}
                                            disabled={isAnswerChecked || isUsed}
                                        >
                                            <Text style={[styles.bankWordText, isUsed && styles.bankWordTextUsed]}>{word}</Text>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                        </View>
                    </View>
                );

            case ExerciseType.FLASHCARD:
                return (
                    <View style={styles.exerciseContent}>
                        <Text style={styles.mainPrompt}>{exercise.prompt}</Text>
                        <View style={[styles.flashcard, isFlipped && styles.flashcardFlipped]}>
                            {!isFlipped ? (
                                <View style={styles.flashcardFront}>
                                    <Text style={styles.flashcardText}>{exercise.content}</Text>
                                </View>
                            ) : (
                                <View style={styles.flashcardBack}>
                                    <Text style={styles.flashcardTranslation}>{exercise.correctAnswer as string}</Text>
                                    {exercise.explanation && <Text style={styles.flashcardExplanation}>{exercise.explanation}</Text>}
                                </View>
                            )}
                        </View>

                        {!isFlipped && (
                            <View style={styles.micZone}>
                                <TouchableOpacity
                                    style={[styles.micRound, isAnswerChecked && styles.micRoundDisabled]}
                                    onPress={() => {
                                        audioService.playSound('click');
                                        setIsFlipped(true); // Flip visually
                                        setSelectedOption(exercise.correctAnswer as string); // Register as interacted
                                        if (exercise.audioUrl) {
                                            audioService.playFromUrl(exercise.audioUrl);
                                        } else {
                                            audioService.speak(exercise.correctAnswer as string, targetLanguage); // Pronounce the translation
                                        }
                                    }}
                                    disabled={isAnswerChecked}
                                >
                                    <View style={styles.micInner}>
                                        <Text style={styles.micEmoji}>🎙️</Text>
                                    </View>
                                </TouchableOpacity>
                                <Text style={styles.micHint}>{t('mic_hint')}</Text>
                            </View>
                        )}
                    </View>
                );

            case ExerciseType.MATCH_PAIRS:
                return (
                    <View style={styles.exerciseContent}>
                        <Text style={styles.mainPrompt}>{exercise.prompt}</Text>
                        <View style={styles.matchingGrid}>
                            {matchPairs.map((item) => (
                                <TouchableOpacity
                                    key={item.id}
                                    style={[
                                        styles.matchItem,
                                        item.isMatched && styles.matchItemDisabled,
                                        (selectedPairLeft === item.id || selectedPairRight === item.id) && styles.matchItemSelected
                                    ]}
                                    disabled={item.isMatched || isAnswerChecked}
                                    onPress={() => {
                                        if (item.type === 'left') {
                                            setSelectedPairLeft(item.id);
                                            if (selectedPairRight) {
                                                const rightItem = matchPairs.find(p => p.id === selectedPairRight);
                                                const pairStr = `${item.content}|${rightItem?.content}`;
                                                const pairStrRev = `${rightItem?.content}|${item.content}`;
                                                if (exercise.options?.includes(pairStr) || exercise.options?.includes(pairStrRev)) {
                                                    setMatchPairs(prev => prev.map(p => (p.id === item.id || p.id === selectedPairRight) ? { ...p, isMatched: true } : p));
                                                    audioService.playSound('correct');
                                                } else {
                                                    audioService.playSound('wrong');
                                                }
                                                setSelectedPairLeft(null);
                                                setSelectedPairRight(null);
                                            }
                                        } else {
                                            setSelectedPairRight(item.id);
                                            if (selectedPairLeft) {
                                                const leftItem = matchPairs.find(p => p.id === selectedPairLeft);
                                                const pairStr = `${leftItem?.content}|${item.content}`;
                                                if (exercise.options?.includes(pairStr)) {
                                                    setMatchPairs(prev => prev.map(p => (p.id === item.id || p.id === selectedPairLeft) ? { ...p, isMatched: true } : p));
                                                    audioService.playSound('correct');
                                                } else {
                                                    audioService.playSound('wrong');
                                                }
                                                setSelectedPairLeft(null);
                                                setSelectedPairRight(null);
                                            }
                                        }
                                    }}
                                >
                                    <Text style={styles.matchText}>{item.content}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                );

            case ExerciseType.IDENTIFY_SOUND:
                return (
                    <View style={styles.exerciseContent}>
                        <Text style={styles.mainPrompt}>{exercise.prompt}</Text>
                        {renderBayoBox(t('sounds_intro' as TranslationKey))}
                        <View style={styles.soundOptionsGrid}>
                            {exercise.options?.map((option, idx) => (
                                <TouchableOpacity
                                    key={idx}
                                    style={[
                                        styles.soundOptionCard,
                                        identifiedSoundIdx === idx && styles.soundOptionSelected
                                    ]}
                                    onPress={() => {
                                        setIdentifiedSoundIdx(idx);
                                        const audioUrl = exercise.images?.[idx];
                                        if (audioUrl) {
                                            audioService.playFromUrl(audioUrl);
                                        } else {
                                            audioService.speak(option, targetLanguage);
                                        }
                                    }}
                                    disabled={isAnswerChecked}
                                >
                                    <Text style={styles.soundOptionIcon}>🔊</Text>
                                    <Text style={styles.soundOptionLabel}>{t('sound_choice')} {idx + 1}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                );

            case ExerciseType.FILL_BLANKS:
                return (
                    <View style={styles.exerciseContent}>
                        <Text style={styles.mainPrompt}>{exercise.prompt}</Text>
                        <View style={styles.fillBlanksContainer}>
                            <View style={styles.promptBubble}>
                                <Text style={styles.fillBlankSentence}>
                                    {exercise.content.split('____').map((part, i) => (
                                        <React.Fragment key={i}>
                                            {part}
                                            {i < exercise.content.split('____').length - 1 && (
                                                <View style={styles.blankBox}>
                                                    <Text style={styles.blankText}>{selectedOption || "____"}</Text>
                                                </View>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </Text>
                            </View>
                            <View style={styles.fillOptionsBank}>
                                {exercise.options?.map((opt, idx) => (
                                    <TouchableOpacity
                                        key={idx}
                                        style={[styles.fillOptionBtn, selectedOption === opt && styles.fillOptionSelected]}
                                        onPress={() => setSelectedOption(opt)}
                                        disabled={isAnswerChecked}
                                    >
                                        <Text style={styles.fillOptionText}>{opt}</Text>
                                        <TouchableOpacity
                                            style={styles.fillOptionAudioBtn}
                                            onPress={() => audioService.speak(opt, targetLanguage)}
                                        >
                                            <Text style={styles.fillOptionAudioIcon}>🔊</Text>
                                        </TouchableOpacity>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    </View>
                );

            case ExerciseType.STORY_DIALOGUE:
                return (
                    <View style={styles.exerciseContent}>
                        <Text style={styles.mainPrompt}>{exercise.prompt}</Text>
                        <View style={styles.dialogueContainer}>
                            <View style={styles.dialogueRow}>
                                {exercise.avatar === 'bayo' ? (
                                    <Bayo size="md" emotion={bayoEmotion} />
                                ) : (
                                    <Image
                                        source={CHARACTER_IMAGES[exercise.avatar || 'sage']}
                                        style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: COLORS.gray[100] }}
                                        resizeMode="contain"
                                    />
                                )}
                                <View style={styles.dialogueBubble}>
                                    <View style={styles.dialogueTail} />
                                    <Text style={styles.dialogueText}>{exercise.content}</Text>
                                    {exercise.translation && <Text style={styles.dialogueSubText}>{exercise.translation}</Text>}
                                </View>
                            </View>
                            <View style={styles.dialogueOptions}>
                                {exercise.options?.map((opt, idx) => (
                                    <TouchableOpacity
                                        key={idx}
                                        style={[styles.dialogueOptionBtn, selectedOption === opt && styles.dialogueOptionSelected]}
                                        onPress={() => setSelectedOption(opt)}
                                        disabled={isAnswerChecked}
                                    >
                                        <Text style={styles.dialogueOptionText}>{opt}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    </View>
                );

            case ExerciseType.CULTURAL_NOTE:
                return (
                    <View style={styles.exerciseContent}>
                        <Text style={styles.mainPrompt}>{t('cultural_note_title')} 🌍</Text>
                        <View style={styles.culturalCard}>
                            <Image
                                source={{ uri: exercise.image || 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800' }}
                                style={styles.culturalImage}
                            />
                            <View style={styles.culturalOverlay} />
                            <ScrollView style={styles.culturalBody} showsVerticalScrollIndicator={false}>
                                <Text style={styles.culturalTitle}>{exercise.content}</Text>
                                <Text style={styles.culturalText}>{exercise.explanation || exercise.culturalNote}</Text>
                            </ScrollView>
                        </View>
                        <Text style={styles.culturalFooterHint}>{t('listen_carefully_hint')}</Text>
                    </View>
                );

            default:
                return null;
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />

            {/* Custom Header */}
            <View style={styles.topHeader}>
                <TouchableOpacity onPress={onQuit} style={styles.closeBtn}>
                    <Text style={styles.closeLabel}>✕</Text>
                </TouchableOpacity>
                <View style={styles.progressTrack}>
                    <ProgressBar progress={progress} height={isSmallDevice ? 10 : 14} />
                </View>
                {!isExtraSmallDevice && (
                    <View style={styles.cauriCounter}>
                        <Text style={styles.cauriSymbol}>Cc</Text>
                        <Text style={styles.cauriValue}>+10</Text>
                    </View>
                )}
                {!isAnswerChecked && (
                    <TouchableOpacity
                        style={styles.bayoFab}
                        onPress={() => setIsChatbotVisible(true)}
                    >
                        <Bayo size="sm" emotion="happy" />
                        <View style={styles.fabBadge}>
                            <Text style={styles.fabBadgeText}>?</Text>
                        </View>
                    </TouchableOpacity>
                )}
            </View>

            <ScrollView
                style={styles.contentScroll}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {renderExerciseContent()}
            </ScrollView>

            <View style={styles.footerAction}>
                <TouchableOpacity
                    style={[
                        styles.verifyBtn,
                        exercise.type === ExerciseType.MATCH_PAIRS
                            ? ((matchPairs.length === 0 || !matchPairs.every(p => p.isMatched)) && styles.verifyBtnDisabled)
                            : exercise.type === ExerciseType.FLASHCARD
                                ? (!isFlipped && styles.verifyBtnDisabled)
                                : exercise.type === ExerciseType.CULTURAL_NOTE
                                    ? false
                                    : (!selectedOption && syntaxSelected.length === 0 && identifiedSoundIdx === null && styles.verifyBtnDisabled)
                    ]}
                    onPress={handleCheck}
                    disabled={isAnswerChecked || (
                        exercise.type === ExerciseType.MATCH_PAIRS
                            ? (matchPairs.length === 0 || !matchPairs.every(p => p.isMatched))
                            : exercise.type === ExerciseType.FLASHCARD
                                ? !isFlipped
                                : exercise.type === ExerciseType.CULTURAL_NOTE
                                    ? false
                                    : (!selectedOption && syntaxSelected.length === 0 && identifiedSoundIdx === null)
                    )}
                >
                    <Text style={styles.verifyBtnText}>{t('check')}</Text>
                </TouchableOpacity>
            </View>

            {/* Feedback Panel */}
            {isAnswerChecked && (
                <Animated.View style={[
                    styles.feedbackPanel,
                    { transform: [{ translateY: slideAnim }] },
                    isCorrect ? styles.panelCorrect : styles.panelWrong
                ]}>
                    <View style={styles.feedbackHeaderRow}>
                        <View style={styles.feedbackAvatar}>
                            <Bayo size={isSmallDevice ? "md" : "lg"} emotion={isCorrect ? 'excited' : 'sad'} />
                        </View>
                        <View style={styles.feedbackTextCol}>
                            <Text style={[styles.feedbackTitleText, { color: isCorrect ? COLORS.success : COLORS.error }]}>
                                {isCorrect ? t('bravo') : t('oops')}
                            </Text>
                            <Text style={styles.feedbackSubtitleText} numberOfLines={2}>
                                {isCorrect ? t('perfect') : t('try_again')}
                            </Text>
                            {isCorrect && earnedBounty > 0 && (
                                <Text style={styles.feedbackBonusText}>
                                    {t('speed_bonus_msg')}
                                </Text>
                            )}
                        </View>
                    </View>

                    <TouchableOpacity
                        style={[styles.continuePanelBtn, { backgroundColor: isCorrect ? COLORS.success : COLORS.error }]}
                        onPress={handleContinue}
                    >
                        <Text style={styles.continuePanelBtnText}>{t('continue')} →</Text>
                    </TouchableOpacity>
                </Animated.View>
            )}

            <BayoGuideChatbot
                isVisible={isChatbotVisible}
                onClose={() => setIsChatbotVisible(false)}
                targetLanguage={targetLanguage}
                interfaceLanguage={interfaceLanguage}
                t={t}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        alignItems: isTablet ? 'center' as const : undefined,
    },
    topHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: isTablet ? SPACING.xl : SPACING.md,
        paddingVertical: isSmallDevice ? SPACING.sm : SPACING.md,
        gap: SPACING.sm,
        width: '100%',
        maxWidth: isTablet ? MAX_CONTENT_WIDTH + 40 : undefined,
    },
    closeBtn: {
        width: 36,
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeLabel: {
        fontSize: 24,
        color: '#BCAAA4',
        fontWeight: '900',
    },
    bayoFab: {
        position: 'absolute',
        bottom: 30,
        right: 25,
        width: 60,
        height: 60,
        borderRadius: 20,
        backgroundColor: '#FFA726',
        justifyContent: 'center',
        alignItems: 'center',
        ...SHADOWS.lg,
        borderBottomWidth: 4,
        borderBottomColor: '#F57C00',
    },
    fabBadge: {
        position: 'absolute',
        top: -8,
        right: -8,
        backgroundColor: COLORS.error,
        width: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: COLORS.white,
    },
    fabBadgeText: {
        color: COLORS.white,
        fontSize: 12,
        fontWeight: 'bold',
    },
    progressTrack: {
        flex: 1,
    },
    cauriCounter: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF8F0',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: BORDER_RADIUS.lg,
        borderWidth: 1,
        borderColor: '#FFE0B2',
    },
    cauriSymbol: {
        fontSize: 12,
        fontWeight: '900',
        color: COLORS.text.primary,
        marginRight: 4,
    },
    cauriValue: {
        fontSize: 12,
        fontWeight: '900',
        color: COLORS.primary,
    },
    contentScroll: {
        flex: 1,
        width: '100%',
        maxWidth: isTablet ? MAX_CONTENT_WIDTH + 40 : undefined,
    },
    scrollContent: {
        padding: isTablet ? 30 : (isSmallDevice ? 15 : 25),
        paddingBottom: 150,
    },
    exerciseContent: {
        flex: 1,
    },
    mainPrompt: {
        fontSize: isSmallDevice ? 20 : 22,
        color: COLORS.text.primary,
        fontWeight: '900',
        marginBottom: isSmallDevice ? 10 : 15,
        lineHeight: isSmallDevice ? 26 : 30,
    },
    bayoBoxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: isSmallDevice ? 8 : 12,
        marginBottom: isSmallDevice ? 20 : 30,
        marginTop: 10,
    },
    bayoAvatarFrame: {
        width: isSmallDevice ? 60 : 90,
        height: isSmallDevice ? 60 : 90,
        borderRadius: 20,
        backgroundColor: COLORS.white,
        borderWidth: 3,
        borderColor: COLORS.gray[100],
        justifyContent: 'center',
        alignItems: 'center',
        ...SHADOWS.sm,
    },
    speechBubble: {
        flex: 1,
        backgroundColor: COLORS.white,
        borderRadius: 25,
        padding: isSmallDevice ? 12 : 15,
        position: 'relative',
        borderWidth: 2,
        borderColor: COLORS.gray[100],
        ...SHADOWS.md,
    },
    bubbleTail: {
        position: 'absolute',
        top: '50%',
        left: -12,
        marginTop: -8,
        width: 0,
        height: 0,
        borderTopWidth: 8,
        borderBottomWidth: 8,
        borderRightWidth: 12,
        borderTopColor: 'transparent',
        borderBottomColor: 'transparent',
        borderRightColor: COLORS.gray[100],
    },
    bubbleContentRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    bubbleTextContainer: {
        flex: 1,
        marginRight: 5,
    },
    bubbleHeaderLabel: {
        fontSize: 8,
        fontWeight: '900',
        color: COLORS.primary,
        letterSpacing: 1,
        marginBottom: 2,
    },
    bubbleMainText: {
        fontSize: isSmallDevice ? 15 : 18,
        color: COLORS.text.primary,
        fontWeight: '900',
    },
    bubbleSubText: {
        fontSize: 12,
        color: COLORS.text.secondary,
        marginTop: 2,
        fontStyle: 'italic',
    },
    speakerBtn: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: '#FFAD60',
        justifyContent: 'center',
        alignItems: 'center',
        ...SHADOWS.sm,
    },
    speakerIcon: {
        fontSize: 20,
    },
    imageGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: isSmallDevice ? 10 : 15,
    },
    imageCard: {
        width: '47%',
        backgroundColor: COLORS.white,
        borderRadius: 25,
        padding: 8,
        borderWidth: 3,
        borderColor: COLORS.gray[100],
        ...SHADOWS.md,
    },
    imageCardSelected: {
        borderColor: COLORS.primary,
        backgroundColor: COLORS.secondaryLight,
    },
    imageCardCorrect: {
        borderColor: COLORS.success,
        backgroundColor: '#E8F5E9',
    },
    cardVisualContainer: {
        width: '100%',
        aspectRatio: 1,
        backgroundColor: '#FDF7F0',
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        overflow: 'hidden',
    },
    cardVisual: {
        width: '90%',
        height: '90%',
    },
    cardLabel: {
        textAlign: 'center',
        fontSize: isSmallDevice ? 9 : 11,
        fontWeight: '900',
        color: COLORS.text.primary,
        paddingBottom: 2,
    },
    micZone: {
        alignItems: 'center',
        marginTop: SPACING.xl,
    },
    micRound: {
        width: isSmallDevice ? 110 : 140,
        height: isSmallDevice ? 110 : 140,
        borderRadius: 70,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 6,
        borderColor: '#FFE0B2',
        ...SHADOWS.lg,
    },
    micRoundDisabled: {
        opacity: 0.5,
    },
    micInner: {
        width: isSmallDevice ? 60 : 80,
        height: isSmallDevice ? 60 : 80,
        borderRadius: 40,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
    micEmoji: {
        fontSize: isSmallDevice ? 30 : 40,
    },
    micHint: {
        fontSize: 13,
        color: COLORS.primary,
        fontWeight: '900',
        marginTop: 20,
    },
    optionsStack: {
        gap: 12,
    },
    optionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: isSmallDevice ? 12 : 18,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: COLORS.gray[100],
        backgroundColor: COLORS.white,
        ...SHADOWS.sm,
        gap: 12,
    },
    optionRowSelected: {
        borderColor: COLORS.primary,
        backgroundColor: COLORS.secondaryLight,
    },
    optionCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#FFE0B2',
        justifyContent: 'center',
        alignItems: 'center',
    },
    optionCircleSelected: {
        backgroundColor: COLORS.primary,
    },
    optionCircleText: {
        fontSize: 14,
        fontWeight: '900',
        color: COLORS.primaryDark,
    },
    optionCircleTextSelected: {
        color: COLORS.white,
    },
    optionRowText: {
        fontSize: isSmallDevice ? 14 : 16,
        color: COLORS.text.primary,
        fontWeight: '900',
    },
    syntaxSection: {
        flex: 1,
    },
    syntaxDropZone: {
        minHeight: 120,
        borderBottomWidth: 2,
        borderBottomColor: COLORS.gray[100],
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        paddingVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedWord: {
        backgroundColor: COLORS.white,
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: COLORS.primary,
        ...SHADOWS.sm,
    },
    selectedWordText: {
        fontSize: isSmallDevice ? 14 : 16,
        color: COLORS.primary,
        fontWeight: '900',
    },
    syntaxBank: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        justifyContent: 'center',
        marginTop: 30,
    },
    bankWordBox: {
        backgroundColor: COLORS.white,
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: COLORS.gray[200],
        ...SHADOWS.sm,
    },
    bankWordUsed: {
        backgroundColor: COLORS.gray[100],
        borderColor: COLORS.gray[100],
    },
    bankWordText: {
        fontSize: isSmallDevice ? 14 : 16,
        color: COLORS.text.primary,
        fontWeight: '900',
    },
    bankWordTextUsed: {
        color: 'transparent',
    },
    footerAction: {
        padding: isTablet ? 25 : (isSmallDevice ? 15 : 20),
        borderTopWidth: 2,
        borderTopColor: COLORS.gray[100],
        backgroundColor: COLORS.white,
        width: '100%',
        maxWidth: isTablet ? MAX_CONTENT_WIDTH + 40 : undefined,
    },
    verifyBtn: {
        height: isSmallDevice ? 56 : 64,
        backgroundColor: COLORS.primary,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        ...SHADOWS.md,
    },
    verifyBtnDisabled: {
        backgroundColor: '#EFEBE9',
        ...SHADOWS.sm,
    },
    verifyBtnText: {
        fontSize: 16,
        fontWeight: '900',
        color: COLORS.white,
        letterSpacing: 1,
    },
    feedbackPanel: {
        position: 'absolute',
        bottom: 0,
        left: isTablet ? undefined : 0,
        right: isTablet ? undefined : 0,
        width: isTablet ? MAX_CONTENT_WIDTH + 40 : undefined,
        alignSelf: isTablet ? 'center' as const : undefined,
        padding: isTablet ? 30 : (isSmallDevice ? 15 : 25),
        paddingBottom: isTablet ? 40 : (isSmallDevice ? 30 : 50),
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        ...SHADOWS.xl,
    },
    panelCorrect: {
        backgroundColor: '#E8F5E9',
    },
    panelWrong: {
        backgroundColor: '#FFEBEE',
    },
    feedbackHeaderRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
        marginBottom: 25,
    },
    feedbackAvatar: {
        width: isSmallDevice ? 60 : 80,
        height: isSmallDevice ? 60 : 80,
        borderRadius: 18,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
        ...SHADOWS.md,
    },
    feedbackTextCol: {
        flex: 1,
    },
    feedbackTitleText: {
        fontSize: isSmallDevice ? 20 : 24,
        fontWeight: '900',
        marginBottom: 2,
    },
    feedbackSubtitleText: {
        fontSize: 13,
        fontWeight: '700',
        color: COLORS.text.secondary,
    },
    continuePanelBtn: {
        height: 56,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        ...SHADOWS.lg,
    },
    continuePanelBtnText: {
        fontSize: 16,
        fontWeight: '900',
        color: COLORS.white,
    },
    // New Styles
    flashcard: {
        width: '100%',
        height: 300,
        backgroundColor: COLORS.white,
        borderRadius: BORDER_RADIUS.xl,
        ...SHADOWS.lg,
        borderWidth: 3,
        borderColor: COLORS.secondaryLight,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        marginTop: 20,
    },
    flashcardFlipped: {
        borderColor: COLORS.primary,
        backgroundColor: '#FFF8F0',
    },
    flashcardFront: {
        alignItems: 'center',
    },
    flashcardBack: {
        alignItems: 'center',
    },
    flashcardText: {
        fontSize: 32,
        fontWeight: '900',
        color: COLORS.text.primary,
        textAlign: 'center',
        marginBottom: 20,
    },
    flashcardHint: {
        fontSize: 12,
        color: COLORS.text.tertiary,
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    flashcardTranslation: {
        fontSize: 28,
        fontWeight: '900',
        color: COLORS.primary,
        textAlign: 'center',
        marginBottom: 15,
    },
    flashcardExplanation: {
        fontSize: 14,
        color: COLORS.text.secondary,
        textAlign: 'center',
        lineHeight: 20,
    },
    matchingGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        justifyContent: 'center',
        marginTop: 20,
    },
    matchItem: {
        width: '45%',
        paddingVertical: 20,
        paddingHorizontal: 10,
        backgroundColor: COLORS.white,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: COLORS.gray[200],
        alignItems: 'center',
        justifyContent: 'center',
        ...SHADOWS.sm,
    },
    matchItemSelected: {
        borderColor: COLORS.primary,
        backgroundColor: COLORS.secondaryLight,
    },
    matchItemDisabled: {
        borderColor: COLORS.success,
        backgroundColor: '#E8F5E9',
        opacity: 0.6,
    },
    matchText: {
        fontSize: 14,
        fontWeight: '700',
        color: COLORS.text.primary,
        textAlign: 'center',
    },
    soundOptionsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 15,
        justifyContent: 'center',
        marginTop: 20,
    },
    soundOptionCard: {
        width: '45%',
        padding: 20,
        backgroundColor: COLORS.white,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: COLORS.gray[200],
        alignItems: 'center',
        ...SHADOWS.sm,
    },
    soundOptionSelected: {
        borderColor: COLORS.primary,
        backgroundColor: COLORS.secondaryLight,
    },
    soundOptionIcon: {
        fontSize: 32,
        marginBottom: 10,
    },
    soundOptionLabel: {
        fontSize: 12,
        fontWeight: '900',
        color: COLORS.text.secondary,
        textTransform: 'uppercase',
    },
    fillBlanksContainer: {
        marginTop: 20,
    },
    promptBubble: {
        backgroundColor: COLORS.white,
        padding: 25,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: COLORS.gray[100],
        ...SHADOWS.md,
        marginBottom: 30,
    },
    fillBlankSentence: {
        fontSize: 20,
        fontWeight: '700',
        color: COLORS.text.primary,
        lineHeight: 35,
        flexDirection: 'row',
        alignItems: 'center',
        textAlign: 'center',
    },
    blankBox: {
        borderBottomWidth: 3,
        borderBottomColor: COLORS.primary,
        minWidth: 80,
        paddingHorizontal: 10,
        alignItems: 'center',
        marginHorizontal: 5,
        top: 5,
    },
    blankText: {
        fontSize: 20,
        fontWeight: '900',
        color: COLORS.primary,
    },
    fillOptionsBank: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        justifyContent: 'center',
    },
    fillOptionBtn: {
        backgroundColor: COLORS.white,
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: COLORS.gray[200],
        ...SHADOWS.sm,
    },
    fillOptionSelected: {
        borderColor: COLORS.primary,
        backgroundColor: COLORS.secondaryLight,
    },
    fillOptionText: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.text.primary,
    },
    // New More styles
    dialogueContainer: {
        marginTop: 20,
        gap: 20,
    },
    dialogueRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 10,
    },
    dialogueBubble: {
        flex: 1,
        backgroundColor: COLORS.white,
        padding: 15,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: COLORS.gray[100],
        ...SHADOWS.sm,
        position: 'relative',
    },
    dialogueTail: {
        position: 'absolute',
        left: -10,
        top: 15,
        width: 0,
        height: 0,
        borderTopWidth: 8,
        borderBottomWidth: 8,
        borderRightWidth: 10,
        borderTopColor: 'transparent',
        borderBottomColor: 'transparent',
        borderRightColor: COLORS.gray[100],
    },
    dialogueText: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.text.primary,
    },
    dialogueSubText: {
        fontSize: 12,
        color: COLORS.text.tertiary,
        fontStyle: 'italic',
        marginTop: 4,
    },
    feedbackBonusText: {
        fontSize: 14,
        color: COLORS.primary,
        fontWeight: '900',
        marginTop: 4,
    },
    dialogueOptions: {
        marginTop: 30,
        gap: 12,
    },
    dialogueOptionBtn: {
        backgroundColor: COLORS.white,
        padding: 18,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: COLORS.gray[200],
        ...SHADOWS.sm,
    },
    dialogueOptionSelected: {
        borderColor: COLORS.primary,
        backgroundColor: COLORS.secondaryLight,
    },
    dialogueOptionText: {
        fontSize: 15,
        fontWeight: '700',
        color: COLORS.text.primary,
        textAlign: 'center',
    },
    culturalCard: {
        width: '100%',
        height: 400,
        borderRadius: 30,
        overflow: 'hidden',
        ...SHADOWS.xl,
        backgroundColor: COLORS.white,
        marginTop: 10,
    },
    culturalImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    culturalOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    culturalBody: {
        flex: 1,
        padding: 25,
    },
    culturalTitle: {
        fontSize: 24,
        fontWeight: '900',
        color: COLORS.white,
        marginBottom: 15,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
    },
    culturalText: {
        fontSize: 16,
        color: COLORS.white,
        lineHeight: 24,
        fontWeight: '600',
    },
    culturalFooterHint: {
        textAlign: 'center',
        marginTop: 15,
        fontSize: 12,
        color: COLORS.text.tertiary,
        fontWeight: '900',
        textTransform: 'uppercase',
    },
    // Adding options with audio button inner styles
    optionRowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: isSmallDevice ? 12 : 18,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: COLORS.gray[100],
        backgroundColor: COLORS.white,
        ...SHADOWS.sm,
    },
    optionRowContainerSelected: {
        borderColor: COLORS.primary,
        backgroundColor: COLORS.secondaryLight,
    },
    optionAudioBtn: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#F8F9FA',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },
    optionAudioIcon: {
        fontSize: 16,
    },
    fillOptionBtnContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: COLORS.gray[200],
        ...SHADOWS.sm,
        position: 'relative',
        overflow: 'hidden',
    },
    fillOptionAudioBtn: {
        position: 'absolute',
        right: 8,
        top: 8,
        bottom: 8,
        width: 28,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8F9FA',
        borderRadius: 10,
    },
    fillOptionAudioIcon: {
        fontSize: 14,
    },
    // Recording styles
    activeRecordingContainer: {
        alignItems: 'center',
        gap: 20,
    },
    recordingIndicator: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF1F0',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: COLORS.error,
        gap: 10,
    },
    recordingPulse: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: COLORS.error,
    },
    recordingTimerText: {
        fontSize: 20,
        fontWeight: '900',
        color: COLORS.secondary,
    },
    stopRecordingBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.error,
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 30,
        gap: 12,
        ...SHADOWS.md,
    },
    stopIcon: {
        width: 16,
        height: 16,
        backgroundColor: COLORS.white,
        borderRadius: 2,
    },
    stopBtnText: {
        fontSize: 16,
        fontWeight: '900',
        color: COLORS.white,
    },
    recordedAudioControls: {
        alignItems: 'center',
        width: '100%',
    },
    recordedStatusText: {
        fontSize: 14,
        fontWeight: '900',
        color: COLORS.success,
        marginBottom: 20,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    recordedButtonsRow: {
        flexDirection: 'row',
        gap: 15,
        width: '100%',
        justifyContent: 'center',
    },
    recordedPlayBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: COLORS.primary,
        gap: 10,
        ...SHADOWS.sm,
    },
    recordedPlayIcon: {
        fontSize: 16,
        color: COLORS.primary,
    },
    recordedPlayText: {
        fontSize: 14,
        fontWeight: '900',
        color: COLORS.primary,
    },
    recordedRetryBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.gray[100],
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 20,
        gap: 8,
    },
    recordedRetryIcon: {
        fontSize: 16,
    },
    recordedRetryText: {
        fontSize: 14,
        fontWeight: '700',
        color: COLORS.text.secondary,
    },
    quizBadge: {
        backgroundColor: COLORS.secondary,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
        alignSelf: 'center',
        marginBottom: 20,
        borderWidth: 2,
        borderColor: COLORS.primary,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    quizBadgeText: {
        color: COLORS.white,
        fontSize: 12,
        fontWeight: '900',
        letterSpacing: 0.5,
        textTransform: 'uppercase',
    },
});

export default ExerciseScreen;
