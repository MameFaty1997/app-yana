export interface LexiconEntry {
    hassaniya: string;
    french: string;
    category?: string;
    context?: string;
}

export const HASSANIYA_LEXICON: LexiconEntry[] = [
    // Salutations
    { hassaniya: "Salam Aleïkum", french: "Bonjour / Que la paix soit sur vous", category: "Salutations" },
    { hassaniya: "Aleïkum Salam", french: "Bonjour (réponse)", category: "Salutations" },
    { hassaniya: "Yak la bas ?", french: "Comment ça va ?", category: "Salutations" },
    { hassaniya: "Yak el kheir ?", french: "Tout va bien ?", category: "Salutations" },
    { hassaniya: "Ila el kheir, maashallah", french: "Tout va bien, grâce à Dieu", category: "Salutations" },
    { hassaniya: "Iyyâk mâ yewja chi", french: "Est-ce que vous vous portez bien ?", category: "Salutations" },
    { hassaniya: "Mâ yewjani chi, Al Hamdou billahi", french: "Je me porte bien, louange à Allah !", category: "Salutations" },
    { hassaniya: "Marhaba", french: "Bienvenue / Ravi de te voir", category: "Salutations" },

    // Expressions de base
    { hassaniya: "ana esmi...", french: "je m'appelle...", category: "Expressions" },
    { hassaniya: "wunta ?", french: "et toi ? (masculin)", category: "Expressions" },
    { hassaniya: "tfaddal", french: "je t'en prie / s'il te plaît", category: "Politesse" },
    { hassaniya: "shukran", french: "merci", category: "Politesse" },
    { hassaniya: "Eheh", french: "Oui", category: "Base" },
    { hassaniya: "Ebdei", french: "Non", category: "Base" },
    { hassaniya: "Zeïna", french: "C'est joli / C'est bon / Bien", category: "Qualités" },
    { hassaniya: "Bash ?", french: "Combien ça coûte ?", category: "Questions" },
    { hassaniya: "Men aynta ?", french: "Où ?", category: "Questions" },

    // Adjectifs (États)
    { hassaniya: "fetrân", french: "fatigué", category: "États" },
    { hassaniya: "`a tshân", french: "assoiffé", category: "États" },
    { hassaniya: "ji`ân", french: "affamé", category: "États" },
    { hassaniya: "far hân", french: "content", category: "États" },
    { hassaniya: "minsh tan", french: "occupé", category: "États" },
    { hassaniya: "`ajlân", french: "pressé", category: "États" },
    { hassaniya: "na`sân", french: "avoir sommeil", category: "États" },
    { hassaniya: "bérdân", french: "avoir froid", category: "États" },
    { hassaniya: "hâmiân", french: "avoir chaud", category: "États" },
    { hassaniya: "muhim", french: "important", category: "Qualités" },
    { hassaniya: "minfga`", french: "fâché", category: "États" },

    // Maison & Quotidien
    { hassaniya: "M’borou", french: "Pain", category: "Nourriture" },
    { hassaniya: "A ttay", french: "Thé mauritanien", category: "Nourriture" },
    { hassaniya: "El ma’", french: "Eau", category: "Nourriture" },
    { hassaniya: "Dâr", french: "Maison / Camp", category: "Lieux" },
    { hassaniya: "Kheïma", french: "Tente", category: "Lieux" },
    { hassaniya: "Aïn", french: "Puits", category: "Lieux" },
    { hassaniya: "Barad", french: "Théière", category: "Objets" },
    { hassaniya: "Kas", french: "Verre", category: "Objets" },
    { hassaniya: "Nana", french: "Menthe", category: "Nourriture" },
    { hassaniya: "Tamar", french: "Datte", category: "Nourriture" },

    // Nature & Animaux
    { hassaniya: "Jmel", french: "Chameau", category: "Animaux" },
    { hassaniya: "Méharé", french: "Chameau de selle (voyage)", category: "Animaux" },
    { hassaniya: "Nar", french: "Feu", category: "Nature" },
    { hassaniya: "Jebel", french: "Montagne", category: "Nature" },
    { hassaniya: "Adrar", french: "Montagne / Massif", category: "Nature" },
    { hassaniya: "Oued", french: "Rivière", category: "Nature" },
    { hassaniya: "Nkhal", french: "Palmier", category: "Nature" },
    { hassaniya: "Nojoum", french: "Étoiles", category: "Nature" },
    { hassaniya: "Elkamar", french: "Lune", category: "Nature" },
    { hassaniya: "Sma", french: "Ciel", category: "Nature" },
    { hassaniya: "Chams", french: "Soleil", category: "Nature" },
    { hassaniya: "Mzin", french: "Nuage", category: "Nature" },
    { hassaniya: "Shab", french: "Pluie", category: "Nature" },

    // Pronoms
    { hassaniya: "anâ", french: "je", category: "Pronoms" },
    { hassaniya: "enta", french: "tu (m)", category: "Pronoms" },
    { hassaniya: "enti", french: "tu (f)", category: "Pronoms" },
    { hassaniya: "huwâ", french: "il", category: "Pronoms" },
    { hassaniya: "ehna", french: "nous", category: "Pronoms" },

    // Identité
    { hassaniya: "esem", french: "nom", category: "Identité" },
    { hassaniya: "ktâb", french: "livre", category: "Objets" },
];
