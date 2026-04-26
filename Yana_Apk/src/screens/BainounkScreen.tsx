import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { theme } from '../tokens/theme';
import { KenteBar } from '../components/TerangaComponents';

const { width } = Dimensions.get('window');

const BAINOUNK_CONTENT = [
    {
        id: 'migration',
        title: "L'Exode du Gabou",
        subtitle: "La quête de la Terre Promise",
        content: "Premiers habitants de la Casamance, les Baïnounks fuirent l'empire du Gabou face à l'invasion de Tiramakhan Traoré. Leur migration les mena vers l'Océan, fondant Ziguinchor et ses environs.",
        icon: '🌊',
        color: '#f4a026'
    },
    {
        id: 'makatamba',
        title: "L'Âge de Makatamba",
        subtitle: "La Prospérité Commerciale",
        content: "Sous le règne de Makatamba, le peuple vivait en harmonie, commerçant avec les Portugais. Ce fut une période de paix pour ce peuple hospitalier qui préférait l'exode à la confrontation armée.",
        icon: '⚖️',
        color: '#fbbf24'
    },
    {
        id: 'ganasira',
        title: "Gana Sira Biaye",
        subtitle: "Le Roi de Fer",
        content: "Successeur de Makatamba, 'Magsobti' durcit le régime face aux razzias Malinkés. Il installa sa capitale à Birikama et imposa une éducation militaire rigide à une population pacifique.",
        icon: '🛡️',
        color: '#e85d04'
    },
    {
        id: 'crise',
        title: "La Révolte Silencieuse",
        subtitle: "Grève et Sacrifice",
        content: "Le sacrifice de dizaines de jeunes filles fut l'étincelle finale. Les femmes lancèrent une grève conjugale de 15 jours, poussant les hommes à éliminer un roi devenu insupportable.",
        icon: '🔥',
        color: '#FF6B6B'
    },
    {
        id: 'malediction',
        title: "La Trappe de Birikama",
        subtitle: "Un Destin Scellé",
        content: "Piégé sur un trône truqué, Gana Sira mourut lapidé. Avant son dernier souffle, il maudit son peuple, prédisant leur disparition inéluctable face aux génocides du XVIIe siècle.",
        icon: '🪨',
        color: '#f4a026'
    }
];

interface Props {
    onClose: () => void;
}

export default function BainounkScreen({ onClose }: Props) {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={onClose} style={styles.backBtn}>
                    <Text style={styles.backText}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>L'Odyssée des Baïnounks</Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
                <KenteBar />

                <View style={styles.introSection}>
                    <Text style={styles.introSubtitle}>HISTOIRE & SOCIOLOGIE</Text>
                    <Text style={styles.introTitle}>Le Peuple "Maudit" de Casamance</Text>
                    <Text style={styles.introText}>
                        Découvrez l'histoire fascinante des premiers habitants de la Casamance, un peuple de paix confronté aux rudes réalités de l'expansion mandingue.
                    </Text>
                </View>

                {BAINOUNK_CONTENT.map((item) => (
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

                <View style={styles.moralSection}>
                    <Text style={styles.moralTitle}>La Tradition Orale</Text>
                    <Text style={styles.moralText}>
                        "Si tu veux connaître la suite, reste avec nous jusqu’à la fin de l’histoire... ainsi tu pourras la raconter à tes proches..."
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
        fontSize: 18,
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
        fontSize: 26,
        color: theme.colors.gold,
        fontFamily: theme.fonts.display,
        marginBottom: 15,
        lineHeight: 32,
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
        marginBottom: 16,
        borderRadius: 20,
        padding: 16,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
        ...theme.shadow.gold,
    },
    iconContainer: {
        width: 46,
        height: 46,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    icon: {
        fontSize: 22,
    },
    cardContent: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: theme.colors.gold,
        marginBottom: 2,
    },
    cardSubtitle: {
        fontSize: 12,
        color: theme.colors.orange,
        fontStyle: 'italic',
        marginBottom: 8,
    },
    cardText: {
        color: theme.colors.cream,
        fontSize: 13,
        lineHeight: 18,
        opacity: 0.8,
    },
    moralSection: {
        margin: 25,
        padding: 20,
        backgroundColor: 'rgba(244, 160, 38, 0.05)',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: theme.colors.gold + '20',
        alignItems: 'center',
    },
    moralTitle: {
        color: theme.colors.gold,
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 10,
        textTransform: 'uppercase',
    },
    moralText: {
        color: theme.colors.cream,
        fontSize: 14,
        fontStyle: 'italic',
        textAlign: 'center',
        lineHeight: 20,
    }
});
