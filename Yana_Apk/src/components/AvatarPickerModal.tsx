import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    TouchableOpacity,
    Image,
    FlatList,
} from 'react-native';
import { COLORS, SHADOWS } from '../theme';

interface AvatarPickerModalProps {
    isVisible: boolean;
    onClose: () => void;
    onSelect: (avatarUrl: string) => void;
}

const PRESET_AVATARS = [
    { url: '👩🏾', label: 'Femme' },
    { url: '👨🏿', label: 'Homme' },
    { url: '🧒🏾', label: 'Enfant' },
    { url: '👧🏿', label: 'Fille' },
    { url: '👴🏿', label: 'Grand-père' },
    { url: '👵🏾', label: 'Grand-mère' },
    { url: '🧕🏾', label: 'Femme voilée' },
    { url: '👳🏾‍♂️', label: 'Homme turban' },
    { url: '🧒🏿', label: 'Garçon' },
];

const AvatarPickerModal: React.FC<AvatarPickerModalProps> = ({ isVisible, onClose, onSelect }) => {
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
                        <Text style={styles.headerTitle}>CHOISIR UN AVATAR</Text>
                        <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                            <Text style={styles.closeText}>✕</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.subtitle}>Personnalise ton profil avec une image qui te ressemble.</Text>

                    <FlatList
                        data={PRESET_AVATARS}
                        numColumns={3}
                        keyExtractor={(item: { url: string; label: string }) => item.url}
                        contentContainerStyle={styles.listContent}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.avatarItem}
                                onPress={() => {
                                    onSelect(item.url);
                                    onClose();
                                }}
                            >
                                {item.url.startsWith('http') ? (
                                    <Image source={{ uri: item.url }} style={styles.avatarImg} />
                                ) : (
                                    <View style={styles.avatarEmojiContainer}>
                                        <Text style={styles.avatarEmoji}>{item.url}</Text>
                                    </View>
                                )}
                            </TouchableOpacity>
                        )}
                    />

                    <TouchableOpacity style={styles.uploadBtn}>
                        <Text style={styles.uploadBtnText}>📷 TÉLÉCHARGER UNE PHOTO</Text>
                    </TouchableOpacity>
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
        padding: 24,
        maxHeight: '70%',
        ...SHADOWS.lg,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '900',
        color: COLORS.secondary,
        letterSpacing: 1,
    },
    subtitle: {
        fontSize: 13,
        color: '#A8927D',
        fontWeight: '600',
        marginBottom: 20,
    },
    closeBtn: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.secondary,
    },
    listContent: {
        paddingBottom: 20,
        alignItems: 'center',
    },
    avatarItem: {
        margin: 10,
        borderRadius: 25,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: '#F5F5F5',
        backgroundColor: '#FFF7ED',
        ...SHADOWS.sm,
    },
    avatarImg: {
        width: 80,
        height: 80,
    },
    avatarEmojiContainer: {
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarEmoji: {
        fontSize: 48,
    },
    uploadBtn: {
        backgroundColor: COLORS.secondary,
        paddingVertical: 16,
        borderRadius: 15,
        alignItems: 'center',
        marginTop: 10,
    },
    uploadBtnText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '900',
        letterSpacing: 1,
    }
});

export default AvatarPickerModal;
