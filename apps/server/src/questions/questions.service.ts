import { Inject, Injectable, OnModuleInit } from '@nestjs/common'
import { SupabaseClient } from '@supabase/supabase-js'
import { EventEmitter } from 'node:events'
import { EE } from 'server/ee/event-emitter.provider'
import { CreateQuestionDto } from 'server/questions/dto/create-question.dto'
import { Question, QuestionInsert } from 'server/questions/entities'
import { SUPABASE } from 'server/supabase/supabase.provider'

@Injectable()
export class QuestionsService implements OnModuleInit {
  constructor(
    @Inject(EE) private readonly ee: EventEmitter,
    @Inject(SUPABASE) private readonly supabase: SupabaseClient,
  ) {}

  onModuleInit() {
    this.subscribe()
  }

  async create({ title }: CreateQuestionDto) {
    return this.supabase.from('questions').insert<QuestionInsert>({ title })
  }

  async findAll() {
    return this.supabase.from('questions').select().order('created_at', { ascending: false }).returns<Question[]>()
  }

  async subscribe() {
    this.supabase.channel('table-db-changes').on('postgres_changes', {
      event: '*', // TODO: listen only to INSERT and UPDATE
      schema: 'public',
      table: 'questions',
    }, (payload) => {
      this.ee.emit('questions.change', payload)
    }).subscribe()
  }
}
