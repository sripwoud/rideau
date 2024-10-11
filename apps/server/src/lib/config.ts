import { getEnvVar, getEnvVarNumber, sharedConfig, type SharedConfigI } from 'config'

interface ServerConfigI {
  port: number
  supabase: { anonKey: string; url: string }
}

const serverConfig: ServerConfigI & SharedConfigI = {
  ...sharedConfig,
  port: getEnvVarNumber('SERVER_PORT'),
  supabase: {
    anonKey: getEnvVar(`${sharedConfig.env}_SUPABASE_ANON_KEY`),
    url: getEnvVar(`${sharedConfig.env}_SUPABASE_URL`),
  },
}

export default serverConfig
