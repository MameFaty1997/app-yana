import { Story } from './stories';

export const storyBaolFille: Story = {
    id: 'baol-fille-incomparable',
    title: 'Une fille incomparable',
    subtitle: 'L\'amazone héroïque',
    ethnie: 'Wolof du Baol',
    ethnieImg: 'illustration-wolof.png',
    difficulty: 'avancé',
    ageMin: 10,
    readingTime: 6,
    coverColor: '#E74C3C',
    moralLesson: "Le courage et la détermination n'ont pas de genre. Une fille peut accomplir les mêmes exploits qu'un garçon.",

    scenes: [
        {
            id: 'scene-01',
            paragraph: "Il était une fois un vieux père de famille qui possédait d'immenses troupeaux de bœufs. Sa richesse attisa la convoitise des quatre puissants rois de la région. Le vieil homme n'avait qu'un seul enfant, une fille unique qui vivait avec lui. Il se désolait souvent de ne pas avoir de garçon pour l'aider à défendre son bien.",
            audioPath: 'story-baol-fille-01.mp3',
            illustration: {
                prompt: "Un vieil éleveur peulh/wolof au milieu d'un immense troupeau de vaches, l'air inquiet, avec sa jeune fille courageuse à ses côtés. Style illustration africaine majestueuse.",
                altText: "Le père et sa fille unique",
                position: 'top',
            },
            footnotes: [],
            vocabWords: [
                { word: "immenses", definition: "Très grands, gigantesques" }, { word: "convoitise", definition: "Désir très fort de posséder ce qui appartient à autrui" },
            ],
        }, {
            id: 'scene-02',
            paragraph: "Un jour, le souverain du Djoloff arriva avec son armée et fit prisonnier tout le troupeau. Le soir, trouvant ses enclos vides, le vieux fondit en larmes, pleurant à chaudes larmes. « Tout mon espoir est parti, sanglota-t-il. Je n'ai personne pour me venger, je n'ai que toi et tu es une fille ! »",
            audioPath: 'story-baol-fille-02.mp3',
            illustration: {
                prompt: "Le vieux père en pleurs devant des enclos vides, avec les traces des chevaux des ravisseurs au sol. La fille le regarde avec détermination.",
                altText: "Le désespoir du vieux père",
                position: 'top',
            },
            footnotes: [
                { id: 1, term: "Le Djoloff", explanation: "Ancien empire et région historique du Sénégal." },
            ],
            vocabWords: [
                { word: "souverain", definition: "Celui qui gouverne un pays, un roi" }, { word: "sanglota", definition: "Pleurer avec des secousses" },
            ],
        }, {
            id: 'scene-03',
            paragraph: "Sa fille s'avança avec assurance : « Père, donne-moi un cheval et laisse-moi aller à leur poursuite ! » Le vieux refusa catégoriquement, craignant de la perdre. Mais la jeune fille, décidée, entra en cachette dans l'écurie. Elle sella le meilleur cheval, prit un fusil, de la poudre, et s'élança au lever du jour à la poursuite de l'armée.",
            audioPath: 'story-baol-fille-03.mp3',
            illustration: {
                prompt: "La jeune guerrière africaine habillée pour le combat, montant un étalon fougueux et tenant un long fusil traditionnel. Aube africaine.",
                altText: "Le départ de l'amazone",
                position: 'full',
            },
            footnotes: [],
            vocabWords: [
                { word: "assurance", definition: "Confiance en soi" }, { word: "écurie", definition: "Bâtiment où l'on loge les chevaux" },
            ],
        }, {
            id: 'scene-04',
            paragraph: "Elle chevaucha sans relâche jusqu'à atteindre l'armée ennemie. Brandissant son drapeau rouge, elle se mit en travers de leur route. Le roi ricana : « Cette fille cherche la paix ? Dispersez-la ! » L'amazone répliqua d'une voix forte : « Vous êtes des hommes et je suis une femme, mais vous allez voir de quel bois je me chauffe ! »",
            audioPath: 'story-baol-fille-04.mp3',
            illustration: {
                prompt: "La cavalière seule face à toute une armée de guerriers à cheval, brandissant un drapeau rouge avec un regard féroce.",
                altText: "Le défi au roi",
                position: 'top',
            },
            footnotes: [],
            vocabWords: [
                { word: "relâche", definition: "Sans arrêt, sans repos" }, { word: "amazone", definition: "Une femme guerrière et cavalière" },
            ],
        }, {
            id: 'scene-05',
            paragraph: "Avec une agilité et une bravoure extraordinaires, la fille guerrière engagea le combat. Tirant avec une précision redoutable, elle mit en déroute toute l'armée du Djoloff. Puis, d'une simple tape sur la cuisse, elle guida tout le troupeau sur le chemin du retour.",
            audioPath: 'story-baol-fille-05.mp3',
            illustration: {
                prompt: "L'héroïne triomphante menant l'immense troupeau de vaches à travers la savane, l'armée ennemie dispersée au loin.",
                altText: "La victoire de la guerrière",
                position: 'top',
            },
            footnotes: [],
            vocabWords: [
                { word: "bravoure", definition: "Un très grand courage face au danger" }, { word: "déroute", definition: "Fuite désordonnée d'une armée battue" },
            ],
        }, {
            id: 'scene-06',
            paragraph: "De retour chez eux, elle appela son père : « Viens donc attacher tes bœufs ! » Croyant à une moquerie, le vieux soupira. Mais en entendant les meuglements familiers, il sortit, écarquilla les yeux et fut si souriant et ému qu'il trouva enfin la paix accomplie par sa fille incomparable.",
            audioPath: 'story-baol-fille-06.mp3',
            illustration: {
                prompt: "Le père ébahi et fou de joie, étreignant sa fille héroïque revenue avec tout le troupeau sous un grand baobab au crépuscule.",
                altText: "Le retour du troupeau",
                position: 'full',
            },
            footnotes: [],
            vocabWords: [
                { word: "meuglements", definition: "Le cri que fait la vache" }, { word: "écarquilla", definition: "Ouvrir grand les yeux sous l'effet de la surprise" },
            ],
        },
    ]
};
