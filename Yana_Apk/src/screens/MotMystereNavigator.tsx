import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WordMysteryHomeScreen from './WordMysteryHomeScreen';
import WordMysteryGameScreen from './WordMysteryGameScreen';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { theme } from '../tokens/theme';

type RootStackParamList = {
    WordMysteryHome: { onClose: () => void };
    WordMysteryGame: { ethnieKey: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

interface Props {
    onClose: () => void;
}

export default function MotMystereNavigator({ onClose }: Props) {
    return (
        <View style={styles.container}>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    contentStyle: { backgroundColor: theme.colors.bg }
                }}
            >
                <Stack.Screen
                    name="WordMysteryHome"
                    component={WordMysteryHomeScreen}
                    initialParams={{ onClose }}
                />
                <Stack.Screen name="WordMysteryGame" component={WordMysteryGameScreen} />
            </Stack.Navigator>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.bg,
    },
});

