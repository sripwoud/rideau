import { z } from 'zod'

export const FindAllQuestionsDto = z.object({
  groupId: z.string().min(1), // TODO: stricter validation?
})

export type FindAllQuestionsDto = z.infer<typeof FindAllQuestionsDto>
