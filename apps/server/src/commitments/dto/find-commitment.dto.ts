import { z } from 'zod'

export const FindCommitmentDto = z.object({ email: z.string().email() })
export type FindCommitmentDto = z.infer<typeof FindCommitmentDto>
