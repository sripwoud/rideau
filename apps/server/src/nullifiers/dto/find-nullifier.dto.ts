import { z } from 'zod'

export const FindNullifierDto = z.object({
  nullifier: z.string(),
})

export type FindNullifierDto = z.infer<typeof FindNullifierDto>
