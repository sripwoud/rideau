import { Injectable } from '@nestjs/common'
import { SupabaseService } from 'server/supabase/supabase.service'

@Injectable()
export class TrpcContext {
  constructor(private readonly supabase: SupabaseService) {}

  create = () => ({
    events: this.supabase.events,
  })
}

export type Context = ReturnType<TrpcContext['create']>
