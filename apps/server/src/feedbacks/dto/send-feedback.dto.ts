import type { SemaphoreProof } from '@semaphore-protocol/core'
import type { OptionsType, QuestionType } from 'server/questions/dto'
import { z } from 'zod'

export const SendFeedbackDto = z.object({
  feedback: z.string().min(1, { message: 'Feedback cannot be empty' }),
  groupId: z.string().min(1, { message: 'Group ID cannot be empty' }),
  questionId: z.number().positive(),
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

export const DynamicFeedbackSchema = (type: QuestionType, options?: OptionsType) => {
  switch (type) {
    case 'boolean':
      return z.enum(['yes', 'no'])
    case 'number':
      return z.number().int().min(0)
    case 'option':
      if (options === null || options === undefined || options.length === 0)
        throw new Error('Options are required for option type')
      return z.enum(options as [string, ...string[]])
    case 'text':
      return z.string().min(1)
  }
}
