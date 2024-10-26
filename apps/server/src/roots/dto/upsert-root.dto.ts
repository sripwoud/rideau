import { z } from 'zod'

export const UpsertRootDto = z.object({
  groupId: z.string(),
  root: z.string(),
})

export type UpsertRootDto = z.infer<typeof UpsertRootDto>
