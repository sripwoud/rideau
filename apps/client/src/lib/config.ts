import { capitalize } from 'client/l/display'
import { isEnvVarDefined, sharedConfig } from 'config'
import type { Metadata } from 'next'
import { merge } from 'ts-deepmerge'

interface ClientConfigI {
  metadata: Metadata
  // TODO: move default config to server?
  semaphore: { fingerprintDuration: number; treeDepth: number; localStorageKey: string }
  serverUrl: string
}

const ONE_HOUR_S = 60 * 60
// @ts-expect-error 4111
const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL ?? ''
isEnvVarDefined(serverUrl, 'NEXT_PUBLIC_SERVER_URL')

const _clientConfig: ClientConfigI = {
  semaphore: {
    fingerprintDuration: ONE_HOUR_S,
    localStorageKey: 'semaphore-id',
    treeDepth: 16, // smallest supported by bandada
  },
  metadata: {
    title: capitalize(sharedConfig.appName),
    description: 'Anonymous survey and feedback platform',
  },
  serverUrl,
}

export const clientConfig = merge(sharedConfig, _clientConfig)
