import { http, createConfig } from 'wagmi'
import { base, mainnet, optimism, scroll } from 'wagmi/chains'
import { walletConnect } from 'wagmi/connectors'
// import dotenv from 'dotenv'

const projectId = 'b695e3a335505714537f998e9e0f87c8'
// const infuraProjectId = process.env.INFURA_PROJECT_ID;

export const config = createConfig({
  chains: [mainnet, base, optimism, scroll],
  connectors: [
    walletConnect({ projectId }),
  ],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
    [optimism.id]: http(),
    [scroll.id]: http(),
  },
})


// import { http, createConfig } from 'wagmi';
// import { base, mainnet, optimism, scroll } from 'wagmi/chains';
// import { walletConnect } from 'wagmi/connectors';
// import dotenv from 'dotenv';

// dotenv.config();

// const projectId = 'b695e3a335505714537f998e9e0f87c8';
// const infuraProjectId = process.env.INFURA_PROJECT_ID;

// if (!infuraProjectId) {
//   throw new Error('Missing INFURA_PROJECT_ID in environment variables');
// }

// export const config = createConfig({
//   chains: [mainnet, base, optimism, scroll],
//   connectors: [
//     walletConnect({ projectId }),
//   ],
//   transports: {
//     [mainnet.id]: http(`https://mainnet.infura.io/v3/${infuraProjectId}`),
//     [base.id]: http(`https://base-mainnet.infura.io/v3/${infuraProjectId}`),
//     [optimism.id]: http(`https://optimism-mainnet.infura.io/v3/${infuraProjectId}`),
//     [scroll.id]: http(`https://scroll-mainnet.infura.io/v3/${infuraProjectId}`),
//   },
// });