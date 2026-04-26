import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../components/ui';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from '../../theme';
import Bayo from '../../components/ui/Bayo';
import { TranslationKey } from '../../translations';

const { width } = Dimensions.get('window');
const isSmallDevice = width < 375;

interface BayoIntroStepProps {
    onNext: () => void;
    t: (key: TranslationKey) => string;
}

const BayoIntroStep: React.FC<BayoIntroStepProps> = ({ onNext, t }) => {
    const bounceAnim = new Animated.Value(0);
    const fadeAnim = new Animated.Value(0);

    useEffect(() => {
        Animated.sequence([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 600,
                useNativeDriver: true,
            }),
            Animated.loop(
                Animated.sequence([
                    Animated.timing(bounceAnim, {
                        toValue: -12,
                        duration: 600,
                        useNativeDriver: true,
                    }),
                    Animated.timing(bounceAnim, {
                        toValue: 0,
                        duration: 600,
                        useNativeDriver: true,
                    }),
                ])
            )
        ]).start();
    }, [bounceAnim, fadeAnim]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                {/* Bayo Mascot */}
                <Animated.View
                    style={[
                        styles.mascotContainer,
                        {
                            opacity: fadeAnim,
                            transform: [{ translateY: bounceAnim }],
                        },
                    ]}
                >
                    <View style={styles.mascotCircle}>
                        <Bayo emotion="motivated" size={isSmallDevice ? "md" : "lg"} />
                    </View>
                    <View style={styles.mascotShadow} />
                </Animated.View>

                {/* Dialogue Bubble */}
                <View style={styles.bubble}>
                    <View style={styles.bubbleTail} />
                    <Text style={styles.greeting}>{t('bayo_greeting')}</Text>
                    <Text style={styles.message}>
                        {t('bayo_message_1')}
                    </Text>
                    <Text style={styles.message}>
                        {t('bayo_message_2')}
                    </Text>
                    <Text style={styles.highlight}>
                        {t('bayo_ready')}
                    </Text>
                </View>

                {/* Features Grid */}
                <View style={styles.features}>
                    <View style={styles.featureCard}>
                        <Text style={styles.featureIcon}>🎯</Text>
                        <Text style={styles.featureText}>{t('feature_perso')}</Text>
                    </View>
                    <View style={styles.featureCard}>
                        <Text style={styles.featureIcon}>🤖</Text>
                        <Text style={styles.featureText}>{t('feature_ia')}</Text>
                    </View>
                    <View style={styles.featureCard}>
                        <Text style={styles.featureIcon}>🏆</Text>
                        <Text style={styles.featureText}>{t('feature_games')}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.footer}>
                <Button
                    title={t('start')}
                    variant="primary"
                    size="lg"
                    fullWidth
                    onPress={onNext}
                    style={styles.nextButton}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FDF7F0',
        paddingHorizontal: isSmallDevice ? 15 : 25,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mascotContainer: {
        alignItems: 'center',
        marginBottom: isSmallDevice ? 15 : 25,
    },
    mascotCircle: {
        width: isSmallDevice ? 110 : 140,
        height: isSmallDevice ? 110 : 140,
        borderRadius: 70,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
        ...SHADOWS.md,
        borderWidth: 4,
        borderColor: COLORS.primary,
        zIndex: 2,
    },
    mascotShadow: {
        width: 60,
        height: 8,
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 4,
        marginTop: 8,
    },
    bubble: {
        backgroundColor: COLORS.white,
        borderRadius: BORDER_RADIUS.xl,
        padding: isSmallDevice ? 15 : 20,
        marginBottom: isSmallDevice ? 20 : 35,
        position: 'relative',
        ...SHADOWS.md,
        width: '100%',
        borderWidth: 1,
        borderColor: '#F0F0F0',
    },
    bubbleTail: {
        position: 'absolute',
        bottom: -15,
        left: '50%',
        marginLeft: -15,
        width: 0,
        height: 0,
        borderLeftWidth: 15,
        borderRightWidth: 15,
        borderTopWidth: 15,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: COLORS.white,
        display: 'none', // Removed tail for cleaner look on small screens
    },
    greeting: {
        fontSize: isSmallDevice ? 18 : 22,
        color: COLORS.secondary,
        fontWeight: '900',
        marginBottom: 8,
        textAlign: 'center',
    },
    message: {
        fontSize: isSmallDevice ? 13 : 15,
        color: COLORS.text.secondary,
        marginBottom: 6,
        lineHeight: isSmallDevice ? 18 : 22,
        textAlign: 'center',
        fontWeight: '500',
    },
    highlight: {
        fontSize: isSmallDevice ? 14 : 16,
        color: COLORS.primary,
        marginTop: 10,
        textAlign: 'center',
        fontWeight: '900',
    },
    features: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
        width: '100%',
    },
    featureCard: {
        backgroundColor: 'rgba(255,150,51,0.08)',
        borderRadius: 15,
        padding: 8,
        alignItems: 'center',
        flex: 1,
        borderWidth: 1,
        borderColor: 'rgba(255,150,51,0.1)',
    },
    featureIcon: {
        fontSize: isSmallDevice ? 18 : 24,
        marginBottom: 4,
    },
    featureText: {
        fontSize: isSmallDevice ? 8 : 10,
        color: COLORS.text.secondary,
        textAlign: 'center',
        fontWeight: '900',
    },
    footer: {
        paddingBottom: 30,
    },
    nextButton: {
        height: isSmallDevice ? 56 : 64,
        borderRadius: 20,
        ...SHADOWS.md,
    }
});

export default BayoIntroStep;
