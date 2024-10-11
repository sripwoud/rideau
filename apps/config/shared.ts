import type { SharedConfigI } from './types'
import { getEnv } from './utils'

const env = getEnv()

const config: SharedConfigI = {
  appName: 'rideau',
  env,
  alchemyProxyEndpoint: 'alchemy',
}

export default config
