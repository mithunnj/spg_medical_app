'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Building2,
  CheckCircle,
  XCircle,
  Clock,
  MessageSquare,
  FileText,
  Users,
  TrendingUp,
  ArrowLeft,
  Eye,
  Calendar,
  Plus,
  Minus,
  MapPin,
  Phone,
  Mail,
  Upload,
  Send,
  Download
} from 'lucide-react'
import { useEffect, useState } from 'react'

export default function ClinicDoctorDemo() {
  const [clinics, setClinics] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedModal, setSelectedModal] = useState<string | null>(null)

  useEffect(() => {
    // Fetch clinic data on client side
    const fetchClinics = async () => {
      try {
        const response = await fetch('/api/clinics')
        const data = await response.json()
        setClinics(data)
      } catch (error) {
        console.error('Error fetching clinics:', error)
        // Fallback to mock data
        setClinics([])
      } finally {
        setLoading(false)
      }
    }
    
    fetchClinics()
  }, [])

  // Select a sample clinic for demo
  const demoClinic = clinics.find(c => c.name.includes('Montreal') || c.name.includes('Pediatric')) || clinics[0] || {
    id: 'demo-clinic',
    name: 'Montreal Pediatric Associates',
    region: 'Montreal',
    address: '123 Medical Center Blvd, Montreal, QC',
    phone: '+1-514-555-0123',
    email: 'info@montrealpediatric.ca',
    specializations: ['Pediatrics', 'Family Medicine'],
    capacity: 50,
    currentPatients: 38,
    acceptingNew: true,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }

  const mockRequests = [
    {
      id: '1',
      patientName: 'Emma Rodriguez',
      age: '8 years',
      diagnosis: 'Severe asthma exacerbation',
      priority: 'HIGH',
      status: 'PENDING',
      received: '2024-01-15',
      hospital: 'Montreal Children\'s Hospital',
      doctor: 'Dr. Sarah Johnson',
      files: 3,
      notes: 'Patient requires regular follow-up for asthma management'
    },
    {
      id: '2',
      patientName: 'Lucas Chen',
      age: '12 years',
      diagnosis: 'Type 1 diabetes management',
      priority: 'MEDIUM',
      status: 'APPROVED',
      received: '2024-01-10',
      hospital: 'Montreal Children\'s Hospital',
      doctor: 'Dr. Michael Chen',
      files: 5,
      notes: 'Stable condition, ready for outpatient care'
    },
    {
      id: '3',
      patientName: 'Sophie Tremblay',
      age: '6 years',
      diagnosis: 'Complex congenital heart disease',
      priority: 'HIGH',
      status: 'DENIED',
      received: '2024-01-08',
      hospital: 'Montreal Children\'s Hospital',
      doctor: 'Dr. Sarah Johnson',
      files: 8,
      notes: 'Requires specialized cardiology care'
    },
    {
      id: '4',
      patientName: 'Ahmed Hassan',
      age: '10 years',
      diagnosis: 'Epilepsy management',
      priority: 'MEDIUM',
      status: 'APPROVED',
      received: '2024-01-05',
      hospital: 'Montreal Children\'s Hospital',
      doctor: 'Dr. Emily Davis',
      files: 4,
      notes: 'Well-controlled seizures, suitable for family practice'
    }
  ]

  const mockMessages = [
    {
      id: '1',
      from: 'Dr. Sarah Johnson',
      subject: 'Re: Emma Rodriguez - Additional Information',
      content: 'Thank you for considering Emma. I\'ve attached additional test results that may be relevant to your decision.',
      timestamp: '2024-01-16 14:30',
      unread: true
    },
    {
      id: '2',
      from: 'Dr. Michael Chen',
      subject: 'Lucas Chen - Follow-up Questions',
      content: 'Could you provide more details about Lucas\'s current medication regimen?',
      timestamp: '2024-01-12 09:15',
      unread: false
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800'
      case 'APPROVED': return 'bg-green-100 text-green-800'
      case 'DENIED': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'HIGH': return 'bg-red-100 text-red-800'
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-800'
      case 'LOW': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const availableSlots = demoClinic.capacity - demoClinic.currentPatients
  const utilizationRate = Math.round((demoClinic.currentPatients / demoClinic.capacity) * 100)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Link href="/demo" className="text-gray-500 hover:text-gray-700">
                <ArrowLeft className="h-6 w-6" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent flex items-center space-x-3">
                  <Building2 className="h-8 w-8 text-blue-600" />
                  <span>Clinic Doctor Dashboard</span>
                </h1>
                <p className="text-gray-600">{demoClinic.name} - Patient Request Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300">
                <Eye className="h-4 w-4 mr-2" />
                Demo Mode
              </Badge>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300">
                Dr. Robert Wilson
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Clinic Information */}
        <Card className="bg-white shadow-sm mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Clinic Information</span>
              <Badge variant="outline" className={`${demoClinic.acceptingNew ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                {demoClinic.acceptingNew ? 'Accepting New Patients' : 'Not Accepting New Patients'}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Building2 className="h-5 w-5 text-gray-500" />
                  <div>
                    <h3 className="font-semibold text-gray-900">{demoClinic.name}</h3>
                    <p className="text-sm text-gray-600">{demoClinic.region}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-gray-500" />
                  <p className="text-sm text-gray-600">{demoClinic.address}</p>
                </div>
                {demoClinic.phone && (
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-gray-500" />
                    <p className="text-sm text-gray-600">{demoClinic.phone}</p>
                  </div>
                )}
                {demoClinic.email && (
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-gray-500" />
                    <p className="text-sm text-gray-600">{demoClinic.email}</p>
                  </div>
                )}
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Specializations</h4>
                  <div className="flex flex-wrap gap-2">
                    {demoClinic.specializations.map((spec, index) => (
                      <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Capacity Overview</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total Capacity</span>
                      <span className="font-semibold">{demoClinic.capacity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Current Patients</span>
                      <span className="font-semibold">{demoClinic.currentPatients}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Available Slots</span>
                      <span className="font-semibold text-green-600">{availableSlots}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Incoming Requests</p>
                  <p className="text-2xl font-bold text-gray-900">{mockRequests.length}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Available Slots</p>
                  <p className="text-2xl font-bold text-gray-900">{availableSlots}</p>
                </div>
                <div className="bg-green-100 p-3 rounded-lg">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Utilization Rate</p>
                  <p className="text-2xl font-bold text-gray-900">{utilizationRate}%</p>
                </div>
                <div className="bg-purple-100 p-3 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Acceptance Rate</p>
                  <p className="text-2xl font-bold text-gray-900">78%</p>
                </div>
                <div className="bg-orange-100 p-3 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Capacity Management */}
        <Card className="bg-white shadow-sm mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Capacity Management</span>
              <Badge variant="outline" className="bg-green-50 text-green-700">
                {availableSlots} slots available
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">Total Capacity</span>
                  <span className="text-2xl font-bold text-gray-900">{demoClinic.capacity}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${utilizationRate}%` }}></div>
                </div>
                <div className="text-sm text-gray-600">{demoClinic.currentPatients} patients currently enrolled</div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">Available Slots</span>
                  <span className="text-2xl font-bold text-green-600">{availableSlots}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: `${(availableSlots / demoClinic.capacity) * 100}%` }}></div>
                </div>
                <div className="text-sm text-gray-600">Ready for new patients</div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">Pending Decisions</span>
                  <span className="text-2xl font-bold text-yellow-600">2</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '13%' }}></div>
                </div>
                <div className="text-sm text-gray-600">Require review</div>
              </div>
            </div>

            <div className="mt-6 flex space-x-4">
              <Button variant="outline" className="flex items-center">
                <Plus className="h-4 w-4 mr-2" />
                Increase Capacity
              </Button>
              <Button variant="outline" className="flex items-center">
                <Minus className="h-4 w-4 mr-2" />
                Decrease Capacity
              </Button>
              <Button variant="outline" className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Review
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Incoming Requests */}
        <Card className="bg-white shadow-sm mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Incoming Patient Requests</span>
              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                {mockRequests.length} Requests
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockRequests.map((request) => (
                <div key={request.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-gray-900">{request.patientName}</h3>
                        <Badge className={`text-xs ${getPriorityColor(request.priority)}`}>
                          {request.priority}
                        </Badge>
                        <Badge className={`text-xs ${getStatusColor(request.status)}`}>
                          {request.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div><strong>Age:</strong> {request.age}</div>
                        <div><strong>Diagnosis:</strong> {request.diagnosis}</div>
                        <div><strong>Hospital:</strong> {request.hospital}</div>
                        <div><strong>Referring Doctor:</strong> {request.doctor}</div>
                        <div><strong>Received:</strong> {request.received}</div>
                        <div><strong>Files:</strong> {request.files} documents</div>
                        <div><strong>Notes:</strong> {request.notes}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Accept Patient
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-600 border-red-300 hover:bg-red-50">
                      <XCircle className="h-3 w-3 mr-1" />
                      Decline
                    </Button>
                    <Button size="sm" variant="outline">
                      <MessageSquare className="h-3 w-3 mr-1" />
                      Message
                    </Button>
                    <Button size="sm" variant="outline">
                      <FileText className="h-3 w-3 mr-1" />
                      View Files
                    </Button>
                    <Button size="sm" variant="outline">
                      <Eye className="h-3 w-3 mr-1" />
                      Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Messages */}
        <Card className="bg-white shadow-sm mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Recent Messages</span>
              <Badge variant="outline" className="bg-purple-50 text-purple-700">
                {mockMessages.length} Messages
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockMessages.map((message) => (
                <div key={message.id} className={`border border-gray-200 rounded-lg p-4 ${message.unread ? 'bg-blue-50 border-blue-200' : ''}`}>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900">{message.from}</span>
                      {message.unread && (
                        <Badge className="bg-blue-100 text-blue-800 text-xs">New</Badge>
                      )}
                    </div>
                    <span className="text-sm text-gray-500">{message.timestamp}</span>
                  </div>
                  <div className="mb-2">
                    <h4 className="font-medium text-gray-900">{message.subject}</h4>
                    <p className="text-sm text-gray-600 mt-1">{message.content}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      Reply
                    </Button>
                    <Button size="sm" variant="outline">
                      <FileText className="h-3 w-3 mr-1" />
                      View Files
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Demo Features Highlight */}
        <div className="mt-8 bg-green-50 border border-green-200 rounded-xl p-6">
          <h3 className="font-semibold text-green-900 mb-4 flex items-center">
            <Building2 className="h-5 w-5 mr-2" />
            Clinic Doctor Features Demonstrated
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-green-800 text-sm">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Real clinic data from NeonDB</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Incoming patient request review</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Capacity management dashboard</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Secure PICU communication</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Patient file review system</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Notes and documentation tools</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 