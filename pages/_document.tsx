import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Interview Time Tracker" />
        <meta
          property="og:description"
          content="Track your interview times and schedule efficiently."
        />
        <meta
          property="og:image"
          content="https://interview-time-tracker.vercel.app/preview.png"
        />
        <meta
          property="og:url"
          content="https://interview-time-tracker.vercel.app"
        />
        <meta property="og:type" content="website" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Interview Time Tracker" />
        <meta
          name="twitter:description"
          content="Track your interview times and schedule efficiently."
        />
        <meta
          name="twitter:image"
          content="https://interview-time-tracker.vercel.app/preview.png"
        />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
