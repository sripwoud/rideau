import { Inject, Injectable, Logger } from '@nestjs/common'
import { Identity } from '@semaphore-protocol/identity'
import { SupabaseClient } from '@supabase/supabase-js'
import { SUPABASE } from 'server/supabase/supabase.provider'

@Injectable()
export class SemaphoresService {
  logger = new Logger('SemaphoresService')
  constructor(@Inject(SUPABASE) private readonly supabase: SupabaseClient) {}
  async create(id: string) {
    return this.supabase.from('semaphore').insert({ id, private_key: new Identity().export() })
  }

  // findAll() {
  //   return `This action returns all semaphores`;
  // }
}
