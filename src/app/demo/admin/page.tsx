import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Settings,
  Users,
  TrendingUp,
  Shield,
  Eye,
  Edit,
  Trash2,
  ArrowLeft,
  Activity,
  AlertCircle,
  CheckCircle,
  BarChart3,
  UserPlus,
  Key,
  Database,
  Lock
} from 'lucide-react'

export default function AdminDashboardDemo() {
  const mockUsers = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@thechildren.com',
      role: 'HOSPITAL_DOCTOR',
      status: 'ACTIVE',
      lastLogin: '2024-01-16 14:30',
      hospital: 'Montreal Children\'s Hospital',
      licenseNumber: 'QC-12345'
    },
    {
      id: '2',
      name: 'Dr. Robert Wilson',
      email: 'robert.wilson@familymed-downtown.ca',
      role: 'CLINIC_DOCTOR',
      status: 'ACTIVE',
      lastLogin: '2024-01-16 12:15',
      clinic: 'Downtown Family Medicine',
      licenseNumber: 'QC-67890'
    },
    {
      id: '3',
      name: 'Maria Rodriguez',
      email: 'maria.rodriguez@example.com',
      role: 'PARENT',
      status: 'ACTIVE',
      lastLogin: '2024-01-16 09:45',
      children: ['Emma Rodriguez', 'Lucas Chen']
    },
    {
      id: '4',
      name: 'Dr. Jennifer Lee',
      email: 'jennifer.lee@westisland-pediatrics.ca',
      role: 'CLINIC_DOCTOR',
      status: 'PENDING',
      lastLogin: 'Never',
      clinic: 'West Island Pediatrics',
      licenseNumber: 'QC-11111'
    }
  ]

  const mockSystemStats = {
    totalUsers: 156,
    activeSessions: 23,
    systemUptime: '99.8%',
    securityIncidents: 0,
    totalPatients: 89,
    successfulMatches: 67,
    avgResponseTime: '2.1 days',
    dataEncryption: '100%'
  }

  const mockAuditLogs = [
    {
      id: '1',
      user: 'Dr. Sarah Johnson',
      action: 'Patient file uploaded',
      timestamp: '2024-01-16 15:30',
      ipAddress: '192.168.1.100',
      status: 'SUCCESS'
    },
    {
      id: '2',
      user: 'Dr. Robert Wilson',
      action: 'Patient request approved',
      timestamp: '2024-01-16 14:45',
      ipAddress: '192.168.1.101',
      status: 'SUCCESS'
    },
    {
      id: '3',
      user: 'Maria Rodriguez',
      action: 'Message sent to care team',
      timestamp: '2024-01-16 13:20',
      ipAddress: '192.168.1.102',
      status: 'SUCCESS'
    },
    {
      id: '4',
      user: 'Unknown',
      action: 'Failed login attempt',
      timestamp: '2024-01-16 12:15',
      ipAddress: '192.168.1.103',
      status: 'FAILED'
    }
  ]

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'HOSPITAL_DOCTOR': return 'bg-blue-100 text-blue-800'
      case 'CLINIC_DOCTOR': return 'bg-green-100 text-green-800'
      case 'PARENT': return 'bg-purple-100 text-purple-800'
      case 'ADMIN': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-green-100 text-green-800'
      case 'PENDING': return 'bg-yellow-100 text-yellow-800'
      case 'INACTIVE': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getAuditStatusColor = (status: string) => {
    switch (status) {
      case 'SUCCESS': return 'bg-green-100 text-green-800'
      case 'FAILED': return 'bg-red-100 text-red-800'
      case 'WARNING': return 'bg-yellow-100 text-yellow-800'
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
                  <Settings className="h-8 w-8 text-orange-600" />
                  <span>Administrative Dashboard</span>
                </h1>
                <p className="text-gray-600">System management and user administration</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-300">
                <Eye className="h-4 w-4 mr-2" />
                Demo Mode
              </Badge>
              <Badge variant="outline" className="bg-red-50 text-red-700 border-red-300">
                <Shield className="h-4 w-4 mr-2" />
                Admin Access
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* System Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900">{mockSystemStats.totalUsers}</p>
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
                  <p className="text-sm font-medium text-gray-600">Active Sessions</p>
                  <p className="text-2xl font-bold text-gray-900">{mockSystemStats.activeSessions}</p>
                </div>
                <div className="bg-green-100 p-3 rounded-lg">
                  <Activity className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">System Uptime</p>
                  <p className="text-2xl font-bold text-gray-900">{mockSystemStats.systemUptime}</p>
                </div>
                <div className="bg-purple-100 p-3 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Security Incidents</p>
                  <p className="text-2xl font-bold text-gray-900">{mockSystemStats.securityIncidents}</p>
                </div>
                <div className="bg-red-100 p-3 rounded-lg">
                  <Shield className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Button className="bg-orange-600 hover:bg-orange-700">
            <UserPlus className="h-4 w-4 mr-2" />
            Add New User
          </Button>
          <Button variant="outline">
            <Key className="h-4 w-4 mr-2" />
            Manage Permissions
          </Button>
          <Button variant="outline">
            <Database className="h-4 w-4 mr-2" />
            System Backup
          </Button>
          <Button variant="outline">
            <BarChart3 className="h-4 w-4 mr-2" />
            Generate Reports
          </Button>
        </div>

        {/* User Management */}
        <Card className="bg-white shadow-sm mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>User Management</span>
              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                {mockUsers.length} Users
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">User</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Role</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Last Login</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockUsers.map((user) => (
                    <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div>
                          <div className="font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                          {user.licenseNumber && (
                            <div className="text-xs text-gray-400">License: {user.licenseNumber}</div>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={`text-xs ${getRoleColor(user.role)}`}>
                          {user.role.replace('_', ' ')}
                        </Badge>
                        {user.hospital && (
                          <div className="text-xs text-gray-500 mt-1">{user.hospital}</div>
                        )}
                        {user.clinic && (
                          <div className="text-xs text-gray-500 mt-1">{user.clinic}</div>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={`text-xs ${getStatusColor(user.status)}`}>
                          {user.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        {user.lastLogin}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Edit className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                          <Button size="sm" variant="outline">
                            <Key className="h-3 w-3 mr-1" />
                            Permissions
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-600 border-red-300 hover:bg-red-50">
                            <Trash2 className="h-3 w-3 mr-1" />
                            Delete
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

        {/* System Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Platform Analytics</span>
                <BarChart3 className="h-5 w-5 text-blue-600" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <span className="font-medium text-blue-900">Total Patients</span>
                  <span className="text-xl font-bold text-blue-900">{mockSystemStats.totalPatients}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="font-medium text-green-900">Successful Matches</span>
                  <span className="text-xl font-bold text-green-900">{mockSystemStats.successfulMatches}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <span className="font-medium text-purple-900">Avg Response Time</span>
                  <span className="text-xl font-bold text-purple-900">{mockSystemStats.avgResponseTime}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                  <span className="font-medium text-orange-900">Data Encryption</span>
                  <span className="text-xl font-bold text-orange-900">{mockSystemStats.dataEncryption}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Security Overview</span>
                <Shield className="h-5 w-5 text-green-600" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <div className="font-medium text-green-900">HIPAA Compliance</div>
                    <div className="text-sm text-green-700">All data encrypted and secure</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <Lock className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="font-medium text-blue-900">Access Control</div>
                    <div className="text-sm text-blue-700">Role-based permissions active</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                  <Activity className="h-5 w-5 text-purple-600" />
                  <div>
                    <div className="font-medium text-purple-900">Audit Logging</div>
                    <div className="text-sm text-purple-700">All actions tracked and logged</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-yellow-600" />
                  <div>
                    <div className="font-medium text-yellow-900">Security Alerts</div>
                    <div className="text-sm text-yellow-700">Real-time monitoring active</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Audit Logs */}
        <Card className="bg-white shadow-sm mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Recent Audit Logs</span>
              <Badge variant="outline" className="bg-gray-50 text-gray-700">
                {mockAuditLogs.length} Logs
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockAuditLogs.map((log) => (
                <div key={log.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900">{log.user}</span>
                      <Badge className={`text-xs ${getAuditStatusColor(log.status)}`}>
                        {log.status}
                      </Badge>
                    </div>
                    <span className="text-sm text-gray-500">{log.timestamp}</span>
                  </div>
                  <div className="mb-2">
                    <div className="text-sm text-gray-600">{log.action}</div>
                    <div className="text-xs text-gray-500">IP: {log.ipAddress}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Demo Features Highlight */}
        <div className="mt-8 bg-orange-50 border border-orange-200 rounded-xl p-6">
          <h3 className="font-semibold text-orange-900 mb-4 flex items-center">
            <Settings className="h-5 w-5 mr-2" />
            Admin Dashboard Features Demonstrated
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-orange-800 text-sm">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>User access management</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Role-based permissions</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>System analytics and reporting</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Audit trail monitoring</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Performance metrics</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Compliance oversight</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 