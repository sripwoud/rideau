import { z } from 'zod'

export const FindAllGroupsDto = z.object({
  memberId: z.string(),
})

export type FindAllGroupsDto = z.infer<typeof FindAllGroupsDto>
