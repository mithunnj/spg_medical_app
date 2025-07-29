"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import {
  User, Calendar, MapPin, Phone, MessageSquare, FileText, 
  CheckCircle, AlertTriangle, Clock, Heart, Building2, 
  Stethoscope, CalendarDays, PhoneCall, ArrowLeft
} from 'lucide-react'

// 🚧 DEVELOPMENT MODE - Set to false in production
const BYPASS_AUTH_FOR_DEV = true

interface Hospital {
  name: string
  doctor: string
  phone: string
}

interface Clinic {
  name: string
  doctor: string
  phone: string
  status: string
  reason?: string
}

interface Appointment {
  id: string
  date: string
  time: string
  type: string
  location: string
  doctor: string
}

interface Message {
  id: string
  from: string
  to: string
  date: string
  message: string
  sender: string
}

interface Patient {
  name: string
  age: number
  healthCard: string
  diagnosis: string
  status: string
  hospital: Hospital
  clinic: Clinic
  requestedDate: string
  followUpAppointments: Appointment[]
  messages: Message[]
}

// Mock patient data for different scenarios
const patientData: { [key: string]: Patient } = {
  'patient-1': {
    name: 'Emma Johnson',
    age: 8,
    healthCard: 'QC123456789',
    diagnosis: 'Post-surgical recovery from appendectomy',
    status: 'PENDING',
    hospital: {
      name: 'Montreal Children\'s Hospital',
      doctor: 'Dr. Matthew Donlan',
      phone: '(514) 412-4400'
    },
    clinic: {
      name: 'Montreal Children\'s Clinic',
      doctor: 'Dr. Sarah Martinez',
      phone: '(514) 555-0101',
      status: 'PENDING'
    },
    requestedDate: '2024-01-20',
    followUpAppointments: [
      {
        id: 'appt-1',
        date: '2024-01-25',
        time: '10:00 AM',
        type: 'Post-operative check-up',
        location: 'Montreal Children\'s Clinic',
        doctor: 'Dr. Sarah Martinez'
      }
    ],
    messages: [
      {
        id: 'msg-1',
        from: 'PICU',
        to: 'Guardian',
        date: '2024-01-20',
        message: 'Your child has been referred to Montreal Children\'s Clinic for post-operative care. We will keep you updated on the status.',
        sender: 'Dr. Matthew Donlan'
      }
    ]
  },
  'patient-2': {
    name: 'Lucas Johnson',
    age: 12,
    healthCard: 'QC987654321',
    diagnosis: 'Asthma management and respiratory monitoring',
    status: 'APPROVED',
    hospital: {
      name: 'Montreal Children\'s Hospital',
      doctor: 'Dr. Matthew Donlan',
      phone: '(514) 412-4401'
    },
    clinic: {
      name: 'Quebec Family Health Center',
      doctor: 'Dr. Jean-Pierre Dubois',
      phone: '(514) 555-0202',
      status: 'APPROVED'
    },
    requestedDate: '2024-01-18',
    followUpAppointments: [
      {
        id: 'appt-2',
        date: '2024-01-22',
        time: '2:30 PM',
        type: 'Asthma follow-up',
        location: 'Quebec Family Health Center',
        doctor: 'Dr. Jean-Pierre Dubois'
      },
      {
        id: 'appt-3',
        date: '2024-01-29',
        time: '11:00 AM',
        type: 'Respiratory function test',
        location: 'Quebec Family Health Center',
        doctor: 'Dr. Jean-Pierre Dubois'
      }
    ],
    messages: [
      {
        id: 'msg-2',
        from: 'PICU',
        to: 'Guardian',
        date: '2024-01-18',
        message: 'Lucas has been referred to Quebec Family Health Center for asthma management.',
        sender: 'Dr. Matthew Donlan'
      },
      {
        id: 'msg-3',
        from: 'Clinic',
        to: 'Guardian',
        date: '2024-01-19',
        message: 'Great news! We have accepted Lucas for care. Please call us to schedule your first appointment.',
        sender: 'Dr. Jean-Pierre Dubois'
      }
    ]
  },
  'patient-3': {
    name: 'Sophia Johnson',
    age: 6,
    healthCard: 'QC456789123',
    diagnosis: 'Diabetes management and education',
    status: 'WAITLISTED',
    hospital: {
      name: 'Montreal Children\'s Hospital',
      doctor: 'Dr. Matthew Donlan',
      phone: '(514) 412-4402'
    },
    clinic: {
      name: 'Laval Pediatric Associates',
      doctor: 'Dr. Marie-Claude Tremblay',
      phone: '(514) 555-0303',
      status: 'WAITLISTED',
      reason: 'Currently at full capacity for diabetes management cases. We will contact you when a spot becomes available.'
    },
    requestedDate: '2024-01-17',
    followUpAppointments: [],
    messages: [
      {
        id: 'msg-4',
        from: 'PICU',
        to: 'Guardian',
        date: '2024-01-17',
        message: 'Sophia has been referred to Laval Pediatric Associates for diabetes management.',
        sender: 'Dr. Matthew Donlan'
      },
      {
        id: 'msg-5',
        from: 'Clinic',
        to: 'Guardian',
        date: '2024-01-19',
        message: 'We have received Sophia\'s referral. Unfortunately, we are currently at full capacity for diabetes management cases. We will contact you when a spot becomes available.',
        sender: 'Dr. Marie-Claude Tremblay'
      }
    ]
  }
}

