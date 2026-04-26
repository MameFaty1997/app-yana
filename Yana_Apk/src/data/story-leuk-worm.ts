import { Story } from './stories';

export const storyLeukWorm: Story = {
    id: 'leuk-et-le-ver-de-terre',
    title: "Leuk et le Ver de Terre",
    subtitle: "Une leçon de travail",
    ethnie: 'Wolof',
    ethnieImg: 'illustration-wolof.png',
    difficulty: 'moyen',
    ageMin: 7,
    readingTime: 6,
    coverColor: '#634832', // Earthy Brown
    moralLesson: "Rien ne s'obtient sans effort et sans travail de la terre.",

    scenes: [
        {
            id: 'worm-01',
            paragraph: "La [[famine]] menace la brousse. Leuk-le-[[lièvre]], qui n'aime pas beaucoup se fatiguer, cherche un moyen d'avoir à manger sans trop d'efforts. Il s'approche d'un petit tas de terre [[remuée]] et interpelle le [[Ver de terre]].",
            audioPath: 'story-leuk-worm-01.mp3',
            illustration: {
                prompt: "Leuk le lièvre s'accroupissant pour parler à un petit ver de terre qui sort la tête d'un tas de terre fraîche. Paysage de savane sèche, soleil de plomb. Style illustration africaine, tons bruns et ocre.",
                altText: "Leuk parle au Ver de terre",
                position: 'top',
            },
            footnotes: [],
            vocabWords: [
                { word: "famine", definition: "Manque grave de nourriture dans une région" }, { word: "remuée", definition: "Terre qui a été mélangée ou retournée" },
                { word: "lièvre", definition: "Se dit 'Leuk' en wolof.", etymology: "Wolof: Leuk" },
            ],
        }, {
            id: 'worm-02',
            paragraph: "« Ô toi qui travailles toujours dans l'ombre, dit Leuk, apprends-moi ton [[secret]]. Comment fais-tu pour être si [[gras]] alors que tout le monde meurt de faim ? » Le Ver de terre répond : « C'est simple, Leuk. Je [[laboure]]{{1}} la terre jour et nuit. Elle me donne tout ce dont j'ai besoin. »",
            audioPath: 'story-leuk-worm-02.mp3',
            illustration: {
                prompt: "Le ver de terre se tortillant dans la terre, Leuk l'écoutant avec une expression pensive. On voit des racines et des minéraux sous le sol. Style pédagogique et artistique, coupe transversale de la terre.",
                altText: "Le Ver de terre explique son secret",
                position: 'top',
            },
            footnotes: [
                { id: 1, term: "laboure", explanation: "Retourner la terre pour la préparer à recevoir des graines." },
            ],
            vocabWords: [
                { word: "secret", definition: "Quelque chose que l'on garde pour soi ou que peu de gens connaissent" }, { word: "gras", definition: "Ici, signifie être en bonne santé et bien nourri" },
            ],
        }, {
            id: 'worm-03',
            paragraph: "Leuk essaie de creuser avec ses pattes de devant. C'est dur ! Il a vite mal aux mains. Il préférerait que les [[mil]]{{2}} et les [[sorgho]]{{3}} poussent tout seuls. « Le travail de la terre est trop difficile pour un [[lièvre]] aussi [[élégant]] que moi », se [[lamente]]-t-il.",
            audioPath: 'story-leuk-worm-03.mp3',
            illustration: {
                prompt: "Leuk essayant de creuser la terre avec ses petites pattes, l'air fatigué et découragé. Ses oreilles tombent. Style bande dessinée africaine, humour dans l'expression.",
                altText: "Leuk essaie de travailler la terre",
                position: 'bottom',
            },
            footnotes: [
                { id: 2, term: "mil", explanation: "Céréale très répandue en Afrique de l'Ouest, base de l'alimentation." }, { id: 3, term: "sorgho", explanation: "Une autre céréale résistante à la chaleur, proche du mil." },
            ],
            vocabWords: [
                { word: "lamente", definition: "Se plaindre avec tristesse" }, { word: "élégant", definition: "Qui a de l'allure, qui est beau et distingué" },
                { word: "lièvre", definition: "Se dit 'Leuk' en wolof.", etymology: "Wolof: Leuk" },
            ],
        }, {
            id: 'worm-04',
            paragraph: "Mais le ventre vide crie plus fort que la paresse. Leuk finit par s'y mettre. Il comprend que même la ruse ne peut pas faire pousser les plantes. À la fin de la saison, il [[récolte]] son propre mil. Il a appris que la vraie richesse vient de la [[sueur]] de son front.",
            audioPath: 'story-leuk-worm-04.mp3',
            illustration: {
                prompt: "Leuk fier devant son petit champ de mil bien vert et mûr. Il tient un épi dans sa patte. Style illustration vibrante, couleurs vertes et dorées, sentiment d'accomplissement.",
                altText: "Leuk récolte son mil",
                position: 'full',
            },
            footnotes: [],
            vocabWords: [
                { word: "récolte", definition: "Ramasser les fruits ou les céréales quand ils sont mûrs" }, { word: "effort", definition: "Mettre toute sa force et sa volonté pour réussir quelque chose" },
            ],
        },
    ],
};
