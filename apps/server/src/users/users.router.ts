import { Injectable } from '@nestjs/common'
import { TrpcService } from '@server/trpc/trpc.service'
import { CreateUserDto } from '@server/users/dto/create-user.dto'
import { UsersService } from '@server/users/users.service'

@Injectable()
export class UsersRouter {
  constructor(
    private readonly trpc: TrpcService,
    private readonly usersService: UsersService,
  ) {}

  router = this.trpc.router({
    debug: this.trpc.procedure.query(() => 'debugging users trpc merged router'),
    createUser: this.trpc.procedure.input(CreateUserDto).mutation(async ({ input: createUserDto }) => {
      return this.usersService.create(createUserDto)
    }),
  })
}
