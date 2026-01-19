import { motion } from "framer-motion";

const ProphezeiungSection = () => {
  return (
    <section id="prophezeiung" className="relative py-32 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[200px]" />

      <div className="max-w-4xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="font-body text-primary/60 text-sm tracking-[0.4em] uppercase">Kapitel V</span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl title-gradient mt-4 mb-6">
            Die Prophezeiung
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Decorative Border */}
          <div className="absolute inset-0 rounded-3xl border border-primary/20 bg-gradient-to-b from-primary/5 to-transparent" />
          <div className="absolute -inset-px rounded-3xl bg-gradient-to-b from-primary/10 via-transparent to-primary/5 opacity-50" />

          <div className="relative p-10 md:p-16">
            <p className="font-body text-lg text-foreground/60 italic text-center mb-8">
              Bevor die Fürsten auszogen, sprach Lyndria Worte, die nicht für ihr Zeitalter bestimmt waren:
            </p>

            <div className="space-y-6">
              <blockquote className="font-body text-xl md:text-2xl text-center text-foreground/90 italic leading-relaxed">
                „Wenn der Morgen ohne Hoffnung erwacht<br />
                und mein Banner keinen Schatten wirft,<br />
                dann sind die Farben erwacht."
              </blockquote>

              <div className="flex justify-center py-4">
                <div className="w-12 h-px bg-primary/30" />
              </div>

              <div className="grid gap-3 text-center font-body text-lg">
                <p><span className="text-tuerkis">Türkis</span> muss fließen.</p>
                <p><span className="text-violett">Violett</span> muss fühlen.</p>
                <p><span className="text-orange">Orange</span> muss sich zügeln.</p>
                <p><span className="text-blattgruen">Blattgrün</span> muss erinnern.</p>
              </div>

              <div className="flex justify-center py-4">
                <div className="w-12 h-px bg-primary/30" />
              </div>

              <blockquote className="font-body text-xl md:text-2xl text-center text-foreground/90 italic leading-relaxed">
                „Vereinen sie sich im Gleichgewicht,<br />
                endet meine Herrschaft.<br />
                Erhebt sich eine über die anderen,<br />
                <span className="text-destructive/80">endet der Morgen.</span>"
              </blockquote>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProphezeiungSection;
