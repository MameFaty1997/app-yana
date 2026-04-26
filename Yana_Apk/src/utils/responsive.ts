/**
 * Responsive utility for tablet/phone adaptation
 * Centralizes all dimension breakpoints and scaling logic
 */
import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Device type breakpoints
export const isTablet = SCREEN_WIDTH >= 600;
export const isLargeTablet = SCREEN_WIDTH >= 900;
export const isSmallDevice = SCREEN_WIDTH < 375;
export const isExtraSmallDevice = SCREEN_WIDTH < 330;

// Maximum content width on tablet to keep UI phone-like and centered
export const MAX_CONTENT_WIDTH = 600;

// Scale factor: on tablets, elements should be slightly larger than phone
// but NOT proportional to screen width (which would make them huge)
const BASE_WIDTH = 375; // iPhone standard width
const scaleFactor = isTablet
  ? Math.min(SCREEN_WIDTH / BASE_WIDTH, 1.3) // Cap scaling at 1.3x on tablets
  : SCREEN_WIDTH / BASE_WIDTH;

/**
 * Scale a size value proportionally but capped for tablets.
 * Use for font sizes, icon sizes, paddings etc.
 */
export const scale = (size: number): number => {
  const scaled = size * scaleFactor;
  return Math.round(PixelRatio.roundToNearestPixel(scaled));
};

/**
 * Moderate scale - less aggressive scaling for elements that
 * shouldn't grow as much (e.g. small text, borders)
 */
export const moderateScale = (size: number, factor: number = 0.5): number => {
  return Math.round(size + (scale(size) - size) * factor);
};

/**
 * Returns a style object that constrains content to MAX_CONTENT_WIDTH
 * and centers it horizontally on tablets.
 */
export const tabletContentStyle = isTablet
  ? {
      maxWidth: MAX_CONTENT_WIDTH,
      width: '100%' as const,
      alignSelf: 'center' as const,
    }
  : {};

/**
 * Returns width-constrained wrapper style for full-width tablet layouts
 */
export const tabletWrapperStyle = isTablet
  ? {
      paddingHorizontal: Math.round((SCREEN_WIDTH - MAX_CONTENT_WIDTH) / 2),
    }
  : {};

export { SCREEN_WIDTH, SCREEN_HEIGHT };
