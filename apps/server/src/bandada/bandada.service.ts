import { ApiSdk } from '@bandada/api-sdk'
import { Injectable } from '@nestjs/common'
import type {
  AddMemberDto,
  CreateGroupDto,
  GetGroupDto,
  GetGroupsByMemberIdDto,
  RemoveGroupDto,
} from 'server/bandada/dto'
import { serverConfig } from 'server/l/config'

@Injectable()
export class BandadaService {
  sdk = new ApiSdk(serverConfig.bandada.url)
  private apiKey = serverConfig.bandada.apiKey

  async addMember({ groupId, memberId }: AddMemberDto) {
    // TODO: handle/bubble error or check first that member already joins, otherwise this returns 400
    // https://github.com/bandada-infra/bandada/blob/5b19cf7dd3e9353316c9ae54a353a766d3cfe1c1/apps/api/src/app/groups/groups.service.ts#L426
    return this.sdk.addMemberByApiKey(groupId, memberId, this.apiKey)
  }

  async createGroup(createGroupDto: CreateGroupDto) {
    return this.sdk.createGroup(createGroupDto, this.apiKey)
  }

  async getGroup({ groupId }: GetGroupDto) {
    return this.sdk.getGroup(groupId)
  }

  async getGroupsByMemberId({ memberId }: GetGroupsByMemberIdDto) {
    return this.sdk.getGroupsByMemberId(memberId)
  }

  // TODO: using object because trpc requires object input (does it?)
  async removeGroup({ groupId }: RemoveGroupDto) {
    return this.sdk.removeGroup(groupId, this.apiKey)
  }
}
