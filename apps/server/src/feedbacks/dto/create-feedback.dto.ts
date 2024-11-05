import { z } from 'zod'

export const CreateFeedbackDto = z.object({
  feedback: z.string().min(1, { message: 'Feedback cannot be empty' }),
  questionId: z.number().positive(),
})

export type CreateFeedbackDto = z.infer<typeof CreateFeedbackDto>
