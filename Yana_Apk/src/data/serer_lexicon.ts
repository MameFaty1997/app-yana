export interface LexiconEntry {
    serer: string;
    french: string;
    category?: string;
    context?: string;
}

export const SERER_LEXICON: LexiconEntry[] = [
    // Salutations
    { serer: "namm ?", french: "comment ça va ? / quoi de neuf ?", category: "Salutations" },
    { serer: "jam som", french: "la paix seulement (réponse)", category: "Salutations" },
    { serer: "nu mbek-o ?", french: "comment vas-tu ?", category: "Salutations" },
    { serer: "i mbek-a", french: "je vais bien", category: "Salutations" },
    { serer: "naka bes bi", french: "comment se passe la journée ?", category: "Salutations" },
    { serer: "naka subaka si", french: "comment se passe la matinée ?", category: "Salutations" },
    { serer: "naka fenaan si", french: "comment s'est passée la nuit ?", category: "Salutations" },
    { serer: "mbe xene ?", french: "tout va bien ? / es-tu là ?", category: "Salutations" },

    // Au revoir
    { serer: "bo leng", french: "à la prochaine fois / au revoir", category: "Au revoir" },
    { serer: "i njee-a", french: "je m'en vais", category: "Au revoir" },
    { serer: "nuyal ma waa kër fa", french: "salue la famille", category: "Au revoir" },
    { serer: "waaw, i njee-a", french: "oui, je pars", category: "Au revoir" },

    // Remerciements
    { serer: "jerejééf", french: "merci", category: "Remerciements" },
    { serer: "oxoa jerejééf", french: "merci à lui/elle", category: "Remerciements" },
    { serer: "Yalla o njiij-ong", french: "que Dieu te récompense", category: "Remerciements" },

    // Politesse
    { serer: "Yalla fa-ong", french: "Dieu te le revaudra", category: "Politesse" },
    { serer: "baal ma", french: "pardonne-moi / excuse-moi", category: "Politesse" },

    // Famille & Identité
    { serer: "iman", french: "maman", category: "Famille" },
    { serer: "ofan", french: "papa", category: "Famille" },
    { serer: "o doom", french: "enfant", category: "Famille" },
    { serer: "o mèg", french: "grand frère/soeur", category: "Famille" },
    { serer: "o tew", french: "petit frère/soeur", category: "Famille" },
    { serer: "bind-o", french: "prénom", category: "Identité" },
    { serer: "ndis-o", french: "nom de famille", category: "Identité" },
    { serer: "nam mbindu fo ?", french: "comment t'appelles-tu ?", category: "Identité" },

    // Nature & Lieux
    { serer: "o maad", french: "le roi", category: "Culture" },
    { serer: "o fari", french: "la reine", category: "Culture" },
    { serer: "mbay", french: "agriculture", category: "Métiers" },
    { serer: "o leel", french: "la place publique / initiation", category: "Culture" },
    { serer: "xaalis", french: "argent", category: "Base" },
    { serer: "ndox", french: "eau", category: "Base" },
    { serer: "ceeb", french: "riz", category: "Base" },

    // Actions
    { serer: "ñiam", french: "manger", category: "Actions" },
    { serer: "yer", french: "boire", category: "Actions" },
    { serer: "yah", french: "partir", category: "Actions" },
    { serer: "gar", french: "venir", category: "Actions" },
    { serer: "saat", french: "dire / parler", category: "Actions" },

    // Éducation & École
    { serer: "Aca tablo!", french: "Au tableau !", category: "Éducation" },
    { serer: "A faaxa!", french: "C'est bien !", category: "Éducation" },
    { serer: "Wo jegtu", french: "À ton tour / À toi", category: "Éducation" },
    { serer: "O elew", french: "Élève", category: "Éducation" },
    { serer: "O caajangin", french: "Maître / Enseignant", category: "Éducation" },
    { serer: "A kaye", french: "Cahier", category: "Éducation" },
    { serer: "A arduwaas", french: "Ardoise", category: "Éducation" },
    { serer: "A kere", french: "Craie", category: "Éducation" },
    { serer: "Cangel", french: "Leçon", category: "Éducation" },
    { serer: "Samandaal", french: "Exemple", category: "Éducation" },
    { serer: "A pind", french: "Écriture / Écrit", category: "Éducation" },
    { serer: "Niir", french: "Lire", category: "Éducation" },
    { serer: "Bind", french: "Écrire", category: "Éducation" },
    { serer: "Lim", french: "Compter", category: "Éducation" },
    { serer: "Gim", french: "Chanter", category: "Actions" },

    // Animaux
    { serer: "Njogoy", french: "Lion", category: "Animaux" },
    { serer: "Muus", french: "Chat", category: "Animaux" },
    { serer: "Pis", french: "Cheval", category: "Animaux" },
    { serer: "Fambe", french: "Chèvre", category: "Animaux" },
    { serer: "O ɓox", french: "Chien", category: "Animaux" },
    { serer: "Fañiig", french: "Éléphant", category: "Animaux" },
    { serer: "Mbaal", french: "Mouton", category: "Animaux" },
    { serer: "Naak", french: "Vache", category: "Animaux" },
    { serer: "Liƥ", french: "Poisson", category: "Animaux" },

    // Temps & Nombres
    { serer: "Xaye", french: "Aujourd'hui", category: "Temps" },
    { serer: "O feet", french: "Demain", category: "Temps" },
    { serer: "Faak", french: "Hier", category: "Temps" },
    { serer: "Leng", french: "Un (1)", category: "Nombres" },
    { serer: "Sik", french: "Deux (2)", category: "Nombres" },
    { serer: "Tadik", french: "Trois (3)", category: "Nombres" },
    { serer: "Nahik", french: "Quatre (4)", category: "Nombres" },
    { serer: "Ƥetik", french: "Cinq (5)", category: "Nombres" },
    { serer: "Ɓetaa-folenɡ", french: "Six (6)", category: "Nombres" },
    { serer: "Ɓetuu-ƭik", french: "Sept (7)", category: "Nombres" },
    { serer: "Ɓetuu-tadik", french: "Huit (8)", category: "Nombres" },
    { serer: "Ɓetuu-nahik", french: "Neuf (9)", category: "Nombres" },
    { serer: "Xarɓaxay", french: "Dix (10)", category: "Nombres" },

    // Valeurs
    { serer: "mbegeel", french: "l'amour", category: "Valeurs" },
    { serer: "ngorm", french: "l'honneur / la dignité", category: "Valeurs" },
    { serer: "teduungal", french: "l'hospitalité", category: "Valeurs" },
];
