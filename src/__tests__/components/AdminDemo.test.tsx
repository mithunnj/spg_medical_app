import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import AdminDashboardDemo from '@/app/demo/admin/page'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
}))

describe('AdminDashboardDemo', () => {
  it('renders the administrative dashboard', () => {
    render(<AdminDashboardDemo />)
    
    expect(screen.getByText('Administrative Dashboard')).toBeInTheDocument()
    expect(screen.getByText(/System management and user administration/)).toBeInTheDocument()
  })

  it('displays system statistics', () => {
    render(<AdminDashboardDemo />)
    
    expect(screen.getByText('Total Users')).toBeInTheDocument()
    expect(screen.getByText('Active Sessions')).toBeInTheDocument()
    expect(screen.getByText('System Uptime')).toBeInTheDocument()
    expect(screen.getByText('Security Incidents')).toBeInTheDocument()
  })

  it('shows action buttons', () => {
    render(<AdminDashboardDemo />)
    
    expect(screen.getByText('Add New User')).toBeInTheDocument()
    expect(screen.getByText('System Settings')).toBeInTheDocument()
    expect(screen.getByText('Security Audit')).toBeInTheDocument()
    expect(screen.getByText('Data Backup')).toBeInTheDocument()
  })

  it('displays user management section', () => {
    render(<AdminDashboardDemo />)
    
    expect(screen.getByText('User Management')).toBeInTheDocument()
    expect(screen.getByText('Dr. Sarah Johnson')).toBeInTheDocument()
    expect(screen.getByText('Dr. Robert Wilson')).toBeInTheDocument()
    expect(screen.getByText('Maria Rodriguez')).toBeInTheDocument()
  })

  it('shows audit logs section', () => {
    render(<AdminDashboardDemo />)
    
    expect(screen.getByText('Recent Audit Logs')).toBeInTheDocument()
    expect(screen.getByText('Dr. Sarah Johnson')).toBeInTheDocument()
    expect(screen.getByText('Dr. Matthew Donlan')).toBeInTheDocument()
    expect(screen.getByText('Dr. Emily Chen')).toBeInTheDocument()
  })

  it('displays demo features highlight', () => {
    render(<AdminDashboardDemo />)
    
    expect(screen.getByText('Admin Dashboard Features Demonstrated')).toBeInTheDocument()
    expect(screen.getByText('User management and role assignment')).toBeInTheDocument()
    expect(screen.getByText('System monitoring and statistics')).toBeInTheDocument()
  })

  it('opens add user modal when button is clicked', async () => {
    render(<AdminDashboardDemo />)
    
    const addUserButton = screen.getByText('Add New User')
    fireEvent.click(addUserButton)
    
    await waitFor(() => {
      expect(screen.getByText('Add New User')).toBeInTheDocument()
    })
  })

  it('opens system settings modal when button is clicked', async () => {
    render(<AdminDashboardDemo />)
    
    const settingsButton = screen.getByText('System Settings')
    fireEvent.click(settingsButton)
    
    await waitFor(() => {
      expect(screen.getByText('System Settings')).toBeInTheDocument()
    })
  })

  it('opens security audit modal when button is clicked', async () => {
    render(<AdminDashboardDemo />)
    
    const auditButton = screen.getByText('Security Audit')
    fireEvent.click(auditButton)
    
    await waitFor(() => {
      expect(screen.getByText('Security Audit Report')).toBeInTheDocument()
    })
  })

  it('opens data backup modal when button is clicked', async () => {
    render(<AdminDashboardDemo />)
    
    const backupButton = screen.getByText('Data Backup')
    fireEvent.click(backupButton)
    
    await waitFor(() => {
      expect(screen.getByText('Data Backup & Recovery')).toBeInTheDocument()
    })
  })

  it('opens view user modal when button is clicked', async () => {
    render(<AdminDashboardDemo />)
    
    const viewButtons = screen.getAllByText('View')
    fireEvent.click(viewButtons[0])
    
    await waitFor(() => {
      expect(screen.getByText(/User Details:/)).toBeInTheDocument()
    })
  })

  it('opens edit user modal when button is clicked', async () => {
    render(<AdminDashboardDemo />)
    
    const editButtons = screen.getAllByText('Edit')
    fireEvent.click(editButtons[0])
    
    await waitFor(() => {
      expect(screen.getByText(/Edit User:/)).toBeInTheDocument()
    })
  })

  it('opens delete user modal when button is clicked', async () => {
    render(<AdminDashboardDemo />)
    
    const deleteButtons = screen.getAllByText('Delete')
    fireEvent.click(deleteButtons[0])
    
    await waitFor(() => {
      expect(screen.getByText(/Delete User:/)).toBeInTheDocument()
    })
  })

  it('shows user roles correctly', () => {
    render(<AdminDashboardDemo />)
    
    expect(screen.getByText('HOSPITAL DOCTOR')).toBeInTheDocument()
    expect(screen.getByText('CLINIC DOCTOR')).toBeInTheDocument()
    expect(screen.getByText('PARENT')).toBeInTheDocument()
  })

  it('shows user status correctly', () => {
    render(<AdminDashboardDemo />)
    
    expect(screen.getByText('ACTIVE')).toBeInTheDocument()
    expect(screen.getByText('PENDING')).toBeInTheDocument()
  })

  it('displays audit log actions', () => {
    render(<AdminDashboardDemo />)
    
    expect(screen.getByText('Patient file uploaded')).toBeInTheDocument()
    expect(screen.getByText('Patient request approved')).toBeInTheDocument()
    expect(screen.getByText('Patient records accessed')).toBeInTheDocument()
  })

  it('shows audit log status', () => {
    render(<AdminDashboardDemo />)
    
    expect(screen.getByText('SUCCESS')).toBeInTheDocument()
    expect(screen.getByText('PENDING')).toBeInTheDocument()
  })
}) 