import { Exercise, ExerciseType } from '../../types';

export const fallbackExercises: Record<string, Exercise[]> = {
    wolof: [
        {
            id: 'fb1',
            type: ExerciseType.CHOOSE_TRANSLATION,
            prompt: "Comment dit-on 'Bonjour' ?",
            content: "Bonjour",
            correctAnswer: "Na nga def",
            options: ["Na nga def", "Jërëjëf", "Ba beneen", "Waaw"],
            avatar: 'bayo',
            explanation: "Na nga def est la salutation standard signifiant 'Comment vas-tu ?'."
        },
        {
            id: 'fb2',
            type: ExerciseType.CHOOSE_TRANSLATION,
            prompt: "Que signifie 'Jërëjëf' ?",
            content: "Jërëjëf",
            correctAnswer: "Merci",
            options: ["Merci", "Pardon", "S'il vous plaît", "Bonjour"],
            avatar: 'bayo',
            explanation: "Jërëjëf est le mot pour dire merci en Wolof."
        },
        {
            id: 'fb3',
            type: ExerciseType.CHOOSE_TRANSLATION,
            prompt: "Comment dit-on 'Oui' ?",
            content: "Oui",
            correctAnswer: "Waaw",
            options: ["Waaw", "Deedeet", "Amna", "Maa ngi fi"],
            avatar: 'bayo',
            explanation: "Waaw signifie Oui."
        }
    ],
    default: [
        {
            id: 'fb-def1',
            type: ExerciseType.CHOOSE_TRANSLATION,
            prompt: "Prêt ?",
            content: "Yana",
            correctAnswer: "Oui",
            options: ["Oui", "Non", "Peut-être", "Plus tard"],
            avatar: 'bayo',
            explanation: "L'aventure commence !"
        },
        {
            id: 'fb-def2',
            type: ExerciseType.CHOOSE_TRANSLATION,
            prompt: "Comment dit-on 'Merci' ?",
            content: "Merci",
            correctAnswer: "Abaraka / Jërëjëf",
            options: ["Abaraka / Jërëjëf", "Bonjour", "Au revoir", "S'il vous plaît"],
            avatar: 'bayo',
            explanation: "La gratitude est une valeur universelle."
        }
    ]
};
