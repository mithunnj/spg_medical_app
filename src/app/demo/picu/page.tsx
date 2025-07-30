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
  Stethoscope,
  Plus,
  MessageSquare,
  FileText,
  Clock,
  CheckCircle,
  ArrowLeft,
  Users,
  Calendar,
  TrendingUp,
  Eye,
  Building2,
  MapPin,
  Phone,
  Upload,
  Send,
  Bell
} from 'lucide-react'
import { useEffect, useState } from 'react'

export default function PICUDoctorDemo() {
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
  // Filter for Montreal area clinics
  const montrealClinics = clinics.filter((c: { id: string; region?: string; name: string; capacity: number; currentPatients: number; specializations: string[]; acceptingNew: boolean }) => 
    c.region?.toLowerCase().includes('montreal') || 
    c.name.toLowerCase().includes('montreal') ||
    c.name.toLowerCase().includes('pediatric')
  ).slice(0, 6) // Limit to 6 for demo

  const mockPatients = [
    {
      id: '1',
      name: 'Emma Rodriguez',
      age: '8 years',
      diagnosis: 'Severe asthma exacerbation',
      status: 'PENDING',
      clinic: 'Montreal Pediatric Associates',
      contacted: '2024-01-15',
      lastFollowUp: '2024-01-18',
      priority: 'HIGH'
    },
    {
      id: '2',
      name: 'Lucas Chen',
      age: '12 years',
      diagnosis: 'Type 1 diabetes management',
      status: 'APPROVED',
      clinic: 'West Island Pediatrics',
      contacted: '2024-01-10',
      lastFollowUp: '2024-01-12',
      priority: 'MEDIUM'
    },
    {
      id: '3',
      name: 'Sophie Tremblay',
      age: '6 years',
      diagnosis: 'Complex congenital heart disease',
      status: 'DENIED',
      clinic: 'Montreal Children\'s Cardiology',
      contacted: '2024-01-08',
      lastFollowUp: '2024-01-11',
      priority: 'HIGH'
    },
    {
      id: '4',
      name: 'Ahmed Hassan',
      age: '10 years',
      diagnosis: 'Epilepsy management',
      status: 'MATCHED',
      clinic: 'Neurology Associates',
      contacted: '2024-01-05',
      lastFollowUp: '2024-01-07',
      priority: 'MEDIUM'
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

  const handleNewPatientIntake = () => {
    setSelectedModal('new-patient-intake')
  }

  const handleSendFollowUp = () => {
    setSelectedModal('follow-up-messages')
  }

  const handleUploadFiles = () => {
    setSelectedModal('upload-files')
  }

  const handleScheduleFollowUps = () => {
    setSelectedModal('schedule-followups')
  }

  const handleContactClinic = (clinicName: string) => {
    setSelectedModal(`contact-clinic-${clinicName}`)
  }

  const handleMessagePatient = (patientName: string) => {
    setSelectedModal(`message-patient-${patientName}`)
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
                <h1 className="text-2xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent flex items-center space-x-3">
                  <Stethoscope className="h-8 w-8 text-blue-600" />
                  <span>PICU Doctor Dashboard</span>
                </h1>
                <p className="text-gray-600">Montreal Children&apos;s Hospital - Patient discharge coordination</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300">
                <Eye className="h-4 w-4 mr-2" />
                Demo Mode
              </Badge>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300">
                Dr. Matthew Donlan
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hospital Information */}
        <Card className="bg-white shadow-sm mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Hospital Information</span>
              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                Active PICU
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Building2 className="h-5 w-5 text-gray-500" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Montreal Children&apos;s Hospital</h3>
                    <p className="text-sm text-gray-600">Pediatric Intensive Care Unit</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-gray-500" />
                  <p className="text-sm text-gray-600">2300 Tupper Street, Montreal, QC H3H 1P3</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gray-500" />
                  <p className="text-sm text-gray-600">+1-514-412-4400</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">PICU Statistics</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Current Patients</span>
                      <span className="font-semibold">12</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Pending Discharges</span>
                      <span className="font-semibold">8</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Successful Matches</span>
                      <span className="font-semibold text-green-600">45</span>
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
                  <p className="text-sm font-medium text-gray-600">Active Patients</p>
                  <p className="text-2xl font-bold text-gray-900">12</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Requests</p>
                  <p className="text-2xl font-bold text-gray-900">8</p>
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
                  <p className="text-sm font-medium text-gray-600">Successful Matches</p>
                  <p className="text-2xl font-bold text-gray-900">45</p>
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
                  <p className="text-sm font-medium text-gray-600">Avg Response Time</p>
                  <p className="text-2xl font-bold text-gray-900">2.3 days</p>
                </div>
                <div className="bg-purple-100 p-3 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleNewPatientIntake}>
            <Plus className="h-4 w-4 mr-2" />
            New Patient Intake
          </Button>
          <Button variant="outline" onClick={handleSendFollowUp}>
            <MessageSquare className="h-4 w-4 mr-2" />
            Send Follow-up Messages
          </Button>
          <Button variant="outline" onClick={handleUploadFiles}>
            <FileText className="h-4 w-4 mr-2" />
            Upload Patient Files
          </Button>
          <Button variant="outline" onClick={handleScheduleFollowUps}>
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Follow-ups
          </Button>
        </div>

        {/* Patient Tracking Table */}
        <Card className="bg-white shadow-sm mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Patient Tracking</span>
              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                {mockPatients.length} Active Cases
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Patient</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Diagnosis</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Clinic</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Contacted</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockPatients.map((patient) => (
                    <tr key={patient.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div>
                          <div className="font-medium text-gray-900">{patient.name}</div>
                          <div className="text-sm text-gray-500">{patient.age}</div>
                          <Badge className={`mt-1 text-xs ${getPriorityColor(patient.priority)}`}>
                            {patient.priority}
                          </Badge>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        {patient.diagnosis}
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={`text-xs ${getStatusColor(patient.status)}`}>
                          {patient.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        {patient.clinic}
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        <div>{patient.contacted}</div>
                        <div className="text-xs text-gray-500">
                          Last follow-up: {patient.lastFollowUp}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" onClick={() => handleMessagePatient(patient.name)}>
                            <MessageSquare className="h-3 w-3 mr-1" />
                            Message
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => setSelectedModal(`view-patient-${patient.id}`)}>
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Available Clinics */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Available Clinics</span>
              <Badge variant="outline" className="bg-green-50 text-green-700">
                {montrealClinics.length} Clinics Available
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {montrealClinics.map((clinic) => (
                <div key={clinic.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">{clinic.name}</h3>
                    <Badge variant="outline" className="bg-green-100 text-green-700">
                      {clinic.capacity - clinic.currentPatients} slots
                    </Badge>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div><strong>Region:</strong> {clinic.region || 'Montreal'}</div>
                    <div><strong>Specializations:</strong> {clinic.specializations.join(', ')}</div>
                    <div><strong>Capacity:</strong> {clinic.capacity} patients</div>
                    <div><strong>Current:</strong> {clinic.currentPatients} patients</div>
                    <div><strong>Status:</strong> {clinic.acceptingNew ? 'Accepting' : 'Full'}</div>
                  </div>
                  <div className="mt-4">
                    <Button size="sm" className="w-full" onClick={() => handleContactClinic(clinic.name)}>
                      Contact Clinic
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Demo Features Highlight */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-semibold text-blue-900 mb-4 flex items-center">
            <Stethoscope className="h-5 w-5 mr-2" />
            PICU Doctor Features Demonstrated
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-blue-800 text-sm">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Montreal Children&apos;s Hospital integration</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Real clinic data from NeonDB</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Functional action buttons</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Secure messaging with clinics</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>File upload and management</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Automated follow-up reminders</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Dialogs */}
        <Dialog open={selectedModal === 'new-patient-intake'} onOpenChange={() => setSelectedModal(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5 text-red-600" />
                New Patient Intake Form
              </DialogTitle>
              <DialogDescription>
                Complete patient information for discharge coordination
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Patient Name</label>
                  <input className="w-full mt-1 p-2 border rounded-md" placeholder="Enter patient name" />
                </div>
                <div>
                  <label className="text-sm font-medium">Age</label>
                  <input className="w-full mt-1 p-2 border rounded-md" placeholder="Age in years" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Diagnosis</label>
                <textarea className="w-full mt-1 p-2 border rounded-md" rows={3} placeholder="Enter diagnosis and care requirements" />
              </div>
              <div>
                <label className="text-sm font-medium">Preferred Clinics</label>
                <select className="w-full mt-1 p-2 border rounded-md">
                  <option>Select preferred clinics</option>
                  {montrealClinics.slice(0, 3).map(clinic => (
                    <option key={clinic.id}>{clinic.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setSelectedModal(null)}>Cancel</Button>
              <Button className="bg-red-600 hover:bg-red-700">Submit Intake</Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={selectedModal === 'follow-up-messages'} onOpenChange={() => setSelectedModal(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Send className="h-5 w-5 text-red-600" />
                Send Follow-up Messages
              </DialogTitle>
              <DialogDescription>
                Automated follow-up messages for clinics that haven&apos;t responded within 48 hours
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-medium text-yellow-800 mb-2">Pending Responses</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Montreal Pediatric Associates</span>
                    <span className="text-yellow-600">3 days overdue</span>
                  </div>
                  <div className="flex justify-between">
                    <span>West Island Pediatrics</span>
                    <span className="text-yellow-600">2 days overdue</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setSelectedModal(null)}>Cancel</Button>
              <Button className="bg-red-600 hover:bg-red-700">Send Follow-ups</Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={selectedModal === 'upload-files'} onOpenChange={() => setSelectedModal(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5 text-red-600" />
                Upload Patient Files
              </DialogTitle>
              <DialogDescription>
                Upload medical records, lab results, and discharge summaries
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-2">Drag and drop files here, or click to browse</p>
                <p className="text-xs text-gray-500">Supported: PDF, DOC, JPG, PNG (Max 10MB each)</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Supported Formats:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Medical records (PDF)</li>
                  <li>• Lab results (PDF, DOC)</li>
                  <li>• Imaging files (JPG, PNG)</li>
                  <li>• Discharge summaries (PDF)</li>
                </ul>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setSelectedModal(null)}>Cancel</Button>
              <Button className="bg-red-600 hover:bg-red-700">Upload Files</Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={selectedModal === 'schedule-followups'} onOpenChange={() => setSelectedModal(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-red-600" />
                Schedule Follow-ups
              </DialogTitle>
              <DialogDescription>
                Schedule follow-up appointments and set reminders
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Patient</label>
                  <select className="w-full mt-1 p-2 border rounded-md">
                    <option>Select patient</option>
                    {mockPatients.map(patient => (
                      <option key={patient.id}>{patient.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Date</label>
                  <input type="date" className="w-full mt-1 p-2 border rounded-md" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Type</label>
                <select className="w-full mt-1 p-2 border rounded-md">
                  <option>Follow-up consultation</option>
                  <option>Lab work review</option>
                  <option>Specialist referral</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Notes</label>
                <textarea className="w-full mt-1 p-2 border rounded-md" rows={3} placeholder="Additional notes for the appointment" />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setSelectedModal(null)}>Cancel</Button>
              <Button className="bg-red-600 hover:bg-red-700">Schedule Appointment</Button>
            </div>
          </DialogContent>
        </Dialog>

        {mockPatients.map(patient => (
          <Dialog key={patient.id} open={selectedModal === `message-patient-${patient.name}`} onOpenChange={() => setSelectedModal(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-red-600" />
                  Message {patient.name}&apos;s Family
                </DialogTitle>
                <DialogDescription>
                  Send secure message to patient guardians about care coordination
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Subject</label>
                  <input className="w-full mt-1 p-2 border rounded-md" placeholder="Enter message subject" />
                </div>
                <div>
                  <label className="text-sm font-medium">Message</label>
                  <textarea className="w-full mt-1 p-2 border rounded-md" rows={4} placeholder="Enter your message to the family..." />
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="urgent" />
                  <label htmlFor="urgent" className="text-sm">Mark as urgent</label>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <Button variant="outline" onClick={() => setSelectedModal(null)}>Cancel</Button>
                <Button className="bg-red-600 hover:bg-red-700">Send Message</Button>
              </div>
            </DialogContent>
          </Dialog>
        ))}

        {mockPatients.map(patient => (
          <Dialog key={patient.id} open={selectedModal === `view-patient-${patient.id}`} onOpenChange={() => setSelectedModal(null)}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-blue-600" />
                  Patient Details: {patient.name}
                </DialogTitle>
                <DialogDescription>
                  View comprehensive patient information and care status
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-medium text-blue-800 mb-2">Patient Information</h4>
                    <div className="text-sm text-blue-700 space-y-1">
                      <div><strong>Name:</strong> {patient.name}</div>
                      <div><strong>Age:</strong> {patient.age}</div>
                      <div><strong>Diagnosis:</strong> {patient.diagnosis}</div>
                      <div><strong>Status:</strong> {patient.status}</div>
                      <div><strong>Priority:</strong> {patient.priority}</div>
                    </div>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-800 mb-2">Care Details</h4>
                    <div className="text-sm text-gray-700 space-y-1">
                      <div><strong>Clinic:</strong> {patient.clinic}</div>
                      <div><strong>Contacted:</strong> {patient.contacted}</div>
                      <div><strong>Last Follow-up:</strong> {patient.lastFollowUp}</div>
                      <div><strong>Days in PICU:</strong> 12</div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Care Notes</h4>
                  <textarea className="w-full p-2 border rounded-md" rows={3} placeholder="Add care notes..." defaultValue="Patient responding well to treatment. Ready for discharge coordination with outpatient clinic." />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setSelectedModal(null)}>Close</Button>
                  <Button className="bg-blue-600 hover:bg-blue-700">Update Notes</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ))}

        {montrealClinics.map(clinic => (
          <Dialog key={clinic.id} open={selectedModal === `contact-clinic-${clinic.name}`} onOpenChange={() => setSelectedModal(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-red-600" />
                  Contact {clinic.name}
                </DialogTitle>
                <DialogDescription>
                  Send secure message to clinic about patient referrals
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-800 mb-2">Clinic Information</h4>
                  <div className="text-sm text-blue-700 space-y-1">
                    <div><strong>Region:</strong> {clinic.region || 'Montreal'}</div>
                    <div><strong>Specializations:</strong> {clinic.specializations.join(', ')}</div>
                    <div><strong>Available Slots:</strong> {clinic.capacity - clinic.currentPatients}</div>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Subject</label>
                  <input className="w-full mt-1 p-2 border rounded-md" placeholder="Enter message subject" />
                </div>
                <div>
                  <label className="text-sm font-medium">Message</label>
                  <textarea className="w-full mt-1 p-2 border rounded-md" rows={4} placeholder="Enter your message to the clinic..." />
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <Button variant="outline" onClick={() => setSelectedModal(null)}>Cancel</Button>
                <Button className="bg-red-600 hover:bg-red-700">Send Message</Button>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  )
} 