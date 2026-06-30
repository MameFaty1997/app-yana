import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Dimensions, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Bayo } from '../../components/ui';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from '../../theme';
import { Language } from '../../types';
import { LANGUAGES } from '../../constants';
import { TranslationKey } from '../../translations';

import Constants from 'expo-constants';

const { width } = Dimensions.get('window');
const isSmallDevice = width < 375;

interface TargetLanguageStepProps {
    selectedLanguage: Language;
    onSelect: (lang: Language) => void;
    onNext: () => void;
    onBack: () => void;
    t: (key: TranslationKey) => string;
}

const TargetLanguageStep: React.FC<TargetLanguageStepProps> = ({
    selectedLanguage,
    onSelect,
    onNext,
    onBack,
    t,
}) => {
    const [showModal, setShowModal] = useState(false);
    const [unavailableLang, setUnavailableLang] = useState('');
    const displayLanguages = LANGUAGES;

    const handleSelect = (lang: any) => {
        if (lang.isAvailable === false) {
            setUnavailableLang(lang.name);
            setShowModal(true);
            return;
        }
        onSelect(lang.id as Language);
        setTimeout(() => onNext(), 300);
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={onBack} style={styles.backButton}>
                    <Text style={styles.backIcon}>←</Text>
                </TouchableOpacity>
                <Text style={styles.title}>{t('quest_title')}</Text>
                <Text style={styles.subtitle}>{t('quest_subtitle')}</Text>
            </View>

            {/* Languages Grid */}
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.grid}>
                    {displayLanguages.map((lang) => {
                        const isSelected = selectedLanguage === lang.id;
                        const descriptionKey = `lang_desc_${lang.id}` as TranslationKey;
                        return (
                            <TouchableOpacity
                                key={lang.id}
                                onPress={() => handleSelect(lang)}
                                activeOpacity={lang.isAvailable === false ? 0.7 : 0.9}
                                style={styles.cardTouch}
                            >
                                <View style={[
                                    styles.languageCard,
                                    isSelected && { borderColor: COLORS.primary, borderWidth: 3 }
                                ]}>
                                    {/* Character Illustration */}
                                    <View style={styles.characterContainer}>
                                        <Image
                                            source={lang.image}
                                            style={styles.characterImage}
                                            resizeMode="cover"
                                        />

                                        {/* Stylized Corners */}
                                        <View style={[styles.corner, styles.topLeft, { borderColor: COLORS.primary }]} />
                                        <View style={[styles.corner, styles.topRight, { borderColor: COLORS.primary }]} />
                                        <View style={[styles.corner, styles.bottomLeft, { borderColor: COLORS.primary }]} />
                                        <View style={[styles.corner, styles.bottomRight, { borderColor: COLORS.primary }]} />

                                        {lang.isAvailable === false && (
                                            <View style={styles.unavailableOverlay}>
                                                <View style={styles.comingSoonBadge}>
                                                    <Text style={styles.comingSoonText}>Bientôt</Text>
                                                </View>
                                            </View>
                                        )}
                                    </View>

                                    {/* Info Box */}
                                    <View style={styles.infoBox}>
                                        <Text style={[styles.languageName, { color: COLORS.text.primary }]}>
                                            {lang.name}
                                        </Text>
                                        <Text style={styles.descriptionText} numberOfLines={isSmallDevice ? 2 : 3}>
                                            {t(descriptionKey)}
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </ScrollView>

            {/* Footer */}
            <View style={styles.footer}>
                <Button
                    title={t('validate')}
                    variant="primary"
                    size="lg"
                    fullWidth
                    onPress={onNext}
                    disabled={!selectedLanguage}
                />
            </View>

            {/* Unavailable Language Modal */}
            <Modal
                transparent
                visible={showModal}
                animationType="fade"
                onRequestClose={() => setShowModal(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalBayoContainer}>
                            <Bayo emotion="thinking" size="lg" />
                        </View>
                        <Text style={styles.modalTitle}>Langue indisponible</Text>
                        <Text style={styles.modalText}>
                            Nous terminons de peaufiner le cours de {unavailableLang}. Pour l'instant, seul le Wolof est disponible au Sénégal. Restez connectés !
                        </Text>
                        <Button
                            title="Compris !"
                            variant="primary"
                            onPress={() => setShowModal(false)}
                            fullWidth
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FDF7F0',
    },
    header: {
        paddingHorizontal: isSmallDevice ? 15 : 25,
        paddingTop: Constants.statusBarHeight + 20,
        paddingBottom: 20,
    },
    backButton: {
        width: 36,
        height: 36,
        justifyContent: 'center',
        marginBottom: 5,
    },
    backIcon: {
        fontSize: 22,
        color: COLORS.text.primary,
        fontWeight: '900',
    },
    title: {
        fontSize: isSmallDevice ? 22 : 28,
        color: COLORS.secondary,
        fontWeight: '900',
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
        paddingHorizontal: isSmallDevice ? 15 : 20,
        paddingBottom: 40,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    cardTouch: {
        width: '48%',
        aspectRatio: isSmallDevice ? 0.95 : 0.9,
        marginBottom: 15,
    },
    languageCard: {
        flex: 1,
        borderRadius: 25,
        backgroundColor: '#1a1a1a',
        overflow: 'hidden',
        ...SHADOWS.md,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    characterContainer: {
        flex: 1.5,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        backgroundColor: '#2c2c2c',
    },
    characterImage: {
        width: '100%',
        height: '100%',
    },
    corner: {
        position: 'absolute',
        width: 12,
        height: 12,
        borderWidth: 2.5,
    },
    topLeft: {
        top: 10,
        left: 10,
        borderRightWidth: 0,
        borderBottomWidth: 0,
    },
    topRight: {
        top: 10,
        right: 10,
        borderLeftWidth: 0,
        borderBottomWidth: 0,
    },
    bottomLeft: {
        bottom: 10,
        left: 10,
        borderRightWidth: 0,
        borderTopWidth: 0,
    },
    bottomRight: {
        bottom: 10,
        right: 10,
        borderLeftWidth: 0,
        borderTopWidth: 0,
    },
    infoBox: {
        backgroundColor: '#FFFFFF',
        padding: 8,
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        minHeight: isSmallDevice ? 60 : 75,
        justifyContent: 'center',
    },
    languageName: {
        fontSize: isSmallDevice ? 14 : 16,
        fontWeight: '900',
        marginBottom: 2,
        textAlign: 'center',
    },
    descriptionText: {
        textAlign: 'center',
        color: '#666',
        fontSize: isSmallDevice ? 9 : 10,
        lineHeight: 12,
        fontWeight: '500',
    },
    footer: {
        paddingHorizontal: isSmallDevice ? 15 : 25,
        paddingVertical: 15,
        backgroundColor: COLORS.white,
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalContent: {
        backgroundColor: COLORS.white,
        borderRadius: 35,
        width: '100%',
        padding: 25,
        alignItems: 'center',
        ...SHADOWS.lg,
    },
    modalBayoContainer: {
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: '900',
        color: COLORS.secondary,
        textAlign: 'center',
        marginBottom: 10,
    },
    modalText: {
        fontSize: 16,
        color: COLORS.text.secondary,
        textAlign: 'center',
        marginBottom: 25,
        lineHeight: 24,
        fontWeight: '500',
    },
    modalButton: {
        height: 56,
        borderRadius: 20,
    },
    modalCloseLink: {
        marginTop: 20,
        padding: 10,
    },
    modalCloseLinkText: {
        color: COLORS.text.tertiary,
        fontSize: 14,
        fontWeight: '600',
        textDecorationLine: 'underline',
    },
    unavailableOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    comingSoonBadge: {
        backgroundColor: '#FFD700',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
        transform: [{ rotate: '-10deg' }],
        ...SHADOWS.sm,
    },
    comingSoonText: {
        color: '#000',
        fontWeight: '900',
        fontSize: 10,
        textTransform: 'uppercase',
    },
});

export default TargetLanguageStep;
