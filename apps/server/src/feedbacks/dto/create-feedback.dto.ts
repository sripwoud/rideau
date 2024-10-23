import { z } from 'zod'

export const CreateFeedbackDto = z.object({
  feedback: z.boolean(),
  question_id: z.number().positive(),
})

export type CreateFeedbackDto = z.infer<typeof CreateFeedbackDto>
