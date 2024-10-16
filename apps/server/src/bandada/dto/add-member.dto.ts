import { z } from 'zod'

export const AddMemberDto = z.object({
  groupId: z.string(),
  memberId: z.string(),
})

export type AddMemberDto = z.infer<typeof AddMemberDto>
