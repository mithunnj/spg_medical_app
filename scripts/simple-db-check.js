/**
 * Simple Database Checker (JavaScript)
 * Direct database queries without TypeScript complications
 */

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function simpleDbCheck() {
  console.log('🏥 CareBridge Database Quick Check')
  console.log('==================================\n')

  try {
    // Basic counts
    const clinicCount = await prisma.clinic.count()
    const activeCount = await prisma.clinic.count({ where: { isActive: true } })
    const acceptingCount = await prisma.clinic.count({ 
      where: { acceptingNew: true, isActive: true } 
    })

    console.log('📊 QUICK STATS:')
    console.log(`   • Total clinics: ${clinicCount}`)
    console.log(`   • Active clinics: ${activeCount}`)
    console.log(`   • Accepting new patients: ${acceptingCount}`)
    console.log('')

    // Sample data
    console.log('🔍 SAMPLE CLINICS:')
    const sampleClinics = await prisma.clinic.findMany({
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

    sampleClinics.forEach((clinic, index) => {
      console.log(`   ${index + 1}. ${clinic.name}`)
      console.log(`      Region: ${clinic.region || 'Not specified'}`)
      console.log(`      Phone: ${clinic.phone || 'Not provided'}`)
      console.log(`      Email: ${clinic.email || 'Not provided'}`)
      console.log('')
    })

    // Regions
    console.log('📍 REGIONS:')
    const regions = await prisma.clinic.findMany({
      where: { isActive: true, region: { not: null } },
      distinct: ['region'],
      select: { region: true },
      orderBy: { region: 'asc' }
    })

    console.log(`   Found ${regions.length} unique regions:`)
    regions.forEach((r, index) => {
      console.log(`   ${index + 1}. ${r.region}`)
    })

    console.log('\n✅ Database check completed!')
    console.log('\n🌐 Access your Neon dashboard at: https://console.neon.tech/')

  } catch (error) {
    console.error('❌ Error:', error.message)
  } finally {
    await prisma.$disconnect()
  }
}

simpleDbCheck() 