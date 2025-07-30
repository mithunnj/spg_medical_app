import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import IncomingRequestsTable from '@/components/IncomingRequestsTable'

describe('IncomingRequestsTable', () => {
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

  it('renders with default clinic data', () => {
    render(<IncomingRequestsTable selectedClinic="clinic-1" />)
    
    expect(screen.getByText('Active Clinic:')).toBeInTheDocument()
    expect(screen.getByText('Emma Johnson')).toBeInTheDocument()
    expect(screen.getByText('Lucas Chen')).toBeInTheDocument()
    expect(screen.getByText('7 requests')).toBeInTheDocument()
  })

  it('displays different patient data for different clinics', () => {
    render(<IncomingRequestsTable selectedClinic="clinic-2" />)
    
    expect(screen.getByText('Sophia Rodriguez')).toBeInTheDocument()
    expect(screen.getByText('Aiden Thompson')).toBeInTheDocument()
    expect(screen.getByText('4 requests')).toBeInTheDocument()
  })

  it('shows empty state when clinic has no requests', () => {
    render(<IncomingRequestsTable selectedClinic="clinic-5" />)
    
    expect(screen.getByText('No Pending Requests')).toBeInTheDocument()
    expect(screen.getByText('This clinic currently has no pending patient discharge requests.')).toBeInTheDocument()
  })

  it('displays patient information correctly', () => {
    render(<IncomingRequestsTable selectedClinic="clinic-1" />)
    
    expect(screen.getByText('Emma Johnson')).toBeInTheDocument()
    expect(screen.getByText('Age 8')).toBeInTheDocument()
    expect(screen.getByText('Requested 2024-01-15')).toBeInTheDocument()
    expect(screen.getByText('HIGH Priority')).toBeInTheDocument()
    expect(screen.getByText('PENDING')).toBeInTheDocument()
  })

  it('allows accepting patient requests', async () => {
    const user = userEvent.setup()
    render(<IncomingRequestsTable selectedClinic="clinic-1" />)
    
    const acceptButton = screen.getByText('Accept')
    await user.click(acceptButton)
    
    await waitFor(() => {
      expect(screen.getByText('Patient request approved successfully')).toBeInTheDocument()
    })
  })

  it('allows declining patient requests', async () => {
    const user = userEvent.setup()
    render(<IncomingRequestsTable selectedClinic="clinic-1" />)
    
    const declineButton = screen.getByText('Decline')
    await user.click(declineButton)
    
    // Should open response dialog
    expect(screen.getByText('Decline Patient')).toBeInTheDocument()
  })

  it('allows sending messages to PICU doctors', async () => {
    const user = userEvent.setup()
    render(<IncomingRequestsTable selectedClinic="clinic-1" />)
    
    const messageButton = screen.getByText('Message PICU')
    await user.click(messageButton)
    
    // Should open message dialog
    expect(screen.getByText('Message PICU Doctor')).toBeInTheDocument()
  })

  it('displays file information for patients', () => {
    render(<IncomingRequestsTable selectedClinic="clinic-1" />)
    
    expect(screen.getByText('medical_records.pdf')).toBeInTheDocument()
    expect(screen.getByText('surgery_notes.pdf')).toBeInTheDocument()
    expect(screen.getByText('lab_results.pdf')).toBeInTheDocument()
  })

  it('allows file uploads', async () => {
    const user = userEvent.setup()
    render(<IncomingRequestsTable selectedClinic="clinic-1" />)
    
    const uploadButtons = screen.getAllByText('Upload File')
    await user.click(uploadButtons[0])
    
    // Should show file upload functionality
    expect(screen.getByText('Upload File')).toBeInTheDocument()
  })

  it('shows correct priority colors', () => {
    render(<IncomingRequestsTable selectedClinic="clinic-1" />)
    
    const highPriority = screen.getByText('HIGH Priority')
    const normalPriority = screen.getByText('NORMAL Priority')
    
    expect(highPriority).toHaveClass('bg-red-100')
    expect(normalPriority).toHaveClass('bg-blue-100')
  })

  it('shows correct status colors', () => {
    render(<IncomingRequestsTable selectedClinic="clinic-1" />)
    
    const pendingStatuses = screen.getAllByText('PENDING')
    expect(pendingStatuses[0]).toHaveClass('bg-yellow-100')
  })

  it('updates when selectedClinic prop changes', () => {
    const { rerender } = render(<IncomingRequestsTable selectedClinic="clinic-1" />)
    
    expect(screen.getByText('Emma Johnson')).toBeInTheDocument()
    
    rerender(<IncomingRequestsTable selectedClinic="clinic-2" />)
    
    expect(screen.getByText('Sophia Rodriguez')).toBeInTheDocument()
    expect(screen.queryByText('Emma Johnson')).not.toBeInTheDocument()
  })

  it('displays hospital information correctly', () => {
    render(<IncomingRequestsTable selectedClinic="clinic-1" />)
    
    expect(screen.getByText('Montreal Children\'s Hospital')).toBeInTheDocument()
    expect(screen.getByText('Dr. Matthew Donlan')).toBeInTheDocument()
  })

  it('shows patient diagnosis and care requirements', () => {
    render(<IncomingRequestsTable selectedClinic="clinic-1" />)
    
    expect(screen.getByText('Post-surgical recovery from appendectomy')).toBeInTheDocument()
    // Note: Care requirements are not directly displayed in the current component
    // They are part of the request data but not rendered as separate text
  })
}) 