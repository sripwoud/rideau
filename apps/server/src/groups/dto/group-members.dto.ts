import { z } from 'zod'

export const GroupMembersDto = z.object({ questionId: z.number().int() })
export type GroupMembersDto = z.infer<typeof GroupMembersDto>
