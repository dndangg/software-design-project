import "@/styles/globals.css";
import "../styles/eventManagement.css"; // Import the global css file
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
