import { getEnvVar, sharedConfig } from 'config'
import { merge } from 'ts-deepmerge'

interface ServerConfigI {
  alchemy: { apiKey: string; urls: { api: string; rpc: string } }
  clientUrl: string
  bandada: { apiKey: string; url: string }
  port: number
  supabase: { anonKey: string; url: string }
}

const _serverConfig: ServerConfigI = {
  alchemy: {
    apiKey: getEnvVar('ALCHEMY_API_KEY'),
    urls: { api: 'https://api.g.alchemy.com', rpc: 'https://arb-sepolia.g.alchemy.com/v2' },
  },
  bandada: {
    apiKey: getEnvVar('BANDADA_API_KEY'),
    url: 'https://api.bandada.pse.dev',
  },
  clientUrl: getEnvVar('CLIENT_URL'),
  port: 3001,
  supabase: {
    anonKey: getEnvVar('SUPABASE_ANON_KEY'),
    url: getEnvVar('SUPABASE_URL'),
  },
}

export const serverConfig = merge(sharedConfig, _serverConfig)
