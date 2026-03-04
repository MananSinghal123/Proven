import { configureChains, createConfig } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { type Chain } from 'wagmi'

/* ═══ Custom Chains ═══ */

export const unichainSepolia: Chain = {
  id: 1301,
  name: 'Unichain Sepolia',
  network: 'unichain-sepolia',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://sepolia.unichain.org'] },
    public: { http: ['https://sepolia.unichain.org'] },
  },
  blockExplorers: {
    default: { name: 'Uniscan', url: 'https://sepolia.uniscan.xyz' },
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
  [unichainSepolia, kopliTestnet],
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
