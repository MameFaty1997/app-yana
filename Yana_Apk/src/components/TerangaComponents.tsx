import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing, Dimensions, Platform, Image } from 'react-native';
import Svg, { Path, Circle, Defs, LinearGradient as SvgLinearGradient, Stop } from 'react-native-svg';
import { theme } from '../tokens/theme';

const { width, height } = Dimensions.get('window');

// 1. KenteBar
export const KenteBar = () => {
    // A simple representation of a multi-colored decorative bar
    return (
        <View style={styles.kenteBarContainer}>
            <View style={[styles.kenteSegment, { backgroundColor: theme.colors.orange }]} />
            <View style={[styles.kenteSegment, { backgroundColor: theme.colors.gold }]} />
            <View style={[styles.kenteSegment, { backgroundColor: theme.colors.green }]} />
            <View style={[styles.kenteSegment, { backgroundColor: theme.colors.red }]} />
            <View style={[styles.kenteSegment, { backgroundColor: theme.colors.gold }]} />
            <View style={[styles.kenteSegment, { backgroundColor: theme.colors.orange }]} />
        </View>
    );
};

// 2. GoldTitle
export const GoldTitle = ({ title }: { title: string }) => (
    <View style={styles.goldTitleContainer}>
        <Text style={styles.goldTitleText}>◆ {title} ◆</Text>
    </View>
);

// 3. EthnieCard
export const EthnieCard = ({ ethnie, img, onPress }: { ethnie: string, img: any, onPress: () => void }) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.spring(scaleAnim, { toValue: 0.95, useNativeDriver: true }).start();
    };
    const handlePressOut = () => {
        Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }).start();
    };

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={onPress}
            style={styles.ethnieCardTouchable}
        >
            <Animated.View style={[styles.ethnieCard, { transform: [{ scale: scaleAnim }] }]}>
                <Image source={img} style={styles.ethnieImage} resizeMode="contain" />
                <View style={styles.ethnieNameContainer}>
                    <Text style={styles.ethnieName}>{ethnie}</Text>
                </View>
            </Animated.View>
        </TouchableOpacity>
    );
};

// 4. PopupFact
export const PopupFact = ({ fact, isVisible, onClose }: { fact: string, isVisible: boolean, onClose: () => void }) => {
    const slideAnim = useRef(new Animated.Value(200)).current;

    useEffect(() => {
        if (isVisible) {
            Animated.spring(slideAnim, { toValue: 0, useNativeDriver: true }).start();
        } else {
            Animated.timing(slideAnim, { toValue: 400, duration: 300, useNativeDriver: true }).start();
        }
    }, [isVisible]);

    if (!isVisible) return null;

    return (
        <Animated.View style={[styles.popupFact, { transform: [{ translateY: slideAnim }] }]}>
            <Text style={styles.popupFactTitle}>💡 Le Saviez-Vous ?</Text>
            <Text style={styles.popupFactText}>{fact}</Text>
            <TouchableOpacity style={styles.popupCloseBtn} onPress={onClose}>
                <Text style={styles.popupCloseBtnText}>Continuer</Text>
            </TouchableOpacity>
        </Animated.View>
    );
};

// 5. StarBurst
export const StarBurst = ({ isVisible }: { isVisible: boolean }) => {
    const scale = useRef(new Animated.Value(0)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (isVisible) {
            Animated.parallel([
                Animated.sequence([
                    Animated.spring(scale, { toValue: 1.5, friction: 3, useNativeDriver: true }),
                    Animated.timing(scale, { toValue: 1, duration: 200, useNativeDriver: true })
                ]),
                Animated.sequence([
                    Animated.timing(opacity, { toValue: 1, duration: 100, useNativeDriver: true }),
                    Animated.timing(opacity, { toValue: 0, delay: 600, duration: 300, useNativeDriver: true })
                ])
            ]).start();
        } else {
            scale.setValue(0);
            opacity.setValue(0);
        }
    }, [isVisible]);

    if (!isVisible) return null;

    return (
        <Animated.View style={[styles.starBurst, { transform: [{ scale }], opacity }]} pointerEvents="none">
            <Text style={styles.starIcon}>✨</Text>
        </Animated.View>
    );
};

// 6. CornerDeco
export const CornerDeco = () => {
    const renderDeco = (style: any) => (
        <View style={[styles.cornerBox, style]}>
            <Svg height="40" width="40" viewBox="0 0 40 40">
                <Path d="M0 0 L40 0 L40 5 L5 5 L5 40 L0 40 Z" fill={theme.colors.gold} opacity={0.3} />
                <Circle cx="15" cy="15" r="3" fill={theme.colors.gold} opacity={0.6} />
                <Circle cx="25" cy="15" r="2" fill={theme.colors.orange} opacity={0.6} />
                <Circle cx="15" cy="25" r="2" fill={theme.colors.orange} opacity={0.6} />
            </Svg>
        </View>
    );

    return (
        <View style={StyleSheet.absoluteFill} pointerEvents="none">
            {renderDeco({ top: 0, left: 0 })}
            {renderDeco({ top: 0, right: 0, transform: [{ rotate: '90deg' }] })}
            {renderDeco({ bottom: 0, left: 0, transform: [{ rotate: '-90deg' }] })}
            {renderDeco({ bottom: 0, right: 0, transform: [{ rotate: '180deg' }] })}
        </View>
    );
};

