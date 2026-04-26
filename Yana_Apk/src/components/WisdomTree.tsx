import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { COLORS, SHADOWS, SPACING } from '../theme';
import { GOLD_CAURI_IMAGE } from '../constants';

interface WisdomFruit {
    id: string;
    question: string;
    author: string;
    difficulty: 'easy' | 'medium' | 'hard';
}

interface WisdomTreeProps {
    fruits: WisdomFruit[];
    onPickFruit: (fruit: WisdomFruit) => void;
}

const WisdomTree: React.FC<WisdomTreeProps> = ({ fruits, onPickFruit }) => {
    return (
        <View style={styles.container}>
            <View style={styles.treeHeader}>
                <Text style={styles.treeTitle}>🌳 L'Arbre à Palabres</Text>
                <Text style={styles.treeSubtitle}>Aidez les autres en échange de Cauris d'Honneur</Text>
            </View>

            <View style={styles.treeVisual}>
                {/* Simple stylized tree representation */}
                <View style={styles.trunk} />
                <View style={[styles.leafCluster, styles.clusterLeft]} />
                <View style={[styles.leafCluster, styles.clusterRight]} />
                <View style={[styles.leafCluster, styles.clusterTop]} />

                {/* Fruits (Questions) */}
                <View style={styles.fruitContainer}>
                    {fruits.map((fruit, idx) => (
                        <TouchableOpacity
                            key={fruit.id}
                            style={[
                                styles.fruit,
                                {
                                    top: (idx % 3) * 40 + 20,
                                    left: (idx % 2) * 60 + 40,
                                }
                            ]}
                            onPress={() => onPickFruit(fruit)}
                        >
                            <Text style={styles.fruitEmoji}>🍊</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.listContainer}
            >
                {fruits.map(fruit => (
                    <TouchableOpacity
                        key={fruit.id}
                        style={styles.fruitCard}
                        onPress={() => onPickFruit(fruit)}
                    >
                        <View style={styles.cardFruitIcon}>
                            <Text style={styles.fruitEmoji}>{fruit.difficulty === 'easy' ? '🍏' : fruit.difficulty === 'medium' ? '🍊' : '🍎'}</Text>
                            <View style={styles.honorBadgeContainer}>
                                <Text style={[styles.honorBadge, { marginRight: 2 }]}>+10 </Text>
                                <Image source={GOLD_CAURI_IMAGE} style={{ width: 10, height: 10 }} resizeMode="contain" />
                            </View>
                        </View>
                        <Text style={styles.cardAuthor}>{fruit.author}</Text>
                        <Text style={styles.cardQuestion} numberOfLines={2}>{fruit.question}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
        backgroundColor: '#FDFCFB',
        borderRadius: 30,
        padding: 20,
        borderWidth: 1,
        borderColor: '#F0EAD6',
        ...SHADOWS.sm,
    },
    treeHeader: {
        marginBottom: 20,
    },
    treeTitle: {
        fontSize: 20,
        fontWeight: '900',
        color: COLORS.secondary,
        marginBottom: 4,
    },
    treeSubtitle: {
        fontSize: 13,
        color: COLORS.text.tertiary,
        fontWeight: '600',
    },
    treeVisual: {
        height: 200,
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginBottom: 20,
        position: 'relative',
    },
    trunk: {
        width: 30,
        height: 100,
        backgroundColor: '#5D4037',
        borderRadius: 5,
    },
    leafCluster: {
        position: 'absolute',
        backgroundColor: '#2E7D32',
        borderRadius: 60,
    },
    clusterTop: {
        width: 140,
        height: 140,
        top: 10,
        opacity: 0.9,
    },
    clusterLeft: {
        width: 100,
        height: 100,
        top: 50,
        left: 60,
        backgroundColor: '#388E3C',
        opacity: 0.8,
    },
    clusterRight: {
        width: 110,
        height: 110,
        top: 40,
        right: 50,
        backgroundColor: '#43A047',
        opacity: 0.8,
    },
    fruitContainer: {
        ...StyleSheet.absoluteFillObject,
    },
    fruit: {
        position: 'absolute',
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#FFB300',
        justifyContent: 'center',
        alignItems: 'center',
        ...SHADOWS.sm,
    },
    fruitEmoji: {
        fontSize: 16,
    },
    listContainer: {
        paddingVertical: 10,
        gap: 15,
    },
    fruitCard: {
        width: 180,
        backgroundColor: COLORS.white,
        borderRadius: 20,
        padding: 15,
        borderWidth: 1,
        borderColor: '#EEEEEE',
        ...SHADOWS.sm,
        position: 'relative', // Added for absolute positioning of cardFruitIcon
        paddingTop: 40, // Adjust padding to make space for the icon
    },
    cardFruitIcon: {
        position: 'absolute',
        top: -20, // Position above the card
        left: 15,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FFB300', // Example background, adjust as needed
        justifyContent: 'center',
        alignItems: 'center',
        ...SHADOWS.sm,
        zIndex: 1, // Ensure it's above the card
    },
    cardAuthor: {
        fontSize: 12,
        fontWeight: '900',
        color: COLORS.primary,
        marginBottom: 6,
    },
    cardQuestion: {
        fontSize: 13,
        color: COLORS.secondary,
        fontWeight: '700',
        height: 40,
    },
    honorBadgeContainer: {
        position: 'absolute',
        top: -10,
        right: -10,
        backgroundColor: 'rgba(255,255,255,0.9)',
        paddingHorizontal: 4,
        paddingVertical: 2,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        ...SHADOWS.sm,
    },
    honorBadge: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#D97706',
    },
});

export default WisdomTree;
