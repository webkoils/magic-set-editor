import { AppProps } from 'next/app';
import '@mse/fonts.beleren/index.css';
import '@mse/fonts.mplantin/latin.css';
import Head from 'next/head';

import { ReactElement, ReactNode, useState } from 'react';
import type { NextPage } from 'next';
import { Layout } from '../components/Layout';
import { RecoilRoot } from 'recoil';
import { GlobalTemplates } from '@mse/ui/card';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { supabase } from '@mse/supabase';
import { ClientStateLoader } from '../state/ClientStateLoader';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const getDefaultLayout = (page: ReactElement) => <Layout>{page}</Layout>;

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const [supabaseClient] = useState(() => supabase);

  const getLayout = Component.getLayout || getDefaultLayout;
  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <RecoilRoot>
        <GlobalTemplates />
        <Head>
          <title>Urza's Workbench</title>
          <meta
            name='viewport'
            content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover'
          />
        </Head>
        {getLayout(<Component {...pageProps} />)}
      </RecoilRoot>
    </SessionContextProvider>
  );
}
export default MyApp;
