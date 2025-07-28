import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { UserRole } from '@prisma/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { Heart, Shield, Users, ArrowRight, Stethoscope } from 'lucide-react'

export default async function HomePage() {
  const session = await auth()

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-8">
              <div className="bg-blue-600 p-4 rounded-xl mr-4">
                <Stethoscope className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-5xl font-bold text-gray-900 mb-3">
                  CareBridge
                </h1>
                <p className="text-xl text-gray-600 font-medium">
                  Trusted Bridge Between Care Teams
                </p>
              </div>
            </div>
            
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300 px-4 py-1 text-sm font-medium mb-6">
              Montreal Children&apos;s Hospital - PICU
            </Badge>
            
            <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
              A trusted bridge between intensive care and outpatient medicine, 
              with a transparent family portal for seamless patient transitions.
            </p>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Sign In Card */}
            <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="text-center pb-6">
                <div className="bg-blue-50 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-2xl text-gray-900 font-semibold mb-2">
                  Professional Access
                </CardTitle>
                <CardDescription className="text-gray-600 text-base">
                  Secure portal for healthcare teams and families
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Link href="/auth/signin" className="block">
                  <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
                    Sign In to CareBridge
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <p className="text-sm text-gray-500 text-center mt-4">
                  Medical license verification required for healthcare professionals
                </p>
              </CardContent>
            </Card>

            {/* Platform Features */}
            <Card className="bg-white border-gray-200 shadow-sm">
              <CardHeader className="pb-6">
                <div className="bg-green-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                  <Shield className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl text-gray-900 font-semibold mb-2">
                  Platform Features
                </CardTitle>
                <CardDescription className="text-gray-600 text-base">
                  Professional tools for seamless care coordination
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                    <span className="text-gray-700">Secure patient discharge coordination</span>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                    <span className="text-gray-700">HIPAA-compliant data encryption</span>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                    <span className="text-gray-700">Transparent family communication</span>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                    <span className="text-gray-700">Real-time care team coordination</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* User Roles Section */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-gray-900 text-center mb-8">
              Bridging Care Teams & Families
            </h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-white rounded-xl border border-gray-200">
                <div className="bg-blue-50 w-14 h-14 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 font-bold text-lg">MD</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">Hospital Doctors</h4>
                <p className="text-sm text-gray-600">PICU Discharge Coordination</p>
              </div>
              <div className="text-center p-6 bg-white rounded-xl border border-gray-200">
                <div className="bg-green-50 w-14 h-14 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-600 font-bold text-lg">CL</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">Clinic Doctors</h4>
                <p className="text-sm text-gray-600">Outpatient Care Reception</p>
              </div>
              <div className="text-center p-6 bg-white rounded-xl border border-gray-200">
                <div className="bg-purple-50 w-14 h-14 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-purple-600 font-bold text-lg">FM</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">Families</h4>
                <p className="text-sm text-gray-600">Transparent Care Updates</p>
              </div>
              <div className="text-center p-6 bg-white rounded-xl border border-gray-200">
                <div className="bg-orange-50 w-14 h-14 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-orange-600 font-bold text-lg">AD</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">Administrators</h4>
                <p className="text-sm text-gray-600">System Management</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center border-t border-gray-200 pt-8">
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-600 mb-4">
              <div className="flex items-center">
                <Shield className="h-4 w-4 mr-2" />
                <span>HIPAA Compliant</span>
              </div>
              <div className="flex items-center">
                <Heart className="h-4 w-4 mr-2" />
                <span>Healthcare Professional Access</span>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              CareBridge &copy; 2024 - Trusted Medical Care Coordination
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
