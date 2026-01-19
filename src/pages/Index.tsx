import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ChronikSection from "@/components/ChronikSection";
import FuerstenSection from "@/components/FuerstenSection";
import ProphezeiungSection from "@/components/ProphezeiungSection";
import ZeitalterSection from "@/components/ZeitalterSection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Ambient Background Particles */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/30 rounded-full animate-float" style={{ animationDelay: "0s" }} />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-primary/20 rounded-full animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute top-2/3 left-1/5 w-1.5 h-1.5 bg-tuerkis/30 rounded-full animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-violett/20 rounded-full animate-float" style={{ animationDelay: "3s" }} />
        <div className="absolute top-1/2 right-1/5 w-2 h-2 bg-blattgruen/20 rounded-full animate-float" style={{ animationDelay: "4s" }} />
      </div>

      <Navigation />
      <HeroSection />
      <ChronikSection />
      <FuerstenSection />
      <ProphezeiungSection />
      <ZeitalterSection />
      <FooterSection />
    </div>
  );
};

export default Index;
