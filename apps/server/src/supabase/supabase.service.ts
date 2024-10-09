import { Injectable } from '@nestjs/common'
import { createClient } from '@supabase/supabase-js'

@Injectable()
export class SupabaseService {
  // biome-ignore lint/style/noNonNullAssertion: FIXME
  supabase = createClient(process.env['SUPABASE_URL']!, process.env['SUPABASE_ANON_KEY']!)
}
