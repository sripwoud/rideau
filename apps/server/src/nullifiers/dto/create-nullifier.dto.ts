import { z } from 'zod'

export const CreateNullifierDto = z.object({
  nullifier: z.string(),
})

export type CreateNullifierDto = z.infer<typeof CreateNullifierDto>
