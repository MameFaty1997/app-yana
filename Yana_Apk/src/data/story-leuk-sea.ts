import { Story } from './stories';

export const storyLeukSea: Story = {
    id: 'leuk-decouvre-la-mer',
    title: 'Leuk découvre la mer',
    subtitle: 'Une leçon de géographie',
    ethnie: 'Wolof',
    ethnieImg: 'illustration-wolof.png',
    difficulty: 'moyen',
    ageMin: 8,
    readingTime: 6,
    coverColor: '#1E3A8A',
    moralLesson: "Le voyage et la curiosité sont les meilleures sources de connaissance.",

    scenes: [
        {
            id: 'sea-01',
            paragraph: "Leuk [[consulte]] [[M’Bélar]]-l’hirondelle pour connaître le chemin qui le mènera au bord de la mer. M’Bélar lui dit : « Pour arriver à la mer sans te perdre, il faut que tu saches [[t'orienter]]. »",
            audioPath: 'story-leuk-sea-01.mp3',
            illustration: {
                prompt: "Le lièvre Leuk discutant avec une élégante hirondelle aux ailes bleues et blanches perchée sur une branche d'acacia. Soleil matinal brillant. Style illustration jeunesse africaine, tons bleus et ocres, atmosphère de conseil et de sagesse.",
                altText: "Leuk et M'Bélar l'hirondelle discutent",
                position: 'top',
            },
            footnotes: [],
            vocabWords: [
                { word: "s'orienter", definition: "Trouver sa direction en utilisant les points cardinaux (Est, Ouest, Nord, Sud)" }, { word: "M'Bélar", definition: "Nom traditionnel de l'hirondelle, oiseau migrateur qui connaît tous les chemins du ciel" },
            ],
        }, {
            id: 'sea-02',
            paragraph: "« La mer se trouve à l'ouest du pays que nous habitons. Donc tu marcheras toujours droit vers l'ouest. Le soleil sera ton meilleur [[guide]]. — Et que faire quand il n'y aura pas de soleil ? — Le [[vent d'est]] te [[guide]]ra dans la forêt. »",
            audioPath: 'story-leuk-sea-02.mp3',
            illustration: {
                prompt: "Leuk le lièvre marchant avec détermination dans une savane dorée, le vent soufflant ses oreilles vers l'avant. Le soleil se couche à l'horizon devant lui. Style artistique africain, mouvement visible du vent, couleurs orange et jaune intenses.",
                altText: "Leuk marche vers l'Ouest guidé par le soleil et le vent",
                position: 'bottom',
            },
            footnotes: [],
            vocabWords: [
                { word: "Vent d'est", definition: "Vent sec venant de l'intérieur des terres, souvent appelé l'Harmattan en Afrique de l'Ouest" }, { word: "Guide", definition: "Celui ou ce qui montre le chemin pour ne pas s'égarer" },
            ],
        }, {
            id: 'sea-03',
            paragraph: "Au bout d'un voyage long et pénible, Leuk arrive devant la mer [[immense]]. Leuk se demande quelle est cette chose [[mugissante]]{{2}} qui a l'air de lui barrer la route. Bientôt la terre finit. L'étendue de l'eau se confond avec l'[[horizon]]. Elle [[baigne]]{{1}} la terre à perte de vue.",
            audioPath: 'story-leuk-sea-03.mp3',
            illustration: {
                prompt: "Leuk le lièvre debout sur une dune de sable, regardant l'immensité de l'océan Atlantique bleu. Vagues blanches s'écrasant sur le rivage. Style fresque africaine moderne, contraste entre le sable ocre et l'eau turquoise.",
                altText: "Leuk découvre l'immensité de l'océan",
                position: 'top',
            },
            footnotes: [
                { id: 1, term: "baigne", explanation: "Entoure, borde." }, { id: 2, term: "mugissante", explanation: "Bruyante : image du bruit que font les vagues." },
            ],
            vocabWords: [
                { word: "immense", definition: "Tellement grand qu'on n'en voit pas la fin" }, { word: "horizon", definition: "La ligne imaginaire où le ciel semble toucher la terre ou la mer" },
            ],
        }, {
            id: 'sea-04',
            paragraph: "La mer semble vivre et respirer par [[saccades]]{{3}}. Sur la [[grève]]{{4}}, il y a des coquillages, gros et blancs. Leuk en ramasse quelques-uns. Il veut savoir quel goût a son eau. Il mouille une de ses pattes dans la [[mousse]]{{5}} d'une vague. « Aïe ! l'eau de la mer est donc si [[amère]], si salée ! »",
            audioPath: 'story-leuk-sea-04.mp3',
            illustration: {
                prompt: "Leuk sur la plage ramassant un gros coquillage blanc, une patte dans l'écume blanche d'une vague. Expression de dégoût comique sur son visage après avoir goûté l'eau salée. Crabes s'enfuyant sur le côté. Style illustration colorée, détails de sable et d'eau.",
                altText: "Leuk goûte l'eau salée de la mer",
                position: 'top',
            },
            footnotes: [
                { id: 3, term: "saccades", explanation: "À-coup, rythme irrégulier." }, { id: 4, term: "grève", explanation: "Plage." }, { id: 5, term: "mousse", explanation: "L'écume." },
            ],
            vocabWords: [
                { word: "amère", definition: "Un goût qui n'est pas doux, un peu comme le citron ou certains médicaments" }, { word: "écume", definition: "La mousse blanche produite par l'agitation de l'eau" },
            ],
        }, {
            id: 'sea-05',
            paragraph: "Sans plus tarder, il repart pour le pays de ses [[ancêtres]], emportant, dans sa [[hotte]]{{6}}, le plus grand nombre de [[témoignages]]{{7}}, pour prouver qu'il a vu la mer. « Ils seront étonnés, se dit-il avec [[fierté]]. »",
            audioPath: 'story-leuk-sea-05.mp3',
            illustration: {
                prompt: "Leuk le lièvre marchant avec un panier (hotte) rempli de coquillages sur le dos, un air fier et victorieux, retournant vers la savane. Style illustration africaine, silhouette sur fond de coucher de soleil, tons chauds et contrastés.",
                altText: "Leuk rentre chez lui avec ses preuves",
                position: 'bottom',
            },
            footnotes: [
                { id: 6, term: "hotte", explanation: "Panier porté sur le dos (comme la hotte du Père Noël)." }, { id: 7, term: "témoignages", explanation: "Preuves." },
            ],
            vocabWords: [
                { word: "fierté", definition: "Sentiment de satisfaction et de joie après avoir réussi quelque chose de difficile" }, { word: "ancêtres", definition: "Ceux qui vivaient avant nous, comme nos arrière-grands-parents" },
            ],
        },
    ],
};
