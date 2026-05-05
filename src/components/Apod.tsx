import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type ApodData = {
  title: string;
  explanation: string;
  url: string;
  hdurl?: string;
  media_type: "image" | "video";
  date: string;
  copyright?: string;
};

const FALLBACK: ApodData = {
  title: "The Pillars of Creation",
  explanation:
    "A view of cold gas and dust in the Eagle Nebula, sculpted by ultraviolet light from nearby young stars. Inside these towers, new stars are being born — a slow process that has been happening for millions of years and will continue for millions more.",
  url: "https://apod.nasa.gov/apod/image/2210/PillarsOfCreation_Webb_960.jpg",
  media_type: "image",
  date: "fallback",
  copyright: "NASA, ESA, CSA, STScI",
};

function toInputDate(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function Apod() {
  const [data, setData] = useState<ApodData | null>(null);
  const [date, setDate] = useState<string>(toInputDate(new Date()));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const ctrl = new AbortController();
    setLoading(true);
    setError(null);
    fetch(
      `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=${date}`,
      { signal: ctrl.signal },
    )
      .then((r) => {
        if (!r.ok) throw new Error(`status ${r.status}`);
        return r.json();
      })
      .then((d: ApodData) => setData(d))
      .catch((e) => {
        if ((e as Error).name === "AbortError") return;
        setError("Couldn't reach NASA right now — showing a classic instead.");
        setData(FALLBACK);
      })
      .finally(() => setLoading(false));
    return () => ctrl.abort();
  }, [date]);

  return (
    <section
      id="today"
      className="relative mx-auto w-full max-w-6xl px-6 py-32 sm:py-40"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="mb-10 flex flex-col items-start gap-3"
      >
        <span className="text-xs uppercase tracking-[0.3em] text-cosmos-glow/80">
          Today's sky · NASA APOD
        </span>
        <h2 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
          What the universe showed us today.
        </h2>
        <p className="max-w-2xl text-white/55">
          Every day, NASA shares a single image of the cosmos with a short note
          from an astronomer. Pick a date — every one of them is a different sky.
        </p>
      </motion.div>

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <label className="text-xs uppercase tracking-[0.25em] text-white/50">
          Date
        </label>
        <input
          type="date"
          value={date}
          max={toInputDate(new Date())}
          min="1995-06-16"
          onChange={(e) => setDate(e.target.value)}
          className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white outline-none transition focus:border-cosmos-glow"
        />
        <button
          onClick={() => setDate(toInputDate(new Date()))}
          className="rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/60 transition hover:border-white/30 hover:text-white"
        >
          Today
        </button>
        <button
          onClick={() => {
            const d = new Date();
            d.setDate(
              d.getDate() - Math.floor(Math.random() * 365 * 25),
            );
            setDate(toInputDate(d));
          }}
          className="rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/60 transition hover:border-white/30 hover:text-white"
        >
          Surprise me
        </button>
      </div>

      <motion.div
        key={data?.date ?? "loading"}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="glass overflow-hidden"
      >
        <div className="grid gap-0 lg:grid-cols-5">
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/40 lg:col-span-3 lg:aspect-auto">
            {loading && (
              <div className="absolute inset-0 grid place-items-center text-xs uppercase tracking-[0.3em] text-white/40">
                receiving signal…
              </div>
            )}
            {data && data.media_type === "image" && (
              <img
                src={data.hdurl ?? data.url}
                alt={data.title}
                loading="lazy"
                className="h-full w-full object-cover"
                onLoad={(e) => (e.currentTarget.style.opacity = "1")}
                style={{
                  opacity: 0,
                  transition: "opacity 1s ease",
                }}
              />
            )}
            {data && data.media_type === "video" && (
              <iframe
                src={data.url}
                title={data.title}
                className="h-full w-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            )}
          </div>

          <div className="flex flex-col gap-4 p-8 lg:col-span-2">
            <div className="text-xs uppercase tracking-[0.3em] text-white/40">
              {data?.date ?? "—"}
            </div>
            <h3 className="text-2xl font-semibold leading-tight text-white">
              {data?.title ?? " "}
            </h3>
            <p className="max-h-[24rem] overflow-y-auto pr-2 text-sm leading-relaxed text-white/65">
              {data?.explanation ?? " "}
            </p>
            {data?.copyright && (
              <div className="mt-auto text-xs text-white/35">
                © {data.copyright}
              </div>
            )}
            {error && (
              <div className="text-xs text-cosmos-ember/80">{error}</div>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
