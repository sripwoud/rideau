import type { Provider } from '@nestjs/common'
import { createClient } from '@supabase/supabase-js'
import { serverConfig } from 'server/l/config'
import type { Database } from 'server/supabase/supabase.types'

export const SUPABASE = 'SUPABASE'

export const SupabaseProvider: Provider = {
  provide: SUPABASE,
  useValue: createClient<Database>(serverConfig.supabase.url, serverConfig.supabase.anonKey),
}
