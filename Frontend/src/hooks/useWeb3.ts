import { useEffect, useState } from 'react'
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi'
import { useVerifyStore } from '../store/verifyStore'
import { useRSCMonitorStore } from '../store/rscMonitorStore'
import { unichainSepolia } from '../config/wagmi'

/**
 * Wallet connection state helper.
 * Re-exports wagmi hooks in a project-friendly shape.
 */
export const useWallet = () => {
  const { address, isConnected, isConnecting } = useAccount()
  const { chain } = useNetwork()
  const { switchNetwork } = useSwitchNetwork()

  const isWrongNetwork = isConnected && chain?.id !== unichainSepolia.id

  const ensureCorrectNetwork = () => {
    if (isWrongNetwork && switchNetwork) {
      switchNetwork(unichainSepolia.id)
    }
  }

  return {
    address,
    isConnected,
    isConnecting,
    chain,
    isWrongNetwork,
    ensureCorrectNetwork,
  }
}

/**
 * On-chain data fetcher (placeholder for viem contract reads).
 * TODO: Wire to actual vault / hook contracts once ABIs are available.
 */
export const useOnChainData = (address?: string) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!address) return
    const fetchData = async () => {
      setLoading(true)
      try {
        // TODO: Replace with actual viem contract calls
        setData(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch data')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [address])

  return { data, loading, error }
}

/**
 * Event polling hook (placeholder for viem getLogs).
 */
export const useEventPolling = (address?: string, pollInterval: number = 12000) => {
  const [isPolling, setIsPolling] = useState(false)
  const { setEvents } = useVerifyStore()

  useEffect(() => {
    if (!address) return
    setIsPolling(true)
    const interval = setInterval(async () => {
      try {
        // TODO: Replace with actual viem getLogs
        setEvents([])
      } catch (err) {
        console.error('Error polling events:', err)
      }
    }, pollInterval)
    return () => { setIsPolling(false); clearInterval(interval) }
  }, [address, pollInterval, setEvents])

  return { isPolling }
}

/**
 * RSC event polling hook (placeholder for Kopli RPC).
 */
export const useRSCEventPolling = (projectAddress?: string, pollInterval: number = 12000) => {
  const [isPolling, setIsPolling] = useState(false)
  const { setStats } = useRSCMonitorStore()

  useEffect(() => {
    if (!projectAddress) return
    setIsPolling(true)
    const interval = setInterval(async () => {
      try {
        // TODO: Replace with Kopli RPC / ReactScan polling
        setStats({
          totalReactCalls: 0,
          totalCallbacksDispatched: 0,
          totalMilestonesUnlocked: 0,
          totalLockExtensionsApplied: 0,
        })
      } catch (err) {
        console.error('Error polling RSC events:', err)
      }
    }, pollInterval)
    return () => { setIsPolling(false); clearInterval(interval) }
  }, [projectAddress, pollInterval, setStats])

  return { isPolling }
}