// 7. StatPill
export const StatPill = ({ icon, value }: { icon: string, value: string | number }) => (
    <View style={styles.statPill}>
        <Text style={styles.statPillIcon}>{icon}</Text>
        <Text style={styles.statPillText}>{value}</Text>
    </View>
);

// 8. BtnPrimary
export const BtnPrimary = ({ label, text, onPress, disabled = false, style }: any) => (
    <TouchableOpacity
        style={[styles.btnPrimary, disabled && styles.btnDisabled, style]}
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.8}
    >
        <Text style={styles.btnPrimaryText}>{label || text}</Text>
    </TouchableOpacity>
);

// 9. BtnSecondary
export const BtnSecondary = ({ label, text, onPress, disabled = false, style }: any) => (
    <TouchableOpacity
        style={[styles.btnSecondary, disabled && styles.btnDisabled, style]}
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.8}
    >
        <Text style={styles.btnSecondaryText}>{label || text}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    kenteBarContainer: {
        flexDirection: 'row',
        height: 8,
        width: '100%',
    },
    kenteSegment: {
        flex: 1,
    },
    goldTitleContainer: {
        alignItems: 'center',
        marginVertical: 15,
    },
    goldTitleText: {
        fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif-condensed', // Fallback if regular font not loaded
        fontSize: 24,
        fontWeight: 'bold',
        color: theme.colors.goldLight,
        textAlign: 'center',
        textShadowColor: theme.colors.orange,
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 4,
    },
    ethnieCardTouchable: {
        width: '45%',
        marginBottom: 20,
    },
    ethnieCard: {
        backgroundColor: theme.colors.surface,
        borderRadius: theme.radius.md,
        borderWidth: 1,
        borderColor: 'rgba(244, 160, 38, 0.3)',
        overflow: 'hidden',
        alignItems: 'center',
        ...theme.shadow.gold,
    },
    ethnieImage: {
        width: '100%',
        height: 90,
        backgroundColor: theme.colors.surface2,
    },
    ethnieNameContainer: {
        paddingVertical: 10,
        width: '100%',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: 'rgba(244, 160, 38, 0.2)',
    },
    ethnieName: {
        color: theme.colors.gold,
        fontWeight: 'bold',
        fontSize: 14,
        letterSpacing: 1,
    },
    popupFact: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: theme.colors.surface2,
        padding: 20,
        borderRadius: theme.radius.lg,
        borderWidth: 1,
        borderColor: theme.colors.gold,
        ...theme.shadow.gold,
        zIndex: 100,
    },
    popupFactTitle: {
        color: theme.colors.goldLight,
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    popupFactText: {
        color: theme.colors.cream,
        fontSize: 14,
        lineHeight: 20,
        textAlign: 'center',
        marginBottom: 15,
    },
    popupCloseBtn: {
        backgroundColor: theme.colors.orange,
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 20,
        marginTop: 5,
    },
    popupCloseBtnText: {
        color: theme.colors.bg,
        fontWeight: 'bold',
        fontSize: 14,
    },
    starBurst: {
        position: 'absolute',
        top: '40%',
        alignSelf: 'center',
        zIndex: 50,
    },
    starIcon: {
        fontSize: 80,
    },
    cornerBox: {
        position: 'absolute',
        width: 40,
        height: 40,
    },
    statPill: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(244, 160, 38, 0.1)',
        borderWidth: 1,
        borderColor: theme.colors.gold,
        borderRadius: theme.radius.pill,
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    statPillIcon: {
        fontSize: 16,
        marginRight: 6,
    },
    statPillText: {
        color: theme.colors.goldLight,
        fontWeight: 'bold',
        fontSize: 16,
    },
    btnPrimary: {
        backgroundColor: theme.colors.orange, // Simple fallback for gradient
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: theme.radius.pill,
        alignItems: 'center',
        justifyContent: 'center',
        ...theme.shadow.orange,
    },
    btnPrimaryText: {
        color: theme.colors.cream,
        fontWeight: 'bold',
        fontSize: 16,
        letterSpacing: 1,
    },
    btnSecondary: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: theme.colors.gold,
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: theme.radius.pill,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnSecondaryText: {
        color: theme.colors.gold,
        fontWeight: 'bold',
        fontSize: 16,
        letterSpacing: 1,
    },
    btnDisabled: {
        opacity: 0.5,
    }
});
