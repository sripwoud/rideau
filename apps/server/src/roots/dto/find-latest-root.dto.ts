import { z } from 'zod'

export const FindLatestRootDto = z.object({
  groupId: z.string(),
})

export type FindLatestRootDto = z.infer<typeof FindLatestRootDto>
