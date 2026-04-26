import { Story } from './stories';

export const storyLeukMen: Story = {
    id: 'leuk-et-les-hommes',
    title: "Leuk et les Hommes",
    subtitle: "Une rencontre curieuse",
    ethnie: 'Wolof',
    ethnieImg: 'illustration-wolof.png',
    difficulty: 'moyen',
    ageMin: 7,
    readingTime: 6,
    coverColor: '#D2691E', // Chocolate Brown
    moralLesson: "La curiosité est une bonne chose, mais la prudence est la mère de la sûreté.",

    scenes: [
        {
            id: 'men-01',
            paragraph: "Leuk-le-[[lièvre]] a beaucoup voyagé dans la brousse, mais il n'a jamais vu d'hommes. Il veut savoir comment ils vivent. Il s'approche d'un petit [[village]] au moment où les enfants jouent. Leur chant monte vers le ciel comme une [[fumée]] [[légère]].",
            audioPath: 'story-leuk-men-01.mp3',
            illustration: {
                prompt: "Leuk le lièvre caché derrière un baobab, observant un village africain avec des cases rondes et des enfants qui jouent au centre. Style illustration jeunesse africaine, lumière dorée de fin de journée.",
                altText: "Leuk observe le village des hommes",
                position: 'top',
            },
            footnotes: [],
            vocabWords: [
                { word: "village", definition: "Un groupe de maisons à la campagne" }, { word: "fumée", definition: "Ce qui monte du feu, ici utilisé comme image pour le chant" },
                { word: "lièvre", definition: "Se dit 'Leuk' en wolof.", etymology: "Wolof: Leuk" },
            ],
        }, {
            id: 'men-02',
            paragraph: "Deux enfants, Samba et Coumba, aperçoivent Leuk. Ils sont [[ravis]] ! « Oh, le joli [[lièvre]] ! » s'écrient-ils. Ils l'attrapent doucement et le ramènent à la maison. Leuk se laisse faire, il veut voir l'intérieur d'une [[case]].",
            audioPath: 'story-leuk-men-02.mp3',
            illustration: {
                prompt: "Deux enfants africains portant joyeusement un petit lièvre dans leurs bras vers une case traditionnelle. Le lièvre a l'air surpris mais calme. Couleurs vives, style BD africaine.",
                altText: "Samba et Coumba attrapent Leuk",
                position: 'top',
            },
            footnotes: [],
            vocabWords: [
                { word: "case", definition: "Maison traditionnelle africaine, souvent avec un toit de paille" }, { word: "ravis", definition: "Très contents, très joyeux" },
                { word: "lièvre", definition: "Se dit 'Leuk' en wolof.", etymology: "Wolof: Leuk" },
            ],
        }, {
            id: 'men-03',
            paragraph: "Mais leur père, qui connaît bien la ruse de Leuk, n'est pas rassuré. « Attention, mes enfants, ce [[lièvre]] est plus [[malin]] que vous ! » Il enferme Leuk dans un panier. Leuk, prisonnier, commence à regretter son [[imprudence]].",
            audioPath: 'story-leuk-men-03.mp3',
            illustration: {
                prompt: "Un père de famille africain au visage sérieux montrant le lièvre enfermé dans un panier d'osier. Les enfants ont l'air triste. Style illustration conte africain, ombres marquées.",
                altText: "Leuk est enfermé dans un panier",
                position: 'bottom',
            },
            footnotes: [],
            vocabWords: [
                { word: "imprudence", definition: "Agir sans réfléchir aux dangers" }, { word: "malin", definition: "Qui a beaucoup d'esprit et de ruse" },
                { word: "lièvre", definition: "Se dit 'Leuk' en wolof.", etymology: "Wolof: Leuk" },
            ],
        }, {
            id: 'men-04',
            paragraph: "Heureusement, Coumba a pitié de lui. La nuit, elle soulève le panier. « Pars vite, Leuk, et ne reviens plus te faire attraper ! » Leuk ne se le fait pas dire deux fois. Il [[bondit]] dans la brousse, reconnaissant envers la [[bonté]] de la petite fille.",
            audioPath: 'story-leuk-men-04.mp3',
            illustration: {
                prompt: "La petite Coumba libérant le lièvre sous la lumière de la lune. Leuk s'enfuit en courant vers la forêt sombre. Style magique et nocturne, tons bleus et argentés.",
                altText: "Coumba libère Leuk",
                position: 'full',
            },
            footnotes: [],
            vocabWords: [
                { word: "bonté", definition: "La qualité de quelqu'un qui est gentil et généreux" }, { word: "bondit", definition: "Sauter avec force et rapidité" },
            ],
        },
    ],
};
