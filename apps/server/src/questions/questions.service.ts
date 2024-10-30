import { Injectable, OnModuleInit } from '@nestjs/common'
import type { CreateQuestionDto, FindAllQuestionsDto, FindQuestionDto, ToggleQuestionDto } from 'server/questions/dto'
import { SupabaseService } from 'server/supabase/supabase.service'
import { QuestionStatsDto } from './dto/question-stats.dto'

@Injectable()
export class QuestionsService implements OnModuleInit {
  private resource = 'questions' as const

  constructor(private readonly supabase: SupabaseService) {}

  onModuleInit() {
    this.supabase.subscribe(this.resource)
  }

  async create({ author, groupId: group_id, title, type }: CreateQuestionDto) {
    return this.supabase.from(this.resource).insert({ author, group_id, title, type })
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

  async isInactive({ questionId }: FindQuestionDto) {
    const { data } = await this.find({ questionId })
    if (data === null) throw new Error('This question does not exist')
    return data.active
  }

  async stats({ questionId, type }: QuestionStatsDto) {
    if (type === undefined) {
      const { data: question } = await this.find({ questionId })
      if (question === null) throw new Error('question not found')
      type = question.type
    }

    switch (type) {
      case 'boolean': {
        const { data } = await this.supabase.rpc('count_boolean_feedbacks', { question_id: questionId })
        return { no: data?.no ?? 0, yes: data?.yes ?? 0 }
      }
      default:
        // TODO support text question type
        throw new Error('Unsupported question type')
    }
  }

  async toggle({ active, questionId }: ToggleQuestionDto) {
    return this.supabase.from(this.resource).update({ active }).eq('id', questionId)
  }
}
