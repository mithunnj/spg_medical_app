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
  Lock,
  Download
} from 'lucide-react'
import { useState } from 'react'

export default function AdminDashboardDemo() {
  const [selectedModal, setSelectedModal] = useState<string | null>(null)
  
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
      role: 'HOSPITAL_DOCTOR',
      action: 'Patient file uploaded',
      timestamp: '2024-01-16 15:30',
      ipAddress: '192.168.1.100',
      status: 'SUCCESS'
    },
    {
      id: '2',
      user: 'Dr. Robert Wilson',
      role: 'CLINIC_DOCTOR',
      action: 'Patient request approved',
      timestamp: '2024-01-16 14:45',
      ipAddress: '192.168.1.101',
      status: 'SUCCESS'
    },
    {
      id: '3',
      user: 'Maria Rodriguez',
      role: 'PARENT',
      action: 'Message sent to care team',
      timestamp: '2024-01-16 13:20',
      ipAddress: '192.168.1.102',
      status: 'SUCCESS'
    },
    {
      id: '4',
      user: 'Dr. Jennifer Lee',
      role: 'CLINIC_DOCTOR',
      action: 'Account access requested',
      timestamp: '2024-01-16 12:15',
      ipAddress: '192.168.1.103',
      status: 'PENDING'
    },
    {
      id: '5',
      user: 'Dr. Matthew Donlan',
      role: 'HOSPITAL_DOCTOR',
      action: 'Patient records accessed',
      timestamp: '2024-01-16 11:30',
      ipAddress: '192.168.1.104',
      status: 'SUCCESS'
    },
    {
      id: '6',
      user: 'Dr. Emily Chen',
      role: 'CLINIC_DOCTOR',
      action: 'Clinic capacity updated',
      timestamp: '2024-01-16 10:45',
      ipAddress: '192.168.1.105',
      status: 'SUCCESS'
    }
  ]

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'HOSPITAL_DOCTOR':
        return 'bg-blue-100 text-blue-800'
      case 'CLINIC_DOCTOR':
        return 'bg-green-100 text-green-800'
      case 'PARENT':
        return 'bg-purple-100 text-purple-800'
      case 'ADMIN':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-100 text-green-800'
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800'
      case 'INACTIVE':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getAuditStatusColor = (status: string) => {
    switch (status) {
      case 'SUCCESS':
        return 'bg-green-100 text-green-800'
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800'
      case 'FAILED':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const handleAddUser = () => {
    setSelectedModal('add-user')
  }

  const handleEditUser = (userId: string) => {
    setSelectedModal(`edit-user-${userId}`)
  }

  const handleDeleteUser = (userId: string) => {
    setSelectedModal(`delete-user-${userId}`)
  }

  const handleViewUser = (userId: string) => {
    setSelectedModal(`view-user-${userId}`)
  }

  const handleSystemSettings = () => {
    setSelectedModal('system-settings')
  }

  const handleSecurityAudit = () => {
    setSelectedModal('security-audit')
  }

  const handleDataBackup = () => {
    setSelectedModal('data-backup')
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
                <h1 className="text-2xl font-bold text-gray-900 bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent flex items-center space-x-3">
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
          <Button className="bg-orange-600 hover:bg-orange-700" onClick={handleAddUser}>
            <UserPlus className="h-4 w-4 mr-2" />
            Add New User
          </Button>
          <Button variant="outline" onClick={handleSystemSettings}>
            <Settings className="h-4 w-4 mr-2" />
            System Settings
          </Button>
          <Button variant="outline" onClick={handleSecurityAudit}>
            <Shield className="h-4 w-4 mr-2" />
            Security Audit
          </Button>
          <Button variant="outline" onClick={handleDataBackup}>
            <Database className="h-4 w-4 mr-2" />
            Data Backup
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
            <div className="space-y-4">
              {mockUsers.map((user) => (
                <div key={user.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-gray-900">{user.name}</h3>
                        <Badge className={`text-xs ${getRoleColor(user.role)}`}>
                          {user.role.replace('_', ' ')}
                        </Badge>
                        <Badge className={`text-xs ${getStatusColor(user.status)}`}>
                          {user.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div><strong>Email:</strong> {user.email}</div>
                        <div><strong>Last Login:</strong> {user.lastLogin}</div>
                        {user.hospital && <div><strong>Hospital:</strong> {user.hospital}</div>}
                        {user.clinic && <div><strong>Clinic:</strong> {user.clinic}</div>}
                        {user.licenseNumber && <div><strong>License:</strong> {user.licenseNumber}</div>}
                        {user.children && <div><strong>Children:</strong> {user.children.join(', ')}</div>}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" onClick={() => handleViewUser(user.id)}>
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleEditUser(user.id)}>
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-600 border-red-300 hover:bg-red-50" onClick={() => handleDeleteUser(user.id)}>
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Audit Logs */}
        <Card className="bg-white shadow-sm mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Recent Audit Logs</span>
              <Badge variant="outline" className="bg-gray-50 text-gray-700">
                {mockAuditLogs.length} Entries
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockAuditLogs.map((log) => (
                <div key={log.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div>
                        <span className="font-medium text-gray-900">{log.user}</span>
                        <Badge className={`text-xs ml-2 ${getRoleColor(log.role)}`}>
                          {log.role.replace('_', ' ')}
                        </Badge>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{log.timestamp}</span>
                  </div>
                  <div className="mb-2">
                    <p className="text-sm text-gray-600">{log.action}</p>
                    <p className="text-xs text-gray-500">IP: {log.ipAddress}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge className={`text-xs ${getAuditStatusColor(log.status)}`}>
                      {log.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Demo Features Highlight */}
        <div className="mt-8 bg-orange-50 border border-orange-200 rounded-xl p-6">
          <h3 className="font-semibold text-orange-900 mb-4 flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            Admin Dashboard Features Demonstrated
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-orange-800 text-sm">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-orange-600" />
                <span>User management and role assignment</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-orange-600" />
                <span>System monitoring and statistics</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-orange-600" />
                <span>Security audit logging</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-orange-600" />
                <span>HIPAA compliance monitoring</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-orange-600" />
                <span>Access control and permissions</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-orange-600" />
                <span>System backup and recovery</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <Dialog open={selectedModal === 'add-user'} onOpenChange={() => setSelectedModal(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5 text-orange-600" />
              Add New User
            </DialogTitle>
            <DialogDescription>
              Create a new user account with appropriate role and permissions
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Full Name</label>
                <input className="w-full mt-1 p-2 border rounded-md" placeholder="Enter full name" />
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <input className="w-full mt-1 p-2 border rounded-md" type="email" placeholder="Enter email" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Role</label>
                <select className="w-full mt-1 p-2 border rounded-md">
                  <option>HOSPITAL_DOCTOR</option>
                  <option>CLINIC_DOCTOR</option>
                  <option>PARENT</option>
                  <option>ADMIN</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">License Number</label>
                <input className="w-full mt-1 p-2 border rounded-md" placeholder="QC-XXXXX" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Organization</label>
              <input className="w-full mt-1 p-2 border rounded-md" placeholder="Hospital or clinic name" />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="send-email" defaultChecked />
              <label htmlFor="send-email" className="text-sm">Send welcome email</label>
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <Button variant="outline" onClick={() => setSelectedModal(null)}>Cancel</Button>
            <Button className="bg-orange-600 hover:bg-orange-700">Create User</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={selectedModal === 'system-settings'} onOpenChange={() => setSelectedModal(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-orange-600" />
              System Settings
            </DialogTitle>
            <DialogDescription>
              Configure system-wide settings and preferences
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Session Timeout (minutes)</label>
              <input className="w-full mt-1 p-2 border rounded-md" type="number" defaultValue={30} />
            </div>
            <div>
              <label className="text-sm font-medium">Max File Upload Size (MB)</label>
              <input className="w-full mt-1 p-2 border rounded-md" type="number" defaultValue={50} />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="two-factor" defaultChecked />
              <label htmlFor="two-factor" className="text-sm">Require two-factor authentication</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="audit-logging" defaultChecked />
              <label htmlFor="audit-logging" className="text-sm">Enable detailed audit logging</label>
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <Button variant="outline" onClick={() => setSelectedModal(null)}>Cancel</Button>
            <Button className="bg-orange-600 hover:bg-orange-700">Save Settings</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={selectedModal === 'security-audit'} onOpenChange={() => setSelectedModal(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-orange-600" />
              Security Audit Report
            </DialogTitle>
            <DialogDescription>
              Review system security status and compliance
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-medium text-green-800 mb-2">Security Status: EXCELLENT</h4>
              <div className="text-sm text-green-700 space-y-1">
                <div>✓ All users have strong passwords</div>
                <div>✓ Two-factor authentication enabled</div>
                <div>✓ HIPAA compliance verified</div>
                <div>✓ Data encryption active</div>
                <div>✓ No security incidents detected</div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Recommendations</h4>
              <div className="text-sm text-gray-700 space-y-1">
                <div>• Schedule quarterly security reviews</div>
                <div>• Update user access permissions monthly</div>
                <div>• Monitor login attempts for suspicious activity</div>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <Button variant="outline" onClick={() => setSelectedModal(null)}>Close</Button>
            <Button className="bg-orange-600 hover:bg-orange-700">Generate Report</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={selectedModal === 'data-backup'} onOpenChange={() => setSelectedModal(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Database className="h-5 w-5 text-orange-600" />
              Data Backup & Recovery
            </DialogTitle>
            <DialogDescription>
              Manage system backups and data recovery options
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-800 mb-2">Last Backup: 2024-01-16 02:00 AM</h4>
              <div className="text-sm text-blue-700 space-y-1">
                <div>✓ Patient records backed up</div>
                <div>✓ User accounts secured</div>
                <div>✓ Audit logs preserved</div>
                <div>✓ System configuration saved</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline">
                <Database className="h-4 w-4 mr-2" />
                Create Backup
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download Backup
              </Button>
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <Button variant="outline" onClick={() => setSelectedModal(null)}>Close</Button>
            <Button className="bg-orange-600 hover:bg-orange-700">Schedule Backup</Button>
          </div>
        </DialogContent>
      </Dialog>

      {mockUsers.map(user => (
        <Dialog key={user.id} open={selectedModal === `view-user-${user.id}`} onOpenChange={() => setSelectedModal(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-orange-600" />
                User Details: {user.name}
              </DialogTitle>
              <DialogDescription>
                View comprehensive user information and activity
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <h4 className="font-medium text-orange-800 mb-2">User Information</h4>
                  <div className="text-sm text-orange-700 space-y-1">
                    <div><strong>Name:</strong> {user.name}</div>
                    <div><strong>Email:</strong> {user.email}</div>
                    <div><strong>Role:</strong> {user.role.replace('_', ' ')}</div>
                    <div><strong>Status:</strong> {user.status}</div>
                  </div>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-800 mb-2">Account Details</h4>
                  <div className="text-sm text-gray-700 space-y-1">
                    <div><strong>Last Login:</strong> {user.lastLogin}</div>
                    {user.hospital && <div><strong>Hospital:</strong> {user.hospital}</div>}
                    {user.clinic && <div><strong>Clinic:</strong> {user.clinic}</div>}
                    {user.licenseNumber && <div><strong>License:</strong> {user.licenseNumber}</div>}
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setSelectedModal(null)}>Close</Button>
                <Button className="bg-orange-600 hover:bg-orange-700">Edit User</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      ))}

      {mockUsers.map(user => (
        <Dialog key={user.id} open={selectedModal === `edit-user-${user.id}`} onOpenChange={() => setSelectedModal(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Edit className="h-5 w-5 text-orange-600" />
                Edit User: {user.name}
              </DialogTitle>
              <DialogDescription>
                Update user information and permissions
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Full Name</label>
                  <input className="w-full mt-1 p-2 border rounded-md" defaultValue={user.name} />
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <input className="w-full mt-1 p-2 border rounded-md" type="email" defaultValue={user.email} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Role</label>
                  <select className="w-full mt-1 p-2 border rounded-md" defaultValue={user.role}>
                    <option value="HOSPITAL_DOCTOR">HOSPITAL_DOCTOR</option>
                    <option value="CLINIC_DOCTOR">CLINIC_DOCTOR</option>
                    <option value="PARENT">PARENT</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Status</label>
                  <select className="w-full mt-1 p-2 border rounded-md" defaultValue={user.status}>
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="PENDING">PENDING</option>
                    <option value="INACTIVE">INACTIVE</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setSelectedModal(null)}>Cancel</Button>
              <Button className="bg-orange-600 hover:bg-orange-700">Save Changes</Button>
            </div>
          </DialogContent>
        </Dialog>
      ))}

      {mockUsers.map(user => (
        <Dialog key={user.id} open={selectedModal === `delete-user-${user.id}`} onOpenChange={() => setSelectedModal(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Trash2 className="h-5 w-5 text-red-600" />
                Delete User: {user.name}
              </DialogTitle>
              <DialogDescription>
                This action cannot be undone. All user data will be permanently deleted.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-medium text-red-800 mb-2">Warning</h4>
                <div className="text-sm text-red-700 space-y-1">
                  <div>• User account will be permanently removed</div>
                  <div>• All associated data will be deleted</div>
                  <div>• This action cannot be reversed</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="confirm-delete" />
                <label htmlFor="confirm-delete" className="text-sm">I understand and want to delete this user</label>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setSelectedModal(null)}>Cancel</Button>
              <Button className="bg-red-600 hover:bg-red-700">Delete User</Button>
            </div>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  )
} 