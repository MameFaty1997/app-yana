import { Story } from './stories';

export const storyBaol19: Story = {
    id: 'baol-un-cadavre-de-nuit',
    title: 'UN CADAVRE DE NUIT',
    subtitle: 'Conte traditionnel du Baol',
    ethnie: 'Wolof du Baol',
    ethnieImg: 'illustration-wolof.png',
    difficulty: 'moyen',
    ageMin: 7,
    readingTime: 5,
    coverColor: '#2C3E50', 
    moralLesson: "Un conte traditionnel riche en enseignements.",

    scenes: [
        {
            id: 'scene-01',
            paragraph: "Il s'agit d'un village où l'on avait l'habitude de n'inhumer les morts qu'en plein jour. Chaque fois que quelqu'un mourait le soir, le cadavre était gardé dans la mosquée où il passait la nuit. Le matin, le griot crieur public s'approchait et assis devant la mosquée, battait son tam-tam trois fois de suite. Les fidèles s'assemblaient pour aller à. l'enterrement. C'est ainsi qu'on procédait dans le village.",
            audioPath: 'baol-un-cadavre-de-nuit-1.mp3',
            illustration: {
                prompt: "Illustration d'un conte africain traditionnel.",
                altText: "Scène du conte",
                position: 'top',
            },
            footnotes: [],
            vocabWords: [],
        }, {
            id: 'scene-02',
            paragraph: "Un jour, quelqu'un mourut à la tombée de la nuit. Comme de coutume on porta le cadavre dans la mos­ quée. Dans la nuit, un voleur s'aventura dans le village. Après avoir commis son larcin, il fut sur­ pris par un violent orage et alla se réfugier dans la mosquée. Le sommeille prit et bientôt il s'endor­ mit. Vers le petit jour, le griot s'approcha de la mos­ quée et battit son tam-tam funèbre. A peine avait-il fini de donner le troisième coup que le voleur bondit sur lui, croyant qu'il était découvert.",
            audioPath: 'baol-un-cadavre-de-nuit-2.mp3',
            illustration: {
                prompt: "Illustration d'un conte africain traditionnel.",
                altText: "Scène du conte",
                position: 'full',
            },
            footnotes: [],
            vocabWords: [],
        }, {
            id: 'scene-03',
            paragraph: "Pris de panique par ce corps à corps inattendu, le griot se défendit 90 CONTES WOLOF DU BAOL tant bien que mal. A la fm, le voleur s'échappa, mais quelqu'un avait relâché ses intestins. On demande lequel des deux lutteurs avait ainsi manifesté sa frayeur? (Raconté par Dame.)",
            audioPath: 'baol-un-cadavre-de-nuit-3.mp3',
            illustration: {
                prompt: "Illustration d'un conte africain traditionnel.",
                altText: "Scène du conte",
                position: 'top',
            },
            footnotes: [],
            vocabWords: [],
        },
    ]
};
