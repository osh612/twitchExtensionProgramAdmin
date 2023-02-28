import { StrictMode, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import { CssBaseline, ThemeProvider } from '@mui/material';
import App from './App';
import { GlobalFonts } from './Styles/fonts/fonts';
import { GlobalStyles } from './Styles/GlobalStyles';
import './i18n';
import MUITheme from './Styles/theme/MUITheme';
import { ToastifyContainer } from './components/Toastify/ToasitifyContainer';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RecoilRoot>
    <ThemeProvider theme={MUITheme}>
      <CssBaseline />
      <Suspense fallback={null}>
        <GlobalStyles />
        <GlobalFonts />
        <App />
        <ToastifyContainer />
      </Suspense>
    </ThemeProvider>
  </RecoilRoot>,
);
