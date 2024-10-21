import { Inject, Injectable } from '@nestjs/common'
import { Identity } from '@semaphore-protocol/identity'
import { SupabaseClient } from '@supabase/supabase-js'
import type { CreateCommitmentDto } from 'server/commitments/dto/create-commitment.dto'
import type { CommitmentInsert } from 'server/commitments/entities/commitment-insert.type'
import { SUPABASE } from 'server/supabase/supabase.provider'

@Injectable()
export class CommitmentsService {
  constructor(@Inject(SUPABASE) private readonly supabase: SupabaseClient) {}

  async create({ email, signedMessage }: CreateCommitmentDto) {
    const commitment = new Identity(signedMessage).commitment
    return this.supabase.from('commitments').insert<CommitmentInsert>({
      email,
      commitment,
    })
  }
}
