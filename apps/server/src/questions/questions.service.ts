import { Injectable, OnModuleInit } from '@nestjs/common'
import type { CreateQuestionDto, FindAllQuestionsDto, FindQuestionDto } from 'server/questions/dto'
import { SupabaseService } from 'server/supabase/supabase.service'

@Injectable()
export class QuestionsService implements OnModuleInit {
  private resource = 'questions' as const

  constructor(private readonly supabase: SupabaseService) {}

  onModuleInit() {
    this.supabase.subscribe(this.resource)
  }

  async create({ groupId: group_id, title }: CreateQuestionDto) {
    return this.supabase.from(this.resource).insert({ group_id, title })
  }

  async find({ questionId }: FindQuestionDto) {
    return this.supabase.from(this.resource).select().eq('id', questionId).single() // id is primary key, so there can be only one
  }

  async findAll({ groupId }: FindAllQuestionsDto) {
    const { data } = await this.supabase.from(this.resource).select().eq('group_id', groupId).order(
      'created_at',
      { ascending: false },
    )
    return data ?? []
  }
}
