export enum Env {
  DEVELOPMENT = 'DEVELOPMENT',
  PRODUCTION = 'PRODUCTION',
}

export interface SharedConfigI {
  appName: string
  alchemyProxyEndpoint: string
}
