import { isEnvVarDefined } from './utils'

interface SharedConfigI {
  alchemy: { proxyEndpoint: string }
  appName: string
  bandada: { pseGroupId: string }
}

// @ts-expect-error 4111
const pseGroupId = process.env.NEXT_PUBLIC_PSE_BANDADA_GROUP_ID ?? ''
isEnvVarDefined(pseGroupId, 'NEXT_PUBLIC_PSE_BANDADA_GROUP_ID')

export const sharedConfig: SharedConfigI = {
  alchemy: { proxyEndpoint: 'alchemy' },
  appName: 'yeap',
  bandada: { pseGroupId },
}
