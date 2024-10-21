import { Injectable } from '@nestjs/common'
import { CommitmentsService } from 'server/commitments/commitments.service'
import { CreateCommitmentDto } from 'server/commitments/dto/create-commitment.dto'
import { TrpcService } from 'server/trpc/trpc.service'

@Injectable()
export class CommitmentsRouter {
  constructor(
    private readonly commitments: CommitmentsService,
    private readonly trpc: TrpcService,
  ) {}

  router = this.trpc.router({
    create: this.trpc.procedure.input(CreateCommitmentDto).mutation(async ({ input }) =>
      this.commitments.create(input)
    ),
  })
}
