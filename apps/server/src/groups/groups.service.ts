import { ApiSdk } from '@bandada/api-sdk'
import { Injectable } from '@nestjs/common'
import { Group } from '@semaphore-protocol/group'
import type {
  CreateGroupDto,
  ExportGroupDto,
  FindAllGroupsDto,
  FindGroupDto,
  GroupMembersDto,
  MaybeJoinGroupDto,
} from 'server/groups/dto'
import { serverConfig } from 'server/l/config'
import { QuestionsService } from 'server/questions/questions.service'

@Injectable()
export class GroupsService {
  private apiKey = serverConfig.bandada.apiKey
  bandada = new ApiSdk(serverConfig.bandada.url)

  constructor(private readonly questions: QuestionsService) {}

  async create(createGroupDto: CreateGroupDto) {
    return this.bandada.createGroup(createGroupDto, this.apiKey)
  }

  async export({ groupId }: ExportGroupDto) {
    const { members } = await this.find({ groupId })
    return new Group(members).export()
  }

  async members({ questionId }: GroupMembersDto) {
    const { data } = await this.questions.find({ questionId })
    if (data === null) throw new Error('This question does not exist')
    const group = await this.find({ groupId: data.group_id })
    return group.members
  }

  async find({ groupId }: FindGroupDto) {
    return this.bandada.getGroup(groupId)
  }

  async findAll({ memberId }: FindAllGroupsDto) {
    return this.bandada.getGroupsByMemberId(memberId)
  }

  async maybeJoin({ groupId, memberId }: MaybeJoinGroupDto) {
    const isGroupMember = await this.bandada.isGroupMember(groupId, memberId)
    if (isGroupMember === false) await this.bandada.addMemberByApiKey(groupId, memberId, this.apiKey)
  }
}
