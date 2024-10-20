import { alchemy, arbitrumSepolia } from '@account-kit/infra'
import { type AlchemyAccountsUIConfig, cookieStorage, createConfig } from '@account-kit/react'
import { clientConfig } from 'client/l/config'

const uiConfig: AlchemyAccountsUIConfig = {
  illustrationStyle: 'outline',
  auth: {
    addPasskeyOnSignup: false,
    header: <img alt={`${clientConfig.appName}-icon`} src='/icon.png' />,
    sections: [[{ type: 'email' }]],
  },
  supportUrl: 'gauthier@pse.dev',
}

export const alchemyConfig = createConfig({
  chain: arbitrumSepolia,
  enablePopupOauth: true,
  ssr: true,
  storage: cookieStorage,
  transport: alchemy({
    // proxying to backend server to hide API key
    rpcUrl: `${clientConfig.serverUrl}/${clientConfig.alchemy.proxyEndpoint}`,
  }),
}, uiConfig)
