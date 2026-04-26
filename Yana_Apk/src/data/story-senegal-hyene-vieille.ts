import { Story } from './stories';

export const storySenegalHyeneVieille: Story = {
    id: 'senegal-hyene-vieille',
    title: "L'hyène et la vieille",
    subtitle: 'Contes du Sénégal',
    ethnie: "Sénégal",
    ethnieImg: "illustration-village.png",
    difficulty: 'facile',
    ageMin: 5,
    readingTime: 3,
    coverColor: '#009688',
    moralLesson: "Le chantage et la méchanceté finissent par se retourner contre celui qui les exerce.",
    scenes: [
        {
            id: 'scene-01',
            paragraph: "Il était une fois l’[[hyène]] et une vieille femme. L’[[hyène]] attrapa une chèvre en pleine brousse et alla voir la vieille pour lui proposer de l'échanger. La vieille femme, effrayée par la brute, accepta à contre-courant. L'[[hyène]] s'en alla manger la chèvre dans son campement.",
            audioPath: '',
            illustration: { prompt: "", altText: "Illustration de la scène", position: 'top' },
            footnotes: [], vocabWords: [
                
                { word: "hyène", definition: "Se dit 'Bouki' en wolof. Souvent rusée mais malchanceuse.", etymology: "Wolof: Bouki" },
            ],
        }, {
            id: 'scene-02',
            paragraph: "Gourmande, l'[[hyène]] revint menacer la dame ! « Donne-moi une autre chèvre ou je reprends la mienne. » La femme lui donna une autre bête. Une fois de plus l'[[hyène]] la mangea. Et elle revint encore ! Elle lui arracha une troisième et menaça la dame « Ou je reprends ma bête de départ ou je te tue cette fois ». ",
            audioPath: '',
            illustration: { prompt: "", altText: "Illustration de la scène", position: 'bottom' },
            footnotes: [], vocabWords: [
                
                { word: "hyène", definition: "Se dit 'Bouki' en wolof. Souvent rusée mais malchanceuse.", etymology: "Wolof: Bouki" },
            ],
        }, {
            id: 'scene-03',
            paragraph: "Un [[lion]] majestueux passait par là et vit la grand-mère assise dans la poussière en pleurant misérablement face au chantage violent dont elle fut victime. Le grand roi, soucieux de rendre justice sur une mécréante, proposa immédiatement de revêtir furtivement la peau d'une quatrième pauvre bête sacrifiée qu'on offrirait dès demain au vorace tyran.",
            audioPath: '',
            illustration: { prompt: "", altText: "Illustration de la scène", position: 'full' },
            footnotes: [], vocabWords: [
                
                { word: "lion", definition: "Se dit 'Gaïndé' en wolof. Le roi de la savane.", etymology: "Wolof: Gaïndé" },
            ],
        }, {
            id: 'scene-04',
            paragraph: "Le jour d'après, l'[[hyène]] s'approchait impatiente et sûre d'elle pour son repas en menaçant les bois de ses grognements. La dame tremblante lui présenta en appât le roi habillé qui fut pris fébrilement par le maître chanteur. L'[[hyène]] en cours de route reçut sur la patte un sévère coup de griffe et pesta. L'instant d'après, on lui hurla la surprise que ce n'était point une chèvre qu'elle tirait à la corde : c'est un [[lion]] furieux !",
            audioPath: '',
            illustration: { prompt: "", altText: "Illustration de la scène", position: 'top' },
            footnotes: [], vocabWords: [
                
                { word: "lion", definition: "Se dit 'Gaïndé' en wolof. Le roi de la savane.", etymology: "Wolof: Gaïndé" },
                { word: "hyène", definition: "Se dit 'Bouki' en wolof. Souvent rusée mais malchanceuse.", etymology: "Wolof: Bouki" },
            ],
        }
    ]
};
