import { Story } from './stories';

export const storySenegalDieu: Story = {
    id: 'senegal-dieu',
    title: "Dieu est grand !",
    subtitle: 'Contes du Sénégal',
    ethnie: "Sénégal",
    ethnieImg: "illustration-village.png",
    difficulty: 'facile',
    ageMin: 5,
    readingTime: 3,
    coverColor: '#CDDC39',
    moralLesson: "Rien n'est éternel sur Terre ; Dieu seul a le pouvoir absolu de tout transformer.",
    scenes: [
        {
            id: 'scene-01',
            paragraph: "Il était une fois un vieil homme pauvre et dévot du Grand Seigneur, mendiant son pain devant le palais luxuriant du riche roi. À chaque don royal ou charitable, ce brave monsieur répondait inlassablement de sa belle voix vibrante de gratitude : « Hamdoulilah ! Le Bon [[Dieu]] est grand ! [[Dieu]] seul est l'infiniment Grand ! ».",
            audioPath: '',
            illustration: { prompt: "", altText: "Illustration de la scène", position: 'top' },
            footnotes: [], vocabWords: [
                
                { word: "Dieu", definition: "Se dit 'Yalla' en wolof.", etymology: "Wolof: Yalla" },
            ],
        }, {
            id: 'scene-02',
            paragraph: "Agacé au plus haut point par ce refrain qu'il jugeait insultant à l'égard de sa toute-puissance temporelle, le roi convoqua le pauvre homme dans la salle du trône rutilante. Offensé, le souverain décida de lui confier pour la garde, sous peine de mort pour trahison le plus gros coffre d'or de tout son fastueux palais.",
            audioPath: '',
            illustration: { prompt: "", altText: "Illustration de la scène", position: 'bottom' },
            footnotes: [], vocabWords: [],
        }, {
            id: 'scene-03',
            paragraph: "A la nuit tombée noire, le roi corrompu fit voler en secret par l'entremise perfide de ses habiles gardes son propre grand coffre au domicile pourtant barricadé du pauvre ermite et dissimula perfidement le lourd butin volé loin dans l'étang voisin.",
            audioPath: '',
            illustration: { prompt: "", altText: "Illustration de la scène", position: 'full' },
            footnotes: [], vocabWords: [],
        }, {
            id: 'scene-04',
            paragraph: "Peu après le vol honteux, devant le tribunal et jugeant sommairement, le souverain condamna cyniquement à mort son gardien déchu. Sur le point fatal du billot, l'ermite en ultime prière vers le Ciel repêcha sans le faire exprès un lourd coffre remonté d'un gros poisson inespéré pêché in extremis... le trésor disparu de l'étang du roi éberlué.",
            audioPath: '',
            illustration: { prompt: "", altText: "Illustration de la scène", position: 'top' },
            footnotes: [], vocabWords: [],
        }, {
            id: 'scene-05',
            paragraph: "Le roi stupéfait publiquement par la justesse manifeste de l’innocence prouvée, et de cette providentielle protection inouïe du mendiant s'inclina jusqu’à terre et se repentit en sanglotant avec émotion. « Ta sentence est abolie. Il est dorénavant indéniablement prouvé à tous nos yeux... la Grandeur Absolue s'exerce au-dessus de chaque tyran ici-bas ! » s'exclama-t-il.",
            audioPath: '',
            illustration: { prompt: "", altText: "Illustration de la scène", position: 'bottom' },
            footnotes: [], vocabWords: [],
        }
    ]
};
