import { Injectable } from '@nestjs/common'
import { BandadaService } from 'server/bandada/bandada.service'
import {
  AddMemberDto,
  CreateGroupDto,
  ExportGroupDto,
  GetGroupDto,
  GetGroupsByMemberIdDto,
  GetMembersDto,
  RemoveGroupDto,
} from 'server/bandada/dto'
import { TrpcService } from 'server/trpc/trpc.service'

@Injectable()
export class BandadaRouter {
  constructor(
    private readonly trpc: TrpcService,
    private readonly bandada: BandadaService,
  ) {}

  router = this.trpc.router({
    addMember: this.trpc.procedure.input(AddMemberDto).mutation(async ({ input }) =>
      this.bandada.maybeAddMember(input)
    ),
    createGroup: this.trpc.procedure.input(CreateGroupDto).mutation(async ({ input }) =>
      this.bandada.createGroup(input)
    ),
    exportGroup: this.trpc.procedure.input(ExportGroupDto).query(async ({ input }) => this.bandada.exportGroup(input)),
    getGroup: this.trpc.procedure.input(GetGroupDto).query(async ({ input }) => this.bandada.getGroup(input)),
    getGroupsByMemberId: this.trpc.procedure.input(GetGroupsByMemberIdDto).query(
      async ({ input }) => this.bandada.getGroupsByMemberId(input),
    ),
    getMembers: this.trpc.procedure.input(GetMembersDto).query(async ({ input }) => this.bandada.getMembers(input)),
    removeGroup: this.trpc.procedure.input(RemoveGroupDto).mutation(async ({ input }) =>
      this.bandada.removeGroup(input)
    ),
  })
}
