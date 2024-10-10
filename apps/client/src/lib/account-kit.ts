import { alchemy, sepolia } from '@account-kit/infra'
import { type AlchemyAccountsUIConfig, cookieStorage, createConfig } from '@account-kit/react'

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
  // TODO: proxy to backend to avoid leaking api key
  // biome-ignore lint/style/noNonNullAssertion: FIXME
  transport: alchemy({ apiKey: process.env['NEXT_PUBLIC_ALCHEMY_API_KEY']! }),
}, uiConfig)
