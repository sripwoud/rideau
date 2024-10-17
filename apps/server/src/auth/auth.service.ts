import { Inject, Injectable } from '@nestjs/common'
import { SupabaseClient } from '@supabase/supabase-js'
import type { GetUserDto } from 'server/auth/dto/get-user.dto'
import type { SignUpDto } from 'server/auth/dto/sign-up.dto'
import type { VerifyDto } from 'server/auth/dto/verify.dto'
import { SUPABASE } from 'server/supabase/supabase.provider'

@Injectable()
export class AuthService {
  constructor(@Inject(SUPABASE) private readonly supabase: SupabaseClient) {
  }

  async getUser({ token }: GetUserDto) {
    return this.supabase.auth.getUser(token)
  }

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

  async verify({ token_hash }: VerifyDto) {
    return this.supabase.auth.verifyOtp({ token_hash, type: 'magiclink' })
  }
}
