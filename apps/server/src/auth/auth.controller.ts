import { Controller, Get, Logger, Query, Res } from '@nestjs/common'
import { Response } from 'express'
import { AuthService } from 'server/auth/auth.service'
import type { VerifyDto } from 'server/auth/dto/verify.dto'
import { Cookie, serverConfig } from 'server/l/config'

@Controller('auth')
export class AuthController {
  logger = new Logger(AuthController.name)

  constructor(private readonly auth: AuthService) {}

  // the email confirmation link includes a token in the url as query param, so we can't use trpc for it (TODO: can we?)
  @Get('verify')
  async verify(@Query() verifyDto: VerifyDto, @Res() res: Response) {
    try {
      const { data: { session }, error } = await this.auth.verify(verifyDto)
      if (error) throw new Error(error.message)

      if (session === null) res.status(401).send('Invalid token')
      else {
        const { access_token, refresh_token } = session
        this.logger.debug(`access_token: ${access_token}`)
        this.logger.debug(`refresh_token: ${refresh_token}`)

        res.cookie(Cookie.ACCESS, access_token, {
          httpOnly: true,
          maxAge: serverConfig.auth.cookieMaxAge[Cookie.ACCESS],
          sameSite: 'none', // FIXME unsecure
          secure: process.env.NODE_ENV === 'production',
        })
        res.cookie(Cookie.REFRESH, refresh_token, {
          httpOnly: true,
          maxAge: serverConfig.auth.cookieMaxAge[Cookie.REFRESH],
          sameSite: 'none', // FIXME unsecure
          secure: process.env.NODE_ENV === 'production',
        })
        res.redirect(`${serverConfig.clientUrl}/${serverConfig.auth.redirect}`)
      }
    } catch (error) {
      this.logger.error(error)
      res.status(500).send((error as Error).message)
    }
  }
}
