import { motion } from "framer-motion";

const ChronikSection = () => {
  return (
    <section id="chronik" className="relative py-32 px-6">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-tuerkis/10 rounded-full blur-[150px] animate-pulse-glow" />
      
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="font-body text-primary/60 text-sm tracking-[0.4em] uppercase">Kapitel I</span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl title-gradient mt-4 mb-6">
            Der Erste Morgen
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
        </motion.div>

        <div className="space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="card-mystical rounded-2xl p-8 md:p-12"
          >
            <p className="font-body text-xl md:text-2xl leading-relaxed text-foreground/90 italic">
              Bevor Zeit gezählt wurde und bevor Namen Gewicht trugen, lag die Welt im Zwielicht.
            </p>
            <p className="font-body text-lg md:text-xl leading-relaxed text-foreground/70 mt-6">
              Licht existierte, doch es hatte keinen Willen. Schatten war gegenwärtig, doch er herrschte nicht.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="card-mystical rounded-2xl p-8 md:p-12"
          >
            <p className="font-body text-lg md:text-xl leading-relaxed text-foreground/80">
              Aus dem ersten bewussten Morgenstrahl erhob sich <span className="text-primary font-semibold">Lyndria</span>.
            </p>
            <p className="font-body text-lg md:text-xl leading-relaxed text-foreground/70 mt-6">
              Wo ihr Blick ruhte, erhielt Licht Maß. Wo ihr Schritt den Boden berührte, fand der Schatten Grenze.
            </p>
            <p className="font-body text-lg md:text-xl leading-relaxed text-foreground/70 mt-6">
              So entstand das <span className="text-tuerkis">Land des Morgens</span> – kein Paradies, sondern ein Ort des Gleichgewichts.
            </p>
          </motion.div>
        </div>

        {/* Lyndria Description */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-32 text-center"
        >
          <span className="font-body text-primary/60 text-sm tracking-[0.4em] uppercase">Kapitel II</span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl title-gradient mt-4 mb-6">
            Hüterin des Gleichgewichts
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-12" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="card-mystical rounded-2xl p-8 md:p-12"
        >
          <p className="font-body text-lg md:text-xl leading-relaxed text-foreground/80">
            Lyndria war keine ferne Göttin. Sie wandelte unter den Sterblichen, lernte ihre Sehnsucht nach Führung und ihre Neigung zum Extrem.
          </p>
          <p className="font-body text-lg md:text-xl leading-relaxed text-foreground/70 mt-6">
            Sie herrschte nicht durch Furcht, sondern durch <span className="text-primary">Klarheit</span>.
          </p>
          
          <div className="mt-10 grid gap-4">
            <p className="font-body text-lg text-foreground/60 italic">Man nannte sie:</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <span className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20 font-display text-sm text-primary tracking-wide">
                Hüterin des Morgens
              </span>
              <span className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20 font-display text-sm text-primary tracking-wide">
                Oberste Befehlshaberin des Maßes
              </span>
              <span className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20 font-display text-sm text-primary tracking-wide">
                Wächterin über Licht und Schatten
              </span>
            </div>
          </div>

          <blockquote className="mt-10 border-l-2 border-primary/50 pl-6 py-2">
            <p className="font-body text-xl md:text-2xl italic text-foreground/90">
              „Denn der Morgen gehört nicht den Göttern, sondern jenen, die in ihm handeln."
            </p>
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
};

export default ChronikSection;
