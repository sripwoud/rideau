import { Injectable, OnModuleInit } from '@nestjs/common'
import { PostgrestSingleResponse } from '@supabase/supabase-js'
import type { CreateQuestionDto } from 'server/questions/dto/create-question.dto'
import { Question } from 'server/questions/entities'
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

  async find(questionId: number): Promise<PostgrestSingleResponse<Question>>
  async find(
    { questionId, groupId }: { questionId: number; groupId: string },
  ): Promise<PostgrestSingleResponse<Question>>
  async find(questionIdNumberOrParams: number | { questionId: number; groupId: string }) {
    if (typeof questionIdNumberOrParams === 'number')
      return this.supabase.from('questions').select().eq('id', questionIdNumberOrParams).single() // id is primary key, so there can be only one
    return this.supabase.from('questions').select().eq('id', questionIdNumberOrParams.questionId).eq(
      'group_id',
      questionIdNumberOrParams.groupId,
    ).single() // id is primary key, so there can be only one
  }

  async findAll(groupId: string) {
    const { data } = await this.supabase.from(this.resource).select().eq('group_id', groupId).order(
      'created_at',
      { ascending: false },
    )
    return data ?? []
  }
}
