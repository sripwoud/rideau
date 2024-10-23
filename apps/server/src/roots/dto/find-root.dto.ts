import { z } from 'zod'

export const FindOneRootDto = z.object({
  nullifier: z.string(),
})

export type FindOneRootDto = z.infer<typeof FindOneRootDto>
