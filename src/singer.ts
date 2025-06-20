// singer.ts
// Defines how to get a signer object and chain address for a given blockchain platform
// using environment variables for private keys.

import {
  ChainAddress,
  ChainContext,
  Network,
  Signer,
  Wormhole,
  Chain,
} from '@wormhole-foundation/sdk';
import evm from '@wormhole-foundation/sdk/evm';
import solana from '@wormhole-foundation/sdk/solana';
import { config } from 'dotenv';
config();// Load environment variables from .env

export interface SignerStuff<N extends Network, C extends Chain> {
  chain: ChainContext<N, C>;
  signer: Signer<N, C>;
  address: ChainAddress<C>;
}

// Helper to retrieve required environment variables safely
function getEnv(key: string): string {
  const val = process.env[key];
  if (!val) throw new Error(`Missing environment variable: ${key}`);
  return val;
}

// Get signer for EVM or Solana chain depending on the platform
export async function getSigner<N extends Network, C extends Chain>(
  chain: ChainContext<N, C>
): Promise<SignerStuff<N, C>> {
  let signer: Signer;
  const platform = chain.platform.utils()._platform;

  switch (platform) {
    case 'Solana':
      signer = await (
        await solana()
      ).getSigner(await chain.getRpc(), getEnv('SOL_PRIVATE_KEY'));
      break;
    case 'Evm':
      signer = await (
        await evm()
      ).getSigner(await chain.getRpc(), getEnv('ETH_PRIVATE_KEY'));
      break;
    default:
      throw new Error('Unsupported platform: ' + platform);
  }

  return {
    chain,
    signer: signer as Signer<N, C>,
    address: Wormhole.chainAddress(chain.chain, signer.address()),
  };
}
