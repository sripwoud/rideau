import type { User as AkUser } from '@account-kit/signer'
import { None, type Option } from '@hazae41/option'
import { atom } from 'jotai'

type User = AkUser & { commitment: string }
export const userAtom = atom<Option<User>>(None.create())
