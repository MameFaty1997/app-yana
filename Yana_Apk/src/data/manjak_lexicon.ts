export interface LexiconEntry {
    manjak: string;
    french: string;
    category?: string;
    context?: string;
}

export const MANJAK_LEXICON: LexiconEntry[] = [
    // Salutations & Base (Inspiré de la littérature Manjak)
    { manjak: "Nka banak", french: "Bonjour", category: "Salutations" },
    { manjak: "A-aa", french: "Non", category: "Base" },
    { manjak: "Aa / Yo", french: "Oui", category: "Base" },
    { manjak: "pə-rim", french: "Parole / Mot", category: "Base" },

    // Humains & Famille (Extraits du texte fourni)
    { manjak: "à-nin", french: "Mère", category: "Famille" },
    { manjak: "na-sɩən", french: "Chef / Roi", category: "Identité" },
    { manjak: "ɲan", french: "Personne", category: "Identité" },
    { manjak: "na-mpəlɩ", french: "Jeune fille", category: "Famille" },
    { manjak: "na-ʈak", french: "Forgeron", category: "Identité" },
    { manjak: "na-ʈon", french: "Étranger", category: "Identité" },
    { manjak: "ʊ-pʌʈ", french: "Enfant", category: "Famille" },
    { manjak: "ndə-pʌʈ", french: "Bébé", category: "Famille" },
    { manjak: "ʈə-mak", french: "Grand frère", category: "Famille" },

    // Nombres (Extraits du texte fourni)
    { manjak: "lole", french: "Un (1)", category: "Nombres" },
    { manjak: "təb", french: "Deux (2)", category: "Nombres" },
    { manjak: "wanʈ", french: "Trois (3)", category: "Nombres" },
    { manjak: "bakər", french: "Quatre (4)", category: "Nombres" },
    { manjak: "ɲʌn", french: "Cinq (5)", category: "Nombres" },
    { manjak: "paaj", french: "Six (6)", category: "Nombres" },
    { manjak: "wʌs", french: "Huit (8)", category: "Nombres" },
    { manjak: "ntaja", french: "Dix (10)", category: "Nombres" },

    // Corps (Extraits du texte fourni)
    { manjak: "pə-rʊmaj", french: "Dent", category: "Corps" },
    { manjak: "kə-kəs", french: "Yeux", category: "Corps" },
    { manjak: "ndə-konj", french: "Petit doigt", category: "Corps" },
    { manjak: "ka-baʈ", french: "Oreille", category: "Corps" },
    { manjak: "bien", french: "Tête", category: "Corps" },
    { manjak: "piis", french: "Nez", category: "Corps" },
    { manjak: "piel", french: "Sein", category: "Corps" },

    // Verbes / Actions (Extraits du texte fourni)
    { manjak: "pə-bɩ", french: "Venir", category: "Actions" },
    { manjak: "pə-cel", french: "Sortir", category: "Actions" },
    { manjak: "pə-dan", french: "Boire", category: "Actions" },
    { manjak: "pə-deala", french: "Manger", category: "Actions" },
    { manjak: "pə-lemp", french: "Travailler", category: "Actions" },
    { manjak: "pə-bɩk", french: "Creuser", category: "Actions" },
    { manjak: "pə-lɩk", french: "Puiser", category: "Actions" },

    // Objets & Nature (Extraits du texte fourni)
    { manjak: "ka-to", french: "Maison / Toit", category: "Lieux" },
    { manjak: "ʊ-nkambe", french: "Porc", category: "Animaux" },
    { manjak: "ʊ-gʊk", french: "Poule", category: "Animaux" },
    { manjak: "pə-nciŋ", french: "Flèche / Javelot", category: "Objets" },
    { manjak: "bə-ben", french: "Rônier (arbre)", category: "Nature" },
    { manjak: "ka-buul", french: "Racine", category: "Nature" },
];
