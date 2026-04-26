# 📋 Commandes Utiles - Yana Mobile

## 🚀 Développement

### Démarrer le serveur de développement
```bash
npm start
```

### Démarrer avec cache nettoyé
```bash
npx expo start --clear
```

### Lancer sur Android
```bash
npm run android
```

### Lancer sur iOS (Mac uniquement)
```bash
npm run ios
```

### Lancer sur Web
```bash
npm run web
```

## 📦 Build & Distribution

### Installer EAS CLI
```bash
npm install -g eas-cli
```

### Se connecter à Expo
```bash
eas login
```

### Configurer EAS Build
```bash
eas build:configure
```

### Générer un APK (Android)
```bash
npm run build:apk
```
OU
```bash
eas build --platform android --profile preview
```

### Générer un AAB pour Play Store
```bash
npm run build:android
```
OU
```bash
eas build --platform android --profile production
```

### Générer pour iOS
```bash
eas build --platform ios --profile production
```

### Voir tous les builds
```bash
eas build:list
```

### Annuler un build en cours
```bash
eas build:cancel
```

## 🔧 Maintenance

### Installer les dépendances
```bash
npm install
```

### Installer avec résolution de conflits
```bash
npm install --legacy-peer-deps
```

### Mettre à jour Expo SDK
```bash
npx expo install expo@latest
```

### Réparer les dépendances Expo
```bash
npx expo install --fix
```

### Nettoyer le cache
```bash
npx expo start --clear
```

### Nettoyer node_modules
```bash
rm -rf node_modules
npm install
```

## 🧪 Tests & Debug

### Voir les logs
```bash
npx expo start
# Puis appuyez sur 'j' pour ouvrir le debugger
```

### Mode production local
```bash
npx expo start --no-dev --minify
```

### Vérifier les erreurs TypeScript
```bash
npx tsc --noEmit
```

## 📱 Gestion des Credentials

### Voir les credentials
```bash
eas credentials
```

### Configurer les credentials Android
```bash
eas credentials --platform android
```

### Configurer les credentials iOS
```bash
eas credentials --platform ios
```

## 🔄 Mise à Jour

### Mettre à jour toutes les dépendances
```bash
npx expo install --fix
```

### Mettre à jour une dépendance spécifique
```bash
npm install package-name@latest
```

### Vérifier les dépendances obsolètes
```bash
npm outdated
```

## 📊 Informations

### Voir la version d'Expo
```bash
npx expo --version
```

### Voir les informations du projet
```bash
npx expo config
```

### Voir les dépendances installées
```bash
npm list
```

## 🎨 Assets

### Optimiser les images
```bash
npx expo-optimize
```

### Générer les icônes adaptatives
Les icônes sont automatiquement générées depuis `app.json`

## 🌐 Publication

### Publier sur Expo
```bash
eas update
```

### Soumettre au Play Store
```bash
eas submit --platform android
```

### Soumettre à l'App Store
```bash
eas submit --platform ios
```

## 🔐 Environnement

### Variables d'environnement
Les variables dans `.env` sont automatiquement chargées avec le préfixe `EXPO_PUBLIC_`

Exemple :
```env
EXPO_PUBLIC_API_KEY=votre_cle
```

Utilisation :
```javascript
process.env.EXPO_PUBLIC_API_KEY
```

## 🐛 Dépannage

### Réinitialiser complètement le projet
```bash
rm -rf node_modules
rm package-lock.json
npm install --legacy-peer-deps
npx expo start --clear
```

### Problème avec Metro Bundler
```bash
npx expo start --clear --reset-cache
```

### Problème avec les permissions Android
Vérifiez `app.json` → `android.permissions`

## 📝 Scripts Personnalisés

Tous les scripts sont dans `package.json` :

```json
{
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web",
    "build:android": "eas build --platform android",
    "build:apk": "eas build --platform android --profile preview"
  }
}
```

## 🎯 Workflow Recommandé

### 1. Développement
```bash
npm start
# Tester avec Expo Go
```

### 2. Test en production locale
```bash
npx expo start --no-dev --minify
```

### 3. Générer l'APK de test
```bash
npm run build:apk
```

### 4. Publier en production
```bash
npm run build:android
eas submit --platform android
```

## 💡 Astuces

### Raccourcis dans le terminal Expo
- `a` - Ouvrir sur Android
- `i` - Ouvrir sur iOS
- `w` - Ouvrir sur Web
- `r` - Recharger l'app
- `m` - Toggle menu
- `j` - Ouvrir le debugger
- `c` - Nettoyer le cache

### Activer Fast Refresh
Fast Refresh est activé par défaut. Les modifications sont visibles instantanément.

### Voir les performances
```bash
npx expo start --dev-client
```

---

**Pour plus d'informations, consultez la [documentation Expo](https://docs.expo.dev/)**
