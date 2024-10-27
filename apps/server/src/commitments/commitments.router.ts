import { Injectable } from '@nestjs/common'
import { CommitmentsService } from 'server/commitments/commitments.service'
import { FindCommitmentDto } from 'server/commitments/dto'
import { TrpcService } from 'server/trpc/trpc.service'

@Injectable()
export class CommitmentsRouter {
  constructor(
    private readonly commitments: CommitmentsService,
    private readonly trpc: TrpcService,
  ) {}

  router = this.trpc.router({
    find: this.trpc.procedure.input(FindCommitmentDto).query(async ({ input }) => this.commitments.find(input)),
  })
}
