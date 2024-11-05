import { type Stats, type StatsAction, StatsActionType } from 'client/state/stats/types'

export const initialStatsState: Stats = { no: 0, yes: 0 }

export const statsReducer = (state: Stats, { type, payload }: StatsAction): Stats => {
  switch (type) {
    case StatsActionType.INIT:
      return payload
    case StatsActionType.UPDATE:
      switch (payload.type) {
        case 'boolean':
          switch (payload.feedback) {
            case 'yes':
              return { ...state, yes: state.yes + 1 }
            case 'no':
              return { ...state, no: state.no + 1 }
            default:
              throw new Error('feedback value incompatible with question type')
          }
        default:
          throw new Error('Unsupported question type')
      }
    default:
      return state
  }
}
