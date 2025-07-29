"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { 
  MessageSquare, 
  FileText, 
  CheckCircle, 
  AlertTriangle,
  Download,
  Upload,
  User,
  Calendar,
  Stethoscope,
  MapPin,
  Phone,
  Heart,
  Building2,
  ClipboardList
} from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
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

// Mock data for different clinics
const clinicMockData: Record<string, DischargeRequest[]> = {
  'clinic-1': [ // Montreal Children&apos;s Clinic
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
        priority: 'HIGH' as const,
        status: 'PENDING' as const,
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
        doctor: 'Dr. Matthew Donlan',
        phone: '(514) 412-4401'
      },
      request: {
        priority: 'NORMAL' as const,
        status: 'PENDING' as const,
        requestedDate: '2024-01-14',
        requiredCare: ['Respiratory monitoring', 'Inhaler education', 'Follow-up'],
        notes: 'Patient stabilized after acute episode. Needs ongoing asthma management and family education.'
      },
      files: [
        { id: 'f4', name: 'chest_xray.pdf', type: 'Radiology', size: '1.5 MB' },
        { id: 'f5', name: 'pulmonary_function.pdf', type: 'Test Results', size: '0.9 MB' }
      ]
    }
  ],
  'clinic-2': [ // Quebec Family Health Center
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
        doctor: 'Dr. Matthew Donlan',
        phone: '(514) 412-4402'
      },
      request: {
        priority: 'LOW' as const,
        status: 'PENDING' as const,
        requestedDate: '2024-01-13',
        requiredCare: ['Neurological monitoring', 'Fever management', 'Parent education'],
        notes: 'Single febrile seizure episode. EEG normal. Requires follow-up in 2-3 days for reassessment.'
      },
      files: [
        { id: 'f6', name: 'eeg_report.pdf', type: 'Neurology Report', size: '1.2 MB' },
        { id: 'f7', name: 'discharge_summary.pdf', type: 'Summary', size: '0.6 MB' }
      ]
    },
    {
      id: 'req-4',
      patient: {
        firstName: 'Aiden',
        lastName: 'Thompson',
        age: 10,
        healthCard: 'THOMA987654',
        diagnosis: 'Diabetes management, new diagnosis',
        allergies: ['Latex'],
        medications: ['Insulin glargine', 'Metformin'],
        specialNeeds: 'Requires diabetes education and monitoring'
      },
      hospital: {
        name: 'Montreal Children\'s Hospital',
        doctor: 'Dr. Matthew Donlan',
        phone: '(514) 412-4403'
      },
      request: {
        priority: 'HIGH' as const,
        status: 'PENDING' as const,
        requestedDate: '2024-01-12',
        requiredCare: ['Diabetes education', 'Blood glucose monitoring', 'Nutrition counseling'],
        notes: 'Newly diagnosed Type 1 diabetes. Family needs comprehensive education and support.'
      },
      files: [
        { id: 'f8', name: 'diabetes_assessment.pdf', type: 'Assessment', size: '1.8 MB' },
        { id: 'f9', name: 'nutrition_plan.pdf', type: 'Nutrition Plan', size: '0.9 MB' }
      ]
    }
  ],
  'clinic-3': [ // Laval Pediatric Associates
    {
      id: 'req-5',
      patient: {
        firstName: 'Mia',
        lastName: 'Garcia',
        age: 7,
        healthCard: 'GARCM456789',
        diagnosis: 'ADHD management',
        allergies: ['None known'],
        medications: ['Methylphenidate 10mg'],
      },
      hospital: {
        name: 'Montreal Children\'s Hospital',
        doctor: 'Dr. Matthew Donlan',
        phone: '(514) 412-4404'
      },
      request: {
        priority: 'NORMAL' as const,
        status: 'PENDING' as const,
        requestedDate: '2024-01-11',
        requiredCare: ['Behavioral therapy', 'Medication monitoring', 'School coordination'],
        notes: 'ADHD diagnosis confirmed. Needs ongoing behavioral support and medication management.'
      },
      files: [
        { id: 'f10', name: 'psych_evaluation.pdf', type: 'Psychology Report', size: '2.3 MB' },
        { id: 'f11', name: 'school_assessment.pdf', type: 'School Assessment', size: '1.1 MB' }
      ]
    }
  ],
  'clinic-4': [ // Montreal Pediatric Specialists
    {
      id: 'req-6',
      patient: {
        firstName: 'Noah',
        lastName: 'Wilson',
        age: 14,
        healthCard: 'WILSN321098',
        diagnosis: 'Depression and anxiety',
        allergies: ['None known'],
        medications: ['Sertraline 25mg'],
      },
      hospital: {
        name: 'Montreal Children\'s Hospital',
        doctor: 'Dr. Matthew Donlan',
        phone: '(514) 412-4405'
      },
      request: {
        priority: 'HIGH' as const,
        status: 'PENDING' as const,
        requestedDate: '2024-01-10',
        requiredCare: ['Mental health counseling', 'Medication monitoring', 'Family therapy'],
        notes: 'Adolescent with depression and anxiety. Requires specialized mental health support.'
      },
      files: [
        { id: 'f12', name: 'psychiatric_evaluation.pdf', type: 'Psychiatric Report', size: '3.1 MB' },
        { id: 'f13', name: 'family_assessment.pdf', type: 'Family Assessment', size: '1.4 MB' }
      ]
    }
  ],
  'clinic-5': [ // West Island Family Clinic
    {
      id: 'req-7',
      patient: {
        firstName: 'Zoe',
        lastName: 'Anderson',
        age: 3,
        healthCard: 'ANDEZ654321',
        diagnosis: 'Developmental delay assessment',
        allergies: ['None known'],
        medications: ['None'],
      },
      hospital: {
        name: 'Montreal Children\'s Hospital',
        doctor: 'Dr. Matthew Donlan',
        phone: '(514) 412-4406'
      },
      request: {
        priority: 'NORMAL' as const,
        status: 'PENDING' as const,
        requestedDate: '2024-01-09',
        requiredCare: ['Developmental assessment', 'Early intervention', 'Parent education'],
        notes: 'Concerns about speech and motor development. Needs comprehensive developmental evaluation.'
      },
      files: [
        { id: 'f14', name: 'developmental_assessment.pdf', type: 'Development Report', size: '2.7 MB' },
        { id: 'f15', name: 'speech_evaluation.pdf', type: 'Speech Assessment', size: '1.6 MB' }
      ]
    }
  ]
}

