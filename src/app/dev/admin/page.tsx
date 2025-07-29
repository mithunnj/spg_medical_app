'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Users, 
  Shield, 
  UserPlus, 
  ArrowLeft,
  Search,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react'

interface User {
  id: string
  name: string
  email: string
  role: 'ADMIN' | 'HOSPITAL_DOCTOR' | 'CLINIC_DOCTOR' | 'PARENT'
  status: 'ACTIVE' | 'INACTIVE' | 'PENDING'
  lastActive: string
  createdAt: string
  organization: string
}

interface RoleRequest {
  id: string
  userEmail: string
  requestedRole: 'HOSPITAL_DOCTOR' | 'CLINIC_DOCTOR' | 'PARENT'
  status: 'PENDING' | 'APPROVED' | 'DENIED'
  requestedAt: string
  organization: string
  reason: string
}

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@hospital.com',
      role: 'HOSPITAL_DOCTOR',
      status: 'ACTIVE',
      lastActive: '2025-01-31T10:30:00Z',
      createdAt: '2024-12-15T09:00:00Z',
      organization: 'Montreal Children\'s Hospital'
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      email: 'michael.chen@clinic.com',
      role: 'CLINIC_DOCTOR',
      status: 'ACTIVE',
      lastActive: '2025-01-31T14:20:00Z',
      createdAt: '2024-12-20T11:30:00Z',
      organization: 'Pediatric Specialists Clinic'
    },
    {
      id: '3',
      name: 'Maria Johnson',
      email: 'maria.johnson@email.com',
      role: 'PARENT',
      status: 'ACTIVE',
      lastActive: '2025-01-31T16:45:00Z',
      createdAt: '2025-01-15T08:15:00Z',
      organization: 'Patient Family'
    },
    {
      id: '4',
      name: 'Dr. Emily Rodriguez',
      email: 'emily.rodriguez@hospital.com',
      role: 'HOSPITAL_DOCTOR',
      status: 'PENDING',
      lastActive: '2025-01-30T12:00:00Z',
      createdAt: '2025-01-28T10:00:00Z',
      organization: 'Royal Victoria Hospital'
    },
    {
      id: '5',
      name: 'Dr. James Wilson',
      email: 'james.wilson@clinic.com',
      role: 'CLINIC_DOCTOR',
      status: 'INACTIVE',
      lastActive: '2025-01-25T09:15:00Z',
      createdAt: '2024-11-10T14:20:00Z',
      organization: 'Community Health Clinic'
    }
  ])

  const [roleRequests, setRoleRequests] = useState<RoleRequest[]>([
    {
      id: '1',
      userEmail: 'dr.newton@hospital.com',
      requestedRole: 'HOSPITAL_DOCTOR',
      status: 'PENDING',
      requestedAt: '2025-01-31T08:00:00Z',
      organization: 'McGill University Health Centre',
      reason: 'New PICU attending physician joining the team'
    },
    {
      id: '2',
      userEmail: 'clinic.manager@pediatrics.com',
      requestedRole: 'CLINIC_DOCTOR',
      status: 'PENDING',
      requestedAt: '2025-01-30T15:30:00Z',
      organization: 'Advanced Pediatric Care',
      reason: 'New pediatric clinic opening in Laval'
    },
    {
      id: '3',
      userEmail: 'parent.smith@email.com',
      requestedRole: 'PARENT',
      status: 'APPROVED',
      requestedAt: '2025-01-29T11:20:00Z',
      organization: 'Patient Family',
      reason: 'Parent of patient requiring ongoing care coordination'
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState<string>('ALL')
  const [statusFilter, setStatusFilter] = useState<string>('ALL')

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'ADMIN': return 'bg-red-100 text-red-800'
      case 'HOSPITAL_DOCTOR': return 'bg-blue-100 text-blue-800'
      case 'CLINIC_DOCTOR': return 'bg-green-100 text-green-800'
      case 'PARENT': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-green-100 text-green-800'
      case 'INACTIVE': return 'bg-gray-100 text-gray-800'
      case 'PENDING': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getRequestStatusColor = (status: string) => {
    switch (status) {
      case 'APPROVED': return 'bg-green-100 text-green-800'
      case 'DENIED': return 'bg-red-100 text-red-800'
      case 'PENDING': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.organization.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === 'ALL' || user.role === roleFilter
    const matchesStatus = statusFilter === 'ALL' || user.status === statusFilter
    return matchesSearch && matchesRole && matchesStatus
  })

  const handleApproveRequest = (requestId: string) => {
    setRoleRequests(prev => prev.map(req => 
      req.id === requestId ? { ...req, status: 'APPROVED' as const } : req
    ))
  }

  const handleDenyRequest = (requestId: string) => {
    setRoleRequests(prev => prev.map(req => 
      req.id === requestId ? { ...req, status: 'DENIED' as const } : req
    ))
  }

  const handleUpdateUserRole = (userId: string, newRole: 'ADMIN' | 'HOSPITAL_DOCTOR' | 'CLINIC_DOCTOR' | 'PARENT') => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    ))
  }

  const handleUpdateUserStatus = (userId: string, newStatus: 'ACTIVE' | 'INACTIVE' | 'PENDING') => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center py-4 sm:py-6 space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent">
                  Admin Dashboard
                </h1>
                <p className="text-sm lg:text-base text-gray-600 hidden sm:block">
                  User management and role administration
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-sm lg:text-base text-gray-600">
                Welcome, Administrator
              </div>
              <Badge className="bg-orange-100 text-orange-600 text-xs sm:text-sm">
                Admin
              </Badge>
              <Button variant="outline" size="sm" asChild>
                <a href="/dev">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Back to Dev Home</span>
                  <span className="sm:hidden">Back</span>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="requests">Role Requests</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* User Management Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>User Management</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={roleFilter} onValueChange={setRoleFilter}>
                    <SelectTrigger className="w-full sm:w-48">
                      <SelectValue placeholder="Filter by role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ALL">All Roles</SelectItem>
                      <SelectItem value="ADMIN">Admin</SelectItem>
                      <SelectItem value="HOSPITAL_DOCTOR">Hospital Doctor</SelectItem>
                      <SelectItem value="CLINIC_DOCTOR">Clinic Doctor</SelectItem>
                      <SelectItem value="PARENT">Parent</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-48">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ALL">All Status</SelectItem>
                      <SelectItem value="ACTIVE">Active</SelectItem>
                      <SelectItem value="INACTIVE">Inactive</SelectItem>
                      <SelectItem value="PENDING">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Users Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium">User</th>
                        <th className="text-left py-3 px-4 font-medium">Role</th>
                        <th className="text-left py-3 px-4 font-medium">Status</th>
                        <th className="text-left py-3 px-4 font-medium">Organization</th>
                        <th className="text-left py-3 px-4 font-medium">Last Active</th>
                        <th className="text-left py-3 px-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user) => (
                        <tr key={user.id} className="border-b hover:bg-gray-50">
                          <td className="py-4 px-4">
                            <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <Badge className={getRoleColor(user.role)}>
                              {user.role.replace('_', ' ')}
                            </Badge>
                          </td>
                          <td className="py-4 px-4">
                            <Badge className={getStatusColor(user.status)}>
                              {user.status}
                            </Badge>
                          </td>
                          <td className="py-4 px-4 text-sm">{user.organization}</td>
                          <td className="py-4 px-4 text-sm">
                            {new Date(user.lastActive).toLocaleDateString()}
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex space-x-2">
                              <Select
                                value={user.role}
                                onValueChange={(value) => handleUpdateUserRole(user.id, value as 'ADMIN' | 'HOSPITAL_DOCTOR' | 'CLINIC_DOCTOR' | 'PARENT')}
                              >
                                <SelectTrigger className="w-32">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="ADMIN">Admin</SelectItem>
                                  <SelectItem value="HOSPITAL_DOCTOR">Hospital Doctor</SelectItem>
                                  <SelectItem value="CLINIC_DOCTOR">Clinic Doctor</SelectItem>
                                  <SelectItem value="PARENT">Parent</SelectItem>
                                </SelectContent>
                              </Select>
                              <Select
                                value={user.status}
                                onValueChange={(value) => handleUpdateUserStatus(user.id, value as 'ACTIVE' | 'INACTIVE' | 'PENDING')}
                              >
                                <SelectTrigger className="w-24">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="ACTIVE">Active</SelectItem>
                                  <SelectItem value="INACTIVE">Inactive</SelectItem>
                                  <SelectItem value="PENDING">Pending</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Role Requests Tab */}
          <TabsContent value="requests" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <UserPlus className="h-5 w-5" />
                  <span>Role Requests</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {roleRequests.map((request) => (
                    <div key={request.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="font-medium">{request.userEmail}</span>
                            <Badge className={getRequestStatusColor(request.status)}>
                              {request.status}
                            </Badge>
                          </div>
                          <div className="text-sm text-gray-600 mb-2">
                            <strong>Requested Role:</strong> {request.requestedRole.replace('_', ' ')}
                          </div>
                          <div className="text-sm text-gray-600 mb-2">
                            <strong>Organization:</strong> {request.organization}
                          </div>
                          <div className="text-sm text-gray-600 mb-2">
                            <strong>Reason:</strong> {request.reason}
                          </div>
                          <div className="text-xs text-gray-500">
                            Requested: {new Date(request.requestedAt).toLocaleDateString()}
                          </div>
                        </div>
                        {request.status === 'PENDING' && (
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              onClick={() => handleApproveRequest(request.id)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDenyRequest(request.id)}
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              Deny
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{users.length}</div>
                  <p className="text-xs text-muted-foreground">
                    +2 from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {users.filter(u => u.status === 'ACTIVE').length}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {Math.round((users.filter(u => u.status === 'ACTIVE').length / users.length) * 100)}% of total
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
                  <AlertCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {roleRequests.filter(r => r.status === 'PENDING').length}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Awaiting approval
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Role Distribution</CardTitle>
                  <Shield className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Hospital Doctors</span>
                      <span>{users.filter(u => u.role === 'HOSPITAL_DOCTOR').length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Clinic Doctors</span>
                      <span>{users.filter(u => u.role === 'CLINIC_DOCTOR').length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Parents</span>
                      <span>{users.filter(u => u.role === 'PARENT').length}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 