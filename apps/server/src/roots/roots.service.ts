import { Injectable } from '@nestjs/common'
import { BandadaService } from 'server/bandada/bandada.service'
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
  constructor(private readonly bandada: BandadaService, private readonly supabase: SupabaseService) {}

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

  private async hasNotExpired({ groupId, root }: RootHasExpiredDto) {
    const { data } = await this.find({ groupId, root })
    if (data === null) throw new Error('Root not found')
    const { fingerprintDuration } = await this.bandada.getGroup({ groupId })
    if (Date.now() > Date.parse(data.created_at) + fingerprintDuration)
      throw new Error('Root has expired (fingerprint duration passed)')
  }

  async isValid({ groupId, root }: IsValidRootDto) {
    if (!await this.matchLatest({ groupId, root })) await this.hasNotExpired({ groupId, root })
  }

  private async matchLatest({ groupId, root }: MatchLatestRootDto) {
    const { data } = await this.findLatest({ groupId })
    if (data === null) return false
    return data.root === root
  }
}
