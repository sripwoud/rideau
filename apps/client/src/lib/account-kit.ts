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
    // FIXME: do not use type asserting
    apiKey: process.env['NEXT_PUBLIC_ALCHEMY_API_KEY'] as string,
    // TODO: implement proxy to hide API key
    // rpcUrl: `${url}/web3-rpc-proxy`,
  }),
}, uiConfig)
