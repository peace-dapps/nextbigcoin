export default function RevShare() {
  return (
    <section id="revshare" className="py-20 sm:py-32 px-4 sm:px-6 relative dot-pattern">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-purple-neon mb-3">// the deal</div>
          <h2 className="font-display text-5xl sm:text-7xl font-bold leading-[0.95]">
            75% of fees go <br /><span className="gradient-text">back to holders.</span>
          </h2>
          <p className="text-purple-100/60 mt-4 max-w-2xl mx-auto text-base sm:text-lg">
            $NBC launches with a 1% creator fee on every trade. The dev keeps 25%. The other 75% gets distributed back to people holding the bag.
          </p>
        </div>

        <div className="glass-strong rounded-3xl p-6 sm:p-10">
          {/* big visual bar */}
          <div className="mb-8 sm:mb-10">
            <div className="flex items-end justify-between mb-3">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-purple-200/60">creator fee per trade</div>
                <div className="font-display text-4xl sm:text-6xl font-bold gradient-text-bright">1%</div>
              </div>
              <div className="text-right">
                <div className="font-mono text-[10px] uppercase tracking-widest text-purple-200/60">distribution</div>
                <div className="font-display text-xl sm:text-2xl text-bone">RevShare</div>
              </div>
            </div>
            <div className="h-8 sm:h-12 rounded-2xl overflow-hidden flex bg-shade/60 border border-purple-300/15">
              <div className="bg-gradient-to-r from-purple-deep to-purple-600 w-1/4 flex items-center justify-center font-mono text-xs sm:text-sm font-bold text-bone">25%</div>
              <div className="bg-gradient-to-r from-purple to-purple-neon w-3/4 flex items-center justify-center font-mono text-xs sm:text-sm font-bold text-ink">75%</div>
            </div>
            <div className="flex justify-between mt-2 font-mono text-[10px] uppercase tracking-widest text-purple-200/70">
              <span>← dev</span>
              <span>holders →</span>
            </div>
          </div>

          {/* breakdown */}
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
            <div className="bg-purple-deep/30 border border-purple-300/15 rounded-2xl p-5 sm:p-6">
              <div className="flex items-baseline justify-between mb-3">
                <div className="font-mono text-[10px] uppercase tracking-widest text-purple-200/60">25% → dev</div>
                <div className="font-display text-3xl sm:text-4xl font-bold text-purple-200">25%</div>
              </div>
              <p className="text-sm text-purple-100/70 leading-relaxed">
                A small slice for the dev to keep the project running. Marketing, DEX paid, the basics. That's it.
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple/15 to-purple-deep/30 border border-purple-300/30 rounded-2xl p-5 sm:p-6 relative overflow-hidden">
              <div className="absolute -top-6 -right-6 font-display text-9xl text-purple-neon/10 select-none">75</div>
              <div className="relative">
                <div className="flex items-baseline justify-between mb-3">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-purple-neon">75% → holders</div>
                  <div className="font-display text-3xl sm:text-4xl font-bold gradient-text-bright">75%</div>
                </div>
                <p className="text-sm text-purple-100/80 leading-relaxed">
                  Every trade pays back to people holding $NBC. The longer you hold, the more accumulates. Pure RevShare, on-chain, verifiable.
                </p>
              </div>
            </div>
          </div>

          <div className="div-glow my-6 sm:my-8" />

          <div className="grid grid-cols-3 gap-3 sm:gap-5 text-center">
            {[
              { v: "1%", l: "creator fee" },
              { v: "0", l: "team supply" },
              { v: "100%", l: "fair launch" },
            ].map((s, i) => (
              <div key={i}>
                <div className="font-display text-2xl sm:text-4xl font-bold text-bone">{s.v}</div>
                <div className="font-mono text-[9px] sm:text-xs uppercase tracking-widest text-purple-200/60 mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
