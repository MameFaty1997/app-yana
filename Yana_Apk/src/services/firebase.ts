import { Platform } from 'react-native';
import Constants from 'expo-constants';

// Détecter si on est dans Expo Go ou sur le Web
const isExpoGo = Constants.appOwnership === 'expo';
const isWeb = Platform.OS === 'web';
const isFirebaseDisabled = isExpoGo || isWeb;

let auth: any;
let firestore: any;

if (!isFirebaseDisabled) {
    try {
        auth = require('@react-native-firebase/auth').default;
        firestore = require('@react-native-firebase/firestore').default;
    } catch (e) {
        console.warn('Firebase native modules not found, disabling Firebase features.');
    }
}

export const firebaseAuth = auth;
export const firebaseFirestore = firestore;

// Helper to check if user exists in Firestore
export const checkIfUserExists = async (uid: string) => {
    if (isFirebaseDisabled || !firestore) return false;
    try {
        const userDoc = await firestore().collection('users').doc(uid).get();
        return userDoc.exists();
    } catch (error) {
        console.error('Error checking user existence:', error);
        return false;
    }
};

// Create or update user profile in Firestore
export const syncUserProfile = async (uid: string, userData: any) => {
    if (isFirebaseDisabled || !firestore) return;
    try {
        await firestore().collection('users').doc(uid).set({
            ...userData,
            updatedAt: firestore.FieldValue.serverTimestamp(),
        }, { merge: true });
        console.log('User profile synced with Firestore');
    } catch (error) {
        console.error('Error syncing user profile:', error);
    }
};

// Get user profile from Firestore
export const getUserProfile = async (uid: string) => {
    if (isFirebaseDisabled || !firestore) return null;
    try {
        const userDoc = await firestore().collection('users').doc(uid).get();
        if (userDoc.exists()) {
            return userDoc.data();
        }
        return null;
    } catch (error) {
        console.error('Error getting user profile:', error);
        return null;
    }
};
