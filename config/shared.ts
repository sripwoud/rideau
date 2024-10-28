import { getEnvVar } from './utils'

interface SharedConfigI {
  alchemy: { proxyEndpoint: string }
  appName: string
  bandada: { pseGroupId: string }
}

export const sharedConfig: SharedConfigI = {
  alchemy: { proxyEndpoint: 'alchemy' },
  appName: 'yeap',
  bandada: { pseGroupId: getEnvVar('NEXT_PUBLIC_PSE_BANDADA_GROUP_ID') },
}
