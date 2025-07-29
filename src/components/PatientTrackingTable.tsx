"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { 
  MessageSquare, 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Upload,
  Send,
  Calendar,
  Check
} from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface PatientRecord {
  id: string
  firstName: string
  lastName: string
  initials: string // For privacy
  diagnosis: string
  admissionDate: string
  clinicsContacted: ClinicContact[]
  status: 'PENDING' | 'APPROVED' | 'DENIED' | 'MATCHED'
  priority: 'HIGH' | 'NORMAL' | 'LOW'
  lastActivity: string
}

interface ClinicContact {
  id: string
  clinicName: string
  contactedDate: string
  status: 'PENDING' | 'RESPONDED' | 'FOLLOW_UP_SENT' | 'ACCEPTED' | 'DENIED'
  response?: string
  lastFollowUp?: string
  daysSinceContact: number
}

// Mock data - will be replaced with API calls
const initialPatients: PatientRecord[] = [
  {
    id: '1',
    firstName: 'Emma',
    lastName: 'Johnson',
    initials: 'E.J.',
    diagnosis: 'Chronic respiratory condition requiring specialized pediatric follow-up',
    admissionDate: '2024-01-15',
    status: 'PENDING',
    priority: 'HIGH',
    lastActivity: '2024-01-20',
    clinicsContacted: [
      {
        id: '1',
        clinicName: 'Montreal Children\'s Clinic',
        contactedDate: '2024-01-18',
        status: 'PENDING',
        daysSinceContact: 2
      },
      {
        id: '2',
        clinicName: 'Quebec Family Health Center',
        contactedDate: '2024-01-17',
        status: 'FOLLOW_UP_SENT',
        lastFollowUp: '2024-01-19',
        daysSinceContact: 3
      }
    ]
  },
  {
    id: '2',
    firstName: 'Lucas',
    lastName: 'Chen',
    initials: 'L.C.',
    diagnosis: 'Post-surgical care and monitoring',
    admissionDate: '2024-01-10',
    status: 'MATCHED',
    priority: 'NORMAL',
    lastActivity: '2024-01-19',
    clinicsContacted: [
      {
        id: '3',
        clinicName: 'Laval Pediatric Associates',
        contactedDate: '2024-01-16',
        status: 'ACCEPTED',
        response: 'We can accommodate this patient. Please schedule initial consultation.',
        daysSinceContact: 4
      }
    ]
  },
  {
    id: '3',
    firstName: 'Sophia',
    lastName: 'Martinez',
    initials: 'S.M.',
    diagnosis: 'Cardiac monitoring and follow-up care',
    admissionDate: '2024-01-08',
    status: 'PENDING',
    priority: 'HIGH',
    lastActivity: '2024-01-18',
    clinicsContacted: [
      {
        id: '4',
        clinicName: 'Quebec Family Health Center',
        contactedDate: '2024-01-14',
        status: 'DENIED',
        response: 'Currently at capacity for cardiac patients.',
        daysSinceContact: 6
      },
      {
        id: '5',
        clinicName: 'Montreal Children\'s Clinic',
        contactedDate: '2024-01-16',
        status: 'RESPONDED',
        response: 'Reviewing case, will respond within 48 hours.',
        daysSinceContact: 4
      }
    ]
  }
]

