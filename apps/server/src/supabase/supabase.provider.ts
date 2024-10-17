import type { Provider } from '@nestjs/common'
import { createClient } from '@supabase/supabase-js'
import config from 'server/l/config'

export const SUPABASE = 'SUPABASE'

export const SupabaseProvider: Provider = {
  provide: SUPABASE,
  useValue: createClient(config.supabase.url, config.supabase.anonKey, { auth: { flowType: 'pkce' } }),
}
