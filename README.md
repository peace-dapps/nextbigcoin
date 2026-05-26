# The Next Big Coin ($NBC) — landing site

A two-phase landing site for the $NBC token launch on June 4th.

## Quick start

```bash
npm install
cp .env.example .env.local
# Edit .env.local — paste your Helius RPC URL there
npm run dev
```

Open http://localhost:3000

## The two phases

**Phase 1 (now → June 4th):** pre-launch teaser with countdown, wallet setup guide, dev pitch, and socials.

**Phase 2 (June 4th, 20:00 UTC onwards):** adds live price/MC, holder rewards counter, recent buyers feed, embedded chart, and Jupiter buy link.

## How to flip from Phase 1 → Phase 2

When the token launches, do this:

1. Open `lib/config.ts`
2. Change `LAUNCHED = false` to `LAUNCHED = true`
3. Change `CA = "REPLACE_WITH_CA_AT_LAUNCH"` to the real contract address
4. Change `DISTRIBUTION_WALLET = "REPLACE_WITH_DISTRIBUTION_WALLET"` to the dev's actual revshare distribution wallet
5. Save, commit, push. Vercel auto-redeploys in ~90s.

```bash
git add lib/config.ts
git commit -m "launch: flip to phase 2"
git push
```

## Environment variables

Set this **in Vercel** under Settings → Environment Variables:

| Key | Value |
|---|---|
| `HELIUS_RPC_URL` | `https://mainnet.helius-rpc.com/?api-key=YOUR_KEY` |

After adding it, click **Redeploy** in the Deployments tab (Vercel doesn't auto-redeploy on env changes).

**Security:** The Helius key only lives server-side. The browser never sees it — all on-chain calls go through `/api/*` routes.

## File structure

```
app/
  api/
    price/route.ts       ← DexScreener proxy, 20s cache
    holders/route.ts     ← distribution wallet balance, 60s cache
    buys/route.ts        ← recent token buys, 15s cache
  globals.css            ← theme: deep purple + neon glow
  layout.tsx             ← fonts, metadata
  page.tsx               ← main page, switches Phase 1/2 via LAUNCHED flag
components/
  Countdown.tsx          ← Phase 1: animated launch countdown
  WalletGuide.tsx        ← Phase 1: 3-step Phantom setup
  RevShare.tsx           ← both phases: tokenomics
  LiveStats.tsx          ← Phase 2: price/MC/vol/liq bar
  BuysFeed.tsx           ← Phase 2: scrolling recent buyers
  HolderRewards.tsx      ← Phase 2: SOL distributed counter
  ChartEmbed.tsx         ← Phase 2: DexScreener iframe
lib/
  config.ts              ← all the toggles (LAUNCHED, CA, dates)
public/
  logo.jpg + chef images
```

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS — custom premium dark + purple theme
- next/font (Bricolage Grotesque + Inter + JetBrains Mono)
- DexScreener public API for prices
- Helius RPC for on-chain data
- Vercel for hosting

## Deploy

```bash
git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/nextbigcoin.git
git push -u origin main
```

Then on vercel.com: **Add New → Project → Import**. Don't forget to set `HELIUS_RPC_URL` in Environment Variables.

## Launch day checklist

- [ ] CA confirmed from dev
- [ ] Distribution wallet confirmed
- [ ] `LAUNCHED = true` in `lib/config.ts`
- [ ] `CA` updated with real address
- [ ] `DISTRIBUTION_WALLET` updated
- [ ] `git push` to redeploy
- [ ] Verify chart loads
- [ ] Verify buy button deep-links to Jupiter correctly
- [ ] Verify holder rewards counter shows data
- [ ] Verify recent buyers feed populates after first trades

## Teaser video

Drop the 5-second teaser at `public/teaser.mp4`. The video component:
- Autoplays muted on load
- Loops infinitely
- Has play/pause + mute/unmute controls in the bottom right
- Falls back to a "teaser dropping soon" placeholder if the file is missing
- Mobile-friendly (uses `playsInline` so iOS plays inline instead of fullscreen)

Recommended: 1080×1080 (square) or 1080×1920 (vertical) up to ~5MB. mp4/h264 codec for max browser support.
