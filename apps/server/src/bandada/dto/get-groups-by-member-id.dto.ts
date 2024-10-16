import { z } from 'zod'

export const GetGroupsByMemberIdDto = z.object({
  memberId: z.string(),
})

export type GetGroupsByMemberIdDto = z.infer<typeof GetGroupsByMemberIdDto>
