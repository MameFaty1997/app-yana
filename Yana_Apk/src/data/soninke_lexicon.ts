export interface LexiconEntry {
    soninke: string;
    french: string;
    category?: string;
    context?: string;
}

export const SONINKE_LEXICON: LexiconEntry[] = [
    // Salutations
    { soninke: "Salaamu aleykum", french: "la paix soit sur vous", category: "Salutations" },
    { soninke: "An wuyi jam", french: "bonjour (matin)", category: "Salutations" },
    { soninke: "Lella", french: "bon après-midi", category: "Salutations" },
    { soninke: "Sunka", french: "bonsoir", category: "Salutations" },
    { soninke: "Xori an wa jam?", french: "es-tu en paix ?", category: "Salutations" },
    { soninke: "Jam baane", french: "la paix seulement", category: "Salutations" },
    { soninke: "An moxo?", french: "comment vas-tu ?", category: "Salutations" },
    { soninke: "Bisimilla!", french: "bienvenue !", category: "Salutations" },
    { soninke: "Na jam dallandi", french: "reste en paix", category: "Salutations" },

    // Famille & Identité
    { soninke: "Ka-dunko", french: "une famille", category: "Famille" },
    { soninke: "Saaxe", french: "mère", category: "Famille" },
    { soninke: "Faabe", french: "père", category: "Famille" },
    { soninke: "Yaqqe", french: "femme / épouse", category: "Famille" },
    { soninke: "Kiine", french: "mari", category: "Famille" },
    { soninke: "Gidan-yaxare", french: "sœur", category: "Famille" },
    { soninke: "Gidan-yugo", french: "frère", category: "Famille" },
    { soninke: "Lemine", french: "un enfant", category: "Famille" },
    { soninke: "Leminu", french: "des enfants", category: "Famille" },
    { soninke: "Xuso", french: "une fille", category: "Famille" },
    { soninke: "Murunte", french: "un garçon", category: "Famille" },
    { soninke: "to", french: "prénom", category: "Identité" },
    { soninke: "jamu", french: "nom de famille", category: "Identité" },

    // Nombres
    { soninke: "baane / b", french: "un (1)", category: "Nombres" },
    { soninke: "fillo / filli", french: "deux (2)", category: "Nombres" },
    { soninke: "sikko / sikki", french: "trois (3)", category: "Nombres" },
    { soninke: "naxato / naxati", french: "quatre (4)", category: "Nombres" },
    { soninke: "karago / karagi", french: "cinq (5)", category: "Nombres" },
    { soninke: "sixu", french: "six (6)", category: "Nombres" },
    { soninke: "sii", french: "sept (7)", category: "Nombres" },
    { soninke: "seegi", french: "huit (8)", category: "Nombres" },
    { soninke: "kabu", french: "neuf (9)", category: "Nombres" },
    { soninke: "tankarage", french: "dix (10)", category: "Nombres" },
    { soninke: "kome", french: "vingt (20)", category: "Nombres" },
    { soninke: "kamo", french: "cent (100)", category: "Nombres" },
    { soninke: "wujune", french: "mille (1000)", category: "Nombres" },

    // Vie quotidienne
    { soninke: "te", french: "riz", category: "Nourriture" },
    { soninke: "ji", french: "eau", category: "Nourriture / Nature" },
    { soninke: "Su", french: "maison", category: "Lieux" },
    { soninke: "Ti", french: "arbre", category: "Nature" },
    { soninke: "Kiye", french: "soleil", category: "Nature" },
    { soninke: "Xaso", french: "ciel", category: "Nature" },
    { soninke: "Xori", french: "champ / ferme", category: "Nature" },
    { soninke: "Ba", french: "rivière / fleuve", category: "Nature" },
    { soninke: "xaalisi", french: "argent", category: "Base" },
    { soninke: "yakka / Ñii", french: "manger", category: "Actions" },
    { soninke: "minne / Min", french: "boire", category: "Actions" },
    { soninke: "Karan", french: "apprendre / lire", category: "Actions" },
    { soninke: "Taxu", french: "s'asseoir", category: "Actions" },
    { soninke: "Yi", french: "dormir", category: "Actions" },

    // Valeurs
    { soninke: "sooninkaaxu", french: "la culture soninké", category: "Valeurs" },
    { soninke: "gajjaaxu", french: "le courage / la force", category: "Valeurs" },
];
