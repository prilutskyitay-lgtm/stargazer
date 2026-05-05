export function Footer() {
  return (
    <footer className="relative border-t border-white/5 px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 text-sm text-white/40 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2">
          <span className="inline-block h-1.5 w-1.5 animate-twinkle rounded-full bg-cosmos-glow" />
          <span className="font-mono text-xs uppercase tracking-[0.3em]">
            stargazer
          </span>
        </div>
        <div className="font-mono text-xs">
          imagery via NASA APOD · made for the curious
        </div>
        <div className="text-xs">
          {new Date().getFullYear()} · keep looking up
        </div>
      </div>
    </footer>
  );
}
