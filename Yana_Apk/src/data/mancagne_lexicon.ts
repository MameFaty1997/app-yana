export interface LexiconEntry {
    mancagne: string;
    french: string;
    category?: string;
    context?: string;
}

export const MANCAGNE_LEXICON: LexiconEntry[] = [
    // Salutations
    { mancagne: "bnohën¨an", french: "bonjour / salutation", category: "Salutations" },
    { mancagne: "aa", french: "oui !", category: "Salutations" },
    { mancagne: "a-a", french: "non !", category: "Salutations" },
    { mancagne: "yo", french: "oui", category: "Salutations" },
    { mancagne: "ënhëæ", french: "oui (confirmé)", category: "Salutations" },
    { mancagne: "te faan !", french: "à demain !", category: "Salutations" },

    // Identité & Famille
    { mancagne: "nni", french: "ma mère", category: "Famille" },
    { mancagne: "a†in", french: "papa", category: "Famille" },
    { mancagne: "abuk", french: "enfant", category: "Famille" },

    // Nombres
    { mancagne: "ulooolan", french: "un (1)", category: "Nombres" },
    { mancagne: "ætëb", french: "deux (2)", category: "Nombres" },
    { mancagne: "æwajën¨", french: "trois (3)", category: "Nombres" },
];
