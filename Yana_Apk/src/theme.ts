// Design System - Theme Configuration
// Couleurs, typographie, espacements et autres tokens de design

export const COLORS = {
    // Palette Teranga Moderne (PRD)
    primary: '#FF9633',       // Orange principal Yana
    primaryDark: '#C47E2F',   // Orange foncé
    primaryLight: '#FFB347',  // Or / Orange clair

    // Couleurs secondaires
    secondary: '#4B3621',     // Brun Terre (PRD)
    secondaryLight: '#FDF7F0', // Beige (Sablé léger)
    Caury: '#FFB347',         // Or Yana pour les XP

    // Couleurs de texte (Brun Terre pour un look premium)
    text: {
        primary: '#4B3621',    // Brun Terre (Titres)
        secondary: '#6B5744',  // Brun moyen (Body)
        tertiary: '#A8927D',   // Brun clair (Captions)
        inverse: '#FFFFFF',    // Blanc (sur fonds foncés)
    },

    // Couleurs d'accent
    accent: '#FFB347',       // Or / Highlights
    gold: '#FFD700',         // Or pur (Récompenses)
    heart: '#FF6B6B',        // Rouge Passion (Vies)
    streak: '#FFA726',       // Orange Brillant (Série)

    // Couleurs de base
    white: '#FFFFFF',
    black: '#000000',

    // Nuances de gris (pour les fonds neutres)
    gray: {
        50: '#F9FAFB',
        100: '#F3F4F6',
        200: '#E5E7EB',
        300: '#D1D5DB',
        400: '#9CA3AF',
        500: '#6B7280',
        600: '#4B5563',
    },

    // Couleurs sémantiques
    success: '#4CAF50',      // Vert Nature
    error: '#E53935',        // Rouge Terre
    warning: '#FFC107',      // Jaune Solaire
    info: '#2196F3',         // Bleu Ciel

    // Backgrounds
    background: {
        primary: '#FFFFFF',
        secondary: '#FDF7F0',  // Sablé léger
        tertiary: '#4B3621',   // Terre
        dark: '#4B3621',
    },

    // Interaction Colors (Pressed States)
    pressed: {
        primary: '#E6872D',    // primaryDark slightly adjusted
        secondary: '#362718',  // secondaryDark
        danger: '#D32F2F',    // errorDark
        outlined: '#FFF7ED',  // primaryLight very light
    },

    // Bordures
    border: {
        light: '#E5E7EB',
        medium: '#D1D5DB',
        dark: '#4B3621',
    },

    // Ombres
    shadow: {
        color: '#4B3621',      // Ombre colorée pour plus de chaleur
        opacity: 0.1,
    },
};

export const TYPOGRAPHY = {
    // Utilise Fredoka (typographie ronde du PRD)
    h1: {
        fontSize: 32,
        fontWeight: '700' as const,
        lineHeight: 40,
    },
    h2: {
        fontSize: 28,
        fontWeight: '700' as const,
        lineHeight: 36,
    },
    h3: {
        fontSize: 24,
        fontWeight: '600' as const,
        lineHeight: 32,
    },
    h4: {
        fontSize: 20,
        fontWeight: '600' as const,
        lineHeight: 28,
    },

    // Sous-titres
    subtitle1: {
        fontSize: 18,
        fontWeight: '600' as const,
        lineHeight: 26,
    },
    subtitle2: {
        fontSize: 16,
        fontWeight: '600' as const,
        lineHeight: 24,
    },

    // Corps de texte
    body1: {
        fontSize: 16,
        fontWeight: '400' as const,
        lineHeight: 24,
    },
    body2: {
        fontSize: 14,
        fontWeight: '400' as const,
        lineHeight: 20,
    },

    // Boutons
    button: {
        fontSize: 16,
        fontWeight: '600' as const,
        lineHeight: 24,
        letterSpacing: 0.5,
    },

    // Captions
    caption: {
        fontSize: 12,
        fontWeight: '500' as const,
        lineHeight: 16,
    },

    // Labels
    overline: {
        fontSize: 10,
        fontWeight: '700' as const,
        lineHeight: 14,
        textTransform: 'uppercase' as const,
    },
};

export const SPACING = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
    xxxl: 64,
};

export const BORDER_RADIUS = {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
    full: 9999,
};

export const SHADOWS = {
    sm: {
        shadowColor: COLORS.shadow.color,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    md: {
        shadowColor: COLORS.shadow.color,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 4,
    },
    lg: {
        shadowColor: COLORS.shadow.color,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 16,
        elevation: 8,
    },
    xl: {
        shadowColor: COLORS.shadow.color,
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.25,
        shadowRadius: 24,
        elevation: 12,
    },
};

export const SIZES = {
    // Tailles d'icônes
    icon: {
        xs: 16,
        sm: 20,
        md: 24,
        lg: 32,
        xl: 48,
    },

    // Tailles d'avatars
    avatar: {
        sm: 32,
        md: 48,
        lg: 64,
        xl: 96,
        xxl: 128,
    },

    // Hauteurs de boutons
    button: {
        sm: 36,
        md: 48,
        lg: 56,
    },

    // Hauteurs d'inputs
    input: {
        sm: 40,
        md: 48,
        lg: 56,
    },
};

export const ANIMATIONS = {
    duration: {
        fast: 150,
        normal: 300,
        slow: 500,
    },
    easing: {
        easeIn: 'ease-in',
        easeOut: 'ease-out',
        easeInOut: 'ease-in-out',
    },
};

// Export du thème complet
export const THEME = {
    colors: COLORS,
    typography: TYPOGRAPHY,
    spacing: SPACING,
    borderRadius: BORDER_RADIUS,
    shadows: SHADOWS,
    sizes: SIZES,
    animations: ANIMATIONS,
};

export type Theme = typeof THEME;
