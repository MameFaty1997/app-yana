export interface Footnote {
    id: number;
    term: string;
    explanation: string;
}

export interface VocabWord {
    word: string;
    definition: string;
    etymology?: string;
}

export interface Illustration {
    prompt: string;
    path?: any;
    altText: string;
    position: 'top' | 'bottom' | 'full';
}

export interface StoryScene {
    id: string;
    paragraph: string;
    illustration: Illustration;
    footnotes: Footnote[];
    vocabWords: VocabWord[];
    audioPath?: string;
}

export interface Story {
    id: string;
    title: string;
    subtitle: string;
    description?: string;
    ethnie: string;
    ethnieImg: string;
    difficulty: 'facile' | 'moyen' | 'avancé';
    ageMin: number;
    readingTime: number;
    coverColor: string;
    scenes: StoryScene[];
    moralLesson: string;
}
