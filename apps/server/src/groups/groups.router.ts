import { Injectable } from '@nestjs/common'
import { ExportGroupDto, FindAllGroupsDto } from 'server/groups/dto'
import { GroupsService } from 'server/groups/groups.service'
import { TrpcService } from 'server/trpc/trpc.service'

@Injectable()
export class GroupsRouter {
  constructor(
    private readonly groups: GroupsService,
    private readonly trpc: TrpcService,
  ) {}

  router = this.trpc.router({
    export: this.trpc.procedure.input(ExportGroupDto).query(async ({ input }) => this.groups.export(input)),
    findAll: this.trpc.procedure.input(FindAllGroupsDto).query(
      async ({ input }) => this.groups.findAll(input),
    ),
  })
}