interface IncomingRequestsTableProps {
  selectedClinic: string
}

export default function IncomingRequestsTable({ selectedClinic }: IncomingRequestsTableProps) {
  const [requests, setRequests] = useState<DischargeRequest[]>(clinicMockData['clinic-1'])
  const [selectedRequest, setSelectedRequest] = useState<DischargeRequest | null>(null)
  const [messageText, setMessageText] = useState('')
  const [responseReason, setResponseReason] = useState('')
  const [notifications, setNotifications] = useState<string[]>([])
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false)
  const [isResponseDialogOpen, setIsResponseDialogOpen] = useState(false)
  const [responseType, setResponseType] = useState<'APPROVED' | 'DENIED'>('APPROVED')

  // Update requests when clinic selection changes
  useEffect(() => {
    const clinicData = clinicMockData[selectedClinic]
    setRequests(clinicData || [])
  }, [selectedClinic])

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

  const handleSendMessage = () => {
    // Mock message sending logic
    setIsMessageDialogOpen(false)
    setMessageText('')
    showNotification('Message sent to PICU doctor successfully')
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
      {/* Clinic Info */}
      <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
        <div className="flex items-center gap-2">
          <Building2 className="h-5 w-5 text-blue-600" />
          <span className="font-medium text-blue-900">Active Clinic:</span>
        </div>
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          {requests.length} requests
        </Badge>
      </div>

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
        {requests.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="space-y-2">
                <ClipboardList className="h-12 w-12 text-gray-400 mx-auto" />
                <h3 className="text-lg font-medium text-gray-900">No Pending Requests</h3>
                <p className="text-gray-600">This clinic currently has no pending patient discharge requests.</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          requests.map((request) => (
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
          ))
        )}
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
                onClick={() => selectedRequest && handleSendMessage()}
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