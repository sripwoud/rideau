import { z } from 'zod'

export const SendFeedbackDto = z.object({
  questionId: z.number(),
  feedback: z.boolean(),
  proof: z.object({
    merkleTreeDepth: z.string(),
    merkleTreeRoot: z.string(),
    nullifierHash: z.string(),
    points: z.string(),
  }),
})

export type SendFeedbackDto = z.infer<typeof SendFeedbackDto>
