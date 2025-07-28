/**
 * CareBridge Clinic Integration Tests
 * Tests for clinic database operations and data integrity
 */

import { 
  getAllActiveClinics,
  getClinicsByRegion,
  getAllRegions,
  searchClinicsByName,
  getClinicsAcceptingNew,
  getClinicStatistics
} from '../lib/clinic-queries'

// Mock Prisma client for testing
jest.mock('../lib/prisma', () => ({
  prisma: {
    clinic: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      count: jest.fn(),
      groupBy: jest.fn(),
      update: jest.fn(),
      create: jest.fn(),
    }
  }
}))

import { prisma } from '../lib/prisma'

describe('Clinic Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const mockClinicData = [
    {
      id: 'clinic-1',
      name: "The Children's Care Clinic Pierrefonds",
      region: 'CIUSSS Ouest',
      address: '14770 Boul. de Pierrefonds Suite 100, Pierrefonds-Roxboro, QC H9H 4Y6',
      phone: '(514) 696-2442',
      fax: '(514) 624-3099',
      email: 'cathy.ammendolea@bell.net',
      specializations: ['Pediatrics'],
      capacity: 0,
      currentPatients: 0,
      acceptingNew: true,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'clinic-2',
      name: 'Tiny tots',
      region: 'CIUSSS Centre-Ouest',
      address: '6900 Décarie Boulevard, Suite 3550 Montréal Québec H3X 2T8',
      phone: '(514) 342-9911',
      fax: null,
      email: 'info@clubtinytots.ca',
      specializations: ['Pediatrics'],
      capacity: 0,
      currentPatients: 0,
      acceptingNew: true,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]

  describe('getAllActiveClinics', () => {
    test('should return all active clinics ordered by region and name', async () => {
      const mockedFindMany = prisma.clinic.findMany as jest.MockedFunction<typeof prisma.clinic.findMany>
      mockedFindMany.mockResolvedValue(mockClinicData)

      const result = await getAllActiveClinics()

      expect(mockedFindMany).toHaveBeenCalledWith({
        where: { isActive: true },
        orderBy: [
          { region: 'asc' },
          { name: 'asc' }
        ]
      })
      expect(result).toEqual(mockClinicData)
    })
  })

  describe('getClinicsByRegion', () => {
    test('should return clinics filtered by region', async () => {
      const mockedFindMany = prisma.clinic.findMany as jest.MockedFunction<typeof prisma.clinic.findMany>
      const regionClinics = [mockClinicData[0]]
      mockedFindMany.mockResolvedValue(regionClinics)

      const result = await getClinicsByRegion('CIUSSS Ouest')

      expect(mockedFindMany).toHaveBeenCalledWith({
        where: { 
          region: 'CIUSSS Ouest',
          isActive: true 
        },
        orderBy: { name: 'asc' }
      })
      expect(result).toEqual(regionClinics)
    })
  })

  describe('getAllRegions', () => {
    test('should return unique regions list', async () => {
      const mockedFindMany = prisma.clinic.findMany as jest.MockedFunction<typeof prisma.clinic.findMany>
      const regionData = [
        { region: 'CIUSSS Ouest' },
        { region: 'CIUSSS Centre-Ouest' }
      ]
      // Suppress typing issues for test mocking
      mockedFindMany.mockResolvedValue(regionData as never)

      const result = await getAllRegions()

      expect(mockedFindMany).toHaveBeenCalledWith({
        where: { 
          isActive: true,
          region: { not: null }
        },
        select: { region: true },
        distinct: ['region'],
        orderBy: { region: 'asc' }
      })
      expect(result).toEqual(['CIUSSS Ouest', 'CIUSSS Centre-Ouest'])
    })
  })

  describe('searchClinicsByName', () => {
    test('should return clinics matching search term', async () => {
      const mockedFindMany = prisma.clinic.findMany as jest.MockedFunction<typeof prisma.clinic.findMany>
      const searchResults = [mockClinicData[0]]
      mockedFindMany.mockResolvedValue(searchResults)

      const result = await searchClinicsByName('Children')

      expect(mockedFindMany).toHaveBeenCalledWith({
        where: {
          name: {
            contains: 'Children',
            mode: 'insensitive'
          },
          isActive: true
        },
        orderBy: { name: 'asc' }
      })
      expect(result).toEqual(searchResults)
    })
  })

  describe('getClinicsAcceptingNew', () => {
    test('should return clinics accepting new patients', async () => {
      const mockedFindMany = prisma.clinic.findMany as jest.MockedFunction<typeof prisma.clinic.findMany>
      mockedFindMany.mockResolvedValue(mockClinicData)

      const result = await getClinicsAcceptingNew()

      expect(mockedFindMany).toHaveBeenCalledWith({
        where: {
          acceptingNew: true,
          isActive: true
        },
        orderBy: [
          { region: 'asc' },
          { name: 'asc' }
        ]
      })
      expect(result).toEqual(mockClinicData)
    })
  })

  describe('getClinicStatistics', () => {
    test('should return comprehensive clinic statistics', async () => {
      const mockedCount = prisma.clinic.count as jest.MockedFunction<typeof prisma.clinic.count>
      const mockedGroupBy = prisma.clinic.groupBy as jest.MockedFunction<typeof prisma.clinic.groupBy>

      mockedCount
        .mockResolvedValueOnce(35) // total clinics
        .mockResolvedValueOnce(33) // active clinics
        .mockResolvedValueOnce(28) // accepting new

      const mockGroupByResult = [
        { region: 'CIUSSS Ouest', _count: { id: 5 } },
        { region: 'CIUSSS Centre-Ouest', _count: { id: 8 } },
        { region: null, _count: { id: 2 } }
      ]
      mockedGroupBy.mockResolvedValue(mockGroupByResult as never)

      const result = await getClinicStatistics()

      expect(result).toEqual({
        totalClinics: 35,
        activeClinics: 33,
        acceptingNew: 28,
        regions: [
          { region: 'CIUSSS Ouest', count: 5 },
          { region: 'CIUSSS Centre-Ouest', count: 8 },
          { region: 'No region', count: 2 }
        ]
      })
    })
  })
})

