import { Story } from './stories';

export const storyBaol26: Story = {
    id: 'baol-le-faux-marabout',
    title: 'LE FAUX MARABOUT',
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
            paragraph: "Il était une fois un marabout qui prétendait fuir la compagnie des femmes. Il alla s'installer loin du vil­ lage, sous un tamarinier touffu. Là, il étendit sa peau de prière, ouvrit son Coran et commença ses lectu­ res. Une jeune femme l'ayant appris, se mit en toilette, de la poudre, du parfum; rien ne manquait. Elle porta ses plus beaux habits et alla trouver le marabout: - Hé! Lecteur, je demande le chemin qui mène à Missirah, dit-elle.",
            audioPath: 'baol-le-faux-marabout-1.mp3',
            illustration: {
                prompt: "Illustration d'un conte africain traditionnel.",
                altText: "Scène du conte",
                position: 'top',
            },
            footnotes: [],
            vocabWords: [],
        }, {
            id: 'scene-02',
            paragraph: "Le marabout la regarda furtivement et tout en li­ sant à haute voix lui dit : - Houn! houn! va plus loin... on te montrera le chemin qui mène à Missirah. La jeune femme s'éloigna un peu et revint plus belle, laissant paraître un peu le petit pagne blanc qu'elle portait autour des reins. - Sérigne 3, dit-elle, quel chemin donc mène à Missirah? Le marabout leva les yeux, la considéra un instant et dit: - Pour le chemin de Missirah ...",
            audioPath: 'baol-le-faux-marabout-2.mp3',
            illustration: {
                prompt: "Illustration d'un conte africain traditionnel.",
                altText: "Scène du conte",
                position: 'full',
            },
            footnotes: [],
            vocabWords: [],
        }, {
            id: 'scene-03',
            paragraph: "ra tu peux attendre un peu ... je vais te le montrer . Tout d'un coup, oubliant le Coran qu'il avait 104 CONTES WOLOF DU BAOL entre les mains, le marabout se leva et bondit sur la femme, tel l'épervier sur le poussin. Puis la possé­ dant sans plus attendre, il déclara: - Ma bonne femme, voici le chemin qui mène à Missirah... (Raconté par M'Baye Dieye.)",
            audioPath: 'baol-le-faux-marabout-3.mp3',
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
