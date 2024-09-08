import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        {/* 메타 데이터 또는 폰트 로딩 등을 설정할 수 있습니다 */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Pretendard:wght@400;600&display=swap" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