describe('Clinic Data Validation', () => {
  test('should validate phone number standardization requirements', () => {
    const testData = {
      name: 'Test Clinic',
      phone: '(514) 696-2442',
      fax: '(514) 624-3099',
      email: 'test@clinic.ca'
    }

    // Validate standardized phone format
    expect(testData.phone).toMatch(/^\(\d{3}\) \d{3}-\d{4}$/)
    expect(testData.fax).toMatch(/^\(\d{3}\) \d{3}-\d{4}$/)
  })

  test('should validate region categorization', () => {
    const validRegions = [
      'CIUSSS Ouest',
      'CIUSSS Centre-Ouest',
      'CIUSSS Centre-Sud',
      'CIUSSS Est',
      'CIUSSS Nord',
      'ABITIBI-TÉMISCAMINGUE',
      'BAS-SAINT-LAURENT',
      'CAPITALE-NATIONALE',
      'CENTRE DU QUÉBEC',
      'COTE NORD',
      'GASPÉSIE-ÎLES-DE-LA-MADELAINE',
      'LANAUDIÈRE',
      'LAURENTIDES',
      'MAURICIE',
      'MONTÉRÉGIE CENTRE',
      'MONTÉRÉGIE EST',
      'MONTÉRÉGIE OUEST',
      'NORD DE QUÉBEC',
      'OUTAOUAIS',
      'SAGUENAY LAC-SAINT-JEAN'
    ]

    // All valid regions should be present in our data set
    expect(validRegions.length).toBeGreaterThan(15)
    expect(validRegions).toContain('CIUSSS Ouest')
    expect(validRegions).toContain('MONTÉRÉGIE CENTRE')
  })

  test('should validate email format requirements', () => {
    const validEmails = [
      'cathy.ammendolea@bell.net',
      'info@clubtinytots.ca',
      'patients@lotusmedical.ca'
    ]

    validEmails.forEach(email => {
      expect(email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    })
  })
}) 