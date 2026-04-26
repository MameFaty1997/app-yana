import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../components/ui';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from '../../theme';
import { TranslationKey } from '../../translations';
import { syncUserProfile, firebaseAuth } from '../../services/firebase';

const { width } = Dimensions.get('window');
const isSmallDevice = width < 375;

interface VerificationStepProps {
    code: string;
    onCodeChange: (code: string) => void;
    phone: string;
    onNext: () => void;
    onBack: () => void;
    confirmation: any;
    t: (key: TranslationKey) => string;
}

const VerificationStep: React.FC<VerificationStepProps> = ({
    code,
    onCodeChange,
    phone,
    onNext,
    onBack,
    confirmation,
    t,
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [timer, setTimer] = useState(59);
    const [canResend, setCanResend] = useState(false);
    const inputRefs = useRef<(TextInput | null)[]>([]);
    const [digits, setDigits] = useState(['', '', '', '']);

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(interval);
        } else {
            setCanResend(true);
        }
    }, [timer]);

    const handleDigitChange = (index: number, value: string) => {
        if (value.length > 1) {
            value = value[value.length - 1];
        }

        const newDigits = [...digits];
        newDigits[index] = value;
        setDigits(newDigits);
        onCodeChange(newDigits.join(''));

        if (value && index < 3) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleValidate = async () => {
        if (code.length !== 4) return;

        setIsLoading(true);
        setError('');

        try {
            if (confirmation) {
                const userCredential = await confirmation.confirm(code);
                if (userCredential?.user) {
                    onNext();
                }
            } else {
                onNext();
            }
        } catch (err) {
            console.error(err);
            setError(t('invalid_code'));
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (index: number, key: string) => {
        if (key === 'Backspace' && !digits[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleResend = () => {
        setTimer(59);
        setCanResend(false);
        setDigits(['', '', '', '']);
        onCodeChange('');
        inputRefs.current[0]?.focus();
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={onBack} style={styles.backButton}>
                    <Text style={styles.backIcon}>←</Text>
                </TouchableOpacity>
                <Text style={styles.title}>{t('verify_code')}</Text>
                <Text style={styles.subtitle}>
                    {t('sent_by_sms')}{'\n'}
                    <Text style={styles.phone}>{phone}</Text>
                </Text>
            </View>

            {/* OTP Inputs */}
            <View style={styles.content}>
                <Text style={styles.label}>{t('code_4_digits')}</Text>
                <View style={styles.otpContainer}>
                    {[0, 1, 2, 3].map((index) => (
                        <TextInput
                            key={index}
                            ref={(ref: TextInput | null) => { inputRefs.current[index] = ref; }}
                            style={[
                                styles.otpInput,
                                digits[index] && styles.otpInputFilled,
                            ]}
                            value={digits[index]}
                            onChangeText={(value: string) => handleDigitChange(index, value)}
                            onKeyPress={({ nativeEvent }: { nativeEvent: any }) =>
                                handleKeyPress(index, nativeEvent.key)
                            }
                            keyboardType="number-pad"
                            maxLength={1}
                            selectTextOnFocus
                            autoFocus={index === 0}
                        />
                    ))}
                </View>

                {/* Error */}
                {error ? <Text style={styles.errorText}>{error}</Text> : null}

                {/* Resend */}
                <TouchableOpacity
                    onPress={handleResend}
                    disabled={!canResend}
                    style={styles.resendButton}
                >
                    <Text
                        style={[
                            styles.resendText,
                            !canResend && styles.resendTextDisabled,
                        ]}
                    >
                        {canResend
                            ? t('resend_code')
                            : t('resend_timer').replace('{{timer}}', timer.toString())}
                    </Text>
                </TouchableOpacity>

                {/* Help Text */}
                <View style={styles.helpBox}>
                    <Text style={styles.helpIcon}>💡</Text>
                    <Text style={styles.helpText}>
                        {t('help_text_code')}
                    </Text>
                </View>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
                <Button
                    title={isLoading ? t('verifying') : t('validate')}
                    variant="primary"
                    size="lg"
                    fullWidth
                    onPress={handleValidate}
                    disabled={code.length !== 4 || isLoading}
                    style={styles.nextBtn}
                />
            </View>
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
        paddingBottom: 20,
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
        lineHeight: 20,
    },
    phone: {
        color: COLORS.primary,
        fontWeight: '900',
    },
    content: {
        flex: 1,
        paddingHorizontal: isSmallDevice ? 20 : 25,
        justifyContent: 'center',
        paddingBottom: 50,
    },
    label: {
        fontSize: 10,
        color: COLORS.text.tertiary,
        marginBottom: 15,
        textAlign: 'center',
        fontWeight: '900',
        letterSpacing: 2,
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: isSmallDevice ? 8 : 12,
        marginBottom: 30,
    },
    otpInput: {
        width: isSmallDevice ? 55 : 65,
        height: isSmallDevice ? 55 : 65,
        borderWidth: 2,
        borderColor: '#E0E0E0',
        borderRadius: 15,
        backgroundColor: COLORS.white,
        fontSize: 24,
        fontWeight: '900',
        color: COLORS.text.primary,
        textAlign: 'center',
        ...SHADOWS.sm,
    },
    otpInputFilled: {
        borderColor: COLORS.primary,
        backgroundColor: COLORS.secondaryLight,
    },
    resendButton: {
        alignItems: 'center',
        paddingVertical: 10,
    },
    resendText: {
        fontSize: 14,
        color: COLORS.primary,
        fontWeight: '900',
        textDecorationLine: 'underline',
    },
    resendTextDisabled: {
        color: COLORS.text.tertiary,
        textDecorationLine: 'none',
    },
    helpBox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 40,
        padding: 15,
        backgroundColor: 'rgba(255, 150, 51, 0.05)',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(255, 150, 51, 0.1)',
    },
    helpIcon: {
        fontSize: 20,
        marginRight: 12,
    },
    helpText: {
        fontSize: 12,
        color: COLORS.text.secondary,
        flex: 1,
        fontWeight: '500',
        lineHeight: 18,
    },
    footer: {
        paddingHorizontal: isSmallDevice ? 20 : 25,
        paddingVertical: 20,
        backgroundColor: COLORS.white,
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
    },
    nextBtn: {
        height: isSmallDevice ? 56 : 64,
        borderRadius: 20,
    },
    errorText: {
        color: '#E74C3C',
        fontSize: 14,
        fontWeight: '700',
        textAlign: 'center',
        marginTop: -10,
        marginBottom: 20,
    },
});

export default VerificationStep;
