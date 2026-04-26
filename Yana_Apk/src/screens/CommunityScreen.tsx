import * as React from 'react';
import { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    StatusBar,
    TextInput,
    Dimensions,
    Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UserState, Post, PostComment } from '../types';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from '../theme';
import { TranslationKey } from '../translations';
import AddFriendsModal from '../components/AddFriendsModal';
import MarketplaceScreen from './MarketplaceScreen';
import Constants from 'expo-constants';
import AddWordModal from '../components/AddWordModal';
import TongueTwisterModal from '../components/TongueTwisterModal';
import XPProgressBar from '../components/ui/XPProgressBar';
import { GOLD_CAURI_IMAGE } from '../constants';
import VoiceContributionCard from '../components/VoiceContributionCard';

const { width } = Dimensions.get('window');
const isSmallDevice = width < 375;

interface CommunityScreenProps {
    user: UserState;
    setUser: React.Dispatch<React.SetStateAction<UserState>>;
    t: (key: TranslationKey) => string;
}

const CommunityScreen: React.FC<CommunityScreenProps> = ({ user, setUser, t }) => {
    const navigation = useNavigation();
    const [posts, setPosts] = useState<Post[]>([
        {
            id: '1',
            user: 'Fatou Diop',
            level: '12',
            time: t('ago_hours').replace('{{count}}', '2'),
            content: '"Jéréjéf ! Quelqu\'un peut m\'aider sur la prononciation de "Naka sa wa kër" ?"',
            avatar: '👩🏾',
            likes: 24,
            comments: [
                {
                    id: 'c1',
                    user: 'Moussa Sall',
                    avatar: '👨🏿',
                    content: 'C\'est assez simple, il faut bien insister sur le "ë" !',
                    time: t('ago_hours').replace('{{count}}', '1')
                },
                {
                    id: 'c2',
                    user: 'Aminata Touré',
                    avatar: '🧕🏾',
                    content: 'J\'ai posté un audio sur mon profil si tu veux écouter.',
                    time: t('ago_min').replace('{{count}}', '30')
                }
            ],
            hasAudio: true,
        },
        {
            id: '2',
            user: 'Jean-Marc Mendes',
            level: '5',
            time: t('ago_hours').replace('{{count}}', '5'),
            content: 'Enfin fini l\'unité 1 du Serer ! Les bases sont solides maintenant. 🇸🇳',
            avatar: '👨🏾‍🦱',
            likes: 56,
            comments: [
                {
                    id: 'c3',
                    user: 'Bayo',
                    avatar: '🦫',
                    content: 'Félicitations ! L\'unité 2 t\'attend avec impatience. 🦫',
                    time: t('ago_hours').replace('{{count}}', '4')
                }
            ]
        }
    ]);

    const [expandedPosts, setExpandedPosts] = useState<string[]>([]);
    const [isFriendsModalVisible, setIsFriendsModalVisible] = useState(false);
    const [isAddWordModalVisible, setIsAddWordModalVisible] = useState(false);
    const [isTongueTwisterModalVisible, setIsTongueTwisterModalVisible] = useState(false);
    const [isMarketplaceVisible, setIsMarketplaceVisible] = useState(false);

    // Génération d'un code ami fictif pour l'utilisateur
    const userFriendCode = "YANA-" + user.firstName?.substring(0, 2).toUpperCase() + "78";

    const toggleExpand = (postId: string) => {
        if (expandedPosts.includes(postId)) {
            setExpandedPosts(expandedPosts.filter(id => id !== postId));
        } else {
            setExpandedPosts([...expandedPosts, postId]);
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />

            {/* Top Bar Stats */}
            <View style={styles.topStatsBar}>
                <TouchableOpacity
                    style={styles.avatarCircleSmall}
                    onPress={() => (navigation as any).navigate('Profile')}
                >
                    {(!user?.avatar || !user.avatar.startsWith('http')) ? (
                        <Text style={{ fontSize: 24, textAlign: 'center' }}>{user?.avatar || '👩🏾'}</Text>
                    ) : (
                        <Image source={{ uri: user.avatar }} style={styles.avatarSmall} />
                    )}
                </TouchableOpacity>
                <View style={styles.pillsContainer}>
                    <XPProgressBar xp={user.xp || 0} />
                    <View style={styles.statPill}>
                        <View style={[styles.pillIconBg, { backgroundColor: '#FFF3E0' }]}>
                            <Text style={styles.statPillIcon}>☀️</Text>
                        </View>
                        <Text style={styles.statPillValue}>{user.streak || 0}</Text>
                    </View>
                    <View style={styles.statPill}>
                        <View style={[styles.pillIconBg, { backgroundColor: '#FFEBEE' }]}>
                            <Text style={styles.statPillIcon}>❤️</Text>
                        </View>
                        <Text style={[styles.statPillValue, { color: COLORS.heart }]}>{user.hearts || 5}</Text>
                    </View>
                    <TouchableOpacity style={styles.statPill} onPress={() => setIsMarketplaceVisible(true)}>
                        <View style={[styles.pillIconBg, { backgroundColor: '#FFFBEB' }]}>
                            <Image source={GOLD_CAURI_IMAGE} style={{ width: 18, height: 18 }} resizeMode="contain" />
                        </View>
                        <Text style={[styles.statPillValue, { color: '#D97706' }]}>{user.shells || 0}</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView
                style={styles.content}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Header Section */}
                <View style={styles.communityHeader}>
                    <Text style={styles.title}>{t('community')}</Text>
                    <TouchableOpacity
                        style={styles.friendsBtn}
                        onPress={() => setIsFriendsModalVisible(true)}
                    >
                        <Text style={styles.friendsBtnText}>{t('add_friends')}</Text>
                    </TouchableOpacity>
                </View>

                {/* Filters */}
                <View style={styles.filterContainer}>
                    <TouchableOpacity style={[styles.filterBtn, styles.filterBtnActive]}>
                        <Text style={[styles.filterText, styles.filterTextActive]}>{t('trending')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.filterBtn}>
                        <Text style={styles.filterText}>{t('recent')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.filterBtn}>
                        <Text style={styles.filterText}>{t('questions')}</Text>
                    </TouchableOpacity>
                </View>

                {/* Contribution Movement Section */}
                <View style={styles.movementCard}>
                    <View style={styles.movementHeader}>
                        <View style={styles.iconBadge}>
                            <Text style={styles.iconBadgeText}>🌍</Text>
                        </View>
                        <View style={styles.movementTitleContainer}>
                            <Text style={styles.movementTitle}>{t('comm_movement_title' as TranslationKey)}</Text>
                            <Text style={styles.movementSub}>{t('comm_movement_sub' as TranslationKey)}</Text>
                        </View>
                    </View>

                    <View style={styles.contributionBox}>
                        <Text style={styles.contributeTitle}>{t('comm_contribute_title' as TranslationKey)}</Text>
                        <Text style={styles.contributeSub}>
                            {t('comm_contribute_sub' as TranslationKey)}
                        </Text>

                        <View style={styles.actionGrid}>
                            <TouchableOpacity style={styles.actionCard} onPress={() => setIsAddWordModalVisible(true)}>
                                <View style={[styles.actionIconBg, { backgroundColor: '#E0F2FE' }]}>
                                    <Text style={styles.actionIcon}>✍️</Text>
                                </View>
                                <Text style={styles.actionTitle}>{t('comm_add_words_title' as TranslationKey)}</Text>
                                <Text style={styles.actionSub}>{t('comm_add_words_sub' as TranslationKey)}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.actionCard} onPress={() => setIsTongueTwisterModalVisible(true)}>
                                <View style={[styles.actionIconBg, { backgroundColor: '#F0FDF4' }]}>
                                    <Text style={styles.actionIcon}>🌀</Text>
                                </View>
                                <Text style={styles.actionTitle}>{t('comm_tongue_twisters_title' as TranslationKey)}</Text>
                                <Text style={styles.actionSub}>{t('comm_tongue_twisters_sub' as TranslationKey)}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <VoiceContributionCard
                    phrase="Korité Talaata lay doon réne"
                    translation="L'Aïd sera un mardi cette année"
                    language="wol"
                    localAudioSource={require('../../assets/audio/wol_native.wav')}
                    t={t}
                />

                <VoiceContributionCard
                    phrase="Tiga ka di Maninkaw ye."
                    translation="Les cacahuètes sont appréciées des Malinkés"
                    language="bam"
                    localAudioSource={require('../../assets/audio/bam_native.wav')}
                    t={t}
                />

                <VoiceContributionCard
                    phrase="So a ƴettii sappo, a sowii ɗum laabi sappo, tottat maa ko teemedere."
                    translation="Si tu prends dix et le multiplies dix fois, ça donne cent"
                    language="pulaar"
                    localAudioSource={require('../../assets/audio/fuf_native.wav')}
                    t={t}
                />

                {/* Create Post Card */}
                <View style={styles.createPostCard}>
                    <View style={styles.postInputRow}>
                        {(!user?.avatar || !user.avatar.startsWith('http')) ? (
                            <View style={[styles.postAvatar, { justifyContent: 'center', alignItems: 'center' }]}>
                                <Text style={{ fontSize: 24, textAlign: 'center' }}>{user?.avatar || '👩🏾'}</Text>
                            </View>
                        ) : (
                            <Image source={{ uri: user.avatar }} style={styles.postAvatar} />
                        )}
                        <TextInput
                            placeholder={t('post_placeholder')}
                            placeholderTextColor="#A8927D"
                            style={styles.postInput}
                            multiline
                        />
                    </View>

                    <View style={styles.postActionsBar}>
                        <TouchableOpacity style={styles.micBtnSmall}>
                            <View style={styles.micIconCircleSmall}>
                                <Text style={styles.micIconSmall}>🎤</Text>
                            </View>
                            <Text style={styles.micLabelSmall}>{t('vocal')}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.publishBtnActive}>
                            <Text style={styles.publishTextActive}>{t('publish')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Post Feed */}
                {posts.map((post) => {
                    const isExpanded = expandedPosts.includes(post.id);
                    return (
                        <View key={post.id} style={styles.postCard}>
                            <View style={styles.postHeader}>
                                <View style={styles.userInfo}>
                                    {(!post.avatar || !post.avatar.startsWith('http')) ? (
                                        <View style={[styles.postUserAvatar, { backgroundColor: '#FDF7F0', justifyContent: 'center', alignItems: 'center' }]}>
                                            <Text style={{ fontSize: 26, textAlign: 'center' }}>{post.avatar || '👩🏾'}</Text>
                                        </View>
                                    ) : (
                                        <Image source={{ uri: post.avatar }} style={styles.postUserAvatar} />
                                    )}
                                    <View style={styles.userDetails}>
                                        <View style={styles.nameRow}>
                                            <Text style={styles.postUserName}>{post.user}</Text>
                                            <View style={styles.levelBadge}>
                                                <Text style={styles.levelText}>{t('lvl_label')} {post.level}</Text>
                                            </View>
                                        </View>
                                        <Text style={styles.postTime}>{post.time}</Text>
                                    </View>
                                </View>
                                <TouchableOpacity>
                                    <Text style={styles.moreIcon}>•••</Text>
                                </TouchableOpacity>
                            </View>

                            <Text style={styles.postContent}>{post.content}</Text>

                            {post.hasAudio && (
                                <TouchableOpacity style={styles.audioPlayer}>
                                    <View style={styles.playBtn}>
                                        <Text style={styles.playIcon}>▶️</Text>
                                    </View>
                                    <View style={styles.waveForm}>
                                        <View style={[styles.waveLine, { height: 10 }]} />
                                        <View style={[styles.waveLine, { height: 20 }]} />
                                        <View style={[styles.waveLine, { height: 15 }]} />
                                        <View style={[styles.waveLine, { height: 25 }]} />
                                        <View style={[styles.waveLine, { height: 18 }]} />
                                        <View style={[styles.waveLine, { height: 12 }]} />
                                    </View>
                                    <Text style={styles.audioDuration}>0:04</Text>
                                </TouchableOpacity>
                            )}

                            <View style={styles.divider} />

                            <View style={styles.interactionBar}>
                                <TouchableOpacity style={styles.interactBtn}>
                                    <Text style={styles.interactIcon}>❤️</Text>
                                    <Text style={styles.interactLabel}>{post.likes}</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.interactBtn} onPress={() => toggleExpand(post.id)}>
                                    <Text style={styles.interactIcon}>💬</Text>
                                    <Text style={styles.interactLabel}>{post.comments.length}</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.interactBtn}>
                                    <Text style={styles.interactIcon}>🚀</Text>
                                </TouchableOpacity>
                            </View>

                            {/* Comments Section */}
                            {(isExpanded || true) && (
                                <View style={styles.commentsSection}>
                                    {post.comments.slice(0, isExpanded ? post.comments.length : 1).map((comment) => (
                                        <View key={comment.id} style={styles.commentItem}>
                                            {(!comment.avatar || !comment.avatar.startsWith('http')) ? (
                                                <View style={[styles.commentAvatar, { backgroundColor: '#FDF7F0', justifyContent: 'center', alignItems: 'center' }]}>
                                                    <Text style={{ fontSize: 18, textAlign: 'center' }}>{comment.avatar || '👩🏾'}</Text>
                                                </View>
                                            ) : (
                                                <Image source={{ uri: comment.avatar }} style={styles.commentAvatar} />
                                            )}
                                            <View style={styles.commentBubble}>
                                                <View style={styles.commentHeader}>
                                                    <Text style={styles.commentUser}>{comment.user}</Text>
                                                    <Text style={styles.commentTime}>{comment.time}</Text>
                                                </View>
                                                <Text style={styles.commentContent}>{comment.content}</Text>
                                            </View>
                                        </View>
                                    ))}

                                    {!isExpanded && post.comments.length > 1 && (
                                        <TouchableOpacity onPress={() => toggleExpand(post.id)}>
                                            <Text style={styles.viewMoreText}>{t('view_more_comments').replace('{{count}}', (post.comments.length - 1).toString())}</Text>
                                        </TouchableOpacity>
                                    )}

                                    <View style={styles.commentInputRow}>
                                        {(!user?.avatar || !user.avatar.startsWith('http')) ? (
                                            <View style={[styles.myCommentAvatar, { backgroundColor: '#FDF7F0', justifyContent: 'center', alignItems: 'center' }]}>
                                                <Text style={{ fontSize: 18, textAlign: 'center' }}>{user?.avatar || '👩🏾'}</Text>
                                            </View>
                                        ) : (
                                            <Image source={{ uri: user.avatar }} style={styles.myCommentAvatar} />
                                        )}
                                        <TextInput
                                            placeholder={t('comment_placeholder')}
                                            placeholderTextColor="#A8927D"
                                            style={styles.commentInput}
                                        />
                                    </View>
                                </View>
                            )}
                        </View>
                    );
                })}
            </ScrollView>

            <AddFriendsModal
                isVisible={isFriendsModalVisible}
                onClose={() => setIsFriendsModalVisible(false)}
                userCode={userFriendCode}
                t={t}
            />

            <Modal
                visible={isMarketplaceVisible}
                animationType="slide"
                presentationStyle="pageSheet"
                onRequestClose={() => setIsMarketplaceVisible(false)}
            >
                <MarketplaceScreen
                    user={user}
                    setUser={setUser}
                    onClose={() => setIsMarketplaceVisible(false)}
                    t={t}
                />
            </Modal>
            <AddWordModal
                isVisible={isAddWordModalVisible}
                onClose={() => setIsAddWordModalVisible(false)}
                t={t}
            />
            <TongueTwisterModal
                isVisible={isTongueTwisterModalVisible}
                onClose={() => setIsTongueTwisterModalVisible(false)}
                t={t}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FDF7F0',
    },
    topStatsBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SPACING.md,
        paddingTop: Constants.statusBarHeight + 10,
        paddingBottom: SPACING.sm,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#F5F5F5',
    },
    avatarCircleSmall: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: COLORS.secondaryLight,
        borderWidth: 1.5,
        borderColor: COLORS.border.light,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    avatarSmall: {
        width: '100%',
        height: '100%',
    },
    pillsContainer: {
        flexDirection: 'row',
        gap: 4,
    },
    statPill: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingLeft: 4,
        paddingRight: 8,
        paddingVertical: 3,
        borderRadius: BORDER_RADIUS.full,
        borderWidth: 1,
        borderColor: '#F0F0F0',
        ...SHADOWS.sm,
        gap: 6,
    },
    pillIconBg: {
        width: 28,
        height: 28,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    statPillIcon: {
        fontSize: 14,
    },
    statPillValue: {
        fontSize: 12,
        fontWeight: '900',
        color: COLORS.secondary,
    },
    content: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: isSmallDevice ? 15 : 20,
        paddingBottom: 40,
    },
    communityHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 5,
        marginVertical: isSmallDevice ? 15 : 20,
    },
    title: {
        fontSize: isSmallDevice ? 24 : 28,
        fontWeight: '900',
        color: COLORS.secondary,
    },
    friendsBtn: {
        backgroundColor: '#1EBEFF',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 20,
        ...SHADOWS.md,
    },
    friendsBtnText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '900',
    },
    filterContainer: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: 20,
    },
    filterBtn: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingVertical: isSmallDevice ? 12 : 14,
        borderRadius: 20,
        alignItems: 'center',
        ...SHADOWS.sm,
        borderWidth: 1,
        borderColor: '#F0F0F0',
    },
    filterBtnActive: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    filterText: {
        fontSize: isSmallDevice ? 10 : 11,
        fontWeight: '900',
        color: '#A8927D',
    },
    filterTextActive: {
        color: '#FFFFFF',
    },
    createPostCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        padding: isSmallDevice ? 15 : 20,
        marginBottom: 20,
        ...SHADOWS.lg,
    },
    postInputRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 15,
    },
    postAvatar: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: '#FDF7F0',
    },
    postInput: {
        flex: 1,
        marginLeft: 12,
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.secondary,
        paddingTop: 8,
    },
    postActionsBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#FDF7F0',
        paddingTop: 15,
    },
    micBtnSmall: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    micIconCircleSmall: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#FFF3E0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    micIconSmall: {
        fontSize: 14,
    },
    micLabelSmall: {
        fontSize: 10,
        fontWeight: '900',
        color: COLORS.primary,
    },
    publishBtnActive: {
        backgroundColor: COLORS.secondary,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 15,
        ...SHADOWS.md,
    },
    publishTextActive: {
        fontSize: 12,
        fontWeight: '900',
        color: '#FFFFFF',
    },
    postCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        padding: isSmallDevice ? 15 : 20,
        marginBottom: 15,
        ...SHADOWS.md,
    },
    postHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    postUserAvatar: {
        width: 44,
        height: 44,
        borderRadius: 15,
    },
    userDetails: {
        marginLeft: 12,
    },
    nameRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    postUserName: {
        fontSize: 14,
        fontWeight: '900',
        color: COLORS.secondary,
    },
    levelBadge: {
        backgroundColor: '#FFF7ED',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#FFEDD5',
    },
    levelText: {
        fontSize: 8,
        fontWeight: '900',
        color: COLORS.primary,
    },
    postTime: {
        fontSize: 10,
        fontWeight: '600',
        color: '#D1D1D1',
    },
    moreIcon: {
        fontSize: 16,
        color: '#D1D1D1',
    },
    postContent: {
        fontSize: 15,
        fontWeight: '700',
        color: COLORS.secondary,
        lineHeight: 22,
        marginBottom: 15,
    },
    audioPlayer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FDF7F0',
        padding: 10,
        borderRadius: 20,
        marginBottom: 15,
        gap: 12,
    },
    playBtn: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
        ...SHADOWS.sm,
    },
    playIcon: {
        fontSize: 14,
    },
    waveForm: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3,
    },
    waveLine: {
        width: 3,
        backgroundColor: COLORS.primary,
        borderRadius: 1.5,
    },
    audioDuration: {
        fontSize: 10,
        fontWeight: '900',
        color: COLORS.primary,
    },
    divider: {
        height: 1,
        backgroundColor: '#FDF7F0',
        marginBottom: 15,
    },
    interactionBar: {
        flexDirection: 'row',
        gap: 20,
        marginBottom: 15,
    },
    interactBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    interactIcon: {
        fontSize: 18,
    },
    interactLabel: {
        fontSize: 13,
        fontWeight: '800',
        color: '#A8927D',
    },
    commentsSection: {
        backgroundColor: '#FDF7F0',
        borderRadius: 20,
        padding: 12,
    },
    commentItem: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 12,
    },
    commentAvatar: {
        width: 32,
        height: 32,
        borderRadius: 10,
    },
    commentBubble: {
        flex: 1,
        backgroundColor: COLORS.white,
        borderRadius: 15,
        padding: 10,
        ...SHADOWS.sm,
    },
    commentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    commentUser: {
        fontSize: 12,
        fontWeight: '900',
        color: COLORS.secondary,
    },
    commentTime: {
        fontSize: 9,
        fontWeight: '600',
        color: '#D1D1D1',
    },
    commentContent: {
        fontSize: 13,
        fontWeight: '600',
        color: COLORS.secondary,
        lineHeight: 18,
    },
    viewMoreText: {
        fontSize: 11,
        fontWeight: '900',
        color: COLORS.primary,
        textAlign: 'center',
        marginBottom: 10,
    },
    commentInputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginTop: 5,
    },
    myCommentAvatar: {
        width: 28,
        height: 28,
        borderRadius: 9,
    },
    commentInput: {
        flex: 1,
        backgroundColor: COLORS.white,
        borderRadius: 12,
        height: 36,
        paddingHorizontal: 12,
        fontSize: 12,
        fontWeight: '600',
        color: COLORS.secondary,
        ...SHADOWS.sm,
    },
    movementCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        padding: 20,
        marginBottom: 20,
        ...SHADOWS.lg,
        borderWidth: 1,
        borderColor: '#F0F0F0',
    },
    movementHeader: {
        flexDirection: 'row',
        gap: 15,
        marginBottom: 20,
    },
    iconBadge: {
        width: 50,
        height: 50,
        borderRadius: 20,
        backgroundColor: '#FDF7F0',
        justifyContent: 'center',
        alignItems: 'center',
        ...SHADOWS.sm,
    },
    iconBadgeText: {
        fontSize: 24,
    },
    movementTitleContainer: {
        flex: 1,
    },
    movementTitle: {
        fontSize: 18,
        fontWeight: '900',
        color: COLORS.secondary,
        marginBottom: 4,
    },
    movementSub: {
        fontSize: 12,
        color: '#A8927D',
        lineHeight: 18,
        fontWeight: '600',
    },
    contributionBox: {
        backgroundColor: '#FAF5F0',
        borderRadius: 20,
        padding: 15,
    },
    contributeTitle: {
        fontSize: 15,
        fontWeight: '900',
        color: COLORS.primary,
        marginBottom: 4,
    },
    contributeSub: {
        fontSize: 11,
        color: '#A8927D',
        marginBottom: 15,
        fontWeight: '700',
    },
    actionGrid: {
        flexDirection: 'row',
        gap: 10,
    },
    actionCard: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        padding: 12,
        ...SHADOWS.sm,
        alignItems: 'center',
    },
    actionIconBg: {
        width: 36,
        height: 36,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    actionIcon: {
        fontSize: 18,
    },
    actionTitle: {
        fontSize: 11,
        fontWeight: '900',
        color: COLORS.secondary,
        textAlign: 'center',
        marginBottom: 4,
    },
    actionSub: {
        fontSize: 9,
        color: '#A8927D',
        textAlign: 'center',
        fontWeight: '600',
    }
});

export default CommunityScreen;
