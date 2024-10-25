import { Injectable } from '@nestjs/common'
import { Identity } from '@semaphore-protocol/core'
import { BandadaService } from 'server/bandada/bandada.service'
import { CommitmentsService } from 'server/commitments/commitments.service'
import { serverConfig } from 'server/l/config'
import type { SignupDto } from './dto/signup.dto'

@Injectable()
export class AuthService {
  constructor(private readonly bandada: BandadaService, private readonly commitments: CommitmentsService) {}

  async signup({ email, signedMessage }: SignupDto) {
    const commitment = new Identity(signedMessage).commitment.toString()
    await this.commitments.create({ commitment, email })

    if (email.endsWith('@pse.dev'))
      await this.bandada.maybeAddMember({ groupId: serverConfig.bandada.pseGroupId, memberId: commitment })
  }
}
