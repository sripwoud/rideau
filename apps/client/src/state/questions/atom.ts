import { initialQuestionsState, questionsReducer } from 'client/state/questions/reducer'
import type { Questions, QuestionsAction } from 'client/state/questions/types'
import deepEqual from 'fast-deep-equal'
import { atom, type WritableAtom } from 'jotai'
import { atomFamily, atomWithReducer } from 'jotai/utils'

export const questionsAtomFamily = atomFamily<string, WritableAtom<Questions, [QuestionsAction], void>>(
  (_groupId) => atomWithReducer<Questions, QuestionsAction>(initialQuestionsState, questionsReducer),
  deepEqual,
)

export const questionsByGroupAtom = atom((get) => (groupId: string) => Object.values(get(questionsAtomFamily(groupId))))

export const questionTypeAtom = atom((get) => ({ groupId, questionId }: { groupId: string; questionId: number }) =>
  get(questionsAtomFamily(groupId))[questionId]!.type
)

export const questionAtom = atom(get => ({ groupId, questionId }: { groupId: string; questionId: number }) =>
  get(questionsAtomFamily(groupId))[questionId]!
)
