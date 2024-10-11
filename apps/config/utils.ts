import { Env } from './types'

export function getEnv() {
  const env = process.env['ENV'] ?? process.env['NEXT_PUBLIC_ENV']
  switch (env) {
    case 'DEVELOPMENT':
      return Env.DEVELOPMENT
    case 'PRODUCTION':
      return Env.PRODUCTION
    default:
      throw new Error(`Unsupported environment: ${env}`)
  }
}

const isClientSide = () => typeof window !== 'undefined'
const isClientEnvVar = (key: string) => key.startsWith('NEXT_PUBLIC_')
const isClientSideEnvVar = (key: string) => isClientEnvVar(key) && isClientSide()
const isServerSideEnvVar = (key: string) => !isClientEnvVar(key) && !isClientSide()

export function isEnvVarDefined(key: string, value: unknown) {
  if (
    value === ''
    && (isClientSideEnvVar(key) || isServerSideEnvVar(key))
  ) {
    throw new Error(`Missing environment variable ${key}`)
  }
}
export function getEnvVar<T extends string>(name: T) {
  if (isClientSideEnvVar(name))
    throw new Error(`Can't access dynamically environement variables on the client side with NextJS: ${name}`)
  const value = process.env[name]
  if (value === undefined || value === '') throw new Error(`Environment variable ${name} not set`)
  return value
}
export function getEnvVarNumber(name: string) {
  const value = Number.parseInt(getEnvVar(name))
  if (Number.isNaN(value)) throw new Error(`Environment variable ${name} must be a number`)
  return value
}
