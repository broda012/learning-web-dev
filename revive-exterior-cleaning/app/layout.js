import { Archivo, Fraunces, Work_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { siteConfig } from "./lib/site";

const archivo = Archivo({
  variable: "--font-archivo",
  weight: ["600", "700", "800", "900"],
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  weight: ["500"],
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://revive-exterior-cleaning.vercel.app"),
  title: siteConfig.name,
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${fraunces.variable} ${workSans.variable} ${plexMono.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-(--color-cream) text-(--color-body) antialiased">
        {children}
      </body>
    </html>
  );
}
