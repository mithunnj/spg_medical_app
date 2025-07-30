import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import PatientGuardianDemo from '@/app/demo/guardian/page'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
}))

describe('PatientGuardianDemo', () => {
  it('renders the patient guardian portal', () => {
    render(<PatientGuardianDemo />)
    
    expect(screen.getByText('Patient Guardian Portal')).toBeInTheDocument()
    expect(screen.getByText(/Track your child's care transition progress/)).toBeInTheDocument()
  })

  it('displays guardian information', () => {
    render(<PatientGuardianDemo />)
    
    expect(screen.getByText('Maria Rodriguez')).toBeInTheDocument()
  })

  it('shows children information', () => {
    render(<PatientGuardianDemo />)
    
    expect(screen.getAllByText('Emma Rodriguez')).toHaveLength(2)
    expect(screen.getAllByText('Lucas Rodriguez')).toHaveLength(2)
  })

  it('displays action buttons', () => {
    render(<PatientGuardianDemo />)
    
    expect(screen.getByText('Contact Care Team')).toBeInTheDocument()
    expect(screen.getByText('View Documents')).toBeInTheDocument()
    expect(screen.getByText('Schedule Appointment')).toBeInTheDocument()
    expect(screen.getByText('Set Notifications')).toBeInTheDocument()
  })

  it('shows recent messages section', () => {
    render(<PatientGuardianDemo />)
    
    expect(screen.getByText('Recent Messages')).toBeInTheDocument()
  })

  it('displays upcoming appointments section', () => {
    render(<PatientGuardianDemo />)
    
    expect(screen.getByText('Upcoming Appointments')).toBeInTheDocument()
  })

  it('displays demo features highlight', () => {
    render(<PatientGuardianDemo />)
    
    expect(screen.getByText('Family Portal Features Demonstrated')).toBeInTheDocument()
    expect(screen.getByText('Related family names (same last name)')).toBeInTheDocument()
    expect(screen.getByText('Direct messaging with care teams')).toBeInTheDocument()
  })

  it('opens contact care team modal when button is clicked', async () => {
    render(<PatientGuardianDemo />)
    
    const contactButtons = screen.getAllByText('Contact Care Team')
    fireEvent.click(contactButtons[0])
    
    await waitFor(() => {
      expect(screen.getAllByText('Contact Care Team')).toHaveLength(2)
    })
  })

  it('opens view documents modal when button is clicked', async () => {
    render(<PatientGuardianDemo />)
    
    const documentsButtons = screen.getAllByText('View Documents')
    fireEvent.click(documentsButtons[0])
    
    await waitFor(() => {
      expect(screen.getAllByText('View Documents')).toHaveLength(2)
    })
  })

  it('opens schedule appointment modal when button is clicked', async () => {
    render(<PatientGuardianDemo />)
    
    const scheduleButtons = screen.getAllByText('Schedule Appointment')
    fireEvent.click(scheduleButtons[0])
    
    await waitFor(() => {
      expect(screen.getAllByText('Schedule Appointment')).toHaveLength(3)
    })
  })

  it('opens set notifications modal when button is clicked', async () => {
    render(<PatientGuardianDemo />)
    
    const notificationsButton = screen.getByText('Set Notifications')
    fireEvent.click(notificationsButton)
    
    await waitFor(() => {
      expect(screen.getByText('Set Notifications')).toBeInTheDocument()
    })
  })

  it('opens message PICU modal when button is clicked', async () => {
    render(<PatientGuardianDemo />)
    
    const messageButtons = screen.getAllByText('Message PICU')
    fireEvent.click(messageButtons[0])
    
    await waitFor(() => {
      expect(screen.getByText(/Message PICU Team/)).toBeInTheDocument()
    })
  })

  it('opens message clinic modal when button is clicked', async () => {
    render(<PatientGuardianDemo />)
    
    const messageButtons = screen.getAllByText('Message Clinic')
    fireEvent.click(messageButtons[0])
    
    await waitFor(() => {
      expect(screen.getByText(/Message Clinic for/)).toBeInTheDocument()
    })
  })

  it('opens view files modal when button is clicked', async () => {
    render(<PatientGuardianDemo />)
    
    const viewFilesButtons = screen.getAllByText('View Files')
    fireEvent.click(viewFilesButtons[0])
    
    await waitFor(() => {
      expect(screen.getByText(/Files for/)).toBeInTheDocument()
    })
  })

  it('opens child details modal when details button is clicked', async () => {
    render(<PatientGuardianDemo />)
    
    const detailsButtons = screen.getAllByText('Details')
    fireEvent.click(detailsButtons[0])
    
    await waitFor(() => {
      expect(screen.getByText(/Child Details:/)).toBeInTheDocument()
    })
  })

  it('opens reschedule appointment modal when button is clicked', async () => {
    render(<PatientGuardianDemo />)
    
    const rescheduleButtons = screen.getAllByText('Reschedule')
    fireEvent.click(rescheduleButtons[0])
    
    await waitFor(() => {
      expect(screen.getByText(/Reschedule Appointment:/)).toBeInTheDocument()
    })
  })

  it('opens send message modal when button is clicked', async () => {
    render(<PatientGuardianDemo />)
    
    const sendMessageButtons = screen.getAllByText('Send Message')
    fireEvent.click(sendMessageButtons[0])
    
    await waitFor(() => {
      expect(screen.getByText(/Send Message to/)).toBeInTheDocument()
    })
  })

  it('opens reply message modal when button is clicked', async () => {
    render(<PatientGuardianDemo />)
    
    const replyButtons = screen.getAllByText('Reply')
    fireEvent.click(replyButtons[0])
    
    await waitFor(() => {
      expect(screen.getByText(/Reply to/)).toBeInTheDocument()
    })
  })
}) 