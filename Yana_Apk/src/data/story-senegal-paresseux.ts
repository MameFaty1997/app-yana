import { Story } from './stories';

export const storySenegalParesseux: Story = {
    id: 'senegal-paresseux',
    title: "Les trois paresseux",
    subtitle: 'Contes du Sénégal',
    ethnie: "Sénégal",
    ethnieImg: "illustration-village.png",
    difficulty: 'facile',
    ageMin: 5,
    readingTime: 3,
    coverColor: '#FFB74D',
    moralLesson: "L'habitude de la paresse devient souvent une seconde nature difficile à vaincre.",
    scenes: [
        {
            id: 'scene-01',
            paragraph: "Au village des animaux, la famine s’était installée. Le [[lion]], chef de la communauté, convoqua une assemblée. « Mes chers voisins, dit le [[lion]], la chasse est proscrite ici. J’exige que chacun s’investisse dans les travaux champêtres pour lutter contre la faim. » Cela visait les paresseux notoires : le [[singe]], le chien et la chèvre.",
            audioPath: '',
            illustration: { prompt: "", altText: "Illustration de la scène", position: 'top' },
            footnotes: [], vocabWords: [
                
                { word: "lion", definition: "Se dit 'Gaïndé' en wolof. Le roi de la savane.", etymology: "Wolof: Gaïndé" },
                { word: "singe", definition: "Se dit 'Golo' en wolof.", etymology: "Wolof: Golo" },
            ],
        }, {
            id: 'scene-02',
            paragraph: "Les trois incriminés demandèrent à se concerter. Le chien geignit : « C'est injuste, aller aux champs me forcerait à laisser ma tendre compagne toute seule ! ». La chèvre s'insurgea : « Jamais ma race n'épuisera ses frêles pattes à labourer ! Le [[lion]] est juste jaloux de l'ombre de mes grands arbres. »",
            audioPath: '',
            illustration: { prompt: "", altText: "Illustration de la scène", position: 'bottom' },
            footnotes: [], vocabWords: [
                
                { word: "lion", definition: "Se dit 'Gaïndé' en wolof. Le roi de la savane.", etymology: "Wolof: Gaïndé" },
            ],
        }, {
            id: 'scene-03',
            paragraph: "Le [[singe]] conclut : « La dynastie simienne s'est toujours contentée de regarder les pauvres animaux semer d'en haut. Toi, chien coureur, tu trouveras toujours un os. Toi, chèvre maraudeuse, les feuilles mortes te suffisent. Et moi, je voyagerai de liane en liane. »",
            audioPath: '',
            illustration: { prompt: "", altText: "Illustration de la scène", position: 'full' },
            footnotes: [], vocabWords: [
                
                { word: "singe", definition: "Se dit 'Golo' en wolof.", etymology: "Wolof: Golo" },
            ],
        }, {
            id: 'scene-04',
            paragraph: "Ils décidèrent alors de rejeter la proposition du [[lion]], sous prétexte qu’en travaillant, ils cesseraient d’être ce qu’ils avaient toujours été. C’est ainsi que le chien, le [[singe]] et la chèvre refusèrent l'effort, et restèrent à jamais de fervents et misérables partisans du moindre effort.",
            audioPath: '',
            illustration: { prompt: "", altText: "Illustration de la scène", position: 'top' },
            footnotes: [], vocabWords: [
                
                { word: "lion", definition: "Se dit 'Gaïndé' en wolof. Le roi de la savane.", etymology: "Wolof: Gaïndé" },
                { word: "singe", definition: "Se dit 'Golo' en wolof.", etymology: "Wolof: Golo" },
            ],
        }
    ]
};
