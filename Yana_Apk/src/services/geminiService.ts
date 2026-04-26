
import { GoogleGenAI, Type, Modality } from "@google/genai";
import { Exercise, ExerciseType } from '../types';
import { BayoEmotion } from '../components/ui/Bayo';
import { WOLOF_LEXICON } from '../data/wolof_lexicon';
import { EXERCISE_ILLUSTRATIONS } from '../config/assets';
import Constants from 'expo-constants';
import * as UnitsData from '../data/reference/units';

// Contenu de référence extrait du PDF pour l'Unité 1 (Wolof)
// Contenu de référence complet extrait des documents Wolof pour les 10 Unités
const GLOBAL_REFERENCE_CONTENT = `
UNITÉ 1 : Premiers pas - Salutations et Pronoms personnels
- Salutations : salaamaalikum (Salut), na nga def ? (Comment vas-tu ?), maa ngi fi (Je vais bien)
- Pronoms : mangi, yangi, mungi, ñungi, yéenangi

UNITÉ 2 : Actions - Présent Progressif
- Progressif (di) : mangiy lekk (je mange), mungiy dem (il part)
- Verbes : liggéy (travailler), wax (parler), toog (s'asseoir), dox (marcher)

UNITÉ 3 : Possession
- Possessifs : sumë (mon), sa (ton), -am (son), suñu (notre), séén (votre)
- Maison : néég (pièce), kër (maison), tééré (livre), xarit (ami)

UNITÉ 4 : Interrogation et Nombres
- Mots en -an : ban (quel), fan (où), nan (comment), kañ (quand), kan (qui)
- Nombres : benn (1), ñaar (2), ñett (3), fukk (10), téémer (100)

UNITÉ 5-10 : Grammaire avancée
- Sujet dépendant : ma, ngë, mu, nu, ngéen, ñu
- Relatifs : fu (où), nu (comment), ku (qui), lu (quoi)
- Impératif : -al / -léen (ex: jelal! prends!)
- Futur : di naa, di ngë, di na...
- Passés : -oon (lointain), doon/daan (imparfait/habitude)
- Causatif (Être) : dama, dangë, dafa, dañu...

LEXIQUE SPÉCIALISÉ (Extrait des manuels Peace Corps 2020) :
1. SANTÉ (Wérgu yaram) :
   * feebar (être malade), sibbiru (paludisme), soj (rhume), bir buy daw (diarrhée)
   * mettit (douleur), tane (aller mieux), faj (soigner), garab (médicament)
   * Corps : bop (tête), biir (ventre), tank (pied), loxo (main), bët (oeil)
2. MARCHÉ & ACHATS (Marse & Jënd) :
   * jënd (acheter), jaay (vendre), waxaale (marchander), seer (cher), yomb (bon marché)
   * weccit (monnaie/appoint), xaalis (argent)
   * Nourriture : ceeb (riz), jën (poisson), yàpp (viande), ndox (eau), mburu (pain)
   * Légumes : soble (oignon), tamaate (tomate), karoot (carotte), kañja (gombo)
3. TECHNIQUE & SOCIAL (Mboolo) :
   * ndaje (réunion), dimbali (aider), jappalante (entraide), tëralin (planifier)
   * butik (boutique), tool (champ), suuf (terre/sable), kureelu (organisation)
`;

// Données statiques pour toutes les Unités (Fallback et Performance HORS LIGNE)
const ALL_UNITS_DATA: Record<string, Record<string, { term: string, trans: string, context?: string }[]>> = {};

for (const key of Object.keys(UnitsData)) {
    if (key.endsWith('_STATIC_DATA')) {
        const unitObj = (UnitsData as any)[key];
        if (unitObj) {
            for (const lang in unitObj) {
                if (!ALL_UNITS_DATA[lang]) ALL_UNITS_DATA[lang] = {};
                Object.assign(ALL_UNITS_DATA[lang], unitObj[lang]);
            }
        }
    }
}