export default function PatientTrackingTable() {
  const [patients, setPatients] = useState<PatientRecord[]>(initialPatients)
  const [selectedPatient, setSelectedPatient] = useState<PatientRecord | null>(null)
  const [messageText, setMessageText] = useState('')
  const [noteText, setNoteText] = useState('')
  const [notifications, setNotifications] = useState<string[]>([])
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false)
  const [isNoteDialogOpen, setIsNoteDialogOpen] = useState(false)

  const showNotification = (message: string) => {
    setNotifications(prev => [...prev, message])
    setTimeout(() => {
      setNotifications(prev => prev.slice(1))
    }, 4000)
  }

  const getStatusBadge = (status: string) => {
    const config = {
      PENDING: { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', label: 'Pending' },
      APPROVED: { color: 'bg-green-100 text-green-800 border-green-200', label: 'Approved' },
      DENIED: { color: 'bg-red-100 text-red-800 border-red-200', label: 'Denied' },
      MATCHED: { color: 'bg-blue-100 text-blue-800 border-blue-200', label: 'Matched' },
      RESPONDED: { color: 'bg-purple-100 text-purple-800 border-purple-200', label: 'Responded' },
      FOLLOW_UP_SENT: { color: 'bg-orange-100 text-orange-800 border-orange-200', label: 'Follow-up Sent' },
      ACCEPTED: { color: 'bg-green-100 text-green-800 border-green-200', label: 'Accepted' }
    }
    
    const { color, label } = config[status as keyof typeof config] || config.PENDING
    return <Badge className={`${color} border text-xs px-2 py-1`}>{label}</Badge>
  }

  const getPriorityBadge = (priority: string) => {
    const config = {
      HIGH: { color: 'bg-red-100 text-red-800 border-red-200', icon: AlertCircle },
      NORMAL: { color: 'bg-gray-100 text-gray-800 border-gray-200', icon: Clock },
      LOW: { color: 'bg-green-100 text-green-800 border-green-200', icon: CheckCircle }
    }
    
    const { color, icon: Icon } = config[priority as keyof typeof config]
    return (
      <Badge className={`${color} border flex items-center gap-1 text-xs px-2 py-1 w-fit`}>
        <Icon className="h-3 w-3" />
        <span>{priority}</span>
      </Badge>
    )
  }

  const handleSendMessage = (patientId: string, clinicId: string) => {
    if (!messageText.trim()) return

    // Update the patient's clinic contact with the message
    setPatients(prev => prev.map(patient => {
      if (patient.id === patientId) {
        return {
          ...patient,
          clinicsContacted: patient.clinicsContacted.map(contact => {
            if (contact.id === clinicId) {
              return {
                ...contact,
                status: 'RESPONDED' as const,
                response: `Dr. Donlan: ${messageText}`
              }
            }
            return contact
          })
        }
      }
      return patient
    }))

    showNotification(`Message sent to ${selectedPatient?.clinicsContacted.find(c => c.id === clinicId)?.clinicName}`)
    setMessageText('')
    setIsMessageDialogOpen(false)
  }

  const handleAddNote = () => {
    if (!noteText.trim() || !selectedPatient) return

    showNotification(`Note added for patient ${selectedPatient.firstName} ${selectedPatient.lastName}`)
    setNoteText('')
    setIsNoteDialogOpen(false)
  }

  const handleFileUpload = (patientId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    if (files.length > 0) {
      const patient = patients.find(p => p.id === patientId)
      showNotification(`${files.length} file(s) uploaded for ${patient?.firstName} ${patient?.lastName}`)
    }
  }

  const sendFollowUp = (patientId: string, clinicId: string) => {
    // Update the clinic contact status to show follow-up was sent
    setPatients(prev => prev.map(patient => {
      if (patient.id === patientId) {
        return {
          ...patient,
          clinicsContacted: patient.clinicsContacted.map(contact => {
            if (contact.id === clinicId) {
              return {
                ...contact,
                status: 'FOLLOW_UP_SENT' as const,
                lastFollowUp: new Date().toISOString().split('T')[0]
              }
            }
            return contact
          })
        }
      }
      return patient
    }))

    const patient = patients.find(p => p.id === patientId)
    const clinic = patient?.clinicsContacted.find(c => c.id === clinicId)
    showNotification(`Automated follow-up sent to ${clinic?.clinicName}`)
  }

  const sendMessageToClinic = () => {
    // Mock message sending logic
    showNotification('Message sent to clinic successfully')
  }

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Notifications */}
      {notifications.length > 0 && (
        <div className="fixed top-4 right-4 z-50 space-y-2">
          {notifications.map((notification, index) => (
            <div
              key={index}
              className="bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2 max-w-sm"
            >
              <Check className="h-4 w-4 flex-shrink-0" />
              <span className="text-sm">{notification}</span>
            </div>
          ))}
        </div>
      )}

      {patients.map((patient) => (
        <Card key={patient.id} className="overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4 lg:p-6">
            <div className="space-y-4 lg:space-y-6">
              {/* Patient Header */}
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <h3 className="text-lg lg:text-xl font-semibold text-gray-900">
                      {patient.firstName} {patient.lastName}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {getPriorityBadge(patient.priority)}
                      {getStatusBadge(patient.status)}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    Admitted: {new Date(patient.admissionDate).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed max-w-3xl">
                    {patient.diagnosis}
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-2 lg:flex-shrink-0">
                  <Dialog open={isMessageDialogOpen} onOpenChange={setIsMessageDialogOpen}>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full sm:w-auto"
                        onClick={() => {
                          setSelectedPatient(patient)
                          setIsMessageDialogOpen(true)
                        }}
                      >
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Message
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md mx-4">
                      <DialogHeader className="space-y-3">
                        <DialogTitle className="text-lg font-semibold">
                          Send Message - {selectedPatient?.firstName} {selectedPatient?.lastName}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-6 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="message" className="text-sm font-medium">
                            Message to All Clinics
                          </Label>
                          <Textarea
                            id="message"
                            value={messageText}
                            onChange={(e) => setMessageText(e.target.value)}
                            placeholder="Type your message here..."
                            rows={4}
                            className="resize-none"
                          />
                        </div>
                        <Button 
                          onClick={() => selectedPatient && handleSendMessage(selectedPatient.id, selectedPatient.clinicsContacted[0]?.id)} 
                          className="w-full"
                          disabled={!messageText.trim()}
                        >
                          <Send className="h-4 w-4 mr-2" />
                          Send Message
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Dialog open={isNoteDialogOpen} onOpenChange={setIsNoteDialogOpen}>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full sm:w-auto"
                        onClick={() => {
                          setSelectedPatient(patient)
                          setIsNoteDialogOpen(true)
                        }}
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Notes
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md mx-4">
                      <DialogHeader className="space-y-3">
                        <DialogTitle className="text-lg font-semibold">
                          Add Note - {selectedPatient?.firstName} {selectedPatient?.lastName}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-6 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="note" className="text-sm font-medium">
                            Patient Note
                          </Label>
                          <Textarea
                            id="note"
                            value={noteText}
                            onChange={(e) => setNoteText(e.target.value)}
                            placeholder="Add a note about this patient..."
                            rows={4}
                            className="resize-none"
                          />
                        </div>
                        <Button 
                          onClick={handleAddNote} 
                          className="w-full"
                          disabled={!noteText.trim()}
                        >
                          <FileText className="h-4 w-4 mr-2" />
                          Save Note
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <div className="w-full sm:w-auto">
                    <Input
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileUpload(patient.id, e)}
                      className="hidden"
                      id={`file-upload-${patient.id}`}
                    />
                    <Button variant="outline" size="sm" asChild className="w-full sm:w-auto">
                      <label htmlFor={`file-upload-${patient.id}`} className="cursor-pointer">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Files
                      </label>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Clinic Contacts */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 text-base">Clinic Contacts</h4>
                <div className="space-y-3">
                  {patient.clinicsContacted.map((contact) => (
                    <div key={contact.id} className="bg-gray-50 rounded-lg p-4 lg:p-5">
                      <div className="flex flex-col lg:flex-row lg:justify-between gap-4">
                        <div className="space-y-3 flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                            <h5 className="font-semibold text-gray-900">{contact.clinicName}</h5>
                            {getStatusBadge(contact.status)}
                          </div>
                          
                          <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4 flex-shrink-0" />
                              <span>Contacted: {new Date(contact.contactedDate).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4 flex-shrink-0" />
                              <span>{contact.daysSinceContact} days ago</span>
                            </div>
                          </div>
                          
                          {contact.response && (
                            <div className="bg-white p-3 rounded border-l-4 border-blue-500">
                              <p className="text-sm">
                                <span className="font-medium">Response:</span> {contact.response}
                              </p>
                            </div>
                          )}
                          
                          {contact.lastFollowUp && (
                            <p className="text-xs text-orange-600 font-medium">
                              Follow-up sent: {new Date(contact.lastFollowUp).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                        
                        <div className="flex flex-col sm:flex-row lg:flex-col gap-2 lg:flex-shrink-0">
                          {contact.status === 'PENDING' && contact.daysSinceContact >= 2 && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full sm:w-auto"
                              onClick={() => sendFollowUp(patient.id, contact.id)}
                            >
                              <Send className="h-4 w-4 mr-2" />
                              Follow Up
                            </Button>
                          )}
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="w-full sm:w-auto"
                            onClick={() => sendMessageToClinic()}
                          >
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Message Clinic
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {patients.length === 0 && (
        <div className="text-center py-12">
          <div className="bg-gray-50 rounded-lg p-8">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Patients to Track</h3>
            <p className="text-gray-600">
              Start by adding a new patient in the Patient Intake tab.
            </p>
          </div>
        </div>
      )}
    </div>
  )
} 