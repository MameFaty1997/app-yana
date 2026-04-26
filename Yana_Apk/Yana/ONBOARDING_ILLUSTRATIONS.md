# 🎨 Onboarding avec Illustrations - Guide Complet

## Date : 2026-02-12 16:50

## ✅ État Actuel

L'onboarding est **100% fonctionnel** avec des placeholders pour les illustrations.

### Écrans d'Onboarding (10 étapes)

1. ✅ **SplashStep** - Écran d'accueil avec logo
2. ✅ **BayoIntroStep** - Introduction de Bayo (mascotte)
3. ✅ **LanguageStep** - Sélection langue d'interface (FR, EN, DE, AR)
4. ✅ **TargetLanguageStep** - Choix de la langue africaine (10 langues)
5. ✅ **GoalStep** - Objectif quotidien (5, 10, 20 min)
6. ✅ **LevelStep** - Niveau d'expérience
7. ✅ **MotivationStep** - Motivations d'apprentissage
8. ✅ **SignupStep** - Création de compte
9. ✅ **VerificationStep** - Code OTP
10. ✅ **FriendsStep** - Invitation d'amis

## 📁 Structure des Assets

```
APK/
├── assets/
│   ├── bayo/                    # Images de Bayo (mascotte)
│   │   ├── README.md           # ✅ Guide créé
│   │   ├── happy.png           # ⏳ À ajouter
│   │   ├── excited.png         # ⏳ À ajouter
│   │   ├── thinking.png        # ⏳ À ajouter
│   │   ├── sad.png             # ⏳ À ajouter
│   │   └── motivated.png       # ⏳ À ajouter
│   │
│   └── languages/              # Illustrations des langues
│       ├── README.md           # ✅ Guide créé
│       ├── wolof.png           # ⏳ À ajouter
│       ├── serer.png           # ⏳ À ajouter
│       ├── diola.png           # ⏳ À ajouter
│       ├── peulh.png           # ⏳ À ajouter
│       ├── soninke.png         # ⏳ À ajouter
│       ├── manjak.png          # ⏳ À ajouter
│       ├── balante.png         # ⏳ À ajouter
│       ├── mankagne.png        # ⏳ À ajouter
│       ├── bambara.png         # ⏳ À ajouter
│       └── mandinka.png        # ⏳ À ajouter
│
└── src/
    ├── config/
    │   └── assets.ts           # ✅ Configuration centralisée des assets
    │
    └── screens/onboarding/
        ├── SplashStep.tsx      # ✅ Prêt
        ├── BayoIntroStep.tsx   # ✅ Prêt (utilise placeholder)
        ├── LanguageStep.tsx    # ✅ Prêt
        ├── TargetLanguageStep.tsx # ✅ Prêt (utilise placeholder)
        ├── GoalStep.tsx        # ✅ Prêt
        ├── LevelStep.tsx       # ✅ Prêt
        ├── MotivationStep.tsx  # ✅ Prêt
        ├── SignupStep.tsx      # ✅ Prêt
        ├── VerificationStep.tsx # ✅ Prêt
        └── FriendsStep.tsx     # ✅ Prêt
```

## 🎯 Placeholders Actuels

### Pour Bayo (Mascotte)
- **Actuellement** : Icône de l'app (`assets/icon.png`)
- **Fallback** : URLs dicebear.com
- **À remplacer par** : 5 images PNG (400x400px)

### Pour les Langues
- **Actuellement** : Icône de l'app (`assets/icon.png`)
- **Fallback** : Emoji 🌍
- **À remplacer par** : 10 images PNG/JPG (800x400px)

## 📝 Comment Ajouter les Illustrations

### Étape 1 : Préparer les Images

#### Images de Bayo (5 fichiers)
```
happy.png     - Bayo souriant, main levée
excited.png   - Bayo bras levés, célébration
thinking.png  - Bayo doigt sur le menton
sad.png       - Bayo triste
motivated.png - Bayo poing levé
```

