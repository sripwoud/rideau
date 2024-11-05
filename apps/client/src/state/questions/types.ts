import type { inferRouterOutputs } from '@trpc/server'
import type { Question } from 'server/questions/entities'
import type { Router } from 'server/trpc/trpc.router'

export type Questions = inferRouterOutputs<Router>['questions']['findAll']

export enum QuestionsActionType {
  INIT = 'INIT',
  UPDATE = 'UPDATE',
}

export type QuestionsAction = {
  type: QuestionsActionType.INIT
  payload: Questions
} | {
  type: QuestionsActionType.UPDATE
  payload: Question
}
