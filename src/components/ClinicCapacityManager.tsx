"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { 
  Users, 
  Settings, 
  Save, 
  AlertCircle, 
  CheckCircle, 
  Building2,
  Phone,
  Mail,
  MapPin,
  Stethoscope
} from 'lucide-react'

interface ClinicSettings {
  name: string
  capacity: number
  currentPatients: number
  acceptingNew: boolean
  specializations: string[]
  phone: string
  email: string
  address: string
  emergency24h: boolean
  notes: string
}

const availableSpecializations = [
  'Pediatrics',
  'Family Medicine',
  'Pediatric Cardiology',
  'Pediatric Pulmonology',
  'Pediatric Neurology',
  'Adolescent Medicine',
  'Pediatric Gastroenterology',
  'Pediatric Endocrinology',
  'Pediatric Oncology',
  'Pediatric Surgery',
  'Neonatology',
  'Pediatric Emergency Medicine',
  'Pediatric Psychiatry',
  'Child Development',
  'Pediatric Infectious Diseases',
  'Pediatric Rheumatology',
  'Pediatric Nephrology',
  'Developmental Pediatrics',
  'Pediatric Orthopedics',
  'Pediatric Dermatology'
]

interface ClinicCapacityManagerProps {
  selectedClinic: string
}

// Mock clinic data for different clinics
const clinicSettingsData = {
  'clinic-1': {
    name: 'Montreal Children&apos;s Clinic',
    capacity: 50,
    currentPatients: 38,
    acceptingNew: true,
    specializations: ['Pediatric Care', 'Post-operative Care', 'Respiratory Care', 'Diabetes Management'],
    phone: '(514) 555-0101',
    email: 'info@montreal-children-clinic.ca',
    address: '123 Pediatric Ave, Montreal, QC',
    emergency24h: true,
    notes: 'Specialized in pediatric care with 24/7 emergency services.'
  },
  'clinic-2': {
    name: 'Quebec Family Health Center',
    capacity: 35,
    currentPatients: 28,
    acceptingNew: true,
    specializations: ['Family Medicine', 'Pediatric Care', 'Mental Health', 'Preventive Care'],
    phone: '(514) 555-0202',
    email: 'info@quebec-family-health.ca',
    address: '456 Health Blvd, Quebec City, QC',
    emergency24h: false,
    notes: 'Comprehensive family health services with bilingual staff.'
  },
  'clinic-3': {
    name: 'Laval Pediatric Associates',
    capacity: 40,
    currentPatients: 35,
    acceptingNew: false,
    specializations: ['Pediatric Care', 'Neurology', 'Cardiology', 'Emergency Care'],
    phone: '(514) 555-0303',
    email: 'info@laval-pediatrics.ca',
    address: '789 Medical Dr, Laval, QC',
    emergency24h: true,
    notes: 'High-capacity pediatric facility with specialized neurology services.'
  },
  'clinic-4': {
    name: 'Montreal Pediatric Specialists',
    capacity: 60,
    currentPatients: 45,
    acceptingNew: true,
    specializations: ['Specialized Care', 'Oncology', 'Surgery', 'Rehabilitation'],
    phone: '(514) 555-0404',
    email: 'info@montreal-specialists.ca',
    address: '321 Specialist Way, Montreal, QC',
    emergency24h: true,
    notes: 'Specialized pediatric care with advanced medical equipment.'
  },
  'clinic-5': {
    name: 'West Island Family Clinic',
    capacity: 30,
    currentPatients: 25,
    acceptingNew: true,
    specializations: ['Family Medicine', 'Pediatric Care', 'Women&apos;s Health', 'Geriatric Care'],
    phone: '(514) 555-0505',
    email: 'info@west-island-clinic.ca',
    address: '654 Island Rd, West Island, QC',
    emergency24h: false,
    notes: 'Community-focused family health center serving West Island residents.'
  }
}

