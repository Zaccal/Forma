import type { Metadata } from 'next'
import { Inter, Montserrat } from 'next/font/google'

import '../index.css'
import Providers from '@/components/providers'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Forma',
  description: 'Forma',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${inter.variable} ${montserrat.variable} antialiased`}>
        <Providers>
          <div className="grid grid-rows-[auto_1fr] h-svh">{children}</div>
        </Providers>
      </body>
    </html>
  )
}
