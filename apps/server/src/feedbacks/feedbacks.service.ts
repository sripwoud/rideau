import { Injectable } from '@nestjs/common'
import { SupabaseService } from 'server/supabase/supabase.service'
import { CreateFeedbackDto } from './dto/create-feedback.dto'

@Injectable()
export class FeedbacksService {
  constructor(private readonly supabase: SupabaseService) {}

  async create(createFeedbackDto: CreateFeedbackDto) {
    return this.supabase.from('feedbacks').insert(createFeedbackDto)
  }

  async findAll() {
    return this.supabase.from('feedbacks').select().order('created_at', { ascending: false }).returns()
  }
}
