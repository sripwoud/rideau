import { z } from 'zod'

export const ExportGroupDto = z.object({
  groupId: z.string(),
})

export type ExportGroupDto = z.infer<typeof ExportGroupDto>
