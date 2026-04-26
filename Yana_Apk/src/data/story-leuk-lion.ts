import { Story } from './stories';

export const storyLeukLion: Story = {
    id: 'leuk-chez-le-lion',
    title: 'Leuk chez Oncle Gaïndé',
    subtitle: 'La ruse de la potion',
    ethnie: 'Wolof',
    ethnieImg: 'illustration-wolof.png',
    difficulty: 'moyen',
    ageMin: 7,
    readingTime: 5,
    coverColor: '#E85D04', // Lion Orange
    moralLesson: "Face au danger, le calme et l'astuce permettent de s'en sortir.",

    scenes: [
        {
            id: 'scene-01',
            paragraph: "Porteur de lait d'éléphant et de baleine, Leuk se rend chez Oncle [[Gaïndé]]-le-[[lion]]. « [[Que viens-tu faire]] dans ma [[demeure]] ? » rugit le roi d'une voix de tonnerre. Leuk ne tremble pas et s'incline.",
            audioPath: 'story-leuk-lion-01.mp3',
            illustration: {
                prompt: "Le petit lièvre Leuk debout devant le lion majestueux Gaïndé assis sur un trône de rochers dans une grotte sombre. Leuk porte deux calebasses. Atmosphère tendue et royale.",
                altText: "Leuk arrive chez le Lion Gaïndé",
                position: 'top',
            },
            footnotes: [],
            vocabWords: [
                { word: "Gaïndé", definition: "Nom du lion en wolof" }, { word: "demeure", definition: "La maison, le lieu où l'on habite" },
                { word: "lion", definition: "Se dit 'Gaïndé' en wolof.", etymology: "Wolof: Gaïndé" },
            ],
        }, {
            id: 'scene-02',
            paragraph: "« Oncle [[Lion]], une terrible épidémie arrive ! » annonce Leuk. « Seule une [[potion]] magique peut nous sauver. Mais il me faut pour cela une [[dent de lion]] saignante. Êtes-vous prêt à ce [[sacrifice]] pour votre peuple ? »",
            audioPath: 'story-leuk-lion-02.mp3',
            illustration: {
                prompt: "Leuk expliquant son plan au lion. Le lion a l'air inquiet et réfléchi. Style illustration africaine, ombres marquées.",
                altText: "Leuk prévient le lion de l'épidémie",
                position: 'top',
            },
            footnotes: [],
            vocabWords: [
                { word: "potion", definition: "Un mélange magique à boire" }, { word: "sacrifice", definition: "Donner quelque chose d'important pour aider les autres" },
                { word: "lion", definition: "Se dit 'Gaïndé' en wolof.", etymology: "Wolof: Gaïndé" },
            ],
        }, {
            id: 'scene-03',
            paragraph: "Le [[Lion]], qui a justement mal aux dents, accepte. Un forgeron retire une grosse [[molaire]]. Leuk s'enfuit avec son [[trophée]], ravi de son nouveau tour. Il a maintenant tout ce qu'il lui faut pour prouver sa ruse.",
            audioPath: 'story-leuk-lion-03.mp3',
            illustration: {
                prompt: "Leuk s'enfuyant joyeusement dans la brousse avec une grosse dent blanche dans les mains. En arrière-plan, le lion se tient la mâchoire. Style dynamique et coloré.",
                altText: "Leuk récupère la dent du lion",
                position: 'full',
            },
            footnotes: [],
            vocabWords: [
                { word: "molaire", definition: "Une grosse dent du fond qui sert à broyer les aliments" }, { word: "trophée", definition: "Objet que l'on garde pour fêter une victoire" },
                { word: "lion", definition: "Se dit 'Gaïndé' en wolof.", etymology: "Wolof: Gaïndé" },
            ],
        },
    ],
};
