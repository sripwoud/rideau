import { z } from 'zod'

export const RemoveGroupDto = z.object({
  groupId: z.string(),
})

export type RemoveGroupDto = z.infer<typeof RemoveGroupDto>
