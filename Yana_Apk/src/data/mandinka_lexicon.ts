export interface LexiconEntry {
    mandinka: string;
    french: string;
    category?: string;
    context?: string;
}

export const MANDINKA_LEXICON: LexiconEntry[] = [
    // Salutations
    { mandinka: "kayira be ?", french: "es-tu en paix / comment ça va ?", category: "Salutations" },
    { mandinka: "kayira dorong", french: "la paix seulement (réponse)", category: "Salutations" },
    { mandinka: "suumool ?", french: "comment vont les gens de la maison ?", category: "Salutations" },
    { mandinka: "ibe di ?", french: "comment vas-tu ?", category: "Salutations" },
    { mandinka: "m'be jang", french: "je suis là / ça va", category: "Salutations" },

    // Au revoir
    { mandinka: "fo waati koteng", french: "à la prochaine fois / au revoir", category: "Au revoir" },
    { mandinka: "fo sini", french: "à demain", category: "Au revoir" },
    { mandinka: "m'be taa", french: "je m'en vais", category: "Au revoir" },

    // Remerciements
    { mandinka: "abaraka", french: "merci", category: "Remerciements" },
    { mandinka: "Alla ma xiri", french: "que Dieu te bénisse (commun aux Mandé)", category: "Remerciements" },

    // Politeness
    { mandinka: "dukhaare", french: "s'il vous plaît", category: "Politesse" },
    { mandinka: "hakutu ma", french: "pardonne-moi / excuse-moi", category: "Politesse" },

    // Famille & Identité
    { mandinka: "baa", french: "maman", category: "Famille" },
    { mandinka: "faa", french: "papa", category: "Famille" },
    { mandinka: "kotoo", french: "grand frère/soeur", category: "Famille" },
    { mandinka: "dogoo", french: "petit frère/soeur", category: "Famille" },
    { mandinka: "toojuo", french: "prénom", category: "Identité" },
    { mandinka: "kontong", french: "nom de famille", category: "Identité" },
    { mandinka: "itoojuo be di ?", french: "quel est ton prénom ?", category: "Identité" },

    // Vie quotidienne
    { mandinka: "maanoo", french: "riz", category: "Nourriture" },
    { mandinka: "jiio", french: "eau", category: "Nourriture" },
    { mandinka: "kodoo", french: "argent", category: "Base" },
    { mandinka: "suuo", french: "maison", category: "Base" },
    { mandinka: "domo", french: "manger", category: "Actions" },
    { mandinka: "miñi", french: "boire", category: "Actions" },

    // Valeurs
    { mandinka: "badinyaa", french: "la fraternité / l'harmonie sociale", category: "Valeurs" },
    { mandinka: "terangayaa", french: "l'hospitalité", category: "Valeurs" },
];
