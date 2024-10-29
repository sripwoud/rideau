import type { GroupCreationDetails } from '@bandada/api-sdk'
import { z } from 'zod'

export const CreateGroupDto = z.object({
  name: z.string(),
  description: z.string(),
  treeDepth: z.number().int().min(16).max(32),
  fingerprintDuration: z.number(),
  credentials: z.any().optional(),
})

export type CreateGroupDto = GroupCreationDetails
