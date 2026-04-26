# 🚀 Démarrage Rapide - Yana Mobile

## ✅ Installation Terminée !

Les dépendances ont été installées avec succès. Voici comment démarrer :

## 📱 Option 1 : Test avec Expo Go (RECOMMANDÉ pour débuter)

### Étape 1 : Installer Expo Go sur votre téléphone
- **Android** : [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
- **iOS** : [App Store](https://apps.apple.com/app/expo-go/id982107779)

### Étape 2 : Configurer la clé API Gemini
Éditez le fichier `.env` et ajoutez votre clé API :
```env
EXPO_PUBLIC_GEMINI_API_KEY=votre_cle_api_gemini
```

Obtenez une clé gratuite sur : https://makersuite.google.com/app/apikey

### Étape 3 : Lancer l'application
```bash
npm start
```

### Étape 4 : Scanner le QR code
- Ouvrez Expo Go sur votre téléphone
- Scannez le QR code affiché dans le terminal
- L'application se chargera automatiquement !

## 🔧 Option 2 : Émulateur Android

Si vous avez Android Studio installé :

```bash
npm run android
```

## 📦 Option 3 : Générer un APK

Pour installer l'application directement sur Android sans Expo Go :

### Étape 1 : Installer EAS CLI
```bash
npm install -g eas-cli
```

### Étape 2 : Se connecter à Expo
```bash
eas login
```
Créez un compte gratuit sur https://expo.dev si nécessaire

### Étape 3 : Configurer le projet
```bash
eas build:configure
```

### Étape 4 : Générer l'APK
```bash
npm run build:apk
```

Le build prend environ 10-15 minutes. Vous recevrez un lien pour télécharger l'APK.

## 🎯 Que faire ensuite ?

1. **Testez l'onboarding** - Créez votre profil
2. **Choisissez une langue** - Wolof, Bambara, Pulaar...
3. **Commencez une leçon** - L'IA générera des exercices
4. **Explorez les fonctionnalités** - Profil, stats, progression

## ⚙️ Configuration Avancée

### Modifier l'icône de l'app
Remplacez `assets/icon.png` par votre icône (1024x1024px)

### Modifier le splash screen
Remplacez `assets/splash.png` par votre image (1284x2778px)

### Changer le nom de l'app
Éditez `app.json` :
```json
{
  "expo": {
    "name": "Votre Nom d'App",
    "slug": "votre-slug"
  }
}
```

## 🐛 Problèmes Courants

### "Cannot connect to Metro"
```bash
npx expo start --clear
```

### "Module not found"
```bash
npm install --legacy-peer-deps
```

### "API Key error"
Vérifiez que votre clé Gemini est correctement configurée dans `.env`

## 📚 Documentation

- **README.md** - Documentation complète
- **BUILD_APK_GUIDE.md** - Guide détaillé pour générer l'APK
- **CONVERSION_SUMMARY.md** - Résumé de la conversion

## 🎉 Félicitations !

Votre application mobile Yana est prête à être testée !

Pour toute question, consultez la documentation Expo : https://docs.expo.dev/

---

**Bon apprentissage des langues africaines ! 🌍**
