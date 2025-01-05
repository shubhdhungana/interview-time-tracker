import "../styles/globals.css"; // Import global CSS for the application
import type { AppProps } from "next/app"; // Type definition for AppProps, used in Next.js custom App component

// The custom App component for Next.js to initialize pages
function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />; // Renders the current page with its props
}

export default MyApp; // Exports the MyApp component to be used as the main entry point
