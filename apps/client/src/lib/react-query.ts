import { QueryClient as _TrpcQueryClient } from '@tanstack/react-query-4'
import { QueryClient as _AlchemyQueryClient } from '@tanstack/react-query-5'

// alchemy account kit needs @tanstack/react-query@^5
// @trpc/react-query needs @tanstack/react-query@^4
// see overrides set in package.json to accomodate using both versions simultaneously
export const AlchemyQueryClient = () => new _AlchemyQueryClient()
export const TrpcQueryClient = () => new _TrpcQueryClient()
