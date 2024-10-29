import { z } from 'zod'

export const MaybeJoinGroupDto = z.object({
  groupId: z.string(),
  memberId: z.string(),
})

export type MaybeJoinGroupDto = z.infer<typeof MaybeJoinGroupDto>
