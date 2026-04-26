# 🔧 SOLUTION À L'ERREUR "PlatformConstants could not be found"

## ❌ Erreur Rencontrée

```
[runtime not ready]: Invariant Violation:
TurboModuleRegistry.getEnforcing(...):
'PlatformConstants' could not be found.
```

## ✅ Solution Appliquée

### 1. Fichiers de Configuration Créés

Nous avons créé les fichiers de configuration manquants :

#### `babel.config.js` ✅
```javascript
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
    ],
  };
};
```

#### `metro.config.js` ✅
```javascript
const { getDefaultConfig } = require('expo/metro-config');
const config = getDefaultConfig(__dirname);
module.exports = config;
```

### 2. Redémarrage Requis

Pour que les changements prennent effet :

#### Étape 1 : Arrêter le serveur actuel
Dans le terminal où `npm start` tourne, appuyez sur **Ctrl+C**

#### Étape 2 : Nettoyer le cache
```bash
npx expo start --clear
```

#### Étape 3 : Scanner à nouveau le QR code
Ouvrez Expo Go et scannez le nouveau QR code

## 🎯 Instructions Complètes

### Option A : Redémarrage Complet (Recommandé)

```bash
# 1. Arrêter le serveur (Ctrl+C dans le terminal)

# 2. Nettoyer complètement
npx expo start --clear

# 3. Scanner le QR code avec Expo Go
```

### Option B : Si l'erreur persiste

```bash
# 1. Arrêter le serveur

# 2. Supprimer le cache Metro
rm -rf .expo
rm -rf node_modules/.cache

# 3. Redémarrer
npx expo start --clear
```

### Option C : Réinstallation complète (dernier recours)

```bash
# 1. Supprimer node_modules
rm -rf node_modules

# 2. Réinstaller
npm install --legacy-peer-deps

# 3. Démarrer avec cache nettoyé
npx expo start --clear
```

## 🔍 Pourquoi cette erreur ?

Cette erreur se produit car :

1. **react-native-reanimated** nécessite un plugin Babel spécial
2. Le plugin doit être configuré dans `babel.config.js`
3. Le cache Metro doit être nettoyé après l'ajout de la config

## ✅ Vérification

Après le redémarrage, vous devriez voir :

```
› Metro waiting on exp://192.168.x.x:8081
› Scan the QR code above with Expo Go (Android) or the Camera app (iOS)
```

Et dans Expo Go, l'application devrait se charger sans erreur !

## 🐛 Si l'erreur persiste

### Vérifiez que les fichiers existent :

```bash
# Vérifier babel.config.js
cat babel.config.js

# Vérifier metro.config.js
cat metro.config.js
```

### Vérifiez les dépendances :

```bash
npm list react-native-reanimated
npm list react-native-gesture-handler
```

### Logs détaillés :

```bash
npx expo start --clear --verbose
```

## 💡 Astuce

Après chaque modification de configuration Babel ou Metro, **toujours** redémarrer avec `--clear` :

```bash
npx expo start --clear
```

## 📱 Prochaines Étapes

Une fois l'application chargée :

1. ✅ Complétez l'onboarding
2. ✅ Choisissez une langue (Wolof, Bambara, etc.)
3. ✅ Commencez une leçon
4. ✅ Testez les exercices

## 🎉 Succès !

Si l'application se charge correctement, vous verrez :
- L'écran d'onboarding avec le logo Bayo
- Les options de sélection de langue
- L'interface complète de l'application

---

**Les fichiers de configuration ont été créés. Redémarrez simplement le serveur avec `npx expo start --clear` !**
