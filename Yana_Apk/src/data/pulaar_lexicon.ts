export interface LexiconEntry {
    pulaar: string;
    french: string;
    category?: string;
    context?: string;
}

export const PULAAR_LEXICON: LexiconEntry[] = [
    // Salutations & Formules de politesse
    { pulaar: "Jam waali", french: "Bonjour / Bonsoir", category: "Salutations" },
    { pulaar: "Jam tan", french: "La paix seulement (réponse)", category: "Salutations" },
    { pulaar: "Jam waali no mbaaa", french: "Bonjour, comment vas-tu ? (matin)", category: "Salutations" },
    { pulaar: "Aɗa selli ?", french: "Comment vas-tu ? / As-tu la santé ?", category: "Salutations" },
    { pulaar: "Baada ?", french: "Comment vas-tu ? (singulier)", category: "Salutations" },
    { pulaar: "On selli ?", french: "Comment allez-vous ? (pluriel)", category: "Salutations" },
    { pulaar: "Eɗen jetta Geno", french: "Bien / Dieu merci", category: "Salutations" },
    { pulaar: "Salmini galle", french: "Saluer la maison / la famille", category: "Salutations" },
    { pulaar: "Mboɗo salmini ma", french: "Je te salue", category: "Salutations" },
    { pulaar: "Bissimilah", french: "Soyez le bienvenu", category: "Salutations" },
    { pulaar: "Baalenen é diiam", french: "Bonne nuit / À demain", category: "Salutations" },
    { pulaar: "Adjarama / Jaraama", french: "Merci", category: "Salutations", context: "Expression de gratitude standard." },
    { pulaar: "On njaaraama", french: "Merci (pluriel / respect)", category: "Salutations" },
    { pulaar: "Jam ñalli", french: "Bonjour (après-midi)", category: "Salutations" },
    { pulaar: "Jam hiiri", french: "Bonsoir", category: "Salutations" },
    { pulaar: "No mbadu-daa ?", french: "Comment vas-tu ?", category: "Salutations" },
    { pulaar: "No ngoolu daa ?", french: "Salut / Comment ça va ?", category: "Salutations" },
    { pulaar: "Yoo Alla reene", french: "Qu'Allah te garde", category: "Salutations" },
    { pulaar: "Ko haidara", french: "De rien / Je vous en prie", category: "Salutations" },

    // Temps & Jours
    { pulaar: "Altini", french: "Lundi", category: "Temps" },
    { pulaar: "Taalata", french: "Mardi", category: "Temps" },
    { pulaar: "Alarba", french: "Mercredi", category: "Temps" },
    { pulaar: "Alkamissa", french: "Jeudi", category: "Temps" },
    { pulaar: "Aldjuma", french: "Vendredi", category: "Temps" },
    { pulaar: "Asseet", french: "Samedi", category: "Temps" },
    { pulaar: "Alleet", french: "Dimanche", category: "Temps" },
    { pulaar: "Annde", french: "Aujourd'hui", category: "Temps" },
    { pulaar: "Annki", french: "Hier", category: "Temps" },
    { pulaar: "Djangoo", french: "Demain", category: "Temps" },
    { pulaar: "Abooya sed", french: "À tout à l'heure", category: "Temps" },
    { pulaar: "Djema", french: "Le soir", category: "Temps" },

    // Conversation & Base
    { pulaar: "A n'da hala français", french: "Parlez-vous français", category: "Conversation" },
    { pulaar: "A fini", french: "Tu es réveillé", category: "Conversation" },
    { pulaar: "Deyydiu", french: "Tais-toi", category: "Conversation" },
    { pulaar: "BiDaa ?", french: "Que dis-tu ?", category: "Conversation" },
    { pulaar: "Eye", french: "Oui", category: "Base" },
    { pulaar: "Ala", french: "Non", category: "Base" },
    { pulaar: "Gassi", french: "C'est fini", category: "Base" },
    { pulaar: "Ioni", french: "Ça suffit", category: "Base" },

    // Actions
    { pulaar: "Addou ou adoum", french: "Apporte ou apporte-moi", category: "Actions" },
    { pulaar: "Annda", french: "Savoir / Connaître", category: "Actions" },
    { pulaar: "Arde", french: "Venir", category: "Actions" },
    { pulaar: "Daccude", french: "Laisser / Libérer", category: "Actions" },
    { pulaar: "Dog !", french: "Cours !", category: "Actions" },
    { pulaar: "Fadam", french: "Attends-moi", category: "Actions" },
    { pulaar: "Fidje", french: "Jouer", category: "Actions" },
    { pulaar: "Nyaamde", french: "Manger", category: "Actions" },
    { pulaar: "Yarde", french: "Boire", category: "Actions" },
    { pulaar: "Umo", french: "Lève-toi", category: "Actions" },

    // Famille & Identité
    { pulaar: "Afo", french: "Aîné des enfants", category: "Famille" },
    { pulaar: "BaaDiraaDo", french: "Neveu ou nièce", category: "Famille" },
    { pulaar: "Bajjo", french: "Enfant unique", category: "Famille" },
    { pulaar: "BanndiraaDo gorko", french: "Frère ou cousin", category: "Famille" },
    { pulaar: "BanndiraaDo debbo", french: "Sœur ou cousine", category: "Famille" },
    { pulaar: "Baayo", french: "Orphelin", category: "Famille" },
    { pulaar: "JinnaaBe", french: "Les parents", category: "Famille" },
    { pulaar: "Neene", french: "Mère", category: "Famille" },
    { pulaar: "Baaba", french: "Père", category: "Famille" },
    { pulaar: "Suka", french: "Enfant / Jeune", category: "Famille" },
    { pulaar: "Sehil", french: "Ami", category: "Famille" },
    { pulaar: "MusiDaaBe", french: "Les amis", category: "Famille" },
    { pulaar: "Innde", french: "Prénom", category: "Identité" },
    { pulaar: "Yettoode", french: "Nom de famille", category: "Identité" },

    // Description & Valeurs
    { pulaar: "Baleejo", french: "Noir", category: "Description" },
    { pulaar: "BoDeejo", french: "Rouge / Homme blanc (fig.)", category: "Description" },
    { pulaar: "Celbal", french: "La paix", category: "Valeurs" },
    { pulaar: "Djaambar", french: "Résistant / Robuste", category: "Description" },
    { pulaar: "Dokke allah", french: "Dons de Dieu", category: "Valeurs" },
    { pulaar: "Ene weeBi", french: "C'est facile", category: "Description" },
    { pulaar: "Ene saDi", french: "C'est difficile", category: "Description" },
    { pulaar: "Ené chéri", french: "C'est cher", category: "Description" },
    { pulaar: "Iodi", french: "Joli / Beau", category: "Description" },
    { pulaar: "Moyydii", french: "C'est bien", category: "Valeurs" },
    { pulaar: "Modjani", french: "Ce n'est pas bien", category: "Valeurs" },
    { pulaar: "Seesaa", french: "Doucement", category: "Description" },
    { pulaar: "Wuuli", french: "Chaud", category: "Description" },

    // Objets & Lieux
    { pulaar: "Comcol", french: "Vêtement", category: "Objets" },
    { pulaar: "Kosam", french: "Lait", category: "Nourriture" },
    { pulaar: "Ndiyam", french: "Eau", category: "Nourriture" },
    { pulaar: "Galle", french: "Maison / Famille", category: "Lieux" },
    { pulaar: "Maayo", french: "Fleuve", category: "Lieux" },
    { pulaar: "Wuro", french: "Village", category: "Lieux" },
    { pulaar: "Djoun'go niamo", french: "À droite", category: "Directions" },
    { pulaar: "Djoun'go nano", french: "À gauche", category: "Directions" },

    // Terminologie Pédagogique (USAID / Lecture Pour Tous)
    { pulaar: "Alluwal", french: "Tableau", category: "Pédagogie" },
    { pulaar: "Pesel", french: "Accent", category: "Pédagogie" },
    { pulaar: "Kayee", french: "Cahier", category: "Pédagogie" },
    { pulaar: "Kirtiyoŋ", french: "Crayon", category: "Pédagogie" },
    { pulaar: "Duɗal / Kalaas", french: "Classe / École", category: "Pédagogie" },
    { pulaar: "Baɗal", french: "Verbe", category: "Linguistique" },
    { pulaar: "Sifaa", french: "Adjectif", category: "Linguistique" },
    { pulaar: "Timmal", french: "Accompli", category: "Linguistique" },
    { pulaar: "Baastimmal", french: "Inaccompli", category: "Linguistique" },
    { pulaar: "Hijjere", french: "Syllabe", category: "Linguistique" },
    { pulaar: "Laaɓngal", french: "Voyelle", category: "Linguistique" },
    { pulaar: "Alkulal muumal", french: "Consonne", category: "Linguistique" },
    { pulaar: "Jannginoowo / Ceerno", french: "Enseignant", category: "Pédagogie" },
    { pulaar: "Elew / Janngoowo", french: "Apprenant / Élève", category: "Pédagogie" },
    { pulaar: "Paamgol / Faamaamuya", french: "Compréhension", category: "Pédagogie" },
    { pulaar: "Jaŋde", french: "Apprentissage / Leçon", category: "Pédagogie" },

    // Nombres (Système de base)
    { pulaar: "Goo", french: "Un (1)", category: "Nombres" },
    { pulaar: "Diidi", french: "Deux (2)", category: "Nombres" },
    { pulaar: "Tati", french: "Trois (3)", category: "Nombres" },
    { pulaar: "Nayi", french: "Quatre (4)", category: "Nombres" },
    { pulaar: "Joyi", french: "Cinq (5)", category: "Nombres" },
    { pulaar: "Jeegom", french: "Six (6)", category: "Nombres", context: "5 + 1" },
    { pulaar: "Jeediidi", french: "Sept (7)", category: "Nombres", context: "5 + 2" },
    { pulaar: "Jeetati", french: "Huit (8)", category: "Nombres", context: "5 + 3" },
    { pulaar: "Jeenayi", french: "Neuf (9)", category: "Nombres", context: "5 + 4" },
    { pulaar: "Sappo", french: "Dix (10)", category: "Nombres" },

    // Alternance Consonantique (Exemples)
    { pulaar: "yah- / jah- / njah-", french: "Aller (Alternance y/j/nj)", category: "Linguistique" },
    { pulaar: "ar- / gar- / ngar-", french: "Venir (Alternance a/g/ng)", category: "Linguistique" },
    { pulaar: "holl- / koll-", french: "Montrer (Alternance h/k)", category: "Linguistique" },
    { pulaar: "yurm- / jurm-", french: "Avoir pitié (Alternance y/j)", category: "Linguistique" },
    { pulaar: "toppit-", french: "Prendre soin de", category: "Actions" },
];

