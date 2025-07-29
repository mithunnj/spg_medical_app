"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { CalendarDays, Upload, Users, Plus, X, MapPin, Phone, Building2, AlertCircle, CheckCircle, Clock } from 'lucide-react'

interface ClinicOption {
  id: string
  name: string
  region: string
  address: string
  phone: string | null
  email: string | null
  specializations: string[]
  capacity: number
  currentPatients: number
  availableSlots: number
  utilizationPercentage: number
  availabilityStatus: 'AVAILABLE' | 'LIMITED' | 'FULL'
  acceptingNew: boolean
  isActive: boolean
}

export default function PatientIntakeForm() {
  const [selectedClinics, setSelectedClinics] = useState<string[]>([])
  const [allergies, setAllergies] = useState<string[]>([''])
  const [medications, setMedications] = useState<string[]>([''])
  const [files, setFiles] = useState<File[]>([])
  const [clinics, setClinics] = useState<ClinicOption[]>([])
  const [loadingClinics, setLoadingClinics] = useState(true)
  const [clinicsError, setClinicsError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    healthCard: '',
    address: '',
    phone: '',
    emergencyContact: '',
    diagnosis: '',
    specialNeeds: '',
    priority: 'NORMAL',
    notes: ''
  })

  // Fetch clinics from API
  useEffect(() => {
    const fetchClinics = async () => {
      try {
        setLoadingClinics(true)
        const response = await fetch('/api/clinics?acceptingOnly=false')
        const result = await response.json()
        
        if (result.success) {
          setClinics(result.data)
        } else {
          setClinicsError(result.error || 'Failed to load clinics')
        }
      } catch (error) {
        console.error('Error fetching clinics:', error)
        setClinicsError('Failed to connect to clinic database')
      } finally {
        setLoadingClinics(false)
      }
    }

    fetchClinics()
  }, [])

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleClinicToggle = (clinicId: string) => {
    setSelectedClinics(prev => 
      prev.includes(clinicId) 
        ? prev.filter(id => id !== clinicId)
        : [...prev, clinicId]
    )
  }

  const addAllergy = () => setAllergies(prev => [...prev, ''])
  const removeAllergy = (index: number) => setAllergies(prev => prev.filter((_, i) => i !== index))
  const updateAllergy = (index: number, value: string) => {
    setAllergies(prev => prev.map((item, i) => i === index ? value : item))
  }

  const addMedication = () => setMedications(prev => [...prev, ''])
  const removeMedication = (index: number) => setMedications(prev => prev.filter((_, i) => i !== index))
  const updateMedication = (index: number, value: string) => {
    setMedications(prev => prev.map((item, i) => i === index ? value : item))
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(event.target.files || [])
    setFiles(prev => [...prev, ...newFiles])
  }

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const patientData = {
      ...formData,
      allergies: allergies.filter(a => a.trim() !== ''),
      medications: medications.filter(m => m.trim() !== ''),
      selectedClinics,
      files
    }

    console.log('Submitting patient data:', patientData)
    // TODO: Submit to API
  }

  const getAvailabilityBadge = (clinic: ClinicOption) => {
    const { availabilityStatus, availableSlots, acceptingNew } = clinic
    
    if (!acceptingNew) {
      return (
        <Badge variant="outline" className="bg-gray-100 text-gray-700 border-gray-300">
          <X className="h-3 w-3 mr-1" />
          Not Accepting
        </Badge>
      )
    }
    
    switch (availabilityStatus) {
      case 'AVAILABLE':
        return (
          <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300">
            <CheckCircle className="h-3 w-3 mr-1" />
            Available ({availableSlots} slots)
          </Badge>
        )
      case 'LIMITED':
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-700 border-yellow-300">
            <Clock className="h-3 w-3 mr-1" />
            Limited ({availableSlots} slots)
          </Badge>
        )
      case 'FULL':
        return (
          <Badge variant="outline" className="bg-red-100 text-red-700 border-red-300">
            <AlertCircle className="h-3 w-3 mr-1" />
            Full (0 slots)
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Patient Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Patient Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="dateOfBirth">Date of Birth *</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="healthCard">Health Card Number *</Label>
              <Input
                id="healthCard"
                value={formData.healthCard}
                onChange={(e) => handleInputChange('healthCard', e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="address">Address *</Label>
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="emergencyContact">Emergency Contact *</Label>
              <Input
                id="emergencyContact"
                value={formData.emergencyContact}
                onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                required
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Medical Information */}
      <Card>
        <CardHeader>
          <CardTitle>Medical Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="diagnosis">Primary Diagnosis *</Label>
            <Textarea
              id="diagnosis"
              value={formData.diagnosis}
              onChange={(e) => handleInputChange('diagnosis', e.target.value)}
              required
            />
          </div>

          <div>
            <Label>Allergies</Label>
            {allergies.map((allergy, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <Input
                  value={allergy}
                  onChange={(e) => updateAllergy(index, e.target.value)}
                  placeholder="Enter allergy"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeAllergy(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={addAllergy}>
              <Plus className="h-4 w-4 mr-2" />
              Add Allergy
            </Button>
          </div>

          <div>
            <Label>Current Medications</Label>
            {medications.map((medication, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <Input
                  value={medication}
                  onChange={(e) => updateMedication(index, e.target.value)}
                  placeholder="Enter medication"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeMedication(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={addMedication}>
              <Plus className="h-4 w-4 mr-2" />
              Add Medication
            </Button>
          </div>

          <div>
            <Label htmlFor="specialNeeds">Special Care Needs</Label>
            <Textarea
              id="specialNeeds"
              value={formData.specialNeeds}
              onChange={(e) => handleInputChange('specialNeeds', e.target.value)}
              placeholder="Any special care requirements or notes"
            />
          </div>

          <div>
            <Label htmlFor="priority">Priority Level</Label>
            <Select 
              value={formData.priority} 
              onValueChange={(value) => handleInputChange('priority', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="HIGH">High Priority</SelectItem>
                <SelectItem value="NORMAL">Normal Priority</SelectItem>
                <SelectItem value="LOW">Low Priority</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder="Any additional information for the receiving clinic"
            />
          </div>
        </CardContent>
      </Card>

      {/* File Upload */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="h-5 w-5" />
            <span>Patient Files</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="files">Upload Medical Records</Label>
              <Input
                id="files"
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                onChange={handleFileUpload}
              />
            </div>
            
            {files.length > 0 && (
              <div className="space-y-2">
                <Label>Uploaded Files:</Label>
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm">{file.name}</span>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeFile(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Clinic Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Building2 className="h-5 w-5" />
            <span>Select Outbound Clinics</span>
          </CardTitle>
          <p className="text-sm text-gray-600">
            Choose which clinics to contact for this patient ({clinics.length} clinics available)
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {loadingClinics && (
              <div className="flex items-center justify-center py-8">
                <div className="text-gray-500">Loading clinics from database...</div>
              </div>
            )}
            
            {clinicsError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="text-red-700 font-medium">Error loading clinics</div>
                <div className="text-red-600 text-sm">{clinicsError}</div>
              </div>
            )}
            
            {!loadingClinics && !clinicsError && clinics.length === 0 && (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <div className="text-gray-600">No clinics found in the database</div>
              </div>
            )}
            
            {!loadingClinics && !clinicsError && clinics.map((clinic) => (
              <div
                key={clinic.id}
                className={`p-4 lg:p-5 border rounded-lg cursor-pointer transition-colors ${
                  selectedClinics.includes(clinic.id)
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <Checkbox
                        checked={selectedClinics.includes(clinic.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedClinics(prev => [...prev, clinic.id])
                          } else {
                            setSelectedClinics(prev => prev.filter(id => id !== clinic.id))
                          }
                        }}
                        className="mt-1"
                      />
                      <div 
                        className="space-y-2 flex-1 cursor-pointer"
                        onClick={() => handleClinicToggle(clinic.id)}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                          <h4 className="font-semibold text-gray-900">{clinic.name}</h4>
                          {getAvailabilityBadge(clinic)}
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4 flex-shrink-0" />
                            <span>{clinic.region}</span>
                          </div>
                          {clinic.phone && (
                            <div className="flex items-center gap-1">
                              <Phone className="h-4 w-4 flex-shrink-0" />
                              <span>{clinic.phone}</span>
                            </div>
                          )}
                        </div>
                        
                        <p className="text-sm text-gray-600">{clinic.address}</p>
                      </div>
                    </div>
                    
                    <div className="text-right ml-4">
                      <div className="text-sm font-medium">
                        {clinic.currentPatients}/{clinic.capacity} patients
                      </div>
                      <div className="text-xs text-gray-500">
                        {clinic.utilizationPercentage}% capacity
                      </div>
                    </div>
                  </div>
                  
                  {clinic.specializations.length > 0 && (
                    <div className="ml-8 flex flex-wrap gap-1">
                      {clinic.specializations.map((spec, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Submit */}
      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline">
          Save as Draft
        </Button>
        <Button type="submit" disabled={selectedClinics.length === 0 || loadingClinics}>
          Submit Patient Request
        </Button>
      </div>
    </form>
  )
} 