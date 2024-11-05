import { type Stats, type StatsAction, StatsActionType, type StatsUpdatePayload } from 'client/state/stats/types'

export const init = (payload: Stats): StatsAction => ({
  type: StatsActionType.INIT,
  payload,
})

export const update = (payload: StatsUpdatePayload): StatsAction => ({
  type: StatsActionType.UPDATE,
  payload,
})
