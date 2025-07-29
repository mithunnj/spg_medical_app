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
  AlertTriangle,
  Download,
  Upload,
  User,
  Calendar,
  Stethoscope,
  MapPin,
  Phone,
  Heart
} from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface DischargeRequest {
  id: string
  patient: {
    firstName: string
    lastName: string
    age: number
    healthCard: string
    diagnosis: string
    allergies: string[]
    medications: string[]
    specialNeeds?: string
  }
  hospital: {
    name: string
    doctor: string
    phone: string
  }
  request: {
    priority: 'HIGH' | 'NORMAL' | 'LOW'
    status: 'PENDING' | 'APPROVED' | 'DENIED'
    requestedDate: string
    requiredCare: string[]
    notes?: string
    clinicNotes?: string
  }
  files: {
    id: string
    name: string
    type: string
    size: string
  }[]
}

const mockRequests: DischargeRequest[] = [
  {
    id: 'req-1',
    patient: {
      firstName: 'Emma',
      lastName: 'Johnson',
      age: 8,
      healthCard: 'JOHNE123456',
      diagnosis: 'Post-surgical recovery from appendectomy',
      allergies: ['Penicillin', 'Shellfish'],
      medications: ['Acetaminophen 160mg', 'Amoxicillin 250mg'],
      specialNeeds: 'Requires pediatric-trained nursing staff'
    },
    hospital: {
      name: 'Montreal Children\'s Hospital',
      doctor: 'Dr. Matthew Donlan',
      phone: '(514) 412-4400'
    },
    request: {
      priority: 'HIGH',
      status: 'PENDING',
      requestedDate: '2024-01-15',
      requiredCare: ['Post-operative care', 'Pain management', 'Wound care'],
      notes: 'Patient recovering well but needs continued monitoring for 48-72 hours. Family prefers local clinic for follow-up care.'
    },
    files: [
      { id: 'f1', name: 'medical_records.pdf', type: 'Medical Records', size: '2.1 MB' },
      { id: 'f2', name: 'surgery_notes.pdf', type: 'Surgery Notes', size: '1.3 MB' },
      { id: 'f3', name: 'lab_results.pdf', type: 'Lab Results', size: '0.8 MB' }
    ]
  },
  {
    id: 'req-2',
    patient: {
      firstName: 'Lucas',
      lastName: 'Chen',
      age: 12,
      healthCard: 'CHENL789012',
      diagnosis: 'Asthma exacerbation, stable',
      allergies: ['Dust mites'],
      medications: ['Ventolin inhaler', 'Prednisolone 5mg'],
    },
    hospital: {
      name: 'Montreal Children\'s Hospital',
      doctor: 'Dr. Sarah Williams',
      phone: '(514) 412-4401'
    },
    request: {
      priority: 'NORMAL',
      status: 'PENDING',
      requestedDate: '2024-01-14',
      requiredCare: ['Respiratory monitoring', 'Inhaler education', 'Follow-up'],
      notes: 'Patient stabilized after acute episode. Needs ongoing asthma management and family education.'
    },
    files: [
      { id: 'f4', name: 'chest_xray.pdf', type: 'Radiology', size: '1.5 MB' },
      { id: 'f5', name: 'pulmonary_function.pdf', type: 'Test Results', size: '0.9 MB' }
    ]
  },
  {
    id: 'req-3',
    patient: {
      firstName: 'Sophia',
      lastName: 'Rodriguez',
      age: 5,
      healthCard: 'RODRS567890',
      diagnosis: 'Febrile seizure, resolved',
      allergies: ['None known'],
      medications: ['Acetaminophen as needed'],
    },
    hospital: {
      name: 'Montreal Children\'s Hospital',
      doctor: 'Dr. Michael Kim',
      phone: '(514) 412-4402'
    },
    request: {
      priority: 'LOW',
      status: 'PENDING',
      requestedDate: '2024-01-13',
      requiredCare: ['Neurological monitoring', 'Fever management', 'Parent education'],
      notes: 'Single febrile seizure episode. EEG normal. Requires follow-up in 2-3 days for reassessment.'
    },
    files: [
      { id: 'f6', name: 'eeg_report.pdf', type: 'Neurology Report', size: '1.2 MB' },
      { id: 'f7', name: 'discharge_summary.pdf', type: 'Summary', size: '0.6 MB' }
    ]
  }
]

