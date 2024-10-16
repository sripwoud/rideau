import { SemaphoreEthers } from '@semaphore-protocol/data'
import config from 'client/l/config'
import { arbitrumSepolia } from 'viem/chains'

// TODO
export const semaphoreEthers = new SemaphoreEthers('arbitrum-sepolia', {
    address: config.contracts.semaphore[arbitrumSepolia.id] as string,
    provider: 'alchemy',
    apiKey: 'your-api-key-here',
})
