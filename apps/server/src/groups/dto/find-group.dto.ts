import { z } from 'zod'

export const FindGroupDto = z.object({
  groupId: z.string(),
})

export type FindGroupDto = z.infer<typeof FindGroupDto>
