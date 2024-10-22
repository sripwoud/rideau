import { Injectable } from '@nestjs/common'
import { AuthService } from 'server/auth/auth.service'
import { SignupDto } from 'server/auth/dto/signup.dto'
import { TrpcService } from 'server/trpc/trpc.service'

@Injectable()
export class AuthRouter {
  constructor(
    private readonly auth: AuthService,
    private readonly trpc: TrpcService,
  ) {}

  router = this.trpc.router({
    signup: this.trpc.procedure.input(SignupDto).mutation(async ({ input }) => this.auth.signup(input)),
  })
}
