import { Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <title>our-journey ::: 나와 우리, 함께 떠나는 여행</title>
        <meta name="og:title" property="og:title" content="our-journey" />
        <meta property="og:description" content="나와 우리, 함께 떠나는 여행" />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_BASE_URL}/image-opengraph.webp`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="our-journey" />
        <meta name="twitter:description" content="나와 우리, 함께 떠나는 여행" />
        <meta name="twitter:image" content={`${process.env.NEXT_PUBLIC_BASE_URL}/image-opengraph.webp`} />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          as="style"
          href="https://cdn.jsdelivr.net/gh/orncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        <Script id="clarity-script" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID}");
          `}
        </Script>
      </Head>
      <body>
        <Main />
        <div id="modal" />
        <NextScript />
        <div id="modal-root" />
      </body>
    </Html>
  );
}
