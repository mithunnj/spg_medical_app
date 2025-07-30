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
  Mail,
  Upload,
  Send,
  Download
} from 'lucide-react'
import { useState } from 'react'

export default function PatientGuardianDemo() {
  // Guardian name - children will have the same last name
  const guardianName = 'Maria Rodriguez'
  const guardianLastName = 'Rodriguez'
  const [selectedModal, setSelectedModal] = useState<string | null>(null)

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
    setSelectedModal('contact-care-team')
  }

  const handleViewDocuments = () => {
    setSelectedModal('view-documents')
  }

  const handleScheduleAppointment = () => {
    setSelectedModal('schedule-appointment')
  }

  const handleSetNotifications = () => {
    setSelectedModal('set-notifications')
  }

  const handleMessagePICU = (childName: string) => {
    setSelectedModal(`message-picu-${childName}`)
  }

  const handleMessageClinic = (childName: string) => {
    setSelectedModal(`message-clinic-${childName}`)
  }

  const handleViewFiles = (childName: string) => {
    setSelectedModal(`view-files-${childName}`)
  }

  const handleRescheduleAppointment = (appointment: any) => {
    setSelectedModal(`reschedule-appointment-${appointment.childName}`)
  }

  const handleCallClinic = (appointment: any) => {
    setSelectedModal(`call-clinic-${appointment.clinic}`)
  }

  const handleSendMessage = (appointment: any) => {
    setSelectedModal(`send-message-${appointment.clinic}`)
  }

  const handleViewChildDetails = (childId: string) => {
    setSelectedModal(`view-child-${childId}`)
  }

  const handleViewMessageDetails = (messageId: string) => {
    setSelectedModal(`view-message-${messageId}`)
  }

  const handleViewAppointmentDetails = (appointmentId: string) => {
    setSelectedModal(`view-appointment-${appointmentId}`)
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
                <h1 className="text-2xl font-bold text-gray-900 bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent flex items-center space-x-3">
                  <Users className="h-8 w-8 text-purple-600" />
                  <span>Patient Guardian Portal</span>
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
                                              <Button size="sm" variant="outline" onClick={() => handleViewChildDetails(child.id)}>
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
                    <Button size="sm" variant="outline" onClick={() => setSelectedModal(`reply-message-${message.id}`)}>
                      Reply
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleViewMessageDetails(message.id)}>
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

        {/* Modal Dialogs */}
        <Dialog open={selectedModal === 'contact-care-team'} onOpenChange={() => setSelectedModal(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-purple-600" />
                Contact Care Team
              </DialogTitle>
              <DialogDescription>
                Send secure message to your care team about your child's care
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Recipient</label>
                <select className="w-full mt-1 p-2 border rounded-md">
                  <option>Select recipient</option>
                  <option>PICU Team - Dr. Matthew Donlan</option>
                  <option>Clinic Team - Montreal Pediatric Associates</option>
                  <option>General Care Team</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Subject</label>
                <input className="w-full mt-1 p-2 border rounded-md" placeholder="Enter message subject" />
              </div>
              <div>
                <label className="text-sm font-medium">Message</label>
                <textarea className="w-full mt-1 p-2 border rounded-md" rows={4} placeholder="Enter your message to the care team..." />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="urgent" />
                <label htmlFor="urgent" className="text-sm">Mark as urgent</label>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setSelectedModal(null)}>Cancel</Button>
              <Button className="bg-purple-600 hover:bg-purple-700">Send Message</Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={selectedModal === 'view-documents'} onOpenChange={() => setSelectedModal(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-purple-600" />
                View Documents
              </DialogTitle>
              <DialogDescription>
                Access and download your child's medical records and documentation
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
                  <h4 className="font-medium mb-2">Care Plans</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span>Follow-up Care Plan</span>
                      <Button size="sm" variant="outline">
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Medication Instructions</span>
                      <Button size="sm" variant="outline">
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Appointment Schedule</span>
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
              <Button className="bg-purple-600 hover:bg-purple-700">Download All</Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={selectedModal === 'schedule-appointment'} onOpenChange={() => setSelectedModal(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-purple-600" />
                Schedule Appointment
              </DialogTitle>
              <DialogDescription>
                Schedule follow-up appointments and consultations
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Child</label>
                  <select className="w-full mt-1 p-2 border rounded-md">
                    <option>Select child</option>
                    {mockChildren.map(child => (
                      <option key={child.id}>{child.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Appointment Type</label>
                  <select className="w-full mt-1 p-2 border rounded-md">
                    <option>Follow-up consultation</option>
                    <option>Lab work</option>
                    <option>Specialist referral</option>
                    <option>General check-up</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Preferred Date</label>
                  <input type="date" className="w-full mt-1 p-2 border rounded-md" />
                </div>
                <div>
                  <label className="text-sm font-medium">Preferred Time</label>
                  <select className="w-full mt-1 p-2 border rounded-md">
                    <option>Morning (9 AM - 12 PM)</option>
                    <option>Afternoon (1 PM - 4 PM)</option>
                    <option>Evening (4 PM - 6 PM)</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Notes</label>
                <textarea className="w-full mt-1 p-2 border rounded-md" rows={3} placeholder="Any special requirements or notes..." />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setSelectedModal(null)}>Cancel</Button>
              <Button className="bg-purple-600 hover:bg-purple-700">Schedule Appointment</Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={selectedModal === 'set-notifications'} onOpenChange={() => setSelectedModal(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-purple-600" />
                Notification Settings
              </DialogTitle>
              <DialogDescription>
                Configure how you receive updates about your child's care
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">Status Updates</label>
                    <p className="text-xs text-gray-600">Get notified when care status changes</p>
                  </div>
                  <input type="checkbox" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">Appointment Reminders</label>
                    <p className="text-xs text-gray-600">Receive reminders before appointments</p>
                  </div>
                  <input type="checkbox" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">New Messages</label>
                    <p className="text-xs text-gray-600">Notify when care team sends messages</p>
                  </div>
                  <input type="checkbox" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">Document Uploads</label>
                    <p className="text-xs text-gray-600">Alert when new documents are available</p>
                  </div>
                  <input type="checkbox" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Notification Method</label>
                <select className="w-full mt-1 p-2 border rounded-md">
                  <option>Email</option>
                  <option>SMS</option>
                  <option>Both</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setSelectedModal(null)}>Cancel</Button>
              <Button className="bg-purple-600 hover:bg-purple-700">Save Settings</Button>
            </div>
          </DialogContent>
        </Dialog>

        {mockChildren.map(child => (
          <Dialog key={child.id} open={selectedModal === `message-picu-${child.name}`} onOpenChange={() => setSelectedModal(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-purple-600" />
                  Message PICU Team for {child.name}
                </DialogTitle>
                <DialogDescription>
                  Send secure message to Dr. Matthew Donlan and the PICU care team
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Subject</label>
                  <input className="w-full mt-1 p-2 border rounded-md" placeholder="Enter message subject" />
                </div>
                <div>
                  <label className="text-sm font-medium">Message</label>
                  <textarea className="w-full mt-1 p-2 border rounded-md" rows={4} placeholder="Enter your message to the PICU team..." />
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="urgent" />
                  <label htmlFor="urgent" className="text-sm">Mark as urgent</label>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <Button variant="outline" onClick={() => setSelectedModal(null)}>Cancel</Button>
                <Button className="bg-purple-600 hover:bg-purple-700">Send Message</Button>
              </div>
            </DialogContent>
          </Dialog>
        ))}

        {mockChildren.map(child => (
          <Dialog key={child.id} open={selectedModal === `message-clinic-${child.name}`} onOpenChange={() => setSelectedModal(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-purple-600" />
                  Message Clinic for {child.name}
                </DialogTitle>
                <DialogDescription>
                  Send secure message to the outpatient clinic care team
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Subject</label>
                  <input className="w-full mt-1 p-2 border rounded-md" placeholder="Enter message subject" />
                </div>
                <div>
                  <label className="text-sm font-medium">Message</label>
                  <textarea className="w-full mt-1 p-2 border rounded-md" rows={4} placeholder="Enter your message to the clinic..." />
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="urgent" />
                  <label htmlFor="urgent" className="text-sm">Mark as urgent</label>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <Button variant="outline" onClick={() => setSelectedModal(null)}>Cancel</Button>
                <Button className="bg-purple-600 hover:bg-purple-700">Send Message</Button>
              </div>
            </DialogContent>
          </Dialog>
        ))}

        {mockChildren.map(child => (
          <Dialog key={child.id} open={selectedModal === `view-files-${child.name}`} onOpenChange={() => setSelectedModal(null)}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-purple-600" />
                  Files for {child.name}
                </DialogTitle>
                <DialogDescription>
                  View and download medical records and care documentation
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
                        <span>Care Plan</span>
                        <Button size="sm" variant="outline">
                          <Download className="h-3 w-3 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium mb-2">Appointments</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between items-center">
                        <span>Follow-up Schedule</span>
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
                        <span>Care Instructions</span>
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
                <Button className="bg-purple-600 hover:bg-purple-700">Download All</Button>
              </div>
            </DialogContent>
          </Dialog>
        ))}

        {mockChildren.map(child => (
          <Dialog key={child.id} open={selectedModal === `view-child-${child.id}`} onOpenChange={() => setSelectedModal(null)}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-purple-600" />
                  Child Details: {child.name}
                </DialogTitle>
                <DialogDescription>
                  View comprehensive information about your child's care
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <h4 className="font-medium text-purple-800 mb-2">Child Information</h4>
                    <div className="text-sm text-purple-700 space-y-1">
                      <div><strong>Name:</strong> {child.name}</div>
                      <div><strong>Age:</strong> {child.age}</div>
                      <div><strong>Diagnosis:</strong> {child.diagnosis}</div>
                      <div><strong>Status:</strong> {child.status}</div>
                    </div>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-800 mb-2">Care Details</h4>
                    <div className="text-sm text-gray-700 space-y-1">
                      <div><strong>Hospital:</strong> {child.hospital}</div>
                      <div><strong>Doctor:</strong> {child.doctor}</div>
                      <div><strong>Clinic:</strong> {child.clinic}</div>
                      <div><strong>Last Update:</strong> {child.lastUpdate}</div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Care Notes</h4>
                  <textarea className="w-full p-2 border rounded-md" rows={3} placeholder="Add notes about your child's care..." />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setSelectedModal(null)}>Close</Button>
                  <Button className="bg-purple-600 hover:bg-purple-700">Save Notes</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ))}

        {mockMessages.map(message => (
          <Dialog key={message.id} open={selectedModal === `view-message-${message.id}`} onOpenChange={() => setSelectedModal(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-purple-600" />
                  Message Details
                </DialogTitle>
                <DialogDescription>
                  View complete message information and attached files
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-800 mb-2">Message Information</h4>
                  <div className="text-sm text-blue-700 space-y-1">
                    <div><strong>From:</strong> {message.from}</div>
                    <div><strong>Subject:</strong> {message.subject}</div>
                    <div><strong>Date:</strong> {message.timestamp}</div>
                    <div><strong>Type:</strong> {message.type}</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Message Content</h4>
                  <div className="p-3 bg-gray-50 border rounded-md">
                    <p className="text-sm text-gray-700">{message.content}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Attached Files</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 border rounded">
                      <span className="text-sm">Care Plan</span>
                      <Button size="sm" variant="outline">
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                    </div>
                    <div className="flex justify-between items-center p-2 border rounded">
                      <span className="text-sm">Medical Records</span>
                      <Button size="sm" variant="outline">
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <Button variant="outline" onClick={() => setSelectedModal(null)}>Close</Button>
                <Button className="bg-purple-600 hover:bg-purple-700">Download All</Button>
              </div>
            </DialogContent>
          </Dialog>
        ))}

        {mockMessages.map(message => (
          <Dialog key={message.id} open={selectedModal === `reply-message-${message.id}`} onOpenChange={() => setSelectedModal(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-purple-600" />
                  Reply to {message.from}
                </DialogTitle>
                <DialogDescription>
                  Send a response to the care team
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
                <Button className="bg-purple-600 hover:bg-purple-700">Send Reply</Button>
              </div>
            </DialogContent>
          </Dialog>
        ))}

        {mockAppointments.map(appointment => (
          <Dialog key={appointment.id} open={selectedModal === `view-appointment-${appointment.id}`} onOpenChange={() => setSelectedModal(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-purple-600" />
                  Appointment Details: {appointment.childName}
                </DialogTitle>
                <DialogDescription>
                  View complete appointment information and instructions
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <h4 className="font-medium text-purple-800 mb-2">Appointment Info</h4>
                    <div className="text-sm text-purple-700 space-y-1">
                      <div><strong>Child:</strong> {appointment.childName}</div>
                      <div><strong>Type:</strong> {appointment.type}</div>
                      <div><strong>Date:</strong> {appointment.date}</div>
                      <div><strong>Time:</strong> {appointment.time}</div>
                    </div>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-800 mb-2">Clinic Details</h4>
                    <div className="text-sm text-gray-700 space-y-1">
                      <div><strong>Clinic:</strong> {appointment.clinic}</div>
                      <div><strong>Doctor:</strong> {appointment.doctor}</div>
                      <div><strong>Status:</strong> {appointment.status}</div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Instructions</h4>
                  <div className="p-3 bg-gray-50 border rounded-md">
                    <p className="text-sm text-gray-700">Please arrive 15 minutes before your appointment. Bring any recent medical records or test results. If you need to reschedule, please contact the clinic at least 24 hours in advance.</p>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setSelectedModal(null)}>Close</Button>
                  <Button className="bg-purple-600 hover:bg-purple-700">Add to Calendar</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  )
} 