import { create } from 'zustand'

export interface PoolData {
  projectName: string
  tokenSymbol: string
  tokenAddress: string
  pairToken: string
  feeTier: number
  totalLocked: number
  currentUnlocked: number
  unlockPercentage: number
  lockExtendedUntil: string | null
  riskScore: number
  milestones: Array<{
    condition: string
    currentValue: number
    threshold: number
    unlockAmount: number
    isComplete: boolean
  }>
  monitoredWallets: string[]
  treasuryAddress: string | null
}

export interface OnChainEvent {
  id: string
  timestamp: number
  eventType: 'PositionLocked' | 'MilestoneUnlocked' | 'LockExtended' | 'RiskElevated' | 'AlertPaused' | 'WithdrawalAttempted'
  description: string
  txHash: string
  blockNumber: number
  details?: Record<string, any>
}

export interface VerifyState {
  selectedAddress: string | null
  poolData: PoolData | null
  events: OnChainEvent[]
  loading: boolean
  error: string | null
  
  setSelectedAddress: (address: string | null) => void
  setPoolData: (data: PoolData | null) => void
  addEvent: (event: OnChainEvent) => void
  setEvents: (events: OnChainEvent[]) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  clear: () => void
}

const initialState = {
  selectedAddress: null,
  poolData: null,
  events: [],
  loading: false,
  error: null,
}

export const useVerifyStore = create<VerifyState>((set) => ({
  ...initialState,
  setSelectedAddress: (address) => set({ selectedAddress: address }),
  setPoolData: (data) => set({ poolData: data }),
  addEvent: (event) =>
    set((state) => ({
      events: [event, ...state.events].slice(0, 100),
    })),
  setEvents: (events) => set({ events }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  clear: () => set(initialState),
}))
