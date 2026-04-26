import { vocabularyDB } from '../data/reference/languages/vocabularyDB';

export interface WordPair {
    word: string;
    clue: string;
    bayoHint?: string; // Additional hint for the Bayo popup
}

export const getWordListForLanguage = (language: string): WordPair[] => {
    // Currently relying on the unified curated vocabulary DB which
    // has the local words uppercase, french clues, and Bayo hints.
    return vocabularyDB;
};
