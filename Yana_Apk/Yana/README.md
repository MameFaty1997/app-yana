# 🦫 Yana - Application Mobile d'Apprentissage des Langues Africaines

## 📱 À Propos

**Yana** est une application mobile innovante dédiée à l'apprentissage des langues africaines. Développée avec React Native et Expo, elle offre une expérience d'apprentissage immersive et culturellement riche.

### 🌍 Langues Supportées (10 langues)

1. **Wolof** (Sénégal) - 5M+ locuteurs
2. **Serer** (Sénégal) - 1.5M+ locuteurs
3. **Diola** (Casamance) - 500K+ locuteurs
4. **Pulaar** (Sahel) - 25M+ locuteurs
5. **Soninké** (Mali, Sénégal) - 2M+ locuteurs
6. **Manjak** (Guinée-Bissau) - 300K+ locuteurs
7. **Balante** (Guinée-Bissau) - 500K+ locuteurs
8. **Mankagne** (Guinée-Bissau, Sénégal) - 100K+ locuteurs
9. **Bambara** (Mali) - 14M+ locuteurs
10. **Mandinka** (Gambie) - 2M+ locuteurs

## ✨ Fonctionnalités

### Onboarding Complet (10 étapes)
- ✅ Écran d'accueil avec logo
- ✅ Introduction de Bayo (mascotte castor)
- ✅ Sélection de la langue d'interface (FR, EN, DE, AR)
- ✅ Choix de la langue africaine à apprendre
- ✅ Définition de l'objectif quotidien (5, 10, 20 min)
- ✅ Sélection du niveau d'expérience
- ✅ Choix des motivations d'apprentissage
- ✅ Création de compte
- ✅ Vérification OTP
- ✅ Invitation d'amis

### Système de Design
- ✅ 8 composants UI réutilisables
- ✅ Theme cohérent (couleurs, typographie, espacements)
- ✅ Animations et transitions fluides
- ✅ Design moderne et attrayant

## 🚀 Démarrage Rapide

### Prérequis
- Node.js (v16 ou supérieur)
- npm ou yarn
- Expo CLI
- Expo Go (sur votre téléphone) ou un émulateur

### Installation

```bash
# 1. Installer les dépendances
npm install

# 2. Configurer la clé API Gemini
# Créer un fichier .env à la racine avec :
# EXPO_PUBLIC_GEMINI_API_KEY=votre_clé_api_ici

# 3. Lancer l'application
npx expo start
```

### Scanner le QR Code
- **Android** : Utilisez l'app Expo Go
- **iOS** : Utilisez l'app Camera

## 📁 Structure du Projet

```
Yana_Apk/
├── src/
│   ├── components/          # Composants réutilisables
│   │   └── ui/             # Composants UI (Button, Card, Input, etc.)
│   ├── screens/            # Écrans de l'application
│   │   └── onboarding/     # 10 écrans d'onboarding
│   ├── services/           # Services (API Gemini, etc.)
│   ├── config/             # Configuration (assets, etc.)
│   ├── theme.ts            # Système de design
│   ├── types.ts            # Types TypeScript
│   ├── constants.ts        # Constantes
│   └── translations.ts     # Traductions
│
├── assets/                 # Images et ressources
│   ├── bayo/              # Images de la mascotte
│   └── languages/         # Illustrations des langues
│
├── App.tsx                # Point d'entrée de l'app
├── package.json           # Dépendances
└── tsconfig.json          # Configuration TypeScript
```

## 🎨 Composants UI

### Disponibles
- **Avatar** - Avatars avec badges
- **Badge** - Badges colorés avec variantes
- **Bayo** - Mascotte avec 5 émotions
- **Button** - Boutons avec variantes et tailles
- **Card** - Cartes avec 3 variantes
- **Input** - Champs de saisie avec validation
- **ProgressBar** - Barres de progression

## 🔧 Technologies Utilisées

- **React Native** - Framework mobile
- **Expo** - Plateforme de développement
- **TypeScript** - Typage statique
- **Google Gemini AI** - Génération de contenu
- **React Navigation** - Navigation

## 📝 Scripts Disponibles

```bash
# Démarrer le serveur de développement
npm start
# ou
npx expo start

# Lancer sur Android
npm run android

# Lancer sur iOS
npm run ios

# Lancer sur le web
npm run web

# Vérifier les types TypeScript
npx tsc --noEmit
```

## 🎯 État du Projet

### ✅ Terminé
- Migration complète de tous les fichiers
- 10 écrans d'onboarding fonctionnels
- 8 composants UI
- Système de design complet
- 0 erreur TypeScript
- Documentation complète

### ⏳ À Ajouter
- Images de Bayo (5 émotions)
- Illustrations des langues (10 langues)
- Connexion backend
- Tests unitaires

## 📚 Documentation

- `ONBOARDING_READY.md` - Guide de l'onboarding
- `ILLUSTRATIONS_GUIDE.md` - Guide des illustrations
- `MIGRATION_COMPLETE.md` - Détails de la migration
- `API_KEY_SETUP.md` - Configuration de l'API
- `BUILD_APK_GUIDE.md` - Guide de build APK

## 🐛 Dépannage

Consultez `TROUBLESHOOTING.md` pour les problèmes courants.

## 📄 Licence

Tous droits réservés - Gümba Yana

## 👥 Équipe

Développé avec ❤️ pour préserver et promouvoir les langues africaines.

---

**Version** : 1.0.0  
**Dernière mise à jour** : 2026-02-12  
**Statut** : ✅ Prêt pour le développement
