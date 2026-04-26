import { Story } from './stories';

export const storyLeuk: Story = {
    id: 'leuk-le-lievre',
    title: 'Le Plus Jeune Animal',
    subtitle: 'Lecture cursive',
    ethnie: 'Wolof',
    ethnieImg: 'illustration-wolof.png',
    difficulty: 'moyen',
    ageMin: 7,
    readingTime: 5,
    coverColor: '#8B4513',
    moralLesson: "L'intelligence et la créativité valent mieux que la force ou l'ancienneté.",

    scenes: [
        {
            id: 'scene-01',
            paragraph: "C'est au temps où les animaux de la [[brousse]]{{1}} aiment à se réunir pour [[causer]] et discuter de leurs affaires. Certain jour, ils se rassemblent, sous l'[[arbre des palabres]]{{2}}, pour désigner le plus jeune animal.",
            audioPath: 'story-leuk-01.mp3',
            illustration: {
                prompt: "Illustration style africain afrofuturiste chaud, animaux africains réunis en cercle sous un grand baobab dans la brousse sénégalaise au coucher du soleil. Lion trônant au centre, éléphant, hyène, biche, chacal, singe et lièvre présents. Style BD africaine colorée, tons chauds orange et ocre, trait épais, fond jungle.",
                altText: "Les animaux réunis sous l'arbre des palabres",
                position: 'top',
            },
            footnotes: [
                { id: 1, term: "la brousse", explanation: "La campagne africaine, la nature sauvage." }, { id: 2, term: "l'arbre des palabres", explanation: "L’arbre au centre du village sous lequel se réunissent les habitants pour discuter." },
            ],
            vocabWords: [
                { word: "brousse", definition: "La nature sauvage, loin des villes.", etymology: "Wolof: All" }, { word: "causer", definition: "Parler, discuter entre amis.", etymology: "Wolof: Wax" }, { word: "arbre des palabres", definition: "Un lieu de discussion traditionnel très respecté.", etymology: "Wolof: Garabu Wax" },
            ],
        }, {
            id: 'scene-02',
            paragraph: "Oncle [[Gaïndé]]-le-[[lion]] [[préside la séance]]{{3}}. On connaît le plus fort de tous les animaux : c'est [[Gaïndé]]-le-[[lion]], roi de la brousse. On connaît le plus vieux: c'est [[Mame-Gnèye]]-l'éléphant. On connaît aussi le plus malhonnête et le moins intelligent: c'est [[Bouki]]-l'[[hyène]]. Mais on ne connaît pas le plus intelligent.",
            audioPath: 'story-leuk-02.mp3',
            illustration: {
                prompt: "Portrait majestueux du lion Gaïndé assis sur un rocher comme un roi africain, couronne dorée symbolique, entouré de l'éléphant sage Mame-Gnèye et de la hyène Bouki à l'air sournois. Style illustration jeunesse africaine, couleurs riches, décor de savane sénégalaise.",
                altText: "Gaïndé le lion, Mame-Gnèye l'éléphant et Bouki la hyène",
                position: 'top',
            },
            footnotes: [
                { id: 3, term: "préside la séance", explanation: "Dirige la discussion." },
            ],
            vocabWords: [
                { word: "Gaïndé", definition: "Nom du lion en langue wolof", etymology: "Wolof : Gaïndé = Lion" }, { word: "Mame-Gnèye", definition: "Nom respectueux donné à l'éléphant, 'Mame' signifie grand-père en wolof" }, { word: "Bouki", definition: "Nom de la hyène en wolof, souvent rusée mais malchanceuse dans les contes" },
                { word: "lion", definition: "Se dit 'Gaïndé' en wolof.", etymology: "Wolof: Gaïndé" }, { word: "hyène", definition: "Se dit 'Bouki' en wolof.", etymology: "Wolof: Bouki" },
            ],
        }, {
            id: 'scene-03',
            paragraph: "Tout le monde veut [[passer pour]]{{4}} le plus [[intelligent]] de tous les animaux. Oncle Gaïndé-le-[[lion]] dit : « Si nous connaissons le plus [[jeune]] d'entre nous, nous connaîtrons en même temps le plus [[intelligent]]. » Alors ceux qui croient être les plus [[jeune]]s lèvent la main.",
            audioPath: 'story-leuk-03.mp3',
            illustration: {
                prompt: "Scène de réunion animale dans la savane sénégalaise, plusieurs animaux levant la patte ou la main pour se désigner. Atmosphère animée et joyeuse, style illustration africaine colorée pour enfants, lumière dorée de l'après-midi.",
                altText: "Les animaux lèvent la main pour se désigner les plus jeunes",
                position: 'bottom',
            },
            footnotes: [
                { id: 4, term: "passer pour", explanation: "Paraître, être considéré comme." },
            ],
            vocabWords: [
                { word: "passer pour", definition: "Faire croire aux autres que l'on est quelque chose." }, { word: "intelligent", definition: "Se dit 'Muus' en wolof. Qui comprend vite les choses.", etymology: "Wolof: Muus" }, { word: "jeune", definition: "Se dit 'Ndaw' en wolof.", etymology: "Wolof: Ndaw" },
                { word: "lion", definition: "Se dit 'Gaïndé' en wolof.", etymology: "Wolof: Gaïndé" },
            ],
        }, {
            id: 'scene-04',
            paragraph: "« Moi, je suis née l'année de la grande [[sécheresse]], c'est-à-dire il y a trois ans », déclare la [[Biche]]. « Moi, je suis né il y a trois [[lunes]], affirme le [[Chacal]] en dressant ses oreilles pointues. « Et moi, dit le [[Singe]] en se grattant, tenez, je viens de naître. »",
            audioPath: 'story-leuk-04.mp3',
            illustration: {
                prompt: "Trois animaux africains parlant tour à tour : une biche élégante, un chacal aux oreilles dressées, un singe se grattant la tête avec une expression comique. Style bande dessinée africaine pour enfants, bulles de dialogue, couleurs chaudes et vives.",
                altText: "La biche, le chacal et le singe se présentent",
                position: 'top',
            },
            footnotes: [],
            vocabWords: [
                { word: "sécheresse", definition: "Période sans pluie (Lool)." , etymology: "Wolof: Lool"}, { word: "lunes", definition: "Unité de temps (Weer) équivalente à un mois.", etymology: "Wolof: Weer" }, { word: "Biche", definition: "Se dit 'Kewël' en wolof.", etymology: "Wolof: Kewël" }, { word: "Chacal", definition: "Se dit 'Till' en wolof.", etymology: "Wolof: Till" }, { word: "Singe", definition: "Se dit 'Golo' en wolof.", etymology: "Wolof: Golo" },
            ],
        }, {
            id: 'scene-05',
            paragraph: "Tout le monde applaudit, et le [[Singe]] se croit [[vainqueur]] lorsqu'une voix crie du haut d'un arbre: « Attention! Je vais naître. Un peu de place pour me recevoir. » Et [[Leuk]]-le-[[lièvre]], lâchant la branche à laquelle il s'est accroché, tombe au milieu des animaux [[étonnés]].",
            audioPath: 'story-leuk-05.mp3',
            illustration: {
                prompt: "Moment dramatique et comique : le lièvre Leuk saute d'un arbre et tombe au milieu du cercle d'animaux surpris et bouche bée. Expression de stupéfaction sur tous les visages animaux. Style illustration africaine dynamique pour enfants, mouvement et énergie, tons chauds.",
                altText: "Leuk le lièvre tombe du haut de l'arbre",
                position: 'full',
            },
            footnotes: [],
            vocabWords: [
                { word: "Leuk", definition: "Nom du lièvre en wolof, personnage célèbre des contes africains, toujours plus malin que les autres", etymology: "Wolof : Leuk = Lièvre" }, { word: "vainqueur", definition: "Celui qui a gagné, remporté une épreuve" }, { word: "étonnés", definition: "Très surpris, n'ayant pas du tout attendu ce qui arrive" },
                { word: "lièvre", definition: "Se dit 'Leuk' en wolof.", etymology: "Wolof: Leuk" }, { word: "singe", definition: "Se dit 'Golo' en wolof.", etymology: "Wolof: Golo" },
            ],
        }, {
            id: 'scene-06',
            paragraph: "Tout le monde [[reconnaît]] que Leuk-le-[[lièvre]] est en effet le plus jeune, puisqu'il vient de naître au milieu de la discussion. Donc il est [[reconnu]] en même temps comme [[le plus intelligent]]{{5}}. Oncle Gaïndé-le-[[lion]] se lève et s'approche de Leuk-le-[[lièvre]] : « Je te [[proclame]] le plus intelligent des animaux. »",
            audioPath: 'story-leuk-06.mp3',
            illustration: {
                prompt: "Scène finale solennelle et chaleureuse : le lion majestueux Gaïndé pose sa grande patte sur l'épaule du petit lièvre Leuk fièrement debout. Tous les animaux applaudissent autour. Lumière dorée de coucher de soleil sur la savane sénégalaise. Style illustration africaine célébration.",
                altText: "Gaïndé proclame Leuk le plus intelligent",
                position: 'top',
            },
            footnotes: [
                { id: 5, term: "le plus intelligent", explanation: "Est jugé." },
            ],
            vocabWords: [
                { word: "proclame", definition: "Annonce officiellement devant tout le monde" }, { word: "reconnaît", definition: "Accepte et admet que quelque chose est vrai" },
                { word: "lion", definition: "Se dit 'Gaïndé' en wolof.", etymology: "Wolof: Gaïndé" }, { word: "lièvre", definition: "Se dit 'Leuk' en wolof.", etymology: "Wolof: Leuk" },
            ],
        },
    ],
};
