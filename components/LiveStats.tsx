"use client";

import { useEffect, useState } from "react";
import { LAUNCHED } from "@/lib/config";

type PriceData = {
  ok: boolean;
  priceUsd?: string;
  priceChange24h?: number;
  priceChange1h?: number;
  volume24h?: number;
  marketCap?: number;
  liquidityUsd?: number;
};

function formatUsd(n?: number) {
  if (!n && n !== 0) return "—";
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}K`;
  return `$${n.toFixed(2)}`;
}

function formatPrice(p?: string): React.ReactNode {
  if (!p) return "—";
  const n = parseFloat(p);
  if (n === 0) return "$0";
  if (n >= 1) return `$${n.toFixed(4)}`;
  if (n >= 0.001) return `$${n.toFixed(6)}`;
  const str = n.toFixed(20);
  const match = str.match(/^0\.(0+)(\d+)/);
  if (!match) return `$${n.toFixed(8)}`;
  const zeros = match[1].length;
  const sig = match[2].slice(0, 4);
  const subscripts = "₀₁₂₃₄₅₆₇₈₉";
  const subZeros = zeros.toString().split("").map(d => subscripts[parseInt(d)]).join("");
  return (
    <>
      $0.0<span className="text-[0.7em] align-baseline">{subZeros}</span>{sig}
    </>
  );
}

export default function LiveStats() {
  const [data, setData] = useState<PriceData | null>(null);

  useEffect(() => {
    if (!LAUNCHED) return;
    const fetchPrice = () =>
      fetch("/api/price")
        .then((r) => r.json())
        .then(setData)
        .catch(() => setData({ ok: false }));
    fetchPrice();
    const id = setInterval(fetchPrice, 20000);
    return () => clearInterval(id);
  }, []);

  const c24 = data?.priceChange24h ?? 0;
  const up24 = c24 >= 0;
  const c1 = data?.priceChange1h ?? 0;
  const up1 = c1 >= 0;

  if (!LAUNCHED) {
    return (
      <section className="px-4 sm:px-6 -mt-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="glass-strong rounded-3xl p-4 sm:p-6 relative overflow-hidden">
            <div className="absolute top-3 right-4 sm:top-4 sm:right-6 inline-flex items-center gap-2 bg-purple-deep/40 border border-purple-300/30 rounded-full px-3 py-1 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-purple-neon">
              <span className="w-1 h-1 bg-purple-neon rounded-full animate-pulse-dot" />
              live data · activates at launch
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mt-8 sm:mt-6">
              {[
                { label: "price", sub: "USD" },
                { label: "market cap", sub: "live" },
                { label: "24h volume", sub: "—" },
                { label: "liquidity", sub: "burned 🔥" },
              ].map((s, i) => (
                <div key={i} className="opacity-60">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-purple-neon mb-1">{s.label}</div>
                  <div className="font-display text-2xl sm:text-3xl font-bold text-purple-200/50 tabular-nums">soon</div>
                  <div className="font-mono text-xs mt-1 text-purple-200/40">{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 sm:px-6 -mt-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="glass-strong rounded-3xl p-4 sm:p-6 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-purple-neon mb-1">price</div>
            <div className="font-display text-2xl sm:text-3xl font-bold gradient-text-bright tabular-nums">{formatPrice(data?.priceUsd)}</div>
            {data?.priceChange24h !== undefined && (
              <div className={`font-mono text-xs mt-1 ${up24 ? "text-emerald" : "text-red-400"}`}>
                {up24 ? "+" : ""}{c24.toFixed(2)}% (24h)
              </div>
            )}
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-purple-neon mb-1">market cap</div>
            <div className="font-display text-2xl sm:text-3xl font-bold text-bone tabular-nums">{formatUsd(data?.marketCap)}</div>
            <div className="font-mono text-xs mt-1 text-purple-200/50">live</div>
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-purple-neon mb-1">24h volume</div>
            <div className="font-display text-2xl sm:text-3xl font-bold text-bone tabular-nums">{formatUsd(data?.volume24h)}</div>
            {data?.priceChange1h !== undefined && (
              <div className={`font-mono text-xs mt-1 ${up1 ? "text-emerald" : "text-red-400"}`}>
                {up1 ? "+" : ""}{c1.toFixed(2)}% (1h)
              </div>
            )}
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-purple-neon mb-1">liquidity</div>
            <div className="font-display text-2xl sm:text-3xl font-bold text-bone tabular-nums">{formatUsd(data?.liquidityUsd)}</div>
            <div className="font-mono text-xs mt-1 text-purple-200/50">burned 🔥</div>
          </div>
        </div>
      </div>
    </section>
  );
}
