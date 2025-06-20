# 🌉 EVM ↔ Solana USDC Bridge (via Wormhole + Circle)

A cross-chain application that transfers **USDC** tokens from an **EVM-compatible chain (Sepolia)** to **Solana Devnet** using [Wormhole SDK](https://wormhole.com/) and [Circle’s CCTP](https://developers.circle.com/stablecoins/docs/cctp-on-wormhole).

> Built for blockchain scalability, trust minimization, and practical multi-chain interoperability.

---

## 🚀 Features

- 🔗 **Cross-chain transfer**: Seamless transfer of stablecoins between Ethereum (Sepolia) and Solana.
- 🪙 **Circle CCTP integration**: Uses Circle's native USDC transfer mechanism for real-world bridging.
- 🛠️ **EVM & Solana support**: Uses Wormhole plugins for both ecosystems.
- ⏱️ **Attestation timeout handling**: Waits for VAA proofs to ensure security before finalizing transfers.
- 📦 Clean modular structure: Easy to extend or migrate to production/mainnet.

---

## 📁 Project Structure

```
evm-solana-usdc-bridge/
├── src/
│   ├── main.ts           # Main transfer logic
│   ├── singer.ts         # Loads wallets/signers for EVM & Solana
│   ├── config.ts         # Transfer params, chains, tokens, timeouts
├── .env                  # Store private keys securely
├── tsconfig.json         # TypeScript configuration
├── package.json          # Project dependencies and scripts
```

---

## 🔐 Prerequisites

1. **Node.js** ≥ 18
2. **Sepolia ETH** and **Solana Devnet airdrop**
3. [Circle CCTP supported tokens](https://developers.circle.com/stablecoins/docs/cctp-supported-chains) (e.g., USDC)
4. `.env` file with:

```env
ETH_PRIVATE_KEY="your-evm-private-key"
SOL_PRIVATE_KEY="your-solana-private-key"
```

---

## 🧪 Setup and Run

```bash
# Install dependencies
npm install

# Run transfer script
npx ts-node src/main.ts
```

_Or using `npm run`_

```bash
npm run start
```

---

## ⚙️ Customization

Edit `src/config.ts` to modify:

- `CHAINS.FROM` / `CHAINS.TO`: e.g., `'Sepolia'` → `'Avalanche'`, `'Solana'`
- `USDC.AMOUNT`: amount in tokens (0.1 USDC)
- `TIMEOUTS.ATTESTATION`: milliseconds to wait for VAA
- `CIRCLE.AUTOMATIC`: toggle auto-complete of transfer

---

## 🧩 Technologies Used

- **[@wormhole-foundation/sdk](https://www.npmjs.com/package/@wormhole-foundation/sdk)** – Core SDK for chain abstraction
- **Circle CCTP** – Cross-chain USDC attestation and minting
- **Solana Web3** & **Ethers.js** (under the hood via Wormhole)
- **TypeScript**, **Node.js**, **dotenv**

---

## 🧠 Why This Project Matters

This project showcases:

- Practical **interoperability** using real-world tooling (Circle & Wormhole)
- Secure bridging with **VAA-based attestation**
- Developer fluency across **EVM and Solana ecosystems**
- Readiness for **production-grade** multi-chain architecture

---

## 🧠 Credits

Inspired by Wormhole examples and Circle developer docs.

---

## 📜 License

MIT – Free to use, fork, and adapt.
