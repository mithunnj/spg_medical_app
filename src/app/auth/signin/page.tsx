'use client'

import { useState } from 'react'
import { signIn, getSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2 } from 'lucide-react'

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Sign In
          </h1>
                     <p className="text-gray-600">
             SPG Medical Portal - Montreal Children&apos;s Hospital
           </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Healthcare Professional Access</CardTitle>
            <CardDescription>
              Enter your credentials to access the secure medical portal
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@hospital.com"
                  required
                  disabled={isLoading}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  disabled={isLoading}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="licenseNumber">Medical License Number</Label>
                <Input
                  id="licenseNumber"
                  type="text"
                  value={licenseNumber}
                  onChange={(e) => setLicenseNumber(e.target.value)}
                  placeholder="License Number (for medical professionals)"
                  disabled={isLoading}
                />
                <p className="text-xs text-gray-500">
                  Required for hospital and clinic doctors
                </p>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center text-xs text-gray-500">
          <p>🔒 This is a secure, HIPAA-compliant portal</p>
          <p>Unauthorized access is strictly prohibited</p>
        </div>
      </div>
    </div>
  )
} 