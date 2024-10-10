import { alchemy, sepolia } from '@account-kit/infra'
import { type AlchemyAccountsUIConfig, cookieStorage, createConfig } from '@account-kit/react'
import { url } from 'client/l/trpc'

console.log(url)
const uiConfig: AlchemyAccountsUIConfig = {
  illustrationStyle: 'filled',
  auth: {
    addPasskeyOnSignup: true,
    sections: [[{ type: 'email' }], [{ type: 'passkey' }]],
  },
}

export const alchemyConfig = createConfig({
  chain: sepolia,
  enablePopupOauth: true,
  ssr: true,
  storage: cookieStorage,
  transport: alchemy({
    // proxying to backend server to hide API key
    rpcUrl: `${url}/web3-rpc-proxy`,
  }),
}, uiConfig)
