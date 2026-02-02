import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WhyPartnerSection from "@/components/WhyPartnerSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import SponsorshipSection from "@/components/SponsorshipSection";
import BankDetailsSection from "@/components/BankDetailsSection";
import DomainsSection from "@/components/DomainsSection";
import TrackRecordSection from "@/components/TrackRecordSection";
import PartnershipBenefitsSection from "@/components/PartnershipBenefitsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Navbar />
      <main>
        <HeroSection />
        <WhyPartnerSection />
        <HowItWorksSection />
        <SponsorshipSection />
        <BankDetailsSection />
        <DomainsSection />
        <TrackRecordSection />
        <PartnershipBenefitsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
