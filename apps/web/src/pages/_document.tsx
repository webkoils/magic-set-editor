import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@mui/styles';
import React from 'react';
class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta name='application-name' content="Urza's Workbench" />
          <meta name='apple-mobile-web-app-capable' content='yes' />
          <meta
            name='apple-mobile-web-app-status-bar-style'
            content='default'
          />
          <meta name='apple-mobile-web-app-title' content="Urza's Workbench" />
          <meta
            name='description'
            content='An unofficial Magic the Gathering card editor.'
          />
          <meta name='format-detection' content='telephone=no' />
          <meta name='mobile-web-app-capable' content='yes' />
          <meta
            name='msapplication-config'
            content='/icons/browserconfig.xml'
          />
          <meta name='msapplication-TileColor' content='#2B5797' />
          <meta name='msapplication-tap-highlight' content='no' />
          <meta name='theme-color' content='#000000' />

          <link rel='apple-touch-icon' href='/icons/urzasworkbench.png' />
          <link
            rel='apple-touch-icon'
            sizes='152x152'
            href='/icons/touch-icon-ipad.png'
          />
          <link
            rel='apple-touch-icon'
            sizes='180x180'
            href='/icons/touch-icon-iphone-retina.png'
          />
          <link
            rel='apple-touch-icon'
            sizes='167x167'
            href='/icons/touch-icon-ipad-retina.png'
          />

          <link
            rel='icon'
            type='image/png'
            sizes='32x32'
            href='/icons/favicon-32x32.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='16x16'
            href='/icons/favicon-16x16.png'
          />
          <link rel='manifest' href='/manifest.json' />
          <link
            rel='mask-icon'
            href='/icons/safari-pinned-tab.svg'
            color='#5bbad5'
          />
          <link rel='shortcut icon' href='/icons/urzasworkbench.png' />

          {/*  <link
            rel='apple-touch-startup-image'
            href='/images/apple_splash_2048.png'
            sizes='2048x2732'
          />
          <link
            rel='apple-touch-startup-image'
            href='/images/apple_splash_1668.png'
            sizes='1668x2224'
          />
          <link
            rel='apple-touch-startup-image'
            href='/images/apple_splash_1536.png'
            sizes='1536x2048'
          />
          <link
            rel='apple-touch-startup-image'
            href='/images/apple_splash_1125.png'
            sizes='1125x2436'
          />
          <link
            rel='apple-touch-startup-image'
            href='/images/apple_splash_1242.png'
            sizes='1242x2208'
          />
          <link
            rel='apple-touch-startup-image'
            href='/images/apple_splash_750.png'
            sizes='750x1334'
          />
          <link
            rel='apple-touch-startup-image'
            href='/images/apple_splash_640.png'
            sizes='640x1136'
          /> */}
        </Head>
        <body>
          <noscript
            dangerouslySetInnerHTML={{
              __html:
                `
                                       <iframe src="https://www.googletagmanager.com/ns.html?id=` +
                process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID +
                `
                                        height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
            }}
          />

          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx) => {
  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => {
        const A = App as any;
        return sheets.collect(<A {...props} />);
      },
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [initialProps.styles, sheets.getStyleElement()],
  };
};

export default MyDocument;
