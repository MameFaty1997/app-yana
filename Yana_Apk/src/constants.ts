
import { LanguageInfo, UserState } from './types';

import { COLORS } from './theme';
export { COLORS };

export const CAURI_IMAGE = 'https://storage.googleapis.com/static.mira.google.com/97e2da06-1933-4f10-909d-09252c5054f3.png';
export const GOLD_CAURI_IMAGE = require('../assets/icons/gold_cauri.png');
export const AFRICAN_MOTIF_URL = 'https://storage.googleapis.com/static.mira.google.com/79155252-4752-4775-8167-270387532321.png';

export const BEAVER_POSES = {
    DEFAULT: require('../assets/bayo/happy.png'),
    THINKING: require('../assets/bayo/thinking.png'),
    HAPPY: require('../assets/bayo/happy.png'),
    SAD: require('../assets/bayo/sad.png'),
    WRITING: require('../assets/bayo/motivated.png'),
    WAVING: require('../assets/bayo/excited.png'),
    GREETING: require('../assets/bayo/greating.png'),
    SKEPTICAL: require('../assets/bayo/skeptical.png'),
    TAKING_NOTE: require('../assets/bayo/taking_note.png'),
    CRYING: require('../assets/bayo/crying.png')
};

export const GUMBA_YANA_ABOUT = "Gümba Yana est une entreprise innovante dédiée à la préservation et à la promotion des patrimoines linguistiques africains. Fondée sur le principe de la 'Teranga' (l'hospitalité) technologique, nous utilisons l'intelligence artificielle pour briser les barrières linguistiques et reconnecter les diasporas à leurs racines. Notre mission est de faire de chaque smartphone un outil de transmission culturelle pour les générations futures.";

export const INITIAL_USER_STATE: UserState = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    xp: 0,
    streak: 0,
    hearts: 5,
    level: 1,
    levelLabel: 'Débutant',
    completedLessons: [],
    completedUnits: [],
    completedStories: [],
    currentLanguage: 'wolof',
    interfaceLanguage: 'fr',
    musicEnabled: true,
    musicVolume: 0.5,
    soundEnabled: true,
    onboardingFinished: false,
    motivations: [],
    dailyGoal: 10,
    age: '',
    experienceLevel: 'Débutant',
    user_plan: 'premium' as const,
    studentCardVerified: false,
    lessonScores: {},
    offlineExercises: {},
    completedTutorSessions: 0,
    scheduledSessions: [],
    languageProgressions: {},
    wisdomHonors: 0,
    treasures: [],
    dailyGoals: {
        lastReset: new Date().toISOString().split('T')[0],
        objectives: [
            { id: '1', label: 'Obtiens 3 solutions parfaites', current: 0, target: 3, reward: 20, type: 'PERFECT_LESSON', isClaimed: false },
            { id: '2', label: 'Complétez 7 exercices', current: 0, target: 7, reward: 15, type: 'EXERCISES_COMPLETED', isClaimed: false },
            { id: '3', label: 'Gagnez 75 XP', current: 0, target: 75, reward: 30, type: 'XP_GAINED', isClaimed: false },
        ]
    }
};

