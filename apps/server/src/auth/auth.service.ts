import { Injectable } from '@nestjs/common'
import { Identity } from '@semaphore-protocol/core'
import { Group } from '@semaphore-protocol/core'
import type { SignupDto } from 'server/auth/dto/signup.dto'
import { CommitmentsService } from 'server/commitments/commitments.service'
import { GroupsService } from 'server/groups/groups.service'
import { serverConfig } from 'server/l/config'
import { RootsService } from 'server/roots/roots.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly groups: GroupsService,
    private readonly commitments: CommitmentsService,
    private readonly roots: RootsService,
  ) {}

  async signup({ email, groupId, signedMessage }: SignupDto) {
    groupId ??= serverConfig.bandada.pseGroupId
    const commitment = new Identity(signedMessage).commitment.toString()
    await this.commitments.create({ commitment, email })

    if (email.endsWith('@pse.dev'))
      await this.groups.maybeJoin({ groupId, memberId: commitment })

    const group = await this.groups.find({ groupId })
    const { root } = new Group(group.members)
    return this.roots.create({ groupId, root: root.toString() })
  }
}
