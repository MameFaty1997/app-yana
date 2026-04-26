import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from '../theme';
import { Button, ProgressBar, Bayo } from '../components/ui';

const { width } = Dimensions.get('window');

type ExerciseType = 'AUDIO' | 'VISUAL' | 'SYNTAX' | 'QUIZ';

interface Exercise {
    id: string;
    type: ExerciseType;
    question: string;
    translation?: string;
    options?: string[];
    correctAnswer: string;
    imageUrl?: string;
    audioUrl?: string;
}

const MOCK_EXERCISES: Exercise[] = [
    {
        id: '1',
        type: 'VISUAL',
        question: 'Lequel est "Le Marché" ?',
        options: ['Marche bi', 'Keur gui', 'Ecole bi', 'Bitik bi'],
        correctAnswer: 'Marche bi',
        imageUrl: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=400&h=400&fit=crop',
    },
    {
        id: '2',
        type: 'AUDIO',
        question: 'Répétez après Bayo',
        translation: 'Comment allez-vous ?',
        correctAnswer: 'Naka nga def ?',
    },
    {
        id: '3',
        type: 'SYNTAX',
        question: 'Reconstruisez la phrase : "Je vais bien"',
        options: ['Ma', 'ngi', 'fi', 'rek'],
        correctAnswer: 'Ma ngi fi rek',
    },
];

