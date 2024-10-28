import { CreateRootDto, type CreateRootDto as CreateRootDtoT } from './create-root.dto'

export * from './create-root.dto'
export * from './find-latest-root.dto'

export const FindRootDto = CreateRootDto
export type FindRootDto = CreateRootDtoT

export const IsValidRootDto = CreateRootDto
export type IsValidRootDto = CreateRootDtoT

export const MatchLatestRootDto = CreateRootDto
export type MatchLatestRootDto = CreateRootDtoT

export const RootHasExpiredDto = CreateRootDto
export type RootHasExpiredDto = CreateRootDtoT
