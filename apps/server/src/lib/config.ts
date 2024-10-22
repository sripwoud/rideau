import { getEnvVar, sharedConfig } from 'config'
import { merge } from 'ts-deepmerge'

export enum Cookie {
  ACCESS = 'access-token',
  REFRESH = 'refresh-token',
}

const ONE_HOUR_MS = 60 * 60 * 1000
const SEVEN_DAYS_MS = 60 * 60 * 24 * 7 * 1000

interface ServerConfigI {
  alchemy: { apiKey: string; urls: { api: string; rpc: string } }
  auth: {
    cookieMaxAge: Record<Cookie, number>
    redirect: string
  }
  clientUrl: string
  bandada: { apiKey: string; url: string; pseGroupId: string }
  port: number
  supabase: { anonKey: string; url: string }
}

const _serverConfig: ServerConfigI = {
  alchemy: {
    apiKey: getEnvVar('ALCHEMY_API_KEY'),
    urls: { api: 'https://api.g.alchemy.com', rpc: 'https://arb-sepolia.g.alchemy.com/v2' },
  },
  auth: {
    cookieMaxAge: {
      [Cookie.ACCESS]: ONE_HOUR_MS,
      [Cookie.REFRESH]: SEVEN_DAYS_MS,
    },
    redirect: 'dashboard',
  },
  bandada: {
    apiKey: getEnvVar('BANDADA_API_KEY'),
    pseGroupId: getEnvVar('PSE_BANDADA_GROUP_ID'),
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
