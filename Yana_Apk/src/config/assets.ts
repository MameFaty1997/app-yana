// Assets Configuration
// Centralise tous les chemins d'images et assets de l'application

// Images de Bayo (Mascotte)
export const BAYO_IMAGES = {
    happy: require('../../assets/bayo/happy.png'),
    excited: require('../../assets/bayo/excited.png'),
    thinking: require('../../assets/bayo/thinking.png'),
    sad: require('../../assets/bayo/sad.png'),
    motivated: require('../../assets/bayo/motivated.png'),
    greeting: require('../../assets/bayo/greating.png'),
    crying: require('../../assets/bayo/crying.png'),
    skeptical: require('../../assets/bayo/skeptical.png'),
    taking_note: require('../../assets/bayo/taking_note.png'),
};

// URLs de fallback pour Bayo
export const BAYO_FALLBACK_URLS = {
    happy: 'https://api.dicebear.com/7.x/fun-emoji/png?seed=bayo-happy&backgroundColor=FDF7F0',
    excited: 'https://api.dicebear.com/7.x/fun-emoji/png?seed=bayo-excited&backgroundColor=FDF7F0',
    thinking: 'https://api.dicebear.com/7.x/fun-emoji/png?seed=bayo-thinking&backgroundColor=FDF7F0',
    sad: 'https://api.dicebear.com/7.x/fun-emoji/png?seed=bayo-sad&backgroundColor=FDF7F0',
    motivated: 'https://api.dicebear.com/7.x/fun-emoji/png?seed=bayo-motivated&backgroundColor=FDF7F0',
};

