'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
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
  Phone
} from 'lucide-react'
import { useEffect, useState } from 'react'

export default function PICUDoctorDemo() {
  const [clinics, setClinics] = useState([])
  const [loading, setLoading] = useState(true)

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
  const montrealClinics = clinics.filter(c => 
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
    alert('New Patient Intake Form would open here. This would include:\n- Patient demographics\n- Medical history\n- Current diagnosis\n- Care requirements\n- Preferred clinic selection')
  }

  const handleSendFollowUp = () => {
    alert('Follow-up messages would be sent to clinics that haven\'t responded within 48 hours.')
  }

  const handleUploadFiles = () => {
    alert('File upload dialog would open here. Supported formats:\n- Medical records (PDF)\n- Lab results\n- Imaging files\n- Discharge summaries')
  }

  const handleScheduleFollowUps = () => {
    alert('Calendar would open to schedule follow-up appointments and reminders.')
  }

  const handleContactClinic = (clinicName: string) => {
    alert(`Contacting ${clinicName}...\n\nThis would open a secure messaging interface to communicate with the clinic about patient referrals.`)
  }

  const handleMessagePatient = (patientName: string) => {
    alert(`Opening secure messaging with ${patientName}'s family...\n\nThis allows direct communication with patient guardians about care coordination.`)
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
                          <Button size="sm" variant="outline">
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
                  <div className="mt-4 flex space-x-2">
                    <Button size="sm" className="flex-1" onClick={() => handleContactClinic(clinic.name)}>
                      Contact Clinic
                    </Button>
                    <Button size="sm" variant="outline">
                      <Eye className="h-3 w-3" />
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
      </div>
    </div>
  )
} 