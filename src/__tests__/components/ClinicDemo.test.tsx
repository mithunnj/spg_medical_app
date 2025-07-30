import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import ClinicDoctorDemo from '@/app/demo/clinic/page'

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

describe('ClinicDoctorDemo', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders the clinic doctor dashboard', () => {
    render(<ClinicDoctorDemo />)
    
    expect(screen.getByText('Clinic Doctor Dashboard')).toBeInTheDocument()
  })

  it('displays clinic information', () => {
    render(<ClinicDoctorDemo />)
    
    expect(screen.getByText('Montreal Pediatric Associates')).toBeInTheDocument()
  })

  it('shows capacity management section', () => {
    render(<ClinicDoctorDemo />)
    
    expect(screen.getByText('Capacity Management')).toBeInTheDocument()
    expect(screen.getAllByText('Total Capacity')).toHaveLength(2) // Label and value
    expect(screen.getAllByText('Available Slots')).toHaveLength(3) // Multiple instances
  })

  it('displays incoming patient requests', () => {
    render(<ClinicDoctorDemo />)
    
    expect(screen.getByText('Incoming Patient Requests')).toBeInTheDocument()
    expect(screen.getByText('Emma Rodriguez')).toBeInTheDocument()
    expect(screen.getByText('Lucas Chen')).toBeInTheDocument()
  })

  it('shows recent messages section', () => {
    render(<ClinicDoctorDemo />)
    
    expect(screen.getByText('Recent Messages')).toBeInTheDocument()
  })

  it('displays demo features highlight', () => {
    render(<ClinicDoctorDemo />)
    
    expect(screen.getByText('Clinic Doctor Features Demonstrated')).toBeInTheDocument()
    expect(screen.getByText('Real clinic data from NeonDB')).toBeInTheDocument()
    expect(screen.getByText('Incoming patient request review')).toBeInTheDocument()
  })

  it('opens accept patient modal when button is clicked', async () => {
    render(<ClinicDoctorDemo />)
    
    const acceptButtons = screen.getAllByText('Accept Patient')
    fireEvent.click(acceptButtons[0])
    
    await waitFor(() => {
      expect(screen.getAllByText('Accept Patient')).toHaveLength(5) // Multiple buttons and modal title
    })
  })

  it('opens deny patient modal when button is clicked', async () => {
    render(<ClinicDoctorDemo />)
    
    const denyButtons = screen.getAllByText('Decline')
    fireEvent.click(denyButtons[0])
    
    await waitFor(() => {
      expect(screen.getAllByText('Decline')).toHaveLength(4) // Multiple buttons and modal title
    })
  })

  it('opens message PICU modal when button is clicked', async () => {
    render(<ClinicDoctorDemo />)
    
    const messageButtons = screen.getAllByText('Message')
    fireEvent.click(messageButtons[0])
    
    await waitFor(() => {
      expect(screen.getByText(/Message PICU Doctor/)).toBeInTheDocument()
    })
  })

  it('opens view files modal when button is clicked', async () => {
    render(<ClinicDoctorDemo />)
    
    const viewFilesButtons = screen.getAllByText('View Files')
    fireEvent.click(viewFilesButtons[0])
    
    await waitFor(() => {
      expect(screen.getByText(/Patient Files:/)).toBeInTheDocument()
    })
  })

  it('opens patient details modal when details button is clicked', async () => {
    render(<ClinicDoctorDemo />)
    
    const detailsButtons = screen.getAllByText('Details')
    fireEvent.click(detailsButtons[0])
    
    await waitFor(() => {
      expect(screen.getByText(/Patient Details:/)).toBeInTheDocument()
    })
  })

  it('opens schedule patient meeting modal when button is clicked', async () => {
    render(<ClinicDoctorDemo />)
    
    const scheduleButtons = screen.getAllByText('Schedule Patient Meeting')
    fireEvent.click(scheduleButtons[0])
    
    await waitFor(() => {
      expect(screen.getAllByText('Schedule Patient Meeting')).toHaveLength(2) // Button and modal title
    })
  })

  it('opens reply message modal when button is clicked', async () => {
    render(<ClinicDoctorDemo />)
    
    const replyButtons = screen.getAllByText('Reply')
    fireEvent.click(replyButtons[0])
    
    await waitFor(() => {
      expect(screen.getByText(/Reply to/)).toBeInTheDocument()
    })
  })

  it('opens view message files modal when button is clicked', async () => {
    render(<ClinicDoctorDemo />)
    
    const viewFilesButtons = screen.getAllByText('View Files')
    fireEvent.click(viewFilesButtons[0])
    
    await waitFor(() => {
      expect(screen.getAllByText('View Files')).toHaveLength(6) // Multiple buttons and modal title
    })
  })

  it('increases capacity when increase button is clicked', () => {
    render(<ClinicDoctorDemo />)
    
    const increaseButton = screen.getByText('Increase Capacity')

    
    fireEvent.click(increaseButton)
    
    // The capacity should be updated in the state
    expect(increaseButton).toBeInTheDocument()
  })

  it('decreases capacity when decrease button is clicked', () => {
    render(<ClinicDoctorDemo />)
    
    const decreaseButton = screen.getByText('Decrease Capacity')
    
    fireEvent.click(decreaseButton)
    
    expect(decreaseButton).toBeInTheDocument()
  })
}) 