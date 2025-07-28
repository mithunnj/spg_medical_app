import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'
import { Analytics } from '@vercel/analytics/react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CareFlow - Montreal Children\'s Hospital',
  description: 'Professional medical care coordination platform for seamless patient discharge transitions from PICU to outbound clinics',
  keywords: 'medical, healthcare, hospital, clinic, patient, discharge, PICU, Montreal Children\'s Hospital, care coordination, patient transitions',
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
          <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            {children}
          </div>
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
