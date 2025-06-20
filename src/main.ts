// main.ts
// Entry point of the application that orchestrates a USDC cross-chain transfer
// from an EVM-compatible chain (e.g. Sepolia) to Solana using Wormhole and Circle

import { wormhole } from '@wormhole-foundation/sdk';
import evm from '@wormhole-foundation/sdk/evm';
import solana from '@wormhole-foundation/sdk/solana';
import { getSigner } from './singer';
import { CHAINS, USDC, TIMEOUTS, CIRCLE } from './config';

(async function () {
  // Initialize Wormhole SDK in Testnet environment with EVM and Solana support
  const wh = await wormhole('Testnet', [evm, solana]);

  // Get source and destination chain context objects
  const sendChain = wh.getChain(CHAINS.FROM as any);
  const rcvChain = wh.getChain(CHAINS.TO as any);

  // Load signers and associated addresses for both chains
  const source = await getSigner(sendChain);
  const destination = await getSigner(rcvChain);

  // Create a Circle transfer object with the specified parameters
  const xfer = await wh.circleTransfer(
    USDC.UNITS,
    source.address,
    destination.address,
    CIRCLE.AUTOMATIC
  );

  //console.log('Circle Transfer object created:', xfer);

  // Initiate the transfer on the EVM-compatible source chain
  console.log('Initiating Transfer...');
  const srcTxids = await xfer.initiateTransfer(source.signer);
  console.log(`Transfer started: `, srcTxids);

  // Wait for Circle attestation (VAA) before completing transfer
  console.log('Waiting for attestation...');
  const attestIds = await xfer.fetchAttestation(TIMEOUTS.ATTESTATION);
  console.log(`Got attestation: `, attestIds);

  // Complete the transfer on Solana
  console.log('Completing Transfer...');
  const dstTxids = await xfer.completeTransfer(destination.signer);
  console.log(`Transfer completed: `, dstTxids);

  // Final output for verification/debugging
  //console.log('Final Transfer status: ', xfer);
  process.exit(0);
})();
