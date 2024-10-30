import type { Database, Tables } from 'server/supabase/supabase.types'
import { z } from 'zod'

export type QuestionType = Database['public']['Enums']['question_type']
const questionTypes = ['boolean', 'number', 'option', 'text'] as const
export const questionTypeSchema = z.enum(questionTypes, {
  message: 'Invalid question type, must be one of: boolean, number, option, text',
})

export type OptionsType = Tables<'questions'>['options']

export const CreateQuestionDto = z.object({
  author: z.string().email(),
  groupId: z.string().min(1, { message: 'Group ID cannot be empty' }),
  title: z.string().min(10, { message: 'Title must be at least 10 characters long' }).includes('?', {
    message: 'Title must include a question mark',
  }),
  type: questionTypeSchema,
})

export type CreateQuestionDto = z.infer<typeof CreateQuestionDto>
