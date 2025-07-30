import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ClinicCapacityManager from '@/components/ClinicCapacityManager'

describe('ClinicCapacityManager', () => {
  beforeEach(() => {
    // Mock window.matchMedia
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    })
  })

  it('renders with default clinic settings', () => {
    render(<ClinicCapacityManager selectedClinic="clinic-1" />)
    
    expect(screen.getByText('Clinic Information')).toBeInTheDocument()
    expect(screen.getByText("Montreal Children's Clinic")).toBeInTheDocument()
    expect(screen.getByText('(514) 555-0101')).toBeInTheDocument()
    expect(screen.getByText('info@montreal-children-clinic.ca')).toBeInTheDocument()
  })

  it('displays different clinic data for different clinics', () => {
    render(<ClinicCapacityManager selectedClinic="clinic-2" />)
    
    expect(screen.getByText('Quebec Family Health Center')).toBeInTheDocument()
    expect(screen.getByText('(514) 555-0202')).toBeInTheDocument()
    expect(screen.getByText('info@quebec-family-health.ca')).toBeInTheDocument()
  })

  it('shows capacity and utilization information', () => {
    render(<ClinicCapacityManager selectedClinic="clinic-1" />)
    
    expect(screen.getByText('50')).toBeInTheDocument() // Capacity
    expect(screen.getByText('38')).toBeInTheDocument() // Current patients
    expect(screen.getByText('12')).toBeInTheDocument() // Available slots
    expect(screen.getByText('76%')).toBeInTheDocument() // Utilization
  })

  it('allows editing clinic settings', async () => {
    const user = userEvent.setup()
    render(<ClinicCapacityManager selectedClinic="clinic-1" />)
    
    const editButton = screen.getByText('Edit Settings')
    await user.click(editButton)
    
    expect(screen.getByText('Save')).toBeInTheDocument()
    expect(screen.getByText('Cancel')).toBeInTheDocument()
  })

  it('allows saving clinic settings', async () => {
    const user = userEvent.setup()
    render(<ClinicCapacityManager selectedClinic="clinic-1" />)
    
    // Enter edit mode
    const editButton = screen.getByText('Edit Settings')
    await user.click(editButton)
    
    // Save settings
    const saveButton = screen.getByText('Save')
    await user.click(saveButton)
    
    await waitFor(() => {
      expect(screen.getByText('Clinic settings updated successfully')).toBeInTheDocument()
    })
  })

  it('allows canceling edit mode', async () => {
    const user = userEvent.setup()
    render(<ClinicCapacityManager selectedClinic="clinic-1" />)
    
    // Enter edit mode
    const editButton = screen.getByText('Edit Settings')
    await user.click(editButton)
    
    // Cancel edit
    const cancelButton = screen.getByText('Cancel')
    await user.click(cancelButton)
    
    expect(screen.getByText('Edit Settings')).toBeInTheDocument()
  })

  it('displays clinic specializations', () => {
    render(<ClinicCapacityManager selectedClinic="clinic-1" />)
    
    expect(screen.getByText('Pediatric Care')).toBeInTheDocument()
    expect(screen.getByText('Post-operative Care')).toBeInTheDocument()
    expect(screen.getByText('Respiratory Care')).toBeInTheDocument()
    expect(screen.getByText('Diabetes Management')).toBeInTheDocument()
  })

  it('allows toggling accepting new patients', async () => {
    const user = userEvent.setup()
    render(<ClinicCapacityManager selectedClinic="clinic-1" />)
    
    const toggleButton = screen.getByText('Stop Accepting New Patients')
    await user.click(toggleButton)
    
    await waitFor(() => {
      expect(screen.getByText('Clinic is now not accepting new patients')).toBeInTheDocument()
    })
  })

  it('shows emergency care status', () => {
    render(<ClinicCapacityManager selectedClinic="clinic-1" />)
    
    expect(screen.getByText('Emergency Care')).toBeInTheDocument()
    expect(screen.getByText('24/7 Emergency Services')).toBeInTheDocument()
  })

  it('displays clinic address', () => {
    render(<ClinicCapacityManager selectedClinic="clinic-1" />)
    
    expect(screen.getByText('123 Pediatric Ave, Montreal, QC')).toBeInTheDocument()
  })

  it('shows clinic notes', () => {
    render(<ClinicCapacityManager selectedClinic="clinic-1" />)
    
    expect(screen.getByText('Specialized in pediatric care with 24/7 emergency services.')).toBeInTheDocument()
  })

  it('updates when selectedClinic prop changes', () => {
    const { rerender } = render(<ClinicCapacityManager selectedClinic="clinic-1" />)
    
    expect(screen.getByText("Montreal Children's Clinic")).toBeInTheDocument()
    
    rerender(<ClinicCapacityManager selectedClinic="clinic-3" />)
    
    expect(screen.getByText('Laval Pediatric Associates')).toBeInTheDocument()
    expect(screen.queryByText("Montreal Children's Clinic")).not.toBeInTheDocument()
  })

  it('shows different specializations for different clinics', () => {
    render(<ClinicCapacityManager selectedClinic="clinic-3" />)
    
    expect(screen.getByText('Neurology')).toBeInTheDocument()
    expect(screen.getByText('Cardiology')).toBeInTheDocument()
    expect(screen.getByText('Emergency Care')).toBeInTheDocument()
  })

  it('displays quick actions', () => {
    render(<ClinicCapacityManager selectedClinic="clinic-1" />)
    
    expect(screen.getByText('Quick Actions')).toBeInTheDocument()
    expect(screen.getByText('Stop Accepting New Patients')).toBeInTheDocument()
    expect(screen.getByText('Update Capacity')).toBeInTheDocument()
  })

  it('allows updating capacity', async () => {
    const user = userEvent.setup()
    render(<ClinicCapacityManager selectedClinic="clinic-1" />)
    
    const updateCapacityButton = screen.getByText('Update Capacity')
    await user.click(updateCapacityButton)
    
    await waitFor(() => {
      expect(screen.getByText('Capacity updated successfully')).toBeInTheDocument()
    })
  })

  it('shows utilization color coding', () => {
    render(<ClinicCapacityManager selectedClinic="clinic-1" />)
    
    const utilizationElement = screen.getByText('76%')
    expect(utilizationElement).toHaveClass('text-green-600') // Good utilization
  })

  it('displays availability status correctly', () => {
    render(<ClinicCapacityManager selectedClinic="clinic-1" />)
    
    expect(screen.getByText('✓ Accepting')).toBeInTheDocument()
  })
}) 