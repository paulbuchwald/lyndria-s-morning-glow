import { motion } from "framer-motion";

const FooterSection = () => {
  return (
    <footer className="relative py-24 px-6 border-t border-border/30">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 rounded-full blur-[150px]" />

      <div className="max-w-4xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="font-display text-3xl md:text-4xl title-gradient mb-6">
            Schlusswort
          </h2>

          <blockquote className="font-body text-xl md:text-2xl italic text-foreground/80 leading-relaxed max-w-2xl mx-auto mb-12">
            „Solange ein Morgen anbricht, wacht Lyndria. Und solange Menschen bereit sind, Maß über Macht zu stellen, wird das Licht bleiben."
          </blockquote>

          <div className="w-24 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-12" />

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center gap-8 mb-12">
            <a href="#chronik" className="font-body text-muted-foreground hover:text-primary transition-colors">
              Die Chronik
            </a>
            <a href="#fuersten" className="font-body text-muted-foreground hover:text-primary transition-colors">
              Die Fürsten
            </a>
            <a href="#prophezeiung" className="font-body text-muted-foreground hover:text-primary transition-colors">
              Prophezeiung
            </a>
            <a href="#zeitalter" className="font-body text-muted-foreground hover:text-primary transition-colors">
              Zeitalter
            </a>
          </nav>

          <p className="font-body text-sm text-muted-foreground/60">
            Die Chronik des Ersten Morgens • Lyndria
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default FooterSection;
