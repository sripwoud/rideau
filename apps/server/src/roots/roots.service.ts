import { Inject, Injectable } from '@nestjs/common'
import { SupabaseClient } from '@supabase/supabase-js'
import type { Root, RootInsert } from 'server/roots/entities/root.entity'
import { SUPABASE } from 'server/supabase/supabase.provider'

@Injectable()
export class RootsService {
  constructor(@Inject(SUPABASE) private readonly supabase: SupabaseClient) {}

  async create(root: string) {
    return this.supabase.from('roots').insert<RootInsert>({ root })
  }

  async findLatest() {
    // TODO handle error, null is devil
    const { data } = await this.supabase.from('roots').select().order('created_at', { ascending: false }).single<Root>()
    return data?.root ?? null
  }

  async find(root: string) {
    // TODO handle error, null is devil
    const { data } = await this.supabase.from('roots').select().eq('root', root).single<Root>()
    return data?.created_at ?? null
  }
}