export const LANGUAGES: LanguageInfo[] = [
    { id: 'wolof', name: 'Wolof', flag: '🇸🇳', description: 'Langue de la Teranga et de la diplomatie ouest-africaine.', image: require('../assets/languages/illustration-wolof.png'), isAvailable: true },
    { id: 'pulaar', name: 'Pulaar', flag: '🌍', description: 'Langue millénaire des pasteurs nomades à travers le continent.', image: require('../assets/languages/illustration-peulh.png'), variants: ['Fouta-Toro', 'Fouta-Djallon', 'Macina'], isAvailable: false },
    { id: 'serer', name: 'Serer', flag: '🇸🇳', description: 'Langue sacrée des gardiens des traditions et de la royauté.', image: require('../assets/languages/illustration-serere.png'), isAvailable: false },
    { id: 'diola', name: 'Diola', flag: '🇸🇳', description: 'Langue emblématique de la Casamance, riche en traditions rizicoles.', image: require('../assets/languages/illustration-diola.png'), isAvailable: false },
    { id: 'soninke', name: 'Soninké', flag: '🌍', description: 'Langue des grands voyageurs et bâtisseurs de cités antiques.', image: require('../assets/languages/illustration-soninke.png'), isAvailable: false },
    { id: 'bainouk', name: 'Baïnouk', flag: '🇸🇳', description: 'Langue ancienne et mystique, pilier de l\'identité des premiers habitants de la Casamance.', image: require('../assets/languages/illustration-bainouk.png'), isAvailable: false },
    { id: 'manjak', name: 'Manjak', flag: '🇬🇼', description: 'Langue complexe des maîtres tisserands de la côte ouest.', image: require('../assets/languages/illustration-manjack.png'), isAvailable: false },
    { id: 'balante', name: 'Balante', flag: '🇬🇼', description: 'Langue de résistance et de résilience, liée au travail de la terre.', image: require('../assets/languages/illustration-balante.png'), isAvailable: false },
    { id: 'mankagne', name: 'Mankagne', flag: '🇸🇳', description: 'Langue de fraternité et d\'unité au sein des familles étendues.', image: require('../assets/languages/illustration-mankagne.png'), isAvailable: false },
    { id: 'mandinka', name: 'Mandinka / Socé', flag: '🇸🇳', description: 'Langue de l\'ancien Empire du Mali, appelée Socé au Sénégal, pilier de la culture en Casamance et au Sénégal oriental.', image: require('../assets/languages/illustration-mandinka.png'), isAvailable: false },
    { id: 'bassari', name: 'Bassari', flag: '🇸🇳', description: 'Langue des montagnes du Sénégal oriental, riche en traditions séculaires.', image: require('../assets/languages/illustration-bassari.png'), isAvailable: false },
    { id: 'hassaniya', name: 'Hassaniya', flag: '🇲🇷', description: 'Langue des Maures, carrefour entre les cultures nomades du Sahara et les traditions locales.', image: require('../assets/languages/illustration-peulh.png'), isAvailable: false },
    { id: 'saafi_saafi', name: 'Saafi-Saafi', flag: '🇸🇳', description: 'Langue du peuple Saafi, pilier de la culture Serer du centre du Sénégal.', image: require('../assets/languages/illustration-serere.png'), isAvailable: false },
    { id: 'menik', name: 'Menik', flag: '🇸🇳', description: 'Langue du peuple Bedik, conservatoire vivant de traditions ancestrales.', image: require('../assets/languages/illustration-bassari.png'), isAvailable: false }
];

