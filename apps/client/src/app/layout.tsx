import './globals.css'
import { cookieToInitialState } from '@account-kit/core'
import { Layout } from 'client/c/Layout'
import { alchemyConfig } from 'client/l/account-kit'
import { clientConfig } from 'client/l/config'
import { Providers } from 'client/p'
import localFont from 'next/font/local'
import { headers } from 'next/headers'
import type { ReactNode } from 'react'

const firaMono = localFont({ src: '../../public/Fira_Mono/FiraMono-Regular.ttf', variable: '--font-fira-mono' })
const teko = localFont({ src: '../../public/Teko/Teko-VariableFont_wght.ttf', variable: '--font-teko' })

// @ts-ignore FIXME
export const metadata = clientConfig.metadata

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  const initialState = cookieToInitialState(alchemyConfig, headers().get('cookie') ?? undefined)

  return (
    <html className={`${firaMono.variable} ${teko.variable}`} lang='en'>
      <body>
        {/* @ts-ignore FIXME */}
        <Providers initialState={initialState}>
          <Layout>
            {children}
          </Layout>
        </Providers>
      </body>
    </html>
  )
}
