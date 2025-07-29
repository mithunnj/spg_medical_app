"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { CalendarDays, Upload, Users, Plus, X } from 'lucide-react'

interface ClinicOption {
  id: string
  name: string
  region: string
  specializations: string[]
  capacity: number
  currentPatients: number
}

// Mock clinic data - will be replaced with API call
const mockClinics: ClinicOption[] = [
  {
    id: '1',
    name: 'Montreal Children\'s Clinic',
    region: 'Montreal',
    specializations: ['Pediatric Care', 'Family Medicine'],
    capacity: 50,
    currentPatients: 35
  },
  {
    id: '2',
    name: 'Quebec Family Health Center',
    region: 'Quebec City',
    specializations: ['Family Medicine', 'Pediatric Cardiology'],
    capacity: 40,
    currentPatients: 28
  },
  {
    id: '3',
    name: 'Laval Pediatric Associates',
    region: 'Laval',
    specializations: ['Pediatric Care', 'Adolescent Medicine'],
    capacity: 30,
    currentPatients: 22
  }
]

export default function PatientIntakeForm() {
  const [selectedClinics, setSelectedClinics] = useState<string[]>([])
  const [allergies, setAllergies] = useState<string[]>([''])
  const [medications, setMedications] = useState<string[]>([''])
  const [files, setFiles] = useState<File[]>([])

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
          <CardTitle>Select Outbound Clinics</CardTitle>
          <p className="text-sm text-gray-600">
            Choose which clinics to contact for this patient
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockClinics.map((clinic) => (
              <div
                key={clinic.id}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedClinics.includes(clinic.id)
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => handleClinicToggle(clinic.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      checked={selectedClinics.includes(clinic.id)}
                      onChange={() => handleClinicToggle(clinic.id)}
                    />
                    <div>
                      <h4 className="font-medium">{clinic.name}</h4>
                      <p className="text-sm text-gray-600">{clinic.region}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">
                      {clinic.currentPatients}/{clinic.capacity} patients
                    </p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {clinic.specializations.map((spec, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>
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
        <Button type="submit" disabled={selectedClinics.length === 0}>
          Submit Patient Request
        </Button>
      </div>
    </form>
  )
} 