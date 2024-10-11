import { None, type Option } from '@hazae41/option'
import type { Identity } from '@semaphore-protocol/core'
import { atom } from 'jotai'

// TODO: improve user and email types, reuse dto from server
export const emailAtom = atom<Option<string>>(None.create())

export const semaphoreIdAtom = atom<Option<Identity>>(None.create())
