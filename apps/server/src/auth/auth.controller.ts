import { Controller, Get, Logger, Query, Res } from '@nestjs/common'
import { CookieOptions, Response } from 'express'
import { AuthService } from 'server/auth/auth.service'
import type { VerifyDto } from 'server/auth/dto/verify.dto'
import { Cookie, serverConfig } from 'server/l/config'

const cookieOptions: Pick<CookieOptions, 'httpOnly' | 'sameSite' | 'secure'> = {
  httpOnly: true,
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // FIXME unsecure, lax was not working, use another storage method than cookies? https://supabase.com/docs/guides/auth/sessions/pkce-flow#how-it-works
  secure: process.env.NODE_ENV === 'production',
}

@Controller('auth')
export class AuthController {
  logger = new Logger(AuthController.name)

  constructor(private readonly auth: AuthService) {}

  // the email confirmation link includes a token in the url as query param, so we can't use trpc for it (TODO: can we?)
  @Get('verify')
  async verify(@Query() verifyDto: VerifyDto, @Res() res: Response) {
    const { access_token, refresh_token } = await this.auth.verify(verifyDto) // TODO if this rejects, this will return the generic exception handler from nest which isn't informative, implement a better catch everything filter, see https://docs.nestjs.com/exception-filters#catch-everything

    res.cookie(Cookie.ACCESS, access_token, {
      ...cookieOptions,
      maxAge: serverConfig.auth.cookieMaxAge[Cookie.ACCESS],
    })
    res.cookie(Cookie.REFRESH, refresh_token, {
      ...cookieOptions,
      maxAge: serverConfig.auth.cookieMaxAge[Cookie.REFRESH],
    })
    res.redirect(`${serverConfig.clientUrl}/${serverConfig.auth.redirect}`)
  }
}
