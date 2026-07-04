const steps = [
  {
    n: "01",
    title: "Get Phantom",
    desc: "Download the Phantom wallet app on your phone or as a browser extension. It takes 2 minutes and it's free.",
    cta: { label: "phantom.com →", href: "https://phantom.com" },
  },
  {
    n: "02",
    title: "Fund with SOL",
    desc: "Buy SOL from Coinbase, Binance, Kraken — or any CEX — and send it to your Phantom wallet address. Even $20 works.",
    cta: null,
  },
  {
  n: "03",
  title: "Ready to Buy",
  desc: "Tap the buy button on this page — it deep-links you straight to Jupiter with $NBC pre-filled. Confirm the swap and you're in.",
  cta: null,
},
];

export default function WalletGuide() {
  return (
    <section id="wallet" className="py-20 sm:py-32 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-purple-neon mb-3">// new to solana?</div>
          <h2 className="font-display text-5xl sm:text-7xl font-bold leading-[0.95]">
            Set up <span className="gradient-text">in 3 steps.</span>
          </h2>
          <p className="text-purple-100/60 mt-4 max-w-2xl mx-auto text-base sm:text-lg">
  Never bought a Solana token before? No problem. Under 30 seconds, you're holding $NBC.
</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 sm:gap-5">
          {steps.map((s, i) => (
            <div key={i} className="glass rounded-3xl p-6 sm:p-7 relative overflow-hidden group hover:border-purple-300/40 transition-colors">
              <div className="absolute -top-4 -right-2 font-display text-8xl sm:text-9xl font-bold text-purple/[0.08] group-hover:text-purple/[0.14] transition-colors select-none">
                {s.n}
              </div>
              <div className="relative">
                <div className="font-mono text-[10px] uppercase tracking-widest text-purple-neon mb-3">step · {s.n}</div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold mb-3">{s.title}</h3>
                <p className="text-sm text-purple-100/70 leading-relaxed mb-4">{s.desc}</p>
                {s.cta && (
                  <a
                    href={s.cta.href}
                    target="_blank"
                    rel="noopener"
                    className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-purple-neon hover:text-bone transition-colors"
                  >
                    {s.cta.label}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
