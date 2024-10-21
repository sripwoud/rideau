import type { Database as DatabaseGenerated } from 'server/supabase/supabase-generated.types'
import type { MergeDeep } from 'type-fest'

export type Database = MergeDeep<DatabaseGenerated, {
  public: { Tables: { commitments: { Row: { commitment: bigint }; Insert: { commitment: bigint } } } }
}>