export default function GuardianDashboard() {
  const [selectedPatient, setSelectedPatient] = useState('patient-1')
  const [currentPatient, setCurrentPatient] = useState(patientData['patient-1'])
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false)
  const [messageText, setMessageText] = useState('')
  const [messageRecipient, setMessageRecipient] = useState<'PICU' | 'CLINIC'>('PICU')
  const [notifications, setNotifications] = useState<string[]>([])

  // Update patient data when selection changes
  useEffect(() => {
    setCurrentPatient(patientData[selectedPatient as keyof typeof patientData])
  }, [selectedPatient])

  // Mock session for development
  const session = {
    user: {
      name: 'Maria Johnson',
      role: 'PARENT',
      email: 'maria.johnson@email.com',
      patientId: selectedPatient
    }
  }

  const showNotification = (message: string) => {
    setNotifications(prev => [...prev, message])
    setTimeout(() => {
      setNotifications(prev => prev.slice(1))
    }, 5000)
  }

  const handleSendMessage = () => {
    if (!messageText.trim()) return
    
    // Mock message sending logic
    setIsMessageDialogOpen(false)
    setMessageText('')
    showNotification(`Message sent to ${messageRecipient} successfully`)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'APPROVED': return 'bg-green-100 text-green-800 border-green-200'
      case 'WAITLISTED': return 'bg-orange-100 text-orange-800 border-orange-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PENDING': return <Clock className="h-4 w-4" />
      case 'APPROVED': return <CheckCircle className="h-4 w-4" />
      case 'DENIED': return <AlertTriangle className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-6 space-y-4 sm:space-y-0">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <Link href="/dev">
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Dev Home
                  </Button>
                </Link>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                  Patient Guardian Dashboard
                </h1>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <p className="text-sm lg:text-base text-gray-600">
                  Welcome, {session.user.name}
                </p>
                {BYPASS_AUTH_FOR_DEV && (
                  <Badge variant="outline" className="w-fit text-xs">
                    Development Mode
                  </Badge>
                )}
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Heart className="h-4 w-4" />
                <span className="font-medium">Patient Guardian</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <User className="h-4 w-4" />
                <span>Parent</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {/* Patient Selection */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Select Patient</CardTitle>
            <p className="text-sm text-gray-600">
              Choose a patient to track their clinic referral status and manage communications
            </p>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <select 
                value={selectedPatient} 
                onChange={(e) => setSelectedPatient(e.target.value)}
                className="w-full sm:w-80 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="patient-1">Emma Johnson (8 years) - Pending</option>
                <option value="patient-2">Lucas Johnson (12 years) - Approved</option>
                <option value="patient-3">Sophia Johnson (6 years) - Waitlisted</option>
              </select>
              <Badge className={`border ${getStatusColor(currentPatient.status)}`}>
                {getStatusIcon(currentPatient.status)}
                <span className="ml-1">{currentPatient.status}</span>
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
          <Card>
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Patient Status</p>
                  <p className="text-2xl lg:text-3xl font-bold text-gray-900">{currentPatient.status}</p>
                </div>
                <div className="p-2 bg-blue-100 rounded-lg">
                  <User className="h-5 w-5 lg:h-6 lg:w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Follow-up Appointments</p>
                  <p className="text-2xl lg:text-3xl font-bold text-green-600">{currentPatient.followUpAppointments.length}</p>
                </div>
                <div className="p-2 bg-green-100 rounded-lg">
                  <CalendarDays className="h-5 w-5 lg:h-6 lg:w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Messages</p>
                  <p className="text-2xl lg:text-3xl font-bold text-purple-600">{currentPatient.messages.length}</p>
                </div>
                <div className="p-2 bg-purple-100 rounded-lg">
                  <MessageSquare className="h-5 w-5 lg:h-6 lg:w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Days Since Request</p>
                  <p className="text-2xl lg:text-3xl font-bold text-orange-600">
                    {Math.floor((Date.now() - new Date(currentPatient.requestedDate).getTime()) / (1000 * 60 * 60 * 24))}
                  </p>
                </div>
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Clock className="h-5 w-5 lg:h-6 lg:w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:grid-cols-3">
            <TabsTrigger value="overview" className="text-sm lg:text-base">
              Overview
            </TabsTrigger>
            <TabsTrigger value="appointments" className="text-sm lg:text-base">
              Appointments
            </TabsTrigger>
            <TabsTrigger value="messages" className="text-sm lg:text-base">
              Messages
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Patient Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg lg:text-xl">Patient Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-500" />
                      <span className="font-medium">{currentPatient.name}</span>
                      <Badge variant="outline">{currentPatient.age} years old</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Health Card: {currentPatient.healthCard}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Stethoscope className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{currentPatient.diagnosis}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Referral Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg lg:text-xl">Referral Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Status:</span>
                      <Badge className={`border ${getStatusColor(currentPatient.status)}`}>
                        {getStatusIcon(currentPatient.status)}
                        <span className="ml-1">{currentPatient.status}</span>
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{currentPatient.clinic.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{currentPatient.clinic.doctor}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{currentPatient.clinic.phone}</span>
                    </div>
                    {currentPatient.clinic.status === 'DENIED' && currentPatient.clinic.reason && (
                      <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm text-red-800">
                          <strong>Reason for denial:</strong> {currentPatient.clinic.reason}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg lg:text-xl">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-3">
                  {currentPatient.status === 'PENDING' && (
                    <>
                      <Button 
                        onClick={() => {
                          setMessageRecipient('PICU')
                          setIsMessageDialogOpen(true)
                        }}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Message PICU Doctor
                      </Button>
                      <Button 
                        onClick={() => {
                          setMessageRecipient('CLINIC')
                          setIsMessageDialogOpen(true)
                        }}
                        variant="outline"
                      >
                        <PhoneCall className="h-4 w-4 mr-2" />
                        Contact Clinic
                      </Button>
                    </>
                  )}
                  {currentPatient.status === 'APPROVED' && (
                    <Button 
                      onClick={() => {
                        setMessageRecipient('CLINIC')
                        setIsMessageDialogOpen(true)
                      }}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Message Clinic
                    </Button>
                  )}
                  {currentPatient.status === 'WAITLISTED' && (
                    <Button 
                      onClick={() => {
                        setMessageRecipient('PICU')
                        setIsMessageDialogOpen(true)
                      }}
                      className="bg-orange-600 hover:bg-orange-700"
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Contact PICU for Alternative
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appointments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg lg:text-xl">Follow-up Appointments</CardTitle>
              </CardHeader>
              <CardContent>
                {currentPatient.followUpAppointments.length === 0 ? (
                  <div className="text-center py-8">
                    <CalendarDays className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">No Appointments</h3>
                    <p className="text-gray-600">No follow-up appointments have been scheduled yet.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {currentPatient.followUpAppointments.map((appointment) => (
                      <Card key={appointment.id} className="border-l-4 border-l-blue-500">
                        <CardContent className="p-4">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                            <div className="space-y-1">
                              <h4 className="font-medium text-gray-900">{appointment.type}</h4>
                              <div className="flex items-center gap-4 text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  <span>{appointment.date} at {appointment.time}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-4 w-4" />
                                  <span>{appointment.location}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <User className="h-4 w-4" />
                                  <span>{appointment.doctor}</span>
                                </div>
                              </div>
                            </div>
                            <Button size="sm" variant="outline">
                              <Phone className="h-4 w-4 mr-2" />
                              Call Clinic
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg lg:text-xl">Message History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentPatient.messages.map((message) => (
                    <Card key={message.id} className="border-l-4 border-l-gray-500">
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                {message.from}
                              </Badge>
                              <span className="text-sm text-gray-600">{message.sender}</span>
                            </div>
                            <span className="text-xs text-gray-500">{message.date}</span>
                          </div>
                          <p className="text-sm text-gray-700">{message.message}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Message Dialog */}
      <Dialog open={isMessageDialogOpen} onOpenChange={setIsMessageDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Send Message to {messageRecipient}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder={`Type your message to ${messageRecipient}...`}
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                rows={4}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsMessageDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSendMessage} disabled={!messageText.trim()}>
                Send Message
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Notifications */}
      {notifications.length > 0 && (
        <div className="fixed bottom-4 right-4 space-y-2 z-50">
          {notifications.map((notification, index) => (
            <div key={index} className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm shadow-lg">
              {notification}
            </div>
          ))}
        </div>
      )}
    </div>
  )
} 