import { Story } from './stories';

export const storyLeukSky: Story = {
    id: 'leuk-le-ciel',
    title: 'Le Ciel',
    subtitle: 'Légende et Science',
    ethnie: 'Wolof',
    ethnieImg: 'illustration-wolof.png',
    difficulty: 'avancé',
    ageMin: 9,
    readingTime: 7,
    coverColor: '#4C1D95',
    moralLesson: "Il faut se méfier des mauvaises langues et chercher à comprendre la vérité par la connaissance.",

    scenes: [
        {
            id: 'sky-01',
            paragraph: "Madame Bouki est assise au milieu de ses enfants. À côté d'elle, Bouki, encore malade, est couché sur le dos. « La lune, commence-t-elle, était [[autrefois]] plus blanche que du lait, aussi propre que de la [[percale]]{{1}} neuve. Il n'y avait pas de différence entre le jour et la nuit. »",
            audioPath: 'story-leuk-sky-01.mp3',
            illustration: {
                prompt: "Famille de hyènes assise dans une grotte sous un ciel étoilé. La mère hyène raconte une histoire. Style illustration africaine, tons violets et bleus profonds, atmosphère mystérieuse et familiale.",
                altText: "Madame Bouki raconte une histoire à ses enfants",
                position: 'top',
            },
            footnotes: [
                { id: 1, term: "percale", explanation: "Un tissu de coton très fin, très serré et souvent très blanc, utilisé pour faire des draps ou des vêtements de qualité." },
            ],
            vocabWords: [
                { word: "autrefois", definition: "Dans un temps passé, il y a très longtemps" }, { word: "clarté", definition: "La lumière qui permet de voir clair" },
            ],
        }, {
            id: 'sky-02',
            paragraph: "« Les hommes adoraient la lune. Mais un bavard prononça un jour ces paroles : « Oh ! qu'elle est blanche et pure, la lune ! » Ce fut comme si l'on venait de cracher sur elle. Tout de suite sa [[clarté]] diminua, son [[disque]] se couvrit des taches noires qu'on y remarque encore. »",
            audioPath: 'story-leuk-sky-02.mp3',
            illustration: {
                prompt: "La lune dans le ciel changeant d'aspect, passant d'un blanc pur à un aspect tacheté avec des ombres sombres. Style artistique africain symbolique, contraste fort.",
                altText: "La lune perd sa pureté et se couvre de taches",
                position: 'bottom',
            },
            footnotes: [],
            vocabWords: [
                { word: "disque", definition: "L'objet rond et plat que forme la lune dans le ciel" }, { word: "mauvaises langues", definition: "Les personnes qui disent du mal ou qui parlent trop sans réfléchir" },
            ],
        }, {
            id: 'sky-03',
            paragraph: "« Quant aux étoiles, ce sont les [[suivantes]]{{2}} de la lune. Chaque fois qu'elle tourne la tête pour voir les [[griots]]{{3}} qui l'accompagnent, le [[dieu]] du ciel la punit en la mettant au coin. Alors elle s'immobilise, perd son éclat et devient laide. »",
            audioPath: 'story-leuk-sky-03.mp3',
            illustration: {
                prompt: "La lune personnifiée comme une reine africaine entourée de petites étoiles (les suivantes) et de musiciens (griots) avec des tam-tams dans le ciel nocturne. Style onirique et coloré.",
                altText: "La lune reine du ciel et ses suivantes",
                position: 'top',
            },
            footnotes: [
                { id: 2, term: "suivantes", explanation: "Des jeunes filles qui accompagnent et servent une reine ou une dame importante." }, { id: 3, term: "griots", explanation: "En Afrique, ce sont les gardiens de la tradition orale, ils chantent les louanges et jouent de la musique lors des cérémonies." },
            ],
            vocabWords: [
                { word: "implorer", definition: "Demander avec beaucoup de force et de respect" }, { word: "délivrance", definition: "L'action de libérer quelqu'un qui est prisonnier ou puni" },
                { word: "Dieu", definition: "Se dit 'Yalla' en wolof.", etymology: "Wolof: Yalla" },
            ],
        }, {
            id: 'sky-04',
            paragraph: "Bouki se redresse : « Votre maman ne vous a raconté que la légende. Moi qui suis allé à l'école, je vous dirai ce que les savants nous apprennent. Le soleil est une boule de feu qui nous réchauffe, mais la lune n'est qu'un [[astre]] éteint. Elle ne fait que [[refléter]]{{4}} la lumière du soleil. »",
            audioPath: 'story-leuk-sky-04.mp3',
            illustration: {
                prompt: "Le père hyène Bouki, portant des lunettes de savant, expliquant des schémas astronomiques (soleil, terre, lune) dessinés sur le sol. Style illustration éducative et ludique.",
                altText: "Bouki explique la science des astres",
                position: 'top',
            },
            footnotes: [
                { id: 4, term: "refléter", explanation: "Renvoyer la lumière comme le fait un miroir." },
            ],
            vocabWords: [
                { word: "astre", definition: "Tout objet naturel présent dans le ciel (soleil, lune, étoiles)" }, { word: "bienfaisante", definition: "Qui fait du bien, qui apporte des choses positives" },
            ],
        }, {
            id: 'sky-05',
            paragraph: "« Les taches que l'on voit sont l'ombre des montagnes. Parfois la lune devient noire, cela s'appelle une [[éclipse]]{{5}}. Les étoiles sont des soleils fort éloignés. La poussière d'étoiles qui forme un chemin s'appelle la [[Voie lactée]]{{6}}. » Les enfants admirent sa connaissance.",
            audioPath: 'story-leuk-sky-05.mp3',
            illustration: {
                prompt: "Vue magnifique de la Voie lactée étincelante au-dessus de la savane. Les montagnes de la lune sont visibles en gros plan. Style fresque spatiale africaine, très coloré et inspirant.",
                altText: "L'immensité du ciel étoilé et la Voie lactée",
                position: 'bottom',
            },
            footnotes: [
                { id: 5, term: "éclipse", explanation: "Un phénomène où la lune ou le soleil disparaissent momentanément parce qu'un autre astre passe devant." }, { id: 6, term: "Voie lactée", explanation: "La grande trace blanche et lumineuse formée par des milliards d'étoiles dans le ciel." },
            ],
            vocabWords: [
                { word: "constellation", definition: "Un groupe d'étoiles qui dessine une forme dans le ciel" }, { word: "étonnés", definition: "Très surpris et admiratifs" },
            ],
        },
    ],
};
