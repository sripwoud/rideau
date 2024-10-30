import { Injectable } from '@nestjs/common'
import { verifyProof } from '@semaphore-protocol/core'
import { type CreateFeedbackDto, DynamicFeedbackSchema, type SendFeedbackDto } from 'server/feedbacks/dto'
import { NullifiersService } from 'server/nullifiers/nullifiers.service'
import { QuestionsService } from 'server/questions/questions.service'
import { RootsService } from 'server/roots/roots.service'
import { SupabaseService } from 'server/supabase/supabase.service'

@Injectable()
export class FeedbacksService {
  constructor(
    private readonly nullifiers: NullifiersService,
    private readonly roots: RootsService,
    private readonly supabase: SupabaseService,
    private readonly questions: QuestionsService,
  ) {}

  async create({ feedback, questionId: question_id }: CreateFeedbackDto) {
    return this.supabase.from('feedbacks').insert({ feedback, question_id })
  }

  // some of the validation could happen at the router layer
  // but due to the dynamic nature of the validation
  // (constraints between feedback and question types that aren't enforced at the db layer)
  // it is better to keep it here for better separation of concerns and maintainability
  // the router keeps doing only static input validation
  async send({ groupId, feedback, proof, questionId }: SendFeedbackDto) {
    const { data: question } = await this.questions.find({ questionId })
    if (question === null) throw new Error('Question does not exist')

    const { active, type, options } = question
    if (!active) throw new Error('Question is inactive, you cannot send feedback anymore')

    const feedbackSchema = DynamicFeedbackSchema(type, options)
    feedbackSchema.parse(feedback)

    if (await this.nullifiers.isAlreadyUsed({ nullifier: proof.nullifier })) throw new Error('Nullifier already used')
    if (await this.roots.isNotLatestAndHasExpired({ groupId, root: proof.merkleTreeRoot }))
      throw new Error('Root has expired (fingerprint duration passed)')
    if (!await verifyProof(proof)) throw new Error('Invalid proof')

    await this.nullifiers.create({ nullifier: proof.nullifier })
    return this.create({ feedback, questionId })
  }
}
