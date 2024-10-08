'use client'
import { magic as _magic } from '@client/l/magic'
import { Magic as _Magic } from 'magic-sdk'
import {createContext, ReactNode, useEffect, useMemo, useState } from 'react'
import {OAuthExtension} from '@magic-ext/oauth2'

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
