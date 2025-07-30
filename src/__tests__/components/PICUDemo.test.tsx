import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import PICUDoctorDemo from '@/app/demo/picu/page'

// Mock fetch for API calls
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([
      {
        id: '1',
        name: 'Montreal Pediatric Associates',
        region: 'Montreal',
        capacity: 50,
        currentPatients: 38,
        specializations: ['Pediatrics', 'Family Medicine'],
        acceptingNew: true
      }
    ])
  })
) as jest.Mock

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
}))

describe('PICUDoctorDemo', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders the PICU doctor dashboard', () => {
    render(<PICUDoctorDemo />)
    
    expect(screen.getByText('PICU Doctor Dashboard')).toBeInTheDocument()
    expect(screen.getByText(/Montreal Children's Hospital - Patient discharge coordination/)).toBeInTheDocument()
  })

  it('displays hospital information', () => {
    render(<PICUDoctorDemo />)
    
    expect(screen.getByText('Montreal Children\'s Hospital')).toBeInTheDocument()
    expect(screen.getByText('Dr. Matthew Donlan')).toBeInTheDocument()
  })

  it('shows action buttons', () => {
    render(<PICUDoctorDemo />)
    
    expect(screen.getByText('New Patient Intake')).toBeInTheDocument()
    expect(screen.getByText('Send Follow-up Messages')).toBeInTheDocument()
    expect(screen.getByText('Upload Patient Files')).toBeInTheDocument()
    expect(screen.getByText('Schedule Follow-ups')).toBeInTheDocument()
  })

  it('displays patient tracking table', () => {
    render(<PICUDoctorDemo />)
    
    expect(screen.getByText('Active Patients')).toBeInTheDocument()
    expect(screen.getByText('Emma Rodriguez')).toBeInTheDocument()
    expect(screen.getByText('Lucas Chen')).toBeInTheDocument()
  })

  it('shows available clinics section', () => {
    render(<PICUDoctorDemo />)
    
    expect(screen.getByText('Available Clinics')).toBeInTheDocument()
  })

  it('displays demo features highlight', () => {
    render(<PICUDoctorDemo />)
    
    expect(screen.getByText('PICU Doctor Features Demonstrated')).toBeInTheDocument()
    expect(screen.getByText('Montreal Children\'s Hospital integration')).toBeInTheDocument()
    expect(screen.getByText('Real clinic data from NeonDB')).toBeInTheDocument()
  })

  it('opens new patient intake modal when button is clicked', async () => {
    render(<PICUDoctorDemo />)
    
    const intakeButton = screen.getByText('New Patient Intake')
    fireEvent.click(intakeButton)
    
    await waitFor(() => {
      expect(screen.getByText('New Patient Intake Form')).toBeInTheDocument()
    })
  })

  it('opens follow-up messages modal when button is clicked', async () => {
    render(<PICUDoctorDemo />)
    
    const followUpButton = screen.getByText('Send Follow-up Messages')
    fireEvent.click(followUpButton)
    
    await waitFor(() => {
      expect(screen.getByText('Send Follow-up Messages')).toBeInTheDocument()
    })
  })

  it('opens upload files modal when button is clicked', async () => {
    render(<PICUDoctorDemo />)
    
    const uploadButton = screen.getByText('Upload Patient Files')
    fireEvent.click(uploadButton)
    
    await waitFor(() => {
      expect(screen.getByText('Upload Patient Files')).toBeInTheDocument()
    })
  })

  it('opens schedule follow-ups modal when button is clicked', async () => {
    render(<PICUDoctorDemo />)
    
    const scheduleButton = screen.getByText('Schedule Follow-ups')
    fireEvent.click(scheduleButton)
    
    await waitFor(() => {
      expect(screen.getByText('Schedule Follow-up Appointments')).toBeInTheDocument()
    })
  })

  it('opens patient details modal when view button is clicked', async () => {
    render(<PICUDoctorDemo />)
    
    const viewButtons = screen.getAllByText('View')
    fireEvent.click(viewButtons[0])
    
    await waitFor(() => {
      expect(screen.getByText(/Patient Details:/)).toBeInTheDocument()
    })
  })

  it('opens message patient modal when button is clicked', async () => {
    render(<PICUDoctorDemo />)
    
    const messageButtons = screen.getAllByText('Message')
    fireEvent.click(messageButtons[0])
    
    await waitFor(() => {
      expect(screen.getByText(/Message Patient/)).toBeInTheDocument()
    })
  })

  it('opens contact clinic modal when button is clicked', async () => {
    render(<PICUDoctorDemo />)
    
    const contactButtons = screen.getAllByText('Contact Clinic')
    fireEvent.click(contactButtons[0])
    
    await waitFor(() => {
      expect(screen.getByText(/Contact Clinic/)).toBeInTheDocument()
    })
  })
}) 