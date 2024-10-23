import { Injectable } from '@nestjs/common'
import { CreateRootDto, FindOneRootDto } from 'server/roots/dto'
import { RootsService } from 'server/roots/roots.service'
import { TrpcService } from 'server/trpc/trpc.service'

@Injectable()
export class RootsRouter {
  constructor(
    private readonly roots: RootsService,
    private readonly trpc: TrpcService,
  ) {}

  router = this.trpc.router({
    create: this.trpc.procedure.input(CreateRootDto).mutation(async ({ input: { nullifier } }) =>
      this.roots.create(nullifier)
    ),
    findLatest: this.trpc.procedure.query(async () => this.roots.findLatest()),
    findOne: this.trpc.procedure.input(FindOneRootDto).query(async ({ input: { nullifier } }) =>
      this.roots.findOne(nullifier)
    ),
  })
}
