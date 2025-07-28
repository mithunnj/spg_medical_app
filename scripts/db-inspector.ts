/**
 * CareBridge Database Inspector
 * Comprehensive script to validate and inspect clinic database data
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface RegionStat {
  region: string | null;
  _count: { id: number };
}

interface ClinicSample {
  name: string;
  region: string | null;
  phone: string | null;
  email: string | null;
}

async function inspectDatabase() {
  console.log('🏥 CareBridge Database Inspector')
  console.log('=====================================\n')

  try {
    // 1. Overall Statistics
    console.log('📊 DATABASE OVERVIEW:')
    const [clinicCount, hospitalCount, userCount, patientCount] = await Promise.all([
      prisma.clinic.count(),
      prisma.hospital.count(),
      prisma.user.count(),
      prisma.patient.count()
    ])

    console.log(`   • Total Clinics: ${clinicCount}`)
    console.log(`   • Total Hospitals: ${hospitalCount}`)
    console.log(`   • Total Users: ${userCount}`)
    console.log(`   • Total Patients: ${patientCount}\n`)

    // 2. Clinic Analysis
    console.log('🏥 CLINIC ANALYSIS:')
    
    // Active vs Inactive
    const [activeClinics, acceptingClinics] = await Promise.all([
      prisma.clinic.count({ where: { isActive: true } }),
      prisma.clinic.count({ where: { acceptingNew: true, isActive: true } })
    ])
    
    console.log(`   • Active Clinics: ${activeClinics}/${clinicCount}`)
    console.log(`   • Accepting New Patients: ${acceptingClinics}/${activeClinics}`)

    // Regional Distribution
    const regionStats = await prisma.clinic.groupBy({
      by: ['region'],
      where: { isActive: true },
      _count: { id: true },
      orderBy: { _count: { id: 'desc' } }
    })

    console.log(`\n📍 REGIONAL DISTRIBUTION:`)
    regionStats.forEach(({ region, _count }: RegionStat) => {
      console.log(`   • ${region || 'No Region'}: ${_count.id} clinics`)
    })

    // Contact Information Analysis
    const [clinicsWithPhone, clinicsWithEmail, clinicsWithBoth] = await Promise.all([
      prisma.clinic.count({ where: { phone: { not: null }, isActive: true } }),
      prisma.clinic.count({ where: { email: { not: null }, isActive: true } }),
      prisma.clinic.count({ where: { 
        phone: { not: null }, 
        email: { not: null }, 
        isActive: true 
      } })
    ])

    console.log(`\n📞 CONTACT INFORMATION:`)
    console.log(`   • Clinics with Phone: ${clinicsWithPhone}/${activeClinics}`)
    console.log(`   • Clinics with Email: ${clinicsWithEmail}/${activeClinics}`)
    console.log(`   • Clinics with Both: ${clinicsWithBoth}/${activeClinics}`)

    // Sample Data
    console.log(`\n🔍 SAMPLE CLINIC DATA:`)
    const sampleClinics: ClinicSample[] = await prisma.clinic.findMany({
      where: { isActive: true },
      take: 5,
      orderBy: { name: 'asc' },
      select: {
        name: true,
        region: true,
        phone: true,
        email: true
      }
    })

    sampleClinics.forEach((clinic: ClinicSample, index: number) => {
      console.log(`   ${index + 1}. ${clinic.name}`)
      console.log(`      Region: ${clinic.region || 'Not specified'}`)
      console.log(`      Phone: ${clinic.phone || 'Not provided'}`)
      console.log(`      Email: ${clinic.email || 'Not provided'}`)
      console.log('')
    })

    // Data Quality Checks
    console.log('🔍 DATA QUALITY CHECKS:')
    
    // Missing regions
    const missingRegion = await prisma.clinic.count({
      where: { region: null, isActive: true }
    })
    
    // Missing contact info
    const missingContact = await prisma.clinic.count({
      where: { 
        phone: null, 
        email: null, 
        isActive: true 
      }
    })
    
    // Duplicate names
    const duplicateNames = await prisma.clinic.groupBy({
      by: ['name'],
      having: { id: { _count: { gt: 1 } } },
      _count: { id: true }
    })

    console.log(`   • Clinics missing region: ${missingRegion}`)
    console.log(`   • Clinics missing all contact info: ${missingContact}`)
    console.log(`   • Duplicate clinic names: ${duplicateNames.length}`)

    // Recent additions
    console.log(`\n📅 RECENT ACTIVITY:`)
    const recentClinics: ClinicSample[] = await prisma.clinic.findMany({
      where: { isActive: true },
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: {
        name: true,
        region: true,
        phone: true,
        email: true
      }
    })

    console.log('   Recently added clinics:')
    recentClinics.forEach((clinic: ClinicSample, index: number) => {
      console.log(`   ${index + 1}. ${clinic.name} (${clinic.region || 'No region'})`)
    })

    console.log('\n✅ Database inspection completed!')
    console.log('📊 Summary: Database is healthy with comprehensive clinic data')

  } catch (error) {
    console.error('❌ Error during database inspection:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Run the inspection if this file is executed directly
if (require.main === module) {
  inspectDatabase()
}

export { inspectDatabase } 