const generateStaticExercises = (targetLanguage: string, lessonTitle: string, unitId: number = -1, interfaceLanguage: string = 'fr'): Exercise[] | null => {
    const langKey = targetLanguage.toLowerCase().trim();
    const langData = ALL_UNITS_DATA[langKey];
    if (!langData) return null;

    // Prompts dictionary per interface language
    const prompts: Record<string, Record<string, string>> = {
        fr: {
            memorize: `Mémorise ce nouveau mot en ${targetLanguage}`,
            like: 'comme',
            what_means: "Que signifie cette expression ?",
            how_say: `Comment dit-on ceci en ${targetLanguage} ?`,
            rebuild: `Reconstruis la phrase en ${targetLanguage}`,
            which_image: "Quelle image correspond à",
            listen_choose: "Écoute et choisis la bonne traduction",
            other_translation: "Autre traduction",
            other_suffix: "(autre)",
        },
        en: {
            memorize: `Memorize this new word in ${targetLanguage}`,
            like: 'like',
            what_means: "What does this expression mean?",
            how_say: `How do you say this in ${targetLanguage}?`,
            rebuild: `Rebuild the sentence in ${targetLanguage}`,
            which_image: "Which image matches",
            listen_choose: "Listen and choose the correct translation",
            other_translation: "Other translation",
            other_suffix: "(other)",
        },
        de: {
            memorize: `Merke dir dieses neue Wort auf ${targetLanguage}`,
            like: 'wie',
            what_means: "Was bedeutet dieser Ausdruck?",
            how_say: `Wie sagt man das auf ${targetLanguage}?`,
            rebuild: `Baue den Satz auf ${targetLanguage} zusammen`,
            which_image: "Welches Bild passt zu",
            listen_choose: "Höre zu und wähle die richtige Übersetzung",
            other_translation: "Andere Übersetzung",
            other_suffix: "(andere)",
        },
        ar: {
            memorize: `احفظ هذه الكلمة الجديدة بلغة ${targetLanguage}`,
            like: 'مثل',
            what_means: "ماذا يعني هذا التعبير؟",
            how_say: `كيف تقول هذا بلغة ${targetLanguage}؟`,
            rebuild: `أعد بناء الجملة بلغة ${targetLanguage}`,
            which_image: "أي صورة تتطابق مع",
            listen_choose: "استمع واختر الترجمة الصحيحة",
            other_translation: "ترجمة أخرى",
            other_suffix: "(أخرى)",
        },
        es: {
            memorize: `Memoriza esta nueva palabra en ${targetLanguage}`,
            like: 'como',
            what_means: "¿Qué significa esta expresión?",
            how_say: `¿Cómo se dice esto en ${targetLanguage}?`,
            rebuild: `Reconstruye la frase en ${targetLanguage}`,
            which_image: "¿Qué imagen corresponde a",
            listen_choose: "Escucha y elige la traducción correcta",
            other_translation: "Otra traducción",
            other_suffix: "(otra)",
        },
    };
    const p = prompts[interfaceLanguage] || prompts.fr;

    // Helper: parse trans field like "comme Alaal (Richesse) (*note.*)" 
    // into { word: "Alaal", meaning: "Richesse" }
    const parseTrans = (trans: string): { word: string; meaning: string } | null => {
        // Match patterns like "comme Word (Meaning)" or "comme Word"
        const match = trans.match(/^comme\s+(\S+)(?:\s+\(([^)]+)\))?/);
        if (match) {
            return { word: match[1], meaning: match[2] || '' };
        }
        return null;
    };

    // Dictionary of French words/phrases found in data → translations per language
    const frenchTerms: Record<string, Record<string, string>> = {
        // Common meanings in parentheses
        'Richesse': { en: 'Wealth', de: 'Reichtum', ar: 'ثروة', es: 'Riqueza' },
        'Brousse': { en: 'Bush', de: 'Busch', ar: 'أدغال', es: 'Matorral' },
        'Un': { en: 'One', de: 'Eins', ar: 'واحد', es: 'Uno' },
        'Riz': { en: 'Rice', de: 'Reis', ar: 'أرز', es: 'Arroz' },
        'Siffler': { en: 'To whistle', de: 'Pfeifen', ar: 'صفير', es: 'Silbar' },
        'Maison': { en: 'House', de: 'Haus', ar: 'منزل', es: 'Casa' },
        'Cheval': { en: 'Horse', de: 'Pferd', ar: 'حصان', es: 'Caballo' },
        'Rêve': { en: 'Dream', de: 'Traum', ar: 'حلم', es: 'Sueño' },
        'Hier': { en: 'Yesterday', de: 'Gestern', ar: 'أمس', es: 'Ayer' },
        'Paix': { en: 'Peace', de: 'Frieden', ar: 'سلام', es: 'Paz' },
        'Carotte': { en: 'Carrot', de: 'Karotte', ar: 'جزرة', es: 'Zanahoria' },
        'Main': { en: 'Hand', de: 'Hand', ar: 'يد', es: 'Mano' },
        'Pain': { en: 'Bread', de: 'Brot', ar: 'خبز', es: 'Pan' },
        'Eau': { en: 'Water', de: 'Wasser', ar: 'ماء', es: 'Agua' },
        'Deux': { en: 'Two', de: 'Zwei', ar: 'اثنان', es: 'Dos' },
        'Lit': { en: 'Bed', de: 'Bett', ar: 'سرير', es: 'Cama' },
        'Voiture': { en: 'Car', de: 'Auto', ar: 'سيارة', es: 'Coche' },
        'Genou': { en: 'Knee', de: 'Knie', ar: 'ركبة', es: 'Rodilla' },
        'Pomme': { en: 'Apple', de: 'Apfel', ar: 'تفاحة', es: 'Manzana' },
        'Dîner': { en: 'Dinner', de: 'Abendessen', ar: 'عشاء', es: 'Cena' },
        'Feu': { en: 'Fire', de: 'Feuer', ar: 'نار', es: 'Fuego' },
        'Pied': { en: 'Foot', de: 'Fuß', ar: 'قدم', es: 'Pie' },
        'Or': { en: 'Gold', de: 'Gold', ar: 'ذهب', es: 'Oro' },
        'Toilettes': { en: 'Bathroom', de: 'Toilette', ar: 'مرحاض', es: 'Baño' },
        'Mouton': { en: 'Sheep', de: 'Schaf', ar: 'خروف', es: 'Oveja' },
        'Viande': { en: 'Meat', de: 'Fleisch', ar: 'لحم', es: 'Carne' },
        'Bouteille': { en: 'Bottle', de: 'Flasche', ar: 'زجاجة', es: 'Botella' },
        'Baignoire': { en: 'Bathtub', de: 'Badewanne', ar: 'حوض استحمام', es: 'Bañera' },
        'École': { en: 'School', de: 'Schule', ar: 'مدرسة', es: 'Escuela' },
        'Manguier': { en: 'Mango tree', de: 'Mangobaum', ar: 'شجرة المانجو', es: 'Mango' },
        'Ici': { en: 'Here', de: 'Hier', ar: 'هنا', es: 'Aquí' },
        'Toi': { en: 'You', de: 'Du', ar: 'أنت', es: 'Tú' },
        'Moi': { en: 'Me', de: 'Ich', ar: 'أنا', es: 'Yo' },
        'Enfant': { en: 'Child', de: 'Kind', ar: 'طفل', es: 'Niño' },
        'Papa': { en: 'Dad', de: 'Papa', ar: 'أبي', es: 'Papá' },
        'Maman': { en: 'Mom', de: 'Mama', ar: 'ماما', es: 'Mamá' },
        'Petit pilon': { en: 'Small pestle', de: 'Kleiner Stößel', ar: 'مدقة صغيرة', es: 'Pilón pequeño' },
        'la capitale': { en: 'the capital', de: 'die Hauptstadt', ar: 'العاصمة', es: 'la capital' },
        'Parole': { en: 'Word/Speech', de: 'Wort', ar: 'كلمة', es: 'Palabra' },
        'Argent': { en: 'Money', de: 'Geld', ar: 'مال', es: 'Dinero' },
        'Nuit': { en: 'Night', de: 'Nacht', ar: 'ليل', es: 'Noche' },
        'Dignité': { en: 'Dignity', de: 'Würde', ar: 'كرامة', es: 'Dignidad' },
        'Yeux': { en: 'Eyes', de: 'Augen', ar: 'عيون', es: 'Ojos' },
        'Langue': { en: 'Tongue/Language', de: 'Sprache', ar: 'لغة', es: 'Lengua' },
        'Beauté': { en: 'Beauty', de: 'Schönheit', ar: 'جمال', es: 'Belleza' },
        'Chat': { en: 'Cat', de: 'Katze', ar: 'قطة', es: 'Gato' },
        'Personne': { en: 'Person', de: 'Person', ar: 'شخص', es: 'Persona' },
        'Grand-parent': { en: 'Grandparent', de: 'Großelternteil', ar: 'جد', es: 'Abuelo' },
        'Os': { en: 'Bone', de: 'Knochen', ar: 'عظم', es: 'Hueso' },
        'Dispute': { en: 'Dispute', de: 'Streit', ar: 'نزاع', es: 'Disputa' },
        'Vraiment': { en: 'Really', de: 'Wirklich', ar: 'حقاً', es: 'Realmente' },
        'la hache': { en: 'the axe', de: 'die Axt', ar: 'الفأس', es: 'el hacha' },
        'la tête': { en: 'the head', de: 'der Kopf', ar: 'الرأس', es: 'la cabeza' },
        'biner': { en: 'to hoe', de: 'hacken', ar: 'يعزق', es: 'binar' },
        'demain': { en: 'tomorrow', de: 'morgen', ar: 'غداً', es: 'mañana' },
        'le cheval': { en: 'the horse', de: 'das Pferd', ar: 'الحصان', es: 'el caballo' },
        'l\'œil': { en: 'the eye', de: 'das Auge', ar: 'العين', es: 'el ojo' },
        'l\'année': { en: 'the year', de: 'das Jahr', ar: 'السنة', es: 'el año' },
        'le soleil': { en: 'the sun', de: 'die Sonne', ar: 'الشمس', es: 'el sol' },
        'l\'homme': { en: 'the man', de: 'der Mann', ar: 'الرجل', es: 'el hombre' },
        'la main': { en: 'the hand', de: 'die Hand', ar: 'اليد', es: 'la mano' },
        'la vache': { en: 'the cow', de: 'die Kuh', ar: 'البقرة', es: 'la vaca' },
        'le haricot': { en: 'the bean', de: 'die Bohne', ar: 'الفاصوليا', es: 'el frijol' },
        'venir': { en: 'to come', de: 'kommen', ar: 'يأتي', es: 'venir' },
        'le maître': { en: 'the master', de: 'der Meister', ar: 'السيد', es: 'el maestro' },
        'le pont': { en: 'the bridge', de: 'die Brücke', ar: 'الجسر', es: 'el puente' },
        'attendre': { en: 'to wait', de: 'warten', ar: 'ينتظر', es: 'esperar' },
        'le champ': { en: 'the field', de: 'das Feld', ar: 'الحقل', es: 'el campo' },
        'partir': { en: 'to leave', de: 'verlassen', ar: 'يغادر', es: 'partir' },
        'fermer': { en: 'to close', de: 'schließen', ar: 'يغلق', es: 'cerrar' },
        'cracher': { en: 'to spit', de: 'spucken', ar: 'يبصق', es: 'escupir' },
        'piler': { en: 'to pound', de: 'stampfen', ar: 'يدق', es: 'pilar' },
        'changer': { en: 'to change', de: 'ändern', ar: 'يغير', es: 'cambiar' },
        'penser': { en: 'to think', de: 'denken', ar: 'يفكر', es: 'pensar' },
        'passer la journée': { en: 'to spend the day', de: 'den Tag verbringen', ar: 'يقضي اليوم', es: 'pasar el día' },
        'Le Coran': { en: 'The Quran', de: 'Der Koran', ar: 'القرآن', es: 'El Corán' },
        'Être/Là': { en: 'To be/There', de: 'Sein/Da', ar: 'يكون/هناك', es: 'Ser/Allí' },
        'Laver': { en: 'To wash', de: 'Waschen', ar: 'يغسل', es: 'Lavar' },
        'Chien': { en: 'Dog', de: 'Hund', ar: 'كلب', es: 'Perro' },
        'Chauffer': { en: 'To heat', de: 'Heizen', ar: 'يسخن', es: 'Calentar' },
        'Trahir': { en: 'To betray', de: 'Verraten', ar: 'يخون', es: 'Traicionar' },
        'je suis allé': { en: 'I went', de: 'ich bin gegangen', ar: 'ذهبت', es: 'fui' },
        'il/elle est allé(e)': { en: 'he/she went', de: 'er/sie ist gegangen', ar: 'ذهب/ذهبت', es: 'él/ella fue' },
        'nous sommes allés': { en: 'we went', de: 'wir sind gegangen', ar: 'ذهبنا', es: 'fuimos' },
        'Mercredi': { en: 'Wednesday', de: 'Mittwoch', ar: 'الأربعاء', es: 'Miércoles' },
        'Marmite': { en: 'Pot', de: 'Topf', ar: 'قدر', es: 'Olla' },
        'Soigner': { en: 'To treat', de: 'Behandeln', ar: 'يعالج', es: 'Tratar' },
        'Jamais': { en: 'Never', de: 'Niemals', ar: 'أبداً', es: 'Jamás' },
        'Vie': { en: 'Life', de: 'Leben', ar: 'حياة', es: 'Vida' },
        'Bouche': { en: 'Mouth', de: 'Mund', ar: 'فم', es: 'Boca' },
        'Père': { en: 'Father', de: 'Vater', ar: 'أب', es: 'Padre' },
        'Glace': { en: 'Ice', de: 'Eis', ar: 'جليد', es: 'Hielo' },
        'Esprit': { en: 'Spirit/Mind', de: 'Geist', ar: 'روح', es: 'Espíritu' },
        'ils / elles': { en: 'they', de: 'sie', ar: 'هم / هن', es: 'ellos / ellas' },
        'l\'enfant': { en: 'the child', de: 'das Kind', ar: 'الطفل', es: 'el niño' },
        'les enfants': { en: 'the children', de: 'die Kinder', ar: 'الأطفال', es: 'los niños' },
        'l\'éléphant': { en: 'the elephant', de: 'der Elefant', ar: 'الفiel', es: 'el elefante' },
        'les éléphants': { en: 'the elephants', de: 'die Elefanten', ar: 'الفيلة', es: 'los elefantes' },
        'singulier humain': { en: 'singular human', de: 'Singular (Mensch)', ar: 'مفرد بشري', es: 'singular humano' },
        'pluriel humain': { en: 'plural human', de: 'Plural (Mensch)', ar: 'جمع بشري', es: 'plural humano' },
        'singulier général': { en: 'singular general', de: 'Singular (Allgemein)', ar: 'مفرد عام', es: 'singular general' },
        'pluriel général': { en: 'plural general', de: 'Plural (Allgemein)', ar: 'جمع عام', es: 'plural general' },
        // Phonetic notes
        'Voyelle courte': { en: 'Short vowel', de: 'Kurzer Vokal', ar: 'حرف علة قصير', es: 'Vocal corta' },
        'Voyelle longue devant consonne géminée ou nasale': { en: 'Long vowel before geminate or nasal consonant', de: 'Langer Vokal vor Doppel- oder Nasalkonsonant', ar: 'حرف علة طويل قبل حرف ساكن مزدوج أو أنفي', es: 'Vocal larga antes de consonante geminada o nasal' },
        'Toujours prononcé \'tch\'': { en: 'Always pronounced \'tch\'', de: 'Immer als \'tch\' ausgesprochen', ar: 'يُنطق دائماً \'tch\'', es: 'Siempre pronunciado \'tch\'' },
        'Son central \'eu\'': { en: 'Central sound \'eu\'', de: 'Zentraler Laut \'eu\'', ar: 'صوت مركزي \'eu\'', es: 'Sonido central \'eu\'' },
        'Nasale palatale \'gn\'': { en: 'Palatal nasal \'gn\'', de: 'Palataler Nasal \'gn\'', ar: 'أنفي حنكي \'gn\'', es: 'Nasal palatal \'gn\'' },
        'Nasale palatale': { en: 'Palatal nasal', de: 'Palataler Nasal', ar: 'أنفي حنكي', es: 'Nasal palatal' },
        'Nasale vélaire \'ng\'': { en: 'Velar nasal \'ng\'', de: 'Velarer Nasal \'ng\'', ar: 'أنفي طبقي \'ng\'', es: 'Nasal velar \'ng\'' },
        'Nasale vélaire': { en: 'Velar nasal', de: 'Velarer Nasal', ar: 'أنفي طبقي', es: 'Nasal velar' },
        'Racle de la gorge (jota)': { en: 'Throaty scrape (jota)', de: 'Kehlkopfreibelaut (Jota)', ar: 'صوت حلقي (خوتا)', es: 'Raspado de garganta (jota)' },
        'Consonne implosive': { en: 'Implosive consonant', de: 'Implosiver Konsonant', ar: 'حرف ساكن انفجاري', es: 'Consonante implosiva' },
        'Injective': { en: 'Injective', de: 'Injektiv', ar: 'حقني', es: 'Inyectiva' },
        'Consonne glottalisée': { en: 'Glottalized consonant', de: 'Glottalisierter Konsonant', ar: 'حرف ساكن مزماري', es: 'Consonante glotalizada' },
        'Coup de glotte': { en: 'Glottal stop', de: 'Glottisschlag', ar: 'وقفة مزمارية', es: 'Oclusión glotal' },
        'Injective vélaire': { en: 'Velar injective', de: 'Velarer Injektiv', ar: 'حقني طبقي', es: 'Inyectiva velar' },
        'Injective (U+0181)': { en: 'Injective (U+0181)', de: 'Injektiv (U+0181)', ar: 'Injective (U+0181)', es: 'Inyectiva (U+0181)' },
        'Injective (U+0188)': { en: 'Injective (U+0188)', de: 'Injektiv (U+0188)', ar: 'Injective (U+0188)', es: 'Inyectiva (U+0188)' },
        'Injective (U+0257)': { en: 'Injective (U+0257)', de: 'Injektiv (U+0257)', ar: 'Injective (U+0257)', es: 'Inyectiva (U+0257)' },
        'Injective vélaire (U+029B)': { en: 'Velar injective (U+029B)', de: 'Velarer Injektiv (U+029B)', ar: 'Injective vélaire (U+029B)', es: 'Inyectiva velar (U+029B)' },
        'Injective (U+01A5)': { en: 'Injective (U+01A5)', de: 'Injektiv (U+01A5)', ar: 'Injective (U+01A5)', es: 'Inyectiva (U+01A5)' },
        'Injective (U+01AD)': { en: 'Injective (U+01AD)', de: 'Injektiv (U+01AD)', ar: 'Injective (U+01AD)', es: 'Inyectiva (U+01AD)' },
        'je suis en train de': { en: 'I am currently', de: 'ich bin gerade dabei', ar: 'أنا حالياً', es: 'estoy ahora mismo' },
        'tu es en train de': { en: 'you are currently', de: 'du bist gerade dabei', ar: 'أنت حالياً', es: 'estás ahora mismo' },
        'il/elle est en train de': { en: 'he/she is currently', de: 'er/sie ist gerade dabei', ar: 'هو/هي حالياً', es: 'él/ella está ahora mismo' },
        // Pronoun translations
        'moi': { en: 'me', de: 'mich/mir', ar: 'أنا', es: 'yo' },
        'toi': { en: 'you', de: 'du/dich', ar: 'أنت', es: 'tú' },
        'lui / elle': { en: 'him / her', de: 'er / sie', ar: 'هو / هي', es: 'él / ella' },
        'nous': { en: 'we/us', de: 'wir/uns', ar: 'نحن', es: 'nosotros' },
        'vous': { en: 'you (plural)', de: 'ihr/euch', ar: 'أنتم', es: 'ustedes' },
        'eux / elles': { en: 'them', de: 'sie/ihnen', ar: 'هم / هن', es: 'ellos / ellas' },
        // Grammar terms
        "c'est moi qui... (1S)": { en: "it's me who... (1S)", de: 'ich bin es, der... (1S)', ar: 'أنا الذي... (1S)', es: 'soy yo quien... (1S)' },
        "c'est toi qui... (2S)": { en: "it's you who... (2S)", de: 'du bist es, der... (2S)', ar: 'أنت الذي... (2S)', es: 'eres tú quien... (2S)' },
        "c'est lui/elle qui... (3S)": { en: "it's him/her who... (3S)", de: 'er/sie ist es, der/die... (3S)', ar: 'هو/هي الذي... (3S)', es: 'es él/ella quien... (3S)' },
        "c'est nous qui... (1P)": { en: "it's us who... (1P)", de: 'wir sind es, die... (1P)', ar: 'نحن الذين... (1P)', es: 'somos nosotros quienes... (1P)' },
        "c'est vous qui... (2P)": { en: "it's you who... (2P)", de: 'ihr seid es, die... (2P)', ar: 'أنتم الذين... (2P)', es: 'son ustedes quienes... (2P)' },
        "ce sont eux qui... (3P)": { en: "it's them who... (3P)", de: 'sie sind es, die... (3P)', ar: 'هم الذين... (3P)', es: 'son ellos quienes... (3P)' },
        // Conjugation
        "j'aime / je veux": { en: "I like / I want", de: 'ich mag / ich will', ar: 'أحب / أريد', es: 'me gusta / quiero' },
        "tu aimes / tu veux": { en: "you like / you want", de: 'du magst / du willst', ar: 'تحب / تريد', es: 'te gusta / quieres' },
        "il/elle aime / il/elle veut": { en: "he/she likes / wants", de: 'er/sie mag / will', ar: 'يحب / يريد', es: 'le gusta / quiere' },
        "nous aimons / nous voulons": { en: "we like / we want", de: 'wir mögen / wir wollen', ar: 'نحب / نريد', es: 'nos gusta / queremos' },
    };

    // Transform the raw trans field to use interface language
    const translateTrans = (trans: string): string => {
        if (interfaceLanguage === 'fr') return trans; // Already in French

        let result = trans;
        
        // Use regex for leading "comme" or "ex:" (case insensitive)
        result = result.replace(/^(comme|ex:)\s+/i, (match) => {
            const m = match.toLowerCase().trim();
            if (m === 'comme') return p.like + ' ';
            if (m === 'ex:') return p.example + ':';
            return match;
        });

        // Replace French terms with translated equivalents
        // Sort by length (longest first) to avoid partial replacements
        const sortedTerms = Object.keys(frenchTerms).sort((a, b) => b.length - a.length);
        for (const frTerm of sortedTerms) {
            const translations = frenchTerms[frTerm];
            const translated = translations[interfaceLanguage];
            if (translated) {
                // Escape regex special characters
                const escaped = frTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                // Case-insensitive global search
                const regex = new RegExp(escaped, 'gi');
                result = result.replace(regex, translated);
            }
        }

        return result;
    };


    // Build explanation in the format: "A" like "Alaal" (Wealth)
    const buildExplanation = (term: string, trans: string, context?: string): string => {
        if (context) return context;
        const parsed = parseTrans(trans);
        if (parsed) {
            let meaning = parsed.meaning;
            // Translate the meaning if not in French
            if (interfaceLanguage !== 'fr' && meaning && frenchTerms[meaning]) {
                meaning = frenchTerms[meaning][interfaceLanguage] || meaning;
            }
            const meaningPart = meaning ? ` (${meaning})` : '';
            return `"${term}" ${p.like} "${parsed.word}"${meaningPart}`;
        }
        // Fallback for non-alphabet data (e.g. "moi" → "me")
        return `"${term}" → ${translateTrans(trans)}`;
    };

    let data = langData[lessonTitle] || langData[lessonTitle.trim()];
    if (!data) {
        const matchingKey = Object.keys(langData).find(k => lessonTitle.includes(k) || k.includes(lessonTitle));
        if (matchingKey) data = langData[matchingKey];
    }
    
    if (!data || data.length === 0) return null;

    // Extract 10 items for lessons
    const maxExercises = 10;
    const baseData = data.slice(0, maxExercises);

    // Provide 5 introductory flashcards followed by the full lesson data
    // This supports the 5/5/5 flow: 5 Intro slides, 5 Quiz, 5-10 Practice
    const finalData = [...baseData.slice(0, 5), ...baseData];

    const illustrationMap: Record<string, any> = {
        'bopp': EXERCISE_ILLUSTRATIONS.visage,
        'loxo': EXERCISE_ILLUSTRATIONS.main,
        'tank': EXERCISE_ILLUSTRATIONS.pieds,
        'bakkan': EXERCISE_ILLUSTRATIONS.nez,
        'nopp': EXERCISE_ILLUSTRATIONS.oreille,
        'bët': EXERCISE_ILLUSTRATIONS.oeil,
        'gémmiñ': EXERCISE_ILLUSTRATIONS.bouche,
        'xol': EXERCISE_ILLUSTRATIONS.coeur,
        'kër': EXERCISE_ILLUSTRATIONS.maison,
        'ja': EXERCISE_ILLUSTRATIONS.marche,
        'marse': EXERCISE_ILLUSTRATIONS.marche,
        'làmmiñ': EXERCISE_ILLUSTRATIONS.langue,
        'matin': EXERCISE_ILLUSTRATIONS.lever_soleil,
        'suba': EXERCISE_ILLUSTRATIONS.lever_soleil,
        'ngoon': EXERCISE_ILLUSTRATIONS.lune_nuit,
        'marché': EXERCISE_ILLUSTRATIONS.marche,
        'bouche': EXERCISE_ILLUSTRATIONS.bouche,
        'coeur': EXERCISE_ILLUSTRATIONS.coeur,
        'oeil': EXERCISE_ILLUSTRATIONS.oeil,
        'oreille': EXERCISE_ILLUSTRATIONS.oreille,
        'nez': EXERCISE_ILLUSTRATIONS.nez,
        'pieds': EXERCISE_ILLUSTRATIONS.pieds,
        'waa kër': EXERCISE_ILLUSTRATIONS.famille,
        'yaay': EXERCISE_ILLUSTRATIONS.mere,
        'baay': EXERCISE_ILLUSTRATIONS.pere,
        'xarit': EXERCISE_ILLUSTRATIONS.amis,
        'amis': EXERCISE_ILLUSTRATIONS.amis,
        'lekk': EXERCISE_ILLUSTRATIONS.manger,
        'naan': EXERCISE_ILLUSTRATIONS.boire,
        'liggéy': EXERCISE_ILLUSTRATIONS.travailler,
        'dox': EXERCISE_ILLUSTRATIONS.garcon_marche,
        'ecole': EXERCISE_ILLUSTRATIONS.ecole,
        'école': EXERCISE_ILLUSTRATIONS.ecole,
        'maison': EXERCISE_ILLUSTRATIONS.maison,
        'famille': EXERCISE_ILLUSTRATIONS.famille,
        'mère': EXERCISE_ILLUSTRATIONS.mere,
        'père': EXERCISE_ILLUSTRATIONS.pere,
        'fille': EXERCISE_ILLUSTRATIONS.fille,
        'garçon': EXERCISE_ILLUSTRATIONS.garcon_marche,
        'argent': EXERCISE_ILLUSTRATIONS.argent,
        'riz': EXERCISE_ILLUSTRATIONS.riz,
        'eau': EXERCISE_ILLUSTRATIONS.eau,
    };

    const termSeenCount = new Map<string, number>();

    return finalData.map((item, index) => {
        const termToLower = item.term ? item.term.toLowerCase() : '';
        const transToLower = item.trans ? item.trans.toLowerCase() : '';
        
        let exerciseImages: any[] | undefined = undefined;
        const correctImg = illustrationMap[termToLower] || illustrationMap[transToLower];
        if (correctImg) exerciseImages = [correctImg];

        if (index < 5) {
             return {
                 id: `static-${lessonTitle}-flashcard-${index}`,
                 type: ExerciseType.FLASHCARD,
                 prompt: p.memorize,
                 content: item.term,
                 translation: translateTrans(item.trans),
                 correctAnswer: translateTrans(item.trans),
                 options: [translateTrans(item.trans)],
                 images: exerciseImages,
                 avatar: 'bayo',
                 explanation: buildExplanation(item.term, item.trans, item.context),
                 culturalNote: item.context,
             };
        }

        const seenCount = termSeenCount.get(termToLower) || 0;
        termSeenCount.set(termToLower, seenCount + 1);

        const hasIllustration = !!illustrationMap[termToLower] || !!illustrationMap[transToLower];
        const isBodyPartsLesson = lessonTitle.includes("corps") || lessonTitle.includes("Cër");

        let availableTypes = [
            ExerciseType.CHOOSE_TRANSLATION,
            ExerciseType.TRANSLATE_AND_ORDER,
            ExerciseType.LISTEN_AND_CHOICE,
        ];

        if (isBodyPartsLesson) {
            availableTypes = hasIllustration ? [ExerciseType.CHOOSE_IMAGE] : [ExerciseType.CHOOSE_TRANSLATION];
        } else if (hasIllustration) {
            availableTypes.push(ExerciseType.CHOOSE_IMAGE);
        }

        // Combine index (for initial variety) and seenCount (to mutate repetitions)
        const typeIndex = (index + seenCount) % availableTypes.length;
        const type = availableTypes[typeIndex];
        
        // Alternate translation direction based on seenCount and index to maximize variety
        const isToFrench = (seenCount % 2 === 0) ? (index % 2 === 0) : (index % 2 !== 0);

        let prompt = "";
        let content = "";
        let correctAnswer: string | string[] = "";
        let options: string[] = [];

        if (type === ExerciseType.CHOOSE_TRANSLATION) {
            if (isToFrench) {
                prompt = p.what_means;
                content = item.term;
                const translated = translateTrans(item.trans);
                correctAnswer = translated;
                const others = finalData.filter(d => d.term !== item.term && d.trans).map(d => translateTrans(d.trans));
                options = [translated, ...others.sort(() => 0.5 - Math.random()).slice(0, 3)].sort(() => 0.5 - Math.random());
            } else {
                prompt = p.how_say;
                content = translateTrans(item.trans);
                correctAnswer = item.term;
                const others = finalData.filter(d => d.term !== item.term && d.term).map(d => d.term);
                options = [item.term, ...others.sort(() => 0.5 - Math.random()).slice(0, 3)].sort(() => 0.5 - Math.random());
            }
        } else if (type === ExerciseType.TRANSLATE_AND_ORDER) {
            prompt = p.rebuild;
            content = translateTrans(item.trans);
            correctAnswer = item.term;

            const correctWords = item.term.split(' ');
            
            // Generate a slight mutation of a word to serve as a strong decoy
            const mutateWord = (w: string) => {
                if (!w) return 'xamnaa';
                if (w.length < 3) return w + 'y'; 
                const vowels = ['a','e','i','o','u', 'é', 'ë'];
                const chars = w.split('');
                const idx = chars.findIndex(c => vowels.includes(c.toLowerCase()));
                if (idx !== -1) {
                    const current = chars[idx].toLowerCase();
                    const others = vowels.filter(v => v !== current);
                    chars[idx] = others[Math.floor(Math.random() * others.length)];
                } else {
                    chars[1] = chars[1] === 'x' ? 'm' : 'x';
                }
                return chars.join('');
            };

            const sortedWords = [...correctWords].sort((a, b) => b.length - a.length);
            const closeDecoy1 = sortedWords[0] ? mutateWord(sortedWords[0]) : 'bax';
            const closeDecoy2 = sortedWords[1] ? mutateWord(sortedWords[1]) : mutateWord(closeDecoy1);

            const allOtherWords = finalData.filter(d => d.term !== item.term && d.term.includes(' ')).map(d => d.term.split(' ')).flat();
            
            // Calculate how many more words we need to reach at least 4 options
            // options length will be correctWords.length + decoys.length + closeDecoys.length
            const minTotalOptions = 4;
            let currentOptionsCount = correctWords.length + 1; // +1 for closeDecoy1
            
            let extraDecoysNeeded = Math.max(1, minTotalOptions - currentOptionsCount);
            
            const decoys = allOtherWords.filter(w => !correctWords.includes(w) && w.length > 2).sort(() => 0.5 - Math.random()).slice(0, extraDecoysNeeded);
            
            let finalOptions = [...correctWords, ...decoys, closeDecoy1];
            
            // If we STILL don't have 4 options (e.g. not enough other words), add another mutation
            if (finalOptions.length < 4) {
                finalOptions.push(closeDecoy2);
            }
            // And if still < 4, pad with arbitrary strings
            while (finalOptions.length < 4) {
                finalOptions.push(Math.random() > 0.5 ? 'def' : 'dem');
            }

            options = finalOptions.sort(() => 0.5 - Math.random());
        } else if (type === ExerciseType.CHOOSE_IMAGE) {
            prompt = `${p.which_image} "${item.term}" ?`;
            content = item.term;
            correctAnswer = translateTrans(item.trans);

            const correctImg = illustrationMap[termToLower] || illustrationMap[transToLower];
            const othersWithImg = finalData.filter(d => d.term !== item.term && (!!illustrationMap[d.term.toLowerCase()] || !!illustrationMap[d.trans.toLowerCase()]));
            const selectedOthers = othersWithImg.sort(() => 0.5 - Math.random()).slice(0, 3);

            const allItems = [
                { trans: item.trans, img: correctImg },
                ...selectedOthers.map(o => ({ trans: o.trans, img: illustrationMap[o.term.toLowerCase()] || illustrationMap[o.trans.toLowerCase()] }))
            ].sort(() => 0.5 - Math.random());

            options = allItems.map(i => translateTrans(i.trans));
            exerciseImages = allItems.map(i => i.img);
        } else {
            prompt = p.listen_choose;
            content = item.term;
            correctAnswer = translateTrans(item.trans);
            const others = finalData.filter(d => d.term !== item.term && d.trans).map(d => translateTrans(d.trans));
            options = [correctAnswer, ...others.sort(() => 0.5 - Math.random()).slice(0, 3)].sort(() => 0.5 - Math.random());
        }

        while (options.length < 2) {
            options.push(options[0] + " " + p.other_suffix);
        }
        
        // Remove duplicates in options array
        options = [...new Set(options)];
        if (options.length === 1) {
             options.push(p.other_translation);
        }

        return {
            id: `static-${lessonTitle}-${index}`,
            type,
            prompt,
            content,
            translation: translateTrans(item.trans),
            correctAnswer,
            options,
            images: exerciseImages,
            avatar: 'bayo',
            explanation: buildExplanation(item.term, item.trans, item.context),
            culturalNote: item.context,
        };
    });
};

