import { Inject, Injectable, OnModuleDestroy } from '@nestjs/common'
import { SupabaseClient } from '@supabase/supabase-js'
import { EventEmitter } from 'node:events'
import { SUPABASE } from 'server/supabase/supabase.provider'

@Injectable()
export class SupabaseService implements OnModuleDestroy {
  public readonly events = new EventEmitter()

  constructor(@Inject(SUPABASE) private readonly supabase: SupabaseClient) {}

  from = this.supabase.from.bind(this.supabase)

  onModuleDestroy() {
    this.supabase.removeAllChannels()
    this.events.removeAllListeners()
  }

  subscribe(table: string) {
    this.supabase.channel('table-db-changes').on(
      'postgres_changes',
      { event: '*', schema: 'public', table },
      (payload) => {
        this.events.emit(`${table}.change`, payload)
      },
    )
      .subscribe()
  }
}
