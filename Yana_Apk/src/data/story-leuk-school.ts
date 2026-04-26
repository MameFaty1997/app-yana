import { Story } from './stories';

export const storyLeukSchool: Story = {
    id: 'leuk-a-l-ecole',
    title: "Leuk à l'École",
    subtitle: "Le désir d'apprendre",
    ethnie: 'Wolof',
    ethnieImg: 'illustration-wolof.png',
    difficulty: 'facile',
    ageMin: 6,
    readingTime: 5,
    coverColor: '#10B981', // Emerald Green
    moralLesson: "Le savoir est une richesse que personne ne peut nous voler.",

    scenes: [
        {
            id: 'school-01',
            paragraph: "Un matin, Leuk s'approche d'un grand bâtiment au toit de paille. Il entend des voix d'enfants qui chantent en chœur. C'est l'[[école]] du village. Leuk, [[curieux]], se glisse sous une fenêtre pour mieux [[épier]]{{1}} ce qui se passe à l'intérieur.",
            audioPath: 'story-leuk-school-01.mp3',
            illustration: {
                prompt: "Le lièvre Leuk caché dans les hautes herbes, observant par la fenêtre une salle de classe africaine traditionnelle avec des enfants en uniforme. Style illustration jeunesse africaine, tons verts et ocre, lumière du matin.",
                altText: "Leuk observe l'école par la fenêtre",
                position: 'top',
            },
            footnotes: [
                { id: 1, term: "épier", explanation: "Regarder en cachette pour ne pas être vu." },
            ],
            vocabWords: [
                { word: "école", definition: "Lieu où l'on apprend à lire, écrire et compter" }, { word: "curieux", definition: "Qui a envie de tout savoir et de tout découvrir" },
            ],
        }, {
            id: 'school-02',
            paragraph: "Le maître écrit sur un grand [[tableau noir]]. Il dessine des signes mystérieux : A, B, C... « Ce sont des lettres », explique le maître. Leuk écarquille les yeux. « On dirait des traces de pattes sur le sable ! » se dit-il avec [[étonnement]].",
            audioPath: 'story-leuk-school-02.mp3',
            illustration: {
                prompt: "Gros plan sur un tableau noir avec l'alphabet écrit à la craie blanche. Une main de maître tenant une craie. Leuk regarde avec fascination de l'autre côté de la vitre. Style dessiné, couleurs contrastées.",
                altText: "Le maître écrit l'alphabet au tableau",
                position: 'top',
            },
            footnotes: [],
            vocabWords: [
                { word: "alphabet", definition: "L'ensemble des lettres qui servent à écrire les mots d'une langue" }, { word: "étonnement", definition: "Grande surprise devant quelque chose de nouveau" },
            ],
        }, {
            id: 'school-03',
            paragraph: "Les enfants répètent après le maître. Leuk répète aussi, tout bas : « A... B... C... ». Il comprend que ces signes permettent de garder la [[parole]] sur le papier. « C'est une ruse plus forte que toutes les miennes ! » pense le [[lièvre]], [[impressionné]].",
            audioPath: 'story-leuk-school-03.mp3',
            illustration: {
                prompt: "Leuk assis sous la fenêtre, imitant les enfants en bougeant ses lèvres. Expression de concentration intense. Style illustration colorée, atmosphère studieuse et joyeuse.",
                altText: "Leuk apprend l'alphabet en secret",
                position: 'bottom',
            },
            footnotes: [],
            vocabWords: [
                { word: "parole", definition: "Ce que l'on dit avec la bouche, qui s'envole si on ne l'écrit pas" }, { word: "impressionné", definition: "Admiratif devant la force ou l'intelligence de quelque chose" },
                { word: "lièvre", definition: "Se dit 'Leuk' en wolof.", etymology: "Wolof: Leuk" },
            ],
        }, {
            id: 'school-04',
            paragraph: "À la récréation, Leuk s'en va en trottinant. Il trace des signes dans la poussière avec son doigt. Il a compris que l'école est le chemin de la [[sagesse]]. Désormais, il ne se contentera plus de ruser, il voudra aussi [[savoir]].",
            audioPath: 'story-leuk-school-04.mp3',
            illustration: {
                prompt: "Leuk traçant un 'A' dans le sable avec sa patte dans la savane, les yeux brillants d'une nouvelle intelligence. Style fresque africaine, tons dorés de fin de journée.",
                altText: "Leuk écrit son premier mot dans le sable",
                position: 'full',
            },
            footnotes: [],
            vocabWords: [
                { word: "sagesse", definition: "Connaissance et intelligence qui permettent de faire les bons choix" }, { word: "savoir", definition: "Connaître beaucoup de choses grâce à l'étude" },
            ],
        },
    ],
};
