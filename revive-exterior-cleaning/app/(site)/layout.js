import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MobileCtaBar from "../components/MobileCtaBar";
import { siteConfig } from "../lib/site";

export const metadata = {
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

export default function SiteLayout({ children }) {
  return (
    <div className="flex flex-col flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Navbar />
      <main className="flex-1 pb-16 md:pb-0">{children}</main>
      <Footer />
      <MobileCtaBar />
    </div>
  );
}
