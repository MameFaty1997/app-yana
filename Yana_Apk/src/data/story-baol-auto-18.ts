import { Story } from './stories';

export const storyBaol18: Story = {
    id: 'baol-l-homme-le-plus-gros',
    title: 'L\'HOMME LE PLUS GROS',
    subtitle: 'Conte traditionnel du Baol',
    ethnie: 'Wolof du Baol',
    ethnieImg: 'illustration-wolof.png',
    difficulty: 'moyen',
    ageMin: 7,
    readingTime: 5,
    coverColor: '#2C3E50', 
    moralLesson: "Un conte traditionnel riche en enseignements.",

    scenes: [
        {
            id: 'scene-01',
            paragraph: "Il était une fois, un homme gigantesque qui avait ' un bœuf à vendre. Il allait de village en village et déclarait : ' - J'ai un bœuf à vendre! - A combien le vends-tu? lui dit-on dans le pre- mier village. 88 CONTES WOLOF DU BAOL . - Oh!je le donnerai à l'homme qui sera plus gros que moi. - Tu peux donc continuer ton chemin car dans notre village tu n'auras pas d'acquéreur. Il parcourut ainsi six villages et au septième s'arrêta dans une maison et dit: - Ce bœuf est à vendre;je le donnerai à l'homme qui sera jugé plus gros que moi.",
            audioPath: 'baol-l-homme-le-plus-gros-1.mp3',
            illustration: {
                prompt: "Illustration d'un conte africain traditionnel.",
                altText: "Scène du conte",
                position: 'top',
            },
            footnotes: [],
            vocabWords: [],
        }, {
            id: 'scene-02',
            paragraph: "Le chef du village lui répondit : - Les jeunes sont allés en brousse, mais tu peux quand même l'attacher à ce pieu en attendant leur retour; ils ne vont pas tarder. Il s'éloigna un peu et voulutattacherl'animal. il se baissa vers une masse noire qu'il croyait être un tronc d'arbre abandonné. La masse bougea, à la surprise du vendeur: c'était en effet lajambe d'un vieillard qui était assis là. L 'homme comprit qu'il allait vers sa perte et sans dire un mot s'éloigna avec sa vache.",
            audioPath: 'baol-l-homme-le-plus-gros-2.mp3',
            illustration: {
                prompt: "Illustration d'un conte africain traditionnel.",
                altText: "Scène du conte",
                position: 'full',
            },
            footnotes: [],
            vocabWords: [],
        }, {
            id: 'scene-03',
            paragraph: "CHAPITRE V POL TRONNERIE",
            audioPath: 'baol-l-homme-le-plus-gros-3.mp3',
            illustration: {
                prompt: "Illustration d'un conte africain traditionnel.",
                altText: "Scène du conte",
                position: 'top',
            },
            footnotes: [],
            vocabWords: [],
        },
    ]
};
