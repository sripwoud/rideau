import { z } from 'zod'

export const FindAllQuestionDto = z.object({
  groupId: z.string().min(1), // TODO: stricter validation
})
