import { Story } from './stories';

export const storyLeukWhale: Story = {
    id: 'leuk-whale-elephant',
    title: "Leuk, l'Éléphant et la Baleine",
    subtitle: 'La ruse de la corde',
    ethnie: 'Wolof',
    ethnieImg: 'illustration-wolof.png',
    difficulty: 'moyen',
    ageMin: 6,
    readingTime: 6,
    coverColor: '#2B65EC', // Ocean Blue
    moralLesson: "Même les plus forts peuvent être trompés par celui qui utilise sa tête.",

    scenes: [
        {
            id: 'scene-01',
            paragraph: "Leuk va d'abord trouver l'Éléphant. « Bonjour, [[Mame-Gnèye]], dit-il respectueusement en se [[prosternant]]{{1}} à terre. Le bon [[Dieu]] vient de me donner un [[trésor]], mais je suis incapable de le déplacer. Voulez-vous m'aider à tirer la corde ? »",
            audioPath: 'story-leuk-whale-01.mp3',
            illustration: {
                prompt: "Le lièvre Leuk, petit et malin, debout devant l'immense éléphant Mame-Gnèye dans la savane. Leuk tient une grosse corde. Style illustration jeunesse africaine, contrastes de taille, tons ocre et gris.",
                altText: "Leuk demande de l'aide à l'Éléphant",
                position: 'top',
            },
            footnotes: [
                { id: 1, term: "prosternant", explanation: "S'abaisser très bas devant quelqu'un pour le saluer avec respect." },
            ],
            vocabWords: [
                { word: "Mame-Gnèye", definition: "Nom respectueux de l'éléphant en wolof", etymology: "Mame = Grand-père, Gnèye = Éléphant" }, { word: "trésor", definition: "Quelque chose de très précieux" },
                { word: "Dieu", definition: "Se dit 'Yalla' en wolof.", etymology: "Wolof: Yalla" },
            ],
        }, {
            id: 'scene-02',
            paragraph: "Après avoir reçu du lait de l'Éléphant, Leuk court vers l'océan pour trouver [[N'Gâga]]-la-baleine. « Bonjour, Reine des mers ! J'ai un cadeau pour vous, mais il est si lourd ! Prenez ce bout de corde et tirez de toutes vos forces. »",
            audioPath: 'story-leuk-whale-02.mp3',
            illustration: {
                prompt: "Leuk le lièvre sur une plage de sable blanc, tendant une corde à une énorme baleine qui sort la tête de l'eau bleue. Soleil brillant, style BD africaine aux couleurs éclatantes.",
                altText: "Leuk parle à la Baleine N'Gâga",
                position: 'top',
            },
            footnotes: [],
            vocabWords: [
                { word: "N'Gâga", definition: "Nom de la baleine dans les contes", etymology: "En wolof : la baleine" }, { word: "outre", definition: "Petit sac en peau pour porter des liquides" },
            ],
        }, {
            id: 'scene-03',
            paragraph: "Leuk attache les deux [[géants]] l'un à l'autre sans qu'ils le sachent. Puis il crie : « Tirez ! » L'Éléphant tire de son côté, la Baleine tire du sien. La corde craque ! Ils croient tous deux lutter contre un trésor magique qui [[résiste]].",
            audioPath: 'story-leuk-whale-03.mp3',
            illustration: {
                prompt: "Image divisée en deux : d'un côté l'éléphant tire vers la forêt, de l'autre la baleine tire vers la mer. La corde est tendue à l'extrême entre les deux mondes. Leuk rigole, caché derrière un buisson.",
                altText: "Le tir à la corde entre les deux géants",
                position: 'full',
            },
            footnotes: [],
            vocabWords: [
                { word: "résiste", definition: "Qui ne se laisse pas faire, qui tient bon" }, { word: "géants", definition: "Êtres de très grande taille" },
            ],
        }, {
            id: 'scene-04',
            paragraph: "Après des mois d'efforts, ils décident de voir ce qui se trouve au bout. Ils se rencontrent nez à nez sur le [[rivage]] ! « Comment oses-tu retenir mon trésor ? » crie l'Éléphant. Ils comprennent alors que le petit Leuk s'est bien [[moqué]] d'eux.",
            audioPath: 'story-leuk-whale-04.mp3',
            illustration: {
                prompt: "L'éléphant et la baleine se faisant face sur la plage, l'air étonné et furieux. Ils voient que la corde les relie directement. Scène comique, style illustration conte africain.",
                altText: "La rencontre des deux géants sur la plage",
                position: 'bottom',
            },
            footnotes: [],
            vocabWords: [
                { word: "moqué", definition: "Rire de quelqu'un, lui faire une farce" }, { word: "rivage", definition: "Le bord de la mer" },
            ],
        },
    ],
};
