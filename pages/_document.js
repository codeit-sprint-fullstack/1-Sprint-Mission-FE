import { Html, Head, Main, NextScript } from "next/document";

const domain = "https://codeit.kr";

export default function Document() {
  return (
    <Html>
      <Head>
        {/* 파비콘 */}
        <link rel="icon" href="/favicon_panda.png" type="image/x-icon" />
        
        <meta
          name="description"
          content="판다마켓에서 일상 속 모든 물건을 거래해보세요."
        />
        <meta property="og:title" content="판다마켓" />
        <meta
          property="og:description"
          content="판다마켓에서 일상 속 모든 물건을 거래해보세요."
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={domain} />
        <meta
          property="og:image"
          content={`${domain}/images/logo/logo_panda_img.svg`}
        />

        <meta name="twitter:card" content="/images/logo/logo_panda_img.svg" />
        <meta name="twitter:title" content="판다마켓" />
        <meta
          name="twitter:description"
          content="판다마켓에서 일상 속 모든 물건을 거래해보세요."
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
