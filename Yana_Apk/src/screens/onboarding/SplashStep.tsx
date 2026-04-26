import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../components/ui';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from '../../theme';
import Bayo from '../../components/ui/Bayo';
import { TranslationKey } from '../../translations';

const { width, height } = Dimensions.get('window');
const isSmallDevice = width < 375;

interface SplashStepProps {
    onStart: () => void;
    t: (key: TranslationKey) => string;
}

const SplashStep: React.FC<SplashStepProps> = ({ onStart, t }) => {
    const fadeAnim = new Animated.Value(0);
    const scaleAnim = new Animated.Value(0.8);
    const floatAnim = new Animated.Value(0);

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                tension: 40,
                friction: 8,
                useNativeDriver: true,
            }),
        ]).start();

        Animated.loop(
            Animated.sequence([
                Animated.timing(floatAnim, {
                    toValue: -15,
                    duration: 2000,
                    useNativeDriver: true,
                }),
                Animated.timing(floatAnim, {
                    toValue: 0,
                    duration: 2000,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, [fadeAnim, floatAnim, scaleAnim]);

    return (
        <SafeAreaView style={styles.container}>
            <Animated.View
                style={[
                    styles.content,
                    {
                        opacity: fadeAnim,
                        transform: [{ scale: scaleAnim }],
                    },
                ]}
            >
                {/* Mascot Container */}
                <View style={styles.mascotOuterCircle}>
                    <View style={styles.mascotInnerCircle}>
                        <Animated.View style={{ transform: [{ translateY: floatAnim }] }}>
                            <Bayo emotion="happy" size={isSmallDevice ? "lg" : "xl"} />
                        </Animated.View>
                    </View>
                </View>

                {/* App Name */}
                <Text style={styles.logoText}>YANA</Text>

                {/* Slogan Container */}
                <View style={styles.sloganContainer}>
                    <Text style={styles.slogan}>{t('welcome_slogan')}</Text>
                    <View style={styles.sloganUnderline} />
                </View>

                <Text style={styles.subSlogan}>
                    {t('welcome_subtitle')}
                </Text>
            </Animated.View>

            {/* Footer */}
            <View style={styles.footer}>
                <Button
                    title={t('start')}
                    variant="primary"
                    size="lg"
                    fullWidth
                    onPress={onStart}
                    style={styles.startButton}
                />
                <Text style={styles.footerText}>
                    {t('join_yana')}
                </Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FDF7F0',
        padding: isSmallDevice ? 15 : 25,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mascotOuterCircle: {
        width: width * 0.7,
        height: width * 0.7,
        maxHeight: 300,
        maxWidth: 300,
        borderRadius: 150,
        backgroundColor: 'rgba(255, 150, 51, 0.05)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: isSmallDevice ? 15 : 30,
    },
    mascotInnerCircle: {
        width: width * 0.6,
        height: width * 0.6,
        maxHeight: 260,
        maxWidth: 260,
        borderRadius: 130,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
        ...SHADOWS.lg,
        borderWidth: 6,
        borderColor: '#FFE0B2',
    },
    logoText: {
        fontSize: isSmallDevice ? 40 : 56,
        color: COLORS.secondary,
        fontWeight: '900',
        marginBottom: 8,
    },
    sloganContainer: {
        alignItems: 'center',
        marginBottom: 15,
        paddingHorizontal: 20,
    },
    slogan: {
        fontSize: isSmallDevice ? 18 : 22,
        color: COLORS.primary,
        textAlign: 'center',
        fontWeight: '800',
    },
    sloganUnderline: {
        width: 30,
        height: 4,
        backgroundColor: COLORS.primary,
        borderRadius: 2,
        marginTop: 4,
    },
    subSlogan: {
        fontSize: isSmallDevice ? 13 : 15,
        color: COLORS.text.secondary,
        textAlign: 'center',
        maxWidth: '85%',
        lineHeight: 22,
    },
    footer: {
        paddingBottom: 20,
        gap: 15,
    },
    startButton: {
        height: isSmallDevice ? 56 : 64,
        borderRadius: 20,
        ...SHADOWS.md,
    },
    footerText: {
        fontSize: 10,
        color: COLORS.text.tertiary,
        textAlign: 'center',
        fontWeight: '900',
        letterSpacing: 1,
    },
});

export default SplashStep;