// Informations sur les langues africaines avec illustrations
export const AFRICAN_LANGUAGES = [
    {
        code: 'wolof',
        name: 'Wolof',
        nativeName: 'Wolof',
        flag: '🇸🇳',
        country: 'Sénégal',
        speakers: '5M+',
        description: 'Langue de la Teranga et de la diplomatie ouest-africaine',
        culturalNote: 'Le Wolof est la langue véhiculaire du Sénégal, parlée par 90% de la population',
        image: require('../../assets/languages/illustration-wolof.png'),
        imageUrl: 'https://images.unsplash.com/photo-1518384401463-d3876163c195?w=800&h=400&fit=crop',
        hasIllustration: true,
    },
    {
        code: 'serer',
        name: 'Serer',
        nativeName: 'Seereer',
        flag: '🇸🇳',
        country: 'Sénégal',
        speakers: '1.5M+',
        description: 'Langue sacrée des gardiens des traditions et de la royauté',
        culturalNote: 'Les Serer ont conservé leurs traditions ancestrales et leur système royal',
        image: require('../../assets/languages/illustration-serere.png'),
        imageUrl: 'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=800&h=400&fit=crop',
        hasIllustration: true,
    },
    {
        code: 'diola',
        name: 'Diola',
        nativeName: 'Joola',
        flag: '🇸🇳',
        country: 'Casamance',
        speakers: '500K+',
        description: 'Langue forestière riche en rythmes et en spiritualité naturelle',
        culturalNote: 'Le Diola est parlé en Casamance, région connue pour sa biodiversité',
        image: require('../../assets/languages/illustration-diola.png'),
        imageUrl: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&h=400&fit=crop',
        hasIllustration: true,
    },
    {
        code: 'pulaar',
        name: 'Pulaar',
        nativeName: 'Pulaar',
        flag: '🌍',
        country: 'Sahel',
        speakers: '25M+',
        description: 'Langue millénaire des pasteurs nomades à travers le continent',
        culturalNote: 'Les Peuls constituent l\'un des plus grands groupes ethniques nomades du monde',
        image: require('../../assets/languages/illustration-peulh.png'),
        imageUrl: 'https://images.unsplash.com/photo-1523810192022-5a0fb9aa7bc8?w=800&h=400&fit=crop',
        hasIllustration: true,
    },
    {
        code: 'soninke',
        name: 'Soninké',
        nativeName: 'Soninkanxaane',
        flag: '🌍',
        country: 'Mali, Sénégal',
        speakers: '2M+',
        description: 'Langue des grands voyageurs et bâtisseurs de cités antiques',
        culturalNote: 'Les Soninké ont fondé l\'Empire du Ghana, premier grand empire d\'Afrique de l\'Ouest',
        image: require('../../assets/languages/illustration-soninke.png'),
        imageUrl: 'https://images.unsplash.com/photo-1531206715517-5c0ba140e2b8?w=800&h=400&fit=crop',
        hasIllustration: true,
    },
    {
        code: 'bambara',
        name: 'Bambara',
        nativeName: 'Bamanankan',
        flag: '🇲🇱',
        country: 'Mali',
        speakers: '14M+',
        description: 'Langue dynamique, pilier de la culture Mandé moderne',
        culturalNote: 'Le Bambara est la langue nationale du Mali et appartient à la famille Mandé',
        image: require('../../assets/languages/illustration-wolof.png'),
        imageUrl: 'https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb?w=800&h=400&fit=crop',
        hasIllustration: true,
    },
    {
        code: 'mandinka',
        name: 'Mandinka',
        nativeName: 'Mandinka',
        flag: '🇬🇲',
        country: 'Gambie',
        speakers: '2M+',
        description: 'Langue de l\'ancien Empire du Mali et de ses célèbres griots',
        culturalNote: 'Les griots Mandinka sont les gardiens de l\'histoire orale de l\'Empire du Mali',
        image: require('../../assets/languages/illustration-mandinka.png'),
        imageUrl: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=800&h=400&fit=crop',
        hasIllustration: true,
    },
    {
        code: 'manjak',
        name: 'Manjak',
        nativeName: 'Manjaku',
        flag: '🇬🇼',
        country: 'Guinée-Bissau',
        speakers: '300K+',
        description: 'Langue complexe des maîtres tisserands de la côte ouest',
        culturalNote: 'Les Manjak sont réputés pour leur artisanat et leur tissage traditionnel',
        image: require('../../assets/languages/illustration-manjack.png'),
        imageUrl: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&h=400&fit=crop',
        hasIllustration: true,
    },
    {
        code: 'balante',
        name: 'Balante',
        nativeName: 'Balant',
        flag: '🇬🇼',
        country: 'Guinée-Bissau',
        speakers: '500K+',
        description: 'Langue de résistance et de résilience, liée au travail de la terre',
        culturalNote: 'Les Balante sont connus pour leur agriculture et leur résistance historique',
        image: require('../../assets/languages/illustration-balante.png'),
        imageUrl: 'https://images.unsplash.com/photo-1456030685333-3e7843d3e911?w=800&h=400&fit=crop',
        hasIllustration: true,
    },
    {
        code: 'mankagne',
        name: 'Mankagne',
        nativeName: 'Mankanya',
        flag: '🇸🇳',
        country: 'Sénégal',
        speakers: '100K+',
        description: 'Langue de fraternité et d\'unité au sein des familles étendues',
        culturalNote: 'Les Mankagne valorisent fortement les liens familiaux et communautaires',
        image: require('../../assets/languages/illustration-mankagne.png'),
        imageUrl: 'https://images.unsplash.com/photo-1501770118606-b1d640526693?w=800&h=400&fit=crop',
        hasIllustration: true,
    },
    {
        code: 'bainouk',
        name: 'Baïnouk',
        nativeName: 'Baïnouk',
        flag: '🇸🇳',
        country: 'Sénégal',
        speakers: 'Peu',
        description: 'Langue ancienne et mystique, pilier de l\'identité des premiers habitants de la Casamance.',
        culturalNote: 'Les Baïnouks sont considérés comme la population la plus ancienne de la Casamance.',
        image: require('../../assets/languages/illustration-bainouk.png'),
        imageUrl: 'https://images.unsplash.com/photo-1491745266240-452c92e92590?w=800&h=400&fit=crop',
        hasIllustration: true,
    }
];

