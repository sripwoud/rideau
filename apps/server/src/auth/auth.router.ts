import { Injectable } from '@nestjs/common'
import { AuthService } from 'server/auth/auth.service'
import { SignUpDto } from 'server/auth/dto/sign-up.dto'
import { TrpcService } from 'server/trpc/trpc.service'

@Injectable()
export class AuthRouter {
  constructor(private readonly trpc: TrpcService, private readonly auth: AuthService) {}

  router = this.trpc.router({
    // TODO
    refresh: this.trpc.procedure.query(async () => {
      return 'refresh'
    }),
    // TODO: signout
    signout: this.trpc.procedure.mutation(async () => {
      return 'signout'
    }),
    signup: this.trpc.procedure.input(SignUpDto).mutation(async ({ input: signUpDto }) => {
      await this.auth.signup(signUpDto)
      return 'Check you emails for the login link'
    }),
    // verify: this.trpc.procedure.input(VerifyDto).query(async ({ input: { token_hash } }) => {
    //  return this.supabase.auth.verifyOtp({
    //   options: { redirectTo: `${config.urls.server}/dashboard` },
    //  token_hash,
    //  type: 'magiclink'
    // })
    // }),
    // signIn: this.trpc.procedure.input(SignInDto).mutation(async ({ input: signInDto }) =>
    //    this.supabase.signIn(signInDto)
    // ),
    // signOut: this.trpc.procedure.mutation(async () => this.supabase.signOut()),
    // getProfile: this.trpc.procedure.query(async () => this.supabase.getProfile()),
  })
}
