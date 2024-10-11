import { getEnvVar, sharedConfig, type SharedConfigI } from 'config'

interface ServerConfigI {
  alchemyApiKey: string
  port: number
  supabase: { anonKey: string; url: string }
}

const serverConfig: ServerConfigI & SharedConfigI = {
  ...sharedConfig,
  alchemyApiKey: getEnvVar('ALCHEMY_API_KEY'),
  port: 3001,
  supabase: {
    anonKey: getEnvVar('SUPABASE_ANON_KEY'),
    url: getEnvVar('SUPABASE_URL'),
  },
}

export default serverConfig
