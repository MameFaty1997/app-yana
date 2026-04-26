import { Story } from './stories';

export const storySenegalTailleur: Story = {
    id: 'senegal-tailleur',
    title: "Le tailleur et le roi",
    subtitle: 'Contes du Sénégal',
    ethnie: "Sénégal",
    ethnieImg: "illustration-village.png",
    difficulty: 'facile',
    ageMin: 5,
    readingTime: 3,
    coverColor: '#E91E63',
    moralLesson: "Trop d'ingérence dans le travail d'autrui produit toujours des catastrophes inattendues.",
    scenes: [
        {
            id: 'scene-01',
            paragraph: "Il était une fois un riche roi extrêmement pointilleux et agaçant. Il convoqua le meilleur tailleur de la région pour lui confectionner le grand boubou royal pour la grande fête annuelle. Le pauvre tailleur alla prendre ses mesures et commença l’ouvrage avec minutie, car il connaissait le tempérament capricieux de Sa Majesté.",
            audioPath: '',
            illustration: { prompt: "", altText: "Illustration de la scène", position: 'top' },
            footnotes: [], vocabWords: [],
        }, {
            id: 'scene-02',
            paragraph: "Malheureusement, le roi, trop avide de s'enquérir de la grandeur de son futur vêtement, lui rendait visite tous les matins. « Les manches ne sont-elles pas trop longues ? » soupirait-il en manipulant constamment le tissu, le salissant presque de ses mains, alors qu'il n'y connaissait absolument rien en coupe.",
            audioPath: '',
            illustration: { prompt: "", altText: "Illustration de la scène", position: 'bottom' },
            footnotes: [], vocabWords: [],
        }, {
            id: 'scene-03',
            paragraph: "Le tailleur, agacé par les critiques successives inopportunes qui bouleversaient toutes les coutures délicates de la riche étoffe, ajustait continuellement pour complaire aux fantaisies de son client, à contrecœur. Il rabota par ci, il coupa sec par là.",
            audioPath: '',
            illustration: { prompt: "", altText: "Illustration de la scène", position: 'full' },
            footnotes: [], vocabWords: [],
        }, {
            id: 'scene-04',
            paragraph: "Le grand jour arriva enfin. En public et devant ses nobles conviés, le roi fit apporter solennellement le grand drapé qu’on déployait avec la musique des tambours. Le tailleur s'avança en souriant et tendit fièrement la création.",
            audioPath: '',
            illustration: { prompt: "", altText: "Illustration de la scène", position: 'top' },
            footnotes: [], vocabWords: [],
        }, {
            id: 'scene-05',
            paragraph: "À la stupéfaction générale, ce n'était plus qu'une vulgaire serpillère, coupée grossièrement de centaines de trous béants de tous les côtés et tellement rétrécie qu'à peine elle couvrait le ventre rebondi du roi honteux et outré qui sentit le désastre immense d'être la cause de son malheur pour avoir fait trop confiance à ses piètres conseils non professionnels !",
            audioPath: '',
            illustration: { prompt: "", altText: "Illustration de la scène", position: 'bottom' },
            footnotes: [], vocabWords: [],
        }
    ]
};
