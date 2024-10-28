import { z } from 'zod'

export const CreateRootDto = z.object({
  groupId: z.string(),
  root: z.string(),
})

export type CreateRootDto = z.infer<typeof CreateRootDto>