const getFallbackExercises = (targetLanguage: string, interfaceLanguage: string): Exercise[] => {
    const isEnglish = interfaceLanguage === 'en';
    const isGerman = interfaceLanguage === 'de';
    const isArabic = interfaceLanguage === 'ar';
    const isSpanish = interfaceLanguage === 'es';

    const helloPrompt = isEnglish ? "How do you say 'Hello'?" : 
                        isGerman ? "Wie sagt man 'Hallo'?" :
                        isArabic ? "كيف تقول 'مرحباً'؟" :
                        isSpanish ? "¿Cómo se dice 'Hola'?" :
                        "Comment dit-on 'Bonjour' ?";

    const helloContent = isEnglish ? "Hello" :
                         isGerman ? "Hallo" :
                         isArabic ? "مرحباً" :
                         isSpanish ? "Hola" :
                         "Bonjour";

    const helloExpl = isEnglish ? "'Na nga def' is the standard greeting meaning 'How are you?'." :
                      isGerman ? "'Na nga def' ist der Standardgruß und bedeutet 'Wie geht es dir?'." :
                      isArabic ? "'Na nga def' هي التحية القياسية وتعني 'كيف حالك؟'." :
                      isSpanish ? "'Na nga def' es el saludo estándar que significa '¿Cómo estás?'." :
                      "Na nga def est la salutation standard signifiant 'Comment vas-tu ?'.";

    const readyPrompt = isEnglish ? "Ready?" :
                        isGerman ? "Bereit?" :
                        isArabic ? "مستعد؟" :
                        isSpanish ? "¿Listo?" :
                        "Prêt ?";

    const adventureExpl = isEnglish ? "The adventure begins!" :
                          isGerman ? "Das Abenteuer beginnt!" :
                          isArabic ? "المغامرة تبدأ!" :
                          isSpanish ? "¡La aventura comienza!" :
                          "L'aventure commence !";

    const yesText = isEnglish ? "Yes" : isGerman ? "Ja" : isArabic ? "نعم" : isSpanish ? "Sí" : "Oui";
    const noText = isEnglish ? "No" : isGerman ? "Nein" : isArabic ? "لا" : isSpanish ? "No" : "Non";
    const maybeText = isEnglish ? "Maybe" : isGerman ? "Vielleicht" : isArabic ? "ربما" : isSpanish ? "Tal vez" : "Peut-être";
    const laterText = isEnglish ? "Later" : isGerman ? "Später" : isArabic ? "لاحقاً" : isSpanish ? "Más tarde" : "Plus tard";

    const fallbacks: Record<string, Exercise[]> = {
        wolof: [
            {
                id: 'fb1',
                type: ExerciseType.CHOOSE_TRANSLATION,
                prompt: helloPrompt,
                content: helloContent,
                correctAnswer: "Na nga def",
                options: ["Na nga def", "Jërëjëf", "Ba beneen", "Waaw"],
                avatar: 'bayo',
                explanation: helloExpl
            }
        ],
        default: [
            {
                id: 'fb-def',
                type: ExerciseType.CHOOSE_TRANSLATION,
                prompt: readyPrompt,
                content: "Yana",
                correctAnswer: yesText,
                options: [yesText, noText, maybeText, laterText],
                avatar: 'bayo',
                explanation: adventureExpl
            }
        ]
    };

    return fallbacks[targetLanguage] || fallbacks.default;
};

