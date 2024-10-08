import { Magic } from 'magic-sdk'

export const magic = new Magic(process.env['NEXT_PUBLIC_MAGIC_API_KEY']!, {
  network: {
    rpcUrl: process.env['NEXT_PUBLIC_CHAIN_RPC_URL']!,
    chainId: parseInt(process.env['NEXT_PUBLIC_CHAIN_ID']!),
  },
})
