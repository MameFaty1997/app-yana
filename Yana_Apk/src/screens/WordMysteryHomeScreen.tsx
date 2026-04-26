import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { theme } from '../tokens/theme';
import { KenteBar, GoldTitle, EthnieCard, CornerDeco } from '../components/TerangaComponents';
import { useMotMystereData } from '../data/reference/languages/motMystereDB';

type RootStackParamList = {
    WordMysteryHome: { onClose: () => void };
    WordMysteryGame: { ethnieKey: string };
};

type Props = NativeStackScreenProps<RootStackParamList, 'WordMysteryHome'>;

export default function WordMysteryHomeScreen({ navigation, route }: Props) {
    const { onClose } = route.params;
    const data = useMotMystereData();
    const ethnieKeys = Object.keys(data);

    return (
        <SafeAreaView style={styles.safeArea}>
            <KenteBar />
            <CornerDeco />
            <View style={styles.header}>
                <TouchableOpacity onPress={onClose} style={styles.homeBtn}>
                    <Text style={styles.homeIcon}>🏠</Text>
                </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                <GoldTitle title="Mot Mystère Teranga" />
                <Text style={styles.subtitle}>
                    Découvrez les mots cachés des différentes cultures du Sénégal.{"\n"}
                    Sélectionnez une culture pour commencer !
                </Text>

                <View style={styles.grid}>
                    {ethnieKeys.map((key) => {
                        const item = data[key];
                        return (
                            <EthnieCard
                                key={key}
                                ethnie={item.ethnie}
                                img={item.img}
                                onPress={() => navigation.navigate('WordMysteryGame', { ethnieKey: key })}
                            />
                        );
                    })}
                </View>
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
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingTop: 10,
        zIndex: 10,
    },
    homeBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(244, 160, 38, 0.1)',
        borderWidth: 1,
        borderColor: theme.colors.gold,
        justifyContent: 'center',
        alignItems: 'center',
    },
    homeIcon: {
        fontSize: 18,
    },
    container: {
        paddingHorizontal: 20,
        paddingBottom: 40,
        alignItems: 'center',
    },
    subtitle: {
        fontFamily: theme.fonts.body,
        fontSize: 16,
        color: theme.colors.cream,
        textAlign: 'center',
        marginVertical: 10,
        marginBottom: 30,
        lineHeight: 24,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        width: '100%',
    }
});
