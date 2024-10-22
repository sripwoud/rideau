import { z } from 'zod'

export const CreateCommitmentDto = z.object({
  commitment: z.string(),
  email: z.string().email(),
})

export type CreateCommitmentDto = z.infer<typeof CreateCommitmentDto>
