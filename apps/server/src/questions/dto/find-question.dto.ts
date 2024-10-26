import { z } from 'zod'

export const FindQuestionDto = z.object({
  questionId: z.number().int().positive(),
})

export type FindQuestionDto = z.infer<typeof FindQuestionDto>
