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
  XCircle, 
  AlertCircle,
  Upload,
  Send,
  Calendar
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
const mockPatients: PatientRecord[] = [
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
        id: '2',
        clinicName: 'Quebec Family Health Center',
        contactedDate: '2024-01-14',
        status: 'DENIED',
        response: 'Currently at capacity for cardiac patients.',
        daysSinceContact: 6
      },
      {
        id: '1',
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
  const [selectedPatient, setSelectedPatient] = useState<PatientRecord | null>(null)
  const [messageText, setMessageText] = useState('')
  const [noteText, setNoteText] = useState('')

  const getStatusBadge = (status: string) => {
    const config = {
      PENDING: { color: 'bg-yellow-100 text-yellow-800', label: 'Pending' },
      APPROVED: { color: 'bg-green-100 text-green-800', label: 'Approved' },
      DENIED: { color: 'bg-red-100 text-red-800', label: 'Denied' },
      MATCHED: { color: 'bg-blue-100 text-blue-800', label: 'Matched' },
      RESPONDED: { color: 'bg-purple-100 text-purple-800', label: 'Responded' },
      FOLLOW_UP_SENT: { color: 'bg-orange-100 text-orange-800', label: 'Follow-up Sent' },
      ACCEPTED: { color: 'bg-green-100 text-green-800', label: 'Accepted' }
    }
    
    const { color, label } = config[status as keyof typeof config] || config.PENDING
    return <Badge className={color}>{label}</Badge>
  }

  const getPriorityBadge = (priority: string) => {
    const config = {
      HIGH: { color: 'bg-red-100 text-red-800', icon: AlertCircle },
      NORMAL: { color: 'bg-gray-100 text-gray-800', icon: Clock },
      LOW: { color: 'bg-green-100 text-green-800', icon: CheckCircle }
    }
    
    const { color, icon: Icon } = config[priority as keyof typeof config]
    return (
      <Badge className={`${color} flex items-center space-x-1`}>
        <Icon className="h-3 w-3" />
        <span>{priority}</span>
      </Badge>
    )
  }

  const handleSendMessage = (clinicId: string) => {
    console.log('Sending message to clinic:', clinicId, messageText)
    setMessageText('')
    // TODO: API call to send message
  }

  const handleAddNote = () => {
    console.log('Adding note for patient:', selectedPatient?.id, noteText)
    setNoteText('')
    // TODO: API call to add note
  }

  const handleFileUpload = (patientId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    console.log('Uploading files for patient:', patientId, files)
    // TODO: API call to upload files
  }

  const sendFollowUp = (clinicId: string) => {
    console.log('Sending automated follow-up to clinic:', clinicId)
    // TODO: API call to send follow-up
  }

  return (
    <div className="space-y-6">
      {mockPatients.map((patient) => (
        <Card key={patient.id} className="overflow-hidden">
          <CardContent className="p-6">
            <div className="space-y-4">
              {/* Patient Header */}
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-lg font-semibold">Patient {patient.initials}</h3>
                    {getPriorityBadge(patient.priority)}
                    {getStatusBadge(patient.status)}
                  </div>
                  <p className="text-sm text-gray-600">
                    Admitted: {new Date(patient.admissionDate).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-700 max-w-2xl">
                    {patient.diagnosis}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => setSelectedPatient(patient)}>
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Message
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Send Message - Patient {patient.initials}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="message">Message to Clinics</Label>
                          <Textarea
                            id="message"
                            value={messageText}
                            onChange={(e) => setMessageText(e.target.value)}
                            placeholder="Type your message here..."
                            rows={4}
                          />
                        </div>
                        <Button onClick={() => handleSendMessage('')} className="w-full">
                          <Send className="h-4 w-4 mr-2" />
                          Send Message
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => setSelectedPatient(patient)}>
                        <FileText className="h-4 w-4 mr-2" />
                        Notes
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Add Note - Patient {patient.initials}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="note">Patient Note</Label>
                          <Textarea
                            id="note"
                            value={noteText}
                            onChange={(e) => setNoteText(e.target.value)}
                            placeholder="Add a note about this patient..."
                            rows={4}
                          />
                        </div>
                        <Button onClick={handleAddNote} className="w-full">
                          <FileText className="h-4 w-4 mr-2" />
                          Save Note
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <div>
                    <Input
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileUpload(patient.id, e)}
                      className="hidden"
                      id={`file-upload-${patient.id}`}
                    />
                    <Button variant="outline" size="sm" asChild>
                      <label htmlFor={`file-upload-${patient.id}`} className="cursor-pointer">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Files
                      </label>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Clinic Contacts */}
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Clinic Contacts</h4>
                {patient.clinicsContacted.map((contact) => (
                  <div key={contact.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-3">
                          <h5 className="font-medium">{contact.clinicName}</h5>
                          {getStatusBadge(contact.status)}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>Contacted: {new Date(contact.contactedDate).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{contact.daysSinceContact} days ago</span>
                          </div>
                        </div>
                        {contact.response && (
                          <p className="text-sm bg-white p-2 rounded border-l-4 border-blue-500">
                            <strong>Response:</strong> {contact.response}
                          </p>
                        )}
                        {contact.lastFollowUp && (
                          <p className="text-xs text-orange-600">
                            Follow-up sent: {new Date(contact.lastFollowUp).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        {contact.status === 'PENDING' && contact.daysSinceContact >= 2 && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => sendFollowUp(contact.id)}
                          >
                            <Send className="h-4 w-4 mr-2" />
                            Follow Up
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Message Clinic
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {mockPatients.length === 0 && (
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