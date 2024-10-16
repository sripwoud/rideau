import { Injectable } from '@nestjs/common'
import { BandadaService } from 'server/bandada/bandada.service'
import { AddMemberDto, CreateGroupDto, GetGroupDto, GetGroupsByMemberIdDto, RemoveGroupDto } from 'server/bandada/dto'
import { TrpcService } from 'server/trpc/trpc.service'

@Injectable()
export class BandadaRouter {
  constructor(
    private readonly trpc: TrpcService,
    private readonly bandadaService: BandadaService,
  ) {}

  router = this.trpc.router({
    addMember: this.trpc.procedure.input(AddMemberDto).mutation(async ({ input: addMemberDto }) =>
      this.bandadaService.addMember(addMemberDto)
    ),
    createGroup: this.trpc.procedure.input(CreateGroupDto).mutation(async ({ input: createGroupDto }) =>
      this.bandadaService.createGroup(createGroupDto)
    ),
    getGroup: this.trpc.procedure.input(GetGroupDto).query(async ({ input: getGroupDto }) =>
      this.bandadaService.getGroup(getGroupDto)
    ),
    getGroupsByMemberId: this.trpc.procedure.input(GetGroupsByMemberIdDto).query(
      async ({ input: getGroupsByMemberIdDto }) => this.bandadaService.getGroupsByMemberId(getGroupsByMemberIdDto),
    ),
    removeGroup: this.trpc.procedure.input(RemoveGroupDto).mutation(async ({ input: removeGroupDto }) =>
      this.bandadaService.removeGroup(removeGroupDto)
    ),
  })
}
