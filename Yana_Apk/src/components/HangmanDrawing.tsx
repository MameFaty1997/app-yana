import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, Circle, G, Line } from 'react-native-svg';
import Animated, {
    useSharedValue,
    useAnimatedProps,
    withTiming,
    useDerivedValue
} from 'react-native-reanimated';
import { theme } from '../tokens/theme';

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedLine = Animated.createAnimatedComponent(Line);

interface HangmanProps {
    errors: number;
    maxErrors: number;
    isVictory: boolean;
}

export const HangmanDrawing = ({ errors, maxErrors, isVictory }: HangmanProps) => {
    const ratio = errors / maxErrors;

    // Shared values for opacities
    const headOpacity = useSharedValue(0);
    const bodyOpacity = useSharedValue(0);
    const leftArmOpacity = useSharedValue(0);
    const rightArmOpacity = useSharedValue(0);
    const leftLegOpacity = useSharedValue(0);
    const rightLegOpacity = useSharedValue(0);
    const ropeOpacity = useSharedValue(0);

    useEffect(() => {
        // Precise 7-step mapping
        headOpacity.value = withTiming(errors >= 1 ? 1 : 0);
        bodyOpacity.value = withTiming(errors >= 2 ? 1 : 0);
        leftArmOpacity.value = withTiming(errors >= 3 ? 1 : 0);
        rightArmOpacity.value = withTiming(errors >= 4 ? 1 : 0);
        leftLegOpacity.value = withTiming(errors >= 5 ? 1 : 0);
        rightLegOpacity.value = withTiming(errors >= 6 ? 1 : 0);
        ropeOpacity.value = withTiming(errors >= 7 ? 1 : 0);
    }, [errors]);

    const headProps = useAnimatedProps(() => ({ opacity: headOpacity.value }));
    const bodyProps = useAnimatedProps(() => ({ opacity: bodyOpacity.value }));
    const leftArmProps = useAnimatedProps(() => ({ opacity: leftArmOpacity.value }));
    const rightArmProps = useAnimatedProps(() => ({ opacity: rightArmOpacity.value }));
    const leftLegProps = useAnimatedProps(() => ({ opacity: leftLegOpacity.value }));
    const rightLegProps = useAnimatedProps(() => ({ opacity: rightLegOpacity.value }));
    const ropeProps = useAnimatedProps(() => ({ opacity: ropeOpacity.value }));

    return (
        <View style={styles.container}>
            <Svg height="160" width="200" viewBox="0 0 200 160">
                {/* Gallows / Gibet (Always visible) */}
                <G stroke={theme.colors.gold} strokeWidth="4" strokeLinecap="round">
                    {/* Base */}
                    <Line x1="40" y1="140" x2="160" y2="140" />
                    {/* Vertical Pole */}
                    <Line x1="60" y1="140" x2="60" y2="20" />
                    {/* Horizontal Bar */}
                    <Line x1="60" y1="20" x2="130" y2="20" />
                    {/* Support Diagonal */}
                    <Line x1="60" y1="50" x2="90" y2="20" />
                </G>

                {/* Rope (Step 7) */}
                <AnimatedLine
                    x1="130" y1="20" x2="130" y2="40"
                    stroke={theme.colors.orange}
                    strokeWidth="3"
                    animatedProps={ropeProps}
                />

                {/* Head (Step 1) */}
                <AnimatedCircle
                    cx="130" cy="55" r="15"
                    stroke={theme.colors.cream}
                    strokeWidth="3"
                    fill="none"
                    animatedProps={headProps}
                />

                {/* Body (Step 2) */}
                <AnimatedLine
                    x1="130" y1="70" x2="130" y2="105"
                    stroke={theme.colors.cream}
                    strokeWidth="3"
                    animatedProps={bodyProps}
                />

                {/* Left Arm (Step 3) */}
                <AnimatedLine
                    x1="130" y1="80" x2="110" y2="95"
                    stroke={theme.colors.cream}
                    strokeWidth="3"
                    strokeLinecap="round"
                    animatedProps={leftArmProps}
                />

                {/* Right Arm (Step 4) */}
                <AnimatedLine
                    x1="130" y1="80" x2="150" y2="95"
                    stroke={theme.colors.cream}
                    strokeWidth="3"
                    strokeLinecap="round"
                    animatedProps={rightArmProps}
                />

                {/* Left Leg (Step 5) */}
                <AnimatedLine
                    x1="130" y1="105" x2="115" y2="130"
                    stroke={theme.colors.cream}
                    strokeWidth="3"
                    strokeLinecap="round"
                    animatedProps={leftLegProps}
                />

                {/* Right Leg (Step 6) */}
                <AnimatedLine
                    x1="130" y1="105" x2="145" y2="130"
                    stroke={theme.colors.cream}
                    strokeWidth="3"
                    strokeLinecap="round"
                    animatedProps={rightLegProps}
                />

                {/* Victory indicator */}
                {isVictory && (
                    <G transform="translate(130, 45)">
                        <Path d="M-5,-5 L5,5 M5,-5 L-5,5" stroke={theme.colors.gold} strokeWidth="2" opacity={0.5} />
                    </G>
                )}
            </Svg>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 15,
        height: 160,
    }
});
