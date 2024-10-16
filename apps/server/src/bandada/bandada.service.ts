import { ApiSdk } from '@bandada/api-sdk'
import { Injectable } from '@nestjs/common'
import type {
  AddMemberDto,
  CreateGroupDto,
  GetGroupDto,
  GetGroupsByMemberIdDto,
  RemoveGroupDto,
} from 'server/bandada/dto'
import config from 'server/l/config'

@Injectable()
export class BandadaService {
  sdk = new ApiSdk(config.urls.bandada.api)
  private apiKey = config.apiKeys.bandada

  async addMember({ groupId, memberId }: AddMemberDto) {
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

  // TODO: using object because trpc requires object input (check)
  async removeGroup({ groupId }: RemoveGroupDto) {
    return this.sdk.removeGroup(groupId, this.apiKey)
  }
}
