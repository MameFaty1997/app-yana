import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    TouchableOpacity,
    Dimensions,
    Alert,
    Share,
    Image,
    Pressable,
} from 'react-native';
import { COLORS, SHADOWS } from '../theme';
import { TranslationKey } from '../translations';
import Bayo from './ui/Bayo';

const { width, height } = Dimensions.get('window');

interface SupportModalProps {
    visible: boolean;
    onClose: () => void;
    t: (key: TranslationKey) => string;
}

const SupportModal: React.FC<SupportModalProps> = ({ visible, onClose, t }) => {
    const handleDonation = (method: string) => {
        Alert.alert(
            t('support_money' as any),
            `L'intégration du paiement par ${method} sera disponible prochainement. Merci pour votre intention !`,
            [{ text: 'OK', onPress: onClose }]
        );
    };

    const handleShareDocs = async () => {
        try {
            await Share.share({
                message: "Je souhaite contribuer à la préservation des langues africaines avec Yana ! Contactez-moi pour partager des ressources.",
                url: 'https://gumbayana.com',
                title: 'Contribuer à Yana'
            });
            onClose();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <Pressable style={styles.dismissArea} onPress={onClose} />
                <View style={styles.content}>
                    <View style={styles.header}>
                        <Bayo emotion="excited" size="md" />
                        <Text style={styles.title}>{t('support_app' as any)}</Text>
                        <Text style={styles.subtitle}>{t('support_app_sub' as any)}</Text>
                    </View>

                    <View style={styles.options}>
                        <TouchableOpacity
                            style={styles.optionCard}
                            onPress={() => handleDonation(t('support_mobile' as any))}
                        >
                            <View style={[styles.iconBox, { backgroundColor: '#FFF3E0' }]}>
                                <Text style={styles.icon}>📱</Text>
                            </View>
                            <View style={styles.optionInfo}>
                                <Text style={styles.optionTitle}>{t('support_mobile' as any)}</Text>
                                <Text style={styles.optionDesc}>Orange Money, Wave, etc.</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.optionCard}
                            onPress={() => handleDonation(t('support_card' as any))}
                        >
                            <View style={[styles.iconBox, { backgroundColor: '#E3F2FD' }]}>
                                <Text style={styles.icon}>💳</Text>
                            </View>
                            <View style={styles.optionInfo}>
                                <Text style={styles.optionTitle}>{t('support_card' as any)}</Text>
                                <Text style={styles.optionDesc}>Visa, Mastercard</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.optionCard}
                            onPress={handleShareDocs}
                        >
                            <View style={[styles.iconBox, { backgroundColor: '#E8F5E9' }]}>
                                <Text style={styles.icon}>📚</Text>
                            </View>
                            <View style={styles.optionInfo}>
                                <Text style={styles.optionTitle}>{t('support_share_docs' as any)}</Text>
                                <Text style={styles.optionDesc}>{t('support_share_docs_sub' as any)}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
                        <Text style={styles.closeBtnText}>{t('back' as any)}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dismissArea: {
        ...StyleSheet.absoluteFillObject,
    },
    content: {
        width: width * 0.85,
        backgroundColor: COLORS.white,
        borderRadius: 30,
        padding: 25,
        alignItems: 'center',
        ...SHADOWS.lg,
    },
    header: {
        alignItems: 'center',
        marginBottom: 25,
    },
    title: {
        fontSize: 22,
        fontWeight: '900',
        color: COLORS.secondary,
        marginTop: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 14,
        color: COLORS.text.tertiary,
        textAlign: 'center',
        marginTop: 5,
        fontWeight: '600',
    },
    options: {
        width: '100%',
        gap: 12,
        marginBottom: 25,
    },
    optionCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8FAFC',
        padding: 15,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    iconBox: {
        width: 45,
        height: 45,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    icon: {
        fontSize: 20,
    },
    optionInfo: {
        flex: 1,
    },
    optionTitle: {
        fontSize: 16,
        fontWeight: '800',
        color: COLORS.secondary,
    },
    optionDesc: {
        fontSize: 12,
        color: COLORS.text.tertiary,
        fontWeight: '500',
    },
    closeBtn: {
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 15,
        backgroundColor: '#F1F5F9',
    },
    closeBtnText: {
        fontSize: 14,
        fontWeight: '800',
        color: COLORS.text.tertiary,
    },
});

export default SupportModal;
