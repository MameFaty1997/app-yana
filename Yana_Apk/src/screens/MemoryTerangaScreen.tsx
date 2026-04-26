import React, { useRef, useMemo } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator, Platform, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import { UserState } from '../types';
import { TranslationKey } from '../translations';
import { SPACING, TYPOGRAPHY, COLORS } from '../theme';
import { MEMORY_TERANGA_HTML_TEMPLATE } from '../services/memoryTerangaTemplate';
import { memoryTerangaDB } from '../data/reference/languages/memoryTerangaDB';
import { getMemoryTerangaImage } from '../data/memoryTerangaImages';
import { Asset } from 'expo-asset';

interface MemoryTerangaScreenProps {
    user: UserState;
    t: (key: TranslationKey) => string;
    onClose: () => void;
}

// Helper component for the game view (cross-platform)
const MemoryTerangaView = ({ html, onMessage, webViewRef }: { html: string, onMessage: (data: any) => void, webViewRef: any }) => {
    if (Platform.OS === 'web') {
        return (
            <iframe
                id="memory-teranga-iframe"
                srcDoc={html}
                style={{ flex: 1, border: 'none', width: '100%', height: '100%' }}
                title="Memory Teranga Game"
                onLoad={(e) => {
                    const win = (e.target as any).contentWindow;
                    if (win) {
                        window.addEventListener('message', (event) => {
                            if (event.source === win) {
                                onMessage({ nativeEvent: { data: JSON.stringify(event.data) } });
                            }
                        });
                    }
                }}
            />
        );
    }

    return (
        <WebView
            ref={webViewRef}
            style={styles.webview}
            source={{ html, baseUrl: Platform.OS === 'android' ? 'file:///android_asset/' : '' }}
            onMessage={onMessage}
            containerStyle={styles.webviewContainer}
            bounces={false}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            originWhitelist={['*']}
            allowFileAccess={true}
            allowFileAccessFromFileURLs={true}
            allowUniversalAccessFromFileURLs={true}
            mixedContentMode="always"
            startInLoadingState={true}
            renderLoading={() => (
                <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                    <ActivityIndicator size="large" color={COLORS.gold} />
                </View>
            )}
        />
    );
};

const resolveImageUrl = (imgName: string) => {
    try {
        let assetModule = getMemoryTerangaImage(imgName);
        console.log(`[MemoryTeranga] resolveImageUrl for ${imgName}: asset =`, assetModule);
        if (!assetModule) {
            console.warn(`[MemoryTeranga] No asset found for ${imgName}`);
            return '';
        }

        const expoAsset = Asset.fromModule(assetModule);
        let uri = expoAsset.uri || '';
        console.log(`[MemoryTeranga] Initial resolved URI for ${imgName} =`, uri);

        if (Platform.OS === 'web' && uri) {
            // Dans une iframe (srcDoc), une URL relative est résolue avec 'about:srcdoc' (qui échoue).
            // On s'assure donc qu'elle devient absolue via window.location.origin
            if (!uri.startsWith('http') && !uri.startsWith('data:')) {
                uri = uri.startsWith('/') ? window.location.origin + uri : window.location.origin + '/' + uri;
                console.log(`[MemoryTeranga] Adjusted web URI for ${imgName} =`, uri);
            }
        }
        return uri;
    } catch (e) {
        console.error(`[MemoryTeranga] Error resolving image ${imgName}:`, e);
        return '';
    }
};

const MemoryTerangaScreen: React.FC<MemoryTerangaScreenProps> = ({ user, t, onClose }) => {
    const webViewRef = useRef<WebView>(null);

    // Inject the data list inside the HTML immediately using javascript
    const finalHtml = useMemo(() => {
        const dbWithImages = memoryTerangaDB.map(item => ({
            ...item,
            img: resolveImageUrl(item.img)
        }));

        return MEMORY_TERANGA_HTML_TEMPLATE.replace(
            '<head>',
            `<head><script>window.__EXT_WORDS__ = ${JSON.stringify(dbWithImages)};</script>`
        );
    }, []);

    const handleMessage = (event: any) => {
        try {
            const data = JSON.parse(event.nativeEvent.data);
            if (data.type === 'QUIT') {
                onClose();
            } else if (data.type === 'GAME_OVER') {
                console.log('Game Over Data:', data);
                // Can track score here later if needed
            }
        } catch (e) {
            console.error('Failed to parse WebView message', e);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={onClose} style={styles.backButton}>
                    <Text style={styles.backIcon}>←</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Memory Teranga</Text>
                <View style={{ width: 40 }} />
            </View>

            <MemoryTerangaView
                html={finalHtml}
                onMessage={handleMessage}
                webViewRef={webViewRef}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0a0a0f',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(240, 192, 64, 0.2)',
        zIndex: 10,
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backIcon: {
        fontSize: 24,
        color: '#f0c040',
        fontWeight: 'bold',
    },
    title: {
        ...TYPOGRAPHY.h3,
        color: '#f0c040',
        fontFamily: 'Orbitron',
    },
    webview: {
        flex: 1,
        backgroundColor: '#0a0a0f',
    },
    webviewContainer: {
        flex: 1,
        backgroundColor: '#0a0a0f',
    }
});

export default MemoryTerangaScreen;
