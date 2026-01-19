import { motion } from "framer-motion";

interface Prince {
  color: string;
  colorClass: string;
  glowClass: string;
  name: string;
  symbol: string;
  meaning: string;
  wappen: string;
}

const princes: Prince[] = [
  {
    color: "Türkis",
    colorClass: "text-tuerkis",
    glowClass: "glow-tuerkis",
    name: "Ordnung in Bewegung",
    symbol: "〰",
    meaning: "Ordnung muss sich bewegen",
    wappen: "Ein fließender Strom unter klarem Himmel",
  },
  {
    color: "Violett",
    colorClass: "text-violett",
    glowClass: "glow-violett",
    name: "Erkenntnis mit Mitgefühl",
    symbol: "◎",
    meaning: "Erkenntnis verlangt Demut",
    wappen: "Ein offenes Auge im Zwielicht",
  },
  {
    color: "Orange",
    colorClass: "text-orange",
    glowClass: "glow-orange",
    name: "Wandel mit Maß",
    symbol: "🜂",
    meaning: "Feuer dient dem Wandel",
    wappen: "Eine gezügelte Flamme im Kreis",
  },
  {
    color: "Blattgrün",
    colorClass: "text-blattgruen",
    glowClass: "glow-blattgruen",
    name: "Leben trotz Vergessen",
    symbol: "❧",
    meaning: "Leben überdauert alles",
    wappen: "Eine tiefe Wurzel im Morgendunst",
  },
];

const FuerstenSection = () => {
  return (
    <section id="fuersten" className="relative py-32 px-6 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-violett/10 rounded-full blur-[150px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-blattgruen/10 rounded-full blur-[150px] animate-pulse-glow" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="font-body text-primary/60 text-sm tracking-[0.4em] uppercase">Kapitel IV</span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl title-gradient mt-4 mb-6">
            Die Vier Fürsten
          </h2>
          <p className="font-body text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto">
            Als das Land wuchs, erkannte Lyndria, dass selbst göttliches Wachen Grenzen hat. So entsandte sie vier Fürsten in die Ferne.
          </p>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-8" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {princes.map((prince, index) => (
            <motion.div
              key={prince.color}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`group card-mystical rounded-2xl p-8 hover:${prince.glowClass} transition-all duration-500`}
            >
              <div className={`text-5xl mb-6 ${prince.colorClass}`}>
                {prince.symbol}
              </div>
              <h3 className={`font-display text-2xl ${prince.colorClass} mb-2`}>
                {prince.color}
              </h3>
              <p className="font-body text-lg text-foreground/80 mb-4">
                {prince.name}
              </p>
              <div className="border-t border-border/50 pt-4 mt-4">
                <p className="font-body text-sm text-muted-foreground mb-2">
                  <span className="text-foreground/60">Wappen:</span> {prince.wappen}
                </p>
                <p className="font-body text-sm italic text-foreground/60">
                  „{prince.meaning}"
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FuerstenSection;
