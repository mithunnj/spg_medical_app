import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  UserPlus, 
  Users, 
  Clock, 
  CheckCircle, 
  MessageSquare,
  FileText,
  RefreshCw
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
            <div className="space-y-1">
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                PICU Dashboard
              </h1>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <p className="text-gray-600">
                  Welcome, Dr. {session.user.name}
                </p>
                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300 w-fit">
                  Development Mode
                </Badge>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                Pediatric ICU
              </Badge>
              <Button variant="outline" size="sm" className="w-fit">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
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
              <Clock className="h-4 w-4 text-muted-foreground" />
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
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
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
              <UserPlus className="h-4 w-4" />
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