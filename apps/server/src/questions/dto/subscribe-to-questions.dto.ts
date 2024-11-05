import { z } from 'zod'

export const SubscribeToQuestionsDto = z.object({
  groupId: z.string(),
})
