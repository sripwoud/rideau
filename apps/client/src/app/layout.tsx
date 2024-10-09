import type { Metadata } from 'next'
import { Teko } from 'next/font/google'
import './globals.css'
import { Layout } from 'client/c/Layout'
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
  return (
    <html lang='en'>
      <body
        className={teko.className}
      >
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  )
}
