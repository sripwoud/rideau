import { isEnvVarDefined, sharedConfig, type SharedConfigI } from 'config'

interface ClientConfigI {
  serverUrl: string
}

// @ts-expect-error 4111
const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL ?? ''
isEnvVarDefined(serverUrl, 'NEXT_PUBLIC_SERVER_URL')

const clientConfig: SharedConfigI & ClientConfigI = {
  ...sharedConfig,
  serverUrl,
}

export default clientConfig
