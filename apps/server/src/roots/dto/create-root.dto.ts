import { z } from 'zod'

export const CreateRootDto = z.object({
  nullifier: z.string(),
})

export type CreateRootDto = z.infer<typeof CreateRootDto>
