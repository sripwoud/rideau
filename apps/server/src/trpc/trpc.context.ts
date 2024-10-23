import { Option } from '@hazae41/option'
import { Injectable } from '@nestjs/common'
import type { CreateExpressContextOptions } from '@trpc/server/adapters/express'
import { SupabaseService } from 'server/supabase/supabase.service'

@Injectable()
export class TrpcContext {
  constructor(private readonly supabase: SupabaseService) {}

  create = ({ req }: CreateExpressContextOptions) => ({
    token: Option.wrap<string>(req.cookies?.['access-token']),
    events: this.supabase.events,
  })
}

export type Context = ReturnType<TrpcContext['create']>
