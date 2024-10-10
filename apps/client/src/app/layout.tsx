import type { Metadata } from 'next'
import { Teko } from 'next/font/google'
import './globals.css'
import { cookieToInitialState } from '@account-kit/core'
import { Layout } from 'client/c/Layout'
import { alchemyConfig } from 'client/lib/account-kit'
import { Providers } from 'client/p'
import { headers } from 'next/headers'
import type { ReactNode } from 'react'

const teko = Teko({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Rideau',
  description: 'Anonymous survey and feedback platform',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  const initialState = cookieToInitialState(alchemyConfig, headers().get('cookie') ?? undefined)

  return (
    <html lang='en'>
      <body
        className={teko.className}
      >
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
