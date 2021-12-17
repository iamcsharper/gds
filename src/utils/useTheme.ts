import { useTheme as useEmotionTheme } from 'emotion-theming';
import { Theme } from '../types/Theme';

/**
 * Custom hook to get your theme object in React components from ThemeProvider.
 */
export const useTheme = (): Theme => useEmotionTheme();
