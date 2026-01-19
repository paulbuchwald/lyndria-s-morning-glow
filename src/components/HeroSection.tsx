import { motion } from "framer-motion";
import heroImage from "@/assets/lyndria-hero.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Lyndria - Hüterin des Morgens"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/80" />
      </div>

      {/* Glowing Orb Effect */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] animate-pulse-glow" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <p className="font-body text-primary/80 text-lg md:text-xl tracking-[0.3em] uppercase mb-4">
            Die Chronik des Ersten Morgens
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="font-display text-6xl md:text-8xl lg:text-9xl font-bold title-gradient text-glow mb-6"
        >
          LYNDRIA
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="font-body text-xl md:text-2xl lg:text-3xl text-foreground/80 italic max-w-3xl mx-auto mb-8"
        >
          Hüterin des Morgens • Wächterin über Licht und Schatten
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="#chronik"
            className="group relative px-8 py-4 font-display text-sm tracking-widest uppercase overflow-hidden rounded-lg border-glow"
          >
            <span className="absolute inset-0 bg-primary/10 backdrop-blur-sm border border-primary/30 rounded-lg transition-all duration-500 group-hover:bg-primary/20" />
            <span className="relative z-10 text-primary group-hover:text-primary-glow transition-colors">
              Die Chronik lesen
            </span>
          </a>
          <a
            href="#fuersten"
            className="group px-8 py-4 font-display text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
          >
            Die Vier Fürsten
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="font-body text-sm text-muted-foreground tracking-widest">Entdecke</span>
          <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent animate-pulse" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
