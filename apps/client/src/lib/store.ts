import { None, type Option } from '@hazae41/option'
import { atom } from 'jotai'
import type { MagicUserMetadata } from 'magic-sdk'

// TODO: improve user and email types, reuse dto from server
export const userAtom = atom<Option<MagicUserMetadata>>(None.create())
export const emailAtom = atom<Option<string>>(None.create())
