import { Injectable } from '@nestjs/common'
import { GroupsService } from 'server/groups/groups.service'
import type {
  CreateRootDto,
  FindLatestRootDto,
  FindRootDto,
  IsValidRootDto,
  MatchLatestRootDto,
  RootHasExpiredDto,
} from 'server/roots/dto'
import { SupabaseService } from 'server/supabase/supabase.service'

@Injectable()
export class RootsService {
  constructor(private readonly groups: GroupsService, private readonly supabase: SupabaseService) {}

  async create({ groupId: group_id, root }: CreateRootDto) {
    return this.supabase.from('roots').insert({ group_id, root })
  }

  private async find({ groupId: group_id, root }: FindRootDto) {
    // TODO handle error, null is devil
    // (group_id, root) is unique (db constraint) so there can only be one
    return this.supabase.from('roots').select().eq('group_id', group_id).eq('root', root).single()
  }

  private async findLatest({ groupId }: FindLatestRootDto) {
    return this
      .supabase
      .from('roots')
      .select('root')
      .eq('group_id', groupId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()
  }

  private async hasExpired({ groupId, root }: RootHasExpiredDto) {
    const { data } = await this.find({ groupId, root })
    if (data === null) throw new Error('Root not found')
    const { fingerprintDuration } = await this.groups.find({ groupId })
    return Date.now() > Date.parse(data.created_at) + fingerprintDuration
  }

  async isNotLatestAndHasExpired({ groupId, root }: IsValidRootDto) {
    return await this.isNotLatest({ groupId, root }) && await this.hasExpired({ groupId, root })
  }

  private async isNotLatest({ groupId, root }: MatchLatestRootDto) {
    const { data } = await this.findLatest({ groupId })
    if (data === null) return false
    return data.root !== root
  }
}
