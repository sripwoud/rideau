import { Database, Tables } from 'server/supabase/supabase.types'

export type QuestionInsert = Database['public']['Tables']['questions']['Insert']
export type Question = Tables<'questions'>
