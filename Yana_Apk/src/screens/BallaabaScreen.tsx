import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Dimensions, Image, Animated } from 'react-native';
import { theme } from '../tokens/theme';
import { KenteBar, GoldTitle } from '../components/TerangaComponents';

const { width } = Dimensions.get('window');

const BALLAABA_CONTENT = [
    {
        id: 'origines',
        title: "Les origines d'une princesse",
        subtitle: "Le Soleil du Roi Massa Malaï Sané",
        content: "Dans la basse vallée du fleuve, au royaume du Gabou, naquit Ballaaba, une fille d'une beauté et d'une intelligence remarquables. Elle était le 'seul soleil' de son père, Massa Malaï Sané, avec qui elle partageait une complicité rare.",
        icon: '🌿',
        color: '#f4a026'
    },
    {
        id: 'choix',
        title: "Le choix de l'amour",
        subtitle: "L'union contre le devoir",
        content: "Face au mariage arrangé par son père, Ballaaba choisit de suivre son cœur pour un jeune homme d'un village voisin. De cet amour interdit naquit une grossesse qui allait bouleverser son destin et celui du royaume.",
        icon: '💔',
        color: '#fbbf24'
    },
    {
        id: 'fuite',
        title: "La honte et la fuite",
        subtitle: "L'exil dans la forêt profonde",
        content: "Paralysée par la peur d'humilier son père, Ballaaba s'enfonça seule dans la forêt. Elle préféra l'hostilité de la jungle au regard déçu de son peuple, disparaissant sans laisser de trace.",
        icon: '🌑',
        color: '#e85d04'
    },
    {
        id: 'survie',
        title: "Sept ans de silence",
        subtitle: "La résilience de l'ombre",
        content: "Pendant sept ans, elle survécut dans une grotte avec son enfant. La princesse de cour devint une femme sauvage, apprenant les secrets des plantes et des animaux, forgeant une force intérieure insoupçonnée.",
        icon: '🐗',
        color: '#fbbf24'
    },
    {
        id: 'decouverte',
        title: "La rencontre du chasseur",
        subtitle: "Un message d'espoir",
        content: "Un chasseur royal, à la recherche d'un porc-épic, découvrit sa cachette. En l'entendant parler la langue du Gabou, il reconnut la princesse disparue. Ballaaba était vivante, et la nouvelle fit pleurer de joie le vieux roi.",
        icon: '👑',
        color: '#f4a026'
    },
    {
        id: 'legende',
        title: "L'Héritage de la Reine",
        subtitle: "La Mère des Lois du Gabou",
        content: "Ballaaba ne fut pas seulement une survivante. Elle devint une figure fondatrice qui théorisa les lois régissant le Gabou. Son histoire est celle d'une femme qui trouva dans l'exil la force de bâtir un empire.",
        icon: '📖',
        color: '#FFB347'
    }
];

interface BallaabaScreenProps {
    onClose: () => void;
}

