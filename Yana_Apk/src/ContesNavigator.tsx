import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BookShelfScreen from './screens/BookShelfScreen';
import BookReaderScreen from './screens/BookReaderScreen';
import { theme } from './tokens/theme';
import { UserState } from './types';

const Stack = createNativeStackNavigator();

export default function ContesNavigator({ initialCategory, user, setUser }: { initialCategory?: string, user?: UserState, setUser?: any }) {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: theme.colors.bg }
            }}
        >
            <Stack.Screen name="BookShelf">
                {(props) => <BookShelfScreen {...(props as any)} initialCategory={initialCategory} user={user} setUser={setUser} />}
            </Stack.Screen>
            <Stack.Screen name="BookReader">
                {(props) => <BookReaderScreen {...(props as any)} user={user} setUser={setUser} />}
            </Stack.Screen>
        </Stack.Navigator>
    );
}
