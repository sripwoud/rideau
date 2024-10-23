import { z } from 'zod'

export const CreateQuestionDto = z.object({
  title: z.string().min(10).includes('?'),
})

export type CreateQuestionDto = z.infer<typeof CreateQuestionDto>
