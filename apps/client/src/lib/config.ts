import { isEnvVarDefined, sharedConfig, type SharedConfigI } from 'config'
import type { Metadata } from 'next'
import { arbitrumSepolia } from 'viem/chains'

type HexString = `0x${string}`
enum Contract {
  Semaphore = 'semaphore',
  YesNoFeedback = 'yesNoFeedback',
}
interface ClientConfigI {
  contracts: Record<Contract, Record<number, HexString>>
  metadata: Metadata
  serverUrl: string
}

// @ts-expect-error 4111
const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL ?? ''
isEnvVarDefined(serverUrl, 'NEXT_PUBLIC_SERVER_URL')

const clientConfig: SharedConfigI & ClientConfigI = {
  ...sharedConfig,
  metadata: {
    title: 'Rideau',
    description: 'Anonymous survey and feedback platform',
  },
  contracts: {
    [Contract.YesNoFeedback]: { [arbitrumSepolia.id]: '0x4308bfd6c6cd829b6d342c90b43bef46700cec8d' as HexString },
    [Contract.Semaphore]: { [arbitrumSepolia.id]: '0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f' as HexString },
  },
  serverUrl,
}

export default clientConfig
