# Guide des Illustrations pour l'Onboarding

## 📁 Structure des Assets

```
assets/
├── bayo/                    # Images de la mascotte Bayo
│   ├── happy.png           # Bayo souriant, main levée (salut)
│   ├── excited.png         # Bayo très content, bras levés
│   ├── thinking.png        # Bayo réfléchit, doigt sur le menton
│   ├── sad.png             # Bayo triste
│   └── motivated.png       # Bayo motivé, poing levé
│
└── languages/              # Illustrations des langues africaines
    ├── wolof.png           # Illustration pour le Wolof
    ├── serer.png           # Illustration pour le Serer
    ├── diola.png           # Illustration pour le Diola
    ├── pulaar.png          # Illustration pour le Pulaar
    ├── soninke.png         # Illustration pour le Soninké
    ├── manjak.png          # Illustration pour le Manjak
    ├── balante.png         # Illustration pour le Balante
    ├── mankagne.png        # Illustration pour le Mankagne
    ├── bambara.png         # Illustration pour le Bambara
    └── mandinka.png        # Illustration pour le Mandinka
```

## 🎨 Spécifications des Images

### Images de Bayo (Mascotte)
- **Format** : PNG avec transparence
- **Taille recommandée** : 400x400px
- **Style** : Illustration moderne, flat design
- **Couleurs** : Tons chauds (marron, orange #FF9633, beige #FDF7F0)
- **Caractère** : Castor mignon et amical

#### Émotions de Bayo :
1. **happy** - Souriant, main levée en signe de salut
2. **excited** - Très content, bras levés en célébration
3. **thinking** - Réfléchit, doigt sur le menton
4. **sad** - Triste, expression déçue
5. **motivated** - Motivé, poing levé, expression déterminée

### Images des Langues
- **Format** : PNG ou JPG
- **Taille recommandée** : 800x400px (ratio 2:1)
- **Style** : Photographies ou illustrations culturelles
- **Thèmes suggérés** :
  - Paysages typiques de la région
  - Motifs traditionnels
  - Scènes de vie quotidienne
  - Instruments de musique traditionnels
  - Artisanat local

## 🔄 Alternatives Temporaires

En attendant vos propres illustrations, le code utilise :

### Pour Bayo :
- URLs d'API de génération d'avatars (dicebear.com)
- Emojis comme fallback

### Pour les Langues :
- URLs Unsplash (images temporaires)
- Emojis de drapeaux comme fallback

## 📝 Comment Ajouter vos Illustrations

### 1. Préparer les Images
- Créez ou trouvez les images selon les spécifications ci-dessus
- Nommez-les exactement comme indiqué (minuscules, sans espaces)
- Optimisez-les pour le web (compression sans perte de qualité)

### 2. Ajouter les Images
```bash
# Copier les images dans les dossiers appropriés
cp mes-images/bayo/*.png assets/bayo/
cp mes-images/languages/*.png assets/languages/
```

### 3. Vérifier l'Intégration
Les composants chargeront automatiquement les images locales si elles existent :
```typescript
// Le code vérifie d'abord les assets locaux
require('../../../assets/bayo/happy.png')
// Puis utilise les URLs de fallback si non trouvé
```

## 🎨 Outils Recommandés

### Pour Créer les Illustrations :
- **Figma** - Design d'interface et illustrations
- **Canva** - Templates et design simplifié
- **Adobe Illustrator** - Illustrations vectorielles professionnelles
- **Procreate** (iPad) - Dessins et illustrations

### Pour Générer des Avatars (Bayo) :
- **Midjourney** - Génération d'images IA
- **DALL-E** - Génération d'images IA
- **Stable Diffusion** - Génération d'images IA open source

### Pour Trouver des Photos (Langues) :
- **Unsplash** - Photos gratuites haute qualité
- **Pexels** - Photos et vidéos gratuites
- **Pixabay** - Images et vidéos libres de droits

## 🌍 Suggestions pour les Illustrations de Langues

### Wolof (Sénégal)
- Mosquée de Touba
- Marché Sandaga à Dakar
- Plage de Ngor
- Motifs traditionnels wolof

### Pulaar (Sahel)
- Paysages du Fouta Djalon
- Troupeaux de zébus
- Instruments traditionnels (hoddu)
- Tissage traditionnel

### Bambara (Mali)
- Mosquée de Djenné
- Instruments (balafon, djembé)
- Bogolan (tissu traditionnel)
- Fleuve Niger

### Mandinka (Gambie)
- Fleuve Gambie
- Kora (instrument)
- Marché de Banjul
- Tissage traditionnel

### Autres Langues
- Recherchez des éléments culturels spécifiques à chaque langue
- Privilégiez des images authentiques et respectueuses
- Évitez les clichés et stéréotypes

## 🚀 Prochaines Étapes

1. ✅ Créer les dossiers `assets/bayo/` et `assets/languages/`
2. ⏳ Ajouter les images de Bayo (5 émotions)
3. ⏳ Ajouter les illustrations des langues (10 langues)
4. ⏳ Tester l'affichage dans l'application
5. ⏳ Optimiser les images si nécessaire

## 📞 Support

Si vous avez besoin d'aide pour créer ou trouver des illustrations :
- Consultez les ressources listées ci-dessus
- Utilisez les URLs temporaires en attendant
- Les emojis servent de fallback fonctionnel

---

**Note** : Les illustrations sont importantes pour l'expérience utilisateur, mais l'application fonctionne déjà avec les fallbacks (emojis et URLs).
