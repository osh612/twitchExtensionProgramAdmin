import { createTheme } from '@mui/material';
import Bold from '../fonts/SpoqaHanSansNeo-Bold.woff2';
import Light from '../fonts/SpoqaHanSansNeo-Light.woff2';
import Medium from '../fonts/SpoqaHanSansNeo-Medium.woff2';
import Regular from '../fonts/SpoqaHanSansNeo-Regular.woff2';
import Thin from '../fonts/SpoqaHanSansNeo-Thin.woff2';
import { colors } from '../ui';

declare module '@mui/material/styles' {
  interface Palette {
    cancel: Palette['secondary'];
    normal: Palette['secondary'];
    reject: Palette['error'];
    stopping: Palette['error'];
  }
  interface PaletteOptions {
    cancel: PaletteOptions['secondary'];
    normal: PaletteOptions['secondary'];
    reject: PaletteOptions['error'];
    stopping: PaletteOptions['error'];
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    cancel: true;
    normal: true;
    reject: true;
    stopping: true;
  }
}

const theme = createTheme({
  palette: {
    primary: {
      light: '#1AAB84',
      main: colors.main,
      dark: colors.main_hover,
      contrastText: colors.text,
    },
    secondary: {
      main: colors.num_ccc,
    },
    cancel: {
      main: colors.num_444,
      dark: colors.num_555,
      contrastText: colors.num_888,
    },
    normal: {
      main: colors.num_444,
      dark: colors.num_555,
      contrastText: colors.text,
    },
    reject: {
      main: colors.btn_reject,
      dark: colors.btn_reject,
      contrastText: colors.text,
    },
    stopping: {
      main: colors.btn_stopping,
      dark: colors.btn_stopping,
      contrastText: colors.text,
    },
    background: {},
    action: {
      disabledBackground: colors.num_444, // disabled background color
      disabled: colors.num_888, // disabled text color
    },
  },
  typography: {
    htmlFontSize: 15,
    fontFamily: ['SpoqaHanSansNeo', '-apple-system'].join(','),
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `

      @font-face {
        font-family:'SpoqaHanSansNeo';
        src: local('SpoqaHanSansNeo'), url(${Bold}) format('woff2');
        font-display: swap;
        font-weight: 700; 	
        font-style: normal;
      }
    @font-face {
        font-family:'SpoqaHanSansNeo';
        src: local('SpoqaHanSansNeo'), url(${Light}) format('woff2');
        font-display: swap;
        font-weight: 300; 	
        font-style: normal;
      }
    @font-face {
        font-family:'SpoqaHanSansNeo';
        src: local('SpoqaHanSansNeo'), url(${Regular}) format('woff2');  
        font-display: swap;
        font-weight: 400; 		
        font-style: normal;
    }
    @font-face {
        font-family:'SpoqaHanSansNeo';
        src: local('SpoqaHanSansNeo'), url(${Medium}) format('woff2');
        font-display: swap;
        font-weight: 500; 	
        font-style: normal;
    }
    @font-face {
        font-family:'SpoqaHanSansNeo';
        src: local('SpoqaHanSansNeo'), url(${Thin}) format('woff2');
        font-display: swap;
        font-weight: 100; 		
        font-style: normal;
    }
      `,
    },
  },
  spacing: 4,
});

export default theme;
