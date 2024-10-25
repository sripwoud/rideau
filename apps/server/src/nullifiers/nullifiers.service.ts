import { Injectable } from '@nestjs/common'
import { SupabaseService } from 'server/supabase/supabase.service'

@Injectable()
export class NullifiersService {
  constructor(private readonly supabase: SupabaseService) {}

  async create(nullifier: string) {
    return this.supabase.from('nullifiers').insert({ nullifier })
  }

  async find(nullifier: string) {
    // TODO handle error, null is devil
    const { data } = await this.supabase.from('nullifiers').select().eq('nullifier', nullifier).single()
    return data?.created_at ?? null
  }
}
