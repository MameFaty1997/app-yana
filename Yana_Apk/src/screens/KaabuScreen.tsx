import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Dimensions, Image, Animated } from 'react-native';
import { theme } from '../tokens/theme';
import { KenteBar, GoldTitle } from '../components/TerangaComponents';

const { width } = Dimensions.get('window');

const KAABU_DATA = [
    {
        id: 'fondateur',
        title: "Tiramakhan Traoré",
        subtitle: "Le Fondateur Mythique",
        content: "Général intrépide de Soundiata Keïta, Tiramakhan a conquis l'Ouest pour fonder le Kaabu. Une légende entoure sa disparition : il possèderait deux tombes, l'une à Bassé (Gambie) et l'autre à Barazan (Mali).",
        icon: '🦁',
        color: '#f4a026'
    },
    {
        id: 'naancoya',
        title: "La Dynastie Naanco",
        subtitle: "Noblesse et Tradition",
        content: "Les Naancos, descendants de la mystérieuse Balaba Sané, régnaient sur le Kaabu. Leur pouvoir se transmettait par les femmes (matrilinéaire). Leurs vertus : Jarinteya (courage) et Danaya (héroïsme).",
        icon: '👑',
        color: '#e85d04'
    },
    {
        id: 'kansala',
        title: "Kansala la Glorieuse",
        subtitle: "Capitale et Cité de la Joie",
        content: "Siège du gouvernement central, Kansala était protégée par de hautes murailles. En 1867, face à l'ennemi, le roi Dianké Wally choisit de faire exploser ses poudrières plutôt que de se rendre.",
        icon: '🏰',
        color: '#fbbf24'
    },
    {
        id: 'ceddo',
        title: "L'Hymne Ceddo",
        subtitle: "Le Chant de l'Honneur",
        content: "Bien plus qu'une musique, le 'Ceddo' est l'hymne de ralliement des guerriers du Kaabu. Il célèbre la liberté, le refus de la soumission et la mémoire des ancêtres face à l'oubli.",
        icon: '🥁',
        color: '#f4a026'
    }
];

interface Props {
    onClose: () => void;
}

export default function KaabuScreen({ onClose }: Props) {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={onClose} style={styles.backBtn}>
                    <Text style={styles.backText}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>L'Empire du Kaabu</Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
                <KenteBar />

                <View style={styles.introSection}>
                    <Text style={styles.introSubtitle}>HISTOIRE & TRADITION</Text>
                    <Text style={styles.introTitle}>Les Secrets de l'Empire du Soleil Couchant</Text>
                    <Text style={styles.introText}>
                        Le Kaabu fut le dernier grand empire animiste Mandingue d'Afrique de l'Ouest, rayonnant du XIIIe au XIXe siècle sur les terres de l'actuelle Gambie, du Sénégal et de la Guinée-Bissau.
                    </Text>
                </View>

                {KAABU_DATA.map((item) => (
                    <View key={item.id} style={styles.card}>
                        <View style={[styles.iconContainer, { backgroundColor: item.color + '20' }]}>
                            <Text style={styles.icon}>{item.icon}</Text>
                        </View>
                        <View style={styles.cardContent}>
                            <Text style={styles.cardTitle}>{item.title}</Text>
                            <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
                            <Text style={styles.cardText}>{item.content}</Text>
                        </View>
                    </View>
                ))}

                <View style={styles.thesisInfo}>
                    <Text style={styles.thesisText}>
                        Ces informations sont issues des travaux de recherche de <Text style={{ color: theme.colors.gold }}>Mamadou Tangara</Text> (Université de Limoges / IFAN), documentant l'histoire et le mythe selon les traditions orales mandingues.
                    </Text>
                </View>

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: theme.colors.bg,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        backgroundColor: theme.colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(244, 160, 38, 0.1)',
    },
    backBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.05)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    backText: {
        color: theme.colors.gold,
        fontSize: 24,
        fontWeight: 'bold',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: theme.colors.cream,
        fontFamily: theme.fonts.display,
    },
    scrollContainer: {
        paddingBottom: 40,
    },
    introSection: {
        padding: 25,
        backgroundColor: theme.colors.surface2,
        marginBottom: 20,
    },
    introSubtitle: {
        color: theme.colors.orange,
        fontWeight: 'bold',
        letterSpacing: 2,
        fontSize: 12,
        marginBottom: 8,
    },
    introTitle: {
        fontSize: 28,
        color: theme.colors.gold,
        fontFamily: theme.fonts.display,
        marginBottom: 15,
        lineHeight: 34,
    },
    introText: {
        color: theme.colors.cream,
        fontSize: 16,
        lineHeight: 24,
        opacity: 0.9,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: theme.colors.surface,
        marginHorizontal: 20,
        marginBottom: 20,
        borderRadius: 20,
        padding: 20,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
        ...theme.shadow.gold,
    },
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    icon: {
        fontSize: 24,
    },
    cardContent: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.colors.gold,
        marginBottom: 2,
    },
    cardSubtitle: {
        fontSize: 13,
        color: theme.colors.orange,
        fontStyle: 'italic',
        marginBottom: 10,
    },
    cardText: {
        color: theme.colors.cream,
        fontSize: 14,
        lineHeight: 20,
        opacity: 0.8,
    },
    thesisInfo: {
        padding: 25,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.05)',
        marginTop: 20,
    },
    thesisText: {
        color: theme.colors.muted,
        fontSize: 12,
        textAlign: 'center',
        lineHeight: 18,
        fontStyle: 'italic',
    },
});
