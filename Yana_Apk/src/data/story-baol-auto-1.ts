import { Story } from './stories';

export const storyBaol1: Story = {
    id: 'baol-un-grand-dormeur',
    title: 'UN GRAND DORMEUR',
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
            paragraph: "li était une fois un homme qui avait pour maîtresse une jolie fIlle du village. Un soir, il alla lui rendre 48 CONTES WOLOF DU BAOL visite. On lui sortit la natte devant la case et la conversation s'engagea. Bientôt, l'orage gronda, mais le gars s'était déjà endormi. La fille se leva, alla allumer sa lampe et revint pour réveiller son bien­ aimé. Mais il était tombé dans un profond sommeil qui le faisait ronfler : - Khanda ndary, khanda ndary khourête 4 ••• Ses efforts furent vains et la pluie tombait dru: une vraie pluie diluvienne.",
            audioPath: 'baol-un-grand-dormeur-1.mp3',
            illustration: {
                prompt: "Illustration d'un conte africain traditionnel.",
                altText: "Scène du conte",
                position: 'top',
            },
            footnotes: [],
            vocabWords: [],
        }, {
            id: 'scene-02',
            paragraph: "L'eau ruisselait tant que notre dormeur fut entraîné avec sa natte jusque derrière la maison. li dormait toujours et ronflait en chantant: - Khanda ndary, yanda ndary ... khourête ... Les chiens aboyaient tous à la fois et semblaient répondre au ronflement du dormeur. On demanda partout: - Où est l'étranger, mais où est donc l'étranger? La mIe répondit : - En tout cas je l'avais laissé ici au début de la pluie.",
            audioPath: 'baol-un-grand-dormeur-2.mp3',
            illustration: {
                prompt: "Illustration d'un conte africain traditionnel.",
                altText: "Scène du conte",
                position: 'full',
            },
            footnotes: [],
            vocabWords: [],
        }, {
            id: 'scene-03',
            paragraph: "On l'entendit ronfler derrière la maison contre la haie. On alla le chercher, puis on l'attacha après l'avoir réveillé. li eut si honte qu'il abandonna sa maîtresse et s'en alla pour de bon.",
            audioPath: 'baol-un-grand-dormeur-3.mp3',
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
