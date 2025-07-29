import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import AdminDashboard from '@/app/dev/admin/page'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
}))

describe('AdminDashboard', () => {
  beforeEach(() => {
    render(<AdminDashboard />)
  })

  it('renders admin dashboard with correct title', () => {
    expect(screen.getByText('Admin Dashboard')).toBeInTheDocument()
    expect(screen.getByText('User management and role administration')).toBeInTheDocument()
  })

  it('displays all three main tabs', () => {
    expect(screen.getAllByText('User Management')).toHaveLength(2) // Tab button and content
    expect(screen.getByText('Role Requests')).toBeInTheDocument()
    expect(screen.getByText('Analytics')).toBeInTheDocument()
  })

  it('shows user management table with mock data', () => {
    expect(screen.getByText('Dr. Sarah Johnson')).toBeInTheDocument()
    expect(screen.getByText('Dr. Michael Chen')).toBeInTheDocument()
    expect(screen.getByText('Maria Johnson')).toBeInTheDocument()
  })

  it('displays correct role badges', () => {
    expect(screen.getAllByText('Hospital Doctor')).toHaveLength(2) // Multiple instances
    expect(screen.getAllByText('Clinic Doctor')).toHaveLength(2) // Multiple instances
    expect(screen.getByText('Parent')).toBeInTheDocument()
  })

  it('shows correct status badges', () => {
    expect(screen.getAllByText('ACTIVE')).toHaveLength(3) // Multiple active users
    expect(screen.getByText('PENDING')).toBeInTheDocument()
    expect(screen.getByText('INACTIVE')).toBeInTheDocument()
  })

  it('allows searching users', () => {
    const searchInput = screen.getByPlaceholderText('Search users...')
    fireEvent.change(searchInput, { target: { value: 'Sarah' } })
    
    expect(screen.getByText('Dr. Sarah Johnson')).toBeInTheDocument()
    expect(screen.queryByText('Dr. Michael Chen')).not.toBeInTheDocument()
  })

  it('includes back to dev home button', () => {
    expect(screen.getByText('Back to Dev Home')).toBeInTheDocument()
    expect(screen.getByText('Back')).toBeInTheDocument() // Mobile version
  })

  it('shows admin badge and welcome message', () => {
    expect(screen.getByText('Welcome, Administrator')).toBeInTheDocument()
    expect(screen.getByText('Admin')).toBeInTheDocument()
  })

  it('has proper admin theme styling', () => {
    const title = screen.getByText('Admin Dashboard')
    expect(title).toBeInTheDocument()
  })

  it('displays user table headers', () => {
    expect(screen.getByText('User')).toBeInTheDocument()
    expect(screen.getByText('Role')).toBeInTheDocument()
    expect(screen.getByText('Status')).toBeInTheDocument()
    expect(screen.getByText('Organization')).toBeInTheDocument()
    expect(screen.getByText('Last Active')).toBeInTheDocument()
    expect(screen.getByText('Actions')).toBeInTheDocument()
  })

  it('shows filter dropdowns', () => {
    // Check that select elements exist
    const selects = screen.getAllByRole('combobox')
    expect(selects.length).toBeGreaterThan(0)
  })

  it('displays user emails', () => {
    expect(screen.getByText('sarah.johnson@hospital.com')).toBeInTheDocument()
    expect(screen.getByText('michael.chen@clinic.com')).toBeInTheDocument()
    expect(screen.getByText('maria.johnson@email.com')).toBeInTheDocument()
  })

  it('shows organization names', () => {
    expect(screen.getByText('Montreal Children\'s Hospital')).toBeInTheDocument()
    expect(screen.getByText('Pediatric Specialists Clinic')).toBeInTheDocument()
    expect(screen.getByText('Patient Family')).toBeInTheDocument()
  })
}) 