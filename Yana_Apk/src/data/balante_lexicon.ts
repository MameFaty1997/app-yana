export interface LexiconEntry {
    balante: string;
    french: string;
    category?: string;
    context?: string;
}

export const BALANTE_LEXICON: LexiconEntry[] = [
    // Salutations
    { balante: "Abe", french: "Bonjour", category: "Salutations" },
    { balante: "Ndeye", french: "Comment vas-tu ?", category: "Salutations" },
    { balante: "Mbedi", french: "Je vais bien", category: "Salutations" },
    // A compléter plus tard
];
