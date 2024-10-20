import { QueryClient as _TrpcQueryClient } from '@tanstack/react-query-4'
import { QueryClient as _AlchemyQueryClient } from '@tanstack/react-query-5'

export const AlchemyQueryClient = () => new _AlchemyQueryClient()
export const TrpcQueryClient = () => new _TrpcQueryClient()
