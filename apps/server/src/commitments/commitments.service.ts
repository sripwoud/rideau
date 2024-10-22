import { Inject, Injectable } from '@nestjs/common'
import { Identity } from '@semaphore-protocol/identity'
import { SupabaseClient } from '@supabase/supabase-js'
import { BandadaService } from 'server/bandada/bandada.service'
import type { CreateCommitmentDto } from 'server/commitments/dto/create-commitment.dto'
import type { Commitment, CommitmentInsert, CommitmentSelect } from 'server/commitments/entities'
import { serverConfig } from 'server/lib/config'
import { SUPABASE } from 'server/supabase/supabase.provider'

@Injectable()
export class CommitmentsService {
  constructor(private readonly bandada: BandadaService, @Inject(SUPABASE) private readonly supabase: SupabaseClient) {}

  async create({ email, signedMessage }: CreateCommitmentDto) {
    const commitment = new Identity(signedMessage).commitment.toString()

    await this.supabase.from('commitments').upsert<CommitmentInsert>({
      email,
      commitment,
    }, {
      ignoreDuplicates: true,
      onConflict: 'commitment',
    })

    if (email.endsWith('@pse.dev'))
      await this.bandada.addMember({ groupId: serverConfig.bandada.pseGroupId, memberId: commitment })
  }

  async find(email: string) {
    const { data } = await this.supabase.from('commitments').select<CommitmentSelect>('commitment').eq('email', email)
      .single<Commitment>()
    // TODO: use Option & Result instead of null
    return { commitment: data?.commitment ?? null }
  }
}
