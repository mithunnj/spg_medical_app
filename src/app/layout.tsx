import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'
import { Analytics } from '@vercel/analytics/react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SPG Medical Portal - Montreal Children\'s Hospital',
  description: 'Secure patient discharge coordination portal for PICU and outbound clinics',
  keywords: 'medical, healthcare, hospital, clinic, patient, discharge, PICU, Montreal Children\'s Hospital',
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
          <div className="min-h-screen bg-background">
            {children}
          </div>
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
