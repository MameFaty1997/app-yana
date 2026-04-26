/**
 * Cet endroit centralise toutes les images utilisées par le jeu Memory Teranga.
 *
 * 📁 INSTRUCTIONS POUR AJOUTER DE NOUVELLES IMAGES :
 * 1. Déposez vos nouvelles images dans le dossier : assets/memory_teranga/
 * 2. Ajoutez une nouvelle ligne ci-dessous en suivant le même format.
 *
 * Exemple : Si vous ajoutez "illustration-nouvelleLangue.png"
 * 'illustration-nouvelleLangue.png': require('../../assets/memory_teranga/illustration-nouvelleLangue.png'),
 */

export const MEMORY_TERANGA_IMAGES: Record<string, any> = {
    'illustration-bainouk.png': require('../../assets/memory_teranga/illustration-bainouk.png'),
    'illustration-balante.png': require('../../assets/memory_teranga/illustration-balante.png'),
    'illustration-bambara.png': require('../../assets/memory_teranga/illustration-bambara.png'),
    'illustration-bassari.png': require('../../assets/memory_teranga/illustration-bassari.png'),
    'illustration-diola.png': require('../../assets/memory_teranga/illustration-diola.png'),
    'illustration-mandinka.png': require('../../assets/memory_teranga/illustration-mandinka.png'),
    'illustration-manjack.png': require('../../assets/memory_teranga/illustration-manjack.png'),
    'illustration-mankagne.png': require('../../assets/memory_teranga/illustration-mankagne.png'),
    'illustration-peulh.png': require('../../assets/memory_teranga/illustration-peulh.png'),
    'illustration-serere.png': require('../../assets/memory_teranga/illustration-serere.png'),
    'illustration-soninke.png': require('../../assets/memory_teranga/illustration-soninke.png'),
    'illustration-wolof.png': require('../../assets/memory_teranga/illustration-wolof.png'),
};

export const getMemoryTerangaImage = (imageName: string) => {
    return MEMORY_TERANGA_IMAGES[imageName];
};
