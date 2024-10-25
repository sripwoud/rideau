import { Injectable } from '@nestjs/common'
import { SupabaseService } from 'server/supabase/supabase.service'

@Injectable()
export class RootsService {
  constructor(private readonly supabase: SupabaseService) {}

  async create(root: string) {
    return this.supabase.from('roots').insert({ root })
  }

  async findLatest() {
    // TODO handle error, null is devil
    const { data } = await this.supabase.from('roots').select().order('created_at', { ascending: false }).single()
    return data?.root ?? null
  }

  async find(root: string) {
    // TODO handle error, null is devil
    const { data } = await this.supabase.from('roots').select().eq('root', root).single()
    return data?.created_at ?? null
  }
}
