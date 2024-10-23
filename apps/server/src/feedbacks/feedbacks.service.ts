import { Inject, Injectable } from '@nestjs/common'
import { SupabaseClient } from '@supabase/supabase-js'
import type { Feedback, FeedbackInsert } from 'server/feedbacks/entities'
import { SUPABASE } from 'server/supabase/supabase.provider'
import { CreateFeedbackDto } from './dto/create-feedback.dto'

@Injectable()
export class FeedbacksService {
  constructor(@Inject(SUPABASE) private readonly supabase: SupabaseClient) {}

  async create(createFeedbackDto: CreateFeedbackDto) {
    return this.supabase.from('feedbacks').insert<FeedbackInsert>(createFeedbackDto)
  }

  async findAll() {
    return this.supabase.from('feedbacks').select().order('created_at', { ascending: false }).returns<Feedback[]>()
  }
}
