import type { Database } from 'server/supabase/supabase.types'

export type CommitmentInsert = Database['public']['Tables']['commitments']['Insert']
