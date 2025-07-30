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
  Eye
} from 'lucide-react'

export default function PICUDoctorDemo() {
  const mockPatients = [
    {
      id: '1',
      name: 'Emma Rodriguez',
      age: '8 years',
      diagnosis: 'Severe asthma exacerbation',
      status: 'PENDING',
      clinic: 'Downtown Family Medicine',
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

  const mockClinics = [
    {
      id: '1',
      name: 'Downtown Family Medicine',
      region: 'Montreal Central',
      specializations: ['Pediatrics', 'Family Medicine'],
      capacity: 15,
      available: 3,
      responseTime: '2.1 days'
    },
    {
      id: '2',
      name: 'West Island Pediatrics',
      region: 'West Island',
      specializations: ['Pediatrics', 'Adolescent Medicine'],
      capacity: 12,
      available: 5,
      responseTime: '1.8 days'
    },
    {
      id: '3',
      name: 'Montreal Children\'s Cardiology',
      region: 'Montreal Central',
      specializations: ['Cardiology', 'Pediatric Cardiology'],
      capacity: 8,
      available: 1,
      responseTime: '3.2 days'
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
                <p className="text-gray-600">Patient discharge coordination and clinic management</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300">
                <Eye className="h-4 w-4 mr-2" />
                Demo Mode
              </Badge>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">
                Dr. Sarah Johnson
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
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            New Patient Intake
          </Button>
          <Button variant="outline">
            <MessageSquare className="h-4 w-4 mr-2" />
            Send Follow-up Messages
          </Button>
          <Button variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            Upload Patient Files
          </Button>
          <Button variant="outline">
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
                          <Button size="sm" variant="outline">
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
                {mockClinics.length} Clinics Available
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mockClinics.map((clinic) => (
                <div key={clinic.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">{clinic.name}</h3>
                    <Badge variant="outline" className="bg-green-100 text-green-700">
                      {clinic.available} slots
                    </Badge>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div><strong>Region:</strong> {clinic.region}</div>
                    <div><strong>Specializations:</strong> {clinic.specializations.join(', ')}</div>
                    <div><strong>Capacity:</strong> {clinic.capacity} patients</div>
                    <div><strong>Avg Response:</strong> {clinic.responseTime}</div>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <Button size="sm" className="flex-1">
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
                <span>Patient intake and documentation forms</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Real-time patient tracking dashboard</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Clinic selection and contact system</span>
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