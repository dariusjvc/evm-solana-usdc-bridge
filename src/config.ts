// config.ts
// Central configuration file for chain names, USDC constants, timeouts, and transfer behavior


// Define source and destination chains using Wormhole chain names
export const CHAINS = {
  FROM: 'Sepolia',
  TO: 'Solana',
};

// Token configuration (for Circle USDC transfers)
export const USDC = {
  DECIMALS: 6,
  AMOUNT: 0.1,
  UNITS: BigInt(0.1 * 10 ** 6),
};

// Transfer-related timeouts
export const TIMEOUTS = {
  ATTESTATION: 120_000,
};

// Transfer mode (automatic vs manual)
export const CIRCLE = {
  AUTOMATIC: false,
};
