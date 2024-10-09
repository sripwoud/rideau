import { Magic } from 'magic-sdk'

// biome-ignore lint/style/noNonNullAssertion: FIXME
export const magic = new Magic(process.env['NEXT_PUBLIC_MAGIC_API_KEY']!, {
  network: {
    // biome-ignore lint/style/noNonNullAssertion: FIXME
    rpcUrl: process.env['NEXT_PUBLIC_CHAIN_RPC_URL']!,
    // biome-ignore lint/style/noNonNullAssertion: FIXME
    chainId: Number.parseInt(process.env['NEXT_PUBLIC_CHAIN_ID']!),
  },
})
