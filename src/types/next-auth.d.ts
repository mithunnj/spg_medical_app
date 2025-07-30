import type { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      role: string
      hospitalId?: string
      clinicId?: string
      licenseNumber?: string
    } & DefaultSession['user']
  }

  interface User {
    role: string
    hospitalId?: string
    clinicId?: string
    licenseNumber?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: string
    hospitalId?: string
    clinicId?: string
    licenseNumber?: string
  }
} 