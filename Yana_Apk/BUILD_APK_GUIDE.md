# Guide de Génération APK - Yana Mobile 📱

Ce guide vous explique comment générer un fichier APK pour installer l'application sur Android.

## Méthode 1 : EAS Build (Recommandé) ⭐

### Prérequis
- Compte Expo (gratuit)
- EAS CLI installé

### Étapes

1. **Installer EAS CLI** (si pas déjà fait)
   ```bash
   npm install -g eas-cli
   ```

2. **Se connecter à Expo**
   ```bash
   eas login
   ```
   Entrez vos identifiants Expo (créez un compte sur expo.dev si nécessaire)

3. **Configurer le projet**
   ```bash
   eas build:configure
   ```
   Sélectionnez "Android" quand demandé

4. **Générer l'APK**
   ```bash
   npm run build:apk
   ```
   OU
   ```bash
   eas build --platform android --profile preview
   ```

5. **Télécharger l'APK**
   - Le build prend environ 10-15 minutes
   - Vous recevrez un lien par email
   - Ou visitez https://expo.dev/accounts/[votre-username]/projects/yana-mobile/builds
   - Téléchargez l'APK et installez-le sur votre téléphone Android

## Méthode 2 : Build Local (Avancé)

### Prérequis
- Android Studio installé
- JDK 17+
- Android SDK configuré

### Étapes

1. **Installer les dépendances**
   ```bash
   npm install
   ```

2. **Générer le build local**
   ```bash
   eas build --platform android --profile preview --local
   ```

3. **Récupérer l'APK**
   L'APK sera dans le dossier du projet après le build

## Méthode 3 : Expo Go (Test Rapide)

Pour tester rapidement sans générer d'APK :

1. **Installer Expo Go** sur votre téléphone Android
   - Téléchargez depuis le Play Store

2. **Lancer le serveur de développement**
   ```bash
   npm start
   ```

3. **Scanner le QR code** avec Expo Go

## Configuration Importante ⚙️

### Clé API Gemini
Avant de générer l'APK, assurez-vous d'avoir configuré votre clé API dans `.env` :

```env
EXPO_PUBLIC_GEMINI_API_KEY=votre_cle_api_ici
```

### Modifier l'icône et le splash screen

1. **Icône** : Remplacez `assets/icon.png` (1024x1024px)
2. **Splash** : Remplacez `assets/splash.png` (1284x2778px)
3. **Adaptive Icon** : Remplacez `assets/adaptive-icon.png` (1024x1024px)

## Dépannage 🔧

### "Erreur de build"
- Vérifiez que votre compte Expo est actif
- Assurez-vous que `app.json` est correctement configuré
- Essayez de nettoyer le cache : `npx expo start --clear`

### "APK trop volumineux"
- Activez ProGuard dans `app.json`
- Utilisez `app-bundle` au lieu de `apk` pour le Play Store

### "L'application crash au démarrage"
- Vérifiez que la clé API Gemini est correcte
- Testez d'abord avec Expo Go pour identifier les erreurs

## Distribution 📤

### Pour les testeurs
1. Partagez directement le fichier APK
2. Les utilisateurs doivent autoriser l'installation depuis des sources inconnues

### Pour le Play Store
1. Utilisez le profil `production` :
   ```bash
   eas build --platform android --profile production
   ```
2. Cela génère un AAB (Android App Bundle)
3. Uploadez sur Google Play Console

## Commandes Utiles 💡

```bash
# Voir tous les builds
eas build:list

# Annuler un build en cours
eas build:cancel

# Voir les logs d'un build
eas build:view [build-id]

# Mettre à jour les credentials
eas credentials

# Tester en mode production local
npx expo start --no-dev --minify
```

## Checklist avant Build ✅

- [ ] Clé API Gemini configurée dans `.env`
- [ ] Version mise à jour dans `app.json`
- [ ] Icônes et splash screen personnalisés
- [ ] Tests effectués avec Expo Go
- [ ] Compte Expo configuré
- [ ] EAS CLI installé

## Support 🆘

En cas de problème :
1. Consultez la documentation Expo : https://docs.expo.dev/build/setup/
2. Vérifiez les logs du build
3. Testez d'abord avec Expo Go

---

**Bonne chance avec votre build ! 🚀**
