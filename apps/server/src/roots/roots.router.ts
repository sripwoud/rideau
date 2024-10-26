import { Injectable } from '@nestjs/common'
import { FindRootDto, UpsertRootDto } from 'server/roots/dto'
import { RootsService } from 'server/roots/roots.service'
import { TrpcService } from 'server/trpc/trpc.service'

@Injectable()
export class RootsRouter {
  constructor(
    private readonly roots: RootsService,
    private readonly trpc: TrpcService,
  ) {}

  router = this.trpc.router({
    find: this.trpc.procedure.input(FindRootDto).query(async ({ input }) => this.roots.find(input)),
    upsert: this.trpc.procedure.input(UpsertRootDto).mutation(async ({ input }) => this.roots.upsert(input)),
  })
}
