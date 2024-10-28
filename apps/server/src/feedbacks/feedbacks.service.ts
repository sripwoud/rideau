import { Injectable } from '@nestjs/common'
import { verifyProof } from '@semaphore-protocol/core'
import { CreateFeedbackDto, SendFeedbackDto } from 'server/feedbacks/dto'
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

  // TODO: handle errors, abstract in smaller steps?
  async send({ groupId, feedback, proof, questionId }: SendFeedbackDto) {
    const { data: question } = await this.questions.find({ questionId })
    if (question === null) throw new Error('No matching question found')
    if (question.active === false) throw new Error('Question is inactive, you cannot send feedback anymore')

    await this.nullifiers.isNotAlreadyUsed({ nullifier: proof.nullifier })
    await this.roots.isLatestOrHasNotExpired({ groupId, root: proof.merkleTreeRoot })

    const valid = await verifyProof(proof)
    if (!valid) throw new Error('Invalid proof')

    await this.nullifiers.create({ nullifier: proof.nullifier })
    return this.create({ feedback, questionId })
  }
}
