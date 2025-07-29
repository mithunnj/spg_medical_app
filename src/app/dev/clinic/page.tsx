"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import IncomingRequestsTable from '@/components/IncomingRequestsTable'
import ClinicCapacityManager from '@/components/ClinicCapacityManager'
import { Building2, Users, ClipboardList, Settings, UserCheck, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

// 🚧 DEVELOPMENT MODE - Set to false in production
const BYPASS_AUTH_FOR_DEV = true

// Mock clinic data with different scenarios
const clinicData = {
  'clinic-1': {
    name: 'Montreal Children&apos;s Clinic',
    doctor: 'Dr. Sarah Martinez',
    email: 'sarah.martinez@montreal-clinic.ca',
    pendingRequests: 7,
    capacity: 50,
    currentPatients: 38,
    availableSlots: 12,
    weeklyAccepted: 3,
    utilization: 76,
    status: 'Available'
  },
  'clinic-2': {
    name: 'Quebec Family Health Center',
    doctor: 'Dr. Jean-Pierre Dubois',
    email: 'jean.dubois@quebec-family.ca',
    pendingRequests: 4,
    capacity: 35,
    currentPatients: 28,
    availableSlots: 7,
    weeklyAccepted: 2,
    utilization: 80,
    status: 'Limited'
  },
  'clinic-3': {
    name: 'Laval Pediatric Associates',
    doctor: 'Dr. Marie-Claude Tremblay',
    email: 'marie.tremblay@laval-pediatrics.ca',
    pendingRequests: 12,
    capacity: 40,
    currentPatients: 35,
    availableSlots: 5,
    weeklyAccepted: 5,
    utilization: 88,
    status: 'Limited'
  },
  'clinic-4': {
    name: 'Montreal Pediatric Specialists',
    doctor: 'Dr. Ahmed Hassan',
    email: 'ahmed.hassan@montreal-specialists.ca',
    pendingRequests: 2,
    capacity: 60,
    currentPatients: 45,
    availableSlots: 15,
    weeklyAccepted: 1,
    utilization: 75,
    status: 'Available'
  },
  'clinic-5': {
    name: 'West Island Family Clinic',
    doctor: 'Dr. Jennifer O&apos;Connor',
    email: 'jennifer.oconnor@west-island.ca',
    pendingRequests: 9,
    capacity: 30,
    currentPatients: 25,
    availableSlots: 5,
    weeklyAccepted: 4,
    utilization: 83,
    status: 'Limited'
  }
}

export default function ClinicDashboard() {
  const [selectedClinic, setSelectedClinic] = useState('clinic-1')
  const [currentClinic, setCurrentClinic] = useState(clinicData['clinic-1'])

  // Update clinic data when selection changes
  useEffect(() => {
    setCurrentClinic(clinicData[selectedClinic as keyof typeof clinicData])
  }, [selectedClinic])

  // Mock session for development
  const session = {
    user: {
      name: currentClinic.doctor.replace('Dr. ', ''),
      role: 'CLINIC_DOCTOR',
      email: currentClinic.email,
      clinicId: selectedClinic
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center py-4 sm:py-6 space-y-4 lg:space-y-0">
            <div className="space-y-2">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Building2 className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent truncate">
                      Outbound Clinic Dashboard
                    </h1>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1 hidden sm:block">Patient referral management system</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <p className="text-sm lg:text-base text-gray-600 font-medium truncate">
                    Welcome, Dr. {session.user.name}
                  </p>
                </div>
                {BYPASS_AUTH_FOR_DEV && (
                  <Badge variant="outline" className="w-fit text-xs bg-yellow-50 text-yellow-700 border-yellow-300">
                    Development Mode
                  </Badge>
                )}
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 bg-gray-50 px-2 sm:px-3 py-1 sm:py-2 rounded-lg">
                <Building2 className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
                <span className="font-medium text-gray-700 truncate">{currentClinic.name}</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 bg-blue-50 px-2 sm:px-3 py-1 sm:py-2 rounded-lg">
                <UserCheck className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
                <span className="font-medium text-blue-700">Clinic Doctor</span>
              </div>
              <Link href="/dev">
                <Button variant="outline" size="sm" className="flex items-center gap-2 bg-white hover:bg-gray-50 text-xs sm:text-sm">
                  <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Back to Dev Home</span>
                  <span className="sm:hidden">Back</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {/* Active Clinic Selector */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Active Clinic</CardTitle>
            <p className="text-sm text-gray-600">
              Switch between different clinic views to manage patient requests and capacity
            </p>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <Select value={selectedClinic} onValueChange={setSelectedClinic}>
                <SelectTrigger className="w-full sm:w-80">
                  <SelectValue placeholder="Select a clinic..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="clinic-1">Montreal Children&apos;s Clinic</SelectItem>
                  <SelectItem value="clinic-2">Quebec Family Health Center</SelectItem>
                  <SelectItem value="clinic-3">Laval Pediatric Associates</SelectItem>
                  <SelectItem value="clinic-4">Montreal Pediatric Specialists</SelectItem>
                  <SelectItem value="clinic-5">West Island Family Clinic</SelectItem>
                </SelectContent>
              </Select>
              <Badge 
                variant="outline" 
                className={`${
                  currentClinic.status === 'Available' 
                    ? 'bg-green-50 text-green-700 border-green-200' 
                    : 'bg-orange-50 text-orange-700 border-orange-200'
                }`}
              >
                {currentClinic.status}
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
                  <p className="text-sm font-medium text-gray-600">Pending Requests</p>
                  <p className="text-2xl lg:text-3xl font-bold text-gray-900">{currentClinic.pendingRequests}</p>
                </div>
                <div className="p-2 bg-orange-100 rounded-lg">
                  <ClipboardList className="h-5 w-5 lg:h-6 lg:w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Available Capacity</p>
                  <p className="text-2xl lg:text-3xl font-bold text-green-600">{currentClinic.availableSlots}/{currentClinic.capacity}</p>
                </div>
                <div className="p-2 bg-green-100 rounded-lg">
                  <Users className="h-5 w-5 lg:h-6 lg:w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">This Week</p>
                  <p className="text-2xl lg:text-3xl font-bold text-blue-600">{currentClinic.weeklyAccepted}</p>
                  <p className="text-xs text-gray-500">Patients Accepted</p>
                </div>
                <div className="p-2 bg-blue-100 rounded-lg">
                  <UserCheck className="h-5 w-5 lg:h-6 lg:w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Utilization</p>
                  <p className="text-2xl lg:text-3xl font-bold text-purple-600">{currentClinic.utilization}%</p>
                </div>
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Settings className="h-5 w-5 lg:h-6 lg:w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs defaultValue="requests" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:grid-cols-2">
            <TabsTrigger value="requests" className="text-sm lg:text-base">
              Incoming Requests
            </TabsTrigger>
            <TabsTrigger value="settings" className="text-sm lg:text-base">
              Clinic Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="requests" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg lg:text-xl">Patient Discharge Requests</CardTitle>
                <p className="text-sm text-gray-600">
                  Review and manage incoming patient transfer requests from PICU departments
                </p>
              </CardHeader>
              <CardContent>
                <IncomingRequestsTable selectedClinic={selectedClinic} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg lg:text-xl">Clinic Capacity Management</CardTitle>
                <p className="text-sm text-gray-600">
                  Update your clinic&apos;s patient capacity and availability status
                </p>
              </CardHeader>
              <CardContent>
                <ClinicCapacityManager selectedClinic={selectedClinic} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 