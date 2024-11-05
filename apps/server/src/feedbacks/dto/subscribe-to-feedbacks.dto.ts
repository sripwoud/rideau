import { z } from 'zod'

export const SubscribeToFeedbacksDto = z.object({
  questionId: z.number().int().positive(),
})

export type SubscribeToFeedbacksDto = z.infer<typeof SubscribeToFeedbacksDto>