const ExerciseScreen: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isAnswerChecked, setIsAnswerChecked] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    const currentExercise = MOCK_EXERCISES[currentIndex];
    const progress = (currentIndex + 1) / MOCK_EXERCISES.length;

    const handleCheck = () => {
        if (!selectedOption) return;

        const correct = selectedOption === currentExercise.correctAnswer ||
            (currentExercise.type === 'SYNTAX' && selectedOption === currentExercise.correctAnswer);

        setIsCorrect(correct);
        setIsAnswerChecked(true);
    };

    const handleContinue = () => {
        if (currentIndex < MOCK_EXERCISES.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setSelectedOption(null);
            setIsAnswerChecked(false);
        } else {
            // Fin de la leçon
            console.log('Leçon terminée !');
        }
    };

    const renderExerciseContent = () => {
        switch (currentExercise.type) {
            case 'VISUAL':
                return (
                    <View style={styles.exerciseContent}>
                        <Text style={styles.questionText}>{currentExercise.question}</Text>
                        <View style={styles.visualGrid}>
                            {currentExercise.options?.map((option) => (
                                <TouchableOpacity
                                    key={option}
                                    style={[
                                        styles.visualCard,
                                        selectedOption === option && styles.selectedOption,
                                    ]}
                                    onPress={() => setSelectedOption(option)}
                                    disabled={isAnswerChecked}
                                >
                                    <Image source={{ uri: currentExercise.imageUrl }} style={styles.visualImage} />
                                    <Text style={styles.optionText}>{option}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                );
            case 'AUDIO':
                return (
                    <View style={styles.exerciseContent}>
                        <Text style={styles.questionText}>{currentExercise.question}</Text>
                        <Text style={styles.translationText}>{currentExercise.translation}</Text>

                        <View style={styles.audioContainer}>
                            <Bayo size="lg" emotion={isAnswerChecked ? (isCorrect ? 'happy' : 'sad') : 'thinking'} />
                            <TouchableOpacity style={styles.micButton}>
                                <Text style={styles.micIcon}>🎙️</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                );
            case 'SYNTAX':
                return (
                    <View style={styles.exerciseContent}>
                        <Text style={styles.questionText}>{currentExercise.question}</Text>
                        <View style={styles.syntaxContainer}>
                            {/* Zone de construction */}
                            <View style={styles.syntaxDropZone}>
                                <Text style={styles.syntaxOutput}>{selectedOption || '_'}</Text>
                            </View>

                            {/* Blocs de mots */}
                            <View style={styles.syntaxOptions}>
                                {currentExercise.options?.map((word) => (
                                    <TouchableOpacity
                                        key={word}
                                        style={styles.wordBlock}
                                        onPress={() => setSelectedOption(prev => prev ? prev + ' ' + word : word)}
                                        disabled={isAnswerChecked}
                                    >
                                        <Text style={styles.wordText}>{word}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    </View>
                );
            default:
                return null;
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Top Bar */}
            <View style={styles.topBar}>
                <TouchableOpacity style={styles.closeButton}>
                    <Text style={styles.closeIcon}>✕</Text>
                </TouchableOpacity>
                <View style={styles.progressWrapper}>
                    <ProgressBar progress={progress} height={12} />
                </View>
                <View style={styles.livesContainer}>
                    <Text style={styles.livesIcon}>❤️</Text>
                    <Text style={styles.livesCount}>5</Text>
                </View>
            </View>

            {/* Exercise Content */}
            <View style={styles.main}>
                {renderExerciseContent()}
            </View>

            {/* Feedback Drawer / Footer */}
            <View style={[
                styles.footer,
                isAnswerChecked && (isCorrect ? styles.footerCorrect : styles.footerIncorrect)
            ]}>
                {isAnswerChecked && (
                    <View style={styles.feedbackInfo}>
                        <View style={styles.feedbackHeaderRow}>
                            <Text style={[
                                styles.feedbackTitle,
                                { color: isCorrect ? COLORS.success : COLORS.primary }
                            ]}>
                                {isCorrect ? 'Excellent ! 🎉' : 'Bouclier de Teranga 🛡️'}
                            </Text>
                            {!isCorrect && <View style={styles.shieldPulse} />}
                        </View>
                        <Text style={styles.feedbackEtymology}>
                            {isCorrect
                                ? 'Tu as l\'oreille d\'un natif !'
                                : 'Eksil ag Teranga ! L\'erreur est le début de la science. La bonne réponse est : ' + currentExercise.correctAnswer}
                        </Text>
                    </View>
                )}

                <Button
                    title={isAnswerChecked ? 'CONTINUER' : 'VÉRIFIER'}
                    variant={isAnswerChecked ? 'primary' : (selectedOption ? 'primary' : 'outlined')}
                    onPress={isAnswerChecked ? handleContinue : handleCheck}
                    fullWidth
                    style={isAnswerChecked && !isCorrect ? { backgroundColor: COLORS.error } : {}}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.md,
        gap: SPACING.md,
    },
    closeButton: {
        padding: SPACING.sm,
    },
    closeIcon: {
        fontSize: 24,
        color: COLORS.gray[400],
        fontWeight: 'bold',
    },
    progressWrapper: {
        flex: 1,
    },
    livesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.xs,
    },
    livesIcon: {
        fontSize: 18,
    },
    livesCount: {
        ...TYPOGRAPHY.subtitle2,
        color: COLORS.heart,
        fontWeight: '700',
    },
    main: {
        flex: 1,
        padding: SPACING.xl,
    },
    exerciseContent: {
        flex: 1,
    },
    questionText: {
        ...TYPOGRAPHY.h2,
        color: COLORS.text.primary,
        marginBottom: SPACING.lg,
    },
    translationText: {
        ...TYPOGRAPHY.body1,
        color: COLORS.text.secondary,
        fontStyle: 'italic',
        marginBottom: SPACING.xl,
    },
    visualGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: SPACING.md,
        justifyContent: 'space-between',
    },
    visualCard: {
        width: '48%',
        backgroundColor: COLORS.white,
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.sm,
        borderWidth: 2,
        borderColor: COLORS.gray[200],
        ...SHADOWS.sm,
    },
    selectedOption: {
        borderColor: COLORS.primary,
        backgroundColor: COLORS.background.secondary,
    },
    visualImage: {
        width: '100%',
        height: 120,
        borderRadius: BORDER_RADIUS.md,
        marginBottom: SPACING.sm,
    },
    optionText: {
        ...TYPOGRAPHY.subtitle2,
        textAlign: 'center',
        color: COLORS.text.primary,
    },
    audioContainer: {
        alignItems: 'center',
        marginTop: SPACING.xxxl,
    },
    micButton: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: SPACING.xxl,
        ...SHADOWS.lg,
    },
    micIcon: {
        fontSize: 40,
    },
    syntaxContainer: {
        flex: 1,
    },
    syntaxDropZone: {
        minHeight: 100,
        borderBottomWidth: 2,
        borderBottomColor: COLORS.gray[200],
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: SPACING.xxxl,
    },
    syntaxOutput: {
        ...TYPOGRAPHY.h3,
        color: COLORS.primary,
    },
    syntaxOptions: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: SPACING.sm,
        justifyContent: 'center',
    },
    wordBlock: {
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.md,
        borderRadius: BORDER_RADIUS.md,
        borderWidth: 2,
        borderColor: COLORS.gray[200],
        backgroundColor: COLORS.white,
        ...SHADOWS.sm,
    },
    wordText: {
        ...TYPOGRAPHY.subtitle2,
        color: COLORS.text.primary,
    },
    footer: {
        padding: SPACING.xl,
        borderTopWidth: 2,
        borderTopColor: COLORS.gray[100],
        backgroundColor: COLORS.white,
    },
    footerCorrect: {
        backgroundColor: '#E8F5E9',
        borderTopColor: '#C8E6C9',
    },
    footerIncorrect: {
        backgroundColor: '#FFF7ED',
        borderTopColor: '#FFEDD5',
    },
    feedbackInfo: {
        marginBottom: SPACING.lg,
    },
    feedbackTitle: {
        ...TYPOGRAPHY.h3,
        marginBottom: SPACING.xs,
    },
    feedbackEtymology: {
        ...TYPOGRAPHY.body2,
        color: COLORS.text.secondary,
        fontWeight: '600',
    },
    feedbackHeaderRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    shieldPulse: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: COLORS.primary,
        opacity: 0.6,
    }
});

export default ExerciseScreen;
