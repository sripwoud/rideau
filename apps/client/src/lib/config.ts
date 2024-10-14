import { isEnvVarDefined, sharedConfig, type SharedConfigI } from 'config'
import type { Metadata } from 'next'

interface ClientConfigI {
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

  serverUrl,
}

export default clientConfig
