import type { Provider } from '@nestjs/common'
import { createClient } from '@supabase/supabase-js'
import { serverConfig } from 'server/l/config'

export const SUPABASE = 'SUPABASE'

export const SupabaseProvider: Provider = {
  provide: SUPABASE,
  useValue: createClient(serverConfig.supabase.url, serverConfig.supabase.anonKey, { auth: { flowType: 'pkce' } }),
}
