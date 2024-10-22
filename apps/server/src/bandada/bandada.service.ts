import { ApiSdk } from '@bandada/api-sdk'
import { Injectable, Logger } from '@nestjs/common'

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
  logger = new Logger(BandadaService.name)
  sdk = new ApiSdk(serverConfig.bandada.url)
  private apiKey = serverConfig.bandada.apiKey

  async maybeAddMember({ groupId, memberId }: AddMemberDto) {
    const isGroupMember = await this.sdk.isGroupMember(groupId, memberId)
    if (isGroupMember === false) await this.sdk.addMemberByApiKey(groupId, memberId, this.apiKey)
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
