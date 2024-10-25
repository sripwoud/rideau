import { Injectable } from '@nestjs/common'
import { verifyProof } from '@semaphore-protocol/core'
import { BandadaService } from 'server/bandada/bandada.service'
import { CreateFeedbackDto, SendFeedbackDto } from 'server/feedbacks/dto'
import { NullifiersService } from 'server/nullifiers/nullifiers.service'
import { QuestionsService } from 'server/questions/questions.service'
import { RootsService } from 'server/roots/roots.service'
import { SupabaseService } from 'server/supabase/supabase.service'

@Injectable()
export class FeedbacksService {
  constructor(
    private readonly bandada: BandadaService,
    private readonly nullifiers: NullifiersService,
    private readonly roots: RootsService,
    private readonly supabase: SupabaseService,
    private readonly questions: QuestionsService,
  ) {}

  async create(createFeedbackDto: CreateFeedbackDto) {
    return this.supabase.from('feedbacks').insert(createFeedbackDto)
  }

  async findAll() {
    return this.supabase.from('feedbacks').select().order('created_at', { ascending: false }).returns()
  }

  // TODO: handle errors, abstract in smaller steps
  async send({ groupId, feedback, proof, questionId }: SendFeedbackDto) {
    const { data: question } = await this.questions.find({ groupId, questionId })
    if (question === null) throw new Error('No matching question found')
    if (question.active === false) throw new Error('Question is inactive, you cannot send feedback anymore')

    const { data: nullifiers } = await this.nullifiers.find(proof.nullifier)
    if (nullifiers !== null) throw new Error('Nullifier already used, you are submitting the same nullifier twice')

    const lastRoot = await this.roots.findLatest()
    if (lastRoot === null) throw new Error('No root found')
    if (lastRoot !== proof.merkleTreeRoot) {
      // non matching roots are tolerated only if the fingerprint duration is not passed
      const { fingerprintDuration } = await this.bandada.getGroup({ groupId })
      const lastRootCreatedAt = lastRoot.created_at
      if (Date.now() > Date.parse(lastRootCreatedAt) + fingerprintDuration)
        throw new Error('Root has expired (fingerprint duration passed)')
    }

    const valid = await verifyProof(proof)
    if (!valid) throw new Error('Invalid proof')

    await this.nullifiers.create(proof.nullifier)
    return this.create({ feedback, question_id: questionId })
  }
}
