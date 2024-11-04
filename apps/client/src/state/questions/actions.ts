import { type Questions, type QuestionsAction, QuestionsActionType } from 'client/state/questions/types'
import type { Question } from 'server/questions/entities'

export const init = (payload: Questions): QuestionsAction => ({
  type: QuestionsActionType.INIT,
  payload,
})

export const update = (payload: Question): QuestionsAction => ({
  type: QuestionsActionType.UPDATE,
  payload,
})
