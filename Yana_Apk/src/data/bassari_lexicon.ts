export interface LexiconEntry {
    bassari: string;
    french: string;
    category?: string;
    context?: string;
}

export const BASSARI_LEXICON: LexiconEntry[] = [
    // Salutations
    { bassari: "Bëya", french: "Bonjour", category: "Salutations" },
    { bassari: "Ndjé", french: "Comment ça va ?", category: "Salutations" },
    { bassari: "Mëya", french: "Ça va bien", category: "Salutations" },
    // A compléter plus tard
];
