import { Html, Head, Main, NextScript } from "next/document";

// Custom Document component for Next.js that sets up the HTML structure and meta tags
export default function Document() {
  return (
    <Html lang="en"> {/* Specifies the language of the document */}
      <Head>
        {/* Open Graph Meta Tags for better social media sharing */}
        <meta property="og:title" content="Interview Time Tracker" /> {/* Title shown when shared on social media */}
        <meta
          property="og:description"
          content="Track your interview times and schedule efficiently." 
        /> {/* Description shown when shared on social media */}
        <meta
          property="og:image"
          content="https://interview-time-tracker.vercel.app/preview.png" 
        /> {/* Image shown when shared on social media */}
        <meta
          property="og:url"
          content="https://interview-time-tracker.vercel.app" 
        /> {/* URL of the website for Open Graph */}
        <meta property="og:type" content="website" /> {/* Specifies the type of content (website) */}

        {/* Twitter Card Meta Tags for better presentation on Twitter */}
        <meta name="twitter:card" content="summary_large_image" /> {/* Defines the card type on Twitter */}
        <meta name="twitter:title" content="Interview Time Tracker" /> {/* Title for the Twitter card */}
        <meta
          name="twitter:description"
          content="Track your interview times and schedule efficiently." 
        /> {/* Description for the Twitter card */}
        <meta
          name="twitter:image"
          content="https://interview-time-tracker.vercel.app/preview.png" 
        /> {/* Image for the Twitter card */}
      </Head>

      <body>
        <Main /> {/* The main content of the page rendered here */}
        <NextScript /> {/* Scripts required for Next.js */}
      </body>
    </Html>
  );
}
