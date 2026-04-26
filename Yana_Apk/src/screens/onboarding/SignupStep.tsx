import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Input, Card } from '../../components/ui';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from '../../theme';
import { TranslationKey } from '../../translations';
import { firebaseAuth } from '../../services/firebase';

const { width } = Dimensions.get('window');
const isSmallDevice = width < 375;

interface SignupStepProps {
    identity: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
    };
    onUpdate: (identity: any) => void;
    onNext: () => void;
    onBack: () => void;
    setConfirmation: (confirmation: any) => void;
    t: (key: TranslationKey) => string;
}

const SignupStep: React.FC<SignupStepProps> = ({
    identity,
    onUpdate,
    onNext,
    onBack,
    setConfirmation,
    t,
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const validatePhone = (phone: string) => {
        const re = /^[+]?[\d\s-()]+$/;
        return phone.length >= 8 && re.test(phone);
    };

    const handleNext = async () => {
        const newErrors: { [key: string]: string } = {};

        if (!identity.firstName.trim()) {
            newErrors.firstName = t('first_name_req');
        }
        if (!identity.lastName.trim()) {
            newErrors.lastName = t('last_name_req');
        }
        if (!identity.email.trim()) {
            newErrors.email = t('email_req');
        } else if (!validateEmail(identity.email)) {
            newErrors.email = t('email_invalid');
        }
        if (!identity.phone.trim()) {
            newErrors.phone = t('phone_req');
        } else if (!validatePhone(identity.phone)) {
            newErrors.phone = t('phone_invalid');
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            setIsLoading(true);
            try {
                // Temporairement désactivé : authentification par SMS
                onNext();
            } catch (error) {
                console.error(error);
                setErrors({ phone: t('loading') }); // Generic error
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={onBack} style={styles.backButton}>
                        <Text style={styles.backIcon}>←</Text>
                    </TouchableOpacity>
                    <Text style={styles.title}>{t('create_account')}</Text>
                    <Text style={styles.subtitle}>
                        {t('signup_subtitle')}
                    </Text>
                </View>

                {/* Form */}
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.row}>
                        <View style={{ flex: 1 }}>
                            <Input
                                label={t('first_name')}
                                placeholder={t('first_name_placeholder')}
                                value={identity.firstName}
                                onChangeText={(text: string) => onUpdate({ ...identity, firstName: text })}
                                error={errors.firstName}
                                leftIcon={<Text style={styles.inputIcon}>👤</Text>}
                            />
                        </View>
                        <View style={{ width: 10 }} />
                        <View style={{ flex: 1 }}>
                            <Input
                                label={t('last_name')}
                                placeholder={t('last_name_placeholder')}
                                value={identity.lastName}
                                onChangeText={(text: string) => onUpdate({ ...identity, lastName: text })}
                                error={errors.lastName}
                                leftIcon={<Text style={styles.inputIcon}>👤</Text>}
                            />
                        </View>
                    </View>

                    <Input
                        label={t('email')}
                        placeholder="votre@email.com"
                        value={identity.email}
                        onChangeText={(text: string) => onUpdate({ ...identity, email: text })}
                        error={errors.email}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        leftIcon={<Text style={styles.inputIcon}>📧</Text>}
                    />

                    <Input
                        label={t('phone')}
                        placeholder="+221 77 123 4567"
                        value={identity.phone}
                        onChangeText={(text: string) => onUpdate({ ...identity, phone: text })}
                        error={errors.phone}
                        keyboardType="phone-pad"
                        leftIcon={<Text style={styles.inputIcon}>📱</Text>}
                    />

                    {/* Social Login Divider */}
                    <View style={styles.divider}>
                        <View style={styles.dividerLine} />
                        <Text style={styles.dividerText}>{t('or_use')}</Text>
                        <View style={styles.dividerLine} />
                    </View>

                    <View style={styles.socialButtonsRow}>
                        <TouchableOpacity
                            style={styles.socialBtn}
                            activeOpacity={0.8}
                            onPress={() => Alert.alert('Information', 'La connexion Google nécessite la configuration de client_id. Utilisez le téléphone pour le test.')}
                        >
                            <Text style={styles.socialIcon}>🔍</Text>
                            <Text style={styles.socialBtnText}>Google</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.socialBtn}
                            activeOpacity={0.8}
                            onPress={() => Alert.alert('Information', 'La connexion Apple sera disponible sur la version iOS.')}
                        >
                            <Text style={styles.socialIcon}>🍎</Text>
                            <Text style={styles.socialBtnText}>Apple</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.loginLink}>
                        <Text style={styles.loginText}>
                            {t('already_member')} <Text style={styles.loginTextBold}>{t('login_action')}</Text>
                        </Text>
                    </TouchableOpacity>
                </ScrollView>

                {/* Footer */}
                <View style={styles.footer}>
                    <Button
                        title={t('discover_yana')}
                        variant="primary"
                        size="lg"
                        fullWidth
                        onPress={handleNext}
                        style={styles.mainBtn}
                    />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FDF7F0',
    },
    header: {
        paddingHorizontal: isSmallDevice ? 20 : 25,
        paddingTop: isSmallDevice ? 15 : 25,
        marginBottom: 10,
    },
    backButton: {
        width: 36,
        height: 36,
        justifyContent: 'center',
        marginBottom: 10,
    },
    backIcon: {
        fontSize: 22,
        color: COLORS.secondary,
        fontWeight: '900',
    },
    title: {
        fontSize: isSmallDevice ? 24 : 32,
        color: COLORS.secondary,
        fontWeight: '900',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        color: COLORS.text.secondary,
        fontWeight: '500',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: isSmallDevice ? 20 : 25,
        paddingTop: 10,
        paddingBottom: 40,
    },
    row: {
        flexDirection: 'row',
        width: '100%',
    },
    inputIcon: {
        fontSize: 18,
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 25,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#E0E0E0',
    },
    dividerText: {
        fontSize: 10,
        color: COLORS.text.tertiary,
        marginHorizontal: 15,
        fontWeight: '900',
        letterSpacing: 1,
    },
    socialButtonsRow: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 20,
    },
    socialBtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.white,
        borderRadius: 20,
        paddingVertical: 15,
        borderWidth: 1.5,
        borderColor: '#F0F0F0',
        ...SHADOWS.sm,
        gap: 10,
    },
    socialIcon: {
        fontSize: 20,
    },
    socialBtnText: {
        fontSize: 14,
        fontWeight: '900',
        color: COLORS.text.primary,
    },
    loginLink: {
        alignItems: 'center',
        marginTop: 20,
    },
    loginText: {
        fontSize: 13,
        color: COLORS.text.secondary,
        fontWeight: '500',
    },
    loginTextBold: {
        color: COLORS.primary,
        fontWeight: '900',
        textDecorationLine: 'underline',
    },
    footer: {
        paddingHorizontal: isSmallDevice ? 20 : 25,
        paddingVertical: 20,
        backgroundColor: COLORS.white,
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
    },
    mainBtn: {
        height: isSmallDevice ? 56 : 64,
        borderRadius: 20,
        ...SHADOWS.md,
    }
});

export default SignupStep;
