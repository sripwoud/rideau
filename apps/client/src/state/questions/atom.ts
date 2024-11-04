import deepEqual from 'fast-deep-equal'
import { atom, type WritableAtom } from 'jotai'
import { atomFamily, atomWithReducer } from 'jotai/utils'
import { initialQuestionsState, questionsReducer } from './reducer'
import type { Questions, QuestionsAction } from './types'

export const questionsAtomFamily = atomFamily<string, WritableAtom<Questions, [QuestionsAction], void>>(
  (_groupId: string) => atomWithReducer<Questions, QuestionsAction>(initialQuestionsState, questionsReducer),
  deepEqual,
)

export const questionsByGroupAtom = atom((get) => (groupId: string) => Object.values(get(questionsAtomFamily(groupId))))
