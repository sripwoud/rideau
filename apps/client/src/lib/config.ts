import { Env, isEnvVarDefined, sharedConfig, type SharedConfigI } from 'config'

interface ClientConfigI {
  serverUrl: string
}
// @ts-ignore
const NEXT_PUBLIC_DEVELOPMENT_SERVER_URL = process.env.NEXT_PUBLIC_DEVELOPMENT_SERVER_URL ?? ''
// @ts-ignore
const NEXT_PUBLIC_PRODUCTION_SERVER_URL = process.env.NEXT_PUBLIC_PRODUCTION_SERVER_URL ?? ''
const serverUrlEnvVarName = sharedConfig.env === Env.DEVELOPMENT
  ? 'NEXT_PUBLIC_DEVELOPMENT_SERVER_URL'
  : 'NEXT_PUBLIC_PRODUCTION_SERVER_URL'
const serverUrl = sharedConfig.env === Env.DEVELOPMENT
  ? NEXT_PUBLIC_DEVELOPMENT_SERVER_URL
  : NEXT_PUBLIC_PRODUCTION_SERVER_URL
isEnvVarDefined(serverUrlEnvVarName, serverUrl)

const clientConfig: SharedConfigI & ClientConfigI = {
  ...sharedConfig,
  serverUrl,
}

export default clientConfig
