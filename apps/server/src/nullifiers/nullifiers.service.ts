import { Inject, Injectable } from '@nestjs/common'
import { SupabaseClient } from '@supabase/supabase-js'
import { Nullifier, NullifierInsert } from 'server/nullifiers/entities'
import { SUPABASE } from 'server/supabase/supabase.provider'

@Injectable()
export class NullifiersService {
  constructor(@Inject(SUPABASE) private readonly supabase: SupabaseClient) {}

  async create(nullifier: string) {
    return this.supabase.from('nullifiers').insert<NullifierInsert>({ nullifier })
  }

  async find(nullifier: string) {
    // TODO handle error, null is devil
    const { data } = await this.supabase.from('nullifiers').select().eq('nullifier', nullifier).single<Nullifier>()
    return data?.created_at ?? null
  }
}
