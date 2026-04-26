import { Story } from './stories';

export const storyLeukTrick: Story = {
    id: 'leuk-ruse-lievreteau',
    title: 'La ruse de Lièvreteau',
    subtitle: 'Bouki face au petit lièvre',
    ethnie: 'Wolof',
    ethnieImg: 'illustration-wolof.png',
    difficulty: 'facile',
    ageMin: 5,
    readingTime: 4,
    coverColor: '#FF9633', // Yana Orange
    moralLesson: "Même les plus petits peuvent démasquer les menteurs.",

    scenes: [
        {
            id: 'scene-01',
            paragraph: "Bouki-l'[[hyène]] veut manger le petit [[Lièvreteau]]. Mais le petit est malin ! Revenu devant le camp, Bouki essaie d'[[imiter]] la voix de sa mère, la [[Hase]]{{1}}, pour l'attirer dehors.",
            audioPath: 'story-leuk-trick-01.mp3',
            illustration: {
                prompt: "Bouki l'hyène cachée derrière une souche d'arbre, essayant de chanter avec une voix douce. Un petit lièvre méfiant l'écoute depuis l'entrée d'un terrier. Style illustration jeunesse africaine.",
                altText: "Bouki essaie d'imiter la mère de Lièvreteau",
                position: 'top',
            },
            footnotes: [
                { id: 1, term: "la Hase", explanation: "La femelle du lièvre, la maman de Lièvreteau." },
            ],
            vocabWords: [
                { word: "Lièvreteau", definition: "Le bébé du lièvre" }, { word: "imiter", definition: "Faire la même chose que quelqu'un d'autre" },
                { word: "hyène", definition: "Se dit 'Bouki' en wolof.", etymology: "Wolof: Bouki" },
            ],
        }, {
            id: 'scene-02',
            paragraph: "Bouki chante d'une voix tremblante : « Ô Leuk Sène, viens [[téter]] ta mère, chéri ! » Mais Lièvreteau rigole dans son coin. « Ma mère n'a pas une voix si bizarre ! » répond-il sans sortir.",
            audioPath: 'story-leuk-trick-02.mp3',
            illustration: {
                prompt: "Bouki l'hyène qui chante avec une expression ridicule. Le petit lièvre montre ses dents dans un sourire moqueur à l'abri de son terrier. Tons chauds de fin de journée.",
                altText: "Lièvreteau se moque de Bouki",
                position: 'top',
            },
            footnotes: [],
            vocabWords: [
                { word: "nasillarde", definition: "Une voix qui semble sortir par le nez" }, { word: "téter", definition: "Boire le lait de sa maman" },
            ],
        }, {
            id: 'scene-03',
            paragraph: "Bouki revient avec de fausses oreilles, mais Lièvreteau n'est pas [[dupe]]. « Et ma mère n'a pas des pieds si sales ! » L'[[hyène]], furieuse de sa [[maladresse]], finit par abandonner, vaincue par plus petit qu'elle.",
            audioPath: 'story-leuk-trick-03.mp3',
            illustration: {
                prompt: "Bouki l'hyène s'en allant de mauvaise humeur, ses fausses oreilles tombant sur ses yeux. Le petit lièvre est sorti et le regarde partir avec fierté. Style BD africaine colorée.",
                altText: "Bouki abandonne la partie",
                position: 'full',
            },
            footnotes: [],
            vocabWords: [
                { word: "dupe", definition: "Personne que l'on trompe facilement" }, { word: "maladresse", definition: "Manque de précision ou d'habileté" },
                { word: "hyène", definition: "Se dit 'Bouki' en wolof.", etymology: "Wolof: Bouki" },
            ],
        },
    ],
};
