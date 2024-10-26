import { z } from 'zod'

export const FindRootDto = z.object({
  groupId: z.string(),
})

export type FindRootDto = z.infer<typeof FindRootDto>
