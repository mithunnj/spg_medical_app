import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Users,
  MessageSquare,
  FileText,
  Calendar,
  Clock,
  CheckCircle,
  ArrowLeft,
  Eye,
  Heart,
  Bell,
  Phone,
  Mail
} from 'lucide-react'

export default function PatientGuardianDemo() {
  // Guardian name - children will have the same last name
  const guardianName = 'Maria Rodriguez'
  const guardianLastName = 'Rodriguez'

  const mockChildren = [
    {
      id: '1',
      name: `Emma ${guardianLastName}`,
      age: '8 years',
      diagnosis: 'Severe asthma exacerbation',
      status: 'PENDING',
      hospital: 'Montreal Children\'s Hospital',
      doctor: 'Dr. Matthew Donlan',
      clinic: 'Montreal Pediatric Associates',
      lastUpdate: '2024-01-16',
      nextAppointment: '2024-01-25',
      priority: 'HIGH'
    },
    {
      id: '2',
      name: `Lucas ${guardianLastName}`,
      age: '12 years',
      diagnosis: 'Type 1 diabetes management',
      status: 'APPROVED',
      hospital: 'Montreal Children\'s Hospital',
      doctor: 'Dr. Matthew Donlan',
      clinic: 'West Island Pediatrics',
      lastUpdate: '2024-01-12',
      nextAppointment: '2024-01-20',
      priority: 'MEDIUM'
    }
  ]

  const mockMessages = [
    {
      id: '1',
      from: 'Dr. Matthew Donlan',
      subject: 'Emma\'s Progress Update',
      content: 'Emma is responding well to treatment. We\'ve contacted Montreal Pediatric Associates for follow-up care.',
      timestamp: '2024-01-16 14:30',
      unread: true,
      type: 'HOSPITAL'
    },
    {
      id: '2',
      from: 'Montreal Pediatric Associates',
      subject: 'Welcome to Our Clinic',
      content: 'We\'re reviewing Emma\'s case and will contact you within 2 business days with our decision.',
      timestamp: '2024-01-15 10:15',
      unread: false,
      type: 'CLINIC'
    },
    {
      id: '3',
      from: 'Dr. Robert Wilson',
      subject: 'Lucas\'s Care Plan',
      content: 'Lucas has been accepted to our clinic. We\'ll schedule his first appointment next week.',
      timestamp: '2024-01-12 16:45',
      unread: false,
      type: 'CLINIC'
    }
  ]

  const mockAppointments = [
    {
      id: '1',
      childName: `Emma ${guardianLastName}`,
      type: 'Follow-up Consultation',
      clinic: 'Montreal Pediatric Associates',
      date: '2024-01-25',
      time: '10:00 AM',
      doctor: 'Dr. Robert Wilson',
      status: 'CONFIRMED'
    },
    {
      id: '2',
      childName: `Lucas ${guardianLastName}`,
      type: 'Initial Assessment',
      clinic: 'West Island Pediatrics',
      date: '2024-01-20',
      time: '2:30 PM',
      doctor: 'Dr. Jennifer Lee',
      status: 'CONFIRMED'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800'
      case 'APPROVED': return 'bg-green-100 text-green-800'
      case 'DENIED': return 'bg-red-100 text-red-800'
      case 'MATCHED': return 'bg-blue-100 text-blue-800'
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

  const getMessageTypeColor = (type: string) => {
    switch (type) {
      case 'HOSPITAL': return 'bg-blue-100 text-blue-800'
      case 'CLINIC': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const handleContactCareTeam = () => {
    alert('Opening secure messaging interface to contact your care team...\n\nThis allows direct communication with PICU doctors and clinic staff.')
  }

  const handleViewDocuments = () => {
    alert('Opening document viewer...\n\nAvailable documents:\n- Medical records\n- Lab results\n- Discharge summaries\n- Care plans')
  }

  const handleScheduleAppointment = () => {
    alert('Opening appointment scheduler...\n\nYou can schedule follow-up appointments with clinics and request consultations.')
  }

  const handleSetNotifications = () => {
    alert('Opening notification settings...\n\nConfigure alerts for:\n- Status updates\n- Appointment reminders\n- New messages\n- Document uploads')
  }

  const handleMessagePICU = (childName: string) => {
    alert(`Opening secure messaging with PICU team for ${childName}...\n\nThis allows direct communication with Dr. Matthew Donlan and the PICU care team.`)
  }

  const handleMessageClinic = (childName: string) => {
    alert(`Opening secure messaging with clinic for ${childName}...\n\nThis allows direct communication with the outpatient clinic care team.`)
  }

  const handleViewFiles = (childName: string) => {
    alert(`Opening file viewer for ${childName}...\n\nView and download medical records, lab results, and care documentation.`)
  }

  const handleRescheduleAppointment = (appointment: any) => {
    alert(`Opening reschedule interface for ${appointment.childName}'s appointment...\n\nYou can request a different date/time for the ${appointment.type} appointment.`)
  }

  const handleCallClinic = (appointment: any) => {
    alert(`Initiating call to ${appointment.clinic}...\n\nThis would connect you directly to the clinic for appointment-related questions.`)
  }

  const handleSendMessage = (appointment: any) => {
    alert(`Opening message interface for ${appointment.clinic}...\n\nSend a secure message to the clinic about ${appointment.childName}'s appointment.`)
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
                <h1 className="text-2xl font-bold text-gray-900 flex items-center space-x-3">
                  <Users className="h-8 w-8 text-purple-600" />
                  <span>Family Portal</span>
                </h1>
                <p className="text-gray-600">Track your child&apos;s care transition progress</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300">
                <Eye className="h-4 w-4 mr-2" />
                Demo Mode
              </Badge>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300">
                {guardianName}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Cases</p>
                  <p className="text-2xl font-bold text-gray-900">2</p>
                </div>
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed Transitions</p>
                  <p className="text-2xl font-bold text-gray-900">8</p>
                </div>
                <div className="bg-green-100 p-3 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Wait Time</p>
                  <p className="text-2xl font-bold text-gray-900">3.1 days</p>
                </div>
                <div className="bg-yellow-100 p-3 rounded-lg">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Satisfaction Rate</p>
                  <p className="text-2xl font-bold text-gray-900">94%</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Heart className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Button className="bg-purple-600 hover:bg-purple-700" onClick={handleContactCareTeam}>
            <MessageSquare className="h-4 w-4 mr-2" />
            Contact Care Team
          </Button>
          <Button variant="outline" onClick={handleViewDocuments}>
            <FileText className="h-4 w-4 mr-2" />
            View Documents
          </Button>
          <Button variant="outline" onClick={handleScheduleAppointment}>
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Appointment
          </Button>
          <Button variant="outline" onClick={handleSetNotifications}>
            <Bell className="h-4 w-4 mr-2" />
            Set Notifications
          </Button>
        </div>

        {/* Children Status */}
        <Card className="bg-white shadow-sm mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Your Children&apos;s Status</span>
              <Badge variant="outline" className="bg-purple-50 text-purple-700">
                {mockChildren.length} Active Cases
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {mockChildren.map((child) => (
                <div key={child.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">{child.name}</h3>
                        <Badge className={`text-xs ${getPriorityColor(child.priority)}`}>
                          {child.priority}
                        </Badge>
                        <Badge className={`text-xs ${getStatusColor(child.status)}`}>
                          {child.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                        <div>
                          <div><strong>Age:</strong> {child.age}</div>
                          <div><strong>Diagnosis:</strong> {child.diagnosis}</div>
                          <div><strong>Hospital:</strong> {child.hospital}</div>
                          <div><strong>PICU Doctor:</strong> {child.doctor}</div>
                        </div>
                        <div>
                          <div><strong>Clinic:</strong> {child.clinic}</div>
                          <div><strong>Last Update:</strong> {child.lastUpdate}</div>
                          <div><strong>Next Appointment:</strong> {child.nextAppointment}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" onClick={() => handleMessagePICU(child.name)}>
                      <MessageSquare className="h-3 w-3 mr-1" />
                      Message PICU
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleMessageClinic(child.name)}>
                      <MessageSquare className="h-3 w-3 mr-1" />
                      Message Clinic
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleViewFiles(child.name)}>
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
              <Badge variant="outline" className="bg-blue-50 text-blue-700">
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
                      <Badge className={`text-xs ${getMessageTypeColor(message.type)}`}>
                        {message.type}
                      </Badge>
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

        {/* Upcoming Appointments */}
        <Card className="bg-white shadow-sm mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Upcoming Appointments</span>
              <Badge variant="outline" className="bg-green-50 text-green-700">
                {mockAppointments.length} Appointments
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockAppointments.map((appointment) => (
                <div key={appointment.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-gray-900">{appointment.childName}</h3>
                        <Badge className="bg-green-100 text-green-800 text-xs">
                          {appointment.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div><strong>Type:</strong> {appointment.type}</div>
                        <div><strong>Clinic:</strong> {appointment.clinic}</div>
                        <div><strong>Doctor:</strong> {appointment.doctor}</div>
                        <div><strong>Date:</strong> {appointment.date} at {appointment.time}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" onClick={() => handleRescheduleAppointment(appointment)}>
                      <Calendar className="h-3 w-3 mr-1" />
                      Reschedule
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleCallClinic(appointment)}>
                      <Phone className="h-3 w-3 mr-1" />
                      Call Clinic
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleSendMessage(appointment)}>
                      <Mail className="h-3 w-3 mr-1" />
                      Send Message
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Demo Features Highlight */}
        <div className="mt-8 bg-purple-50 border border-purple-200 rounded-xl p-6">
          <h3 className="font-semibold text-purple-900 mb-4 flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Family Portal Features Demonstrated
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-purple-800 text-sm">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Related family names (same last name)</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Direct messaging with care teams</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Appointment scheduling</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Document access and sharing</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Progress notifications</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Functional action buttons</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 