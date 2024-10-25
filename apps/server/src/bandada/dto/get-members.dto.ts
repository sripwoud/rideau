import { z } from 'zod'

export const GetMembersDto = z.object({ questionId: z.number().int() })
export type GetMembersDto = z.infer<typeof GetMembersDto>
