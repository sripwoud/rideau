import { Inject, Injectable, Logger } from '@nestjs/common'
import { AuthError, SupabaseClient } from '@supabase/supabase-js'
import type { GetUserDto } from 'server/auth/dto/get-user.dto'
import type { SignUpDto } from 'server/auth/dto/sign-up.dto'
import type { VerifyDto } from 'server/auth/dto/verify.dto'
import { SemaphoresService } from 'server/semaphores/semaphores.service'
import { SUPABASE } from 'server/supabase/supabase.provider'

@Injectable()
export class AuthService {
  logger = new Logger(AuthService.name)

  constructor(
    @Inject(SUPABASE) private readonly supabase: SupabaseClient,
    private readonly semaphore: SemaphoresService,
  ) {
  }

  async getUser({ token }: GetUserDto) {
    return this.supabase.auth.getUser(token)
  }

  // TODO: https://supabase.com/docs/reference/javascript/auth-refreshsession
  async refresh() {}

  async signup(signUpDto: SignUpDto) {
    // if user does not exist yet, it has to be created so it is not signed in yet so it is normal to return a null user
    return this.supabase.auth.signInWithOtp({
      options: {
        // TODO: do i need this? or hardcoded in the html email template?
        // emailRedirectTo: '',
        shouldCreateUser: true,
      },
      ...signUpDto,
    })
  }

  // TODO https://supabase.com/docs/reference/javascript/auth-signout
  async signout() {}

  async verify({ token_hash }: VerifyDto) {
    const { data: { session, user }, error: verifyOtpError } = await this.supabase.auth.verifyOtp({
      token_hash,
      type: 'magiclink',
    })

    if (verifyOtpError !== null) throw verifyOtpError
    if (user === null) throw new AuthError('could not retrieve user data')
    if (session === null) throw new AuthError('could not retrieve session data')

    const { error } = await this.semaphore.create(user.id)

    if (error !== null) {
      this.logger.error(error)
      throw error
    }

    return { access_token: session.access_token, refresh_token: session.refresh_token }
  }
}
