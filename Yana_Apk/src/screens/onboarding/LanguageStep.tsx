import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../components/ui';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from '../../theme';
import { Language } from '../../types';
import { TranslationKey } from '../../translations';

const { width } = Dimensions.get('window');
const isSmallDevice = width < 375;

interface LanguageStepProps {
    selectedLanguage: Language;
    onSelect: (lang: Language) => void;
    onNext: () => void;
    t: (key: TranslationKey) => string;
}

const LANGUAGES = [
    { code: 'fr' as Language, name: 'Français', flag: '🇫🇷' },
    { code: 'en' as Language, name: 'English', flag: '🇬🇧' },
    { code: 'de' as Language, name: 'Deutsch', flag: '🇩🇪' },
    { code: 'ar' as Language, name: 'العربية', flag: '🇸🇦' },
    { code: 'ja' as Language, name: '日本語', flag: '🇯🇵' },
    { code: 'ko' as Language, name: '한국어', flag: '🇰🇷' },
    { code: 'es' as Language, name: 'Español', flag: '🇪🇸' },
];

const getFlagUrl = (code: string): string | undefined => {
    const flagMap: Record<string, string> = {
        'fr': 'fr',
        'en': 'gb',
        'de': 'de',
        'ar': 'sa',
        'ja': 'jp',
        'ko': 'kr',
        'es': 'es',
    };
    const c = flagMap[code];
    return c ? `https://flagcdn.com/w80/${c}.png` : undefined;
};

const LanguageStep: React.FC<LanguageStepProps> = ({
    selectedLanguage,
    onSelect,
    onNext,
    t,
}) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>{t('choose_lang')}</Text>
                <Text style={styles.subtitle}>
                    {t('interface_lang_sub')}
                </Text>

                <ScrollView 
                    style={{ flex: 1 }} 
                    contentContainerStyle={styles.languageGrid}
                    showsVerticalScrollIndicator={false}
                >
                    {LANGUAGES.map((lang) => {
                        const isSelected = selectedLanguage === lang.code;
                        return (
                            <TouchableOpacity
                                key={lang.code}
                                onPress={() => {
                                    onSelect(lang.code);
                                    setTimeout(() => onNext(), 300);
                                }}
                                activeOpacity={0.7}
                                style={styles.gridItem}
                            >
                                <View style={[
                                    styles.languageCard,
                                    isSelected && styles.selectedCard
                                ]}>
                                    <View style={styles.flagCircle}>
                                        {getFlagUrl(lang.code) ? (
                                            <Image source={{ uri: getFlagUrl(lang.code) }} style={styles.flagImage} />
                                        ) : (
                                            <Text style={styles.flag}>{lang.flag}</Text>
                                        )}
                                    </View>
                                    <Text style={[
                                        styles.languageName,
                                        isSelected && styles.selectedText
                                    ]}>
                                        {lang.name}
                                    </Text>
                                    {isSelected && (
                                        <View style={styles.checkmark}>
                                            <Text style={styles.checkmarkIcon}>✓</Text>
                                        </View>
                                    )}
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </View>

            <View style={styles.footer}>
                <Button
                    title={t('start')}
                    variant="primary"
                    size="lg"
                    fullWidth
                    onPress={onNext}
                    disabled={!selectedLanguage}
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
    content: {
        flex: 1,
        paddingHorizontal: isSmallDevice ? 20 : 25,
        justifyContent: 'center',
    },
    title: {
        fontSize: isSmallDevice ? 32 : 40,
        color: COLORS.secondary,
        fontWeight: '900',
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: COLORS.text.secondary,
        textAlign: 'center',
        marginBottom: 40,
        fontWeight: '500',
        lineHeight: 20,
    },
    languageGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    gridItem: {
        width: '48%',
        aspectRatio: 1,
        marginBottom: 15,
    },
    languageCard: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.white,
        borderRadius: 30,
        ...SHADOWS.md,
        borderWidth: 2,
        borderColor: 'transparent',
        position: 'relative',
        padding: 10,
    },
    selectedCard: {
        borderColor: COLORS.primary,
        backgroundColor: COLORS.secondaryLight,
        transform: [{ scale: 1.05 }],
    },
    flagCircle: {
        width: isSmallDevice ? 50 : 65,
        height: isSmallDevice ? 50 : 65,
        borderRadius: 25,
        backgroundColor: '#FDF7F0',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    flag: {
        fontSize: isSmallDevice ? 24 : 32,
    },
    flagImage: {
        width: isSmallDevice ? 36 : 48,
        height: isSmallDevice ? 24 : 32,
        borderRadius: 4,
    },
    languageName: {
        fontSize: isSmallDevice ? 14 : 16,
        color: COLORS.text.primary,
        fontWeight: '900',
        textAlign: 'center',
    },
    selectedText: {
        color: COLORS.primary,
    },
    checkmark: {
        position: 'absolute',
        top: 10,
        right: 10,
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkmarkIcon: {
        color: COLORS.white,
        fontSize: 12,
        fontWeight: '900',
    },
    footer: {
        paddingHorizontal: isSmallDevice ? 20 : 30,
        paddingVertical: 30,
    },
    nextBtn: {
        height: isSmallDevice ? 56 : 64,
        borderRadius: 20,
        ...SHADOWS.md,
    },
});

export default LanguageStep;
