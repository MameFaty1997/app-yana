import { Story } from './stories';

export const storyBaolAne: Story = {
    id: 'baol-ane-difficile',
    title: 'L\'âne difficile',
    subtitle: 'Un vendeur rusé et un âne capricieux',
    ethnie: 'Wolof du Baol',
    ethnieImg: 'illustration-wolof.png',
    difficulty: 'facile',
    ageMin: 6,
    readingTime: 4,
    coverColor: '#9B59B6',
    moralLesson: "Méfiez-vous toujours des objets ou des bêtes qu'on cherche à vendre avec trop d'empressement, ils cachent souvent un lourd défaut.",

    scenes: [
        {
            id: 'scene-01',
            paragraph: "Il était une fois un homme qui possédait un [[âne]] [[intraitable]]. La bête était si pleine de [[défauts]] qu'il décida de s'en séparer et de la vendre. Arrivant dans un village, il proposa son [[âne]] à un homme. L'acheteur l'admira : « Que cet [[âne]] est gros et grand ! Combien le vends-tu ? »",
            audioPath: 'story-baol-ane-01.mp3',
            illustration: {
                prompt: "Un vendeur africain au marché tenant la corde d'un gros âne gris à l'air espiègle, discutant avec un potentiel acheteur.",
                altText: "Le vendeur et son âne à vendre",
                position: 'top',
            },
            footnotes: [],
            vocabWords: [
                { word: "âne", definition: "Se dit 'Mbaam' en wolof. Un animal de trait robuste.", etymology: "Wolof: Mbaam" }, { word: "intraitable", definition: "Impossible à contrôler ou à éduquer." }, { word: "défauts", definition: "Ce qui n'est pas bien chez quelqu'un, vilaine habitude." },
            ],
        }, {
            id: 'scene-02',
            paragraph: "Avant même que le [[vendeur]] ne réponde, l'[[âne]] [[capricieux]] se détendit soudainement, renversa l'[[acheteur]], et lui arracha tous les poils du ventre d'un seul coup de dent. L'[[acheteur]] se releva en tremblant : « C'est donc à cause de cet horrible [[défaut]] que tu veux t'en débarrasser ! Je ne l'achèterai pas ! »",
            audioPath: 'story-baol-ane-02.mp3',
            illustration: {
                prompt: "L'âne ruant et mordant les vêtements de l'acheteur qui tombe à la renverse, très surpris. Le vendeur fait l'innocent.",
                altText: "L'âne attaque le premier acheteur",
                position: 'top',
            },
            footnotes: [],
            vocabWords: [
                { word: "vendeur", definition: "Se dit 'Jaay-kat' en wolof.", etymology: "Wolof: Jaay-kat" }, { word: "acheteur", definition: "Se dit 'Jënd-kat' en wolof.", etymology: "Wolof: Jënd-kat" }, { word: "capricieux", definition: "Qui change souvent d'humeur sans raison." }, { word: "défaut", definition: "Un point faible ou une mauvaise habitude." },
            ],
        }, {
            id: 'scene-03',
            paragraph: "Le propriétaire continua sa route et arriva dans une maison où vivait une pauvre [[vieille femme]]. Après les [[salutations]], la vieille [[examina]] la bête : « Mon fils a justement besoin d'un [[âne]]. Je constate qu'il est grand et fort, donc sûrement il est bon. »",
            audioPath: 'story-baol-ane-03.mp3',
            illustration: {
                prompt: "Une gentille vieille femme africaine caressant doucement la tête de l'âne, sous le regard faussement rassurant du vendeur.",
                altText: "La vieille femme examine l'âne",
                position: 'full',
            },
            footnotes: [],
            vocabWords: [
                { word: "vieille femme", definition: "Se dit 'Maam' (grand-mère) ou 'Mag' (aînée) selon le contexte. Ici, une figure de respect.", etymology: "Wolof: Maam / Mag" }, { word: "salutations", definition: "Action de dire bonjour. Très important dans la culture sénégalaise (Nuyoo).", etymology: "Wolof: Nuyoo" }, { word: "examina", definition: "Regarder très attentivement." },
            ],
        }, {
            id: 'scene-04',
            paragraph: "À peine eut-elle prononcé ces mots, l'[[âne]] [[bondit]] sur la pauvre petite vieille, la terrassa et lui arracha à elle aussi les poils du ventre. La maman s'enfuit en hurlant à l'aide. Le vendeur [[effronté]], bien que désolé, reprit sa bête et continua son chemin en murmurant : « Quel malheureux [[âne]]... »",
            audioPath: 'story-baol-ane-04.mp3',
            illustration: {
                prompt: "La vieille femme s'enfuyant en courant, poursuivie sur quelques pas par l'âne vicieux. Le vendeur, confus, tire sur la longe.",
                altText: "L'âne s'en prend à la vieille femme",
                position: 'top',
            },
            footnotes: [],
            vocabWords: [
                { word: "bondit", definition: "Faire un saut brusque." }, { word: "effronté", definition: "Qui n'a honte de rien, impertinent." },
            ],
        }, {
            id: 'scene-05',
            paragraph: "Il arriva enfin dans une autre maison où un [[jeune homme]], ignorant tout de la [[ruse]], accepta d'acheter l'animal sans se méfier. « Est-ce qu'il mord ? Est-ce qu'il cabre ? » demanda-t-il. « Non, mentit le vendeur. Il est tout doux. Le plus petit des enfants peut le conduire. » L'affaire fut [[conclue]] et le vendeur s'enfuit avec son [[argent]].",
            audioPath: 'story-baol-ane-05.mp3',
            illustration: {
                prompt: "Le vendeur souriant en train de compter les pièces de monnaie et de s'enfuir joyeusement, laissant un jeune homme avec son nouvel âne.",
                altText: "La vente est conclue",
                position: 'top',
            },
            footnotes: [],
            vocabWords: [
                { word: "jeune homme", definition: "Se dit 'Gune' en wolof.", etymology: "Wolof: Gune" }, { word: "ruse", definition: "Moyen trompeur pour obtenir ce qu'on veut (Rax).", etymology: "Wolof: Rax" }, { word: "conclue", definition: "L'affaire est réglée et terminée." }, { word: "argent", definition: "Se dit 'Xalis' en wolof.", etymology: "Wolof: Xalis" },
            ],
        }, {
            id: 'scene-06',
            paragraph: "Dès que l'[[âne]] fut seul dans la nouvelle cour, il se détacha aussitôt, commença à [[cabrioler]] partout, renversa la mère du jeune homme, la mordit à son tour, déclenchant les cris de douleur et la [[panique]] dans toute la maison. Tous les voisins accoururent en criant : « Ce maudit [[âne]] s'en prend à tout le monde ! Qu'il s'en aille ! »",
            audioPath: 'story-baol-ane-06.mp3',
            illustration: {
                prompt: "Un âne sautant joyeusement et semant une panique générale dans la cour d'une maison africaine au coucher du soleil.",
                altText: "La panique générale",
                position: 'full',
            },
            footnotes: [],
            vocabWords: [
                { word: "âne", definition: "Se dit 'Mbaam' en wolof. Un animal de trait robuste.", etymology: "Wolof: Mbaam" }, { word: "cabrioler", definition: "Faire de petits sauts avec légèreté." }, { word: "panique", definition: "Peur soudaine qui fait perdre la raison." },
            ],
        },
    ],
};
