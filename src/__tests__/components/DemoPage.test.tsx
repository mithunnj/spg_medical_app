import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import DemoPage from '@/app/demo/page'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
}))

describe('DemoPage', () => {
  it('renders the demo page with correct title', () => {
    render(<DemoPage />)
    
    expect(screen.getByText('CareBridge Demo')).toBeInTheDocument()
    expect(screen.getByText(/Professional Presentation for Dr. Matthew Donlan/)).toBeInTheDocument()
  })

  it('displays all four demo interfaces', () => {
    render(<DemoPage />)
    
    // Check that each interface name appears at least once
    expect(screen.getAllByText('PICU Doctor Interface')).toHaveLength(2)
    expect(screen.getAllByText('Outbound Clinic Interface')).toHaveLength(1)
    expect(screen.getAllByText('Patient Guardian Portal')).toHaveLength(1)
    expect(screen.getAllByText('Administrative Dashboard')).toHaveLength(1)
  })

  it('shows demo mode and HIPAA compliant badges', () => {
    render(<DemoPage />)
    
    expect(screen.getByText('Demo Mode')).toBeInTheDocument()
    expect(screen.getAllByText('HIPAA Compliant')).toHaveLength(2)
  })

  it('displays platform overview section', () => {
    render(<DemoPage />)
    
    expect(screen.getByText('Welcome to CareBridge')).toBeInTheDocument()
    expect(screen.getByText(/comprehensive medical care coordination platform/)).toBeInTheDocument()
  })

  it('shows key features for each interface', () => {
    render(<DemoPage />)
    
    // PICU features
    expect(screen.getByText('Patient intake and documentation')).toBeInTheDocument()
    expect(screen.getByText('Clinic selection and contact')).toBeInTheDocument()
    
    // Clinic features
    expect(screen.getByText('Incoming patient requests review')).toBeInTheDocument()
    expect(screen.getByText('Accept/deny decision workflow')).toBeInTheDocument()
    
    // Guardian features
    expect(screen.getByText('Real-time status tracking')).toBeInTheDocument()
    expect(screen.getByText('Direct messaging with care teams')).toBeInTheDocument()
    
    // Admin features
    expect(screen.getByText('User access management')).toBeInTheDocument()
    expect(screen.getByText('Role-based permissions')).toBeInTheDocument()
  })

  it('displays demo presentation guide', () => {
    render(<DemoPage />)
    
    expect(screen.getByText('Demo Presentation Guide')).toBeInTheDocument()
    expect(screen.getByText('Recommended Demo Flow:')).toBeInTheDocument()
    expect(screen.getByText('Key Features to Highlight:')).toBeInTheDocument()
  })

  it('shows platform benefits', () => {
    render(<DemoPage />)
    
    expect(screen.getByText('Family-Centered Care')).toBeInTheDocument()
    expect(screen.getByText('Real-Time Updates')).toBeInTheDocument()
    expect(screen.getByText('Secure Communication')).toBeInTheDocument()
  })
}) 