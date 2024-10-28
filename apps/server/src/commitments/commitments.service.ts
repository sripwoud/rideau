import { Injectable } from '@nestjs/common'
import type { CreateCommitmentDto, FindCommitmentDto } from 'server/commitments/dto'
import { SupabaseService } from 'server/supabase/supabase.service'

@Injectable()
export class CommitmentsService {
  constructor(private readonly supabase: SupabaseService) {}

  async create(createCommitmentDto: CreateCommitmentDto) {
    return this.supabase.from('commitments').upsert(createCommitmentDto, {
      ignoreDuplicates: true,
      onConflict: 'commitment',
    })
  }

  async find({ email }: FindCommitmentDto) {
    const { data } = await this
      .supabase
      .from('commitments')
      .select('commitment')
      .eq('email', email)
      .single()
    // TODO: use Option & Result instead of null
    return { commitment: data?.commitment ?? null }
  }
}
