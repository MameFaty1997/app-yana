import { Story } from './stories';

export const storyBaolPretendants: Story = {
    id: 'baol-deux-pretendants',
    title: 'Les Deux Prétendants',
    subtitle: 'L\'épreuve de la lionne',
    ethnie: 'Wolof du Baol',
    ethnieImg: 'illustration-wolof.png',
    difficulty: 'moyen',
    ageMin: 12,
    readingTime: 6,
    coverColor: '#8E44AD',
    moralLesson: "L'intelligence et la ruse l'emportent souvent sur la force brute.",

    scenes: [
        {
            id: 'scene-01',
            paragraph: "Il était une fois deux jeunes gens qui aimaient la même fille et [[rivalisaient]] pour l'épouser. La mère de la jeune fille n'avait pour tout bien que deux vaches qu'elle chérissait par-dessus.tout.",
            audioPath: 'story-baol-pretendants-01.mp3',
            illustration: {
                prompt: "Deux jeunes hommes africains se regardant en rivaux, pendant qu'une vieille femme s'occupe de deux belles vaches.",
                altText: "Les deux prétendants",
                position: 'top',
            },
            footnotes: [],
            vocabWords: [
                { word: "rivalisaient", definition: "Être en compétition avec quelqu'un" }, { word: "prétendants", definition: "Hommes qui cherchent à épouser une femme" },
            ],
        }, {
            id: 'scene-02',
            paragraph: "Une nuit, un [[lion]] s'aventura chez la vieille et mangea l'une des vaches. Le premier prétendant, trouvant la vieille en pleurs, jura de la [[venger]]. Il prit son fusil, [[traqua]] le [[lion]], le tua net, et rapporta son oreille comme preuve.",
            audioPath: 'story-baol-pretendants-02.mp3',
            illustration: {
                prompt: "Un fier chasseur africain rapportant l'oreille d'un lion à une vieille femme impressionnée.",
                altText: "Le premier prétendant triomphe",
                position: 'full',
            },
            footnotes: [],
            vocabWords: [
                { word: "venger", definition: "Punir celui qui a fait du tort" }, { word: "traqua", definition: "Poursuivre sans relâche" },
                { word: "lion", definition: "Se dit 'Gaïndé' en wolof.", etymology: "Wolof: Gaïndé" },
            ],
        }, {
            id: 'scene-03',
            paragraph: "Quand le deuxième prétendant apprit la nouvelle, il s'empressa d'[[accourir]]. Hélas, la vieille pleurait de nouveau : la lionne venait d'enlever sa dernière vache ! « Ce n'est pas toi qui me vengeras », sanglota t-elle, le croyant moins [[valeureux]].",
            audioPath: 'story-baol-pretendants-03.mp3',
            illustration: {
                prompt: "Le deuxième prétendant, décidé mais apparemment moins fort, console la vieille femme en larmes.",
                altText: "La tristesse de la vieille",
                position: 'top',
            },
            footnotes: [],
            vocabWords: [
                { word: "accourir", definition: "Courir rapidement vers le lieu" }, { word: "valeureux", definition: "Qui a beaucoup de courage" },
            ],
        }, {
            id: 'scene-04',
            paragraph: "S'armant de toutes sortes de lances redoutables et d'une [[outre]] remplie de grains mil attachée autour de la taille, il s'enfonça dans la forêt. Il y trouva la redoutable lionne endormie. Voulant s'en débarrasser avec éclat, il posa ses armes et lui [[asséna]] une gifle magistrale !",
            audioPath: 'story-baol-pretendants-04.mp3',
            illustration: {
                prompt: "L'homme donnant une gifle magistrale à une énorme lionne qui était endormie.",
                altText: "La provocation audacieuse",
                position: 'top',
            },
            footnotes: [],
            vocabWords: [
                { word: "outre", definition: "Sac en peau servant à transporter des provisions" }, { word: "asséna", definition: "Donner un coup avec force" },
            ],
        }, {
            id: 'scene-05',
            paragraph: "Réveillée en [[sursaut]], la lionne furieuse se lança à sa poursuite. Une folle course s'engagea. L'homme détalait si vite et haletait si fort que les coups ininterrompus de ses talons [[pilaient]] littéralement le mil confiné dans l'outre derrière son dos !",
            audioPath: 'story-baol-pretendants-05.mp3',
            illustration: {
                prompt: "Une course poursuite effrénée : l'homme courant à toute vitesse, la lionne juste derrière lui. La poussière s'élève derrière l'homme.",
                altText: "La course poursuite",
                position: 'full',
            },
            footnotes: [],
            vocabWords: [
                { word: "sursaut", definition: "Mouvement brusque" }, { word: "pilaient", definition: "Casser et réduire en poudre" },
            ],
        }, {
            id: 'scene-06',
            paragraph: "[[Exténué]], l'homme se cacha derrière un baobab et s'endormit. Quand la lionne arriva enfin, haletante, frôlant l'arbre, il fit un sursaut terrifiant avec un cri si [[perçant]] que l'animal s'effondra, mort de peur et de fatigue absolue.",
            audioPath: 'story-baol-pretendants-06.mp3',
            illustration: {
                prompt: "L'homme surgissant de derrière un baobab en hurlant. La lionne s'effondre, terrorisée et épuisée.",
                altText: "La ruse foudroyante",
                position: 'top',
            },
            footnotes: [],
            vocabWords: [
                { word: "exténué", definition: "Qui est extrêmement fatigué" }, { word: "perçant", definition: "Un son très aigu et fort" },
            ],
        }, {
            id: 'scene-07',
            paragraph: "Il retourna triomphalement chez sa belle-mère avec l'oreille de la bête sauvage. En versant le contenu de son outre, au lieu du mil dur, il en sortit une farine d'une finesse [[incomparable]], pilée par sa course mythique. La vieille comprit alors qui était le plus brave.",
            audioPath: 'story-baol-pretendants-07.mp3',
            illustration: {
                prompt: "Le héros versant de la farine fine depuis son outre devant sa belle-mère ébahie. Il sourit, tenant en main l'oreille de la lionne.",
                altText: "Le retour triomphal",
                position: 'top',
            },
            footnotes: [],
            vocabWords: [
                { word: "incomparable", definition: "Qu'on ne peut pas comparer, extraordinaire" }, { word: "ébahie", definition: "Très surprise, étonnée" },
            ],
        },
    ],
};
