import { configureChains, createConfig } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { type Chain } from 'wagmi'

/* ═══ Custom Chains ═══ */

export const ethSepolia: Chain = {
  id: 11155111,
  name: 'Ethereum Sepolia',
  network: 'sepolia',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://rpc.sepolia.org'] },
    public: { http: ['https://rpc.sepolia.org'] },
  },
  blockExplorers: {
    default: { name: 'Etherscan', url: 'https://sepolia.etherscan.io' },
  },
  testnet: true,
}

export const kopliTestnet: Chain = {
  id: 5318008,
  name: 'Kopli Testnet',
  network: 'kopli',
  nativeCurrency: { name: 'REACT', symbol: 'REACT', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://kopli-rpc.reactive.network'] },
    public: { http: ['https://kopli-rpc.reactive.network'] },
  },
  blockExplorers: {
    default: { name: 'ReactScan', url: 'https://kopli.reactscan.net' },
  },
  testnet: true,
}

/* ═══ Configure chains & providers ═══ */

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [ethSepolia, kopliTestnet],
  [publicProvider()]
)

/* ═══ Connectors ═══ */

const connectors = [
  new MetaMaskConnector({
    chains,
    options: {
      shimDisconnect: true,
    },
  }),
  new InjectedConnector({
    chains,
    options: {
      name: 'Injected Wallet',
      shimDisconnect: true,
    },
  }),
]

/* ═══ Wagmi Config ═══ */

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
})

export { chains }
