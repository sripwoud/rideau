'use client'
import type { OAuthExtension } from '@magic-ext/oauth2'
import { magic as _magic } from 'client/l/magic'
import type { Magic as _Magic } from 'magic-sdk'
import { createContext, type ReactNode, useEffect, useMemo, useState } from 'react'

type Magic = _Magic<OAuthExtension[]>
type MagicContextType = {
  magic: Magic | null
}

export const MagicContext = createContext<MagicContextType>({
  magic: null,
})

export const MagicProvider = ({ children }: { children: ReactNode }) => {
  const [magic, setMagic] = useState<Magic | null>(null)

  useEffect(() => {
    // @ts-expect-error FIXME
    if (process.env['NEXT_PUBLIC_MAGIC_API_KEY']) setMagic(_magic)
  }, [])

  const value = useMemo(() => {
    return {
      magic,
    }
  }, [magic])

  return <MagicContext.Provider value={value}>{children}</MagicContext.Provider>
}
