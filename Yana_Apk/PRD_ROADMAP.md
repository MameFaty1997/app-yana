# 🎯 Roadmap de Développement Yana (Basé sur le PRD v1.0)

## 🎨 État du Design System (Teranga Moderne)
- [x] **Palette de couleurs** : Orange (#FF9633), Brun Terre (#4B3621), Or (#FFB347).
- [x] **Typographie** : Préparation pour la police Fredoka.
- [x] **Composants UI de base** : Button, Card, ProgressBar, Input, Avatar, Badge, Bayo.

## 📱 Statut des Écrans

### 1. Onboarding & Tunnel d'Engagement (`Onboarding.tsx`)
- [x] Orchestration des 10 étapes (Splash → Friends).
- [x] Intégration des composants modulaires pour chaque étape.
- [x] Collecte des données utilisateur (Niveau, Objectifs, Inscription).

### 2. Carte des Unités (`UnitMap.tsx`)
- [x] Structure de base avec Header Stats (Série, Cauris, Vies).
- [x] Ligne verticale "Lance de sagesse".
- [x] Cartes d'unités interactives (Actives, Verrouillées, Complétées).
- [x] Bouton flottant Bayo.

### 3. Moteur d'Exercices (`ExerciseScreen.tsx`)
- [ ] Structure de la barre de progression.
- [ ] Zone de feedback de Bayo.
- [ ] Types d'exercices :
  - [ ] AUDIO/SPEAK (Reconnaissance vocale).
  - [ ] VISUAL/CHOOSE_IMAGE (Association image/mot).
  - [ ] SYNTAX/ORDER (Reconstruction de phrases).
  - [ ] QUIZ/TRANSLATE (Traduction).

### 4. Communauté & Oralité (`Community.tsx`)
- [ ] Feed de posts (Texte + Lecteur Audio).
- [ ] Créateur de post avec enregistreur vocal (Hold-to-record).
- [ ] Système d'interactions (Likes/Comments).

### 5. Tutorat & Marketplace (`Tutoring.tsx`)
- [ ] Annuaire des tuteurs certifiés.
- [ ] Système de réservation de créneaux.
- [ ] Espace Expert (Devenir Tuteur).

### 6. Profil Utilisateur (`Profile.tsx`)
- [ ] Dashboard personnel.
- [ ] Badges de statut et XP Totale.
- [ ] Bannière Promotion Famille.

### 7. Abonnement & Plans (`Subscription.tsx`)
- [ ] Sélecteur de plan (Étudiant, Premium, Famille).
- [ ] Détails des avantages par tiers.

### 8. Guide Bayo (Chat IA) (`AIChat.tsx`)
- [ ] Interface de chat fluide.
- [ ] Système narratif Gemini Pro (Histoires et contes).

---

## 🛠️ Spécifications Techniques à Implémenter
- [ ] **IA Gemini 3 Flash** : Génération d'exercices à la volée.
- [ ] **IA Gemini 3 Pro** : Intelligence narrative de Bayo.
- [ ] **TTS Gemini** : Synthèse vocale pour les langues africaines.
- [ ] **Audio PCM** : Gestion des flux pour latence minimale.
- [ ] **Mode Hors-ligne** : Persistance via LocalStorage.

---

## 📝 Prochaines Étapes Immédiates
1. Finaliser l'UI de `ExerciseScreen.tsx`.
2. Mettre en place la structure du Chat Bayo (`AIChat.tsx`).
3. Intégrer les traductions manquantes basées sur les thèmes PRD.
