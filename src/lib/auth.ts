import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
// import { PrismaAdapter } from '@auth/prisma-adapter'
// import { prisma } from '@/lib/prisma'
// import { UserRole } from '@prisma/client'

// Temporarily simplified auth configuration for initial setup
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize() {
        // Temporarily return null to disable auth during initial setup
        return null
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
})

/*
// Full auth configuration - to be enabled once database is connected
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
    maxAge: 8 * 60 * 60, // 8 hours for security
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        licenseNumber: { label: 'Medical License Number', type: 'text' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Missing credentials')
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          include: {
            hospital: true,
            clinic: true,
          },
        })

        if (!user || !user.isActive) {
          throw new Error('User not found or inactive')
        }

        // For medical professionals, verify license number
        if (
          (user.role === UserRole.HOSPITAL_DOCTOR || user.role === UserRole.CLINIC_DOCTOR) &&
          user.licenseNumber !== credentials.licenseNumber
        ) {
          throw new Error('Invalid license number')
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          hospitalId: user.hospitalId || undefined,
          clinicId: user.clinicId || undefined,
          licenseNumber: user.licenseNumber || undefined,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.hospitalId = user.hospitalId
        token.clinicId = user.clinicId
        token.licenseNumber = user.licenseNumber
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub!
        session.user.role = token.role as UserRole
        session.user.hospitalId = token.hospitalId as string
        session.user.clinicId = token.clinicId as string
        session.user.licenseNumber = token.licenseNumber as string
      }
      return session
    },
  },
})
*/

// Helper functions for role-based access control - disabled until auth is fully setup
/*
export const hasRole = (userRole: UserRole, allowedRoles: UserRole[]): boolean => {
  return allowedRoles.includes(userRole)
}

export const isHospitalDoctor = (role: UserRole): boolean => {
  return role === UserRole.HOSPITAL_DOCTOR
}

export const isClinicDoctor = (role: UserRole): boolean => {
  return role === UserRole.CLINIC_DOCTOR
}

export const isParent = (role: UserRole): boolean => {
  return role === UserRole.PARENT
}

export const isAdmin = (role: UserRole): boolean => {
  return role === UserRole.ADMIN
}
*/ 