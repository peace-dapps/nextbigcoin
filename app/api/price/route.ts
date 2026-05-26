import { NextResponse } from "next/server";
import { CA } from "@/lib/config";

export const revalidate = 20;

export async function GET() {
  if (!CA || CA.startsWith("REPLACE")) {
    return NextResponse.json({ ok: false, error: "no_ca" });
  }
  try {
    const res = await fetch(
      `https://api.dexscreener.com/latest/dex/tokens/${CA}`,
      { next: { revalidate: 20 } }
    );
    if (!res.ok) throw new Error("dexscreener fetch failed");
    const data = await res.json();
    const pair = data?.pairs?.[0];
    if (!pair) return NextResponse.json({ ok: false, error: "no_pair" });
    return NextResponse.json({
      ok: true,
      priceUsd: pair.priceUsd,
      priceChange24h: pair.priceChange?.h24,
      priceChange1h: pair.priceChange?.h1,
      volume24h: pair.volume?.h24,
      marketCap: pair.marketCap ?? pair.fdv,
      liquidityUsd: pair.liquidity?.usd,
      pairAddress: pair.pairAddress,
      pairUrl: pair.url,
    });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) });
  }
}
