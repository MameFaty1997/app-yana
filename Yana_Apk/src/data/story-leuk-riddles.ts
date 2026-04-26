import { Story } from './stories';

export const storyLeukRiddles: Story = {
    id: 'leuk-devinettes',
    title: 'Les belles devinettes',
    subtitle: 'Apprendre en réfléchissant',
    ethnie: 'Wolof',
    ethnieImg: 'illustration-wolof.png',
    difficulty: 'moyen',
    ageMin: 7,
    readingTime: 5,
    coverColor: '#D97706',
    moralLesson: "Bien réfléchir avant de parler est le meilleur moyen de trouver la vérité.",

    scenes: [
        {
            id: 'riddle-01',
            paragraph: "Leuk connaît de belles [[devinettes]] qui amusent, tout en développant la réflexion. « Je vais voir, dit-il à Samba, si tu observes bien les choses qui t'entourent. Il y a une belle ceinture ronde et brillante, que le [[piéton]] trouve sur son chemin mais ne ramasse jamais. Qu'est-ce que c'est ? »",
            audioPath: 'story-leuk-riddles-01.mp3',
            illustration: {
                prompt: "Leuk le lièvre posant une devinette à l'enfant Samba dans la brousse. On voit un serpent coloré enroulé au loin ressemblant à une ceinture. Style illustration africaine vive et pédagogique.",
                altText: "Leuk pose la devinette du serpent à Samba",
                position: 'top',
            },
            footnotes: [],
            vocabWords: [
                { word: "piéton", definition: "Une personne qui marche à pied sur un chemin" }, { word: "devinette", definition: "Un petit jeu où il faut trouver ce que l'on décrit de façon mystérieuse" },
            ],
        }, {
            id: 'riddle-02',
            paragraph: "Samba réfléchit... « C'est le cours d'eau ! » fait Samba. « Non, dit Leuk, c'est le serpent. Peux-tu me dire quelle est la porte la plus longue de toutes et qui ne [[projette]] pas d'ombre ? » Samba hésite... « C'est le puits ? » « Non, cette longue porte, c'est le chemin ! Il est [[horizontal]]. »",
            audioPath: 'story-leuk-riddles-02.mp3',
            illustration: {
                prompt: "Long chemin sablonneux traversant la savane sous un soleil de plomb, sans ombre sur le sol. Samba l'enfant a l'air pensif. Style artistique africain, perspective fuyante.",
                altText: "La devinette du chemin qui n'a pas d'ombre",
                position: 'bottom',
            },
            footnotes: [],
            vocabWords: [
                { word: "projette", definition: "Jeter ou envoyer (ici, envoyer une ombre sur le sol)" }, { word: "horizontal", definition: "Couché à plat, comme la ligne de la terre" },
            ],
        }, {
            id: 'riddle-03',
            paragraph: "« Connais-tu quelqu'un qui tisse [[sans relâche]] et qui ne porte jamais de [[boubou]]{{1}} ? » Samba propose les doigts, mais Leuk rit : « L'araignée ! Elle travaille sans arrêt mais reste toujours nue. » Samba est [[enthousiaste]] : « Continue ! Je vais bien réfléchir à présent. »",
            audioPath: 'story-leuk-riddles-03.mp3',
            illustration: {
                prompt: "Une belle toile d'araignée brillante de rosée entre deux branches, une araignée au centre. Style illustration nature africaine, détails fins.",
                altText: "L'araignée qui tisse sans porter de boubou",
                position: 'top',
            },
            footnotes: [
                { id: 1, term: "boubou", explanation: "Un habit traditionnel africain, large et confortable, porté par les hommes et les femmes." },
            ],
            vocabWords: [
                { word: "sans relâche", definition: "Sans s'arrêter, avec beaucoup de courage et d'effort" }, { word: "enthousiaste", definition: "Très joyeux et impatient de continuer" },
            ],
        },
    ],
};
