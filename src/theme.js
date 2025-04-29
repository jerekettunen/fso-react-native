import { Platform } from "react-native";


const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    textTertiary: '#f8f9fa', // Off white color
    primary: '#0366d6',
    appBarColor: '#24292e',
    cardColor: '#e7e7ed',
    errorRed: '#d73a4a',
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: Platform.select({
      ios: 'Arial',
      android: 'Roboto',
      default: 'System',
    }),
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
};

export default theme;