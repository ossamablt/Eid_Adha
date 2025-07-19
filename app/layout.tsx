import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import "./globals.css" // You should have a globals.css file in your app directory
import Providers from './providers'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Donation Page',
  description: 'Follow every step of your sacrifice, from payment to distribution.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}