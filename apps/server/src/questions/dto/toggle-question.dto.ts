import { z } from 'zod'

export const ToggleQuestionDto = z.object({
  active: z.boolean(),
  questionId: z.number().positive(),
})

export type ToggleQuestionDto = z.infer<typeof ToggleQuestionDto>
