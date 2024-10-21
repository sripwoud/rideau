import { z } from 'zod'

export const CreateCommitmentDto = z.object({
  email: z.string().email(),
  signedMessage: z.string().regex(/^0x[a-fA-F0-9]+$/),
})

export type CreateCommitmentDto = z.infer<typeof CreateCommitmentDto>
