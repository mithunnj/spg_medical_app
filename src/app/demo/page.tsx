import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Stethoscope,
  Building2,
  Users,
  Settings,
  ArrowRight,
  Presentation,
  Eye,
  MessageSquare,
  FileText,
  Calendar,
  Shield,
  Heart,
  TrendingUp
} from 'lucide-react'

export default function DemoPage() {
  const demoRoutes = [
    {
      name: 'PICU Doctor Interface',
      description: 'Complete workflow for pediatric ICU doctors to coordinate patient discharges with outbound clinics. Features patient intake, clinic selection, real-time tracking, and secure communication.',
      route: '/demo/picu',
      role: 'HOSPITAL_DOCTOR',
      color: 'bg-blue-50 text-blue-700 border-blue-200',
      icon: Stethoscope,
      features: [
        'Patient intake and documentation',
        'Clinic selection and contact',
        'Real-time patient tracking',
        'Secure messaging system',
        'File upload and management',
        'Automated follow-up reminders'
      ]
    },
    {
      name: 'Outbound Clinic Interface',
      description: 'Family doctor clinic portal for managing incoming patient requests from PICU. Includes capacity management, patient review, and secure communication with hospital teams.',
      route: '/demo/clinic',
      role: 'CLINIC_DOCTOR',
      color: 'bg-green-50 text-green-700 border-green-200',
      icon: Building2,
      features: [
        'Incoming patient requests review',
        'Accept/deny decision workflow',
        'Capacity management dashboard',
        'Secure PICU communication',
        'Patient file review system',
        'Notes and documentation tools'
      ]
    },
    {
      name: 'Patient Guardian Portal',
      description: 'Family portal for tracking child\'s care transition progress with direct communication to care teams. Provides transparency and real-time updates.',
      route: '/demo/guardian',
      role: 'PARENT',
      color: 'bg-purple-50 text-purple-700 border-purple-200',
      icon: Users,
      features: [
        'Real-time status tracking',
        'Direct messaging with care teams',
        'Appointment scheduling',
        'Document access and sharing',
        'Progress notifications',
        'Family communication tools'
      ]
    },
    {
      name: 'Administrative Dashboard',
      description: 'System administration and user management interface for overseeing the entire platform. Includes user management, analytics, and compliance monitoring.',
      route: '/demo/admin',
      role: 'ADMIN',
      color: 'bg-orange-50 text-orange-700 border-orange-200',
      icon: Settings,
      features: [
        'User access management',
        'Role-based permissions',
        'System analytics and reporting',
        'Audit trail monitoring',
        'Performance metrics',
        'Compliance oversight'
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 lg:py-6">
            <div className="mb-4 sm:mb-0">
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 flex items-center space-x-2 lg:space-x-3">
                <Presentation className="h-6 w-6 lg:h-8 lg:w-8 text-blue-600" />
                <span>CareBridge Demo</span>
              </h1>
              <p className="text-sm lg:text-base text-gray-600 mt-1">
                Professional Presentation for Dr. Matthew Donlan - Montreal Children&apos;s Hospital PICU
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 lg:gap-3">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300 text-xs lg:text-sm">
                <Eye className="h-3 w-3 lg:h-4 lg:w-4 mr-1 lg:mr-2" />
                Demo Mode
              </Badge>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300 text-xs lg:text-sm">
                <Shield className="h-3 w-3 lg:h-4 lg:w-4 mr-1 lg:mr-2" />
                HIPAA Compliant
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {/* Introduction Section */}
        <div className="text-center mb-8 lg:mb-12">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 lg:p-8 mb-6 lg:mb-8">
            <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3 lg:mb-4">
              Welcome to CareBridge
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-sm lg:text-lg leading-relaxed mb-4 lg:mb-6">
              A comprehensive medical care coordination platform designed to bridge the gap between 
              Pediatric ICU care and outpatient family medicine, ensuring seamless patient transitions 
              with full transparency for families.
            </p>
            <div className="flex flex-wrap justify-center gap-2 lg:gap-4 text-xs lg:text-sm text-gray-500">
              <div className="flex items-center">
                <Heart className="h-4 w-4 mr-2 text-red-500" />
                <span>Family-Centered Care</span>
              </div>
              <div className="flex items-center">
                <Shield className="h-4 w-4 mr-2 text-blue-500" />
                <span>HIPAA Compliant</span>
              </div>
              <div className="flex items-center">
                <TrendingUp className="h-4 w-4 mr-2 text-green-500" />
                <span>Real-Time Updates</span>
              </div>
              <div className="flex items-center">
                <MessageSquare className="h-4 w-4 mr-2 text-purple-500" />
                <span>Secure Communication</span>
              </div>
            </div>
          </div>
        </div>

        {/* Platform Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card className="bg-white shadow-sm border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Building2 className="h-6 w-6 mr-3 text-blue-600" />
                Platform Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">PICU Discharge Coordination</h4>
                    <p className="text-sm text-gray-600">Streamlined patient transfer process with automated clinic matching</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Clinic Management</h4>
                    <p className="text-sm text-gray-600">Real-time capacity tracking and patient request processing</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Family Transparency</h4>
                    <p className="text-sm text-gray-600">Direct access to care progress and communication tools</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Administrative Oversight</h4>
                    <p className="text-sm text-gray-600">Comprehensive system management and compliance monitoring</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <TrendingUp className="h-6 w-6 mr-3 text-green-600" />
                Key Benefits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <span className="font-medium text-blue-900">Reduced Discharge Time</span>
                  <Badge variant="outline" className="bg-blue-100 text-blue-700">-40%</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="font-medium text-green-900">Family Satisfaction</span>
                  <Badge variant="outline" className="bg-green-100 text-green-700">94%</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <span className="font-medium text-purple-900">Clinic Response Time</span>
                  <Badge variant="outline" className="bg-purple-100 text-purple-700">2.3 days</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                  <span className="font-medium text-orange-900">System Uptime</span>
                  <Badge variant="outline" className="bg-orange-100 text-orange-700">99.8%</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Demo Interfaces */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
            Interactive Demo Interfaces
          </h3>
          <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
            Click on any interface below to explore the full functionality of CareBridge. 
            Each demo includes realistic data and complete workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 lg:gap-6">
          {demoRoutes.map((route) => {
            const IconComponent = route.icon
            
            return (
              <Card key={route.route} className="hover:shadow-lg transition-all duration-200 border-gray-200">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-3 rounded-xl ${route.color}`}>
                        <IconComponent className="h-7 w-7" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{route.name}</CardTitle>
                        <Badge variant="outline" className="mt-2 text-xs">
                          {route.role}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    {route.description}
                  </p>
                  
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">Key Features:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {route.features.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link href={route.route}>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      <span>Explore {route.name}</span>
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Demo Instructions */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-xl p-8">
          <h3 className="font-semibold text-blue-900 mb-4 flex items-center">
            <Presentation className="h-6 w-6 mr-3" />
            Demo Presentation Guide
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-blue-900 mb-3">Recommended Demo Flow:</h4>
              <ol className="text-blue-800 space-y-2 text-sm">
                <li className="flex items-start space-x-2">
                  <span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</span>
                  <span>Start with <strong>PICU Doctor Interface</strong> to show patient intake process</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</span>
                  <span>Switch to <strong>Clinic Interface</strong> to demonstrate request processing</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</span>
                  <span>Show <strong>Family Portal</strong> for transparency and communication</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">4</span>
                  <span>End with <strong>Admin Dashboard</strong> for system oversight</span>
                </li>
              </ol>
            </div>
            <div>
              <h4 className="font-medium text-blue-900 mb-3">Key Features to Highlight:</h4>
              <ul className="text-blue-800 space-y-2 text-sm">
                <li className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-blue-600" />
                  <span>HIPAA-compliant data encryption</span>
                </li>
                <li className="flex items-center space-x-2">
                  <MessageSquare className="h-4 w-4 text-green-600" />
                  <span>Real-time messaging between care teams</span>
                </li>
                <li className="flex items-center space-x-2">
                  <FileText className="h-4 w-4 text-purple-600" />
                  <span>Secure file upload and management</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-orange-600" />
                  <span>Automated follow-up scheduling</span>
                </li>
                <li className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-red-600" />
                  <span>Performance analytics and reporting</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quick Access */}
        <div className="mt-8 bg-gray-100 rounded-xl p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Quick Access URLs:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm font-mono">
            <div className="bg-white p-3 rounded-lg border">
              <span className="text-gray-500">PICU Doctor:</span> 
              <span className="text-blue-600 ml-2">/demo/picu</span>
            </div>
            <div className="bg-white p-3 rounded-lg border">
              <span className="text-gray-500">Clinic Doctor:</span> 
              <span className="text-green-600 ml-2">/demo/clinic</span>
            </div>
            <div className="bg-white p-3 rounded-lg border">
              <span className="text-gray-500">Family Portal:</span> 
              <span className="text-purple-600 ml-2">/demo/guardian</span>
            </div>
            <div className="bg-white p-3 rounded-lg border">
              <span className="text-gray-500">Admin Dashboard:</span> 
              <span className="text-orange-600 ml-2">/demo/admin</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 