import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Stethoscope, 
  Users, 
  Building2, 
  UserCheck, 
  Settings,
  ArrowRight,
  Code,
  Eye
} from 'lucide-react'

export default function DevNavigationPage() {
  const routes = [
    {
      name: 'PICU Dashboard',
      description: 'Pediatric ICU doctor interface for patient intake and tracking',
      route: '/dev/picu',
      role: 'HOSPITAL_DOCTOR',
      color: 'bg-blue-50 text-blue-700 border-blue-200',
      icon: Stethoscope,
      features: [
        'Patient intake form',
        'Clinic selection and contact',
        'Patient tracking table',
        'Messaging system',
        'File upload capability'
      ]
    },
    {
      name: 'Clinic Dashboard',
      description: 'Outbound clinic interface for receiving and managing patient requests',
      route: '/dev/clinic',
      role: 'CLINIC_DOCTOR',
      color: 'bg-green-50 text-green-700 border-green-200',
      icon: Building2,
      features: [
        'Incoming patient requests',
        'Accept/deny functionality',
        'Capacity management',
        'Response system'
      ],
      status: 'Coming Soon'
    },
    {
      name: 'Parent Portal',
      description: 'Patient guardian interface for tracking child\'s placement progress',
      route: '/dev/parent',
      role: 'PARENT',
      color: 'bg-purple-50 text-purple-700 border-purple-200',
      icon: Users,
      features: [
        'Patient status tracking',
        'Progress updates',
        'Communication portal'
      ],
      status: 'Coming Soon'
    },
    {
      name: 'Admin Dashboard',
      description: 'Administrative interface for user management and system oversight',
      route: '/dev/admin',
      role: 'ADMIN',
      color: 'bg-orange-50 text-orange-700 border-orange-200',
      icon: Settings,
      features: [
        'User management',
        'Role assignments',
        'System analytics',
        'Audit logs'
      ],
      status: 'Coming Soon'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center space-x-3">
                <Code className="h-8 w-8 text-blue-600" />
                <span>Development Environment</span>
              </h1>
              <p className="text-gray-600">
                CareBridge Medical Platform - Development Dashboard
              </p>
            </div>
            <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300">
              <Eye className="h-4 w-4 mr-2" />
              Development Mode
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Available Page Views
          </h2>
          <p className="text-gray-600">
            Click on any route below to preview the different user interfaces without authentication.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {routes.map((route) => {
            const IconComponent = route.icon
            
            return (
              <Card key={route.route} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${route.color}`}>
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{route.name}</CardTitle>
                        <Badge variant="outline" className="mt-1 text-xs">
                          {route.role}
                        </Badge>
                      </div>
                    </div>
                    {route.status && (
                      <Badge variant="secondary" className="text-xs">
                        {route.status}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    {route.description}
                  </p>
                  
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">Features:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {route.features.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {route.status !== 'Coming Soon' ? (
                    <Link href={route.route}>
                      <Button className="w-full">
                        <span>View {route.name}</span>
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  ) : (
                    <Button disabled className="w-full">
                      {route.status}
                    </Button>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Instructions */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-2 flex items-center">
            <Code className="h-5 w-5 mr-2" />
            Development Instructions
          </h3>
          <div className="text-blue-800 space-y-2 text-sm">
            <p>• <strong>Authentication Bypass:</strong> All /dev routes bypass the login system for easy testing</p>
            <p>• <strong>Mock Data:</strong> Pages use realistic mock data to demonstrate functionality</p>
            <p>• <strong>Role Simulation:</strong> Each page simulates the appropriate user role</p>
            <p>• <strong>Production Ready:</strong> To enable auth, remove the /dev routes and use the main routes</p>
          </div>
        </div>

        {/* Quick Access URLs */}
        <div className="mt-8 bg-gray-100 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-3">Quick Access URLs:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm font-mono">
            <div className="bg-white p-2 rounded border">
              <span className="text-gray-500">PICU:</span> 
              <span className="text-blue-600 ml-2">localhost:3000/dev/picu</span>
            </div>
            <div className="bg-white p-2 rounded border">
              <span className="text-gray-500">Clinic:</span> 
              <span className="text-green-600 ml-2">localhost:3000/dev/clinic</span>
            </div>
            <div className="bg-white p-2 rounded border">
              <span className="text-gray-500">Parent:</span> 
              <span className="text-purple-600 ml-2">localhost:3000/dev/parent</span>
            </div>
            <div className="bg-white p-2 rounded border">
              <span className="text-gray-500">Admin:</span> 
              <span className="text-orange-600 ml-2">localhost:3000/dev/admin</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 