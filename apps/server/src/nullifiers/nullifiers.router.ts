import { Injectable } from '@nestjs/common'
import { CreateNullifierDto, FindNullifierDto } from 'server/nullifiers/dto'
import { NullifiersService } from 'server/nullifiers/nullifiers.service'
import { TrpcService } from 'server/trpc/trpc.service'

@Injectable()
export class NullifiersRouter {
  constructor(
    private readonly nullifiers: NullifiersService,
    private readonly trpc: TrpcService,
  ) {}

  router = this.trpc.router({
    create: this.trpc.procedure.input(CreateNullifierDto).mutation(async ({ input }) => this.nullifiers.create(input)),
    find: this.trpc.procedure.input(FindNullifierDto).query(async ({ input }) => this.nullifiers.find(input)),
  })
}
