import { z } from 'zod'

export const GetUserDto = z.object({
  token: z.string(),
})

export type GetUserDto = z.infer<typeof GetUserDto>
