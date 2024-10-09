import { Magic } from '@magic-sdk/admin'

// note how server uses SECRET_KEY while client uses PUBLISHABLE_KEY
// biome-ignore lint/style/noNonNullAssertion: FIXME
export const magic = new Magic(process.env['MAGIC_SECRET_KEY']!)
