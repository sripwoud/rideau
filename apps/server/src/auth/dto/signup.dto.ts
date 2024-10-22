import { z } from 'zod'

export const SignupDto = z.object({
  email: z.string().email(),
  signedMessage: z.string().regex(/^0x[a-fA-F0-9]+$/),
})

export type SignupDto = z.infer<typeof SignupDto>
