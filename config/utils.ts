export function isEnvVarDefined(name: string, value: unknown) {
  if (value === '') throw new Error(`Missing environment variable ${name}`)
}

/**
 * DO NOT USE TO CHECK ENVIRONMENT VARIABLES USED CLIENT SIDE IN NEXTJS
 * NextJS inline client-side environment variables to make them accessible by the browser
 * But dynamic access to environment variables is not inlined
 * {@link https://nextjs.org/docs/basic-features/environment-variables#loading-environment-variables}
 */
export function getEnvVar<T extends string>(name: T) {
  const value = process.env[name] ?? ''
  isEnvVarDefined(name, value)
  return value
}
