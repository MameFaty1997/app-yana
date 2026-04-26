import { Story } from './stories';

export const storyBaolPets: Story = {
    id: 'baol-femme-aux-pets',
    title: 'La femme et le repas',
    subtitle: 'La ruse de la gourmandise',
    ethnie: 'Wolof du Baol',
    ethnieImg: 'illustration-wolof.png',
    difficulty: 'moyen',
    ageMin: 7,
    readingTime: 5,
    coverColor: '#F39C12',
    moralLesson: "A la guerre comme en amour, tous les coups sont permis, surtout lorsqu'il s'agit de partager un bon repas.",

    scenes: [
        {
            id: 'scene-01',
            paragraph: "Il était une fois une femme très [[coquette]]. Un jour, un grand tam-tam fut organisé au village. La femme s'y rendit sans [[avertir]] son mari, croyant qu'il était absent de la maison. Elle commença à danser au milieu de la place, heureuse et joyeuse.",
            audioPath: 'story-baol-pets-01.mp3',
            illustration: {
                prompt: "Une femme sénégalaise élégamment vêtue de pagnes colorés dansant joyeusement au milieu d'un grand cercle de spectateurs, au son des tam-tams dans un village.",
                altText: "La femme danse au tam-tam",
                position: 'top',
            },
            footnotes: [],
            vocabWords: [
                { word: "coquette", definition: "Qui aime plaire et séduire par sa tenue" }, { word: "avertir", definition: "Prévenir de ce qu'on va faire" },
            ],
        }, {
            id: 'scene-02',
            paragraph: "Mais chaque fois qu'elle était [[fatiguée]], elle revenait [[discrètement]] à la maison, croyant encore être seule. Elle entrait dans sa chambre pour s'y reposer. Malheureusement, son mari s'y trouvait depuis tout ce temps, allongé sur son lit en silence.",
            audioPath: 'story-baol-pets-02.mp3',
            illustration: {
                prompt: "Le mari allongé silencieusement sur un lit, observant discrètement sa femme qui entre dans la chambre sur la pointe des pieds, épuisée.",
                altText: "Le mari attend dans l'ombre",
                position: 'top',
            },
            footnotes: [],
            vocabWords: [
                { word: "discrètement", definition: "Sans faire de bruit, de façon à ne pas être vu" }, { word: "fatiguée", definition: "Lasse, qui n'en peut plus" },
            ],
        }, {
            id: 'scene-03',
            paragraph: "La femme surprise, fondit en larmes : « Depuis quand es-tu donc là ? ». L'homme, qui cherchait depuis longtemps un bon [[prétexte]] pour avoir le droit de manger seul les repas [[copieux]] que cuisinait sa femme, trouva là la parfaite occasion de la tenir loin de la marmite.",
            audioPath: 'story-baol-pets-03.mp3',
            illustration: {
                prompt: "Le mari souriant malicieusement en regardant sa femme qui pleure de honte. Une grosse marmite pleine de nourriture fume en arrière-plan.",
                altText: "La honte de la femme",
                position: 'top',
            },
            footnotes: [],
            vocabWords: [
                { word: "prétexte", definition: "Raison que l'on donne pour se justifier" }, { word: "copieux", definition: "Abondant, plein à ras bord" },
            ],
        }, {
            id: 'scene-04',
            paragraph: "À partir de ce jour, chaque fois que la femme s'approchait pour toucher au plat, son mari se mettait à rire et lui rappelait ce jour où elle s'était cachée dans sa chambre. Honteuse et [[blessée]], la femme se levait des repas sans toucher une [[miette]], et maigrissait de jour en jour, pendant que son mari se remplissait la panse avec enthousiasme.",
            audioPath: 'story-baol-pets-04.mp3',
            illustration: {
                prompt: "Le mari se régalant seul assis par terre avec un gros plat garni, pendant que la femme toute maigre l'observe tristement de loin.",
                altText: "Le repas en solitaire du mari",
                position: 'full',
            },
            footnotes: [],
            vocabWords: [
                { word: "blessée", definition: "Touchée au fond du cœur par la moquerie" }, { word: "miette", definition: "Tout petit morceau de nourriture" },
            ],
        }, {
            id: 'scene-05',
            paragraph: "Une vieille femme du village, ayant pitié d'elle, lui conseilla une ruse maline : « Prépare-lui du bon lakh de mil particulièrement [[gluant]]. Puis, demande-lui de t'accompagner cueillir des fruits en brousse juste après ! » La bouse femme suivit ces [[précieux]] conseils à la lettre.",
            audioPath: 'story-baol-pets-05.mp3',
            illustration: {
                prompt: "Une vieille femme chuchotant à l'oreille de la femme maigre qui hoche la tête avec un petit sourire complice dans la cuisine.",
                altText: "Les conseils de la vieille",
                position: 'top',
            },
            footnotes: [
                { id: 1, term: "Lakh", explanation: "Une bouillie traditionnelle sénégalaise souvent préparée à base de mil, de riz ou de maïs." },
            ],
            vocabWords: [
                { word: "gluant", definition: "Qui est visqueux et qui colle très fort" }, { word: "précieux", definition: "Qui a une très grande valeur" },
            ],
        }, {
            id: 'scene-06',
            paragraph: "L'homme avala son lakh avec [[avidité]] et accompagna aussitôt sa femme vers le baobab situé en pleine brousse. Une fois arrivé au sommet de l'arbre [[perché]], le ventre trop plein du mari protesta si fort qu'il faillit tomber de la branche devant sa femme. Dès leur retour, la femme sourit : « Bien, maintenant faisons la paix, et mangeons, car un repas doit se partager à deux ! »",
            audioPath: 'story-baol-pets-06.mp3',
            illustration: {
                prompt: "Le mari embarrassé, accroché au tronc d'un grand baobab, tandis que la femme en bas éclate de rire. Plus tard, ils partagent le plat.",
                altText: "Le rire d'une femme pardonne tout",
                position: 'full',
            },
            footnotes: [],
            vocabWords: [
                { word: "avidité", definition: "Un très grand désir qui pousse à dévorer" }, { word: "perché", definition: "Placé très haut sur son point d'appui" },
            ],
        },
    ],
};