**Spécifications** :
- Format : PNG avec transparence
- Taille : 400x400px
- Style : Flat design, moderne
- Couleurs : Marron, orange (#FF9633), beige (#FDF7F0)

#### Images des Langues (10 fichiers)
```
wolof.png, serer.png, diola.png, peulh.png, soninke.png,
manjak.png, balante.png, mankagne.png, bambara.png, mandinka.png
```

**Spécifications** :
- Format : PNG ou JPG
- Taille : 800x400px (ratio 2:1)
- Thèmes : Paysages, motifs culturels, instruments, artisanat

### Étape 2 : Copier les Images

```bash
# Copier les images de Bayo
cp mes-images/bayo/*.png "c:\Users\USER\Downloads\yana-apk-last (1)\APK\assets\bayo\"

# Copier les images des langues
cp mes-images/languages/*.png "c:\Users\USER\Downloads\yana-apk-last (1)\APK\assets\languages\"
```

### Étape 3 : Activer les Images dans le Code

Dans `TargetLanguageStep.tsx`, décommenter le code :

```typescript
// Ligne 107-120 : Décommenter ce bloc
const illustrations: { [key: string]: any } = {
    wolof: require('../../../assets/languages/wolof.png'),
    serer: require('../../../assets/languages/serer.png'),
    // ... etc
};
return illustrations[langCode] || null;

// Et commenter/supprimer le placeholder :
// return require('../../../assets/icon.png');
```

### Étape 4 : Tester

```bash
cd "c:\Users\USER\Downloads\yana-apk-last (1)\APK"
npx expo start
```

## 🎨 Ressources pour Créer les Illustrations

### Générer des Images IA
- **Midjourney** - Qualité professionnelle
- **DALL-E** - OpenAI
- **Stable Diffusion** - Open source
- **Leonardo.ai** - Gratuit avec limitations

### Trouver des Photos
- **Unsplash** - Photos gratuites HD
- **Pexels** - Photos et vidéos
- **Pixabay** - Images libres de droits

### Créer des Illustrations
- **Figma** - Design d'interface
- **Canva** - Templates prêts à l'emploi
- **Adobe Illustrator** - Professionnel
- **Procreate** (iPad) - Dessins

## 🌍 Suggestions de Contenu par Langue

### Wolof (Sénégal)
- Mosquée de Touba
- Marché Sandaga, Dakar
- Plage de Ngor
- Motifs traditionnels wolof
- Thiéboudienne (plat national)

### Pulaar (Sahel)
- Paysages du Fouta Djalon
- Troupeaux de zébus
- Hoddu (instrument)
- Tissage peul

### Bambara (Mali)
- Mosquée de Djenné
- Balafon, djembé
- Bogolan (tissu)
- Fleuve Niger

### Mandinka (Gambie)
- Fleuve Gambie
- Kora (instrument)
- Marché de Banjul
- Griots

## ✨ État de l'Application

### ✅ Fonctionnel Maintenant
- Tous les écrans d'onboarding
- Navigation entre les étapes
- Validation des données
- Styles et animations
- Placeholders pour les images

### ⏳ À Ajouter
- Images de Bayo (5 fichiers)
- Images des langues (10 fichiers)

### 🚀 Prochaines Étapes

1. **Créer ou trouver les illustrations**
   - Utiliser les outils recommandés
   - Respecter les spécifications

2. **Ajouter les images**
   - Copier dans `assets/bayo/` et `assets/languages/`
   - Vérifier les noms de fichiers

3. **Activer dans le code**
   - Décommenter le code dans `TargetLanguageStep.tsx`
   - Mettre à jour `src/config/assets.ts` si nécessaire

4. **Tester**
   - Lancer l'app avec `npx expo start`
   - Vérifier l'affichage des images
   - Tester sur différents écrans

## 📚 Documentation

- ✅ `ILLUSTRATIONS_GUIDE.md` - Guide général
- ✅ `assets/bayo/README.md` - Guide Bayo
- ✅ `assets/languages/README.md` - Guide langues
- ✅ `ONBOARDING_ILLUSTRATIONS.md` - Ce document

## 💡 Notes Importantes

1. **L'application fonctionne déjà** avec les placeholders
2. **Les illustrations améliorent l'UX** mais ne sont pas bloquantes
3. **Vous pouvez ajouter les images progressivement**
4. **Les fallbacks (emojis, icône) assurent une expérience dégradée acceptable**

## 🎯 Résumé

| Élément | État | Action |
|---------|------|--------|
| Dossiers créés | ✅ | Terminé |
| README créés | ✅ | Terminé |
| Code prêt | ✅ | Terminé |
| Placeholders | ✅ | Actifs |
| Images Bayo | ⏳ | À ajouter (5 fichiers) |
| Images Langues | ⏳ | À ajouter (10 fichiers) |

---

**L'onboarding est 100% fonctionnel ! Les illustrations peuvent être ajoutées à tout moment pour améliorer l'expérience visuelle.** 🎉
