/**
 * Bayo Knowledge Base
 * Consolidates cultural, historical, and linguistic wisdom for the Bayo AI Assistant.
 */

export const BAYO_GENERAL_WISDOM = {
    griots: "Les Kouyaté sont les gardiens de la parole (Djali). Sans eux, les noms des rois tomberaient dans l'oublie. Ils sont la mémoire des hommes.",
    mali_empire: "Fondé par Soundiata Keïta (le fils du Lion et du Buffle). La capitale historique était Niani.",
    mali_meaning: "Mali signifie 'Hippopotame' en Malinké. Soundiata se serait métamorphosé en hippopotame dans le fleuve Sankarani.",
    teranga: "L'hospitalité sénégalaise (Teranga) est un devoir sacré. Accueillir l'étranger définit l'identité du pays.",
    pulaaku: "Le code d'honneur des Peulhs : munyal (patience), semteende (pudeur), et cuucal (courage).",
    wisdom_proverbs: [
        "Le monde est vieux, mais l'avenir sort du passé.",
        "La parole est comme l'eau, une fois versée on ne peut plus la ramasser.",
        "Celui qui ne sait pas d'où il vient ne peut savoir où il va.",
        "Un vieillard qui meurt est une bibliothèque qui brûle."
    ]
};

export const CULTURAL_FACTS: Record<string, string[]> = {
    wolof: [
        "Le Thiéboudienne (Ceebu Jën) est inscrit au patrimoine de l'UNESCO.",
        "Le fondateur du mouridisme est Cheikh Amadou Bamba.",
        "Le Grand Boubou (mbubb) est le vêtement de prestige par excellence."
    ],
    pulaar: [
        "Les Peulhs ont une relation mystique avec la vache, symbole de richesse.",
        "Le Riti (ou nyanyeru) est l'instrument emblématique (violon à une corde).",
        "Le lait est l'aliment de base et de bienvenue (Kosam)."
    ],
    serer: [
        "Le Dieu suprême est Roog Sene.",
        "Les Saltigués sont les devins qui prédisent l'avenir lors du Xoy.",
        "La lutte traditionnelle (Laamb) a ses racines chez les Sérères."
    ],
    diola: [
        "Le Kumpo est un personnage mythique masqué qui danse pendant les fêtes.",
        "La Casamance est le grenier à riz du Sénégal.",
        "Le bois sacré (le Bufan) est au cœur de la spiritualité Diola."
    ],
    mandinka: [
        "Le Kora est l'instrument sacré des griots Malinké.",
        "L'histoire de Soundiata Keïta est l'épopée fondatrice.",
        "Le 'Badinyaa' (fraternité) est la valeur sociale suprême."
    ],
    soninke: [
        "L'Empire du Ghana (Wagadu) est l'ancêtre de la culture Soninké.",
        "Les Soninkés sont connus pour être de grands bâtisseurs et voyageurs.",
        "Le 'Sooninkara' est l'espace culturel et social des Soninkés."
    ]
};

export const BAYO_TRAINING_DATA = {
    top_questions: [
        {
            q: "Qui est Soundiata Keïta ?",
            a: "C'est le lion du Manding, fondateur de l'Empire du Mali au XIIIe siècle. Il a vaincu le roi sorcier Soumaoro Kanté à la bataille de Kirina."
        },
        {
            q: "Pourquoi le castor ?",
            a: "Je suis un castor voyageur ! J'ai choisi cette forme car le castor construit des ponts, tout comme je construis des ponts entre les cultures et les générations."
        },
        {
            q: "C'est quoi les Cauris ?",
            a: "C'étaient les anciennes pièces de monnaie en Afrique. Dans Yana, ils sont en or et récompensent ta sagesse et tes efforts."
        }
    ]
};