export default function IncomingRequestsTable() {
  const [requests, setRequests] = useState<DischargeRequest[]>(mockRequests)
  const [selectedRequest, setSelectedRequest] = useState<DischargeRequest | null>(null)
  const [clinicNotes, setClinicNotes] = useState('')
  const [messageText, setMessageText] = useState('')
  const [responseReason, setResponseReason] = useState('')
  const [notifications, setNotifications] = useState<string[]>([])
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false)
  const [isResponseDialogOpen, setIsResponseDialogOpen] = useState(false)
  const [responseType, setResponseType] = useState<'APPROVED' | 'DENIED'>('APPROVED')

  const showNotification = (message: string) => {
    setNotifications(prev => [...prev, message])
    setTimeout(() => {
      setNotifications(prev => prev.slice(1))
    }, 5000)
  }

  const handleApproveRequest = (requestId: string) => {
    setRequests(prev => prev.map(req => 
      req.id === requestId 
        ? { ...req, request: { ...req.request, status: 'APPROVED' } }
        : req
    ))
    setIsResponseDialogOpen(false)
    showNotification('Patient request approved successfully')
  }

  const handleDenyRequest = (requestId: string, reason: string) => {
    setRequests(prev => prev.map(req => 
      req.id === requestId 
        ? { 
            ...req, 
            request: { 
              ...req.request, 
              status: 'DENIED',
              clinicNotes: reason
            } 
          }
        : req
    ))
    setIsResponseDialogOpen(false)
    setResponseReason('')
    showNotification('Patient request declined with reason provided')
  }

  const handleSendMessage = (requestId: string) => {
    // Mock message sending logic
    setIsMessageDialogOpen(false)
    setMessageText('')
    showNotification('Message sent to PICU doctor successfully')
  }

  const handleAddNotes = (requestId: string, notes: string) => {
    setRequests(prev => prev.map(req => 
      req.id === requestId 
        ? { ...req, request: { ...req.request, clinicNotes: notes } }
        : req
    ))
    setClinicNotes('')
    showNotification('Notes added to patient request')
  }

  const handleFileUpload = (requestId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      showNotification(`File "${file.name}" uploaded successfully`)
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'HIGH': return 'bg-red-100 text-red-800 border-red-200'
      case 'NORMAL': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'LOW': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'APPROVED': return 'bg-green-100 text-green-800 border-green-200'
      case 'DENIED': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Notifications */}
      {notifications.length > 0 && (
        <div className="space-y-2">
          {notifications.map((notification, index) => (
            <div key={index} className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm">
              {notification}
            </div>
          ))}
        </div>
      )}

      {/* Requests List */}
      <div className="space-y-4">
        {requests.map((request) => (
          <Card key={request.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 lg:p-6">
              <div className="space-y-4">
                {/* Header Row */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-3 lg:space-y-0">
                  <div className="space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {request.patient.firstName} {request.patient.lastName}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        <Badge className={`text-xs border ${getPriorityColor(request.request.priority)}`}>
                          {request.request.priority} Priority
                        </Badge>
                        <Badge className={`text-xs border ${getStatusColor(request.request.status)}`}>
                          {request.request.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>Age {request.patient.age}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>Requested {request.request.requestedDate}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{request.hospital.name}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  {request.request.status === 'PENDING' && (
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button 
                        onClick={() => {
                          setSelectedRequest(request)
                          setResponseType('APPROVED')
                          setIsResponseDialogOpen(true)
                        }}
                        className="bg-green-600 hover:bg-green-700 text-white text-sm"
                        size="sm"
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Accept
                      </Button>
                      <Button 
                        onClick={() => {
                          setSelectedRequest(request)
                          setResponseType('DENIED')
                          setIsResponseDialogOpen(true)
                        }}
                        variant="outline" 
                        className="border-red-200 text-red-600 hover:bg-red-50 text-sm"
                        size="sm"
                      >
                        <AlertTriangle className="h-4 w-4 mr-1" />
                        Decline
                      </Button>
                    </div>
                  )}
                </div>

                {/* Patient Information */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Stethoscope className="h-4 w-4 text-gray-500" />
                      <span className="font-medium">Diagnosis:</span>
                      <span>{request.patient.diagnosis}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Heart className="h-4 w-4 text-gray-500" />
                      <span className="font-medium">Allergies:</span>
                      <span>{request.patient.allergies.join(', ') || 'None known'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-medium">Required Care:</span>
                      <span>{request.request.requiredCare.join(', ')}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span className="font-medium">Hospital Contact:</span>
                      <span>{request.hospital.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <User className="h-4 w-4 text-gray-500" />
                      <span className="font-medium">Attending Doctor:</span>
                      <span>{request.hospital.doctor}</span>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                {request.request.notes && (
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <span className="font-medium">PICU Notes:</span> {request.request.notes}
                    </p>
                  </div>
                )}

                {request.request.clinicNotes && (
                  <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                    <p className="text-sm text-purple-800">
                      <span className="font-medium">Clinic Notes:</span> {request.request.clinicNotes}
                    </p>
                  </div>
                )}

                {/* Files */}
                {request.files.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-gray-700">Patient Files:</h4>
                    <div className="flex flex-wrap gap-2">
                      {request.files.map((file) => (
                        <div key={file.id} className="flex items-center gap-2 p-2 bg-white border rounded-lg text-xs">
                          <FileText className="h-4 w-4 text-gray-500" />
                          <span className="font-medium">{file.name}</span>
                          <span className="text-gray-500">({file.size})</span>
                          <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                            <Download className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Row */}
                <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-gray-200">
                  <Button
                    onClick={() => {
                      setSelectedRequest(request)
                      setIsMessageDialogOpen(true)
                    }}
                    variant="outline"
                    size="sm"
                    className="text-sm"
                  >
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Message Doctor
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-sm"
                    onClick={() => setSelectedRequest(request)}
                  >
                    <FileText className="h-4 w-4 mr-1" />
                    Add Notes
                  </Button>

                  <div className="relative">
                    <input
                      type="file"
                      id={`file-upload-${request.id}`}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={(e) => handleFileUpload(request.id, e)}
                      accept=".pdf,.doc,.docx,.jpg,.png"
                    />
                    <Button variant="outline" size="sm" className="text-sm">
                      <Upload className="h-4 w-4 mr-1" />
                      Upload File
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Message Dialog */}
      <Dialog open={isMessageDialogOpen} onOpenChange={setIsMessageDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Message PICU Doctor</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedRequest && (
              <div className="p-3 bg-gray-50 rounded-lg text-sm">
                <p><strong>Patient:</strong> {selectedRequest.patient.firstName} {selectedRequest.patient.lastName}</p>
                <p><strong>Doctor:</strong> {selectedRequest.hospital.doctor}</p>
              </div>
            )}
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Type your message to the PICU doctor..."
                className="mt-1"
                rows={4}
              />
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={() => selectedRequest && handleSendMessage(selectedRequest.id)}
                disabled={!messageText.trim()}
                className="flex-1"
              >
                Send Message
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setIsMessageDialogOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Response Dialog */}
      <Dialog open={isResponseDialogOpen} onOpenChange={setIsResponseDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {responseType === 'APPROVED' ? 'Accept Patient' : 'Decline Patient'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedRequest && (
              <div className="p-3 bg-gray-50 rounded-lg text-sm">
                <p><strong>Patient:</strong> {selectedRequest.patient.firstName} {selectedRequest.patient.lastName}</p>
                <p><strong>Diagnosis:</strong> {selectedRequest.patient.diagnosis}</p>
              </div>
            )}
            
            {responseType === 'DENIED' && (
              <div>
                <Label htmlFor="reason">Reason for declining</Label>
                <Textarea
                  id="reason"
                  value={responseReason}
                  onChange={(e) => setResponseReason(e.target.value)}
                  placeholder="Please provide a reason for declining this patient..."
                  className="mt-1"
                  rows={3}
                />
              </div>
            )}

            <div className="flex gap-2">
              <Button 
                onClick={() => {
                  if (selectedRequest) {
                    if (responseType === 'APPROVED') {
                      handleApproveRequest(selectedRequest.id)
                    } else {
                      handleDenyRequest(selectedRequest.id, responseReason)
                    }
                  }
                }}
                disabled={responseType === 'DENIED' && !responseReason.trim()}
                className={`flex-1 ${responseType === 'APPROVED' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}
              >
                {responseType === 'APPROVED' ? 'Accept Patient' : 'Decline Patient'}
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setIsResponseDialogOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
} 