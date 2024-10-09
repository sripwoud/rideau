import { Injectable } from '@nestjs/common'
import { Logger } from '@nestjs/common'
// import { SupabaseService } from 'server/supabase/supabase.service'
import type { CreateUserDto } from 'server/users/dto/create-user.dto'

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name)

  //  constructor(_supabaseService: SupabaseService) {}
  create(createUserDto: CreateUserDto) {
    this.logger.log(`Creating user with public key ${createUserDto.publicKey} and email ${createUserDto.email}`)
    return 'This action adds a new user'
  }

  findAll() {
    return 'This action returns all users'
  }

  findOne(_id: number) {
    return 'This action returns a #${id} user'
  }

  //  update(id: number, updateUserDto: UpdateUserDto) {
  //    return `This action updates a #${id} user`;
  //  }

  remove(_id: number) {
    return 'This action removes a #${id} user'
  }
}
