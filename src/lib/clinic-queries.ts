/**
 * CareBridge Clinic Query Utilities
 * Functions for retrieving and filtering clinic data
 */

import { prisma } from './prisma'

// Use the generated Prisma type
type Clinic = {
  id: string
  name: string
  region: string | null
  address: string
  phone: string | null
  fax: string | null
  email: string | null
  specializations: string[]
  capacity: number
  currentPatients: number
  acceptingNew: boolean
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

/**
 * Get all active clinics
 */
export async function getAllActiveClinics(): Promise<Clinic[]> {
  return await prisma.clinic.findMany({
    where: { isActive: true },
    orderBy: [
      { region: 'asc' },
      { name: 'asc' }
    ]
  })
}

/**
 * Get clinics by region
 */
export async function getClinicsByRegion(region: string): Promise<Clinic[]> {
  return await prisma.clinic.findMany({
    where: { 
      region,
      isActive: true 
    },
    orderBy: { name: 'asc' }
  })
}

/**
 * Get all unique regions
 */
export async function getAllRegions(): Promise<string[]> {
  const result = await prisma.clinic.findMany({
    where: { 
      isActive: true,
      region: { not: null }
    },
    select: { region: true },
    distinct: ['region'],
    orderBy: { region: 'asc' }
  })
  
  return result
    .map((r: { region: string | null }) => r.region)
    .filter((region: string | null): region is string => region !== null)
}

/**
 * Search clinics by name
 */
export async function searchClinicsByName(searchTerm: string): Promise<Clinic[]> {
  return await prisma.clinic.findMany({
    where: {
      name: {
        contains: searchTerm,
        mode: 'insensitive'
      },
      isActive: true
    },
    orderBy: { name: 'asc' }
  })
}

/**
 * Get clinics accepting new patients
 */
export async function getClinicsAcceptingNew(): Promise<Clinic[]> {
  return await prisma.clinic.findMany({
    where: {
      acceptingNew: true,
      isActive: true
    },
    orderBy: [
      { region: 'asc' },
      { name: 'asc' }
    ]
  })
}

/**
 * Get clinic by ID with full details
 */
export async function getClinicById(id: string) {
  return await prisma.clinic.findUnique({
    where: { id },
    include: {
      users: {
        where: { isActive: true },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          phone: true
        }
      },
      requests: {
        orderBy: { requestedDate: 'desc' },
        take: 5,
        include: {
          patient: {
            select: {
              id: true,
              status: true,
              admissionDate: true
            }
          }
        }
      }
    }
  })
}

/**
 * Get clinic statistics
 */
export async function getClinicStatistics() {
  const [
    totalClinics,
    activeClinics,
    acceptingNew,
    clinicsByRegion
  ] = await Promise.all([
    prisma.clinic.count(),
    prisma.clinic.count({ where: { isActive: true } }),
    prisma.clinic.count({ where: { acceptingNew: true, isActive: true } }),
    prisma.clinic.groupBy({
      by: ['region'],
      where: { isActive: true },
      _count: { id: true },
      orderBy: { region: 'asc' }
    })
  ])

  return {
    totalClinics,
    activeClinics,
    acceptingNew,
    regions: clinicsByRegion.map(({ region, _count }: { region: string | null; _count: { id: number } }) => ({
      region: region || 'No region',
      count: _count.id
    }))
  }
}

/**
 * Update clinic availability status
 */
export async function updateClinicAvailability(
  clinicId: string, 
  acceptingNew: boolean
): Promise<Clinic> {
  return await prisma.clinic.update({
    where: { id: clinicId },
    data: { acceptingNew }
  })
}

/**
 * Get nearby clinics (by region match)
 */
export async function getNearbyClinicsByRegion(region: string): Promise<Clinic[]> {
  return await prisma.clinic.findMany({
    where: {
      region,
      isActive: true,
      acceptingNew: true
    },
    orderBy: { name: 'asc' }
  })
} 