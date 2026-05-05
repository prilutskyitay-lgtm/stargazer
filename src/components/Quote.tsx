import { motion } from "framer-motion";

export function Quote() {
  return (
    <section className="relative mx-auto w-full max-w-4xl px-6 py-32 text-center sm:py-40">
      <motion.blockquote
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="text-balance text-3xl font-light leading-relaxed tracking-tight text-white/85 sm:text-4xl md:text-5xl"
      >
        "The cosmos is within us. We are made of star-stuff. We are a way for
        the universe to know itself."
      </motion.blockquote>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.4 }}
        className="mt-8 text-xs uppercase tracking-[0.4em] text-white/40"
      >
        — Carl Sagan
      </motion.div>
    </section>
  );
}
