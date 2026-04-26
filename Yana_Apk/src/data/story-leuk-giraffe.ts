import { Story } from './stories';

export const storyLeukGiraffe: Story = {
    id: 'leuk-girafe',
    title: "Serigne N'Diamala la girafe",
    subtitle: 'Une journée dans la savane',
    ethnie: 'Wolof',
    ethnieImg: 'illustration-wolof.png',
    difficulty: 'facile',
    ageMin: 6,
    readingTime: 4,
    coverColor: '#F59E0B',
    moralLesson: "La nature est un spectacle magnifique qu'il faut observer avec respect et silence.",

    scenes: [
        {
            id: 'giraffe-01',
            paragraph: "Très haute sur pattes, le cou [[démesurément]] long, Serigne N'Diamala-la-girafe vit en solitaire. Ce qu'il lui faut, c'est la belle savane infinie, semée d'îlots de verdure et d'[[oasis]]{{1}} tranquilles. Ses longues pattes lui permettent de faire de grandes [[enjambées]].",
            audioPath: 'story-leuk-giraffe-01.mp3',
            illustration: {
                prompt: "Une girafe majestueuse marchant dans une savane dorée avec quelques acacias et un petit point d'eau (oasis). Style illustration africaine douce, tons jaune, orange et vert. Grande sensation d'espace.",
                altText: "La girafe N'Diamala dans la savane",
                position: 'top',
            },
            footnotes: [
                { id: 1, term: "oasis", explanation: "Un petit endroit dans une zone sèche où l'on trouve de l'eau et de la végétation." },
            ],
            vocabWords: [
                { word: "démesurément", definition: "D'une manière très grande, qui dépasse la mesure normale" }, { word: "enjambées", definition: "De très grands pas" },
            ],
        }, {
            id: 'giraffe-02',
            paragraph: "Levée avec les premiers rayons du jour, elle allonge son cou dans le brouillard et boit la fraîcheur du matin. Puis, lentement, elle fait sa promenade [[quotidienne]] à travers les bosquets, dont les arbres ont de jeunes feuilles tendres et [[appétissantes]]. Elle respire le parfum des fleurs.",
            audioPath: 'story-leuk-giraffe-02.mp3',
            illustration: {
                prompt: "Girafe mangeant des feuilles de la cime d'un acacia dans la brume du matin. Lumière douce de l'aube. Style artistique africain, atmosphère paisible.",
                altText: "La girafe prend son petit-déjeuner au lever du soleil",
                position: 'top',
            },
            footnotes: [],
            vocabWords: [
                { word: "quotidienne", definition: "Qui se fait tous les jours" }, { word: "appétissantes", definition: "Qui donne envie d'être mangé" },
            ],
        }, {
            id: 'giraffe-03',
            paragraph: "L'après-midi, quand l'air est devenu doux et que l'ombre des arbres a redonné aux [[source]]s leur fraîcheur, elle se dirige vers les cuvettes d'eau [[limpide]]{{2}} et tranquille. Là, le cou tendu et les pattes écartées, elle [[apaise]] sa longue soif de la journée près de la [[source]].",
            audioPath: 'story-leuk-giraffe-03.mp3',
            illustration: {
                prompt: "Girafe penchée avec les pattes écartées pour boire dans une mare d'eau claire. Reflet de l'animal dans l'eau. Style palette de couleurs chaudes d'après-midi africain.",
                altText: "N'Diamala boit à la source fraîche",
                position: 'bottom',
            },
            footnotes: [
                { id: 2, term: "limpide", explanation: "Une eau tellement claire qu'on peut voir à travers sans aucune difficulté." },
            ],
            vocabWords: [
                { word: "apaise", definition: "Calme, fait disparaître une sensation désagréable (comme la soif)" }, { word: "source", definition: "L'endroit où l'eau sort naturellement de la terre" },
            ],
        }, {
            id: 'giraffe-04',
            paragraph: "Personne ne la dérange, [[excepté]] les bêtes [[féroces]], qui peuvent arriver par surprise, ou les hommes qui chassent avec des flèches et des fusils. Mais N'Diamala veille, car de là-haut, elle voit tout ce qui se passe dans la brousse.",
            audioPath: 'story-leuk-giraffe-04.mp3',
            illustration: {
                prompt: "La girafe regardant au loin d'un air vigilant, avec de hautes herbes autour. On devine une silhouette de lion au loin. Style illustration dramatique mais propre pour enfants.",
                altText: "La girafe surveille les dangers de la brousse",
                position: 'top',
            },
            footnotes: [],
            vocabWords: [
                { word: "excepté", definition: "Sauf, à l'exclusion de" }, { word: "féroces", definition: "Cruels, sauvages et dangereux" },
            ],
        }, {
            id: 'giraffe-05',
            paragraph: "Le soir, N'Diamala rêve au clair de lune. [[Silencieuse]], elle regarde le ciel et [[contemple]] les étoiles. Et lorsque, autour d'elle, le dernier bruit s'est éteint, elle ferme doucement les yeux et part pour le pays des [[songes]]{{3}}.",
            audioPath: 'story-leuk-giraffe-05.mp3',
            illustration: {
                prompt: "Girafe endormie debout ou couchée sous une énorme lune d'argent. Étoiles brillantes. Style onirique, tons bleus et noirs, très apaisant.",
                altText: "N'Diamala s'endort sous les étoiles",
                position: 'bottom',
            },
            footnotes: [
                { id: 3, term: "songes", explanation: "Un mot plus poétique pour dire les rêves." },
            ],
            vocabWords: [
                { word: "contemple", definition: "Regarde avec beaucoup d'attention et d'admiration" }, { word: "silencieuse", definition: "Qui ne fait aucun bruit" },
            ],
        },
    ],
};
