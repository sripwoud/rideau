import { Inject, Injectable, OnModuleDestroy } from '@nestjs/common'
import { RealtimePostgresInsertPayload, RealtimePostgresUpdatePayload, SupabaseClient } from '@supabase/supabase-js'
import { EventEmitter } from 'node:events'
import { Question } from 'server/questions/entities'
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
      { event: 'INSERT', schema: 'public', table },
      (payload: RealtimePostgresInsertPayload<Question>) => {
        // TODO improve typing (probably need a typed EventEmmitter custom class?)
        this.events.emit(`${table}.change`, { type: 'INSERT', data: payload.new })
      },
    )
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table },
        (payload: RealtimePostgresUpdatePayload<Question>) => {
          this.events.emit(`${table}.change`, { type: 'UPDATE', data: payload.new })
        },
      )
      .subscribe()
  }
}
