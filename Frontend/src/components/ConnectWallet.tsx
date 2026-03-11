import { useState, useRef, useEffect, useCallback } from 'react'
import { useAccount, useConnect, useDisconnect, useNetwork } from 'wagmi'
import { Wallet, ChevronDown, Copy, ExternalLink, LogOut, Check } from 'lucide-react'
import { UNICHAIN_EXPLORER, UNICHAIN_SEPOLIA_CHAIN_ID, LASNA_CHAIN_ID, LASNA_EXPLORER } from '../config/constants'

export function ConnectWallet() {
  const { address, isConnected } = useAccount()
  const { connect, connectors, isLoading: isConnecting } = useConnect()
  const { disconnect, disconnectAsync } = useDisconnect()
  const { chain } = useNetwork()
  const [showDropdown, setShowDropdown] = useState(false)
  const [copied, setCopied] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [])

  const handleCopy = () => {
    if (address) {
      navigator.clipboard.writeText(address)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }

  const explorer = chain?.id === LASNA_CHAIN_ID ? LASNA_EXPLORER : UNICHAIN_EXPLORER

  if (!isConnected) {
    return (
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="font-bold uppercase tracking-wide border-4 border-black px-5 py-2 bg-[#DFFF00] text-black text-sm shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] active:translate-y-0 active:translate-x-0 active:shadow-none transition-all flex items-center gap-2"
        >
          <Wallet className="w-4 h-4 stroke-[2.5]" />
          {isConnecting ? 'CONNECTING...' : 'CONNECT'}
        </button>

        {showDropdown && (
          <div className="absolute right-0 top-full mt-2 w-56 border-4 border-black dark:border-white bg-white dark:bg-[#111] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] z-50">
            <div className="p-3 border-b-4 border-black dark:border-white bg-gray-100 dark:bg-[#1A1A1A]">
              <span className="font-black uppercase text-xs">Select Wallet</span>
            </div>
            {connectors.map((connector) => (
              <button
                key={connector.id}
                onClick={() => { connect({ connector }); setShowDropdown(false) }}
                className="w-full text-left px-4 py-3 font-mono text-sm font-bold hover:bg-[#DFFF00] hover:text-black border-b-2 border-gray-200 dark:border-gray-700 last:border-0 transition-colors flex items-center gap-2"
              >
                <span className="w-2 h-2 bg-black dark:bg-white shrink-0" />
                {connector.name}
              </button>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="border-4 border-black dark:border-white px-4 py-2 bg-white dark:bg-[#111] text-black dark:text-white text-sm font-mono font-bold shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[5px_5px_0px_0px_rgba(255,255,255,1)] active:translate-y-0 active:shadow-none transition-all flex items-center gap-2"
      >
        <span className={`w-2 h-2 border-2 border-black dark:border-white ${chain?.id === UNICHAIN_SEPOLIA_CHAIN_ID ? 'bg-[#DFFF00]' : chain?.id === LASNA_CHAIN_ID ? 'bg-black dark:bg-white' : 'bg-[#FF3333]'}`} />
        {address?.slice(0, 6)}...{address?.slice(-4)}
        <ChevronDown className="w-3 h-3 stroke-[3]" />
      </button>

      {showDropdown && (
        <div className="absolute right-0 top-full mt-2 w-56 border-4 border-black dark:border-white bg-white dark:bg-[#111] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] z-50">
          <div className="p-3 border-b-4 border-black dark:border-white bg-gray-100 dark:bg-[#1A1A1A]">
            <span className="font-mono text-xs font-bold">{address?.slice(0, 12)}...{address?.slice(-6)}</span>
            {chain && <p className="text-[10px] font-mono text-gray-500 dark:text-gray-400 mt-0.5">{chain.name}</p>}
          </div>

          <button onClick={handleCopy} className="w-full text-left px-4 py-3 font-mono text-sm font-bold hover:bg-[#DFFF00] hover:text-black border-b-2 border-gray-200 dark:border-gray-700 transition-colors flex items-center gap-2">
            {copied ? <Check className="w-4 h-4 stroke-[2.5]" /> : <Copy className="w-4 h-4 stroke-[2]" />}
            {copied ? 'Copied!' : 'Copy Address'}
          </button>

          <a
            href={`${explorer}/address/${address}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-left px-4 py-3 font-mono text-sm font-bold hover:bg-[#DFFF00] hover:text-black border-b-2 border-gray-200 dark:border-gray-700 transition-colors flex items-center gap-2"
          >
            <ExternalLink className="w-4 h-4 stroke-[2]" />
            View Explorer
          </a>

          <button
            onClick={async () => {
              try {
                await disconnectAsync()
              } catch {
                disconnect()
              }
              // Clear any wagmi-persisted state in localStorage
              localStorage.removeItem('wagmi.store')
              localStorage.removeItem('wagmi.wallet')
              localStorage.removeItem('wagmi.connected')
              localStorage.removeItem('wagmi.cache')
              setShowDropdown(false)
            }}
            className="w-full text-left px-4 py-3 font-mono text-sm font-bold text-[#FF3333] hover:bg-[#FF3333] hover:text-white transition-colors flex items-center gap-2"
          >
            <LogOut className="w-4 h-4 stroke-[2]" />
            Disconnect
          </button>
        </div>
      )}
    </div>
  )
}
