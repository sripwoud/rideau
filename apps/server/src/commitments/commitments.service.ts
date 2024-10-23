import { Inject, Injectable } from '@nestjs/common'
import { SupabaseClient } from '@supabase/supabase-js'
import type { CreateCommitmentDto } from 'server/commitments/dto'
import type { Commitment, CommitmentInsert, CommitmentSelect } from 'server/commitments/entities'
import { SUPABASE } from 'server/supabase/supabase.provider'

@Injectable()
export class CommitmentsService {
  constructor(@Inject(SUPABASE) private readonly supabase: SupabaseClient) {}

  async create({ commitment, email }: CreateCommitmentDto) {
    return this.supabase.from('commitments').upsert<CommitmentInsert>({
      email,
      commitment,
    }, {
      ignoreDuplicates: true,
      onConflict: 'commitment',
    })
  }

  async find(email: string) {
    const { data } = await this.supabase.from('commitments').select<CommitmentSelect>('commitment').eq('email', email)
      .single<Commitment>()
    // TODO: use Option & Result instead of null
    return { commitment: data?.commitment ?? null }
  }
}
