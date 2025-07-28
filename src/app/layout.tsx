import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'
import { Analytics } from '@vercel/analytics/react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CareBridge - Montreal Children\'s Hospital',
  description: 'A trusted bridge between intensive care and outpatient medicine, with a transparent family portal for seamless patient transitions',
  keywords: 'medical, healthcare, hospital, clinic, patient, bridge, care coordination, PICU, Montreal Children\'s Hospital, patient transitions',
  robots: 'noindex, nofollow', // Prevent indexing of medical data
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            {children}
          </div>
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
