import { widthPercentageToDP as wp2dp, heightPercentageToDP as hp2dp } from 'react-native-responsive-screen';

/**
 * Utility functions for responsive design across mobile and tablet.
 * We'll use width and height percentages for base layout components.
 */

export const wp = (dimension: number | string) => {
  return wp2dp(dimension);
};

export const hp = (dimension: number | string) => {
  return hp2dp(dimension);
};

// Breakpoint for tablet
export const isTablet = wp('100%') >= 768;
