import type { Questions, QuestionsAction } from 'client/state/questions/types'

export const initialQuestionsState: Questions = {}

export const questionsReducer = (state: Questions, { type, payload }: QuestionsAction): Questions => {
  switch (type) {
    case 'INIT':
      return payload
    case 'UPDATE':
      return { ...state, [payload.id]: payload }
    default:
      return state
  }
}
