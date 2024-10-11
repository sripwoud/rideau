import { Injectable } from '@nestjs/common'
import { createClient } from '@supabase/supabase-js'
import config from 'server/l/config'

@Injectable()
export class SupabaseService {
  supabase = createClient(config.supabase.url, config.supabase.anonKey)
}
