import type { Questions, QuestionsAction } from './types'

export const initialQuestionsState: Questions = {}

export const questionsReducer = (state: Questions, { type, payload }: QuestionsAction): Questions => {
  switch (type) {
    case 'FIND_ALL':
      return payload
    case 'ON_CHANGE':
      return { ...state, [payload.id]: payload }
    default:
      return state
  }
}
