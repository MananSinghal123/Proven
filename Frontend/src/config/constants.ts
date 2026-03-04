// Web3 and contract configurations
export const UNICHAIN_SEPOLIA_RPC = 'https://sepolia.unichain.org'
export const SEPOLIA_RPC = 'https://sepolia.infura.io/v3/YOUR_INFURA_KEY'

export const POOL_MANAGER_ADDRESS = '0x...' // Replace with actual
export const VAULT_MANAGER_ADDRESS = '0x...' // Replace with actual
export const HOOK_ADDRESS = '0x...' // Replace with actual
export const RSC_ADDRESS = '0x...' // Replace with actual

export const SUPPORTED_TOKENS = {
  USDC: '0x...',
  WETH: '0x...',
}

export const FEE_TIERS = [
  { value: 0.05, label: '0.05%', description: 'Stablecair pairs' },
  { value: 0.3, label: '0.3%', description: 'Standard token launches' },
  { value: 1.0, label: '1%', description: 'High volatility pairs' },
]

export const POLL_INTERVAL = 12000 // 12 seconds
