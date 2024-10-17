import { isEnvVarDefined, sharedConfig, type SharedConfigI } from 'config'
import type { Metadata } from 'next'

interface ClientConfigI {
  metadata: Metadata
  // TODO: move default config to server?
  semaphore: { fingerprintDuration: number; treeDepth: number }
  serverUrl: string
  semaphoreIdLocalStorageKey: string
}

const ONE_HOUR_S = 60 * 60
// @ts-expect-error 4111
const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL ?? ''
isEnvVarDefined(serverUrl, 'NEXT_PUBLIC_SERVER_URL')

const clientConfig: SharedConfigI & ClientConfigI = {
  ...sharedConfig,
  semaphore: {
    fingerprintDuration: ONE_HOUR_S,
    treeDepth: 16,
  }, // smallest supported by bandada
  metadata: {
    title: 'Rideau',
    description: 'Anonymous survey and feedback platform',
  },
  serverUrl,
  semaphoreIdLocalStorageKey: 'semaphoreId',
}

export default clientConfig
