# Proven Frontend

A React + TypeScript + Vite frontend for Proven — a token launch platform with on-chain verified performance vesting. This is the complete UI for the hackathon demo.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## The Four Pages

### Page 1: Home / Landing (`/`)
The entry point. Introduces Proven in 10 seconds with:
- **Hero Section** — Two CTAs: "Launch with Proven" (teams) and "Verify a Project" (investors)
- **Live Stats** — Real-time on-chain metrics:
  - Total Value Locked across all pools
  - Active vesting positions
  - Milestones completed to date
- **Problem Explanation** — The $SQUID collapse and how Proven solves it (3 sentences)
- **How It Works** — Three cards: Lock, Prove, Unlock
- **Activity Ticker** — Live feed of recent events (MilestoneUnlocked, NewPositionCreated, LockExtended)

### Page 2: Launch Pool (`/launch`)
**The core product flow.** Protocol teams come here to launch their token with performance-vested liquidity.

#### Step 1: Pool Configuration
- **Project Name** — Shows on investor dashboards
- **Token Address** — Auto-fetches token name, symbol, supply
- **Pair Token** — USDC, WETH, or custom address
- **Fee Tier** — 0.05%, 0.3% (default), or 1%
- **Initial Liquidity** — Two inputs with real-time USD value display
- **Warning Banner** — Emphasizes tokens go into vault until milestones are met

#### Step 2: Milestone Builder
The unique UI element. Three milestone cards where teams define:
- **Condition Type** — TVL, Trading Volume, or Unique Users
- **Threshold** — Dollar amount (with commas) or number
- **Unlock Percentage** — Slider from 1-100%
- **Live Validation Bar** — Shows percentages as colored segments, must sum to exactly 100%
- **Investor Preview** — Shows what investors will see (milestone tracker with 0% unlocked)

#### Step 3: RSC Configuration & Confirm
- **Monitored Wallets** — Input field to add team/advisor wallets
- **Treasury Address** (optional) — Enables treasury drain monitoring
- **Full Summary** — Pool config, liquidity, milestones, wallets, rug signals
- **Transaction Preview** — Shows 2 required transactions with gas estimates
- **Confirmation Checkbox** — Must check before signing
- **MetaMask Integration Ready** — Signs both transactions sequentially

### Page 3: Investor Dashboard (`/verify` or `/verify/:address`)
**The public transparency page.** Any investor can verify a project's lock status.

- **Search Bar** — Accepts team address, pool address, or token address
- **Rage Lock Warning** — Red banner if lock is extended with reason and transaction link
- **Lock Status Card** — Shows:
  - Project name and token symbol
  - Status badge (ACTIVE, WATCH, RAGE LOCKED, FULLY UNLOCKED)
  - 2x2 grid: Total Locked, Currently Unlocked, Lock Extended Until, Risk Score
  - Progress bar showing unlock percentage with animation
- **Milestone Tracker** — Three rows showing:
  - Condition description
  - Current value with progress bar
  - Unlock amount
  - Status (checkmark if complete, progress bar if not)
- **Risk Score Panel** — Visual gauge (0-100, color-coded) with 5 signals breakdown:
  - S1: Large Holder Outflow
  - S2: Treasury Drain
  - S3: LP Withdrawal Attempt
  - S4: Liquidity Concentration
  - S5: Holder Dispersion
- **Event Log** — Chronological table of all on-chain events with timestamps and tx links
- **Share Button** — Copies verification link for sharing

### Page 4: RSC Activity Monitor (`/monitor`)
**Technical demo page showing Reactive Network in action.**

- **Stats Bar** — Real-time metrics:
  - Total react() calls today
  - Total callbacks dispatched
  - Total milestones unlocked via RSC
  - Total lock extensions applied
- **Filter Bar** — Filter by project, signal type, action taken
- **Two-Column Layout**:
  - **Left (Incoming Events)** — Live scrolling feed of on-chain events:
    - Chain badge (ETH SEPOLIA or UNICHAIN SEPOLIA)
    - Block number
    - Event name (Transfer, PoolMetricsUpdated, etc.)
    - From address with explorer link
    - Value/metric
    - Timestamp
  - **Right (RSC Responses)** — For each triggered react():
    - Signal evaluated (S1-S5)
    - Condition checked
    - Result (TRIGGERED or BELOW_THRESHOLD)
    - Score change
    - Action taken (callback name and tx hash)
- **Event-Response Connection** — Horizontal line animates between left and right when cause/effect occurs
- **Demo Instructions** — Explains how to use the page for judges

## Project Structure

