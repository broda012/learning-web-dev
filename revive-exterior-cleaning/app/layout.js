import { Archivo, Fraunces, Work_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MobileCtaBar from "./components/MobileCtaBar";
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
  title: `${siteConfig.name} | Professional Exterior Cleaning`,
  description:
    "Professional driveway, patio, walkway, and wheelie bin cleaning. Free quotes, careful equipment, and results you can see. Book your cleaning today.",
  openGraph: {
    title: `${siteConfig.name} | Professional Exterior Cleaning`,
    description:
      "Professional exterior cleaning for driveways, patios, walkways, and wheelie bins. Get a free quote today.",
    siteName: siteConfig.name,
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: siteConfig.name,
  description:
    "Professional driveway, patio, walkway, and wheelie bin cleaning services.",
  telephone: siteConfig.phone,
  email: siteConfig.email,
  areaServed: siteConfig.serviceAreas,
  priceRange: "$$",
  makesOffer: [
    "Driveway Cleaning",
    "Bin Cleaning",
    "Patio Cleaning",
    "Path & Walkway Cleaning",
    "Pressure Washing",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${fraunces.variable} ${workSans.variable} ${plexMono.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-(--color-cream) text-(--color-body) antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <Navbar />
        <main className="flex-1 pb-16 md:pb-0">{children}</main>
        <Footer />
        <MobileCtaBar />
      </body>
    </html>
  );
}
