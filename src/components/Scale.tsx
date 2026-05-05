import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Step = {
  size: string;
  name: string;
  blurb: string;
  color: string;
  visual: "person" | "earth" | "sun" | "system" | "lightyear" | "galaxy" | "local" | "universe";
};

const STEPS: Step[] = [
  {
    size: "1.7 m",
    name: "You",
    blurb:
      "About the height of a person. From here, the ground feels still — but you're already moving at 30 km/s around the Sun.",
    color: "#7dd3fc",
    visual: "person",
  },
  {
    size: "12,742 km",
    name: "Earth",
    blurb:
      "Our pale blue dot. Light takes about 0.04 seconds to cross from one side to the other.",
    color: "#7c5cff",
    visual: "earth",
  },
  {
    size: "1.4 million km",
    name: "The Sun",
    blurb:
      "You could fit roughly 1.3 million Earths inside it. It loses 4 million tons of mass every second to keep us warm.",
    color: "#ffb454",
    visual: "sun",
  },
  {
    size: "9 billion km",
    name: "Solar System",
    blurb:
      "Out past Neptune. Voyager 1 — launched in 1977 — only just left this neighborhood a few years ago.",
    color: "#ff7a59",
    visual: "system",
  },
  {
    size: "9.46 trillion km",
    name: "1 Light-Year",
    blurb:
      "The distance light travels in a year. The nearest star to the Sun, Proxima Centauri, is 4.24 of these away.",
    color: "#a78bfa",
    visual: "lightyear",
  },
  {
    size: "100,000 ly",
    name: "Milky Way",
    blurb:
      "Our home galaxy holds 100–400 billion stars. Crossing it at light speed would take 100,000 years.",
    color: "#7c5cff",
    visual: "galaxy",
  },
  {
    size: "10 million ly",
    name: "Local Group",
    blurb:
      "A small cluster of about 80 galaxies — including Andromeda, which is heading toward us at 110 km/s.",
    color: "#7dd3fc",
    visual: "local",
  },
  {
    size: "93 billion ly",
    name: "Observable Universe",
    blurb:
      "Two trillion galaxies of light that has had time to reach us since the beginning. Beyond it: more, but invisible.",
    color: "#fff",
    visual: "universe",
  },
];

