import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-white/60 backdrop-blur"
      >
        <span className="inline-block h-1.5 w-1.5 animate-twinkle rounded-full bg-cosmos-glow" />
        a small journey through the cosmos
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="text-balance bg-gradient-to-b from-white via-white to-white/40 bg-clip-text text-5xl font-semibold leading-[0.95] tracking-tight text-transparent sm:text-7xl md:text-8xl"
      >
        We are stardust,
        <br />
        looking up at stardust.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="mt-6 max-w-xl text-balance text-base text-white/55 sm:text-lg"
      >
        Stargazer is a tiny, quiet place to remember how strange and large the
        universe is. Today's sky, the scale of everything, and a moment to drift.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.55 }}
        className="mt-10 flex items-center gap-3"
      >
        <a
          href="#today"
          className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-6 py-3 text-sm font-medium text-cosmos-void transition hover:scale-[1.02]"
        >
          Today's sky
          <span className="transition-transform group-hover:translate-x-0.5">→</span>
        </a>
        <a
          href="#scale"
          className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white/80 transition hover:border-white/30 hover:bg-white/5"
        >
          Scale of everything
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-white/30"
      >
        scroll
        <div className="mx-auto mt-3 h-10 w-px bg-gradient-to-b from-white/40 to-transparent" />
      </motion.div>
    </section>
  );
}
