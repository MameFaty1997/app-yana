import { Story } from './stories';

export const storyBaol23: Story = {
    id: 'baol-comment-guerir-la-pe',
    title: 'COMMENT GUÉRIR LA PEUR',
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
            paragraph: "Il était une fois un homme qui marchait seul dans la brousse. TI marcha si longtemps que la faim le prit. Il s'arrêta dans un village. Là, on lui donna à manger. Il se régala copieusement et renonça à poursuivre sa route. Après avoir épousé une jeune femme dans le village, il y élut domicile et ne songea plus à partir. Un jour, après avoir bien mangé, le vieux s'aven­ tura dans la brousse qui, malheureusement, était in­ festée de fauves, notamment de lions.",
            audioPath: 'baol-comment-guerir-la-pe-1.mp3',
            illustration: {
                prompt: "Illustration d'un conte africain traditionnel.",
                altText: "Scène du conte",
                position: 'top',
            },
            footnotes: [],
            vocabWords: [],
        }, {
            id: 'scene-02',
            paragraph: "Le vieux 'n'était pas au courant. A peine s'était-il éloigné que le roi de la forêt surgit en poussant un long rugisse­ ment. Stupéfait, le vieux ne tarda pas à alourdir son pantalon tout en tremblant sur place. Le [[lion]] fit un pas et le vieux s'engouffra dans un buisson épineux. Le [[lion]] chercha en vain, sans retrouver l'homme. Il resta aux aguets pendant une semaine et dégoûté, il s'en alla. Le vieux resta seul dans son buisson tout étonné de son sort.",
            audioPath: 'baol-comment-guerir-la-pe-2.mp3',
            illustration: {
                prompt: "Illustration d'un conte africain traditionnel.",
                altText: "Scène du conte",
                position: 'full',
            },
            footnotes: [],
            vocabWords: [
                
                { word: "lion", definition: "Se dit 'Gaïndé' en wolof. Le roi de la savane.", etymology: "Wolof: Gaïndé" },
            ],
        }, {
            id: 'scene-03',
            paragraph: "Un chasseur vint à passer dans les environs. L'homme entendit le pas et ques­ tionna: L'EXCÈS 95 - Qui va là? - C'est moi. - Qui êtes-vous? - Je suis chasseur à la recherche de gibier. - Ami chasseur, veux-tu me porter secours pour me tirer d'ici? - Mais comment as-tu fait pour y pénétrer? - C'est une peur bleue qui m'y a conduit. - Eh bien! une peur bleue t'en sortira bientôt. - Et que vas-tu faire?",
            audioPath: 'baol-comment-guerir-la-pe-3.mp3',
            illustration: {
                prompt: "Illustration d'un conte africain traditionnel.",
                altText: "Scène du conte",
                position: 'top',
            },
            footnotes: [],
            vocabWords: [],
        }, {
            id: 'scene-04',
            paragraph: "- Th le sauras le moment venu. Et le chasseur commença à entasser de la paille sèche sur le buisson. Tout à coup, il mit le feu à plusieurs endroits du buisson. Pris de frayeur, le vieux s'élança et par un violent coup de tête dans les épines se mit hors de danger. Le chasseur l'accueillit avec un large sourire. Ils s'embrassèrent et se lièrent d'amitié. . (Raconté par Amsata Dieye.)",
            audioPath: 'baol-comment-guerir-la-pe-4.mp3',
            illustration: {
                prompt: "Illustration d'un conte africain traditionnel.",
                altText: "Scène du conte",
                position: 'full',
            },
            footnotes: [],
            vocabWords: [],
        },
    ]
};
