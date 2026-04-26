import { Story } from './stories';

export const storyBaol33: Story = {
    id: 'baol-les-chevres-et-l-hye',
    title: 'LES CHÈVRES ET L\'HYÈNE',
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
            paragraph: "Des chèvres, un jour, avaient décidé d'élire domi­ cile dans un endroit où la présence de [[Dieu]] ne se ferait pas sentir. L'[[hyène]] un jour, vint à passer. On lui apprit l'existence d'un village où vivaient des chèvres qui fuyaient la protection de [[Dieu]]. L'[[hyène]] décida d'aller leur rendre yisite et prit son tarn-tam. Arrivée devant ses hôtes, elle salua et battit du tam­ tam en chantant : - Band; Khole.",
            audioPath: 'baol-les-chevres-et-l-hye-1.mp3',
            illustration: {
                prompt: "Illustration d'un conte africain traditionnel.",
                altText: "Scène du conte",
                position: 'top',
            },
            footnotes: [],
            vocabWords: [
                
                { word: "hyène", definition: "Se dit 'Bouki' en wolof. Souvent rusée mais malchanceuse.", etymology: "Wolof: Bouki" },
                { word: "Dieu", definition: "Se dit 'Yalla' en wolof.", etymology: "Wolof: Yalla" },
            ],
        }, {
            id: 'scene-02',
            paragraph: "Bandi khole s, c'est le diable qui vous a inspiré l'idée de vivre hors de la protection de [[Dieu]]. Joignant le geste à la parole , elle dansa et fit danser les chèvres. Puis elle en abattit une (IU'ellemit hors du cercle. Au bout d'un temps, elle leur dit: - Bon, il fait nuit, allons nous coucher, demain nous continuerons. Quand les chèvres furent parties, l'[[hyène]] retourna sur les lieux pour dévorer celle qu'elle avait abattue.",
            audioPath: 'baol-les-chevres-et-l-hye-2.mp3',
            illustration: {
                prompt: "Illustration d'un conte africain traditionnel.",
                altText: "Scène du conte",
                position: 'full',
            },
            footnotes: [],
            vocabWords: [
                
                { word: "hyène", definition: "Se dit 'Bouki' en wolof. Souvent rusée mais malchanceuse.", etymology: "Wolof: Bouki" },
                { word: "Dieu", definition: "Se dit 'Yalla' en wolof.", etymology: "Wolof: Yalla" },
            ],
        }, {
            id: 'scene-03',
            paragraph: "Le lendemain, ce fut la même chose. Tous les jours, l'[[hyène]] s'octroyait quelques victimes. Bien­ tôt, le troupeau diminua sensiblement et les chèvres se concertèrent : RIVALITÉS ET PUNITIONS 151 - Notre étranger a là un pouvoir magique et son tam-tam est en train de nous décimer: nest temps de trouver une solution pour nous sauver. Où donc sont N'Dame, Sosette, Gnonle bate? Toutes sont dispa­ rues et chacune de nous peut les rejoindre.",
            audioPath: 'baol-les-chevres-et-l-hye-3.mp3',
            illustration: {
                prompt: "Illustration d'un conte africain traditionnel.",
                altText: "Scène du conte",
                position: 'top',
            },
            footnotes: [],
            vocabWords: [
                
                { word: "hyène", definition: "Se dit 'Bouki' en wolof. Souvent rusée mais malchanceuse.", etymology: "Wolof: Bouki" },
            ],
        }, {
            id: 'scene-04',
            paragraph: "Nous allons donc quitter de lieu pour aller habiter ailleurs. C'est depuis ce jour que les chèvres ont cessé de vivre à l'état sauvage pour se mettre sous la protec­ tion des hommes.",
            audioPath: 'baol-les-chevres-et-l-hye-4.mp3',
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
