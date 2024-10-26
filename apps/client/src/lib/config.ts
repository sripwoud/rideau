import { capitalize } from 'client/l/display'
import { isEnvVarDefined, sharedConfig } from 'config'
import type { Metadata } from 'next'
import { merge } from 'ts-deepmerge'

interface ClientConfigI {
  alchemy: { supportUrl: string }
  bandada: { appUrl: string }
  metadata: Metadata
  serverUrl: string
}

// @ts-expect-error 4111
const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL ?? ''
isEnvVarDefined(serverUrl, 'NEXT_PUBLIC_SERVER_URL')

const _clientConfig: ClientConfigI = {
  alchemy: { supportUrl: 'gauthier@pse.dev' },
  bandada: { appUrl: 'https://app.bandada.pse.dev' },
  metadata: {
    title: capitalize(sharedConfig.appName),
    description: 'Anonymous survey and feedback platform',
  },
  serverUrl,
}

export const clientConfig = merge(sharedConfig, _clientConfig)
