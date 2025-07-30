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
  const [capacity, setCapacity] = useState(50)
  const [currentPatients, setCurrentPatients] = useState(38)

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
  const demoClinic: { name: string; region: string; address: string; phone: string; email: string; specializations: string[]; capacity: number; currentPatients: number; acceptingNew: boolean; isActive: boolean; createdAt: Date; updatedAt: Date } = clinics.find((c: { name: string }) => c.name.includes('Montreal') || c.name.includes('Pediatric')) || clinics[0] || {
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

  const availableSlots = capacity - currentPatients
  const utilizationRate = Math.round((currentPatients / capacity) * 100)

  const handleAcceptPatient = (patientId: string) => {
    setSelectedModal(`accept-patient-${patientId}`)
  }

  const handleDenyPatient = (patientId: string) => {
    setSelectedModal(`deny-patient-${patientId}`)
  }

  const handleMessagePICU = (patientId: string) => {
    setSelectedModal(`message-picu-${patientId}`)
  }

  const handleViewFiles = (patientId: string) => {
    setSelectedModal(`view-files-${patientId}`)
  }

  const handleUpdateCapacity = () => {
    setSelectedModal('update-capacity')
  }

  const handleIncreaseCapacity = () => {
    setCapacity(prev => prev + 1)
  }

  const handleDecreaseCapacity = () => {
    if (capacity > currentPatients) {
      setCapacity(prev => prev - 1)
    }
  }

  const handleSchedulePatientMeeting = (patientId: string) => {
    setSelectedModal(`schedule-meeting-${patientId}`)
  }

  const handleReplyMessage = (messageId: string) => {
    setSelectedModal(`reply-message-${messageId}`)
  }

  const handleViewMessageFiles = (messageId: string) => {
    setSelectedModal(`view-message-files-${messageId}`)
  }

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
                <h1 className="text-2xl font-bold text-gray-900 bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent flex items-center space-x-3">
                  <Building2 className="h-8 w-8 text-green-600" />
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
                  <span className="text-2xl font-bold text-gray-900">{capacity}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${utilizationRate}%` }}></div>
                </div>
                <div className="text-sm text-gray-600">{currentPatients} patients currently enrolled</div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">Available Slots</span>
                  <span className="text-2xl font-bold text-green-600">{availableSlots}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: `${(availableSlots / capacity) * 100}%` }}></div>
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
              <Button variant="outline" className="flex items-center" onClick={handleIncreaseCapacity}>
                <Plus className="h-4 w-4 mr-2" />
                Increase Capacity
              </Button>
              <Button variant="outline" className="flex items-center" onClick={handleDecreaseCapacity}>
                <Minus className="h-4 w-4 mr-2" />
                Decrease Capacity
              </Button>
              <Button variant="outline" className="flex items-center" onClick={() => setSelectedModal('schedule-review')}>
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Patient Meeting
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
                    <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => handleAcceptPatient(request.id)}>
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Accept Patient
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-600 border-red-300 hover:bg-red-50" onClick={() => handleDenyPatient(request.id)}>
                      <XCircle className="h-3 w-3 mr-1" />
                      Decline
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleMessagePICU(request.id)}>
                      <MessageSquare className="h-3 w-3 mr-1" />
                      Message
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleViewFiles(request.id)}>
                      <FileText className="h-3 w-3 mr-1" />
                      View Files
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setSelectedModal(`view-patient-${request.id}`)}>
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
                    <Button size="sm" variant="outline" onClick={() => handleReplyMessage(message.id)}>
                      Reply
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleViewMessageFiles(message.id)}>
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

        {/* Modal Dialogs */}
        {mockRequests.map(request => (
          <Dialog key={request.id} open={selectedModal === `accept-patient-${request.id}`} onOpenChange={() => setSelectedModal(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Accept Patient: {request.patientName}
                </DialogTitle>
                <DialogDescription>
                  Confirm acceptance of this patient for outpatient care
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-medium text-green-800 mb-2">Patient Information</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <div><strong>Age:</strong> {request.age}</div>
                    <div><strong>Diagnosis:</strong> {request.diagnosis}</div>
                    <div><strong>Priority:</strong> {request.priority}</div>
                    <div><strong>Hospital:</strong> {request.hospital}</div>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Notes</label>
                  <textarea className="w-full mt-1 p-2 border rounded-md" rows={3} placeholder="Add notes about acceptance..." />
                </div>
                <div>
                  <label className="text-sm font-medium">Follow-up Date</label>
                  <input type="date" className="w-full mt-1 p-2 border rounded-md" />
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <Button variant="outline" onClick={() => setSelectedModal(null)}>Cancel</Button>
                <Button className="bg-green-600 hover:bg-green-700">Accept Patient</Button>
              </div>
            </DialogContent>
          </Dialog>
        ))}

        {mockRequests.map(request => (
          <Dialog key={request.id} open={selectedModal === `deny-patient-${request.id}`} onOpenChange={() => setSelectedModal(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-red-600" />
                  Deny Patient: {request.patientName}
                </DialogTitle>
                <DialogDescription>
                  Provide reason for denying this patient request
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-medium text-red-800 mb-2">Patient Information</h4>
                  <div className="text-sm text-red-700 space-y-1">
                    <div><strong>Age:</strong> {request.age}</div>
                    <div><strong>Diagnosis:</strong> {request.diagnosis}</div>
                    <div><strong>Priority:</strong> {request.priority}</div>
                    <div><strong>Hospital:</strong> {request.hospital}</div>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Reason for Denial</label>
                  <select className="w-full mt-1 p-2 border rounded-md">
                    <option>Select reason</option>
                    <option>Insufficient capacity</option>
                    <option>Specialized care required</option>
                    <option>Geographic constraints</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Additional Notes</label>
                  <textarea className="w-full mt-1 p-2 border rounded-md" rows={3} placeholder="Provide additional details..." />
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <Button variant="outline" onClick={() => setSelectedModal(null)}>Cancel</Button>
                <Button className="bg-red-600 hover:bg-red-700">Deny Patient</Button>
              </div>
            </DialogContent>
          </Dialog>
        ))}

        {mockRequests.map(request => (
          <Dialog key={request.id} open={selectedModal === `message-picu-${request.id}`} onOpenChange={() => setSelectedModal(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-blue-600" />
                  Message PICU Doctor: {request.doctor}
                </DialogTitle>
                <DialogDescription>
                  Send secure message to PICU doctor about {request.patientName}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Subject</label>
                  <input className="w-full mt-1 p-2 border rounded-md" placeholder="Enter message subject" />
                </div>
                <div>
                  <label className="text-sm font-medium">Message</label>
                  <textarea className="w-full mt-1 p-2 border rounded-md" rows={4} placeholder="Enter your message to the PICU doctor..." />
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="urgent" />
                  <label htmlFor="urgent" className="text-sm">Mark as urgent</label>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <Button variant="outline" onClick={() => setSelectedModal(null)}>Cancel</Button>
                <Button className="bg-blue-600 hover:bg-blue-700">Send Message</Button>
              </div>
            </DialogContent>
          </Dialog>
        ))}

        {mockRequests.map(request => (
          <Dialog key={request.id} open={selectedModal === `view-files-${request.id}`} onOpenChange={() => setSelectedModal(null)}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  Patient Files: {request.patientName}
                </DialogTitle>
                <DialogDescription>
                  View and download patient medical records and documentation
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium mb-2">Medical Records</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between items-center">
                        <span>Discharge Summary</span>
                        <Button size="sm" variant="outline">
                          <Download className="h-3 w-3 mr-1" />
                          Download
                        </Button>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Lab Results</span>
                        <Button size="sm" variant="outline">
                          <Download className="h-3 w-3 mr-1" />
                          Download
                        </Button>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Imaging Reports</span>
                        <Button size="sm" variant="outline">
                          <Download className="h-3 w-3 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium mb-2">Care Documentation</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between items-center">
                        <span>Care Plan</span>
                        <Button size="sm" variant="outline">
                          <Download className="h-3 w-3 mr-1" />
                          Download
                        </Button>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Medication List</span>
                        <Button size="sm" variant="outline">
                          <Download className="h-3 w-3 mr-1" />
                          Download
                        </Button>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Follow-up Notes</span>
                        <Button size="sm" variant="outline">
                          <Download className="h-3 w-3 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <Button variant="outline" onClick={() => setSelectedModal(null)}>Close</Button>
                <Button className="bg-blue-600 hover:bg-blue-700">Download All</Button>
              </div>
            </DialogContent>
          </Dialog>
        ))}

        <Dialog open={selectedModal === 'update-capacity'} onOpenChange={() => setSelectedModal(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                Update Clinic Capacity
              </DialogTitle>
              <DialogDescription>
                Modify the number of available slots and clinic status
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Total Capacity</label>
                  <input type="number" className="w-full mt-1 p-2 border rounded-md" defaultValue={demoClinic.capacity} />
                </div>
                <div>
                  <label className="text-sm font-medium">Current Patients</label>
                  <input type="number" className="w-full mt-1 p-2 border rounded-md" defaultValue={demoClinic.currentPatients} />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Accepting New Patients</label>
                <select className="w-full mt-1 p-2 border rounded-md">
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 mb-2">Current Status</h4>
                <div className="text-sm text-blue-700 space-y-1">
                  <div><strong>Available Slots:</strong> {availableSlots}</div>
                  <div><strong>Utilization Rate:</strong> {utilizationRate}%</div>
                  <div><strong>Status:</strong> {demoClinic.acceptingNew ? 'Accepting' : 'Full'}</div>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setSelectedModal(null)}>Cancel</Button>
              <Button className="bg-blue-600 hover:bg-blue-700">Update Capacity</Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={selectedModal === 'schedule-review'} onOpenChange={() => setSelectedModal(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-green-600" />
                Schedule Patient Meeting
              </DialogTitle>
              <DialogDescription>
                Schedule a meeting with a patient and their family
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Patient</label>
                  <select className="w-full mt-1 p-2 border rounded-md">
                    <option>Select patient</option>
                    {mockRequests.map(request => (
                      <option key={request.id}>{request.patientName}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Meeting Type</label>
                  <select className="w-full mt-1 p-2 border rounded-md">
                    <option>Initial consultation</option>
                    <option>Follow-up appointment</option>
                    <option>Care plan discussion</option>
                    <option>Family meeting</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Date</label>
                  <input type="date" className="w-full mt-1 p-2 border rounded-md" />
                </div>
                <div>
                  <label className="text-sm font-medium">Time</label>
                  <select className="w-full mt-1 p-2 border rounded-md">
                    <option>9:00 AM</option>
                    <option>10:00 AM</option>
                    <option>11:00 AM</option>
                    <option>2:00 PM</option>
                    <option>3:00 PM</option>
                    <option>4:00 PM</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Notes</label>
                <textarea className="w-full mt-1 p-2 border rounded-md" rows={3} placeholder="Meeting agenda and notes..." />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setSelectedModal(null)}>Cancel</Button>
              <Button className="bg-green-600 hover:bg-green-700">Schedule Meeting</Button>
            </div>
          </DialogContent>
        </Dialog>

        {mockRequests.map(request => (
          <Dialog key={request.id} open={selectedModal === `view-patient-${request.id}`} onOpenChange={() => setSelectedModal(null)}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-green-600" />
                  Patient Details: {request.patientName}
                </DialogTitle>
                <DialogDescription>
                  View comprehensive patient information and request details
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-medium text-green-800 mb-2">Patient Information</h4>
                    <div className="text-sm text-green-700 space-y-1">
                      <div><strong>Name:</strong> {request.patientName}</div>
                      <div><strong>Age:</strong> {request.age}</div>
                      <div><strong>Diagnosis:</strong> {request.diagnosis}</div>
                      <div><strong>Priority:</strong> {request.priority}</div>
                      <div><strong>Status:</strong> {request.status}</div>
                    </div>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-800 mb-2">Request Details</h4>
                    <div className="text-sm text-gray-700 space-y-1">
                      <div><strong>Hospital:</strong> {request.hospital}</div>
                      <div><strong>Doctor:</strong> {request.doctor}</div>
                      <div><strong>Received:</strong> {request.received}</div>
                      <div><strong>Files:</strong> {request.files} documents</div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Notes</h4>
                  <textarea className="w-full p-2 border rounded-md" rows={3} placeholder="Add notes about this patient..." defaultValue={request.notes} />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setSelectedModal(null)}>Close</Button>
                  <Button className="bg-green-600 hover:bg-green-700">Update Notes</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ))}

        {mockMessages.map(message => (
          <Dialog key={message.id} open={selectedModal === `reply-message-${message.id}`} onOpenChange={() => setSelectedModal(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-green-600" />
                  Reply to {message.from}
                </DialogTitle>
                <DialogDescription>
                  Send a response to the PICU doctor
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-800 mb-2">Original Message</h4>
                  <div className="text-sm text-blue-700">
                    <div><strong>Subject:</strong> {message.subject}</div>
                    <div><strong>Content:</strong> {message.content}</div>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Subject</label>
                  <input className="w-full mt-1 p-2 border rounded-md" placeholder="Enter reply subject" />
                </div>
                <div>
                  <label className="text-sm font-medium">Message</label>
                  <textarea className="w-full mt-1 p-2 border rounded-md" rows={4} placeholder="Enter your reply..." />
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="urgent" />
                  <label htmlFor="urgent" className="text-sm">Mark as urgent</label>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <Button variant="outline" onClick={() => setSelectedModal(null)}>Cancel</Button>
                <Button className="bg-green-600 hover:bg-green-700">Send Reply</Button>
              </div>
            </DialogContent>
          </Dialog>
        ))}

        {mockMessages.map(message => (
          <Dialog key={message.id} open={selectedModal === `view-message-files-${message.id}`} onOpenChange={() => setSelectedModal(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-green-600" />
                  Files from {message.from}
                </DialogTitle>
                <DialogDescription>
                  View and download files attached to this message
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <span className="text-sm">Patient Records</span>
                    <Button size="sm" variant="outline">
                      <Download className="h-3 w-3 mr-1" />
                      Download
                    </Button>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <span className="text-sm">Lab Results</span>
                    <Button size="sm" variant="outline">
                      <Download className="h-3 w-3 mr-1" />
                      Download
                    </Button>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <span className="text-sm">Care Plan</span>
                    <Button size="sm" variant="outline">
                      <Download className="h-3 w-3 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <Button variant="outline" onClick={() => setSelectedModal(null)}>Close</Button>
                <Button className="bg-green-600 hover:bg-green-700">Download All</Button>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  )
} 