```
src/
├── pages/
│   ├── Home.tsx                  # Landing page (Page 1)
│   ├── LaunchPool.tsx            # Pool creation flow (Page 2)
│   ├── InvestorDashboard.tsx     # Project verification (Page 3)
│   └── RSCActivityMonitor.tsx    # RSC event stream (Page 4)
│
├── components/
│   ├── Button.tsx                # Primary, secondary, danger variants
│   ├── Card.tsx                  # Generic card container
│   ├── Badge.tsx                 # Status badges
│   ├── Input.tsx                 # Text input with label/error
│   ├── ProgressBar.tsx           # Animated progress bar
│   └── Modal.tsx                 # Modal dialog
│
├── store/
│   ├── launchStore.ts            # Zustand store for launch flow state
│   ├── verifyStore.ts            # Zustand store for pool data and events
│   └── rscMonitorStore.ts        # Zustand store for RSC events/responses
│
├── hooks/
│   └── useWeb3.ts                # Custom hooks for on-chain data
│       ├── useOnChainData()      # Fetch position data
│       ├── useEventPolling()     # Poll contract events
│       └── useRSCEventPolling()  # Poll RSC events
│
├── utils/
│   └── format.ts                 # Formatting utilities
│       ├── formatUSD()           # $1,234.56
│       ├── formatAddress()       # 0x1234...5678
│       ├── formatPercentage()    # 25.50%
│       └── isValidAddress()      # Address validation
│
├── config/
│   └── constants.ts              # RPC endpoints, contract addresses, fees
│
├── App.tsx                       # Router setup
├── main.tsx                      # React entry point
└── index.css                     # Tailwind styles

```

## State Management

### useLaunchStore
Manages the 3-step launch pool form:
```ts
{
  currentStep: 1 | 2 | 3,
  poolConfig: { projectName, tokenAddress, pairToken, feeTier, liquidityAmount },
  milestones: [{ type, threshold, unlockPercentage, isComplete }],
  additionalWallets: string[],
  treasuryAddress: string
}
```

### useVerifyStore
Manages investor dashboard state:
```ts
{
  selectedAddress: string | null,
  poolData: { projectName, tokenSymbol, totalLocked, ... },
  events: [{ timestamp, eventType, description, txHash }],
  loading: boolean,
  error: string | null
}
```

### useRSCMonitorStore
Manages RSC event streams:
```ts
{
  incomingEvents: [{ timestamp, chain, blockNumber, eventName, ... }],
  rscResponses: [{ signalId, result, actionTaken, ... }],
  stats: { totalReactCalls, totalCallbacksDispatched, ... }
}
```

## Web3 Integration (Stubs)

The following hooks have placeholder implementations ready for viem integration:

- `useOnChainData(address)` — Fetch position, unlock data, etc.
- `useEventPolling(address)` — Subscribe to contract events (polls every 12s)
- `useRSCEventPolling(projectAddress)` — Subscribe to RSC events from Kopli

**TODO:** Replace stubs with actual viem calls to:
- Hook contract on Unichain Sepolia
- VaultManager contract for lock/unlock data
- Kopli RPC for RSC events

## Styling

- **Tailwind CSS** — Utility-first CSS framework
- **Dark theme** — Slate color palette with blue accents
- **Animations** — Fade-in, slide-in, and pulse effects
- **Responsive** — Grid layouts for mobile/tablet/desktop

## Running the Demo

### Complete Demo Flow (7 minutes)

1. Open **Page 1** — Show live activity feed already has events
2. Go to **Page 2** — Fill in $NOVA details, set three milestones, confirm
   - Two MetaMask popups to sign transactions
3. Open shared link to **Page 3** — Pre-loaded with your project
   - Show 0% unlocked, three gray milestone dots, risk score 0
4. Run a swap script in the background
5. Watch **Page 3** in real-time:
   - TVL bar fills up
   - When threshold hit, milestone 1 turns green
   - Event log shows MilestoneUnlocked
6. Switch to **Page 4** — Explain step by step:
   - PoolMetricsUpdated event arrives from Unichain
   - react() call on Kopli evaluates
   - Callback goes back to Unichain
   - authorizeUnlock executes
7. Send a test wallet transfer of 25% of tokens
   - Show Transfer event on Page 4 left column
   - S1 evaluation on right column
   - Score jumps to 45
   - If continue transferring, score crosses 75
   - extendLock callback fires
8. Switch back to **Page 3**
   - Rage lock banner now red with 30-day countdown

## Configuration

Edit `src/config/constants.ts` to set:
- RPC endpoints (Unichain Sepolia, Sepolia)
- Contract addresses (Pool Manager, Vault Manager, Hook, RSC)
- Supported tokens (USDC, WETH addresses)
- Fee tiers
- Event polling interval (12 seconds default)

## Building for Production

```bash
npm run build
```

Outputs optimized bundle to `dist/`

## Development Server Features

- Hot module replacement (HMR) — Changes reflect instantly
- TypeScript type checking
- Tailwind CSS auto-completion
- React DevTools support

## Performance Notes

- All data loaded on-demand (not pre-fetched)
- Event polling happens every 12 seconds (configurable)
- Stores limited to recent 50-100 events to prevent memory bloat
- Images/assets not required (icons as emoji/text)

