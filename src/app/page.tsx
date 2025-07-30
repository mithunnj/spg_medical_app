'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { Heart, Shield, Users, ArrowRight, Stethoscope } from 'lucide-react'

export default function HomePage() {
    // Redirect to demo mode for presentation
    useEffect(() => {
        window.location.href = '/demo'
    }, [])
    
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-8">
        <div className="max-w-7xl w-full">
          {/* Header Section */}
          <div className="text-center mb-12 lg:mb-16">
            <div className="flex flex-col sm:flex-row items-center justify-center mb-6 lg:mb-8">
              <div className="bg-blue-600 p-3 lg:p-4 rounded-xl mb-4 sm:mb-0 sm:mr-4">
                <Stethoscope className="h-6 w-6 lg:h-8 lg:w-8 text-white" />
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 lg:mb-3">
                  CareBridge
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 font-medium">
                  Trusted Bridge Between Care Teams
                </p>
              </div>
            </div>
            
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300 px-3 lg:px-4 py-1 text-xs sm:text-sm font-medium mb-4 lg:mb-6">
              Montreal Children&apos;s Hospital - PICU
            </Badge>
            
            <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed px-4">
              A trusted bridge between intensive care and outpatient medicine, 
              with a transparent family portal for seamless patient transitions.
            </p>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 mb-12 lg:mb-16">
            {/* Sign In Card */}
            <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="text-center pb-4 lg:pb-6">
                <div className="bg-blue-50 w-12 h-12 lg:w-16 lg:h-16 rounded-xl flex items-center justify-center mx-auto mb-4 lg:mb-6">
                  <Users className="h-6 w-6 lg:h-8 lg:w-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl lg:text-2xl text-gray-900 font-semibold mb-2">
                  Professional Access
                </CardTitle>
                <CardDescription className="text-gray-600 text-sm lg:text-base px-2">
                  Secure portal for healthcare teams and families
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0 px-4 lg:px-6">
                <div className="space-y-3">
                  <Link href="/auth/signin" className="block">
                    <Button className="w-full h-11 lg:h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors text-sm lg:text-base">
                      Sign In to CareBridge
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/demo" className="block">
                    <Button variant="outline" className="w-full h-11 lg:h-12 border-blue-300 text-blue-700 hover:bg-blue-50 font-medium rounded-lg transition-colors text-sm lg:text-base">
                      View Demo Mode
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
                <p className="text-xs lg:text-sm text-gray-500 text-center mt-3 lg:mt-4 px-2">
                  Medical license verification required for healthcare professionals
                </p>
              </CardContent>
            </Card>

            {/* Platform Features */}
            <Card className="bg-white border-gray-200 shadow-sm">
              <CardHeader className="pb-4 lg:pb-6">
                <div className="bg-green-50 w-12 h-12 lg:w-16 lg:h-16 rounded-xl flex items-center justify-center mb-4 lg:mb-6">
                  <Shield className="h-6 w-6 lg:h-8 lg:w-8 text-green-600" />
                </div>
                <CardTitle className="text-xl lg:text-2xl text-gray-900 font-semibold mb-2">
                  Platform Features
                </CardTitle>
                <CardDescription className="text-gray-600 text-sm lg:text-base">
                  Professional tools for seamless care coordination
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0 px-4 lg:px-6">
                <div className="space-y-3 lg:space-y-4">
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 lg:mr-4 flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm lg:text-base">Secure patient discharge coordination</span>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 lg:mr-4 flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm lg:text-base">HIPAA-compliant data encryption</span>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 lg:mr-4 flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm lg:text-base">Transparent family communication</span>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 lg:mr-4 flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm lg:text-base">Real-time care team coordination</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* User Roles Section */}
          <div className="mb-8 lg:mb-12">
            <h3 className="text-lg lg:text-xl font-semibold text-gray-900 text-center mb-6 lg:mb-8 px-4">
              Bridging Care Teams & Families
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
              <div className="text-center p-3 lg:p-6 bg-white rounded-xl border border-gray-200">
                <div className="bg-blue-50 w-10 h-10 lg:w-14 lg:h-14 rounded-lg flex items-center justify-center mx-auto mb-2 lg:mb-4">
                  <span className="text-blue-600 font-bold text-sm lg:text-lg">MD</span>
                </div>
                <h4 className="font-semibold text-gray-900 text-xs lg:text-sm mb-1">Hospital Doctors</h4>
                <p className="text-xs text-gray-600">PICU Discharge Coordination</p>
              </div>
              <div className="text-center p-3 lg:p-6 bg-white rounded-xl border border-gray-200">
                <div className="bg-green-50 w-10 h-10 lg:w-14 lg:h-14 rounded-lg flex items-center justify-center mx-auto mb-2 lg:mb-4">
                  <span className="text-green-600 font-bold text-sm lg:text-lg">CL</span>
                </div>
                <h4 className="font-semibold text-gray-900 text-xs lg:text-sm mb-1">Clinic Doctors</h4>
                <p className="text-xs text-gray-600">Outpatient Care Reception</p>
              </div>
              <div className="text-center p-3 lg:p-6 bg-white rounded-xl border border-gray-200">
                <div className="bg-purple-50 w-10 h-10 lg:w-14 lg:h-14 rounded-lg flex items-center justify-center mx-auto mb-2 lg:mb-4">
                  <span className="text-purple-600 font-bold text-sm lg:text-lg">FM</span>
                </div>
                <h4 className="font-semibold text-gray-900 text-xs lg:text-sm mb-1">Families</h4>
                <p className="text-xs text-gray-600">Transparent Care Updates</p>
              </div>
              <div className="text-center p-3 lg:p-6 bg-white rounded-xl border border-gray-200">
                <div className="bg-orange-50 w-10 h-10 lg:w-14 lg:h-14 rounded-lg flex items-center justify-center mx-auto mb-2 lg:mb-4">
                  <span className="text-orange-600 font-bold text-sm lg:text-lg">AD</span>
                </div>
                <h4 className="font-semibold text-gray-900 text-xs lg:text-sm mb-1">Administrators</h4>
                <p className="text-xs text-gray-600">System Management</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center border-t border-gray-200 pt-6 lg:pt-8 px-4">
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-xs lg:text-sm text-gray-600 mb-3 lg:mb-4">
              <div className="flex items-center">
                <Shield className="h-3 w-3 lg:h-4 lg:w-4 mr-2" />
                <span>HIPAA Compliant</span>
              </div>
              <div className="flex items-center">
                <Heart className="h-3 w-3 lg:h-4 lg:w-4 mr-2" />
                <span>Healthcare Professional Access</span>
              </div>
            </div>
            <p className="text-xs lg:text-sm text-gray-500">
              CareBridge &copy; 2024 - Trusted Medical Care Coordination
            </p>
          </div>
        </div>
      </div>
    )
}
