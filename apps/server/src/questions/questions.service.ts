import { Injectable, OnModuleInit } from '@nestjs/common'
import type { CreateQuestionDto } from 'server/questions/dto/create-question.dto'
import type { Question, QuestionInsert } from 'server/questions/entities'
import { SupabaseService } from 'server/supabase/supabase.service'

@Injectable()
export class QuestionsService implements OnModuleInit {
  private resource = 'questions'

  constructor(private readonly supabase: SupabaseService) {}

  onModuleInit() {
    this.supabase.subscribe(this.resource)
  }

  async create(createQuestionDto: CreateQuestionDto) {
    return this.supabase.from(this.resource).insert<QuestionInsert>(createQuestionDto)
  }

  async findAll() {
    const { data } = await this.supabase.from(this.resource).select().order('created_at', { ascending: false }).returns<
      Question[]
    >()
    return data ?? []
  }
}
