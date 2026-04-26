import { Story } from './stories';

export const storyLeukLeopard: Story = {
    id: 'leuk-contre-le-leopard',
    title: "Leuk contre le Léopard",
    subtitle: "Ruse et griffes",
    ethnie: 'Wolof',
    ethnieImg: 'illustration-wolof.png',
    difficulty: 'avancé',
    ageMin: 8,
    readingTime: 7,
    coverColor: '#FBBF24', // Leopard Yellow
    moralLesson: "L'intelligence gagne toujours sur la violence, mais il faut être prêt à en assumer les conséquences.",

    scenes: [
        {
            id: 'leopard-01',
            paragraph: "Leuk a besoin d'une [[griffe]] de léopard pour fabriquer un [[gris-gris]]{{1}} puissant. Il va voir [[Sègue]]-le-léopard. « Bonjour, [[Sègue]] ! J'ai entendu dire que tu es le plus rapide de la brousse, mais je parie que tu ne peux pas me toucher si je cours entre les épines ! »",
            audioPath: 'story-leuk-leopard-01.mp3',
            illustration: {
                prompt: "Le lièvre Leuk provoquant un léopard tacheté aux yeux féroces dans un champ d'acacias épineux. Style illustration jeunesse africaine, tension et mouvement, tons jaune et brun.",
                altText: "Leuk provoque Sègue le léopard",
                position: 'top',
            },
            footnotes: [
                { id: 1, term: "gris-gris", explanation: "Un objet magique africain porté pour se protéger ou pour avoir de la chance." },
            ],
            vocabWords: [
                { word: "Sègue", definition: "Nom du léopard en wolof", etymology: "Sègue = Léopard" }, { word: "griffe", definition: "Ongle pointu et courbé des animaux" },
            ],
        }, {
            id: 'leopard-02',
            paragraph: "Sègue, furieux d'être défié par un si petit animal, se jette sur Leuk. Mais Leuk se [[faufile]] entre les buissons [[épineux]]. Sègue, emporté par son [[élan]], se griffe la patte contre les épines et laisse tomber une de ses griffes sur le sol.",
            audioPath: 'story-leuk-leopard-02.mp3',
            illustration: {
                prompt: "Le léopard bondissant mais s'emmêlant dans des buissons d'épines. Leuk passe dessous avec agilité. Une griffe vole dans les airs. Style BD africaine dynamique, couleurs chaudes.",
                altText: "Sègue se blesse contre les épines",
                position: 'top',
            },
            footnotes: [],
            vocabWords: [
                { word: "faufile", definition: "Passer rapidement dans un endroit étroit" }, { word: "élan", definition: "Mouvement rapide pour bondir" },
            ],
        }, {
            id: 'leopard-03',
            paragraph: "Leuk ramasse la griffe et s'enfuit en riant. « Merci pour le cadeau, Sègue ! » Le léopard [[rugit]] de colère, jurant de se venger. Mais Leuk est déjà loin, caché dans le tronc [[creux]] d'un baobab [[millénaire]].",
            audioPath: 'story-leuk-leopard-03.mp3',
            illustration: {
                prompt: "Leuk tenant fièrement une grosse griffe de léopard, sautant vers un tronc de baobab géant. Au loin, le léopard rugit. Style artistique africain, perspective profonde.",
                altText: "Leuk s'enfuit avec la griffe",
                position: 'bottom',
            },
            footnotes: [],
            vocabWords: [
                { word: "rugit", definition: "Le cri puissant du lion ou du léopard" }, { word: "millénaire", definition: "Qui existe depuis des milliers d'années" },
            ],
        }, {
            id: 'leopard-04',
            paragraph: "Plus tard, la fée Mame-Randatou félicite Leuk. « Tu es courageux, Leuk, mais n'oublie pas que la ruse apporte aussi des ennemis. » Leuk sourit, il a son gris-gris, et il sait qu'il doit rester [[vigilant]] pour ses prochaines aventures.",
            audioPath: 'story-leuk-leopard-04.mp3',
            illustration: {
                prompt: "Leuk parlant à une silhouette mystique de fée africaine entourée de lumière. Il porte son collier avec la griffe du léopard. Style magique, tons dorés et violets.",
                altText: "Mame-Randatou félicite Leuk",
                position: 'full',
            },
            footnotes: [],
            vocabWords: [
                { word: "vigilant", definition: "Qui fait attention à tout ce qui se passe autour pour ne pas être surpris" }, { word: "conséquences", definition: "Ce qui arrive à cause d'une action que l'on a faite" },
            ],
        },
    ],
};
