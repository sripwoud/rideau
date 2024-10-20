import { Fira_Mono, Teko } from 'next/font/google'
import './globals.css'
import { cookieToInitialState } from '@account-kit/core'
import { Layout } from 'client/c/Layout'
import { alchemyConfig } from 'client/l/account-kit'
import { clientConfig } from 'client/l/config'
import { Providers } from 'client/p'
import { headers } from 'next/headers'
import type { ReactNode } from 'react'

const firaMono = Fira_Mono({ display: 'swap', subsets: ['latin'], variable: '--font-fira-mono', weight: '400' })
const teko = Teko({ display: 'swap', subsets: ['latin'], variable: '--font-teko' })

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
