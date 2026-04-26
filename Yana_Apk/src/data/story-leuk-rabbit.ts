import { Story } from './stories';

export const storyLeukRabbit: Story = {
    id: 'leuk-lapin',
    title: "Cousin N'Diombor le lapin",
    subtitle: 'La liberté ou le confort',
    ethnie: 'Wolof',
    ethnieImg: 'illustration-wolof.png',
    difficulty: 'avancé',
    ageMin: 9,
    readingTime: 6,
    coverColor: '#065F46',
    moralLesson: "Mieux vaut la liberté dans la pauvreté que l'esclavage dans l'abondance.",

    scenes: [
        {
            id: 'rabbit-01',
            paragraph: "Comme Leuk [[chemine]] vers le plus gros des villages, il rencontre un passant qui s'arrête : « Je crois avoir devant moi N'Diombor-le-lapin. » « Mon nom est Leuk, répond notre voyageur. » « Tu trouveras au village des animaux qui te ressemblent comme des frères », dit le passant. Il s'appuie sur sa [[houlette]].",
            audioPath: 'story-leuk-rabbit-01.mp3',
            illustration: {
                prompt: "Leuk le lièvre s'appuyant sur un bâton de marche (houlette) comme un vieillard fatigué sur un chemin vers un village africain. Un voyageur l'interpelle. Style illustration africaine narrative, tons terreux.",
                altText: "Leuk rencontre un voyageur sur le chemin du village",
                position: 'top',
            },
            footnotes: [],
            vocabWords: [
                { word: "chemine", definition: "Marcher tranquillement sur un chemin" }, { word: "houlette", definition: "Un bâton de berger qui sert d'appui pour marcher" },
            ],
        }, {
            id: 'rabbit-02',
            paragraph: "Il pénètre dans une vaste cour. « Hep ! salut ! » fit une voix. Il découvrit un groupe de lapins vivant dans des caisses alignées et [[grillagées]]. Ils avaient les mêmes longues oreilles, mais tandis que Leuk avait le poil [[fauve]]{{1}}, eux étaient [[tachetés]].",
            audioPath: 'story-leuk-rabbit-02.mp3',
            illustration: {
                prompt: "Une cour de ferme avec des clapiers à lapins en bois et grillage. Plusieurs lapins domestiques regardent Leuk avec curiosité. Style illustration contrastée entre le lièvre sauvage et les lapins de ferme.",
                altText: "Leuk découvre les lapins dans leur cage",
                position: 'top',
            },
            footnotes: [
                { id: 1, term: "fauve", explanation: "Une couleur jaune-roux, comme la couleur du lion ou du sable sec." },
            ],
            vocabWords: [
                { word: "grillagées", definition: "Fermées par un grillage (un filet de fils de fer)" }, { word: "tachetés", definition: "Qui ont des taches de différentes couleurs sur le corps" },
            ],
        }, {
            id: 'rabbit-03',
            paragraph: "L'un des lapins lui dit : « Je m'appelle N'Diombor. Pourquoi ne viens-tu pas vivre comme nous chez les hommes ? Nous sommes [[nourris]] et [[entretenus]] comme il faut. Nous vivons dans l'[[abondance]], tandis que tes os se voient à travers la peau. »",
            audioPath: 'story-leuk-rabbit-03.mp3',
            illustration: {
                prompt: "Gros plan sur un lapin domestique bien gras et blanc parlant à Leuk qui paraît très maigre à côté. Style artistique expressif montrant la différence de condition.",
                altText: "N'Diombor le lapin vante les mérites de sa vie chez les hommes",
                position: 'bottom',
            },
            footnotes: [],
            vocabWords: [
                { word: "entretenus", definition: "Soignés et dont on s'occupe régulièrement" }, { word: "abondance", definition: "Le fait d'avoir de la nourriture en très grande quantité" },
            ],
        }, {
            id: 'rabbit-04',
            paragraph: "« Cousin, répond Leuk, dis-moi ce que [[signifient]] cette cage et ce grillage ? Est-ce que ton maître vous laisse sortir ? » « Nous n'en avons pas besoin ! Il nous apporte tout ici même. » « Et pourquoi vous nourrit-il si bien ? » Leuk est [[sceptique]]. N'Diombor ne sait que répondre.",
            audioPath: 'story-leuk-rabbit-04.mp3',
            illustration: {
                prompt: "Leuk le lièvre examinant le cadenas ou le grillage de la cage avec un air sceptique. Le lapin a l'air confus. Style illustration pédagogique.",
                altText: "Leuk interroge son cousin sur sa liberté",
                position: 'top',
            },
            footnotes: [],
            vocabWords: [
                { word: "signifient", definition: "Veulent dire, représentent" }, { word: "sceptique", definition: "Qui a des doutes, qui ne croit pas facilement ce qu'on lui dit" },
            ],
        }, {
            id: 'rabbit-05',
            paragraph: "« Ah ! je comprends, dit Leuk. Vous n'êtes que des prisonniers qu'on [[engraisse]] pour les [[dévorer]] plus tard. Adieu, cousin, je préfère ma liberté ! » Et il repartit vers sa brousse sauvage, courant plus vite que jamais.",
            audioPath: 'story-leuk-rabbit-05.mp3',
            illustration: {
                prompt: "Leuk s'échappant en courant à toute vitesse loin de la ferme, vers la forêt sauvage, sous un ciel de liberté. Style dynamique, sensation de vitesse et de soulagement.",
                altText: "Leuk choisit la liberté et s'enfuit vers la brousse",
                position: 'full',
            },
            footnotes: [],
            vocabWords: [
                { word: "engraisse", definition: "Faire manger beaucoup pour faire grossir (souvent pour manger ensuite)" }, { word: "dévorer", definition: "Manger avec avidité et rapidité" },
            ],
        },
    ],
};
