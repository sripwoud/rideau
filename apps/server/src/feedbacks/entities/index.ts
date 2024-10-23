import type { Database, Tables } from 'server/supabase/supabase.types'

export type Feedback = Tables<'feedbacks'>
export type FeedbackInsert = Database['public']['Tables']['feedbacks']['Insert']
