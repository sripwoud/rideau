import { initialStatsState, statsReducer } from 'client/state/stats/reducer'
import type { Stats, StatsAction } from 'client/state/stats/types'
import deepEqual from 'fast-deep-equal'
import { atom, type WritableAtom } from 'jotai'
import { atomFamily, atomWithReducer } from 'jotai/utils'

export const statsAtomFamily = atomFamily<number, WritableAtom<Stats, [StatsAction], void>>(
  (_questionId) => atomWithReducer<Stats, StatsAction>(initialStatsState, statsReducer),
  deepEqual,
)

export const statsByQuestionAtom = atom((get) => (questionId: number) => get(statsAtomFamily(questionId)))
