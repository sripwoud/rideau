import { Injectable, OnModuleDestroy } from '@nestjs/common'
import type { RealtimePostgresInsertPayload, RealtimePostgresUpdatePayload } from '@supabase/supabase-js'
import { createClient } from '@supabase/supabase-js'
import { EventEmitter } from 'node:events'
import { serverConfig } from 'server/l/config'
import type { Question } from 'server/questions/entities'
import type { Database } from 'server/supabase/supabase.types'

@Injectable()
export class SupabaseService implements OnModuleDestroy {
  public readonly events = new EventEmitter()
  private readonly supabase = createClient<Database>(serverConfig.supabase.url, serverConfig.supabase.anonKey)

  from = this.supabase.from.bind(this.supabase)
  rpc = this.supabase.rpc.bind(this.supabase)

  onModuleDestroy() {
    this.supabase.removeAllChannels()
    this.events.removeAllListeners()
  }

  subscribe(table: string) {
    this
      .supabase
      .channel('table-db-changes')
      .on(
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
