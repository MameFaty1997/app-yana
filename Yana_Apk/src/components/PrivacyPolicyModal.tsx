import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    Pressable,
} from 'react-native';
import { COLORS, SHADOWS } from '../theme';
import { TranslationKey } from '../translations';
import Bayo from './ui/Bayo';

const { width, height } = Dimensions.get('window');

interface PrivacyModalProps {
    visible: boolean;
    onClose: () => void;
    t: (key: TranslationKey) => string;
}

const PrivacyModal: React.FC<PrivacyModalProps> = ({ visible, onClose, t }) => {
    const rules = [
        { title: t('privacy_rule_1_title' as any), text: t('privacy_rule_1_text' as any) },
        { title: t('privacy_rule_2_title' as any), text: t('privacy_rule_2_text' as any) },
        { title: t('privacy_rule_3_title' as any), text: t('privacy_rule_3_text' as any) },
        { title: t('privacy_rule_4_title' as any), text: t('privacy_rule_4_text' as any) },
    ];

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <Pressable style={styles.dismissArea} onPress={onClose} />
                <View style={styles.content}>
                    <View style={styles.header}>
                        <Bayo emotion="thinking" size="md" />
                        <Text style={styles.title}>{t('privacy_content_title' as any)}</Text>
                    </View>

                    <ScrollView
                        style={styles.scroll}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.scrollContent}
                    >
                        {rules.map((rule, index) => (
                            <View key={index} style={styles.ruleContainer}>
                                <Text style={styles.ruleTitle}>{rule.title}</Text>
                                <Text style={styles.ruleText}>{rule.text}</Text>
                            </View>
                        ))}
                    </ScrollView>

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
        width: width * 0.9,
        maxHeight: height * 0.8,
        backgroundColor: COLORS.white,
        borderRadius: 30,
        padding: 25,
        ...SHADOWS.lg,
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: '900',
        color: COLORS.secondary,
        marginTop: 10,
        textAlign: 'center',
    },
    scroll: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 20,
    },
    ruleContainer: {
        marginBottom: 20,
        backgroundColor: '#F0F9FF',
        padding: 15,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#E0F2FE',
    },
    ruleTitle: {
        fontSize: 16,
        fontWeight: '800',
        color: COLORS.secondary,
        marginBottom: 8,
    },
    ruleText: {
        fontSize: 14,
        color: COLORS.text.tertiary,
        lineHeight: 20,
        fontWeight: '500',
    },
    closeBtn: {
        marginTop: 20,
        height: 55,
        borderRadius: 20,
        backgroundColor: COLORS.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        ...SHADOWS.sm,
    },
    closeBtnText: {
        fontSize: 16,
        fontWeight: '900',
        color: COLORS.white,
    },
});

export default PrivacyModal;
