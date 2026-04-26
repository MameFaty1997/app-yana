import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Image,
    Share,
    Platform,
} from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from '../theme';

import { TranslationKey } from '../translations';

interface AddFriendsModalProps {
    isVisible: boolean;
    onClose: () => void;
    userCode: string;
    t: (key: TranslationKey) => string;
}

const AddFriendsModal: React.FC<AddFriendsModalProps> = ({ isVisible, onClose, userCode, t }) => {
    const [searchQuery, setSearchQuery] = useState('');

    // Simulations pour l'exemple
    const suggestedFriends = [
        { id: '1', name: 'Samba Tall', level: '15', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Samba&backgroundColor=FF9633' },
        { id: '2', name: 'Awa Gueye', level: '8', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Awa&backgroundColor=4B3621' },
    ];

    const handleShare = async (platform?: string) => {
        const message = t('share_msg' as TranslationKey).replace('{{code}}', userCode);
        try {
            await Share.share({
                message: message,
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Modal
            visible={isVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>{t('add_friends_title' as TranslationKey)}</Text>
                        <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                            <Text style={styles.closeText}>✕</Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false}>
                        {/* Search Bar */}
                        <View style={styles.searchSection}>
                            <View style={styles.searchBar}>
                                <Text style={styles.searchIcon}>🔍</Text>
                                <TextInput
                                    placeholder={t('search_placeholder' as TranslationKey)}
                                    style={styles.searchInput}
                                    value={searchQuery}
                                    onChangeText={setSearchQuery}
                                />
                            </View>
                        </View>

                        {/* Social Share Section */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>{t('share_code_title' as TranslationKey)}</Text>
                            <View style={styles.codeContainer}>
                                <Text style={styles.userCode}>{userCode}</Text>
                                <TouchableOpacity onPress={() => handleShare()} style={styles.copyBtn}>
                                    <Text style={styles.copyBtnText}>{t('copy_button' as TranslationKey)}</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.socialRow}>
                                <TouchableOpacity
                                    style={[styles.socialBtn, { backgroundColor: '#25D366' }]}
                                    onPress={() => handleShare('whatsapp')}
                                >
                                    <Text style={styles.socialIcon}>💬</Text>
                                    <Text style={styles.socialText}>WhatsApp</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.socialBtn, { backgroundColor: '#E4405F' }]}
                                    onPress={() => handleShare('instagram')}
                                >
                                    <Text style={styles.socialIcon}>📸</Text>
                                    <Text style={styles.socialText}>Instagram</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.socialBtn, { backgroundColor: '#1877F2' }]}
                                    onPress={() => handleShare('facebook')}
                                >
                                    <Text style={styles.socialIcon}>👤</Text>
                                    <Text style={styles.socialText}>Facebook</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Contacts Access Section */}
                        <TouchableOpacity style={styles.contactsCard}>
                            <View style={styles.contactsIconBg}>
                                <Text style={styles.contactsEmoji}>📱</Text>
                            </View>
                            <View style={styles.contactsInfo}>
                                <Text style={styles.contactsTitle}>{t('contacts_phone' as TranslationKey)}</Text>
                                <Text style={styles.contactsSub}>{t('contacts_phone_sub' as TranslationKey)}</Text>
                            </View>
                            <Text style={styles.chevron}>›</Text>
                        </TouchableOpacity>

                        {/* Suggested Friends */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>{t('suggestions_title' as TranslationKey)}</Text>
                            {suggestedFriends.map(friend => (
                                <View key={friend.id} style={styles.friendItem}>
                                    <Image source={{ uri: friend.avatar }} style={styles.friendAvatar} />
                                    <View style={styles.friendDetails}>
                                        <Text style={styles.friendName}>{friend.name}</Text>
                                        <Text style={styles.friendLevel}>{t('level' as TranslationKey)} {friend.level}</Text>
                                    </View>
                                    <TouchableOpacity style={styles.addBtn}>
                                        <Text style={styles.addBtnText}>{t('add_button' as TranslationKey)}</Text>
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        height: '85%',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '900',
        color: COLORS.secondary,
        letterSpacing: 1,
    },
    closeBtn: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.secondary,
    },
    searchSection: {
        marginBottom: 25,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        borderRadius: 20,
        paddingHorizontal: 15,
        height: 45,
    },
    searchIcon: {
        marginRight: 10,
        fontSize: 16,
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.secondary,
    },
    section: {
        marginBottom: 25,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: '900',
        color: COLORS.text.tertiary,
        marginBottom: 15,
        letterSpacing: 1,
    },
    codeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FDF7F0',
        borderRadius: 20,
        padding: 15,
        borderWidth: 2,
        borderColor: COLORS.primary,
        marginBottom: 15,
    },
    userCode: {
        flex: 1,
        fontSize: 24,
        fontWeight: '900',
        color: COLORS.primary,
        letterSpacing: 4,
        textAlign: 'center',
    },
    copyBtn: {
        backgroundColor: COLORS.primary,
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 12,
    },
    copyBtnText: {
        color: '#FFFFFF',
        fontSize: 10,
        fontWeight: '900',
    },
    socialRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 8,
    },
    socialBtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 15,
        gap: 6,
    },
    socialIcon: {
        fontSize: 14,
    },
    socialText: {
        color: '#FFFFFF',
        fontSize: 10,
        fontWeight: '900',
    },
    contactsCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 25,
        padding: 15,
        marginBottom: 25,
        borderWidth: 1,
        borderColor: '#F0F0F0',
        ...SHADOWS.sm,
    },
    contactsIconBg: {
        width: 45,
        height: 45,
        borderRadius: 15,
        backgroundColor: '#E0F2FE',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    contactsEmoji: {
        fontSize: 20,
    },
    contactsInfo: {
        flex: 1,
    },
    contactsTitle: {
        fontSize: 14,
        fontWeight: '900',
        color: COLORS.secondary,
    },
    contactsSub: {
        fontSize: 11,
        color: COLORS.text.tertiary,
        fontWeight: '600',
    },
    chevron: {
        fontSize: 20,
        color: '#D1D1D1',
    },
    friendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 12,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#F5F5F5',
    },
    friendAvatar: {
        width: 45,
        height: 45,
        borderRadius: 15,
        marginRight: 12,
    },
    friendDetails: {
        flex: 1,
    },
    friendName: {
        fontSize: 14,
        fontWeight: '900',
        color: COLORS.secondary,
    },
    friendLevel: {
        fontSize: 11,
        color: COLORS.text.tertiary,
        fontWeight: '600',
    },
    addBtn: {
        backgroundColor: COLORS.secondary,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 12,
    },
    addBtnText: {
        color: '#FFFFFF',
        fontSize: 10,
        fontWeight: '900',
    }
});

export default AddFriendsModal;
