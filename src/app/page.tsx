import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { UserRole } from '@prisma/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default async function HomePage() {
  const session = await auth()

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-md w-full space-y-8 p-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              SPG Medical Portal
            </h1>
            <p className="text-gray-600 mb-4">
                Montreal Children&apos;s Hospital - PICU
             </p>
             <p className="text-sm text-gray-500 mb-8">
               Secure patient discharge coordination platform
             </p>
           </div>
           
           <Card>
             <CardHeader>
               <CardTitle>Welcome</CardTitle>
               <CardDescription>
                 Please sign in to access the medical portal
               </CardDescription>
             </CardHeader>
             <CardContent>
               <Link href="/auth/signin">
                 <Button className="w-full">
                   Sign In
                 </Button>
               </Link>
             </CardContent>
           </Card>

           <div className="text-center text-xs text-gray-500">
             <p>🔒 HIPAA Compliant | 🏥 Healthcare Professional Access Only</p>
           </div>
         </div>
       </div>
     )
   }

   // Redirect based on user role
   switch (session.user.role) {
     case UserRole.HOSPITAL_DOCTOR:
       redirect('/hospital/dashboard')
     case UserRole.CLINIC_DOCTOR:
       redirect('/clinic/dashboard')
     case UserRole.PARENT:
       redirect('/parent/dashboard')
     case UserRole.ADMIN:
       redirect('/admin/dashboard')
     default:
       redirect('/auth/signin')
   }
}
