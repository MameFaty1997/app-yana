export interface LexiconEntry {
    saafi: string;
    french: string;
    category?: string;
    context?: string;
}

export const SAAFI_LEXICON: LexiconEntry[] = [
    // Salutations & Identité
    { saafi: "laman ndi kur ki hiɗ", french: "le chef du village est venu", category: "Identité / Social" },
    { saafi: "bap ɓoo", french: "mon père", category: "Famille" },
    { saafi: "kubu", french: "enfants", category: "Famille" },
    { saafi: "komak nd-", french: "l'enfant", category: "Famille" },
    { saafi: "komak ci", french: "les enfants", category: "Famille" },

    // Actions (Verbes)
    { saafi: "yakid", french: "grandir", category: "Actions" },
    { saafi: "pookid", french: "casser", category: "Actions" },
    { saafi: "onid", french: "offrir / donner", category: "Actions" },
    { saafi: "cootid", french: "partir / s'en aller", category: "Actions" },
    { saafi: "namiid", french: "manger", category: "Actions" },
    { saafi: "romid", french: "acheter", category: "Actions" },
    { saafi: "kaan", french: "mourir", category: "Actions" },
    { saafi: "guur", french: "cultiver / labourer", category: "Actions" },
    { saafi: "tok", french: "marier", category: "Actions" },
    { saafi: "aasid", french: "entrer", category: "Actions" },
    { saafi: "daksan", french: "inhumer / enterrer", category: "Actions" },

    // Vie Quotidienne & Objets
    { saafi: "kaasi", french: "verre", category: "Objets" },
    { saafi: "kur ka", french: "village", category: "Lieux" },
    { saafi: "saay ci", french: "couscous", category: "Nourriture" },
    { saafi: "yohoon ca", french: "champs / forêt", category: "Lieux" },
    { saafi: "woti", french: "aujourd'hui", category: "Temps" },
    { saafi: "kim", french: "demain", category: "Temps" },
    { saafi: "kulɓa c-", french: "les vêtements", category: "Objets" },
    { saafi: "ay paani", french: "des singes", category: "Nature" },
    { saafi: "bi ɓo?", french: "des personnes", category: "Social" },
    { saafi: "bunta neen", french: "cette porte là-bas", category: "Objets" },
    { saafi: "mbaal", french: "mouton", category: "Nature" },
    { saafi: "yaanaw", french: "blanc", category: "Qualités / Couleurs" },
    { saafi: "ŋkidik", french: "arbre", category: "Nature" },
    { saafi: "njoolid", french: "géant / très grand", category: "Qualités" },
    { saafi: "kosaayid", french: "malade", category: "État" },
    { saafi: "lool", french: "très / beaucoup", category: "Adverbes" },
    { saafi: "haalis", french: "argent", category: "Base" },
    { saafi: "m-pasnga", french: "toilettes", category: "Lieux" },

    // Phrases exemples
    { saafi: "komak ci yakid", french: "les enfants ont grandi", category: "Phrases" },
    { saafi: "kamak ndi pookid kaasi", french: "l'enfant a cassé le verre", category: "Phrases" },
    { saafi: "Modu cootiɗ kur ka", french: "Modou est parti au village", category: "Phrases" },
    { saafi: "a ñamiɗ saƴ ci", french: "il a mangé le couscous", category: "Phrases" },
    { saafi: "woti a cootid yohoon ca", french: "aujourd'hui il est parti aux champs", category: "Phrases" },
    { saafi: "Faatu raak kubu kanak", french: "Fatou a deux enfants", category: "Phrases" },
    { saafi: "a kaan ɗi", french: "il n'est pas mort", category: "Phrases" },

    // Nombres
    { saafi: "yaki", french: "deux (quantité)", category: "Nombres" },
    { saafi: "kanak", french: "deux (comptage)", category: "Nombres" },
];
