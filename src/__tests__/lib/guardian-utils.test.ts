import { describe, it, expect } from '@jest/globals'

// Utility functions for guardian dashboard
const getStatusColor = (status: string) => {
  switch (status) {
    case 'PENDING': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    case 'APPROVED': return 'bg-green-100 text-green-800 border-green-200'
    case 'WAITLISTED': return 'bg-orange-100 text-orange-800 border-orange-200'
    default: return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}

const calculateDaysSinceRequest = (requestedDate: string) => {
  const days = Math.floor((Date.now() - new Date(requestedDate).getTime()) / (1000 * 60 * 60 * 24))
  return Math.min(days, 30)
}

const formatPatientName = (name: string, age: number, status: string) => {
  const statusText = status === 'PENDING' ? 'Pending' : 
                   status === 'APPROVED' ? 'Approved' : 
                   status === 'WAITLISTED' ? 'Waitlisted' : 'Unknown'
  return `${name} (${age} years) - ${statusText}`
}

const formatAppointmentDate = (date: string, time: string) => {
  return `${date} at ${time}`
}

const getQuickActions = (status: string, clinicStatus: string) => {
  if (status === 'PENDING') {
    return ['Message PICU Doctor', 'Contact Clinic']
  } else if (status === 'APPROVED') {
    return ['Message Clinic']
  } else if (status === 'WAITLISTED') {
    return ['Contact PICU for Alternative']
  }
  return []
}

describe('Guardian Dashboard Utility Functions', () => {
  describe('getStatusColor', () => {
    it('should return correct color for PENDING status', () => {
      expect(getStatusColor('PENDING')).toBe('bg-yellow-100 text-yellow-800 border-yellow-200')
    })

    it('should return correct color for APPROVED status', () => {
      expect(getStatusColor('APPROVED')).toBe('bg-green-100 text-green-800 border-green-200')
    })

    it('should return correct color for WAITLISTED status', () => {
      expect(getStatusColor('WAITLISTED')).toBe('bg-orange-100 text-orange-800 border-orange-200')
    })

    it('should return default color for unknown status', () => {
      expect(getStatusColor('UNKNOWN')).toBe('bg-gray-100 text-gray-800 border-gray-200')
    })

    it('should return default color for empty status', () => {
      expect(getStatusColor('')).toBe('bg-gray-100 text-gray-800 border-gray-200')
    })
  })

  describe('calculateDaysSinceRequest', () => {
    it('should calculate days correctly for recent date', () => {
      const recentDate = '2025-01-27'
      const days = calculateDaysSinceRequest(recentDate)
      expect(days).toBeGreaterThanOrEqual(0)
      expect(days).toBeLessThanOrEqual(30)
    })

    it('should cap days at 30 for old dates', () => {
      const oldDate = '2024-01-01'
      const days = calculateDaysSinceRequest(oldDate)
      expect(days).toBe(30)
    })

    it('should handle very old dates', () => {
      const veryOldDate = '2020-01-01'
      const days = calculateDaysSinceRequest(veryOldDate)
      expect(days).toBe(30)
    })

    it('should handle future dates', () => {
      const futureDate = '2025-12-31'
      const days = calculateDaysSinceRequest(futureDate)
      expect(days).toBe(0)
    })

    it('should handle invalid date strings', () => {
      const invalidDate = 'invalid-date'
      const days = calculateDaysSinceRequest(invalidDate)
      expect(days).toBeGreaterThanOrEqual(0)
      expect(days).toBeLessThanOrEqual(30)
    })
  })

  describe('formatPatientName', () => {
    it('should format pending patient name correctly', () => {
      const result = formatPatientName('Emma Johnson', 8, 'PENDING')
      expect(result).toBe('Emma Johnson (8 years) - Pending')
    })

    it('should format approved patient name correctly', () => {
      const result = formatPatientName('Lucas Johnson', 12, 'APPROVED')
      expect(result).toBe('Lucas Johnson (12 years) - Approved')
    })

    it('should format waitlisted patient name correctly', () => {
      const result = formatPatientName('Sophia Johnson', 6, 'WAITLISTED')
      expect(result).toBe('Sophia Johnson (6 years) - Waitlisted')
    })

    it('should handle unknown status', () => {
      const result = formatPatientName('Test Patient', 10, 'UNKNOWN')
      expect(result).toBe('Test Patient (10 years) - Unknown')
    })

    it('should handle zero age', () => {
      const result = formatPatientName('Baby Johnson', 0, 'PENDING')
      expect(result).toBe('Baby Johnson (0 years) - Pending')
    })
  })

  describe('formatAppointmentDate', () => {
    it('should format appointment date and time correctly', () => {
      const result = formatAppointmentDate('2025-02-01', '10:00 AM')
      expect(result).toBe('2025-02-01 at 10:00 AM')
    })

    it('should handle different time formats', () => {
      const result = formatAppointmentDate('2025-01-29', '2:30 PM')
      expect(result).toBe('2025-01-29 at 2:30 PM')
    })

    it('should handle 24-hour time format', () => {
      const result = formatAppointmentDate('2025-02-05', '14:30')
      expect(result).toBe('2025-02-05 at 14:30')
    })
  })

  describe('getQuickActions', () => {
    it('should return correct actions for pending patient', () => {
      const actions = getQuickActions('PENDING', 'PENDING')
      expect(actions).toEqual(['Message PICU Doctor', 'Contact Clinic'])
    })

    it('should return correct actions for approved patient', () => {
      const actions = getQuickActions('APPROVED', 'APPROVED')
      expect(actions).toEqual(['Message Clinic'])
    })

    it('should return correct actions for waitlisted patient', () => {
      const actions = getQuickActions('WAITLISTED', 'WAITLISTED')
      expect(actions).toEqual(['Contact PICU for Alternative'])
    })

    it('should return empty array for unknown status', () => {
      const actions = getQuickActions('UNKNOWN', 'UNKNOWN')
      expect(actions).toEqual([])
    })

    it('should return empty array for empty status', () => {
      const actions = getQuickActions('', '')
      expect(actions).toEqual([])
    })
  })

  describe('Integration Tests', () => {
    it('should work together for a complete patient scenario', () => {
      const patientName = 'Emma Johnson'
      const age = 8
      const status = 'PENDING'
      const requestedDate = '2025-01-27'
      const appointmentDate = '2025-02-01'
      const appointmentTime = '10:00 AM'

      // Test all functions together
      const formattedName = formatPatientName(patientName, age, status)
      const statusColor = getStatusColor(status)
      const daysSinceRequest = calculateDaysSinceRequest(requestedDate)
      const formattedAppointment = formatAppointmentDate(appointmentDate, appointmentTime)
      const quickActions = getQuickActions(status, status)

      expect(formattedName).toBe('Emma Johnson (8 years) - Pending')
      expect(statusColor).toBe('bg-yellow-100 text-yellow-800 border-yellow-200')
      expect(daysSinceRequest).toBeGreaterThanOrEqual(0)
      expect(daysSinceRequest).toBeLessThanOrEqual(30)
      expect(formattedAppointment).toBe('2025-02-01 at 10:00 AM')
      expect(quickActions).toEqual(['Message PICU Doctor', 'Contact Clinic'])
    })

    it('should handle approved patient scenario', () => {
      const patientName = 'Lucas Johnson'
      const age = 12
      const status = 'APPROVED'
      const requestedDate = '2025-01-25'

      const formattedName = formatPatientName(patientName, age, status)
      const statusColor = getStatusColor(status)
      const daysSinceRequest = calculateDaysSinceRequest(requestedDate)
      const quickActions = getQuickActions(status, status)

      expect(formattedName).toBe('Lucas Johnson (12 years) - Approved')
      expect(statusColor).toBe('bg-green-100 text-green-800 border-green-200')
      expect(daysSinceRequest).toBeGreaterThanOrEqual(0)
      expect(daysSinceRequest).toBeLessThanOrEqual(30)
      expect(quickActions).toEqual(['Message Clinic'])
    })

    it('should handle waitlisted patient scenario', () => {
      const patientName = 'Sophia Johnson'
      const age = 6
      const status = 'WAITLISTED'
      const requestedDate = '2025-01-24'

      const formattedName = formatPatientName(patientName, age, status)
      const statusColor = getStatusColor(status)
      const daysSinceRequest = calculateDaysSinceRequest(requestedDate)
      const quickActions = getQuickActions(status, status)

      expect(formattedName).toBe('Sophia Johnson (6 years) - Waitlisted')
      expect(statusColor).toBe('bg-orange-100 text-orange-800 border-orange-200')
      expect(daysSinceRequest).toBeGreaterThanOrEqual(0)
      expect(daysSinceRequest).toBeLessThanOrEqual(30)
      expect(quickActions).toEqual(['Contact PICU for Alternative'])
    })
  })
}) 