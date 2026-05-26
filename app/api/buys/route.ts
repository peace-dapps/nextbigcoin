import { NextResponse } from "next/server";
import { CA } from "@/lib/config";

export const revalidate = 15;

const HELIUS_RPC = process.env.HELIUS_RPC_URL;

type Buy = {
  signature: string;
  wallet: string;
  solAmount: number;
  timestamp: number;
};

export async function GET() {
  if (!HELIUS_RPC || !CA || CA.startsWith("REPLACE")) {
    return NextResponse.json({ ok: false, buys: [], error: "not_configured" });
  }
  try {
    // Get last 25 signatures involving the token mint
    const sigRes = await fetch(HELIUS_RPC, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "getSignaturesForAddress",
        params: [CA, { limit: 25 }],
      }),
      next: { revalidate: 15 },
    });
    const sigJson = await sigRes.json();
    const signatures: { signature: string; blockTime: number }[] = sigJson?.result ?? [];

    if (signatures.length === 0) return NextResponse.json({ ok: true, buys: [] });

    // Fetch parsed transactions via Helius enhanced endpoint
    const heliusKey = HELIUS_RPC.split("api-key=")[1];
    if (!heliusKey) throw new Error("invalid rpc url");

    const txRes = await fetch(
      `https://api.helius.xyz/v0/transactions/?api-key=${heliusKey}`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ transactions: signatures.map(s => s.signature) }),
        next: { revalidate: 15 },
      }
    );
    const txs = await txRes.json();

    const buys: Buy[] = [];
    if (Array.isArray(txs)) {
      for (const tx of txs) {
        if (!tx?.tokenTransfers || !tx?.nativeTransfers) continue;

        // Find a token transfer where the token mint matches our CA (someone receiving tokens)
        const tokenIn = tx.tokenTransfers.find(
          (t: any) => t.mint === CA && t.toUserAccount
        );
        if (!tokenIn) continue;

        // Find SOL outflow from the buyer
        const buyer = tokenIn.toUserAccount;
        const solOut = tx.nativeTransfers
          .filter((n: any) => n.fromUserAccount === buyer)
          .reduce((sum: number, n: any) => sum + (n.amount ?? 0), 0);
        if (solOut <= 0) continue;

        buys.push({
          signature: tx.signature,
          wallet: buyer,
          solAmount: solOut / 1e9,
          timestamp: tx.timestamp ?? (Date.now() / 1000),
        });
      }
    }

    return NextResponse.json({ ok: true, buys: buys.slice(0, 10) });
  } catch (e) {
    return NextResponse.json({ ok: false, buys: [], error: String(e) });
  }
}
