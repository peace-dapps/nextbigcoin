import { NextResponse } from "next/server";
import { DISTRIBUTION_WALLET } from "@/lib/config";

export const revalidate = 60;

const HELIUS_RPC = process.env.HELIUS_RPC_URL;

export async function GET() {
  if (!HELIUS_RPC) {
    return NextResponse.json({ ok: false, error: "no_rpc_configured" });
  }
  if (!DISTRIBUTION_WALLET || DISTRIBUTION_WALLET.startsWith("REPLACE")) {
    return NextResponse.json({ ok: false, error: "no_wallet" });
  }
  try {
    // Total SOL ever paid out from distribution wallet:
    // We sum lamport outflows from signature history. For simplicity in v1,
    // we just return the current balance + a counter we maintain.
    // For more accuracy you'd track outflows via getSignaturesForAddress + parse each tx.
    const balRes = await fetch(HELIUS_RPC, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "getBalance",
        params: [DISTRIBUTION_WALLET],
      }),
      next: { revalidate: 60 },
    });
    const balJson = await balRes.json();
    const currentLamports = balJson?.result?.value ?? 0;

    // Get recent outflows (last 1000 signatures) to estimate distributed amount
    const sigRes = await fetch(HELIUS_RPC, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 2,
        method: "getSignaturesForAddress",
        params: [DISTRIBUTION_WALLET, { limit: 1000 }],
      }),
      next: { revalidate: 60 },
    });
    const sigJson = await sigRes.json();
    const txCount = sigJson?.result?.length ?? 0;

    return NextResponse.json({
      ok: true,
      currentBalanceSol: currentLamports / 1e9,
      distributionTxCount: txCount,
    });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) });
  }
}
