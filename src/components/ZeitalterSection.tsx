import { motion } from "framer-motion";

interface Era {
  name: string;
  description: string;
  status: "past" | "present";
}

const eras: Era[] = [
  {
    name: "Das Zeitalter des Erwachens",
    description: "Lyndria wandelte unter den Sterblichen. Ordnung war Lehre, nicht Zwang.",
    status: "past",
  },
  {
    name: "Das Zeitalter der Sendung",
    description: "Die Fürsten wirkten in der Ferne. Reiche wuchsen unter getrennter Bewahrung.",
    status: "past",
  },
  {
    name: "Das Zeitalter der Prüfungen",
    description: "Die Gegenwart. Lyndria schweigt. Das Gleichgewicht wird nicht mehr geführt, sondern gefordert.",
    status: "present",
  },
];

const ZeitalterSection = () => {
  return (
    <section id="zeitalter" className="relative py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="font-body text-primary/60 text-sm tracking-[0.4em] uppercase">Kapitel VI</span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl title-gradient mt-4 mb-6">
            Die Zeitalter des Morgens
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent md:-translate-x-1/2" />

          <div className="space-y-16">
            {eras.map((era, index) => (
              <motion.div
                key={era.name}
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                className={`relative flex ${index % 2 === 0 ? "md:justify-start" : "md:justify-end"}`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-1/2 top-8 w-3 h-3 rounded-full bg-primary border-2 border-background md:-translate-x-1/2 glow-tuerkis z-10" />

                <div className={`ml-8 md:ml-0 md:w-5/12 ${era.status === "present" ? "card-mystical glow-tuerkis" : "card-mystical"} rounded-2xl p-8`}>
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="font-display text-xl md:text-2xl text-foreground">
                      {era.name}
                    </h3>
                    {era.status === "present" && (
                      <span className="px-3 py-1 rounded-full bg-primary/20 border border-primary/30 font-body text-xs text-primary uppercase tracking-wider">
                        Gegenwart
                      </span>
                    )}
                  </div>
                  <p className="font-body text-lg text-foreground/70 leading-relaxed">
                    {era.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ZeitalterSection;
