import type { Database, Tables } from 'server/supabase/supabase.types'

export type Root = Tables<'roots'>
export type RootInsert = Database['public']['Tables']['roots']['Insert']
