import { http, createConfig } from 'wagmi'
import { base, mainnet, optimism } from 'wagmi/chains'
import { walletConnect } from 'wagmi/connectors'

const projectId = 'b695e3a335505714537f998e9e0f87c8'

export const config = createConfig({
  chains: [mainnet, base, optimism],
  connectors: [
    walletConnect({ projectId }),
  ],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
    [optimism.id]: http(),
  },
})