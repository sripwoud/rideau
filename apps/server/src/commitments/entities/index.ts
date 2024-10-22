import type { Database, Tables } from 'server/supabase/supabase.types'

export type Commitment = Tables<'commitments'>
export type CommitmentSelect = string
export type CommitmentInsert = Database['public']['Tables']['commitments']['Insert']
