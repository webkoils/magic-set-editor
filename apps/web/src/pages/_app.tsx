import { MseThemeProvider } from 'components/MseThemeProvider';
import { AppProps } from 'next/app';
import '@mse/fonts.beleren/index.css';
import '@mse/fonts.mplantin/latin.css';
function MyApp({ Component, pageProps }: AppProps) {
  const Comp = Component as any;
  return (
    <MseThemeProvider>
      <Comp {...pageProps} />
    </MseThemeProvider>
  );
}
export default MyApp;
