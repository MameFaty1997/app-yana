export type MotMystereItem = {
    word: string;
    clue: string;
    fact: string;
};

export type MotMystereDB = {
    [ethnieKey: string]: {
        ethnie: string;
        img: any;
        words: MotMystereItem[];
    }
};

export const motMystereDB: MotMystereDB = {
    "wolof": {
        ethnie: "Wolof",
        img: require('../../../../assets/languages/illustration-wolof.png'),
        words: [
            { word: "TERANGA", clue: "Hospitalité sénégalaise", fact: "La Teranga est le pilier de la culture wolof, un devoir sacré d'accueil." },
            { word: "BOUBOU", clue: "Vêtement traditionnel ample", fact: "Le mbubb est la tenue de prestige portée lors des grandes cérémonies." },
            { word: "SABAR", clue: "Tambour et danse rythmée", fact: "C'est l'instrument de percussion essentiel qui rythme les baptêmes et mariages." },
            { word: "GEWEL", clue: "Griot, gardien de la mémoire", fact: "Historien et généalogiste, il est l'ambassadeur de la société traditionnelle." },
            { word: "BAOBAB", clue: "Arbre emblématique appelé Gouye", fact: "Le Gouye était autrefois utilisé comme tombeau pour les griots (gewel)." },
            { word: "THIEB", clue: "Plat national au poisson (raccourci)", fact: "Il a été inscrit au patrimoine de l'UNESCO pour sa préparation rituelle." },
            { word: "NDOGOU", clue: "Rupture du jeûne", fact: "Partager le ndogou dans la rue est une grande tradition urbaine." },
            { word: "TAMA", clue: "Petit tambour d'aisselle", fact: "Il est très connu pour sa capacité à 'parler' et rythmer le Mbalax." },
            { word: "MBALAX", clue: "Musique populaire moderne", fact: "Dérivé du rythme sabar, il est mondialisé par Youssou N'Dour." },
            { word: "DAARA", clue: "Ecole coranique traditionnelle", fact: "Le lieu historique d'éducation religieuse et de vie en communauté." },
            { word: "TOUBA", clue: "Ville sainte du mouridisme", fact: "Fondée par Cheikh Amadou Bamba, elle abrite la plus grande mosquée d'Afrique de l'Ouest." }
        ]
    },
    "peulh": {
        ethnie: "Peulh",
        img: require('../../../../assets/languages/illustration-peulh.png'),
        words: [
            { word: "PULAAKU", clue: "Code d'honneur peulh", fact: "Il repose sur la patience, la pudeur et le grand courage." },
            { word: "KORA", clue: "Instrument à cordes", fact: "Magnifique harpe-luth jouant la poésie pastorale." },
            { word: "FERLO", clue: "Vaste région semi-désertique", fact: "C'est le paradis naturel des grands transhumants peulhs." },
            { word: "KOSSAM", clue: "Lait, source de vie", fact: "Offrir du lait à un visiteur est le signe ultime d'alliance et de paix." },
            { word: "CUUDI", clue: "Lourdes boucles d'oreilles en or", fact: "Elles représentent la dote féminine et la fierté de la lignée." },
            { word: "RITI", clue: "Violon traditionnel monocorde", fact: "Il accompagne souvent la poésie des anciens bergers transhumants." },
            { word: "NOMADE", clue: "Mode de vie d'éleveur itinérant", fact: "Le berger peulh (Wodaabe ou Toucouleur) se déplace au rythme de son bétail." },
            { word: "MACINA", clue: "Ancien empire islamique", fact: "Fondé par Sékou Amadou au 19ème siècle, marquant la sédentarisation de nombreux peulhs." },
            { word: "BOUA", clue: "Bâton traditionnel de berger", fact: "Un outil simple mais vital pour guider le troupeau et se protéger dans la brousse." },
            { word: "TENGU", clue: "Chapeau de paille conique", fact: "Il protège le berger du soleil implacable du Sahel lors de ses longues marches." }
        ]
    },
    "serere": {
        ethnie: "Sérère",
        img: require('../../../../assets/languages/illustration-serere.png'),
        words: [
            { word: "ROOG", clue: "Dieu suprême de la religion sérère", fact: "Roog Sene est la divinité créatrice, vénérée à travers les Pangool." },
            { word: "PANGOOL", clue: "Esprits des ancêtres", fact: "Ils intercèdent entre Dieu et les hommes." },
            { word: "LAAMB", clue: "Lutte traditionnelle", fact: "A l'origine, elle célébrait la fin des récoltes pour désigner le champion du village." },
            { word: "NDUT", clue: "Rite initiatique des jeunes garçons", fact: "C'est le passage sacré à l'âge adulte masculin dans les bois sacrés." },
            { word: "SALTIGUE", clue: "Prêtre devin", fact: "Le Saltigué prédit l'hivernage lors de la grande cérémonie rituelle du Xoy." },
            { word: "FADIOUTH", clue: "Ile célèbre pour ses mosquées et églises", fact: "Ce village bâti sur des coquillages est un modèle sérère de coexistence pacifique." },
            { word: "SINE", clue: "Royaume historique sérère", fact: "Le Sine et le Saloum furent deux des royaumes les plus puissants du Sénégal." },
            { word: "GELOWAAR", clue: "Aristocratie matrilinéaire", fact: "Dynastie d'origine mandingue ayant régné sur les royaumes sérères institutionnalisés." },
            { word: "XOY", clue: "Cérémonie annuelle de divination", fact: "Rassemblement des grands devins pour prédire les pluies, criquets ou épidémies." },
            { word: "MBAPASS", clue: "Rythme et danse traditionnelle", fact: "Souvent exécutée par les femmes pour accompagner la lutte." },
            { word: "NGUEL", clue: "Chant d'éloge et poésie", fact: "Poésie lyrique évoquant la bravoure des anciens monarques." }
        ]
    },
    "diola": {
        ethnie: "Diola",
        img: require('../../../../assets/languages/illustration-diola.png'),
        words: [
            { word: "KANKOURANG", clue: "Masque initiatique forestier", fact: "Garant de l'ordre social, il sort lors de l'initiation des jeunes." },
            { word: "RIZ", clue: "Céréale sacrée casamançaise", fact: "La riziculture rythme tout le calendrier et la spiritualité Diola." },
            { word: "AWANA", clue: "Roi traditionnel d'Oussouye", fact: "Il est le guide spirituel qui assure la paix et les bonnes récoltes." },
            { word: "BUGARABU", clue: "Ensemble de tambours", fact: "Un seul batteur agile maîtrise ses tambours pour une danse effrénée." },
            { word: "ALINE", clue: "Prêtresse et résistante (Aline Sitoé)", fact: "Incarnation du courage, cette reine refusa l'impérialisme des années 40." },
            { word: "BOUKOUT", clue: "Fête d'initiation massive", fact: "Se tenant tous les 20 à 30 ans par village, c'est l'événement social majeur." },
            { word: "KADIANDOU", clue: "Outil traditionnel de labour", fact: "Une longue pelle en bois unique utilisée pour préparer les rizières inondées." },
            { word: "KUMPO", clue: "Masque de paille dansant", fact: "Il tournoie mystiquement et participe à la résolution des conflits villageois." },
            { word: "EMIT", clue: "Nom du ciel et du créateur", fact: "Emitai désigne Dieu qui donne ou retient la pluie indispensable au riz." },
            { word: "BOULOOF", clue: "Vin de palme (dialecte)", fact: "Très consommé lors des réunions, il est recueilli aux sommets des palmiers." }
        ]
    },
    "mandinka": {
        ethnie: "Mandinka",
        img: require('../../../../assets/languages/illustration-mandinka.png'),
        words: [
            { word: "KORA", clue: "Instrument à 21 cordes", fact: "La Kora est le joyau musical des griots mandingues, faite d'une calebasse et de peau de vache." },
            { word: "DJELI", clue: "Griot, historien et conteur", fact: "Le Djeli est le gardien de la constitution orale et de la mémoire de l'Empire du Mali." },
            { word: "SOUNDIATA", clue: "L'enfant lion, fondateur mythique", fact: "L'empereur boiteux qui forgea une constitution pionnière : la charte du Mandé." },
            { word: "JAMBADON", clue: "Grosse danse des initiés", fact: "C'est 'la danse des feuilles' qui accueille triomphalement les sortants du bois sacré." },
            { word: "BALAFON", clue: "Xylophone de bois et calebasses", fact: "Le Sosso-Bala, balafon originel, serait conservé jalousement depuis le 13ème siècle." },
            { word: "KANKAN", clue: "Ancienne ville carrefour", fact: "Elle fut un immense centre de commerce et de savoir de l'empire mandingue." },
            { word: "MANDEN", clue: "Le berceau historique", fact: "La vaste région géographique d'où tous les peuples Mandé tirent leurs origines communes." },
            { word: "BOGOLAN", clue: "Tissu teint à la boue", fact: "Motifs géométriques protecteurs autrefois portés par les chasseurs." },
            { word: "NGONI", clue: "Ancien luth à cordes pincées", fact: "Bien plus ancien que la kora, il rythme les contes des chasseurs Donso." },
            { word: "MANSA", clue: "Titre de l'empereur (Mansa Moussa)", fact: "Le plus célèbre, Mansa Moussa, fut l'homme le plus riche de l'histoire lors de son pèlerinage." }
        ]
    },
    "soninke": {
        ethnie: "Soninké",
        img: require('../../../../assets/languages/illustration-soninke.png'),
        words: [
            { word: "WAGADU", clue: "Nom mythique de l'empire du Ghana", fact: "Les Soninkés sont les fondateurs du Wagadou, l'une des plus anciennes civilisations d'Afrique de l'Ouest." },
            { word: "BIDA", clue: "Serpent sacré de la légende", fact: "Le serpent Bida est au cœur du mythe fondateur expliquant la prospérité et la chute du Wagadou." },
            { word: "KHASSONKE", clue: "Peuple fortement apparenté", fact: "Une ethnie issue du riche métissage entre Peulhs et Soninkés dans le haut bassin du fleuve." },
            { word: "TOUNKA", clue: "Titre du roi soninké", fact: "Le Tounka ou Kaya Maghan dominait un empire vaste dont le pouvoir reposait sur l'or et le sel." },
            { word: "COMMERCE", clue: "Talent et domaine d'excellence", fact: "Les diasporas soninkés forment un réseau marchand mondial et solidaire très puissant." },
            { word: "DIAWANANDO", clue: "Caste marchande puissante", fact: "Hommes de confiance et diplomates qui orchestraient le grand commerce caravanier." },
            { word: "OR", clue: "Le métal de leur puissance", fact: "L'Empire du Ghana contrôlait les routes de ce métal précieux très demandé en Méditerranée." },
            { word: "AWOUDH", clue: "Les contes fondateurs", fact: "Leurs mythes oraux racontent des villes brillantes englouties par la colère des djinns." },
            { word: "DOUROU", clue: "Grande tunique brodée", fact: "Les hommes respectables portent ce vêtement qui atteste de leur statut lors de la prière." },
            { word: "GUMBU", clue: "Ancienne capitale florissante", fact: "Cité mythique reconnue pour ses savants et marchands fortunés avant la colonisation." }
        ]
    },
    "balante": {
        ethnie: "Balante",
        img: require('../../../../assets/languages/illustration-balante.png'),
        words: [
            { word: "FANADO", clue: "Rite de passage en forêt sacrée", fact: "Le Fanado enseigne la discipline, la résistance et l'art du combat aux futurs guerriers." },
            { word: "AGOTY", clue: "Danse de courage traditionnelle", fact: "Les Balantes célèbrent la force et l'endurance à travers des danses rituelles après les récoltes." },
            { word: "CONSEIL", clue: "Le pouvoir appartient à l'âge", fact: "La société Balante était foncièrement égalitariste, sans roi unique, gérée par les anciens." },
            { word: "KUS", clue: "Nom du créateur", fact: "Souverain céleste très distant, ils le prient à travers les esprits des buissons." },
            { word: "MANSAH", clue: "Unité du hameau familial", fact: "Regroupe toute une grande concession (familles, bétail, autels)." },
            { word: "CORNE", clue: "Instrument musical", fact: "Corne de vache taillée dans laquelle ils soufflent violemment durant les rites guerriers." },
            { word: "CAJOU", clue: "Noix dont ils tirent un vin (Balante Bissau)", fact: "Les balantes de Guinée utilisent cette pomme fermentée pour leurs cérémonies majeures." },
            { word: "CASUMAC", clue: "Terre de rizières salées (Casamance)", fact: "La topographie complexe exige un savoir technique pointu pour cultiver des digues en vasis." },
            { word: "LANCE", clue: "Arme de combat mythique", fact: "Utilisée autrefois lors des rezzous, elle symbolise désormais le passage initiatique masculin." },
            { word: "BOEUF", clue: "Unité suprême de valeur", fact: "Un chef de famille prouve sa réussite en exposant une grande quantité de bovidés attachés." }
        ]
    },
    "manjack": {
        ethnie: "Manjack",
        img: require('../../../../assets/languages/illustration-manjack.png'),
        words: [
            { word: "PAGNE", clue: "Tissage complexe et précieux", fact: "Le pagne tissé Manjack est un symbole de prestige utilisé lors des grands rituels familiaux." },
            { word: "BLETT", clue: "Nom traditionnel des étoffes", fact: "Les motifs complexes des blétt racontent souvent des histoires de lignées et de bravoure." },
            { word: "BOUNOUK", clue: "Vin de palme utilisé pour sceller", fact: "Ces libations alcoolisées servies à terre nourrissent le contact avec les divinités." },
            { word: "UCAIE", clue: "Nom de l'autel familial", fact: "Installé autour de grands arbres de cour, c'est là que l'on communie avec l'ancêtre fondateur." },
            { word: "PEC", clue: "Place sacrée du village", fact: "C'est la place centrale sous le fromager où se réunissent les anciens pour juger les litiges." },
            { word: "LUNDI", clue: "Le tissage complexe", fact: "Le métier à tisser fait appel à plusieurs pédales et parfois deux artisans couplés." },
            { word: "BAPEK", clue: "Dieu suprême abstrait", fact: "Divinité lointaine, on s'adresse plutôt aux esprits intermédiaires appelés 'Ucaie'." },
            { word: "KATYEB", clue: "Sorcellerie redoutée", fact: "La crainte des jeteurs de sorts structure beaucoup d'interdits familiaux et nocturnes." },
            { word: "NGUIND", clue: "Ancien roi ou grand prêtre", fact: "Plus qu'un roi, il était un pontifes de rituels qui détenait les pouvoirs de fertilité." },
            { word: "COTON", clue: "Matière première historique", fact: "Cultivé puis filé par les femmes, avant d'être magistralement monté sur le métier de l'homme." }
        ]
    },
    "mankagne": {
        ethnie: "Mankagne",
        img: require('../../../../assets/languages/illustration-mankagne.png'),
        words: [
            { word: "BOMBOLONG", clue: "Tambour à fente messager", fact: "Le bombolong servait à envoyer des messages codés entre les villages en période de conflit." },
            { word: "UKARA", clue: "Spiritualité Mankagne", fact: "La culture Mankagne valorise une solidarité inébranlable et un respect profond de la terre." },
            { word: "FORGERON", clue: "Détenteur des secrets du feu", fact: "Le maître qui fond l'arme est redouté, respecté et doué d'une profonde magie de protection." },
            { word: "DIAME", clue: "Terme de solidarité", fact: "Désigne la notion d'entraide indispensable dans leurs communautés restreintes." },
            { word: "BRASSAGE", clue: "Lien culturel étroit", fact: "Très liés linguistiquement et géographiquement aux Manjacks, avec qui ils cousinent." },
            { word: "FOUROU", clue: "Rites de récoltes", fact: "Grandes fêtes saisonnières marquant les étapes de nettoyage ou de rassemblement agricole." },
            { word: "MARIAGE", clue: "Alliance stratégique", fact: "Se décide par d'importants transferts de textiles et de bestiaux inter-descendances." },
            { word: "KOLA", clue: "Noix partagée aux cérémonies", fact: "Aucun pacte ni mariage n'est prononcé sans rompre amèrement ce fruit énergétique." },
            { word: "NANA", clue: "Génie aquatique local", fact: "Souvent honoré aux abords du fleuve Casamance pour garantir l'absence d'inondations ravageuses." },
            { word: "SANGHA", clue: "Lutte rituelle (selon les clans)", fact: "Comme beaucoup de diolas voisins, ils ont aussi des joutes corporelles pour les vaillants." }
        ]
    },
    "bassari": {
        ethnie: "Bassari",
        img: require('../../../../assets/languages/illustration-bassari.png'),
        words: [
            { word: "KEDOUGOU", clue: "Région montagneuse du sud-est", fact: "Le Pays Bassari est classé au patrimoine de l'UNESCO pour ses paysages et ses rites vivants." },
            { word: "ENDJA", clue: "Classe d'âge des jeunes initiés", fact: "L'initiation Bassari transforme les garçons en hommes à travers des épreuves physiques et morales." },
            { word: "ORPAILLAGE", clue: "Activité millénaire du sous-sol", fact: "L'or de la zone orientale forgea depuis longtemps l'art et le commerce local de la région Bassari." },
            { word: "LUTTE", clue: "Sport et initiation", fact: "Lors des rites printaniers, les jeunes hommes se défient pour plaire aux jeunes filles (koré)." },
            { word: "MASQUES", clue: "Créatures foliacées", fact: "Ils portent des coiffes effrayantes de feuilles et bambou pour incarner les génies Loko." },
            { word: "BOUK", clue: "Chef du village sacré", fact: "Il coordonne l'avancement des tranches d'âge et ouvre publiquement la saison des chasses." },
            { word: "KORE", clue: "Adolescentes Bassaris", fact: "Elles préparent des parures colorées et chantent l'encouragement pour les garçons de l'Endja." },
            { word: "ETHIOLO", clue: "Village iconique", fact: "C'est l'un des lieux névralgiques du tourisme et du maintien strict des traditions." },
            { word: "DIALEN", clue: "Autel collectif", fact: "Le bois central où toute classe qui passe une nouvelle étape vient prêter allégeance religieuse." },
            { word: "BIERE", clue: "Breuvage de mil trouble", fact: "L'alcool de mil est fabriqué en énorme quantité durant la sécheresse pour les cérémonies de mai." }
        ]
    },
    "bambara": {
        ethnie: "Bambara",
        img: require('../../../../assets/languages/illustration-wolof.png'), // Fallback
        words: [
            { word: "CHIWARA", clue: "Masque antilope de l'agriculture", fact: "Le Chiwara représente l'être mythique qui a enseigné aux hommes l'art de cultiver la terre." },
            { word: "KOTEBA", clue: "Théâtre traditionnel satirique", fact: "Le Koteba utilise l'humour pour éduquer la société et corriger les comportements." },
            { word: "BAMANAN", clue: "Ceux qui refusent (étymologie)", fact: "Le nom même Bambara marque un refus historique de se fondre dans l'islamisme centralisé." },
            { word: "KOMA", clue: "Société secrète", fact: "Institution mystique qui maintenait l'ordre social par la peur et la magie protectrice des fétiches." },
            { word: "BOLI", clue: "Grand fétiche recouvert de sang", fact: "Les autels Boli étaient pétris de matières sacrificielles agglutinées pour détenir un immense pouvoir." },
            { word: "NTOMO", clue: "Masque à cornes multiples", fact: "Porté par les jeunes garçons non circoncis, il représentait la pureté silencieuse de l'enfance." },
            { word: "SEGU", clue: "Ancien empire florissant", fact: "Le Royaume de Ségou fut le pic de puissance militaire des Bambaras aux 18ème et 19ème siècles." },
            { word: "BITON", clue: "Le souverain fondateur (Biton Coulibaly)", fact: "Il fédéra les chasseurs et paysans pour former la formidable armée professionnelle (Les Tondjons)." },
            { word: "DONSO", clue: "Confrérie des chasseurs", fact: "Chasseurs magiciens qui connaissent tous les remèdes végétaux et parlent avec les génies sylvestres." },
            { word: "KOUNDOU", clue: "Guitare ou Luth des chasseurs", fact: "Lustrée de charmes, elle sonne grave et accompagne les longs mythes des héros de brousse." }
        ]
    },
    "bainouk": {
        ethnie: "Baïnouk",
        img: require('../../../../assets/languages/illustration-bainouk.png'), // Fallback
        words: [
            { word: "MAMPATING", clue: "Ancien grand royaume Baïnouk", fact: "Les Baïnouks sont parmi les plus anciens habitants du Sénégal, autrefois maîtres de vastes forêts." },
            { word: "BICHER", clue: "Ancien titre de noblesse royale", fact: "La royauté Baïnouk était régie par des codes stricts visant à protéger la communauté." },
            { word: "ASSIMILATION", clue: "Fonte dans les autres ethnies", fact: "L'ancienne puissante population s'est fortement diluée dans la démographie Diola et Mandingue." },
            { word: "AUTOCHTONE", clue: "Les tout premiers habitants connus", fact: "On les considère généralement comme le plus ancien substrat humain au Sud des fleuves sénégalais." },
            { word: "FORET", clue: "Leur repaire mystique", fact: "Excellents connaisseurs de la flore locale, ils érigeaient des bosquets tabous encore craints aujourd'hui." },
            { word: "CASSANG", clue: "Nom du roi", fact: "D'après les récits rituels oraux, un très grand roi baïnouk aurait fondé la capitale originelle." },
            { word: "ANIMISTE", clue: "Religion viscérale à la terre", fact: "Toute offense au sol (brûlis excessifs, meurtres) devait être expiée selon un grand sacrifice." },
            { word: "SONGHAI", clue: "Mythes d'influences commerciales", fact: "Bien que lointains, ils auraient été poussés vers la côte par de grands mouvements guerriers de l'Est." },
            { word: "PAGNE", clue: "Tisserands exceptionnels de la liane", fact: "Avant le coton mandingue, l'art textile à partir du palmier et des joncs était très avancé." },
            { word: "DISPARITION", clue: "Langue sévèrement menacée", fact: "Aujourd'hui, à peine quelques villages restreints parlent couramment la langue mère (le gujaaxer)." }
        ]
    }
};

export const useMotMystereData = () => {
    return motMystereDB;
};
