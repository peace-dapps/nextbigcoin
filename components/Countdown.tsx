"use client";

import { useEffect, useState } from "react";
import { LAUNCH_TIMESTAMP } from "@/lib/config";

function getRemaining() {
  const diff = Math.max(0, LAUNCH_TIMESTAMP - Date.now());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((diff / (1000 * 60)) % 60);
  const secs = Math.floor((diff / 1000) % 60);
  return { days, hours, mins, secs, done: diff === 0 };
}

const Cell = ({ value, label }: { value: number; label: string }) => (
  <div className="glass rounded-2xl px-3 sm:px-5 py-4 sm:py-6 text-center min-w-[72px] sm:min-w-[110px] relative overflow-hidden group">
    <div className="absolute inset-0 bg-gradient-to-br from-purple/10 via-transparent to-purple-deep/10 opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="relative">
      <div className="font-display text-4xl sm:text-6xl font-bold gradient-text-bright tabular-nums tracking-tight">
        {value.toString().padStart(2, "0")}
      </div>
      <div className="font-mono text-[9px] sm:text-[11px] uppercase tracking-[0.2em] text-purple-200/60 mt-1 sm:mt-2">
        {label}
      </div>
    </div>
  </div>
);

const Skeleton = () => (
  <div className="glass rounded-2xl px-3 sm:px-5 py-4 sm:py-6 text-center min-w-[72px] sm:min-w-[110px]">
    <div className="font-display text-4xl sm:text-6xl font-bold text-purple-200/30 tabular-nums">
      00
    </div>
    <div className="h-3 sm:h-4 mt-1 sm:mt-2" />
  </div>
);

export default function Countdown() {
  const [mounted, setMounted] = useState(false);
  const [t, setT] = useState(getRemaining());

  useEffect(() => {
    setMounted(true);
    setT(getRemaining());
    const id = setInterval(() => setT(getRemaining()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-stretch gap-2 sm:gap-3">
        <Skeleton /><Skeleton /><Skeleton /><Skeleton />
      </div>
    );
  }

  if (t.done) {
    return (
      <div className="glass rounded-2xl px-6 py-5 text-center">
        <div className="font-display text-3xl sm:text-4xl gradient-text-bright">$NBC IS LIVE</div>
        <div className="font-mono text-xs uppercase tracking-widest text-purple-200/60 mt-1">refresh the page</div>
      </div>
    );
  }

  return (
    <div className="flex items-stretch gap-2 sm:gap-3">
      <Cell value={t.days} label="days" />
      <Cell value={t.hours} label="hours" />
      <Cell value={t.mins} label="mins" />
      <Cell value={t.secs} label="secs" />
    </div>
  );
}