import { Injectable } from '@nestjs/common'
import { Identity } from '@semaphore-protocol/core'
import { Group } from '@semaphore-protocol/core'
import { BandadaService } from 'server/bandada/bandada.service'
import { CommitmentsService } from 'server/commitments/commitments.service'
import { serverConfig } from 'server/l/config'
import { RootsService } from 'server/roots/roots.service'
import type { SignupDto } from './dto/signup.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly bandada: BandadaService,
    private readonly commitments: CommitmentsService,
    private readonly roots: RootsService,
  ) {}

  async signup({ email, groupId, signedMessage }: SignupDto) {
    groupId ??= serverConfig.bandada.pseGroupId
    const commitment = new Identity(signedMessage).commitment.toString()
    await this.commitments.create({ commitment, email })

    if (email.endsWith('@pse.dev'))
      await this.bandada.maybeAddMember({ groupId, memberId: commitment })

    const bandadaGroup = await this.bandada.getGroup({ groupId })
    const { root } = new Group(bandadaGroup.members)
    return this.roots.upsert({ groupId, root: root.toString() })
  }
}
