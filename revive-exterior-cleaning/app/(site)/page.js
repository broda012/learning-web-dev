import Hero from "../components/Hero";
import Services from "../components/Services";
import BeforeAfterSection from "../components/BeforeAfterSection";
import WhyChooseUs from "../components/WhyChooseUs";
import HowItWorks from "../components/HowItWorks";
import QuoteSection from "../components/QuoteSection";
import Gallery from "../components/Gallery";
import ServiceAreas from "../components/ServiceAreas";
import About from "../components/About";
import Faq from "../components/Faq";
import CtaBand from "../components/CtaBand";

export const metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <div>
      <Hero />
      <Services />
      <BeforeAfterSection />
      <WhyChooseUs />
      <HowItWorks />
      <QuoteSection />
      <Gallery />
      <ServiceAreas />
      <About />
      <Faq />
      <CtaBand />
    </div>
  );
}
