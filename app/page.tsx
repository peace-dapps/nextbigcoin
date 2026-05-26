"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { LAUNCHED, CA, TELEGRAM_URL, TWITTER_URL, JUPITER_URL, DEX_URL } from "@/lib/config";
import Countdown from "@/components/Countdown";
import WalletGuide from "@/components/WalletGuide";
import RevShare from "@/components/RevShare";
import LiveStats from "@/components/LiveStats";
import BuysFeed from "@/components/BuysFeed";
import HolderRewards from "@/components/HolderRewards";
import ChartEmbed from "@/components/ChartEmbed";
import VideoTeaser from "@/components/VideoTeaser";

export default function Home() {
  const [copied, setCopied] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => { document.body.style.overflow = menuOpen ? "hidden" : ""; }, [menuOpen]);

  const copyCA = () => {
    if (!CA || CA.startsWith("REPLACE")) return;
    navigator.clipboard.writeText(CA);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="mesh-purple min-h-screen text-bone overflow-hidden">
      {/* ===== NAV ===== */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-ink/85 backdrop-blur-md border-b border-purple-300/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2 sm:gap-3 group">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden ring-2 ring-purple-300/40 group-hover:ring-purple-neon transition-all">
              <Image src="/logo.jpg" alt="NBC" width={48} height={48} className="object-cover w-full h-full" />
            </div>
            <div className="leading-tight">
              <div className="font-display text-lg sm:text-xl font-bold tracking-tight">NEXT BIG COIN</div>
              <div className="font-mono text-[9px] uppercase tracking-widest text-purple-neon">$NBC · solana</div>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-7 text-xs font-mono uppercase tracking-widest">
            <a href="#chart" className="hover:text-purple-neon transition-colors">chart</a>
            <a href="#revshare" className="hover:text-purple-neon transition-colors">revshare</a>
            <a href="#wallet" className="hover:text-purple-neon transition-colors">get ready</a>
            <a href="#community" className="hover:text-purple-neon transition-colors">community</a>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {LAUNCHED ? (
              <a href={JUPITER_URL} target="_blank" rel="noopener" className="btn-primary text-bone font-bold px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm uppercase tracking-wider rounded-full whitespace-nowrap">
                buy $nbc
              </a>
            ) : (
              <a href={TELEGRAM_URL} target="_blank" rel="noopener" className="btn-primary text-bone font-bold px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm uppercase tracking-wider rounded-full whitespace-nowrap">
                join early
              </a>
            )}
            <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden w-10 h-10 rounded-full glass flex items-center justify-center" aria-label="menu">
              <div className="flex flex-col gap-1">
                <span className={`block w-5 h-0.5 bg-purple-neon transition-transform ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
                <span className={`block w-5 h-0.5 bg-purple-neon transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
                <span className={`block w-5 h-0.5 bg-purple-neon transition-transform ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
              </div>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="lg:hidden bg-void border-t border-purple-300/15">
            <div className="flex flex-col p-6 gap-5 font-mono uppercase tracking-widest text-sm">
              <a href="#chart" onClick={() => setMenuOpen(false)} className="hover:text-purple-neon">chart</a>
              <a href="#revshare" onClick={() => setMenuOpen(false)} className="hover:text-purple-neon">revshare</a>
              <a href="#wallet" onClick={() => setMenuOpen(false)} className="hover:text-purple-neon">get ready</a>
              <a href="#community" onClick={() => setMenuOpen(false)} className="hover:text-purple-neon">community</a>
              <a href={TWITTER_URL} target="_blank" rel="noopener" className="hover:text-purple-neon">𝕏 @BigCoinNext</a>
              <a href={TELEGRAM_URL} target="_blank" rel="noopener" className="hover:text-purple-neon">telegram</a>
            </div>
          </div>
        )}
      </nav>

      {/* ===== HERO ===== */}
      <section id="top" className="relative pt-28 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 min-h-screen flex items-center">
        {/* big watermark */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center">
          <div className="font-display font-bold text-[140px] sm:text-[280px] lg:text-[400px] text-purple/[0.04] leading-none whitespace-nowrap select-none">$NBC</div>
        </div>
        {/* radial glow behind chef */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple/20 rounded-full blur-[120px] animate-glow-pulse pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            {/* Left */}
            <div className="space-y-6 sm:space-y-8 order-2 lg:order-1">
              {!LAUNCHED ? (
                <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-purple-neon">
                  <span className="w-1.5 h-1.5 bg-purple-neon rounded-full animate-pulse-dot" />
                  launching june 4 · 08:00 utc
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-emerald">
                  <span className="w-1.5 h-1.5 bg-emerald rounded-full animate-pulse-dot" />
                  live on solana
                </div>
              )}

              <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold leading-[0.85] tracking-tight">
                The next<br />
                <span className="shimmer-text">big coin.</span>
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-purple-100/75 max-w-xl leading-relaxed">
                Imagine the moment someone sees "$NBC · Next Big Coin" on DexScreener. <span className="text-bone font-semibold">That's the entire pitch.</span> A fair-launch community coin with 75% of fees going back to holders.
              </p>

              {/* Phase 1 countdown */}
              {!LAUNCHED && (
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-purple-neon mb-3">launches in</div>
                  <Countdown />
                </div>
              )}

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 pt-2">
                {LAUNCHED ? (
                  <>
                    <a href={JUPITER_URL} target="_blank" rel="noopener" className="btn-primary text-bone font-bold px-7 sm:px-9 py-4 text-sm sm:text-base uppercase tracking-wider rounded-full inline-flex items-center gap-2">
                      buy on jupiter →
                    </a>
                    <a href={DEX_URL} target="_blank" rel="noopener" className="btn-secondary text-bone font-bold px-7 sm:px-9 py-4 text-sm sm:text-base uppercase tracking-wider rounded-full">
                      view chart
                    </a>
                  </>
                ) : (
                  <>
                    <a href={TELEGRAM_URL} target="_blank" rel="noopener" className="btn-primary text-bone font-bold px-7 sm:px-9 py-4 text-sm sm:text-base uppercase tracking-wider rounded-full inline-flex items-center gap-2">
                      join telegram →
                    </a>
                    <a href="#wallet" className="btn-secondary text-bone font-bold px-7 sm:px-9 py-4 text-sm sm:text-base uppercase tracking-wider rounded-full">
                      get ready
                    </a>
                  </>
                )}
              </div>

              {/* CA strip — only show when launched (placeholder before) */}
              {LAUNCHED && !CA.startsWith("REPLACE") && (
                <button onClick={copyCA} className="group w-full max-w-xl flex items-center justify-between glass rounded-2xl p-3 sm:p-4 hover:border-purple-300/40 transition-all">
                  <div className="text-left min-w-0 flex-1 mr-3">
                    <div className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-purple-neon mb-1">contract address</div>
                    <div className="font-mono text-[11px] sm:text-sm text-bone truncate">{CA}</div>
                  </div>
                  <div className="btn-primary text-bone font-mono text-[10px] sm:text-xs uppercase tracking-widest px-3 sm:px-4 py-2 rounded-full whitespace-nowrap">
                    {copied ? "copied ✓" : "copy"}
                  </div>
                </button>
              )}
            </div>

            {/* Right — chef */}
            <div className="relative order-1 lg:order-2 flex items-center justify-center">
              <div className="absolute w-[280px] h-[280px] sm:w-[420px] sm:h-[420px] bg-purple/30 rounded-full blur-3xl animate-glow-pulse" />
              <div className="relative animate-float">
                <div className="w-[280px] sm:w-[440px] aspect-square rounded-full overflow-hidden ring-4 ring-purple-300/30">
                  <Image src="/logo.jpg" alt="NBC chef" width={500} height={500} className="object-cover w-full h-full" priority />
                </div>
              </div>
              {/* sticker badges */}
              <div className="absolute top-2 right-0 sm:-top-2 sm:-right-2 glass-strong rounded-full px-4 py-2 font-display text-base sm:text-xl font-bold rotate-6">
                <span className="gradient-text-bright">75% TO HOLDERS</span>
              </div>
              <div className="absolute bottom-2 left-0 sm:-bottom-2 sm:-left-2 glass-strong rounded-full px-4 py-2 font-display text-base sm:text-xl font-bold -rotate-6">
                <span className="text-bone">FAIR LAUNCH</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live stats — shows real data or "soon" placeholder */}
      <LiveStats />

      {/* ===== MARQUEE ===== */}
      <section className="relative py-5 bg-gradient-to-r from-purple-deep via-purple to-purple-deep border-y border-purple-300/30 overflow-hidden mt-12">
        <div className="marquee-wrap font-display text-3xl sm:text-5xl font-bold uppercase whitespace-nowrap">
          {Array(2).fill(null).map((_, i) => (
            <div key={i} className="flex items-center gap-8 sm:gap-12 px-6">
              <span>$NBC</span><span className="text-purple-200">✦</span>
              <span>the next big coin</span><span className="text-purple-200">✦</span>
              <span>$NBC</span><span className="text-purple-200">✦</span>
              <span>75% to holders</span><span className="text-purple-200">✦</span>
              <span>$NBC</span><span className="text-purple-200">✦</span>
              <span>we all early</span><span className="text-purple-200">✦</span>
            </div>
          ))}
        </div>
      </section>

      {/* ===== VIDEO TEASER ===== */}
      <VideoTeaser />

      {/* ===== ABOUT / WHY $NBC ===== */}
      <section className="py-20 sm:py-32 px-4 sm:px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-5">
              <div className="relative">
                <div className="aspect-[3/4] rounded-3xl overflow-hidden glass">
                  <Image src="/chef-shield.jpg" alt="chef" width={500} height={650} className="object-cover w-full h-full" />
                </div>
                <div className="absolute -bottom-5 -right-5 glass-strong rounded-2xl px-5 py-3 -rotate-3">
                  <div className="font-mono text-[9px] uppercase tracking-widest text-purple-neon">why</div>
                  <div className="font-display text-lg font-bold">$NBC</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-5 sm:space-y-6">
              <div className="font-mono text-xs uppercase tracking-[0.3em] text-purple-neon">// the thesis</div>
              <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[0.9]">
                The name <br /><span className="gradient-text">does the work.</span>
              </h2>
              <div className="space-y-4 text-base sm:text-lg leading-relaxed text-purple-100/80">
                <p>
                  Picture a trader scrolling DexScreener at 3am. They scan past a hundred tickers and one stops them cold: <span className="text-bone font-semibold">"The Next Big Coin."</span>
                </p>
                <p>
                  <span className="font-display text-2xl sm:text-3xl gradient-text-bright italic block leading-snug py-2">
                    That moment of recognition <em>is</em> the alpha.
                  </span>
                </p>
                <p>
                  $NBC is built on the simplest possible premise: a token that markets itself every time someone looks at a chart. Backed by a <span className="text-purple-neon font-semibold">RevShare model that pays 75% of creator fees back to holders</span> — not a vague promise, but on-chain, every trade, automatic.
                </p>
                <p>
                  Fair launch. No team allocation. A dev with 1 SOL of skin in the game. <span className="text-bone font-semibold">Everyone reading this is early.</span>
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-4">
                {[
                  { v: "75%", l: "to holders" },
                  { v: "0", l: "team supply" },
                  { v: "1%", l: "creator fee" },
                ].map((s, i) => (
                  <div key={i} className="glass rounded-2xl p-3 sm:p-4 text-center">
                    <div className="font-display text-2xl sm:text-3xl font-bold gradient-text-bright">{s.v}</div>
                    <div className="font-mono text-[9px] sm:text-xs uppercase tracking-widest text-purple-200/60 mt-1">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== REV SHARE ===== */}
      <RevShare />

      {/* These all show "soon" placeholders until LAUNCHED flips */}
      <HolderRewards />
      <BuysFeed />
      <ChartEmbed />

      {/* Wallet setup guide — useful before and after launch */}
      <WalletGuide />

      {/* ===== COMMUNITY ===== */}
      <section id="community" className="py-20 sm:py-32 px-4 sm:px-6 relative">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-purple-neon mb-3">// join us</div>
            <h2 className="font-display text-5xl sm:text-7xl font-bold leading-[0.95]">
              We're <span className="gradient-text">all early.</span>
            </h2>
            <p className="text-purple-100/60 mt-4 max-w-xl mx-auto text-base sm:text-lg">
              Tell your friend's, tell your cousins, shit tell your cat 😺 meow lol.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
            <a href={TELEGRAM_URL} target="_blank" rel="noopener" className="glass rounded-3xl p-6 sm:p-8 hover:border-purple-300/40 transition-all group">
              <div className="flex items-center justify-between mb-4">
                <div className="font-mono text-[10px] uppercase tracking-widest text-purple-neon">telegram</div>
                <span className="text-purple-200/40 group-hover:text-purple-neon group-hover:translate-x-1 transition-all">→</span>
              </div>
              <div className="font-display text-2xl sm:text-3xl font-bold mb-2">t.me/CoinBigNext</div>
              <p className="text-sm text-purple-100/60">Join the community chat. This is where the dev and the holders actually talk.</p>
            </a>
            <a href={TWITTER_URL} target="_blank" rel="noopener" className="glass rounded-3xl p-6 sm:p-8 hover:border-purple-300/40 transition-all group">
              <div className="flex items-center justify-between mb-4">
                <div className="font-mono text-[10px] uppercase tracking-widest text-purple-neon">twitter / X</div>
                <span className="text-purple-200/40 group-hover:text-purple-neon group-hover:translate-x-1 transition-all">→</span>
              </div>
              <div className="font-display text-2xl sm:text-3xl font-bold mb-2">@BigCoinNext</div>
              <p className="text-sm text-purple-100/60">Memes, updates, and #SpreadTheWord. The signal goes out from here.</p>
            </a>
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="font-display font-bold text-[120px] sm:text-[240px] text-purple/[0.04] leading-none whitespace-nowrap">MOON</div>
        </div>

        <div className="max-w-3xl mx-auto text-center relative">
          <div className="inline-block mb-6">
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden ring-4 ring-purple-300/40 glow-ring">
              <Image src="/logo.jpg" alt="NBC" width={144} height={144} className="object-cover w-full h-full" />
            </div>
          </div>
          {LAUNCHED ? (
            <>
              <h2 className="font-display text-5xl sm:text-7xl font-bold mb-5 leading-[0.95]">
                Let's <span className="gradient-text">moon.</span><br />And beyond.
              </h2>
              <p className="text-purple-100/70 text-base sm:text-lg mb-8 sm:mb-10 max-w-xl mx-auto">
                The chart is live. The fees are real. The holders are eating. Welcome to $NBC.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <a href={JUPITER_URL} target="_blank" rel="noopener" className="btn-primary text-bone font-bold px-8 sm:px-10 py-4 text-sm sm:text-base uppercase tracking-widest rounded-full">
                  buy on jupiter →
                </a>
                <a href={TELEGRAM_URL} target="_blank" rel="noopener" className="btn-secondary text-bone font-bold px-8 sm:px-10 py-4 text-sm sm:text-base uppercase tracking-widest rounded-full">
                  join telegram
                </a>
              </div>
            </>
          ) : (
            <>
              <h2 className="font-display text-5xl sm:text-7xl font-bold mb-5 leading-[0.95]">
                June 4. <span className="gradient-text">08:00 UTC.</span>
              </h2>
              <p className="text-purple-100/70 text-base sm:text-lg mb-8 sm:mb-10 max-w-xl mx-auto">
                Set the wallet up. Save some SOL. Show up early. The rest takes care of itself.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <a href={TELEGRAM_URL} target="_blank" rel="noopener" className="btn-primary text-bone font-bold px-8 sm:px-10 py-4 text-sm sm:text-base uppercase tracking-widest rounded-full">
                  join the telegram
                </a>
                <a href={TWITTER_URL} target="_blank" rel="noopener" className="btn-secondary text-bone font-bold px-8 sm:px-10 py-4 text-sm sm:text-base uppercase tracking-widest rounded-full">
                  follow on 𝕏
                </a>
              </div>
            </>
          )}
        </div>
      </section>

      <footer className="py-8 px-4 sm:px-6 border-t border-purple-300/15 bg-ink">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full overflow-hidden ring-1 ring-purple-300/30">
              <Image src="/logo.jpg" alt="NBC" width={36} height={36} className="object-cover w-full h-full" />
            </div>
            <div>
              <div className="font-display text-lg font-bold tracking-tight">NEXT BIG COIN</div>
              <div className="font-mono text-[9px] uppercase tracking-widest text-purple-neon">$NBC · solana · revshare</div>
            </div>
          </div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-purple-200/40 text-center">
            this is a memecoin · not financial advice · we all early
          </div>
          <div className="flex gap-3">
            <a href={TWITTER_URL} target="_blank" rel="noopener" className="font-mono text-[10px] text-purple-neon hover:text-bone uppercase tracking-widest">𝕏</a>
            <a href={TELEGRAM_URL} target="_blank" rel="noopener" className="font-mono text-[10px] text-purple-neon hover:text-bone uppercase tracking-widest">tg</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
