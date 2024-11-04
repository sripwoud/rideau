import type { inferRouterOutputs } from '@trpc/server'
import type { Feedback } from 'server/feedbacks/entities'
import type { Question } from 'server/questions/entities'
import type { Router } from 'server/trpc/trpc.router'

export type Stats = inferRouterOutputs<Router>['questions']['stats']

export enum StatsActionType {
  INIT = 'INIT',
  UPDATE = 'UPDATE',
}

export type StatsUpdatePayload = Pick<Feedback, 'question_id' | 'feedback'> & { type: Question['type'] }

export type StatsAction = {
  type: StatsActionType.INIT
  payload: Stats
} | {
  type: StatsActionType.UPDATE
  payload: StatsUpdatePayload
}
