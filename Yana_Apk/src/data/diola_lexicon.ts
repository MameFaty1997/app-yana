export interface LexiconEntry {
    diola: string;
    french: string;
    category?: string;
    context?: string;
}

export const DIOLA_LEXICON: LexiconEntry[] = [
    // ─── SALUTATIONS ────────────────────────────────────────────────────────────
    { diola: "kasumay", french: "bonjour / la paix (salutation générale)", category: "Salutations", context: "Tiré du mot 'kasuumaay' (paix, bonheur)" },
    { diola: "kasumay bale", french: "ça va très bien (réponse positive)", category: "Salutations" },
    { diola: "njooko", french: "bonjour (dialecte Keerak)", category: "Salutations" },
    { diola: "yong jam", french: "bonne journée (Keerak)", category: "Salutations" },
    { diola: "mbe' jam", french: "bonne nuit (Keerak)", category: "Salutations" },
    { diola: "ngiropo", french: "bonsoir (Keerak)", category: "Salutations" },
    { diola: "ijaw", french: "salut / bonjour", category: "Salutations" },
    { diola: "haani", french: "non (réponse négative)", category: "Salutations" },

    // ─── AU REVOIR ───────────────────────────────────────────────────────────────
    { diola: "u kata bo kani", french: "on se voit plus tard", category: "Au revoir" },
    { diola: "bo kani", french: "à plus tard", category: "Au revoir" },

    // ─── REMERCIEMENTS ───────────────────────────────────────────────────────────
    { diola: "yo, jerejef", french: "merci", category: "Remerciements" },
    { diola: "aw jule", french: "merci / sois béni", category: "Remerciements" },

    // ─── IDENTITÉ & FAMILLE ──────────────────────────────────────────────────────
    { diola: "fubil", french: "le nom", category: "Identité" },
    { diola: "papam", french: "père, papa", category: "Famille", context: "Terme de la tradition Jóola Fóoñi" },
    { diola: "iña", french: "mère, maman", category: "Famille", context: "Terme de la tradition Jóola Fóoñi" },
    { diola: "ané", french: "maman (autre dialecte)", category: "Famille" },
    { diola: "abé", french: "papa (autre dialecte)", category: "Famille" },
    { diola: "aseek", french: "femme, épouse", category: "Famille" },
    { diola: "a-ɲɩɩl-aw", french: "enfant", category: "Famille", context: "Pluriel : ba-ɲɩɩl-ab (Keerak)" },

    // ─── LIEUX & ENVIRONNEMENT ───────────────────────────────────────────────────
    { diola: "mumel", french: "eau", category: "Nature" },
    { diola: "fal", french: "fleuve, rivière", category: "Nature" },
    { diola: "ésuk", french: "village, localité", category: "Nature" },
    { diola: "bufan", french: "la forêt / la nature", category: "Nature" },
    { diola: "emmit", french: "le ciel / Dieu", category: "Nature" },
    { diola: "suul", french: "huîtres (récoltées en forêt de mangrove)", category: "Nature" },

    // ─── ANIMAUX ────────────────────────────────────────────────────────────────
    { diola: "eñaab / ɛ-ɲaab-ay", french: "éléphant", category: "Animaux" },
    { diola: "ja-ɲɛr-aw", french: "singe", category: "Animaux" },
    { diola: "ja-lɛh-aw", french: "oiseau", category: "Animaux" },
    { diola: "e-bé", french: "vache", category: "Animaux" },
    { diola: "e-yen-ey", french: "chien", category: "Animaux" },
    { diola: "ekumba", french: "porc, cochon", category: "Animaux" },
    { diola: "enuk", french: "animal (terme général)", category: "Animaux" },
    { diola: "ekumbakaramba", french: "phacochère (porc de la brousse)", category: "Animaux", context: "Mot composé : ekumba (porc) + karamba (brousse)" },
    { diola: "enukureŋ", french: "animal sauvage", category: "Animaux", context: "Mot composé : enuk (animal) + ureŋ (forêt)" },
    { diola: "kasereñaab / kasereñaab", french: "mante religieuse", category: "Animaux", context: "Mot composé : kaser (cuillère) + eñaab (éléphant)" },

    // ─── OBJETS & QUOTIDIEN ──────────────────────────────────────────────────────
    { diola: "ka-sɛra-ak / kaser", french: "cuillère", category: "Objets" },
    { diola: "bʊ-saan-ab", french: "pirogue", category: "Objets" },
    { diola: "bacaac", french: "lit", category: "Objets" },
    { diola: "egol", french: "bâton", category: "Objets", context: "Attention : 'egool' (longue) = coin/angle" },
    { diola: "fúko", french: "tête", category: "Corps" },
    { diola: "burok", french: "travail, activité", category: "Vie quotidienne" },
    { diola: "ro / waaf", french: "chose, objet (terme général)", category: "Vie quotidienne" },

    // ─── TEMPS & LOCALISATION ────────────────────────────────────────────────────
    { diola: "jaat", french: "aujourd'hui", category: "Temps" },
    { diola: "baabe / taate / dáare", french: "ici, en ce lieu", category: "Localisation" },
    { diola: "kasuumaay", french: "la paix, le bonheur, la sérénité", category: "Valeurs" },
    { diola: "mulobaay", french: "querelle, scandale, conflit", category: "Valeurs" },

    // ─── VERBES ESSENTIELS ───────────────────────────────────────────────────────
    { diola: "maŋ", french: "aimer, vouloir, désirer", category: "Verbes" },
    { diola: "juk", french: "voir, regarder", category: "Verbes" },
    { diola: "jaw", french: "aller, partir", category: "Verbes" },
    { diola: "jol", french: "venir, arriver", category: "Verbes" },
    { diola: "ri", french: "manger", category: "Verbes" },
    { diola: "teep", french: "construire, bâtir", category: "Verbes" },
    { diola: "wañ", french: "cultiver, travailler la terre", category: "Verbes" },
    { diola: "kul", french: "fermer", category: "Verbes" },
    { diola: "bif", french: "éventer, venter (vent qui souffle)", category: "Verbes" },
    { diola: "lob", french: "parler, disputer", category: "Verbes" },
    { diola: "lib", french: "trancher, couper", category: "Verbes" },

    // ─── GRAMMAIRE : SUFFIXES DE DÉRIVATION ─────────────────────────────────────
    { diola: "ateepa", french: "maçon (celui qui construit)", category: "Grammaire", context: "Suffixe -a (Agentif) : teep → ateepa" },
    { diola: "awaña", french: "cultivateur, paysan", category: "Grammaire", context: "Suffixe -a (Agentif) : wañ → awaña" },
    { diola: "ékuluma", french: "clé (ce qui sert à fermer)", category: "Grammaire", context: "Suffixe -úma (Instrumental) : kul → ékuluma" },
    { diola: "kábifuma", french: "éventail (ce qui sert à éventer)", category: "Grammaire", context: "Suffixe -úma (Instrumental) : bif → kábifuma" },
    { diola: "kasuumaay", french: "la paix (le fait d'être agréable)", category: "Grammaire", context: "Suffixe -aay (Abstrait) : crée un concept ou qualité" },
    { diola: "ba-bɔɔmɛɛr-ab", french: "la manière de danser", category: "Grammaire", context: "Suffixe -ɛɛr (Manière) — dialecte Keerak" },
    { diola: "hu-geɬum-əh", french: "la hache (outil pour couper)", category: "Grammaire", context: "Suffixe -um (Instrument) — dialecte Keerak" },
    { diola: "imanjut", french: "je ne sais pas (forme négative)", category: "Grammaire", context: "Suffixe -ut (Négation) : maŋ → manj + -ut" },

    // ─── GRAMMAIRE : POSSESSION ──────────────────────────────────────────────────
    { diola: "-om", french: "mon / ma (possession 1ère personne singulier)", category: "Possession", context: "Ex: fúko-om = ma tête" },
    { diola: "-i", french: "ton / ta (possession 2ème personne singulier)", category: "Possession", context: "Ex: fúko-i = ta tête" },
    { diola: "-ool", french: "son / sa (possession 3ème personne singulier)", category: "Possession", context: "Ex: fúko-ool = sa tête" },
    { diola: "-olaal", french: "notre (possession 1ère personne pluriel inclusif)", category: "Possession", context: "Incluant la personne à qui on parle" },
    { diola: "-oli", french: "notre (possession 1ère personne pluriel exclusif)", category: "Possession", context: "Excluant la personne à qui on parle" },
    { diola: "-uul", french: "votre (possession 2ème personne pluriel)", category: "Possession" },
    { diola: "-iil", french: "leur (possession 3ème personne pluriel)", category: "Possession" },

    // ─── GRAMMAIRE : TEMPS VERBAUX ───────────────────────────────────────────────
    { diola: "pan + [verbe]", french: "futur : 'il va / va [faire]'", category: "Temps", context: "Ex: 'pan ajol' = il viendra" },
    { diola: "let + [verbe]", french: "futur négatif : 'ne fera pas'", category: "Temps", context: "Ex: 'let ujaw' = tu n'iras pas" },
    { diola: "nijujuk", french: "j'ai vu (passé accompli)", category: "Temps", context: "Passé souvent marqué par redoublement du radical : juk → jujuk" },

    // ─── NOMBRES ────────────────────────────────────────────────────────────────
    { diola: "ɛ-anɔr", french: "un (1)", category: "Nombres" },
    { diola: "si-subə", french: "deux (2)", category: "Nombres" },
    { diola: "si-həəji", french: "trois (3)", category: "Nombres" },
    { diola: "sɩ-bakɩr", french: "quatre (4)", category: "Nombres" },
    { diola: "hʊtɔk", french: "cinq (5)", category: "Nombres" },
    { diola: "kʊŋɛn", french: "dix (10)", category: "Nombres" },
];
