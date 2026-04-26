# 🔑 Configuration de la Clé API Gemini

## ⚠️ IMPORTANT : Configuration Requise

Pour que l'application fonctionne correctement, vous **DEVEZ** configurer une clé API Gemini.

## 📝 Étapes de Configuration

### 1. Obtenir une Clé API Gemini (GRATUIT)

1. Visitez : **https://makersuite.google.com/app/apikey**
2. Connectez-vous avec votre compte Google
3. Cliquez sur "Create API Key"
4. Copiez la clé générée

### 2. Configurer la Clé dans l'Application

Ouvrez le fichier `.env` à la racine du projet APK et remplacez :

```env
EXPO_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
```

Par :

```env
EXPO_PUBLIC_GEMINI_API_KEY=votre_vraie_cle_api_ici
```

**Exemple :**
```env
EXPO_PUBLIC_GEMINI_API_KEY=AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 3. Redémarrer l'Application

Si l'application est déjà en cours d'exécution :

```bash
# Arrêtez le serveur (Ctrl+C)
# Puis relancez
npm start
```

## ✅ Vérification

L'application utilisera la clé API pour :
- ✅ Générer les exercices de leçons
- ✅ Créer du contenu personnalisé
- ✅ Adapter les exercices au niveau de l'utilisateur

## 🆓 Quota Gratuit

Gemini offre un quota gratuit généreux :
- **60 requêtes par minute**
- **1500 requêtes par jour**
- **1 million de tokens par mois**

Largement suffisant pour tester et développer l'application !

## 🔒 Sécurité

### ⚠️ NE JAMAIS :
- ❌ Partager votre clé API publiquement
- ❌ Commiter le fichier `.env` sur Git
- ❌ Publier la clé dans le code source

### ✅ TOUJOURS :
- ✅ Garder la clé dans `.env`
- ✅ Ajouter `.env` au `.gitignore` (déjà fait ✅)
- ✅ Utiliser des variables d'environnement

## 🚨 En Cas de Problème

### Erreur "API Key not found"

1. Vérifiez que le fichier `.env` existe
2. Vérifiez que la clé commence par `EXPO_PUBLIC_`
3. Redémarrez le serveur Expo

### Erreur "Invalid API Key"

1. Vérifiez que vous avez copié la clé complète
2. Vérifiez qu'il n'y a pas d'espaces avant/après
3. Générez une nouvelle clé si nécessaire

### Erreur "Quota exceeded"

Vous avez dépassé le quota gratuit. Attendez 24h ou passez à un plan payant.

## 📱 Pour la Production

Lors de la génération de l'APK, la clé sera embarquée dans l'application.

**Important :** Pour une application en production, utilisez un backend pour sécuriser la clé API.

## 🔄 Alternative : Mode Offline

Si vous ne voulez pas utiliser l'API Gemini, l'application utilisera automatiquement des exercices de secours (fallback) pré-définis.

Ces exercices sont limités mais permettent de tester l'application sans clé API.

## 💡 Conseils

1. **Créez une clé dédiée** pour ce projet
2. **Surveillez votre usage** sur https://makersuite.google.com
3. **Régénérez la clé** si vous la partagez accidentellement

## 📚 Documentation Gemini

Pour plus d'informations sur l'API Gemini :
- Documentation : https://ai.google.dev/docs
- Limites : https://ai.google.dev/pricing
- Support : https://ai.google.dev/support

---

**Une fois la clé configurée, vous êtes prêt à utiliser l'application ! 🚀**
