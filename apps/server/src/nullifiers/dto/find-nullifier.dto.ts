import { z } from 'zod'

export const FindOneNullifierDto = z.object({
  nullifier: z.string(),
})

export type FindOneNullifierDto = z.infer<typeof FindOneNullifierDto>
