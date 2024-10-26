import { Injectable } from '@nestjs/common'
import { FindRootDto, UpsertRootDto } from 'server/roots/dto'
import { SupabaseService } from 'server/supabase/supabase.service'

@Injectable()
export class RootsService {
  constructor(private readonly supabase: SupabaseService) {}

  async upsert({ groupId: group_id, root }: UpsertRootDto) {
    return this.supabase.from('roots').upsert({ group_id, root })
  }

  async find({ groupId }: FindRootDto) {
    // TODO handle error, null is devil
    return this.supabase.from('roots').select().eq('group_id', groupId).single() // group_id is a unique key so there can only be one
  }
}