// Illustrations pour les exercices
export const EXERCISE_ILLUSTRATIONS: Record<string, any> = {
    bouche: require('../../assets/exercises/bouche.png'),
    coeur: require('../../assets/exercises/coeur.png'),
    ecole: require('../../assets/exercises/ecole.png'),
    village_habitants: require('../../assets/exercises/habitants_village.png'),
    langue: require('../../assets/exercises/langue.png'),
    lever_soleil: require('../../assets/exercises/lever_soleil.png'),
    lune_nuit: require('../../assets/exercises/lune_nuit.png'),
    main: require('../../assets/exercises/main.png'),
    maison: require('../../assets/exercises/maison.png'),
    marche: require('../../assets/exercises/marche.png'),
    nez: require('../../assets/exercises/nez.png'),
    oeil: require('../../assets/exercises/oeil.png'),
    oreille: require('../../assets/exercises/oreille.png'),
    pieds: require('../../assets/exercises/pieds.png'),
    route: require('../../assets/exercises/route.png'),
    village_matin: require('../../assets/exercises/village_matin.png'),
    village_nuit: require('../../assets/exercises/village_nuit.png'),
    visage: require('../../assets/exercises/visage.png'),
    amis: require('../../assets/exercises/amis.png'),
    boire: require('../../assets/exercises/boire.png'),
    faux_lion: require('../../assets/exercises/faux_lion.png'),
    fille: require('../../assets/exercises/fille.png'),
    fils: require('../../assets/exercises/fils.png'),
    fille_dort: require('../../assets/exercises/fille_dort.png'),
    garcon_dort: require('../../assets/exercises/garcon_dort.png'),
    fille_marche: require('../../assets/exercises/fille_marche.png'),
    garcon_marche: require('../../assets/exercises/garcon_marche.png'),
    grand_pere: require('../../assets/exercises/grand_pere.png'),
    grande_mere: require('../../assets/exercises/grande_mere.png'),
    famille: require('../../assets/exercises/la_famille.png'),
    manger: require('../../assets/exercises/manger.png'),
    mere: require('../../assets/exercises/mere.png'),
    parler: require('../../assets/exercises/parler.png'),
    pere: require('../../assets/exercises/pere.png'),
    travailler: require('../../assets/exercises/travailler.png'),
    argent: require('../../assets/exercises/argent.png'),
    chambre: require('../../assets/exercises/chambre.png'),
    chaussure: require('../../assets/exercises/chaussure.png'),
    eau: require('../../assets/exercises/eau.png'),
    livre: require('../../assets/exercises/livre.png'),
    porte: require('../../assets/exercises/porte.png'),
    riz: require('../../assets/exercises/riz.png'),
    soleil_objet: require('../../assets/exercises/soleil.png'),
    vetement: require('../../assets/exercises/vetement.png'),
};

// Illustrations des personnages pour les dialogues
export const CHARACTER_IMAGES: Record<string, any> = {
    'bayo': BAYO_IMAGES.happy,
    'pere': require('../../assets/exercises/pere.png'),
    'mere': require('../../assets/exercises/mere.png'),
    'grand-pere': require('../../assets/exercises/grand_pere.png'),
    'grand-mere': require('../../assets/exercises/grande_mere.png'),
    'fille': require('../../assets/exercises/fille.png'),
    'garcon': require('../../assets/exercises/fils.png'),
    'fils': require('../../assets/exercises/fils.png'),
    'sage': require('../../assets/exercises/habitants_village.png'),
    'mythic': require('../../assets/exercises/faux_lion.png'),
    'faux_lion': require('../../assets/exercises/faux_lion.png'),
    'hyene': require('../../assets/discovery/lievre_hyene.jpg'),
    'lievre': require('../../assets/discovery/lievre_hyene.jpg'),
    'lion': require('../../assets/discovery/soundiata.jpg'), // Soundiata est souvent associé au lion
    'elephant': require('../../assets/exercises/habitants_village.png'), // Fallback
    'leopard': require('../../assets/exercises/faux_lion.png'), // Fallback
};

// Fonction helper pour obtenir une illustration d'exercice
export const getExerciseIllustration = (key: string) => {
    return EXERCISE_ILLUSTRATIONS[key] || BAYO_IMAGES.thinking;
};

// Fonction helper pour obtenir l'image d'une langue
export const getLanguageImage = (languageCode: string) => {
    const language = AFRICAN_LANGUAGES.find(lang => lang.code === languageCode);
    return language?.image || require('../../assets/languages/illustration-wolof.png');
};

// Fonction helper pour obtenir l'URL de fallback d'une langue
export const getLanguageImageUrl = (languageCode: string) => {
    const language = AFRICAN_LANGUAGES.find(lang => lang.code === languageCode);
    return language?.imageUrl || '';
};

// Fonction helper pour obtenir une image de Bayo
export const getBayoImage = (emotion: 'happy' | 'excited' | 'thinking' | 'sad' | 'motivated' | 'greeting' | 'crying' | 'skeptical' | 'taking_note') => {
    return (BAYO_IMAGES as any)[emotion];
};

// Fonction helper pour obtenir l'URL de fallback de Bayo
export const getBayoFallbackUrl = (emotion: string) => {
    return (BAYO_FALLBACK_URLS as any)[emotion];
};
