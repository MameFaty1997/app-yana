
// Audio Assets Configuration
// Centralise tous les chemins d'audio de l'application

export const AUDIO_ASSETS = {
    // Effets sonores
    sfx: {
        correct: null, // require('../../assets/audio/correct.mp3'),
        wrong: null, // require('../../assets/audio/wrong.mp3'),
        click: null, // require('../../assets/audio/click.mp3'),
        success: null, // require('../../assets/audio/success.mp3'),
        lesson_complete: null, // require('../../assets/audio/lesson_complete.mp3'),
    },

    // Mots de vocabulaire (Unit 1)
    vocabulary: {
        // Salutations
        'salaamaalikum': null, // require('../../assets/audio/salaamaalikum.mp3'),
        'maalikum_salaam': null, // require('../../assets/audio/maalikum_salaam.mp3'),
        'naka_suba_si': null, // require('../../assets/audio/naka_suba_si.mp3'),
        'naka_ngoon_si': null, // require('../../assets/audio/naka_ngoon_si.mp3'),
        'jamm_rekk': null, // require('../../assets/audio/jamm_rekk.mp3'),
        'na_nga_def': null, // require('../../assets/audio/na_nga_def.mp3'),
        'maa_ngi_fi': null, // require('../../assets/audio/maa_ngi_fi.mp3'),
        'yaw_nag': null, // require('../../assets/audio/yaw_nag.mp3'),

        // Au revoir
        'ba_beneen': null, // require('../../assets/audio/ba_beneen.mp3'),
        'ba_chi_kanam': null, // require('../../assets/audio/ba_chi_kanam.mp3'),
        'angi_dem': null, // require('../../assets/audio/angi_dem.mp3'),

        // Politesse
        'jerejef': null, // require('../../assets/audio/jerejef.mp3'),
        'waaw': null, // require('../../assets/audio/waaw.mp3'),
        'deedet': null, // require('../../assets/audio/deedet.mp3'),
        'baal_ma': null, // require('../../assets/audio/baal_ma.mp3'),

        // Introduction
        'mame_faty': null, // require('../../assets/audio/mame_faty.mp3'),
        'noo_tudd': null, // require('../../assets/audio/noo_tudd.mp3'),
        'fan_nga_dekk': null, // require('../../assets/audio/fan_nga_dekk.mp3'),
    }
};

// Map pour faire correspondre le terme texte avec la clé audio
export const getAudioForTerm = (term: string): any => {
    const normalizedTerm = term.toLowerCase().replace(/[^a-z0-9]/g, '_');
    return (AUDIO_ASSETS.vocabulary as any)[normalizedTerm] || null;
};
