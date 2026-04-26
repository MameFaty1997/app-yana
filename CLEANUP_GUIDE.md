# 🗑️ Guide de Nettoyage - Suppression des Anciens Dossiers

## ⚠️ Important

Avant de supprimer les anciens dossiers, **vérifiez que Yana_Apk fonctionne correctement** !

## ✅ Vérifications Préalables

### 1. Tester Yana_Apk

```bash
cd "c:\Users\USER\Downloads\yana-apk-last (1)\Yana_Apk"
npx expo start
```

Vérifiez que :
- [ ] L'application se lance sans erreur
- [ ] L'onboarding s'affiche
- [ ] Les composants fonctionnent
- [ ] Pas d'erreur TypeScript

### 2. Vérifier les Fichiers

Assurez-vous que Yana_Apk contient :
- [ ] `src/` avec tous les fichiers source
- [ ] `assets/` avec les images
- [ ] `package.json` et autres configs
- [ ] Documentation complète

## 🗂️ Dossiers à Supprimer

Une fois que Yana_Apk fonctionne parfaitement :

### 1. APK/
**Raison** : Remplacé par Yana_Apk  
**Taille** : ~500 MB (avec node_modules)

```powershell
Remove-Item "c:\Users\USER\Downloads\yana-apk-last (1)\APK" -Recurse -Force
```

### 2. yana-clean/
**Raison** : Code source copié dans Yana_Apk  
**Taille** : ~500 MB (avec node_modules)

```powershell
Remove-Item "c:\Users\USER\Downloads\yana-apk-last (1)\yana-clean" -Recurse -Force
```

### 3. Web/
**Raison** : Projet web séparé (si non utilisé)  
**Taille** : ~300 MB (avec node_modules)

```powershell
Remove-Item "c:\Users\USER\Downloads\yana-apk-last (1)\Web" -Recurse -Force
```

## 📦 Suppression Complète

Pour supprimer tous les anciens dossiers en une fois :

```powershell
# Aller dans le dossier parent
cd "c:\Users\USER\Downloads\yana-apk-last (1)"

# Supprimer les anciens dossiers
Remove-Item "APK" -Recurse -Force
Remove-Item "yana-clean" -Recurse -Force
Remove-Item "Web" -Recurse -Force

# Vérifier ce qui reste
Get-ChildItem
```

## 💾 Sauvegarde (Optionnel)

Si vous voulez garder une sauvegarde avant de supprimer :

```powershell
# Créer un dossier de sauvegarde
mkdir "c:\Users\USER\Downloads\yana-backup"

# Copier les dossiers importants
xcopy "c:\Users\USER\Downloads\yana-apk-last (1)\APK\.env" "c:\Users\USER\Downloads\yana-backup\" /Y
xcopy "c:\Users\USER\Downloads\yana-apk-last (1)\yana-clean\.env" "c:\Users\USER\Downloads\yana-backup\" /Y

# Puis supprimer les dossiers
```

## 📊 Espace Libéré

Après suppression :

| Dossier | Taille Estimée |
|---------|----------------|
| APK/ | ~500 MB |
| yana-clean/ | ~500 MB |
| Web/ | ~300 MB |
| **Total** | **~1.3 GB** |

## ✨ Résultat Final

Après nettoyage, vous aurez :

```
c:\Users\USER\Downloads\yana-apk-last (1)\
└── Yana_Apk/          # ✅ Seul dossier restant
    ├── src/           # Code source
    ├── assets/        # Images
    ├── node_modules/  # Dépendances
    ├── package.json   # Config
    └── README.md      # Documentation
```

## 🎯 Checklist de Nettoyage

- [ ] Yana_Apk testé et fonctionnel
- [ ] Sauvegarde créée (si nécessaire)
- [ ] APK/ supprimé
- [ ] yana-clean/ supprimé
- [ ] Web/ supprimé (si non utilisé)
- [ ] Vérification de l'espace disque libéré

## ⚠️ Attention

### Ne PAS supprimer :
- ❌ `Yana_Apk/` - C'est votre projet principal !
- ❌ `Yana_Apk/node_modules/` - Nécessaire pour l'app
- ❌ `Yana_Apk/.env` - Contient votre clé API

### OK à supprimer :
- ✅ `APK/` - Remplacé
- ✅ `yana-clean/` - Code copié
- ✅ `Web/` - Projet séparé
- ✅ `package-lock.json` à la racine (si existe)

## 💡 Conseils

1. **Testez d'abord** - Assurez-vous que Yana_Apk fonctionne
2. **Sauvegardez .env** - Gardez vos clés API
3. **Supprimez progressivement** - Un dossier à la fois
4. **Vérifiez l'espace** - Confirmez que l'espace est libéré

## 🔄 En Cas de Problème

Si après suppression vous réalisez qu'il manque quelque chose :

1. **Vérifiez la corbeille** - Les fichiers y sont peut-être
2. **Restaurez depuis la sauvegarde** - Si vous en avez créé une
3. **Réinstallez les dépendances** - `npm install` dans Yana_Apk

## 📝 Commande Rapide

Pour tout supprimer d'un coup (après vérification) :

```powershell
cd "c:\Users\USER\Downloads\yana-apk-last (1)"
Remove-Item "APK","yana-clean","Web" -Recurse -Force
```

---

**Rappel** : Ne supprimez les anciens dossiers qu'après avoir vérifié que Yana_Apk fonctionne parfaitement ! ⚠️
