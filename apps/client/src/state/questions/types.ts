import type { inferRouterOutputs } from '@trpc/server'
import type { Question } from 'server/questions/entities'
import type { Router } from 'server/trpc/trpc.router'

export type Questions = inferRouterOutputs<Router>['questions']['findAll']

export enum QuestionsActionType {
  FIND_ALL = 'FIND_ALL',
  ON_CHANGE = 'ON_CHANGE',
}

export type QuestionsAction = {
  type: QuestionsActionType.FIND_ALL
  payload: Questions
} | {
  type: QuestionsActionType.ON_CHANGE
  payload: Question
}