const BallaabaScreen: React.FC<BallaabaScreenProps> = ({ onClose }) => {
    const scrollY = React.useRef(new Animated.Value(0)).current;

    const headerHeight = scrollY.interpolate({
        inputRange: [0, 200],
        outputRange: [300, 150],
        extrapolate: 'clamp',
    });

    return (
        <SafeAreaView style={styles.container}>
            <Animated.View style={[styles.header, { height: headerHeight }]}>
                <Image
                    source={require('../../assets/discovery/gana_sira.jpg')}
                    style={styles.headerImage}
                    blurRadius={2}
                />
                <View style={styles.headerOverlay} />

                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                    <Text style={styles.closeText}>✕</Text>
                </TouchableOpacity>

                <View style={styles.titleContainer}>
                    <Text style={styles.tag}>LÉGENDE MANDINGUE</Text>
                    <GoldTitle title="Ballaaba : La Reine Vampiresse" />
                    <Text style={styles.subtitle}>Griot MD Sixc — Tradition Orale du Gabou</Text>
                </View>
            </Animated.View>

            <ScrollView
                style={styles.content}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false }
                )}
                scrollEventThrottle={16}
            >
                <View style={styles.introSection}>
                    <Text style={styles.introSubtitle}>HISTOIRE ISSUE DU GABOU</Text>
                    <Text style={styles.introText}>
                        L'histoire de Ballaaba est celle d'une princesse qui a défié les conventions pour suivre son cœur, trouvant dans la solitude de la forêt la sagesse nécessaire pour fonder les lois de son peuple.
                    </Text>
                    <KenteBar />
                </View>

                {BALLAABA_CONTENT.map((item, index) => (
                    <View key={item.id} style={styles.articleCard}>
                        <View style={styles.cardHeader}>
                            <View style={[styles.iconCircle, { backgroundColor: item.color + '20' }]}>
                                <Text style={styles.icon}>{item.icon}</Text>
                            </View>
                            <View>
                                <Text style={[styles.cardTag, { color: item.color }]}>CHAPITRE {index + 1}</Text>
                                <Text style={styles.cardTitle}>{item.title}</Text>
                            </View>
                        </View>
                        <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
                        <Text style={styles.cardContent}>{item.content}</Text>
                    </View>
                ))}

                <View style={styles.footer}>
                    <KenteBar />
                    <Text style={styles.footerNote}>
                        "Le lion ne rugit pas pour prouver sa force. Il rugit parce que c'est sa nature."
                    </Text>
                    <Text style={styles.source}>Guinée-Bissau — MD Sixc</Text>
                </View>
                <View style={{ height: 100 }} />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a0e05',
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        overflow: 'hidden',
    },
    headerImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    headerOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(26, 14, 5, 0.7)',
    },
    titleContainer: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
    },
    tag: {
        color: '#f4a026',
        fontSize: 12,
        fontWeight: '900',
        letterSpacing: 2,
        marginBottom: 8,
    },
    subtitle: {
        color: '#fdf3e3',
        fontSize: 14,
        opacity: 0.8,
        marginTop: 4,
        fontStyle: 'italic',
    },
    closeButton: {
        position: 'absolute',
        top: 40,
        right: 20,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 20,
    },
    closeText: {
        color: 'white',
        fontSize: 20,
    },
    content: {
        flex: 1,
        marginTop: 300,
    },
    introSection: {
        padding: 25,
    },
    introSubtitle: {
        color: theme.colors.orange,
        fontWeight: 'bold',
        letterSpacing: 2,
        fontSize: 12,
        marginBottom: 8,
    },
    introText: {
        color: '#fdf3e3',
        fontSize: 18,
        lineHeight: 28,
        fontStyle: 'italic',
        marginBottom: 20,
    },
    articleCard: {
        backgroundColor: '#241508',
        marginHorizontal: 15,
        marginBottom: 20,
        borderRadius: 20,
        padding: 20,
        borderWidth: 1,
        borderColor: 'rgba(244, 160, 38, 0.1)',
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    iconCircle: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    icon: {
        fontSize: 24,
    },
    cardTag: {
        fontSize: 10,
        fontWeight: '900',
        letterSpacing: 1,
    },
    cardTitle: {
        color: '#fbbf24',
        fontSize: 18,
        fontWeight: 'bold',
    },
    cardSubtitle: {
        color: '#fdf3e3',
        fontSize: 14,
        fontWeight: '700',
        marginBottom: 10,
        opacity: 0.9,
    },
    cardContent: {
        color: '#fdf3e3',
        fontSize: 15,
        lineHeight: 24,
        opacity: 0.8,
    },
    footer: {
        padding: 40,
        alignItems: 'center',
    },
    footerNote: {
        color: '#fdf3e3',
        fontSize: 16,
        fontStyle: 'italic',
        textAlign: 'center',
        marginTop: 20,
        lineHeight: 24,
    },
    source: {
        color: '#f4a026',
        fontSize: 12,
        fontWeight: 'bold',
        marginTop: 10,
        opacity: 0.6,
    }
});

export default BallaabaScreen;
