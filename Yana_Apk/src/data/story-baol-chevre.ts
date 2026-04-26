import { Story } from './stories';

export const storyBaolChevre: Story = {
    id: 'baol-chevre-et-petits',
    title: 'La chèvre et ses petits',
    subtitle: 'La leçon du rejet',
    ethnie: 'Wolof du Baol',
    ethnieImg: 'illustration-wolof.png',
    difficulty: 'facile',
    ageMin: 5,
    readingTime: 4,
    coverColor: '#D35400',
    moralLesson: "Il faut aimer et traiter tous ses enfants avec égalité. Celui qu'on néglige est parfois le seul qui nous soutiendra.",

    scenes: [
        {
            id: 'scene-01',
            paragraph: "Il était une fois une maman chèvre qui avait cinq chevreaux. Bizarrement, elle n'en aimait que quatre, qu'elle nourrissait abondamment. Son [[aversion]] pour le cinquième, plus petit, était totale. Chaque soir, au retour du pâturage, elle appelait joyeusement ses quatre favoris pour la [[tétée]].",
            audioPath: 'story-baol-chevre-01.mp3',
            illustration: {
                prompt: "Une belle chèvre blanche appelant ses quatre gentils chevreaux luisants de graisse, tandis qu'un cinquième chevreau maigre et triste reste à l'écart.",
                altText: "La chèvre et ses petits favoris",
                position: 'top',
            },
            footnotes: [],
            vocabWords: [
                { word: "aversion", definition: "Un très fort dégoût, un rejet profond" }, { word: "tétée", definition: "Le fait de boire le lait de sa mère" },
            ],
        }, {
            id: 'scene-02',
            paragraph: "Les quatre cabris tétaient avec gourmandise et se moquaient cruellement du petit malheureux. « Tu mourras de faim, [[rachitique]] créature ! » lui lançaient-ils en riant. À cela, le petit cabri rejeté répondait toujours doucement : « Celui que [[Dieu]] protège se contente de son sort. »",
            audioPath: 'story-baol-chevre-02.mp3',
            illustration: {
                prompt: "Quatre gros chevreaux en train de téter joyeusement, tournant la tête pour se moquer du petit chevreau maigre qui attend patiemment à l'ombre d'un arbuste.",
                altText: "Les moqueries des frères",
                position: 'top',
            },
            footnotes: [],
            vocabWords: [
                { word: "rachitique", definition: "Qui est maigre, faible et chétif" }, { word: "contenter", definition: "Se satisfaire de ce que l'on a" },
                { word: "Dieu", definition: "Se dit 'Yalla' en wolof.", etymology: "Wolof: Yalla" },
            ],
        }, {
            id: 'scene-03',
            paragraph: "Un jour, Bouki l'[[hyène]] fut attirée par le [[bêlement]] des petits protégés. Informée des habitudes de la mère chèvre, l'[[hyène]] alla devancer son retour. [[Dissimulée]] derrière un énorme buisson, l'[[hyène]] utilisa un gros sac et se prépara à un festin.",
            audioPath: 'story-baol-chevre-03.mp3',
            illustration: {
                prompt: "L'hyène Bouki cachée derrière un gros buisson, salivant avec un gros sac en toile à la main, observant la clairière.",
                altText: "Le piège de Bouki",
                position: 'full',
            },
            footnotes: [
                { id: 1, term: "Bouki", explanation: "L'hyène, souvent représentée comme stupide ou gourmande dans les contes Wolof." },
            ],
            vocabWords: [
                { word: "bêlement", definition: "Le cri de la chèvre ou du mouton" }, { word: "dissimulée", definition: "Cachée pour ne pas être vue" },
                { word: "hyène", definition: "Se dit 'Bouki' en wolof.", etymology: "Wolof: Bouki" },
            ],
        }, {
            id: 'scene-04',
            paragraph: "En entendant de faux appels, les quatre petits gras accoururent, sûrs de trouver leur mère... mais furent capturés par l'[[hyène]] [[goulue]] ! Le cinquième, par prudence et méfiance, était resté en retrait. Le soir, quand la maman chèvre revint vraiment du pâturage, ses mamelles gonflées de lait, elle chercha en vain ses petits [[choyés]].",
            audioPath: 'story-baol-chevre-04.mp3',
            illustration: {
                prompt: "La pauvre chèvre tournant en rond dans la nuit tombante avec des mamelles très gonflées, cherchant désespérément ses chevreaux. Le petit survivant la regarde de loin.",
                altText: "La disparition",
                position: 'top',
            },
            footnotes: [],
            vocabWords: [
                { word: "goulue", definition: "Qui mange avec excès et grande avidité" }, { word: "choyés", definition: "Qui sont traités avec beaucoup de tendresse et de soins" },
                { word: "hyène", definition: "Se dit 'Bouki' en wolof.", etymology: "Wolof: Bouki" },
            ],
        }, {
            id: 'scene-05',
            paragraph: "Seul le petit cabri mal-aimé s'avança tristement : « Mère, Bouki est passée par là. Seul Yalla Séré, le négligé, a survécu à son [[redoutable]] appétit. » Devant sa douleur, le petit cabri, bien qu'il ait toujours été repoussé, s'approcha pour la soulager et partager sa tendresse. Ce jour-là, la mère apprit l'immense valeur de l'amour maternel [[équitable]].",
            audioPath: 'story-baol-chevre-05.mp3',
            illustration: {
                prompt: "La mère chèvre pleurant, blottie contre son dernier petit chevreau maigre qui la console doucement et l'aide.",
                altText: "La réconciliation et le pardon",
                position: 'full',
            },
            footnotes: [],
            vocabWords: [
                { word: "redoutable", definition: "Qui fait très peur, qui est dangereux" }, { word: "équitable", definition: "Qui est juste pour tout le monde" },
            ],
        },
    ],
};
