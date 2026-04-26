import { Story } from './stories';

export const storyBaol22: Story = {
    id: 'baol-les-deux-poltrons',
    title: 'LES DEUX POLTRONS',
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
            paragraph: "93 Deux poltrons avaient été expulsés de leur village respectif. lis se rencontrèrent et marchèrent ensem­ ble. Ils allèrent jusqu'au plus profond de la brousse. Là, ils décidèrent de fonder un foyer hors de la portée de [[Dieu]]. Ils habitèrent làjusqu'à la veille de l'hiver­ nage 3. Ils décidèrent alors d'aller chercher des man­ ches de houe. Ils marchèrent longtemps et arrivèrent à l'ombre d'un Raat 4.",
            audioPath: 'baol-les-deux-poltrons-1.mp3',
            illustration: {
                prompt: "Illustration d'un conte africain traditionnel.",
                altText: "Scène du conte",
                position: 'top',
            },
            footnotes: [],
            vocabWords: [
                
                { word: "Dieu", definition: "Se dit 'Yalla' en wolof.", etymology: "Wolof: Yalla" },
            ],
        }, {
            id: 'scene-02',
            paragraph: "L'un dit: - Tu vas monter sur l'arbre pour surveiller la brousse pendant que je vais creuser pour trouver deux bonnes racines. Dès que tu apercevras quelqu'un, tu m'avertiras. - D'accord, mais toi aussi s'il t'arrive de voir quelque chose, ne manque pas de me faire signe. Le guetteur monta à l'arbre tandis que l'autre se mit à creuser. Bientôt, il trouva deux belles racines bien droites et si longues qu'il ne peut s'empêcher de crier: - Ah!",
            audioPath: 'baol-les-deux-poltrons-2.mp3',
            illustration: {
                prompt: "Illustration d'un conte africain traditionnel.",
                altText: "Scène du conte",
                position: 'full',
            },
            footnotes: [],
            vocabWords: [],
        }, {
            id: 'scene-03',
            paragraph: "en voici deux enfin. A ces mots, le guetteur dégringola et prenant ses jambes au cou, s'élança comme une flèche. L'autre voyant son camarade sur la piste se débarrassa de sa pelle et emboîta le pas au premier. Ils coururent pendant longtemps et lorsqu'ils se crurent sauvés, ils s'arrêtèrent. L'un questionna: - Qu'as-tu donc vu? - Non, c'estàmoi de te poser la question, carj'ai pris la fuite dès que j'ai entendu ton alerte.",
            audioPath: 'baol-les-deux-poltrons-3.mp3',
            illustration: {
                prompt: "Illustration d'un conte africain traditionnel.",
                altText: "Scène du conte",
                position: 'top',
            },
            footnotes: [],
            vocabWords: [],
        }, {
            id: 'scene-04',
            paragraph: "- Non,j@ n'ai pas donné d'alerté. J'étais juste en 94 CONTES WOLOF DU BAOL train de couper les deux belles racines que j'avais rencontrées. Je n'ai fait que pousser un soupir de joie. - C'est justement ce soupir qui m'a fait peur. - Et moi,j'ai pris la fuite dès que je t'ai vu t'élan- cer. Lequel des deux était le plus poltron S? . (Raconté par Khady Diouf.)",
            audioPath: 'baol-les-deux-poltrons-4.mp3',
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
