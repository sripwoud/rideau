import { Injectable } from '@nestjs/common'
import { CreateGroupDto, ExportGroupDto, FindAllGroupsDto, GroupMembersDto, MaybeJoinGroupDto } from 'server/groups/dto'
import { GroupsService } from 'server/groups/groups.service'
import { TrpcService } from 'server/trpc/trpc.service'

@Injectable()
export class GroupsRouter {
  constructor(
    private readonly groups: GroupsService,
    private readonly trpc: TrpcService,
  ) {}

  router = this.trpc.router({
    create: this.trpc.procedure.input(CreateGroupDto).mutation(async ({ input }) => this.groups.create(input)),
    export: this.trpc.procedure.input(ExportGroupDto).query(async ({ input }) => this.groups.export(input)),
    findAll: this.trpc.procedure.input(FindAllGroupsDto).query(
      async ({ input }) => this.groups.findAll(input),
    ),
    maybeJoin: this.trpc.procedure.input(MaybeJoinGroupDto).mutation(async ({ input }) => this.groups.maybeJoin(input)),
    members: this.trpc.procedure.input(GroupMembersDto).query(async ({ input }) => this.groups.members(input)),
  })
}
