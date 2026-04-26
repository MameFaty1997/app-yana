# Images de Bayo (Mascotte)

Ce dossier doit contenir les 5 émotions de Bayo, la mascotte castor de l'application.

## Fichiers nécessaires :

1. **happy.png** - Bayo souriant, main levée (salut)
2. **excited.png** - Bayo très content, bras levés (célébration)
3. **thinking.png** - Bayo réfléchit, doigt sur le menton
4. **sad.png** - Bayo triste
5. **motivated.png** - Bayo motivé, poing levé

## Spécifications :

- **Format** : PNG avec transparence
- **Taille** : 400x400px recommandé
- **Style** : Illustration moderne, flat design
- **Couleurs** : Tons chauds (marron, orange #FF9633, beige #FDF7F0)

## Utilisation :

Ces images sont utilisées dans :
- `BayoIntroStep.tsx` - Introduction de Bayo
- Composant `Bayo.tsx` - Affichage de la mascotte avec différentes émotions

## Fallback :

En attendant ces images, l'application utilise :
- URLs d'API dicebear.com
- Emojis comme fallback

Consultez `ILLUSTRATIONS_GUIDE.md` à la racine du projet pour plus de détails.
