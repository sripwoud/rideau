interface SharedConfigI {
  alchemy: { proxyEndpoint: string }
  appName: string
}

export const sharedConfig: SharedConfigI = {
  alchemy: { proxyEndpoint: 'alchemy' },
  appName: 'rideau',
}
