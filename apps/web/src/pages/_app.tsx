import { AppProps } from 'next/app';
import '@mse/fonts.beleren/index.css';
import '@mse/fonts.mplantin/latin.css';
import Head from 'next/head';

import { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import { Layout } from '../components/Layout';
import { RecoilRoot } from 'recoil';
import { GlobalTemplates } from '@mse/ui.card';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { client } from '../client-state/remote';
import { MseThemeProvider } from '../components/MseThemeProvider';
import { SWRConfig } from 'swr';
import { DefaultSeo } from 'next-seo';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const getDefaultLayout = (page: ReactElement) => <Layout>{page}</Layout>;
const opts = { revalidateOnFocus: true, focusThrottleInterval: 5 * 60 };
function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || getDefaultLayout;
  return (
    <SessionContextProvider
      supabaseClient={client}
      initialSession={pageProps.initialSession}
    >
      <DefaultSeo
        openGraph={{
          url: 'https://mse.vercel.app',
          title: "Urza's Workbench",
          description:
            "Urza's Workbench is an unofficial Magic the Gathering™ card editor.",
          images: [{ url: 'https://mse.vercel.app/icons/urzasworkbench.png' }],
          siteName: "Urza's Workbench",
        }}
        twitter={{
          handle: '@handle',
          site: '@site',
          cardType: 'summary_large_image',
        }}
      />
      <SWRConfig value={opts}>
        <RecoilRoot>
          <MseThemeProvider>
            <GlobalTemplates />
            <Head>
              <title>Urza's Workbench</title>
              <meta
                name='viewport'
                content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover'
              />
            </Head>
            {getLayout(<Component {...pageProps} />)}
          </MseThemeProvider>
        </RecoilRoot>
      </SWRConfig>
    </SessionContextProvider>
  );
}
export default MyApp;
