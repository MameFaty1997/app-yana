import React, { useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import SplashStep from './onboarding/SplashStep';
import LanguageStep from './onboarding/LanguageStep';
import BayoIntroStep from './onboarding/BayoIntroStep';
import TargetLanguageStep from './onboarding/TargetLanguageStep';
import GoalStep from './onboarding/GoalStep';
import LevelStep from './onboarding/LevelStep';
import MotivationStep from './onboarding/MotivationStep';
import SignupStep from './onboarding/SignupStep';
import VerificationStep from './onboarding/VerificationStep';
import FriendsStep from './onboarding/FriendsStep';
import { COLORS } from '../theme';
import { Language } from '../types';
import { translations, TranslationKey } from '../translations';


interface OnboardingScreenProps {
    onFinish: (userData: any) => void;
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onFinish }) => {
    // PRD Séquence: Step -1 to 8
    const [step, setStep] = useState(-1);

    // User data state
    const [userData, setUserData] = useState({
        interfaceLang: 'fr' as 'fr' | 'en' | 'de' | 'ar' | 'ja' | 'ko',
        targetLanguage: 'wolof' as Language,
        goal: 10,
        level: 'beginner' as any,
        motivations: [] as string[],
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        age: '',
        code: '',
    });

    const [confirmation, setConfirmation] = useState<any>(null);

    const updateUserData = (newData: Partial<typeof userData>) => {
        setUserData(prev => ({ ...prev, ...newData }));
    };

    // Translation function
    const t = useCallback((key: TranslationKey): string => {
        const lang = userData.interfaceLang || 'fr';
        const langObj = (translations as any)[lang] || translations.fr;
        return langObj[key] || (translations.fr as any)[key];
    }, [userData.interfaceLang]);

    const handleNext = () => {
        if (step === 8) {
            onFinish(userData);
        } else if (step === 6) {
            // Sauter l'étape 7 (Vérification SMS) pour l'instant
            setStep(8);
        } else {
            setStep(prev => prev === -1 ? 0 : prev + 1);
        }
    };

    const handleBack = () => {
        if (step === 8) {
            setStep(6);
        } else {
            setStep(prev => prev - 1);
        }
    };

    const renderStep = () => {
        switch (step) {
            case -1:
                return <SplashStep onStart={handleNext} t={t} />;
            case 0:
                return (
                    <LanguageStep
                        selectedLanguage={userData.interfaceLang as Language}
                        onSelect={(lang) => updateUserData({ interfaceLang: lang as any })}
                        onNext={handleNext}
                        t={t}
                    />
                );
            case 1:
                return <BayoIntroStep onNext={handleNext} t={t} />;
            case 2:
                return (
                    <TargetLanguageStep
                        selectedLanguage={userData.targetLanguage}
                        onSelect={(lang) => updateUserData({ targetLanguage: lang })}
                        onNext={handleNext}
                        onBack={handleBack}
                        t={t}
                    />
                );
            case 3:
                return (
                    <GoalStep
                        selectedGoal={userData.goal}
                        onSelect={(goal) => updateUserData({ goal })}
                        onNext={handleNext}
                        onBack={handleBack}
                        t={t}
                    />
                );
            case 4:
                return (
                    <LevelStep
                        selectedLevel={userData.level}
                        onSelect={(level) => updateUserData({ level })}
                        onNext={handleNext}
                        onBack={handleBack}
                        t={t}
                    />
                );
            case 5:
                return (
                    <MotivationStep
                        selectedMotivations={userData.motivations}
                        onSelect={(motivations) => updateUserData({ motivations })}
                        onNext={handleNext}
                        onBack={handleBack}
                        t={t}
                    />
                );
            case 6:
                return (
                    <SignupStep
                        identity={{
                            firstName: userData.firstName,
                            lastName: userData.lastName,
                            email: userData.email,
                            phone: userData.phone,
                        }}
                        onUpdate={(identity) => updateUserData(identity)}
                        onNext={handleNext}
                        onBack={handleBack}
                        setConfirmation={setConfirmation}
                        t={t}
                    />
                );
            case 7:
                return (
                    <VerificationStep
                        code={userData.code}
                        onCodeChange={(code) => updateUserData({ code })}
                        phone={userData.phone}
                        onNext={handleNext}
                        onBack={handleBack}
                        confirmation={confirmation}
                        t={t}
                    />
                );
            case 8:
                return (
                    <FriendsStep
                        onNext={handleNext}
                        onSkip={handleNext}
                        t={t}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <View style={styles.container}>
            {renderStep()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background.primary,
    },
});

export default OnboardingScreen;
