import "tailwindcss/tailwind.css";
import "../styles/global.css";
import { ThemeProvider } from "next-themes";

//Node version 15.14.0

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
