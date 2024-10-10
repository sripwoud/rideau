import { None, type Option } from '@hazae41/option'
import { atom } from 'jotai'

// TODO: improve user and email types, reuse dto from server
export const emailAtom = atom<Option<string>>(None.create())
