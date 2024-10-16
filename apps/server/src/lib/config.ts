import { getEnvVar, sharedConfig, type SharedConfigI } from 'config'

interface ServerConfigI {
  apiKeys: Record<'alchemy' | 'bandada', string>
  port: number
  supabase: { anonKey: string; url: string }
  urls: { alchemy: Record<'rpc' | 'api', string>; bandada: { api: string } }
}

const serverConfig: ServerConfigI & SharedConfigI = {
  ...sharedConfig,
  apiKeys: { alchemy: getEnvVar('ALCHEMY_API_KEY'), bandada: getEnvVar('BANDADA_API_KEY') },
  port: 3001,
  supabase: {
    anonKey: getEnvVar('SUPABASE_ANON_KEY'),
    url: getEnvVar('SUPABASE_URL'),
  },
  urls: {
    bandada: { api: 'https://api.bandada.pse.dev' },
    alchemy: { api: 'https://api.g.alchemy.com', rpc: 'https://arb-sepolia.g.alchemy.com/v2' },
  },
}

export default serverConfig