export const DISCOVERY_CONTENT: Record<string, { type: 'PROVERB' | 'FACT', text: string, translation?: string }[]> = {
    wolof: [
        { type: 'PROVERB', text: "Ndank-ndank mooy japp golo ci ñaay.", translation: "Doucement, on finit par attraper le singe dans la brousse. (Patience)" },
        { type: 'FACT', text: "Le Wolof est la langue véhiculaire la plus parlée au Sénégal, utilisée par 90% de la population." },
        { type: 'PROVERB', text: "Ku am xalis, am mbooloo.", translation: "Celui qui a de l'argent a une foule avec lui." }
    ],
    pulaar: [
        { type: 'PROVERB', text: "Jam waali.", translation: "Bonjour / Bonsoir. (La paix a passé la nuit)" },
        { type: 'PROVERB', text: "BiDDo ronat baamum.", translation: "L'enfant est l'héritier des biens de son père. (Tel père tel fils)" },
        { type: 'FACT', text: "Le Pulaar utilise des mutations de consonnes initiales (alternance) pour marquer les changements grammaticaux." },
        { type: 'FACT', text: "Les Peuls (Fulani) constituent l'un des plus grands groupes ethniques nomades du monde." },
        { type: 'FACT', text: "Le Pulaar possède des variantes majeures comme le Fouta-Toro (Sénégal), le Fouta-Djallon (Guinée) et le Macina (Mali)." }
    ],
    bambara: [
        { type: 'PROVERB', text: "Dɔni-dɔni bɛ nyina fanya la.", translation: "Petit à petit, l'oiseau fait son nid." },
        { type: 'FACT', text: "Le Bambara suit une structure de phrase Sujet-Objet-Verbe (SOV) très stricte." },
        { type: 'FACT', text: "Le pluriel en Bambara se forme simplement en ajoutant le suffixe '-w' ou '-u' à la fin du nom." },
        { type: 'FACT', text: "Le Bambara est la langue nationale du Mali et appartient à la famille des langues Mandé." }
    ],
    serer: [
        { type: 'FACT', text: "Les Sérères sont l'un des plus anciens peuples du Sénégal, connus pour leur profonde spiritualité Sine-Saloum." },
        { type: 'PROVERB', text: "O naxox oxe, o de mbek-a.", translation: "Celui qui demande ne se perd pas. (Curiosité)" }
    ],
    diola: [
        { type: 'FACT', text: "Le Diola (Kassa) est la langue emblématique de la Casamance, riche en traditions liées au riz." },
        { type: 'PROVERB', text: "Kasumay bale !", translation: "Que la paix soit avec toi en abondance !" }
    ],
    fogni: [
        { type: 'FACT', text: "Le Fogny (Kujamaat) utilise un système de numération hybride basé sur 5 (la main), 10 et 20." },
        { type: 'FACT', text: "Dans l'orthographe de Sapir, les voyelles tendues sont marquées par un accent aigu (á, é, í, ó, ú)." },
        { type: 'FACT', text: "Le Fogny est parlé principalement en Basse-Casamance et reste un pilier de la tradition orale Diola." },
        { type: 'PROVERB', text: "Kasumay !", translation: "Bonjour / La paix !" }
    ],
    keerak: [
        { type: 'FACT', text: "Le Keerak (Joola de Kabrousse) possède deux séries de voyelles distinctes influençant la prononciation." },
        { type: 'FACT', text: "Le terme 'Abaraka' (merci) est souvent emprunté au Mandingue par les locuteurs Keerak." },
        { type: 'FACT', text: "Le Keerak est une variante riche en termes rituels et spirituels au sein de la famille Diola." },
        { type: 'PROVERB', text: "Njooko !", translation: "Bonjour ! (Salutation Keerak)" }
    ],
    soninke: [
        { type: 'FACT', text: "En Soninké, le nom de famille (jamu) est crucial pour l'identité et les liens sociaux." },
        { type: 'FACT', text: "La culture Soninké (sooninkaaxu) valorise le commerce, l'agriculture et une forte solidarité communautaire." },
        { type: 'FACT', text: "Le Soninké était la langue de l'Empire du Ghana, le premier grand empire d'Afrique de l'Ouest." },
        { type: 'PROVERB', text: "An wuyi jam.", translation: "Bonjour ! (La paix a passé la nuit)" },
        { type: 'FACT', text: "Bisimilla!", translation: "Bienvenue !" }
    ],
    mandinka: [
        { type: 'FACT', text: "Le Mandinka / Socé désigne la langue parlée par les populations Mandingues au Sénégal et en Gambie." },
        { type: 'FACT', text: "Le terme 'Socé' est spécifiquement utilisé au Sénégal pour désigner les populations Mandingues." },
        { type: 'PROVERB', text: "Badinyaa mooy liggeey.", translation: "La fraternité, c'est le travail ensemble." }
    ],
    bainouk: [
        { type: 'FACT', text: "Les Baïnouks sont considérés comme la population la plus ancienne de la Casamance." },
        { type: 'FACT', text: "Le terme 'Ujaxër', un autre nom pour les Baïnouks, signifie 'peuple accueillant et hospitalier'." },
        { type: 'FACT', text: "L'histoire Baïnouk est marquée par la légende du puissant roi Gana Sira Bana Biaye." },
        { type: 'FACT', text: "Dans le lexique Baïnouk, tous les verbes à l'infinitif commencent par la lettre 'p'." },
        { type: 'FACT', text: "Le Baïnouk possède un système complexe de préfixes pour classer les noms (b-, ka-, u-, p-, etc.)." }
    ],
    mankagne: [
        { type: 'FACT', text: "Le Mancagne est parlé principalement au Sénégal (Casamance) et en Guinée-Bissau." }
    ],
    hassaniya: [
        { type: 'FACT', text: "Le Hassaniya est le dialecte arabe parlé par les Maures du Sahara et du Sahel." },
        { type: 'FACT', text: "C'est une langue riche en poésie et en termes liés à la vie nomade dans le désert." }
    ],
    saafi_saafi: [
        { type: 'FACT', text: "Le Saafi-Saafi est la plus parlée des langues Cangin, principalement dans la région de Thiès." },
        { type: 'FACT', text: "L'ordre des mots en Saafi-Saafi est généralement Sujet-Verbe-Objet (SVO)." },
        { type: 'FACT', text: "En Saafi, les articles définis sont postposés au nom (ex: komak nd- pour 'l'enfant')." },
        { type: 'PROVERB', text: "Faatu raak kubu kanak.", translation: "Fatou a deux enfants. (Structure de possession)" }
    ],
    menik: [
        { type: 'FACT', text: "Le Menik est la langue du peuple Bédik, vivant dans les montagnes de Kédougou." },
        { type: 'FACT', text: "La culture Bédik est célèbre pour ses rituels d'initiation et ses traditions préservées." },
        { type: 'FACT', text: "Le Menik est une langue de tradition orale riche, officiellement codifiée en 2005." }
    ],
    badiaranke: [
        { type: 'FACT', text: "Les Badiaranké vivent à la frontière entre le Sénégal, la Guinée et la Guinée-Bissau." }
    ],
    bayot: [
        { type: 'FACT', text: "Le Bayot est parlé dans le département de Ziguinchor, près de la frontière avec la Guinée-Bissau." }
    ],
    jalonke: [
        { type: 'FACT', text: "Le Jalonké appartient à la famille des langues Mandé, proche du Soussou." }
    ],
    lehar: [
        { type: 'FACT', text: "Le Léhar est parlé dans une petite enclave au nord-ouest de Thiès." }
    ],
    ndut: [
        { type: 'FACT', text: "Le Ndut est une langue Cangin parlée sur les plateaux de Thiès." }
    ],
    noon: [
        { type: 'FACT', text: "Le Noon est la langue Cangin la plus importante après le Saafi." }
    ],
    palor: [
        { type: 'FACT', text: "Le Palor est une langue Cangin très proche du Ndut, parlée près de Pout." }
    ],
    default: [
        { type: 'FACT', text: "L'Afrique compte plus de 2000 langues différentes, soit 1/3 des langues mondiales !" },
        { type: 'FACT', text: "La tradition orale est le pilier de la transmission culturelle dans de nombreuses sociétés africaines." },
        { type: 'FACT', text: "Yana signifie 'C'est ici' ou 'Maintenant' dans plusieurs variantes linguistiques régionales." }
    ]
};

export const UNIT_THEMES = [
    { t: 'Unité 10', d: 'Maîtrise', sub: 'Éloquence et Proverbes' }
];

export const WISDOM_GRADES = [
    { id: 'beginner', minXp: 0, labelKey: 'grade_beginner' as const },
    { id: 'apprentice', minXp: 500, labelKey: 'grade_apprentice' as const },
    { id: 'explorer', minXp: 1500, labelKey: 'grade_explorer' as const },
    { id: 'guide', minXp: 3500, labelKey: 'grade_guide' as const },
    { id: 'master', minXp: 7000, labelKey: 'grade_master' as const },
];

export const CULTURAL_TREASURES = [
    { id: 'kora', nameKey: 'reward_kora' as const, icon: '🎵', category: 'musical', cost: 0 }, // Cost 0 means earned by achievement
    { id: 'mask', nameKey: 'reward_mask' as const, icon: '🎭', category: 'sacred', cost: 0 },
    { id: 'boubou', nameKey: 'reward_boubou' as const, icon: '✨', category: 'prestige', cost: 0 },
];
