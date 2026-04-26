export interface LexiconEntry {
    bainouk: string;
    french: string;
    category?: string;
    context?: string;
}

export const BAINOUK_LEXICON: LexiconEntry[] = [
    // Salutations
    { bainouk: "kasumay", french: "bonjour / comment ça va ?", category: "Salutations", context: "Similaire au Diola du fait de la proximité géographique." },
    { bainouk: "kasumay bale", french: "ça va très bien (réponse)", category: "Salutations" },
    { bainouk: "uju", french: "salut / bonjour", category: "Salutations" },
    { bainouk: "naka subaka si", french: "comment se passe la matinée ?", category: "Salutations" },
    { bainouk: "bnohën¨an", french: "bonjour / salutation", category: "Salutations" },
    { bainouk: "pwul manteeña", french: "saluer / donner les nouvelles", category: "Salutations", context: "Utilisé pour demander des nouvelles (créole source)." },
    { bainouk: "aa", french: "oui !", category: "Salutations" },
    { bainouk: "a-a", french: "non !", category: "Salutations" },
    { bainouk: "yo", french: "oui", category: "Salutations" },
    { bainouk: "ënhëæ", french: "oui (confirmé)", category: "Salutations" },
    { bainouk: "te faan !", french: "à demain !", category: "Salutations" },
    { bainouk: "ihaahi", french: "merci", category: "Salutations", context: "Expression de gratitude, littéralement 'tu t'es donné de la peine'." },

    // Au revoir
    { bainouk: "wanu", french: "au revoir", category: "Au revoir" },
    { bainouk: "bo kani", french: "à plus tard", category: "Au revoir" },

    // Remerciements
    { bainouk: "nu bari", french: "merci (emprunt Soninké/Mandingue souvent utilisé)", category: "Remerciements" },
    { bainouk: "fanga", french: "merci / force", category: "Remerciements" },

    // Politesse
    { bainouk: "di de die", french: "s'il vous plaît", category: "Politesse" },

    // Famille & Identité
    { bainouk: "katim ki naan ko...", french: "mon nom est...", category: "Identité" },
    { bainouk: "inyé", french: "moi / je", category: "Identité" },
    { bainouk: "aw", french: "toi / tu", category: "Identité" },
    { bainouk: "fubil", french: "le nom", category: "Identité" },
    { bainouk: "apé", french: "papa", category: "Famille" },
    { bainouk: "ané", french: "maman", category: "Famille" },
    { bainouk: "nni", french: "ma mère", category: "Famille" },
    { bainouk: "a†in", french: "père / son père", category: "Famille" },
    { bainouk: "ahar", french: "épouse", category: "Famille" },
    { bainouk: "ayin", french: "mari", category: "Famille" },
    { bainouk: "abuk", french: "enfant (fils ou fille)", category: "Famille" },
    { bainouk: "abab", french: "petit-enfant", category: "Famille" },
    { bainouk: "naweek", french: "frère aîné / sœur aînée", category: "Famille" },
    { bainouk: "a¨a", french: "frère cadet / sœur cadette", category: "Famille" },
    { bainouk: "babu", french: "eux / les gens", category: "Identité" },
    { bainouk: "bniim", french: "mariage", category: "Relations" },
    { bainouk: "a-wol / abuk", french: "enfant", category: "Famille" }, // Added/Modified

    // Nombres
    { bainouk: "ulooolan", french: "un (1)", category: "Nombres" },
    { bainouk: "ætëb / nak", french: "deux (2)", category: "Nombres" },
    { bainouk: "æwajën¨", french: "trois (3)", category: "Nombres" },
    { bainouk: "æbaakër", french: "quatre (4)", category: "Nombres" },
    { bainouk: "kañeen", french: "cinq (5)", category: "Nombres" },
    { bainouk: "paaj", french: "six (6)", category: "Nombres" },
    { bainouk: "paaj na uloæ", french: "sept (7)", category: "Nombres" },
    { bainouk: "bakreæ", french: "huit (8)", category: "Nombres" },
    { bainouk: "kañeen kaloæ", french: "neuf (9)", category: "Nombres" },
    { bainouk: "iñeen", french: "dix (10)", category: "Nombres" },

    // Verbes (Actions) - Commencent par 'p'
    { bainouk: "pde", french: "manger", category: "Actions" },
    { bainouk: "pdaan", french: "boire", category: "Actions" },
    { bainouk: "pya", french: "aller / partir", category: "Actions" },
    { bainouk: "pbi", french: "venir", category: "Actions" },
    { bainouk: "pwin", french: "voir / remarquer", category: "Actions" },
    { bainouk: "pte", french: "entendre / comprendre", category: "Actions" },
    { bainouk: "pjuk", french: "apprendre / étudier", category: "Actions" },
    { bainouk: "pñaak", french: "saigner", category: "Actions" },
    { bainouk: "pñaamën¨", french: "mâcher", category: "Actions" },
    { bainouk: "pwaap", french: "vendre", category: "Actions" },
    { bainouk: "pnug", french: "acheter", category: "Actions" },
    { bainouk: "ppën", french: "sortir", category: "Actions" },
    { bainouk: "pna¨", french: "être debout / s'arrêter", category: "Actions" },

    // Adjectifs & Qualités
    { bainouk: "udëm", french: "grand / renommé", category: "Qualités" },
    { bainouk: "ppo¨", french: "petit", category: "Qualités" },
    { bainouk: "plil", french: "bon / agréable", category: "Qualités" },
    { bainouk: "pfaað", french: "blanc", category: "Couleurs" },
    { bainouk: "pjën", french: "noir", category: "Couleurs" },
    { bainouk: "ujeenkal", french: "rouge", category: "Couleurs" },
    { bainouk: "pwiir", french: "froid / se refroidir", category: "Qualités" },
    { bainouk: "pyiik", french: "chaud / faire chaud", category: "Qualités" },

    // Nature & Vie quotidienne
    { bainouk: "gu", french: "eau", category: "Base" },
    { bainouk: "si", french: "riz", category: "Base" },
    { bainouk: "maro", french: "argent", category: "Base" },
    { bainouk: "katoh", french: "maison / bâtiment", category: "Vie Quotidienne" },
    { bainouk: "itaka", french: "argent", category: "Vie Quotidienne" },
    { bainouk: "meel", french: "eau", category: "Vie Quotidienne" },
    { bainouk: "poot", french: "vin / boisson", category: "Vie Quotidienne" },
    { bainouk: "bko", french: "arbre / plante / médicament", category: "Nature" },
    { bainouk: "pliik", french: "puits", category: "Nature" },
    { bainouk: "u†ubal", french: "pluie / année", category: "Nature" },
    { bainouk: "ba¨i", french: "ciel", category: "Nature" },
    { bainouk: "unuur", french: "soleil / jour", category: "Nature" },
    { bainouk: "pli", french: "lune / mois", category: "Nature" },
    { bainouk: "mbo†", french: "terre / sol", category: "Nature" },
    { bainouk: "kacah", french: "panier", category: "Vie Quotidienne" },
    { bainouk: "pnkaara", french: "grain d'arachide", category: "Nature" },

    // Valeurs / Culture
    { bainouk: "Ujaxër", french: "peuple accueillant", category: "Valeurs" },
    { bainouk: "Gana Sira Bana", french: "Roi mythique Baïnouk", category: "Culture" },
    { bainouk: "diola", french: "Diola (peuple voisin)", category: "Culture" },
];
