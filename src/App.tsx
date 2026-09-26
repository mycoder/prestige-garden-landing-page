import AnnouncementBar from "./components/AnnouncementBar";
import Hero from "./components/Hero";
import TrustStrip from "./components/TrustStrip";
import ProblemSolution from "./components/ProblemSolution";
import Solution from "./components/Solution";
import UsesGrid from "./components/UsesGrid";
import WhyChoose from "./components/WhyChoose";
import ProductShowcase from "./components/ProductShowcase";
import DailyLife from "./components/DailyLife";
import GiftSection from "./components/GiftSection";
import PriceOffer from "./components/PriceOffer";
import OrderSection from "./components/OrderSection";
import DeliveryWarranty from "./components/DeliveryWarranty";
import Specifications from "./components/Specifications";
import FAQ from "./components/FAQ";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
import StickyCTA from "./components/StickyCTA";

export default function App() {
  return (
    <div className="min-h-screen bg-white pb-16 sm:pb-0">
      <AnnouncementBar />

      <main>
        <Hero />
        <TrustStrip />
        <ProblemSolution />
        <Solution />
        <UsesGrid />
        <WhyChoose />
        <ProductShowcase />
        <DailyLife />
        <GiftSection />
        <PriceOffer />
        <OrderSection />
        <DeliveryWarranty />
        <Specifications />
        <FAQ />
        <FinalCTA />
      </main>

      <Footer />
      <StickyCTA />
    </div>
  );
}
