import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Stethoscope, 
  Users, 
  MessageSquare, 
  FileText, 
  Calendar,
  Building2,
  ArrowLeft
} from 'lucide-react'
import PatientIntakeForm from '@/components/PatientIntakeForm'
import PatientTrackingTable from '@/components/PatientTrackingTable'

export default function DevPICUDashboard() {
  // Mock session for development
  const session = {
    user: {
      name: 'Matthew Donlan',
      role: 'HOSPITAL_DOCTOR',
      email: 'matthew.donlan@hospital.com'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-6 space-y-4 sm:space-y-0">
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <Stethoscope className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
                      PICU Dashboard
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">Intensive care patient management</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <p className="text-sm lg:text-base text-gray-600 font-medium">
                    Welcome, Dr. {session.user.name}
                  </p>
                </div>
                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300 w-fit text-xs">
                  Development Mode
                </Badge>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-gray-600 bg-red-50 px-3 py-2 rounded-lg">
                <Stethoscope className="h-4 w-4 text-red-600" />
                <span className="font-medium text-red-700">PICU Doctor</span>
              </div>
              <Link href="/dev">
                <Button variant="outline" size="sm" className="flex items-center gap-2 bg-white hover:bg-gray-50">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Dev Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Patients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                +2 from yesterday
              </p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Responses</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">
                Awaiting clinic feedback
              </p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Successful Matches</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">
                This month
              </p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Follow-ups Sent</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">
                Automated this week
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="patients" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 h-auto">
            <TabsTrigger value="patients" className="flex items-center justify-center space-x-2 py-3">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Patient Tracking</span>
              <span className="sm:hidden">Patients</span>
            </TabsTrigger>
            <TabsTrigger value="intake" className="flex items-center justify-center space-x-2 py-3">
              <Stethoscope className="h-4 w-4" />
              <span className="hidden sm:inline">New Patient Intake</span>
              <span className="sm:hidden">New Intake</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="patients" className="space-y-6">
            <Card className="shadow-sm">
              <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                  <CardTitle className="text-xl">Patient Tracking</CardTitle>
                  <Button variant="outline" size="sm" className="w-fit">
                    <FileText className="h-4 w-4 mr-2" />
                    Export Report
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <PatientTrackingTable />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="intake" className="space-y-6">
            <Card className="shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">New Patient Intake</CardTitle>
                <p className="text-sm text-gray-600 mt-2">
                  Add a new patient and initiate discharge coordination with outbound clinics
                </p>
              </CardHeader>
              <CardContent className="pt-0">
                <PatientIntakeForm />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 