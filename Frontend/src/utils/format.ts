// Utility functions for formatting
export const formatUSD = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value)
}

export const formatNumber = (value: number, decimals = 2): string => {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

export const formatAddress = (address: string, chars = 4): string => {
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`
}

export const formatPercentage = (value: number): string => {
  return `${(value * 100).toFixed(2)}%`
}

export const isValidAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address)
}

export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
