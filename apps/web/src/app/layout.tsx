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
  title: 'Forma App',
  description: 'Full-stack web application',
  icons: {
    icon: [
      { url: '/logos/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/logos/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/logos/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/logos/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    shortcut: ['/logos/favicon.ico'],
  },
  manifest: '/logos/site.webmanifest',
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
