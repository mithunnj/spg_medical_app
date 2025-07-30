import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

// Demo-friendly auth configuration without database dependency
export const { handlers, signIn, signOut, auth } = NextAuth({
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
      async authorize() {
        // For demo purposes, return null to indicate no authentication
        // This allows the demo to work without a database
        return null
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
        session.user.role = token.role as string
        session.user.hospitalId = token.hospitalId as string
        session.user.clinicId = token.clinicId as string
        session.user.licenseNumber = token.licenseNumber as string
      }
      return session
    },
  },
})

// Demo helper functions (simplified for demo purposes)
export const hasRole = (userRole: string, allowedRoles: string[]): boolean => {
  return allowedRoles.includes(userRole)
}

export const isHospitalDoctor = (role: string): boolean => {
  return role === 'HOSPITAL_DOCTOR'
}

export const isClinicDoctor = (role: string): boolean => {
  return role === 'CLINIC_DOCTOR'
}

export const isParent = (role: string): boolean => {
  return role === 'PARENT'
}

export const isAdmin = (role: string): boolean => {
  return role === 'ADMIN'
} 