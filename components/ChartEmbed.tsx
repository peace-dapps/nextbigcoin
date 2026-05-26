import { CA, LAUNCHED } from "@/lib/config";

export default function ChartEmbed() {
  const hasCA = CA && !CA.startsWith("REPLACE");
  return (
    <section id="chart" className="py-20 sm:py-32 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-purple-neon mb-3">// the chart</div>
          <h2 className="font-display text-4xl sm:text-6xl font-bold leading-[0.95]">
            Live on <span className="gradient-text">DexScreener.</span>
          </h2>
        </div>
        <div className="glass rounded-3xl overflow-hidden">
          {LAUNCHED && hasCA ? (
            <div className="relative w-full" style={{ paddingBottom: "65%" }}>
              <iframe
                src={`https://dexscreener.com/solana/${CA}?embed=1&theme=dark&info=0`}
                className="absolute inset-0 w-full h-full"
                style={{ border: 0 }}
                allowFullScreen
              />
            </div>
          ) : (
            <div className="relative w-full flex items-center justify-center" style={{ minHeight: "400px" }}>
              {/* fake chart shimmer */}
              <div className="absolute inset-6 sm:inset-10 opacity-20">
                <svg viewBox="0 0 400 200" className="w-full h-full">
                  <path d="M 0 150 Q 50 130 80 120 T 150 90 T 220 70 T 290 50 T 400 30" stroke="url(#g)" strokeWidth="2" fill="none" />
                  <defs>
                    <linearGradient id="g" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#c084fc" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="relative text-center py-12 sm:py-20 px-6">
                <div className="inline-flex items-center gap-2 bg-purple-deep/40 border border-purple-300/30 rounded-full px-4 py-2 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-purple-neon mb-6">
                  <span className="w-1.5 h-1.5 bg-purple-neon rounded-full animate-pulse-dot" />
                  chart loads at launch
                </div>
                <div className="font-display text-3xl sm:text-5xl font-bold text-purple-200/40 mb-3">soon</div>
                <p className="text-sm text-purple-200/50 max-w-md mx-auto">
                  The full DexScreener chart will embed here the moment the pair lists.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
