import { toEventSelector } from 'viem'

export const LEAF_ALREADY_EXISTS_SELECTOR = toEventSelector('LeafAlreadyExists()').slice(0, 10)
