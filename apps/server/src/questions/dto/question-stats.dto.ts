import { z } from 'zod'
import { questionTypeSchema } from './create-question.dto'

export const QuestionStatsDto = z.object({ questionId: z.number().positive(), type: questionTypeSchema.optional() })
export type QuestionStatsDto = z.infer<typeof QuestionStatsDto>
