"use client";

import { useEffect, useState } from "react";
import { LAUNCHED } from "@/lib/config";

type HoldersData = {
  ok: boolean;
  currentBalanceSol?: number;
  distributionTxCount?: number;
};

export default function HolderRewards() {
  const [data, setData] = useState<HoldersData | null>(null);

  useEffect(() => {
    if (!LAUNCHED) return;
    const fetchData = () =>
      fetch("/api/holders").then((r) => r.json()).then(setData).catch(() => null);
    fetchData();
    const id = setInterval(fetchData, 60000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="py-20 sm:py-32 px-4 sm:px-6 mesh-purple border-y border-purple-300/15">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-purple-neon mb-3">// on-chain proof</div>
          <h2 className="font-display text-4xl sm:text-6xl font-bold leading-[0.95]">
            Holder <span className="gradient-text">rewards.</span>
          </h2>
          <p className="text-purple-100/60 mt-3 max-w-xl mx-auto text-sm sm:text-base">
            Direct from the distribution wallet on Solana. {LAUNCHED ? "Refreshes every minute." : "Activates the moment $NBC goes live."}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
          <div className="glass-strong rounded-3xl p-6 sm:p-8 text-center relative">
            {!LAUNCHED && (
              <div className="absolute top-3 right-3 inline-flex items-center gap-1.5 bg-purple-deep/40 border border-purple-300/30 rounded-full px-2.5 py-1 font-mono text-[8px] sm:text-[9px] uppercase tracking-widest text-purple-neon">
                <span className="w-1 h-1 bg-purple-neon rounded-full animate-pulse-dot" />
                soon
              </div>
            )}
            <div className="font-mono text-[10px] uppercase tracking-widest text-purple-neon mb-2">total distributed to holders</div>
            <div className={`font-display text-5xl sm:text-7xl font-bold tabular-nums ${LAUNCHED ? "gradient-text-bright" : "text-purple-200/40"}`}>
              {LAUNCHED && data?.currentBalanceSol !== undefined ? data.currentBalanceSol.toFixed(2) : "—"}
            </div>
            <div className="font-mono text-xs text-purple-200/60 mt-1">SOL</div>
          </div>
          <div className="glass-strong rounded-3xl p-6 sm:p-8 text-center relative">
            {!LAUNCHED && (
              <div className="absolute top-3 right-3 inline-flex items-center gap-1.5 bg-purple-deep/40 border border-purple-300/30 rounded-full px-2.5 py-1 font-mono text-[8px] sm:text-[9px] uppercase tracking-widest text-purple-neon">
                <span className="w-1 h-1 bg-purple-neon rounded-full animate-pulse-dot" />
                soon
              </div>
            )}
            <div className="font-mono text-[10px] uppercase tracking-widest text-purple-neon mb-2">distribution events</div>
            <div className={`font-display text-5xl sm:text-7xl font-bold tabular-nums ${LAUNCHED ? "text-bone" : "text-purple-200/40"}`}>
              {LAUNCHED && data?.distributionTxCount !== undefined ? data.distributionTxCount : "—"}
            </div>
            <div className="font-mono text-xs text-purple-200/60 mt-1">on-chain transactions</div>
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="font-mono text-xs text-purple-200/40">
            * all numbers verifiable on Solscan. Every distribution is on-chain and public.
          </p>
        </div>
      </div>
    </section>
  );
}
