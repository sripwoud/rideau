import { Injectable } from '@nestjs/common'
import { CreateNullifierDto, FindOneNullifierDto } from 'server/nullifiers/dto'
import { RootsService } from 'server/roots/roots.service'
import { TrpcService } from 'server/trpc/trpc.service'

@Injectable()
export class NullifiersRouter {
  constructor(
    private readonly roots: RootsService,
    private readonly trpc: TrpcService,
  ) {}

  router = this.trpc.router({
    create: this.trpc.procedure.input(CreateNullifierDto).mutation(async ({ input: { nullifier } }) =>
      this.roots.create(nullifier)
    ),
    findOne: this.trpc.procedure.input(FindOneNullifierDto).query(async ({ input: { nullifier } }) =>
      this.roots.findOne(nullifier)
    ),
  })
}
