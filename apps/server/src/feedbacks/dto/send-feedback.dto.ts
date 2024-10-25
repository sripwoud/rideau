import type { SemaphoreProof } from '@semaphore-protocol/core'
import { z } from 'zod'

export const SendFeedbackDto = z.object({
  groupId: z.string(),
  feedback: z.boolean(),
  questionId: z.number(),
  proof: z.object({
    merkleTreeDepth: z.number().int().min(16).max(32),
    merkleTreeRoot: z.string(),
    message: z.string(),
    nullifier: z.string(),
    points: z.tuple([z.string(), z.string(), z.string(), z.string(), z.string(), z.string(), z.string(), z.string()]),
    scope: z.string(),
  }),
})

export type SendFeedbackDto = Omit<z.infer<typeof SendFeedbackDto>, 'proof'> & { proof: SemaphoreProof }
