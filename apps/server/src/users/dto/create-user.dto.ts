import { z } from 'zod'

export const CreateUserDto = z.object({
  publicKey: z.string(),
  email: z.string().email({ message: 'Invalid email' }),
})

export type CreateUserDto = z.infer<typeof CreateUserDto>
