"use client";

import { useEffect, useState } from "react";
import { LAUNCHED } from "@/lib/config";

type Buy = {
  signature: string;
  wallet: string;
  solAmount: number;
  timestamp: number;
};

function shortWallet(w: string) {
  return `${w.slice(0, 4)}…${w.slice(-4)}`;
}

function timeAgo(ts: number) {
  const s = Math.floor(Date.now() / 1000 - ts);
  if (s < 60) return `${s}s ago`;
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
}

export default function BuysFeed() {
  const [buys, setBuys] = useState<Buy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!LAUNCHED) {
      setLoading(false);
      return;
    }
    const fetchBuys = () =>
      fetch("/api/buys")
        .then((r) => r.json())
        .then((d) => {
          setBuys(d.buys ?? []);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    fetchBuys();
    const id = setInterval(fetchBuys, 15000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="py-20 sm:py-32 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-purple-neon mb-3">// on-chain feed</div>
          <h2 className="font-display text-4xl sm:text-6xl font-bold leading-[0.95]">
            Recent <span className="gradient-text">buyers.</span>
          </h2>
          <p className="text-purple-100/60 mt-3 max-w-xl mx-auto text-sm sm:text-base">
            {LAUNCHED ? "Live from the Solana mainnet. Refreshes every 15 seconds." : "Every buy will appear here in real time, the second $NBC goes live."}
          </p>
        </div>

        <div className="glass rounded-3xl overflow-hidden">
          {!LAUNCHED && (
            <div className="p-10 sm:p-16 text-center">
              <div className="inline-flex items-center gap-2 bg-purple-deep/40 border border-purple-300/30 rounded-full px-4 py-2 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-purple-neon mb-6">
                <span className="w-1.5 h-1.5 bg-purple-neon rounded-full animate-pulse-dot" />
                feed activates at launch
              </div>
              <div className="font-display text-3xl sm:text-5xl font-bold text-purple-200/40 mb-3">soon</div>
              <p className="text-sm text-purple-200/50 max-w-md mx-auto">
                You'll see every wallet, every SOL amount, every transaction signature. Live, scrollable, undeniable.
              </p>
            </div>
          )}
          {LAUNCHED && loading && buys.length === 0 && (
            <div className="p-8 text-center font-mono text-sm text-purple-200/50">loading recent buys…</div>
          )}
          {LAUNCHED && !loading && buys.length === 0 && (
            <div className="p-8 text-center font-mono text-sm text-purple-200/50">
              no buys yet — be the first
            </div>
          )}
          {LAUNCHED && buys.map((b, i) => (
            <div
              key={b.signature}
              className={`flex items-center justify-between gap-3 px-4 sm:px-6 py-3 sm:py-4 ${i !== buys.length - 1 ? "border-b border-purple-300/10" : ""} hover:bg-purple/[0.03] transition-colors`}
            >
              <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                <div className="w-2 h-2 rounded-full bg-emerald animate-pulse-dot flex-shrink-0" />
                <div className="min-w-0">
                  <div className="font-mono text-xs sm:text-sm text-bone truncate">
                    {shortWallet(b.wallet)} <span className="text-purple-200/50">bought</span> $NBC
                  </div>
                  <div className="font-mono text-[10px] sm:text-xs text-purple-200/40 mt-0.5">
                    {timeAgo(b.timestamp)}
                  </div>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="font-display text-base sm:text-lg font-bold gradient-text-bright">
                  {b.solAmount.toFixed(b.solAmount < 0.1 ? 4 : 2)} SOL
                </div>
                <a
                  href={`https://solscan.io/tx/${b.signature}`}
                  target="_blank"
                  rel="noopener"
                  className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-purple-200/40 hover:text-purple-neon"
                >
                  view tx →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
