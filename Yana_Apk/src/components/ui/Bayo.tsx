import * as React from 'react';
import { View, Image, StyleSheet, ViewStyle, ImageSourcePropType } from 'react-native';

export type BayoEmotion =
    | 'happy'         // Sourire avec main levée (salut)
    | 'excited'       // Très content, bras levés
    | 'thinking'      // Réfléchit, doigt sur le menton
    | 'sad'           // Triste, pleure
    | 'motivated'     // Motivé, poing levé, saute
    | 'greeting'      // Salut amical
    | 'crying'        // En train de pleurer
    | 'skeptical'     // Sceptique
    | 'taking_note';  // En train de prendre des notes

export type BayoSize = 'sm' | 'md' | 'lg' | 'xl';

interface BayoProps {
    emotion?: BayoEmotion;
    size?: BayoSize;
    style?: ViewStyle;
}

const SIZES: Record<BayoSize, number> = {
    sm: 60,
    md: 100,
    lg: 150,
    xl: 200,
};

// Utilisation des ressources locales avec les fichiers PNG mis à jour par l'utilisateur
const EMOTION_IMAGES: Record<BayoEmotion, ImageSourcePropType> = {
    happy: require('../../../assets/bayo/happy.png'),
    excited: require('../../../assets/bayo/excited.png'),
    thinking: require('../../../assets/bayo/thinking.png'),
    sad: require('../../../assets/bayo/sad.png'),
    motivated: require('../../../assets/bayo/motivated.png'),
    greeting: require('../../../assets/bayo/greating.png'),
    crying: require('../../../assets/bayo/crying.png'),
    skeptical: require('../../../assets/bayo/skeptical.png'),
    taking_note: require('../../../assets/bayo/taking_note.png'),
};

const Bayo: React.FC<BayoProps> = ({
    emotion = 'happy',
    size = 'md',
    style,
}) => {
    const imageSize = SIZES[size];

    return (
        <View style={[styles.container, { width: imageSize, height: imageSize }, style]}>
            <Image
                source={EMOTION_IMAGES[emotion]}
                style={styles.image}
                resizeMode="contain"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
    },
});

export default Bayo;
