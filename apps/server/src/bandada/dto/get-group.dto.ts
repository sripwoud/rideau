import { z } from 'zod'

export const GetGroupDto = z.object({
  groupId: z.string(),
})

export type GetGroupDto = z.infer<typeof GetGroupDto>
