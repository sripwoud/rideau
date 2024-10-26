import { None, type Option } from '@hazae41/option'
import type { Identity } from '@semaphore-protocol/core'
import { atom } from 'jotai'

export const identityAtom = atom<Option<Identity>>(None.create())
