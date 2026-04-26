import { Platform } from 'react-native';

export const theme = {
    colors: {
        bg: '#1a0e05',
        surface: '#241508',
        surface2: '#2e1a0a',
        orange: '#e85d04',
        gold: '#f4a026',
        goldLight: '#fbbf24',
        cream: '#fdf3e3',
        green: '#22c55e',
        red: '#ef4444',
        teal: '#1b7a6e',
        muted: '#c4a882',
    },
    fonts: {
        display: Platform.OS === 'ios' ? 'System' : 'sans-serif-condensed',
        body: Platform.OS === 'ios' ? 'System' : 'sans-serif',
        bodyLight: Platform.OS === 'ios' ? 'System' : 'sans-serif-light',
    },
    radius: { sm: 8, md: 14, lg: 20, pill: 50 },
    shadow: {
        gold: { shadowColor: '#f4a026', shadowOpacity: 0.35, shadowRadius: 12, elevation: 8 },
        orange: { shadowColor: '#e85d04', shadowOpacity: 0.4, shadowRadius: 10, elevation: 6 },
    },
};