export default function ClinicCapacityManager({ selectedClinic }: ClinicCapacityManagerProps) {
  const [settings, setSettings] = useState<ClinicSettings>(clinicSettingsData[selectedClinic as keyof typeof clinicSettingsData])
  const [tempSettings, setTempSettings] = useState<ClinicSettings>(clinicSettingsData[selectedClinic as keyof typeof clinicSettingsData])
  const [isEditing, setIsEditing] = useState(false)
  const [notifications, setNotifications] = useState<string[]>([])

  // Update settings when clinic selection changes
  useEffect(() => {
    const newSettings = clinicSettingsData[selectedClinic as keyof typeof clinicSettingsData]
    setSettings(newSettings)
    setTempSettings(newSettings)
  }, [selectedClinic])

  const showNotification = (message: string) => {
    setNotifications(prev => [...prev, message])
    setTimeout(() => {
      setNotifications(prev => prev.slice(1))
    }, 5000)
  }

  const handleSaveSettings = () => {
    setSettings(tempSettings)
    setIsEditing(false)
    showNotification('Clinic settings updated successfully')
  }

  const handleCancelEdit = () => {
    setTempSettings(settings)
    setIsEditing(false)
  }

  const handleSpecializationToggle = (specialization: string) => {
    setTempSettings(prev => ({
      ...prev,
      specializations: prev.specializations.includes(specialization)
        ? prev.specializations.filter(s => s !== specialization)
        : [...prev.specializations, specialization]
    }))
  }

  const availableSlots = Math.max(0, settings.capacity - settings.currentPatients)
  const utilizationPercentage = settings.capacity > 0 ? Math.round((settings.currentPatients / settings.capacity) * 100) : 0

  const getUtilizationColor = (percentage: number) => {
    if (percentage >= 90) return 'text-red-600 bg-red-100'
    if (percentage >= 75) return 'text-orange-600 bg-orange-100'
    if (percentage >= 50) return 'text-yellow-600 bg-yellow-100'
    return 'text-green-600 bg-green-100'
  }

  const getAvailabilityStatus = () => {
    if (!settings.acceptingNew) return { status: 'Not Accepting', color: 'bg-red-100 text-red-800 border-red-200' }
    if (utilizationPercentage >= 95) return { status: 'Full', color: 'bg-red-100 text-red-800 border-red-200' }
    if (utilizationPercentage >= 85) return { status: 'Limited', color: 'bg-orange-100 text-orange-800 border-orange-200' }
    return { status: 'Available', color: 'bg-green-100 text-green-800 border-green-200' }
  }

  const availability = getAvailabilityStatus()

  return (
    <div className="space-y-6">
      {/* Notifications */}
      {notifications.length > 0 && (
        <div className="space-y-2">
          {notifications.map((notification, index) => (
            <div key={index} className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm">
              {notification}
            </div>
          ))}
        </div>
      )}

      {/* Current Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Current Capacity</p>
                <p className="text-2xl font-bold text-gray-900">
                  {settings.currentPatients}/{settings.capacity}
                </p>
                <p className="text-xs text-gray-500">patients</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Utilization</p>
                <p className={`text-2xl font-bold rounded-lg px-2 py-1 ${getUtilizationColor(utilizationPercentage)}`}>
                  {utilizationPercentage}%
                </p>
                <p className="text-xs text-gray-500">capacity used</p>
              </div>
              <div className="p-2 bg-purple-100 rounded-lg">
                <Settings className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Status</p>
                <Badge className={`text-sm border ${availability.color} mt-1`}>
                  {availability.status}
                </Badge>
                <p className="text-xs text-gray-500 mt-1">
                  {availableSlots} slots available
                </p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Clinic Information */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg">Clinic Information</CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              Manage your clinic&apos;s basic information and contact details
            </p>
          </div>
          {!isEditing ? (
            <Button
              onClick={() => {
                setTempSettings(settings)
                setIsEditing(true)
              }}
              variant="outline"
              size="sm"
            >
              <Settings className="h-4 w-4 mr-1" />
              Edit Settings
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                onClick={handleSaveSettings}
                size="sm"
                className="bg-green-600 hover:bg-green-700"
              >
                <Save className="h-4 w-4 mr-1" />
                Save
              </Button>
              <Button
                onClick={handleCancelEdit}
                variant="outline"
                size="sm"
              >
                Cancel
              </Button>
            </div>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="clinic-name">Clinic Name</Label>
              {isEditing ? (
                <Input
                  id="clinic-name"
                  value={tempSettings.name}
                  onChange={(e) => setTempSettings(prev => ({ ...prev, name: e.target.value }))}
                />
              ) : (
                <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
                  <Building2 className="h-4 w-4 text-gray-500" />
                  <span>{settings.name}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="clinic-phone">Phone Number</Label>
              {isEditing ? (
                <Input
                  id="clinic-phone"
                  value={tempSettings.phone}
                  onChange={(e) => setTempSettings(prev => ({ ...prev, phone: e.target.value }))}
                />
              ) : (
                <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span>{settings.phone}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="clinic-email">Email Address</Label>
              {isEditing ? (
                <Input
                  id="clinic-email"
                  type="email"
                  value={tempSettings.email}
                  onChange={(e) => setTempSettings(prev => ({ ...prev, email: e.target.value }))}
                />
              ) : (
                <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span>{settings.email}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="emergency-24h">Emergency Care</Label>
              {isEditing ? (
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="emergency-24h"
                    checked={tempSettings.emergency24h}
                    onCheckedChange={(checked) => 
                      setTempSettings(prev => ({ ...prev, emergency24h: checked as boolean }))
                    }
                  />
                  <Label htmlFor="emergency-24h" className="text-sm">
                    24/7 Emergency Care Available
                  </Label>
                </div>
              ) : (
                <div className="p-2 bg-gray-50 rounded-md">
                  <span className={`text-sm ${settings.emergency24h ? 'text-green-600' : 'text-gray-600'}`}>
                    {settings.emergency24h ? '✓ 24/7 Emergency Care Available' : '24/7 Emergency Care Not Available'}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Address */}
          <div className="space-y-2">
            <Label htmlFor="clinic-address">Address</Label>
            {isEditing ? (
              <Textarea
                id="clinic-address"
                value={tempSettings.address}
                onChange={(e) => setTempSettings(prev => ({ ...prev, address: e.target.value }))}
                rows={2}
              />
            ) : (
              <div className="flex items-start gap-2 p-2 bg-gray-50 rounded-md">
                <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                <span>{settings.address}</span>
              </div>
            )}
          </div>

          {/* Capacity Management */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="total-capacity">Total Capacity</Label>
              {isEditing ? (
                <Input
                  id="total-capacity"
                  type="number"
                  min="0"
                  value={tempSettings.capacity}
                  onChange={(e) => setTempSettings(prev => ({ ...prev, capacity: parseInt(e.target.value) || 0 }))}
                />
              ) : (
                <div className="p-2 bg-gray-50 rounded-md">
                  <span className="font-medium">{settings.capacity} patients</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="current-patients">Current Patients</Label>
              {isEditing ? (
                <Input
                  id="current-patients"
                  type="number"
                  min="0"
                  max={tempSettings.capacity}
                  value={tempSettings.currentPatients}
                  onChange={(e) => setTempSettings(prev => ({ ...prev, currentPatients: parseInt(e.target.value) || 0 }))}
                />
              ) : (
                <div className="p-2 bg-gray-50 rounded-md">
                  <span className="font-medium">{settings.currentPatients} patients</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="accepting-new">Accepting New Patients</Label>
              {isEditing ? (
                <div className="flex items-center gap-2 p-2">
                  <Checkbox
                    id="accepting-new"
                    checked={tempSettings.acceptingNew}
                    onCheckedChange={(checked) => 
                      setTempSettings(prev => ({ ...prev, acceptingNew: checked as boolean }))
                    }
                  />
                  <Label htmlFor="accepting-new" className="text-sm">
                    Currently accepting new patients
                  </Label>
                </div>
              ) : (
                <div className="p-2 bg-gray-50 rounded-md">
                  <span className={`font-medium ${settings.acceptingNew ? 'text-green-600' : 'text-red-600'}`}>
                    {settings.acceptingNew ? '✓ Accepting' : '✗ Not Accepting'}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Specializations */}
          <div className="space-y-3">
            <Label>Medical Specializations</Label>
            {isEditing ? (
              <div className="space-y-3">
                <p className="text-sm text-gray-600">
                  Select the specializations your clinic offers:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-y-auto border rounded-lg p-3">
                  {availableSpecializations.map((specialization) => (
                    <div key={specialization} className="flex items-center gap-2">
                      <Checkbox
                        id={`spec-${specialization}`}
                        checked={tempSettings.specializations.includes(specialization)}
                        onCheckedChange={() => handleSpecializationToggle(specialization)}
                      />
                      <Label 
                        htmlFor={`spec-${specialization}`} 
                        className="text-xs cursor-pointer"
                      >
                        {specialization}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {settings.specializations.map((specialization) => (
                  <Badge 
                    key={specialization} 
                    variant="outline" 
                    className="bg-blue-50 text-blue-700 border-blue-200"
                  >
                    <Stethoscope className="h-3 w-3 mr-1" />
                    {specialization}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="clinic-notes">Additional Notes</Label>
            {isEditing ? (
              <Textarea
                id="clinic-notes"
                value={tempSettings.notes}
                onChange={(e) => setTempSettings(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Additional information about your clinic (insurance accepted, special services, etc.)"
                rows={3}
              />
            ) : (
              <div className="p-3 bg-gray-50 rounded-md">
                <p className="text-sm text-gray-700">
                  {settings.notes || 'No additional notes provided.'}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              onClick={() => {
                setSettings(prev => ({ ...prev, acceptingNew: !prev.acceptingNew }))
                showNotification(`Clinic is now ${!settings.acceptingNew ? 'accepting' : 'not accepting'} new patients`)
              }}
              variant="outline"
              className="justify-start"
            >
              {settings.acceptingNew ? (
                <>
                  <AlertCircle className="h-4 w-4 mr-2 text-orange-500" />
                  Stop Accepting New Patients
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                  Start Accepting New Patients
                </>
              )}
            </Button>

            <Button
              onClick={() => {
                setTempSettings(settings)
                setIsEditing(true)
              }}
              variant="outline"
              className="justify-start"
            >
              <Settings className="h-4 w-4 mr-2" />
              Update Capacity Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 