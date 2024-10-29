import { z } from 'zod'

export const CreateQuestionDto = z.object({
  author: z.string().email(),
  groupId: z.string().min(1, { message: 'Group ID cannot be empty' }),
  title: z.string().min(10, { message: 'Title must be at least 10 characters long' }).includes('?', {
    message: 'Title must include a question mark',
  }),
})

export type CreateQuestionDto = z.infer<typeof CreateQuestionDto>
