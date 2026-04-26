import { Story } from './stories';

export const storySenegalTaureaux: Story = {
    id: 'senegal-taureaux',
    title: "Les trois taureaux et le lion",
    subtitle: 'Contes du Sénégal',
    ethnie: "Sénégal",
    ethnieImg: "illustration-village.png",
    difficulty: 'moyen',
    ageMin: 7,
    readingTime: 3,
    coverColor: '#4CAF50',
    moralLesson: "L'union fait la force, et la division profite à l'ennemi.",
    scenes: [
        {
            id: 'scene-01',
            paragraph: "Il était une fois trois taureaux de trois robes différentes : noire, rouge et blanche. Ils s’engraissèrent au point que chaque habitant du village voulait en faire sa propriété. Un jour, redoutant l'intelligence des hommes, ils décidèrent d'un commun accord de fuir le village pour aller se réfugier dans la forêt épaisse où ils pensaient trouver la paix.",
            audioPath: '',
            illustration: { prompt: "", altText: "Illustration de la scène", position: 'top' },
            footnotes: [], vocabWords: [],
        }, {
            id: 'scene-02',
            paragraph: "Un [[lion]] qui rodait par là fut stupéfait par la vue de ces formidables proies. Conscient qu'il ne pouvait rien contre eux tous ensemble en raison de leur force extraordinaire, le [[lion]] rusé s'approcha pour leur proposer son amitié et une union sacrée afin de surmonter la menace des chasseurs. Croyant bien faire, les taureaux acceptèrent.",
            audioPath: '',
            illustration: { prompt: "", altText: "Illustration de la scène", position: 'bottom' },
            footnotes: [], vocabWords: [
                
                { word: "lion", definition: "Se dit 'Gaïndé' en wolof. Le roi de la savane.", etymology: "Wolof: Gaïndé" },
            ],
        }, {
            id: 'scene-03',
            paragraph: "Un jour, pendant que le taureau blanc dormait, le [[lion]] murmura aux deux autres : « La robe du taureau blanc est si visible que les chasseurs nous retrouveront facilement, de jour comme de nuit. Laissez-moi l’éliminer pour notre protection globale. » Les taureaux rouge et noir consentirent. Sans attendre, le [[lion]] bondit et tua le taureau blanc.",
            audioPath: '',
            illustration: { prompt: "", altText: "Illustration de la scène", position: 'full' },
            footnotes: [], vocabWords: [
                
                { word: "lion", definition: "Se dit 'Gaïndé' en wolof. Le roi de la savane.", etymology: "Wolof: Gaïndé" },
            ],
        }, {
            id: 'scene-04',
            paragraph: "Quelques jours plus tard, alors que le taureau noir reposait, le [[lion]] souffla la même tromperie au taureau rouge, prétextant que le pelage noir attirait les chasseurs la nuit. Le taureau rouge accepta encore cette explication insensée. Aussitôt, le [[lion]] attaqua son ami et l'élimina aussi.",
            audioPath: '',
            illustration: { prompt: "", altText: "Illustration de la scène", position: 'top' },
            footnotes: [], vocabWords: [
                
                { word: "lion", definition: "Se dit 'Gaïndé' en wolof. Le roi de la savane.", etymology: "Wolof: Gaïndé" },
            ],
        }, {
            id: 'scene-05',
            paragraph: "Seul avec la dernière victime, le [[lion]] lui dit un matin : « Mon ami, j'ai faim et je veux manger de la viande. » Surpris, le taureau rouge lui suggéra d'aller chasser. Le [[lion]] éclata de rire : « Tu penses que je suis idiot au point d'aller chasser alors que tu es là ? Je vous ai dupés depuis le début. » Comprenant la vérité, le taureau pleura de sa naïveté avant de finir, à son tour, sous les griffes du carnassier.",
            audioPath: '',
            illustration: { prompt: "", altText: "Illustration de la scène", position: 'bottom' },
            footnotes: [], vocabWords: [
                
                { word: "lion", definition: "Se dit 'Gaïndé' en wolof. Le roi de la savane.", etymology: "Wolof: Gaïndé" },
            ],
        }
    ]
};
