interface SharedConfigI {
  alchemy: { proxyEndpoint: string }
  appName: string
  bandada: { pseGroupId: string }
}

export const sharedConfig: SharedConfigI = {
  alchemy: { proxyEndpoint: 'alchemy' },
  appName: 'yeap',
  bandada: { pseGroupId: '48515227088583163821982124675323' },
}