function Visual({ step }: { step: Step }) {
  const { visual, color } = step;

  switch (visual) {
    case "person":
      return (
        <div className="relative grid place-items-center">
          <div
            className="h-2 w-2 rounded-full"
            style={{ background: color, boxShadow: `0 0 20px ${color}` }}
          />
          <div className="mt-3 text-[10px] uppercase tracking-[0.3em] text-white/40">
            you are here
          </div>
        </div>
      );
    case "earth":
      return (
        <div
          className="h-24 w-24 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 35% 30%, #7dd3fc, #1e3a8a 70%, #0f172a)",
            boxShadow: "0 0 60px rgba(125,211,252,0.35), inset -10px -8px 30px rgba(0,0,0,0.5)",
          }}
        />
      );
    case "sun":
      return (
        <div
          className="h-44 w-44 rounded-full animate-twinkle"
          style={{
            background: "radial-gradient(circle, #fff7d6, #ffb454 55%, #ff7a59)",
            boxShadow: "0 0 120px rgba(255,180,84,0.55)",
          }}
        />
      );
    case "system":
      return (
        <div className="relative h-64 w-64">
          <div
            className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ background: "#ffb454", boxShadow: "0 0 30px #ffb454" }}
          />
          {[40, 70, 110, 150, 200, 240].map((r, i) => (
            <div
              key={r}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
              style={{
                width: r,
                height: r,
                borderColor: `rgba(255,255,255,${0.04 + i * 0.02})`,
              }}
            />
          ))}
        </div>
      );
    case "lightyear":
      return (
        <div className="relative h-40 w-72">
          <div
            className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2"
            style={{
              background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
            }}
          />
          <div
            className="absolute left-0 top-1/2 h-2 w-2 -translate-y-1/2 animate-[drift_4s_linear_infinite] rounded-full"
            style={{ background: color, boxShadow: `0 0 16px ${color}` }}
          />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.25em] text-white/40">
            photon · 1 year
          </div>
        </div>
      );
    case "galaxy":
      return (
        <div
          className="h-56 w-56 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.9), rgba(124,92,255,0.6) 30%, rgba(124,92,255,0.15) 60%, transparent 75%)",
            filter: "blur(0.5px)",
            transform: "rotate(20deg) scaleY(0.4)",
            boxShadow: "0 0 100px rgba(124,92,255,0.4)",
          }}
        />
      );
    case "local":
      return (
        <div className="relative h-64 w-64">
          {Array.from({ length: 14 }).map((_, i) => {
            const angle = (i / 14) * Math.PI * 2 + i;
            const r = 30 + ((i * 17) % 90);
            const x = Math.cos(angle) * r;
            const y = Math.sin(angle) * r;
            const size = 10 + ((i * 7) % 22);
            return (
              <div
                key={i}
                className="absolute left-1/2 top-1/2 rounded-full"
                style={{
                  width: size,
                  height: size * 0.55,
                  transform: `translate(${x}px, ${y}px) rotate(${i * 30}deg)`,
                  background:
                    "radial-gradient(circle, rgba(255,255,255,0.9), rgba(124,92,255,0.4) 50%, transparent 75%)",
                  filter: "blur(0.4px)",
                }}
              />
            );
          })}
        </div>
      );
    case "universe":
      return (
        <div className="relative h-64 w-64">
          {Array.from({ length: 80 }).map((_, i) => {
            const x = (Math.random() - 0.5) * 240;
            const y = (Math.random() - 0.5) * 240;
            const s = Math.random() * 2 + 0.5;
            return (
              <div
                key={i}
                className="absolute left-1/2 top-1/2 rounded-full bg-white"
                style={{
                  width: s,
                  height: s,
                  transform: `translate(${x}px, ${y}px)`,
                  opacity: 0.2 + Math.random() * 0.8,
                }}
              />
            );
          })}
        </div>
      );
  }
}

export function Scale() {
  const [idx, setIdx] = useState(0);
  const step = useMemo(() => STEPS[idx], [idx]);

  return (
    <section
      id="scale"
      className="relative mx-auto w-full max-w-6xl px-6 py-32 sm:py-40"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="mb-12 flex flex-col items-start gap-3"
      >
        <span className="text-xs uppercase tracking-[0.3em] text-cosmos-ice/80">
          Powers of ten
        </span>
        <h2 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
          Zoom out, slowly.
        </h2>
        <p className="max-w-2xl text-white/55">
          Drag the slider to step through scales from a single human to the
          edge of what we can see. Each step is roughly a hundred times larger
          than the last.
        </p>
      </motion.div>

      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div className="glass relative flex min-h-[24rem] items-center justify-center overflow-hidden p-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={step.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <Visual step={step} />
            </motion.div>
          </AnimatePresence>
        </div>

        <div>
          <div className="mb-2 text-xs uppercase tracking-[0.3em] text-white/40">
            Step {idx + 1} of {STEPS.length}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={step.name}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <div
                className="font-mono text-sm"
                style={{ color: step.color }}
              >
                {step.size}
              </div>
              <h3 className="mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">
                {step.name}
              </h3>
              <p className="mt-4 max-w-md text-white/65">{step.blurb}</p>
            </motion.div>
          </AnimatePresence>

          <input
            type="range"
            min={0}
            max={STEPS.length - 1}
            value={idx}
            onChange={(e) => setIdx(Number(e.target.value))}
            className="cosmos-slider w-full max-w-md"
            aria-label="Scale of the universe"
          />
          <div className="mt-3 flex max-w-md justify-between text-[10px] uppercase tracking-[0.2em] text-white/30">
            <span>human</span>
            <span>universe</span>
          </div>
        </div>
      </div>
    </section>
  );
}
