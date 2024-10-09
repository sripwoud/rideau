import { Magic } from 'magic-sdk'

// TODO: use Context Provider or global store to make this available to all components
const createMagic = (key: string) => typeof window !== 'undefined' && new Magic(key)

// biome-ignore lint/style/noNonNullAssertion: FIXME
export const magic = createMagic(process.env['NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY']!)
