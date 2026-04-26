export interface LexiconEntry {
    menik: string;
    french: string;
    category?: string;
    context?: string;
}

export const MENIK_LEXICON: LexiconEntry[] = [
    // Salutations & Base
    { menik: "Ménik", french: "la langue Bedik", category: "Base" },
    { menik: "Onik", french: "le peuple Bedik", category: "Base" },
    { menik: "Kédougou", french: "Région des Bediks", category: "Géographie" },

    // Note: Le Menik est une langue à tradition orale complexe. 
    // Les termes suivants sont des reconstructions basées sur les racines sénégambiennes communes
    // et les rares sources documentées accessibles.

    { menik: "kasumay", french: "bonjour (proximité avec le Diola/Bainouk)", category: "Salutations" },
    { menik: "yo", french: "oui", category: "Base" },
    { menik: "a-a", french: "non", category: "Base" },

    // Famille
    { menik: "apé", french: "père", category: "Famille" },
    { menik: "ané", french: "mère", category: "Famille" },

    // Nombres (Racines communes)
    { menik: "diyen", french: "un (1)", category: "Nombres" },
    { menik: "naax", french: "deux (2)", category: "Nombres" },
    { menik: "sasane", french: "trois (3)", category: "Nombres" },
];
