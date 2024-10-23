import type { Database, Tables } from 'server/supabase/supabase.types'

export type Nullifier = Tables<'nullifiers'>
export type NullifierInsert = Database['public']['Tables']['nullifiers']['Insert']
