import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  UserPlus, 
  Users, 
  Clock, 
  CheckCircle, 
  XCircle, 
  MessageSquare,
  FileText,
  RefreshCw
} from 'lucide-react'
import PatientIntakeForm from '@/components/PatientIntakeForm'
import PatientTrackingTable from '@/components/PatientTrackingTable'

// 🚧 DEVELOPMENT MODE - Set to false in production
const BYPASS_AUTH_FOR_DEV = true

export default async function HospitalDashboard() {
  let session = null
  
  if (!BYPASS_AUTH_FOR_DEV) {
    session = await auth()
    // Check authentication and role
    if (!session || session.user.role !== 'HOSPITAL_DOCTOR') {
      redirect('/auth/signin')
    }
  } else {
    // Mock session for development
    session = {
      user: {
        name: 'Dr. Development User',
        role: 'HOSPITAL_DOCTOR',
        email: 'dev@hospital.com'
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                PICU Dashboard
              </h1>
              <p className="text-gray-600">
                Welcome, Dr. {session.user.name}
                {BYPASS_AUTH_FOR_DEV && (
                  <Badge variant="outline" className="ml-2 bg-yellow-50 text-yellow-700">
                    Development Mode
                  </Badge>
                )}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                Pediatric ICU
              </Badge>
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
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
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Responses</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">
                Awaiting clinic feedback
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Successful Matches</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">
                This month
              </p>
            </CardContent>
          </Card>
          
          <Card>
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
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="patients" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Patient Tracking</span>
            </TabsTrigger>
            <TabsTrigger value="intake" className="flex items-center space-x-2">
              <UserPlus className="h-4 w-4" />
              <span>New Patient Intake</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="patients" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Patient Tracking</CardTitle>
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    Export Report
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <PatientTrackingTable />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="intake" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>New Patient Intake</CardTitle>
                <p className="text-sm text-gray-600">
                  Add a new patient and initiate discharge coordination with outbound clinics
                </p>
              </CardHeader>
              <CardContent>
                <PatientIntakeForm />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 