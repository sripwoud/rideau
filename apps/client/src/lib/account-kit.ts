import { alchemy, arbitrumSepolia } from '@account-kit/infra'
import { type AlchemyAccountsUIConfig, cookieStorage, createConfig } from '@account-kit/react'
import config from 'client/l/config'

const uiConfig: AlchemyAccountsUIConfig = {
  illustrationStyle: 'filled',
  auth: {
    addPasskeyOnSignup: true,
    sections: [[{ type: 'email' }], [{ type: 'passkey' }]],
  },
}

export const alchemyConfig = createConfig({
  chain: arbitrumSepolia,
  enablePopupOauth: true,
  ssr: true,
  storage: cookieStorage,
  transport: alchemy({
    // proxying to backend server to hide API key
    rpcUrl: `${config.serverUrl}/${config.alchemyProxyEndpoint}`,
  }),
}, uiConfig)
