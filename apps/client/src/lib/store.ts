import { None, Option } from '@hazae41/option'
import { atom } from 'jotai'

// TODO: improve user and email types, reuse dto from server
export const userAtom = atom<Option<string>>(None.create())
export const emailAtom = atom<Option<string>>(None.create())

const none = new None()
const opt = Option.from('hello')
const o = opt.unwrap()
