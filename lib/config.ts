// =====================================================
//  EDIT THIS FILE TO FLIP PHASE 1 → PHASE 2 AT LAUNCH
// =====================================================

// Set to true on June 4th, 20:00 UTC to switch site to launched state
export const LAUNCHED = false;

// Token contract address — PLACEHOLDER until dev provides it
// Replace this string with the real CA when token deploys
export const CA = "REPLACE_WITH_CA_AT_LAUNCH";

// Launch date — 4 June 2026, 20:00 UTC
export const LAUNCH_TIMESTAMP = Date.UTC(2026, 5, 4, 8, 0, 0); // June 4, 2026, 08:00 UTC

// Distribution wallet — used for holder rewards counter on Phase 2
// PLACEHOLDER, replace when dev provides
export const DISTRIBUTION_WALLET = "REPLACE_WITH_DISTRIBUTION_WALLET";

// Socials
export const TELEGRAM_URL = "https://t.me/CoinBigNext";
export const TWITTER_URL = "https://x.com/BigCoinNext";

// Helpers built from CA (won't break before launch — Jupiter just won't resolve)
export const PUMP_URL = `https://pump.fun/${CA}`;
export const DEX_URL = `https://dexscreener.com/solana/${CA}`;
export const JUPITER_URL = `https://jup.ag/swap/SOL-${CA}?slippage=1`;
