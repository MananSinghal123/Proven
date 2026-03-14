# Frontend

React + TypeScript + Vite UI for Proven.

This app has three product surfaces:

- **Launch** (`/launch`): founder creates pool + milestones
- **Dashboard** (`/verify`): investor verifies lock/risk/unlocks
- **Monitor** (`/monitor`): live RSC event response view

---

## Stack

- React 18
- TypeScript
- Vite
- wagmi + viem
- Zustand
- Tailwind CSS

---

## Run

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
```

---

## Routing

- `/` → Home
- `/launch` → Launch flow
- `/verify` and `/verify/:address` → Investor dashboard
- `/monitor` → RSC activity monitor

---

## Folder structure

```
Frontend/
├── public/
├── src/
│   ├── components/   # Shared visual components
│   ├── config/       # Addresses, wagmi config, constants
│   ├── hooks/        # Web3 data hooks and polling logic
│   ├── pages/        # Route-level screens
│   ├── store/        # Zustand stores
│   ├── utils/        # Formatting + helpers
│   ├── App.tsx       # Router wiring
│   └── main.tsx      # React entrypoint
├── package.json
└── vite.config.ts
```

See also:

- [Frontend/src/README.md](src/README.md)
- [Frontend/src/pages/README.md](src/pages/README.md)
- [Frontend/src/components/README.md](src/components/README.md)
- [Frontend/src/hooks/README.md](src/hooks/README.md)
- [Frontend/src/store/README.md](src/store/README.md)
- [Frontend/src/config/README.md](src/config/README.md)
- [Frontend/src/utils/README.md](src/utils/README.md)

---

## Notes

- Internal app navigation should use React Router `Link`/`navigate` to avoid host level 404s on SPA deployments.
- Dashboard detects the connected wallet pool automatically and can link directly to `/verify/:address`.

---

## Web3 integration (current)

The frontend is already integrated with `wagmi` + `viem` in `src/hooks/useWeb3.ts`.

### Read hooks

- `useTokenInfo(tokenAddress)`
  - Reads ERC-20 metadata (`name`, `symbol`, `decimals`, `totalSupply`).

- `usePositionData(teamAddress)`
  - Reads vesting position and `unlockedPctByTeam` from `VestingHook`.

- `useMilestoneConfig(teamAddress)`
  - Reads milestone rows from `positions(team, i)`.
  - Includes fallback decoding from `registerVestingPosition` tx input.

- `useRiskScore(teamAddress)`
  - Primary source: `RiskGuardRSC` reads on Lasna.
  - Fallback sources: callback relay events and hook lock state inference.

- `useRugSignals(teamAddress)`
  - Aggregates signal evidence from RSC events and relay events.

- `useMilestoneLockState(teamAddress)`
  - Derives unlocked milestones from `MilestoneUnlocked` logs.

### Polling hooks

- `useHookEventPolling(teamAddress, pollInterval = 15000)`
  - Polls `VestingHook` logs on Unichain Sepolia.

- `useRSCEventPolling(projectAddress, pollInterval = 15000)`
  - Polls `RiskGuardRSC` logs on Lasna for monitor feed/stats.

### Write hooks

- `useContractWrites()` exposes launch flow writes such as:
  - `registerVestingPosition(...)` on Unichain
  - `registerMilestonesOnRSC(...)` on Lasna
  - pool initialization and add liquidity transaction helpers

---

## Configuration

Core config lives in `src/config/constants.ts` and `src/config/wagmi.ts`.

Frontend contract env vars:

- `VITE_HOOK_ADDRESS`
- `VITE_VAULT_ADDRESS`
- `VITE_CALLBACK_ADDRESS`
- `VITE_RSC_ADDRESS`

---

## Build

```bash
npm run build
```

Output is generated in `dist/`.

