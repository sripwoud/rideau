import { Fira_Mono, Teko } from 'next/font/google'
import './globals.css'
import { Layout } from 'client/c/Layout'
import { clientConfig } from 'client/l/config'
import { Providers } from 'client/p'
import type { ReactNode } from 'react'

const firaMono = Fira_Mono({ display: 'swap', subsets: ['latin'], variable: '--font-fira-mono', weight: '400' })
const teko = Teko({ display: 'swap', subsets: ['latin'], variable: '--font-teko' })

export const metadata = clientConfig.metadata

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html className={`${firaMono.variable} ${teko.variable}`} lang='en'>
      <body>
        <Providers>
          <Layout>
            {children}
          </Layout>
        </Providers>
      </body>
    </html>
  )
}
