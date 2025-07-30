import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ClinicDashboard from '@/app/dev/clinic/page'

// Mock the child components
jest.mock('@/components/IncomingRequestsTable', () => {
  return function MockIncomingRequestsTable({ selectedClinic }: { selectedClinic: string }) {
    return <div data-testid="incoming-requests-table" data-clinic={selectedClinic}>Incoming Requests Table</div>
  }
})

jest.mock('@/components/ClinicCapacityManager', () => {
  return function MockClinicCapacityManager({ selectedClinic }: { selectedClinic: string }) {
    return <div data-testid="clinic-capacity-manager" data-clinic={selectedClinic}>Clinic Capacity Manager</div>
  }
})

describe('ClinicDashboard', () => {
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

  it('renders the clinic dashboard with default clinic', () => {
    render(<ClinicDashboard />)
    
    expect(screen.getByText('Clinic Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Welcome, Dr. Sarah Martinez')).toBeInTheDocument()
    expect(screen.getByText("Montreal Children's Clinic")).toBeInTheDocument()
    expect(screen.getByText('Active Clinic')).toBeInTheDocument()
  })

  it('displays correct default clinic statistics', () => {
    render(<ClinicDashboard />)
    
    expect(screen.getByText('7')).toBeInTheDocument() // Pending requests
    expect(screen.getByText('12/50')).toBeInTheDocument() // Available capacity
    expect(screen.getByText('3')).toBeInTheDocument() // Weekly accepted
    expect(screen.getByText('76%')).toBeInTheDocument() // Utilization
  })

  it('allows switching between clinics', async () => {
    const user = userEvent.setup()
    render(<ClinicDashboard />)
    
    // Open the clinic selector
    const clinicSelector = screen.getByRole('combobox')
    await user.click(clinicSelector)
    
    // Select a different clinic
    const quebecClinic = screen.getByText('Quebec Family Health Center')
    await user.click(quebecClinic)
    
    // Check that the clinic name and doctor changed
    await waitFor(() => {
      expect(screen.getByText('Welcome, Dr. Jean-Pierre Dubois')).toBeInTheDocument()
      expect(screen.getByText('Quebec Family Health Center')).toBeInTheDocument()
    })
  })

  it('updates statistics when clinic is changed', async () => {
    const user = userEvent.setup()
    render(<ClinicDashboard />)
    
    // Open the clinic selector
    const clinicSelector = screen.getByRole('combobox')
    await user.click(clinicSelector)
    
    // Select Laval Pediatric Associates (has different stats)
    const lavalClinic = screen.getByText('Laval Pediatric Associates')
    await user.click(lavalClinic)
    
    // Check that statistics updated
    await waitFor(() => {
      expect(screen.getByText('12')).toBeInTheDocument() // Pending requests
      expect(screen.getByText('5/40')).toBeInTheDocument() // Available capacity
      expect(screen.getByText('5')).toBeInTheDocument() // Weekly accepted
      expect(screen.getByText('88%')).toBeInTheDocument() // Utilization
    })
  })

  it('shows correct status badge for each clinic', async () => {
    const user = userEvent.setup()
    render(<ClinicDashboard />)
    
    // Check default clinic status
    expect(screen.getByText('Available')).toBeInTheDocument()
    
    // Switch to a clinic with limited status
    const clinicSelector = screen.getByRole('combobox')
    await user.click(clinicSelector)
    
    const lavalClinic = screen.getByText('Laval Pediatric Associates')
    await user.click(lavalClinic)
    
    await waitFor(() => {
      expect(screen.getByText('Limited')).toBeInTheDocument()
    })
  })

  it('passes selected clinic to child components', async () => {
    const user = userEvent.setup()
    render(<ClinicDashboard />)
    
    // Check default clinic is passed
    expect(screen.getByTestId('incoming-requests-table')).toHaveAttribute('data-clinic', 'clinic-1')
    expect(screen.getByTestId('clinic-capacity-manager')).toHaveAttribute('data-clinic', 'clinic-1')
    
    // Switch clinic and check it's passed to child components
    const clinicSelector = screen.getByRole('combobox')
    await user.click(clinicSelector)
    
    const montrealSpecialists = screen.getByText('Montreal Pediatric Specialists')
    await user.click(montrealSpecialists)
    
    await waitFor(() => {
      expect(screen.getByTestId('incoming-requests-table')).toHaveAttribute('data-clinic', 'clinic-4')
      expect(screen.getByTestId('clinic-capacity-manager')).toHaveAttribute('data-clinic', 'clinic-4')
    })
  })

  it('displays development mode badge', () => {
    render(<ClinicDashboard />)
    expect(screen.getByText('Development Mode')).toBeInTheDocument()
  })

  it('renders all clinic options in selector', async () => {
    const user = userEvent.setup()
    render(<ClinicDashboard />)
    
    const clinicSelector = screen.getByRole('combobox')
    await user.click(clinicSelector)
    
    expect(screen.getByText("Montreal Children's Clinic")).toBeInTheDocument()
    expect(screen.getByText('Quebec Family Health Center')).toBeInTheDocument()
    expect(screen.getByText('Laval Pediatric Associates')).toBeInTheDocument()
    expect(screen.getByText('Montreal Pediatric Specialists')).toBeInTheDocument()
    expect(screen.getByText('West Island Family Clinic')).toBeInTheDocument()
  })

  it('maintains tab functionality when clinic is changed', async () => {
    const user = userEvent.setup()
    render(<ClinicDashboard />)
    
    // Switch to settings tab
    const settingsTab = screen.getByText('Clinic Settings')
    await user.click(settingsTab)
    
    // Switch clinic
    const clinicSelector = screen.getByRole('combobox')
    await user.click(clinicSelector)
    
    const quebecClinic = screen.getByText('Quebec Family Health Center')
    await user.click(quebecClinic)
    
    // Check that we're still on settings tab
    await waitFor(() => {
      expect(screen.getByText('Clinic Capacity Management')).toBeInTheDocument()
    })
  })
}) 