export const generateLessonExercises = async (
    targetLanguage: string,
    theme: string,
    isStory: boolean = false,
    interfaceLanguage: string = 'fr',
    lessonTitle: string = "",
    unitId: number = -1
): Promise<Exercise[]> => {
    const languageNames: Record<string, string> = {
        fr: "français",
        en: "English",
        de: "Deutsch",
        ar: "العربية"
    };

    const baseLang = languageNames[interfaceLanguage] || "français";

    // Tenter de générer depuis les données locales (ultra rapide, offline et robuste)
    // Cela empêchera également de retourner le `getFallbackExercises` d'un seul exercice si l'API est absente !
    const staticExercises = generateStaticExercises(targetLanguage, lessonTitle, unitId, interfaceLanguage);
    
    if (staticExercises && staticExercises.length === 10) {
        console.log(`Using static generation for: ${lessonTitle}`);
        return staticExercises;
    }

    const apiKey = Constants.expoConfig?.extra?.GEMINI_API_KEY || process.env.EXPO_PUBLIC_GEMINI_API_KEY;

    if (!apiKey) {
        console.warn("No Gemini API key found for this unit, using fallback exercises");
        return getFallbackExercises(targetLanguage, interfaceLanguage);
    }

    const ai = new GoogleGenAI({ apiKey });

    // On injecte le contenu de référence complet si on est en Wolof
    const referenceContext = (targetLanguage.toLowerCase() === 'wolof')
        ? GLOBAL_REFERENCE_CONTENT
        : "";

    const systemPrompt = isStory
        ? `Tu es Bayo, un castor sage guidant l'utilisateur dans l'apprentissage des langues africaines. 
       Génère une histoire immersive en ${targetLanguage} sur le thème "${theme}" - ${lessonTitle}. 
       ${lessonTitle.startsWith('Révision') ? 'CETTE HISTOIRE EST LE CHAPITRE FINAL DE RÉVISION DE TOUTES LES UNITÉS. CRÉE UNE TRÈS LONGUE HISTOIRE SOUS FORME DE DIALOGUE COUVRANT DIVERS SUJETS VUS DANS LES UNITÉS. UTILISE LES MOTS DE TOUS LES COURS PRECEDENTS.' : ''}
       ${referenceContext}
       IMPORTANT : Toutes les instructions, les prompts de question, les explications et les traductions DOIVENT être rédigés en ${baseLang}.
       L'histoire doit être composée de 10 segments de dialogue.`
        : `Tu es Bayo, un professeur expert en langues africaines. 
       Génère une leçon complète de EXACTEMENT 15 éléments pour apprendre le ${targetLanguage} sur le thème : "${lessonTitle}".
        Structure de la leçon obligatoirement :
        1. [COURS] 5 exercices de type FLASHCARD (Théorie).
        2. [QUIZ] 5 exercices de type CHOOSE_TRANSLATION ou CHOOSE_IMAGE (Validation).
        3. [PRATIQUE] 5 exercices variés (Application).
       ${lessonTitle.startsWith('Révision') ? "CETTE LEÇON EST UNE RÉVISION COMPLÈTE. CHOISIS AU HASARD 15 MOTS PARMI TOUT LE CONTENU DE RÉFÉRENCE DE LA LANGUE POUR TESTER L'ÉLÈVE." : ""}
       
       CONTEXTE GLOBAL DE L'UNITÉ :
       ${referenceContext}
       
       Règles strictes :
       1. Utilise UNIQUEMENT le vocabulaire et les expressions fournis dans le "Cours" correspondant au titre "${lessonTitle}" dans le contenu de référence ci-dessus (Ou de n'importe quel cours si c'est une Révision).
       2. Toutes les instructions, les prompts, les explications et les traductions DOIVENT être en ${baseLang}.
       3. L'interface de l'utilisateur est en ${baseLang}.
       4. Génère exactement 15 éléments différents pour couvrir le maximum d'expressions du cours.
       
       Mélange ces types d'exercices :
       - CHOOSE_IMAGE : Mot en ${targetLanguage}, choisir l'image correspondante parmi 4 options.
       - CHOOSE_TRANSLATION : Traduire un mot ou expression du ${baseLang} vers le ${targetLanguage} ou inversement.
       - TRANSLATE_AND_ORDER : Ordonner des mots en ${targetLanguage} pour traduire une phrase complète donnée en ${baseLang}.
       - LISTEN_AND_ORDER : Écouter une phrase en ${targetLanguage} (indiquée dans content) et ordonner les mots.
       - SPEAK : Demander à l'utilisateur de répéter une phrase spécifique en ${targetLanguage}.
       - LISTEN_AND_CHOICE : Écouter en ${targetLanguage} et choisir la bonne traduction en ${baseLang}.
       - CULTURAL_NOTE : Fournir une explication sur l'usage social d'une expression (ex: Teranga, respect des aînés).`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-1.5-flash",
            contents: systemPrompt + ` Retourne uniquement un tableau JSON de 15 objets Exercise.`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            id: { type: Type.STRING },
                            type: { type: Type.STRING, enum: Object.values(ExerciseType) },
                            prompt: { type: Type.STRING },
                            content: { type: Type.STRING },
                            options: { type: Type.ARRAY, items: { type: Type.STRING } },
                            correctAnswer: { type: Type.STRING },
                            avatar: { type: Type.STRING },
                            images: { type: Type.ARRAY, items: { type: Type.STRING } },
                            explanation: { type: Type.STRING },
                            culturalNote: { type: Type.STRING }
                        },
                        required: ["id", "type", "prompt", "content", "correctAnswer", "avatar", "explanation", "options"]
                    }
                }
            }
        });

        const responseText = response.text || "";
        const jsonStr = responseText.includes('[')
            ? responseText.substring(responseText.indexOf('['), responseText.lastIndexOf(']') + 1)
            : responseText;

        const data = JSON.parse(jsonStr);

        if (Array.isArray(data) && data.length > 0) {
            return data.map((ex: any) => {
                // Enrichissement des images : Priorité aux illustrations locales, puis Unsplash
                const illustrationMap: Record<string, any> = {
                    'bouche': EXERCISE_ILLUSTRATIONS.bouche,
                    'coeur': EXERCISE_ILLUSTRATIONS.coeur,
                    'ecole': EXERCISE_ILLUSTRATIONS.ecole,
                    'main': EXERCISE_ILLUSTRATIONS.main,
                    'maison': EXERCISE_ILLUSTRATIONS.maison,
                    'marche': EXERCISE_ILLUSTRATIONS.marche,
                    'marché': EXERCISE_ILLUSTRATIONS.marche,
                    'nez': EXERCISE_ILLUSTRATIONS.nez,
                    'oeil': EXERCISE_ILLUSTRATIONS.oeil,
                    'oreille': EXERCISE_ILLUSTRATIONS.oreille,
                    'pieds': EXERCISE_ILLUSTRATIONS.pieds,
                    'visage': EXERCISE_ILLUSTRATIONS.visage,
                    'route': EXERCISE_ILLUSTRATIONS.route,
                    'village': EXERCISE_ILLUSTRATIONS.village_habitants,
                    'lune': EXERCISE_ILLUSTRATIONS.lune_nuit,
                    'matin': EXERCISE_ILLUSTRATIONS.lever_soleil,
                    'amis': EXERCISE_ILLUSTRATIONS.amis,
                    'boire': EXERCISE_ILLUSTRATIONS.boire,
                    'famille': EXERCISE_ILLUSTRATIONS.famille,
                    'fille': EXERCISE_ILLUSTRATIONS.fille,
                    'fils': EXERCISE_ILLUSTRATIONS.fils,
                    'manger': EXERCISE_ILLUSTRATIONS.manger,
                    'mere': EXERCISE_ILLUSTRATIONS.mere,
                    'père': EXERCISE_ILLUSTRATIONS.pere,
                    'parler': EXERCISE_ILLUSTRATIONS.parler,
                    'travailler': EXERCISE_ILLUSTRATIONS.travailler,
                    'grand_pére': EXERCISE_ILLUSTRATIONS.grand_pere,
                    'grande_mére': EXERCISE_ILLUSTRATIONS.grande_mere,
                    'argent': EXERCISE_ILLUSTRATIONS.argent,
                    'chambre': EXERCISE_ILLUSTRATIONS.chambre,
                    'chaussure': EXERCISE_ILLUSTRATIONS.chaussure,
                    'eau': EXERCISE_ILLUSTRATIONS.eau,
                    'livre': EXERCISE_ILLUSTRATIONS.livre,
                    'porte': EXERCISE_ILLUSTRATIONS.porte,
                    'riz': EXERCISE_ILLUSTRATIONS.riz,
                    'soleil': EXERCISE_ILLUSTRATIONS.soleil_objet,
                    'vêtement': EXERCISE_ILLUSTRATIONS.vetement,
                };

                const updatedImages = ex.images?.map((img: string) => {
                    const lowerImg = img.toLowerCase().trim();
                    if (lowerImg.startsWith('http')) return img;

                    // On tente de matcher le mot clé (ex: "main") avec une image locale
                    for (const key in illustrationMap) {
                        if (lowerImg.includes(key) || key.includes(lowerImg)) {
                            return illustrationMap[key];
                        }
                    }
                    // Fallback to Unsplash instead of just returning the keyword
                    return `https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=400&h=400&fit=crop&q=${encodeURIComponent(img)}`;
                });

                return {
                    ...ex,
                    images: updatedImages
                };
            });
        }

        return getFallbackExercises(targetLanguage, interfaceLanguage);
    } catch (e) {
        console.error("Gemini Generation Error:", e);
        return getFallbackExercises(targetLanguage, interfaceLanguage);
    }
};
export const chatWithDictionary = async (
    query: string,
    targetLanguage: string,
    baseLang: string = 'fr'
): Promise<{ response: string; emotion: BayoEmotion; suggestions?: string[] }> => {

    // 1. Recherche dans le lexique local (Wolof uniquement pour l'instant)
    if (targetLanguage.toLowerCase() === 'wolof') {
        const normalizedQuery = query.toLowerCase().trim();
        const localMatch = WOLOF_LEXICON.find(entry =>
            entry.wolof.toLowerCase().includes(normalizedQuery) ||
            entry.french.toLowerCase().includes(normalizedQuery)
        );

        if (localMatch) {
            return {
                response: `D'après mes tablettes Wolof : "${localMatch.wolof}" signifie "${localMatch.french}". C'est une expression de la catégorie "${localMatch.category}".`,
                emotion: 'happy',
                suggestions: ["D'autres mots ?", "Comment dire merci ?", "Salutations"]
            };
        }
    }

    // 2. Si pas de match local, on tente l'IA Gemini
    const apiKey = Constants.expoConfig?.extra?.GEMINI_API_KEY || process.env.EXPO_PUBLIC_GEMINI_API_KEY;

    // Si la clé est vide ou par défaut, on évite l'appel API inutile
    if (!apiKey || apiKey === "your_gemini_api_key_here") {
        return {
            response: "Je n'ai pas trouvé ce mot dans mon dictionnaire de poche et ma connexion au Grand Savoir (API) est désactivée. Peux-tu réessayer avec un mot de base comme 'Bonjour' ou 'Merci' ?",
            emotion: 'thinking'
        };
    }

    const ai = new GoogleGenAI({ apiKey });

    const systemPrompt = `Tu es Bayo, un castor sage et amical, expert en langues africaines (particulièrement le ${targetLanguage}).
    L'utilisateur te pose une question sur un mot, une expression ou une phrase en ${targetLanguage} ou veut une traduction depuis le ${baseLang}.
    
    Tes objectifs :
    1. Répondre de manière concise et ludique.
    2. Donner le mot/l'expression en ${targetLanguage}, sa prononciation approximative si nécessaire, et son sens.
    3. Ajouter une petite note culturelle ou un exemple d'utilisation si c'est pertinent.
    4. Choisir une émotion parmi : happy, excited, thinking, motivated, greeting, skeptical, taking_note.
    5. Suggérer 2 ou 3 questions de suivi ou mots connexes.

    Réponds au format JSON uniquement avec cette structure :
    {
      "response": "Texte de ta réponse en ${baseLang}",
      "emotion": "une des émotions citées",
      "suggestions": ["suggestion 1", "suggestion 2"]
    }`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-1.5-flash",
            contents: [{ role: "user", parts: [{ text: systemPrompt + "\n\nQuestion de l'utilisateur : " + query }] }],
            config: {
                responseMimeType: "application/json",
            }
        });

        const responseText = response.text || "";
        const data = JSON.parse(responseText);

        return {
            response: data.response,
            emotion: (data.emotion as BayoEmotion) || 'happy',
            suggestions: data.suggestions
        };
    } catch (error: any) {
        console.error("Chat Dictionary Error:", error);

        // Si c'est une erreur d'API Key, on donne une réponse pédagogique
        if (error.message?.includes("API key not valid")) {
            return {
                response: "Oups ! Ma clé magique (API Key) ne semble pas fonctionner. Je peux quand même répondre aux bases du Wolof grâce à mes notes locales. Essaie des mots comme 'Jërëjëf' !",
                emotion: 'sad'
            };
        }

        return {
            response: "Oups ! J'ai fait tomber mes notes. Peux-tu reformuler ta question ?",
            emotion: 'thinking'
        };
    }
};
