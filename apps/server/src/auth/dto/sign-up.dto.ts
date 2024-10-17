import { z } from 'zod'

export const SignUpDto = z.object({
  email: z.string().email(),
})

export type SignUpDto = z.infer<typeof SignUpDto>
