import { getEnvVar, sharedConfig, type SharedConfigI } from 'config'

export enum Cookie {
  ACCESS = 'access-token',
  REFRESH = 'refresh-token',
}

const ONE_HOUR_MS = 60 * 60 * 1000
const SEVEN_DAYS_MS = 60 * 60 * 24 * 7 * 1000

interface ServerConfigI {
  auth: {
    cookieMaxAge: Record<Cookie, number>
    redirect: string
  }
  clientUrl: string
  bandada: { apiKey: string; url: string }
  port: number
  supabase: { anonKey: string; url: string }
}

export const serverConfig: ServerConfigI & SharedConfigI = {
  ...sharedConfig,
  auth: {
    cookieMaxAge: { [Cookie.ACCESS]: ONE_HOUR_MS, [Cookie.REFRESH]: SEVEN_DAYS_MS },
    redirect: 'dashboard',
  },
  bandada: { apiKey: getEnvVar('BANDADA_API_KEY'), url: 'https://api.bandada.pse.dev' },
  clientUrl: getEnvVar('CLIENT_URL'),
  port: 3001,
  supabase: {
    anonKey: getEnvVar('SUPABASE_ANON_KEY'),
    url: getEnvVar('SUPABASE_URL'),
  },
}
