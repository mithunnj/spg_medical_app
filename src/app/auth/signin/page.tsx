'use client'

import { useState } from 'react'
import { signIn, getSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Heart, Shield, Loader2, ArrowLeft, Stethoscope } from 'lucide-react'
import Link from 'next/link'

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [licenseNumber, setLicenseNumber] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const result = await signIn('credentials', {
        email,
        password,
        licenseNumber,
        redirect: false,
      })

      if (result?.error) {
        setError('Invalid credentials. Please check your email, password, and license number.')
      } else {
        // Get the updated session to determine redirect
        const session = await getSession()
        if (session?.user?.role) {
          switch (session.user.role) {
            case 'HOSPITAL_DOCTOR':
              router.push('/hospital/dashboard')
              break
            case 'CLINIC_DOCTOR':
              router.push('/clinic/dashboard')
              break
            case 'PARENT':
              router.push('/parent/dashboard')
              break
            case 'ADMIN':
              router.push('/admin/dashboard')
              break
            default:
              router.push('/')
          }
        } else {
          router.push('/')
        }
      }
    } catch {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8 lg:mb-10">
          <div className="flex flex-col sm:flex-row items-center justify-center mb-4 lg:mb-6">
            <div className="bg-blue-600 p-3 rounded-xl mb-3 sm:mb-0 sm:mr-3">
              <Stethoscope className="h-6 w-6 lg:h-7 lg:w-7 text-white" />
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                CareBridge
              </h1>
              <p className="text-sm text-gray-600">
                Trusted Bridge Between Care Teams
              </p>
            </div>
          </div>
          
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300 px-3 py-1 text-xs">
            Montreal Children&apos;s Hospital - PICU
          </Badge>
        </div>
        
        {/* Sign In Card */}
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardHeader className="text-center pb-4 lg:pb-6 px-4 lg:px-6">
            <CardTitle className="text-lg lg:text-xl text-gray-900 font-semibold">
              Professional Access Portal
            </CardTitle>
            <CardDescription className="text-gray-600 text-sm lg:text-base">
              Enter your credentials to access the secure medical portal
            </CardDescription>
          </CardHeader>
          
          <CardContent className="px-4 lg:px-6">
            <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-5">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="doctor@hospital.com"
                  required
                  disabled={isLoading}
                  className="h-10 lg:h-11 bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-sm lg:text-base"
                />
              </div>
              
              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  disabled={isLoading}
                  className="h-10 lg:h-11 bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-sm lg:text-base"
                />
              </div>
              
              {/* License Number Field */}
              <div className="space-y-2">
                <Label htmlFor="licenseNumber" className="text-sm font-medium text-gray-700">
                  Medical License Number
                </Label>
                <Input
                  id="licenseNumber"
                  type="text"
                  value={licenseNumber}
                  onChange={(e) => setLicenseNumber(e.target.value)}
                  placeholder="QC-12345 (for medical professionals)"
                  disabled={isLoading}
                  className="h-10 lg:h-11 bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-sm lg:text-base"
                />
                <p className="text-xs text-gray-500 flex items-center">
                  <Shield className="h-3 w-3 mr-1 flex-shrink-0" />
                  <span>Required for hospital and clinic doctors</span>
                </p>
              </div>

              {/* Error Alert */}
              {error && (
                <Alert variant="destructive" className="bg-red-50 border-red-200">
                  <AlertDescription className="text-red-700 text-sm">{error}</AlertDescription>
                </Alert>
              )}

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full h-11 lg:h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors text-sm lg:text-base" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  'Sign In to CareBridge'
                )}
              </Button>
            </form>

            {/* Footer Links */}
            <div className="mt-4 lg:mt-6 text-center">
              <Link 
                href="/" 
                className="inline-flex items-center text-sm text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ArrowLeft className="mr-1 h-3 w-3" />
                Back to Home
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <div className="mt-4 lg:mt-6 p-3 lg:p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 text-xs text-gray-600">
            <div className="flex items-center">
              <Shield className="h-3 w-3 mr-1" />
              <span>HIPAA Compliant Security</span>
            </div>
            <div className="flex items-center">
              <Heart className="h-3 w-3 mr-1" />
              <span>Patient Privacy Protected</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-2">
            Unauthorized access is strictly prohibited and monitored
          </p>
        </div>
      </div>
    </div>
  )
} 