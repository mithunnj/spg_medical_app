import { UserRole } from '@prisma/client'
import type { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      role: UserRole
      hospitalId?: string
      clinicId?: string
      licenseNumber?: string
    } & DefaultSession['user']
  }

  interface User {
    role: UserRole
    hospitalId?: string
    clinicId?: string
    licenseNumber?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: UserRole
    hospitalId?: string
    clinicId?: string
    licenseNumber?: string
  }
} 