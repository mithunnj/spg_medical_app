/**
 * CareBridge Database Query Examples
 * Demonstrates various database queries for clinic data
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface RegionCount {
  region: string | null;
  count: number;
}

async function runQueryExamples() {
  console.log('🔍 CareBridge Database Query Examples')
  console.log('=====================================\n')

  try {
    // Example 1: Find clinics by region
    console.log('1️⃣ CLINICS IN MONTREAL AREA (CIUSSS):')
    const montrealClinics = await prisma.clinic.findMany({
      where: {
        region: {
          contains: 'CIUSSS',
          mode: 'insensitive'
        },
        isActive: true
      },
      select: {
        name: true,
        region: true,
        phone: true
      },
      orderBy: { name: 'asc' }
    })

    montrealClinics.forEach((clinic, index) => {
      console.log(`   ${index + 1}. ${clinic.name}`)
      console.log(`      Region: ${clinic.region}`)
      console.log(`      Phone: ${clinic.phone || 'Not provided'}`)
      console.log('')
    })

    // Example 2: Search by clinic name
    console.log('2️⃣ SEARCH FOR "HOSPITAL" CLINICS:')
    const hospitalClinics = await prisma.clinic.findMany({
      where: {
        name: {
          contains: 'Hospital',
          mode: 'insensitive'
        },
        isActive: true
      },
      select: {
        name: true,
        region: true,
        email: true
      }
    })

    hospitalClinics.forEach((clinic, index) => {
      console.log(`   ${index + 1}. ${clinic.name} (${clinic.region || 'No region'})`)
    })

    // Example 3: Regional statistics
    console.log('\n3️⃣ CLINIC COUNT BY REGION:')
    const regionCounts = await prisma.clinic.groupBy({
      by: ['region'],
      where: { isActive: true },
      _count: { id: true },
      orderBy: { _count: { id: 'desc' } }
    })

    const mappedRegions: RegionCount[] = regionCounts
      .map(({ region, _count }) => ({
        region,
        count: _count.id
      }))
      .sort((a: RegionCount, b: RegionCount) => b.count - a.count)

    mappedRegions
      .forEach((region: RegionCount, index: number) => {
        console.log(`   ${index + 1}. ${region.region || 'No Region'}: ${region.count} clinics`)
      })

    // Example 4: Contact completeness
    console.log('\n4️⃣ CLINICS WITH COMPLETE CONTACT INFO:')
    const completeContact = await prisma.clinic.findMany({
      where: {
        phone: { not: null },
        email: { not: null },
        isActive: true
      },
      select: {
        name: true,
        phone: true,
        email: true
      },
      take: 5
    })

    completeContact.forEach((clinic, index) => {
      console.log(`   ${index + 1}. ${clinic.name}`)
      console.log(`      Phone: ${clinic.phone}`)
      console.log(`      Email: ${clinic.email}`)
      console.log('')
    })

    // Example 5: Advanced filtering
    console.log('5️⃣ CLINICS WITH PHONE NUMBERS (READY FOR CONTACT):')
    const clinicsWithPhone = await prisma.clinic.findMany({
      where: {
        phone: { not: null },
        acceptingNew: true,
        isActive: true
      },
      select: {
        name: true,
        region: true,
        phone: true
      },
      orderBy: { region: 'asc' },
      take: 10
    })

    clinicsWithPhone.forEach((clinic, index) => {
      console.log(`   ${index + 1}. ${clinic.name}`)
      console.log(`      Region: ${clinic.region || 'No region'}`)
      console.log(`      Phone: ${clinic.phone}`)
      console.log('')
    })

    console.log('✅ Query examples completed!')
    console.log('\n💡 TIP: Use these patterns in your CareBridge application')

  } catch (error) {
    console.error('❌ Error running query examples:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Run examples if this file is executed directly
if (require.main === module) {
  runQueryExamples()
}

export { runQueryExamples } 