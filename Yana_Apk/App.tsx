import 'react-native-gesture-handler';
import * as React from 'react';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserState } from './src/types';
import { INITIAL_USER_STATE } from './src/constants';
import { translations, TranslationKey } from './src/translations';
import { syncUserProfile, firebaseAuth } from './src/services/firebase';
import { audioService } from './src/services/audioService';
import Constants from 'expo-constants';
import { isTablet } from './src/utils/responsive';
import { LANGUAGES } from './src/constants';

// Import screens
import LearnScreen from './src/screens/LearnScreen';
import CommunityScreen from './src/screens/CommunityScreen';
import TutoringScreen from './src/screens/TutoringScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import DiscoveryScreen from './src/screens/DiscoveryScreen';

const Tab = createBottomTabNavigator();

const App: React.FC = () => {
  console.log('--- YANA APP STARTING ---');
  const [user, setUser] = useState<UserState>(INITIAL_USER_STATE);
  const [isLoading, setIsLoading] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  // Load user data from AsyncStorage
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const savedUser = await AsyncStorage.getItem('yana_user');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadUserData();
  }, []);

  // Save user data to AsyncStorage whenever it changes
  useEffect(() => {
    const saveUserData = async () => {
      try {
        await AsyncStorage.setItem('yana_user', JSON.stringify(user));
      } catch (error) {
        console.error('Error saving user data:', error);
      }
    };
    if (!isLoading) {
      saveUserData();
    }
  }, [user, isLoading]);

  // Sync Audio Service
  useEffect(() => {
    audioService.isEnabled = user.soundEnabled !== false; // Default to true if undefined
  }, [user.soundEnabled]);

  // Translation function
  const t = useCallback((key: TranslationKey): string => {
    const lang = user.interfaceLanguage || 'fr';
    const langObj = (translations as any)[lang] || translations.fr;
    return langObj[key] || (translations.fr as any)[key];
  }, [user.interfaceLanguage]);

  // Logout function
  const handleLogout = useCallback(async () => {
    try {
      if (firebaseAuth) {
        await firebaseAuth().signOut();
      }
      await AsyncStorage.removeItem('yana_user');
      setUser(INITIAL_USER_STATE);
      setShowSettings(false);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }, []);



  if (isLoading) {
    return (
      <SafeAreaProvider>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>{t('loading')}</Text>
        </View>
      </SafeAreaProvider>
    );
  }

  // Show onboarding if not finished
  if (!user.onboardingFinished) {
    return (
      <SafeAreaProvider>
        <OnboardingScreen
          onFinish={(userData) => {
            const newUser = {
              ...user,
              firstName: userData.firstName,
              lastName: userData.lastName,
              email: userData.email,
              phone: userData.phone,
              currentLanguage: userData.targetLanguage,
              motivations: userData.motivations,
              dailyGoal: userData.goal,
              experienceLevel: userData.level,
              age: userData.age,
              interfaceLanguage: userData.interfaceLang,
              onboardingFinished: true
            };
            setUser(newUser);

            // Sync with Firebase if logged in
            if (firebaseAuth) {
              const currentUser = firebaseAuth().currentUser;
              if (currentUser) {
                syncUserProfile(currentUser.uid, newUser);
              }
            }
          }}
        />
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: '#FF9633',
            tabBarInactiveTintColor: '#BDBDBD',
            tabBarStyle: {
              height: isTablet ? 95 : 80,
              paddingBottom: isTablet ? 20 : 15,
              paddingTop: isTablet ? 14 : 10,
              borderTopWidth: 1,
              borderTopColor: '#F0F0F0',
              backgroundColor: '#FFFFFF',
            },
            tabBarLabelStyle: {
              fontSize: isTablet ? 13 : 10,
              fontWeight: '900',
              letterSpacing: 1.5,
            },
            headerShown: false,
          }}
        >
          <Tab.Screen
            name="Learn"
            options={{
              tabBarLabel: t('learn'),
              tabBarIcon: () => <Text style={styles.tabIcon}>📖</Text>,
            }}
          >
            {() => <LearnScreen user={user} setUser={setUser} t={t} />}
          </Tab.Screen>

          <Tab.Screen
            name="Community"
            options={{
              tabBarLabel: t('community'),
              tabBarIcon: () => <Text style={styles.tabIcon}>🛡️</Text>,
            }}
          >
            {() => <CommunityScreen user={user} setUser={setUser} t={t} />}
          </Tab.Screen>

          <Tab.Screen
            name="Discovery"
            options={{
              tabBarLabel: t('discovery'),
              tabBarIcon: () => <Text style={styles.tabIcon}>🌍</Text>,
            }}
          >
            {() => <DiscoveryScreen user={user} setUser={setUser} t={t} />}
          </Tab.Screen>

          <Tab.Screen
            name="Tutoring"
            options={{
              tabBarLabel: t('tutoring'),
              tabBarIcon: () => <Text style={styles.tabIcon}>🏆</Text>,
            }}
          >
            {() => <TutoringScreen user={user} setUser={setUser} t={t} />}
          </Tab.Screen>

          <Tab.Screen
            name="Profile"
            options={{
              tabBarLabel: t('profile'),
              tabBarIcon: () => <Text style={styles.tabIcon}>👤</Text>,
            }}
          >
            {() => (
              <ProfileScreen
                user={user}
                setUser={setUser}
                t={t}
                onShowSettings={() => setShowSettings(true)}
              />
            )}
          </Tab.Screen>
        </Tab.Navigator>

        {showSettings && (
          <View style={[StyleSheet.absoluteFill, { zIndex: 9999, elevation: 10 }]}>
            <SettingsScreen
              user={user}
              setUser={setUser}
              t={t}
              onLogout={handleLogout}
              onClose={() => setShowSettings(false)}
            />
          </View>
        )}
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  loadingText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4B3621',
  },
  tabIcon: {
    fontSize: isTablet ? 30 : 24,
  },
});

export default App;
