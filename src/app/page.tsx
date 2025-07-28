import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { UserRole } from '@prisma/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { Heart, Shield, Users, ArrowRight } from 'lucide-react'

export default async function HomePage() {
  const session = await auth()

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-blue-600 p-3 rounded-2xl mr-4">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-slate-900 mb-2">
                  CareFlow
                </h1>
                <p className="text-lg text-slate-600">
                  Professional Medical Care Coordination
                </p>
              </div>
            </div>
            
            <div className="space-y-2 mb-8">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                Montreal Children&apos;s Hospital - PICU
              </Badge>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Streamlining patient care transitions with secure, HIPAA-compliant coordination 
                between pediatric intensive care and outbound family clinics.
              </p>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Sign In Card */}
            <Card className="bg-white/70 backdrop-blur-sm border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="text-center pb-4">
                <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl text-slate-900">Healthcare Professional Access</CardTitle>
                <CardDescription className="text-slate-600">
                  Secure portal for medical professionals and families
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Link href="/auth/signin" className="block">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition-colors">
                    Sign In to CareFlow
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <p className="text-xs text-slate-500 text-center">
                  Medical license verification required for healthcare professionals
                </p>
              </CardContent>
            </Card>

            {/* Features Card */}
            <Card className="bg-white/70 backdrop-blur-sm border-slate-200 shadow-lg">
              <CardHeader className="pb-4">
                <div className="bg-green-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-xl text-slate-900">Platform Features</CardTitle>
                <CardDescription className="text-slate-600">
                  Professional tools for seamless care coordination
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    <span className="text-slate-700">Secure patient discharge coordination</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-slate-700">HIPAA-compliant data encryption</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                    <span className="text-slate-700">Role-based access control</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                    <span className="text-slate-700">Real-time clinic availability</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* User Roles Section */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <div className="text-center p-4 bg-white/50 rounded-xl backdrop-blur-sm">
              <div className="bg-blue-100 w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2">
                <span className="text-blue-600 font-bold text-sm">MD</span>
              </div>
              <p className="text-sm font-medium text-slate-800">Hospital Doctors</p>
              <p className="text-xs text-slate-600">PICU Discharge</p>
            </div>
            <div className="text-center p-4 bg-white/50 rounded-xl backdrop-blur-sm">
              <div className="bg-green-100 w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2">
                <span className="text-green-600 font-bold text-sm">CL</span>
              </div>
              <p className="text-sm font-medium text-slate-800">Clinic Doctors</p>
              <p className="text-xs text-slate-600">Outbound Care</p>
            </div>
            <div className="text-center p-4 bg-white/50 rounded-xl backdrop-blur-sm">
              <div className="bg-purple-100 w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2">
                <span className="text-purple-600 font-bold text-sm">FM</span>
              </div>
              <p className="text-sm font-medium text-slate-800">Families</p>
              <p className="text-xs text-slate-600">Patient Updates</p>
            </div>
            <div className="text-center p-4 bg-white/50 rounded-xl backdrop-blur-sm">
              <div className="bg-orange-100 w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2">
                <span className="text-orange-600 font-bold text-sm">AD</span>
              </div>
              <p className="text-sm font-medium text-slate-800">Administrators</p>
              <p className="text-xs text-slate-600">System Management</p>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center">
            <div className="flex items-center justify-center space-x-4 text-xs text-slate-500 mb-4">
              <div className="flex items-center">
                <Shield className="h-3 w-3 mr-1" />
                <span>HIPAA Compliant</span>
              </div>
              <div className="flex items-center">
                <Heart className="h-3 w-3 mr-1" />
                <span>Healthcare Professional Access Only</span>
              </div>
            </div>
            <p className="text-xs text-slate-400">
              CareFlow &copy; 2024 - Secure Medical Care Coordination Platform
            </p>
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
