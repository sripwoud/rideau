import { Controller, Get, Query, Res } from '@nestjs/common'
import { Response } from 'express'
import { AuthService } from 'server/auth/auth.service'
import type { VerifyDto } from 'server/auth/dto/verify.dto'

const SEVEN_DAYS_MS = 60 * 60 * 24 * 7 * 1000
const REFRESH_TOKEN_MAX_AGE = SEVEN_DAYS_MS

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Get('verify')
  async verify(@Query() verifyDto: VerifyDto, @Res() res: Response) {
    const { data: { session } } = await this.auth.verify(verifyDto)
    if (session !== null) {
      const { access_token, refresh_token, expires_in } = session
      res.cookie('access-token', access_token, {
        httpOnly: true,
        maxAge: expires_in * 1000, // convert to ms
        sameSite: 'lax', // TODO can we use strict?
        secure: process.env.NODE_ENV === 'production',
      })
      res.cookie('refresh-token', refresh_token, {
        httpOnly: true,
        maxAge: REFRESH_TOKEN_MAX_AGE,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      })
    }

    // TODO: use config.urls.client
    res.redirect('http://localhost:3000/dashboard')
  }
}
