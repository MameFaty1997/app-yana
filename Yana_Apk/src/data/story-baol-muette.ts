import { Story } from './stories';

export const storyBaolMuette: Story = {
    id: 'baol-soi-disant-muette',
    title: 'La prétendue muette',
    subtitle: 'La ruse du chasseur Samba',
    ethnie: 'Wolof du Baol',
    ethnieImg: 'illustration-wolof.png',
    difficulty: 'moyen',
    ageMin: 10,
    readingTime: 5,
    coverColor: '#27AE60',
    moralLesson: "La curiosité et la vanité peuvent parfois délier les langues les plus tenaces.",

    scenes: [
        {
            id: 'scene-01',
            paragraph: "Une femme que tout le village croyait muette refusait obstinément tous les [[prétendants]]. Un beau jour, le chasseur Samba se présenta. Sûr de lui, il promit à tout le monde de lui délier la langue une fois qu'elle deviendrait sa troisième épouse.",
            audioPath: 'story-baol-muette-01.mp3',
            illustration: {
                prompt: "Un chasseur confiant et charismatique demande la main d'une femme silencieuse et mystérieuse dans un village traditionnel.",
                altText: "La promesse de Samba",
                position: 'top',
            },
            footnotes: [],
            vocabWords: [
                { word: "prétendus", definition: "Ce que l'on croit être vrai mais qui ne l'est pas en réalité" }, { word: "prétendants", definition: "Ceux qui veulent épouser une femme" },
            ],
        }, {
            id: 'scene-02',
            paragraph: "La vie à trois épouses s'installa dans un [[mutisme]] absolu de la part de la mariée. Un matin, Samba s'enfonça dans la steppe avec son arc, tua une grande antilope du nom de kob, et eut une idée [[brillante]] pour accomplir sa promesse.",
            audioPath: 'story-baol-muette-02.mp3',
            illustration: {
                prompt: "Le chasseur Samba réfléchit malicieusement après avoir attrapé une antilope (kob) dans la brousse sénégalaise.",
                altText: "L'idée du chasseur",
                position: 'full',
            },
            footnotes: [
                { id: 1, term: "Un kob", explanation: "Une espèce d'antilope courante dans les savanes et steppes africaines." },
            ],
            vocabWords: [
                { word: "mutisme", definition: "Le fait de ne pas parler" }, { word: "brillante", definition: "Très intelligente, géniale" },
            ],
        }, {
            id: 'scene-03',
            paragraph: "Samba [[dépeça]] l'animal avec grand soin. Puis, il se recouvrit entièrement de sa peau rousse en gardant les cornes majestueuses sur la tête. Il se mit en boule sous un grand arbre calciné et se mit à [[simuler]] la mort de façon parfaite.",
            audioPath: 'story-baol-muette-03.mp3',
            illustration: {
                prompt: "Un homme déguisé avec une peau d'antilope à cornes (kob), recroquevillé sous un arbre comme s'il était sans vie.",
                altText: "Le déguisement parfait",
                position: 'top',
            },
            footnotes: [],
            vocabWords: [
                { word: "dépeça", definition: "Couper et séparer en morceaux" }, { word: "simuler", definition: "Faire semblant, faire croire" },
            ],
        }, {
            id: 'scene-04',
            paragraph: "Inquiètes de la longue absence de leur mari, les trois épouses partirent à sa recherche en s'avançant en [[file indienne]]. La muette, discrète comme à son habitude, fermait la marche. Soudain, l'[[angoisse]] grandit et la première femme se mit à entonner un émouvant chant d'espoir et de peur.",
            audioPath: 'story-baol-muette-04.mp3',
            illustration: {
                prompt: "Trois femmes africaines marchant en file indienne dans la brousse sous un ciel orangé. La première chante avec émotion.",
                altText: "La recherche des épouses",
                position: 'top',
            },
            footnotes: [],
            vocabWords: [
                { word: "file indienne", definition: "Marcher l'un derrière l'autre" }, { word: "angoisse", definition: "Une peur profonde, inquiétude" },
            ],
        }, {
            id: 'scene-05',
            paragraph: "La seconde épouse reprit magnifiquement la [[mélodie]] triste qui résonnait dans la brousse vide. À la surprise de tous, la muette se mit soudain à [[fredonner]] l'air tout doucement, refusant catégoriquement d'être mise à l'écart du chœur des grandes épouses.",
            audioPath: 'story-baol-muette-05.mp3',
            illustration: {
                prompt: "Gros plan sur la troisième femme, la soi-disant muette, qui se met à fredonner la mélodie avec un léger sourire aux lèvres.",
                altText: "Le murmure de la muette",
                position: 'top',
            },
            footnotes: [],
            vocabWords: [
                { word: "mélodie", definition: "La musique d'une chanson" }, { word: "fredonner", definition: "Chanter sans ouvrir complétement la bouche, murmurer" },
            ],
        }, {
            id: 'scene-06',
            paragraph: "Elles découvrirent enfin la masse [[gisant]] sous l'arbre. Croyant voir le kob qui avait trépassé aux côtés de leur mari après un dur combat, la première épouse chanta de plus belle. La seconde la suivit. Transcendée par le [[lyrisme]]... la troisième lâcha sa voix sans crier gare !",
            audioPath: 'story-baol-muette-06.mp3',
            illustration: {
                prompt: "Les trois femmes entourant le faux cadavre d'antilope. La troisième femme (la muette) chante en ouvrant grand la bouche, emportée par la scène lyrique.",
                altText: "Le chant révélé",
                position: 'full',
            },
            footnotes: [],
            vocabWords: [
                { word: "gisant", definition: "Étendu sur le sol, inanimé" }, { word: "lyrisme", definition: "Expression poétique" },
            ],
        }, {
            id: 'scene-07',
            paragraph: "D'une voix [[suave]] et impressionnante, la « muette » acheva le couplet du chant avec fierté ! Le chasseur se releva d'un bond prodigieux, fit tomber sa peau d'antilope et s'écria : « C'est bien moi qui ai tué le kob. Et c'est uniquement par [[vanité]] et méchanceté que tu te faisais passer pour muette ! Vous voilà toutes servies ! »",
            audioPath: 'story-baol-muette-07.mp3',
            illustration: {
                prompt: "Le chasseur surprenant tout le monde en sortant de son déguisement. La troisième femme est bouche bée de s'être fait piéger.",
                altText: "Le grand piège dévoilé",
                position: 'top',
            },
            footnotes: [],
            vocabWords: [
                { word: "suave", definition: "Douce et agréable à l'oreille" }, { word: "vanité", definition: "L'orgueil, le désir prétentieux de plaire" },
            ],
        },
    ],
};
