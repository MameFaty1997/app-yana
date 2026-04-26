# 📁 Guide de Configuration Firebase - YANA

Ce guide vous explique comment configurer votre console Firebase pour activer l'authentification (SMS, Google) et la base de données.

## 1. Accéder au projet
1. Allez sur [Firebase Console](https://console.firebase.google.com/).
2. Cliquez sur votre projet : **yana-eb143**.

## 2. Activer l'Authentification (Auth)
1. Dans le menu de gauche, cliquez sur **Authentication**.
2. Allez dans l'onglet **Sign-in method**.
3. Cliquez sur **Add new provider** :
   - **Téléphone** : Activez-le.
   - **Google** : Activez-le (choisissez une adresse email de support).
   - **Apple** : Activez-le (nécessite un compte Apple Developer plus tard).

## 3. Configurer le SHA-1 (CRITIQUE pour SMS & Google)
Pour que la vérification SMS fonctionne sur Android, Firebase doit "connaître" votre machine.
1. Ouvrez un terminal sur votre ordinateur.
2. Tapez : `cd android && ./gradlew signingReport` (ou utilisez l'outil Keytool).
3. Copiez la clé **SHA-1**.
4. Dans la console Firebase, allez dans **Project Settings** (la roue dentée en haut à gauche).
5. Dans l'onglet **General**, descendez jusqu'à votre application Android.
6. Cliquez sur **Add fingerprint** et collez votre clé SHA-1.
7. Téléchargez le nouveau `google-services.json` et remplacez celui qui est dans votre projet.

## 4. Activer la Base de Données (Firestore)
1. Dans le menu de gauche, cliquez sur **Firestore Database**.
2. Cliquez sur **Create database**.
3. Choisissez **Start in test mode** (pour le développement).
4. Choisissez un emplacement (ex: `eur3` pour l'Europe).
5. Cliquez sur **Enable**.

## 5. Autoriser les domaines (pour le Web/Expo Go)
Si vous testez via un navigateur ou Expo Go, allez dans :
1. **Authentication** > **Settings** > **Authorized domains**.
2. Vérifiez que `localhost` et votre domaine Firebase sont présents.

---

**💡 Note pour le test SMS :**
Vous pouvez ajouter un numéro de test (ex: +221770000000 avec le code 123456) dans l'onglet **Sign-in method** > **Phone** pour tester sans consommer de vrais SMS.
