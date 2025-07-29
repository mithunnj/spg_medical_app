/**
 * Outbound Clinic Dashboard - Development Version
 * For clinic doctors to manage incoming patient discharge requests
 */

import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import IncomingRequestsTable from '@/components/IncomingRequestsTable'
import ClinicCapacityManager from '@/components/ClinicCapacityManager'
import { Building2, Users, ClipboardList, Settings, UserCheck } from 'lucide-react'

// 🚧 DEVELOPMENT MODE - Set to false in production
const BYPASS_AUTH_FOR_DEV = true

export default async function ClinicDashboard() {
  let session = null

  if (!BYPASS_AUTH_FOR_DEV) {
    session = await auth()
    // Check authentication and role
    if (!session || session.user.role !== 'CLINIC_DOCTOR') {
      redirect('/auth/signin')
    }
  } else {
    // Mock session for development
    session = {
      user: {
        name: 'Dr. Sarah Martinez',
        role: 'CLINIC_DOCTOR',
        email: 'sarah.martinez@montreal-clinic.ca',
        clinicId: 'clinic-1'
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-6 space-y-4 sm:space-y-0">
            <div className="space-y-1">
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                Clinic Dashboard
              </h1>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <p className="text-sm lg:text-base text-gray-600">
                  Welcome, Dr. {session.user.name}
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
                <Building2 className="h-4 w-4" />
                <span className="font-medium">Montreal Children's Clinic</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <UserCheck className="h-4 w-4" />
                <span>Clinic Doctor</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
          <Card>
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Requests</p>
                  <p className="text-2xl lg:text-3xl font-bold text-gray-900">7</p>
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
                  <p className="text-2xl lg:text-3xl font-bold text-green-600">12/50</p>
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
                  <p className="text-2xl lg:text-3xl font-bold text-blue-600">3</p>
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
                  <p className="text-2xl lg:text-3xl font-bold text-purple-600">76%</p>
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
                <IncomingRequestsTable />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg lg:text-xl">Clinic Capacity Management</CardTitle>
                <p className="text-sm text-gray-600">
                  Update your clinic's patient capacity and availability status
                </p>
              </CardHeader>
              <CardContent>
                <ClinicCapacityManager />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 