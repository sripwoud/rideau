import { z } from 'zod'

export const VerifyDto = z.object({
  token_hash: z.string(),
})

export type VerifyDto = z.infer<typeof VerifyDto>
