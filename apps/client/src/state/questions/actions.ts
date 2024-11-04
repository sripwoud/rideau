import type { Question } from 'server/questions/entities'
import { type Questions, type QuestionsAction, QuestionsActionType } from './types'

export const init = (payload: Questions): QuestionsAction => ({
  type: QuestionsActionType.FIND_ALL,
  payload,
})

export const update = (payload: Question): QuestionsAction => ({
  type: QuestionsActionType.ON_CHANGE,
  payload,
})
