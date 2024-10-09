import { Magic } from 'magic-sdk'

// biome-ignore lint/style/noNonNullAssertion: FIXME
export const magic = new Magic(process.env['NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY']!)
