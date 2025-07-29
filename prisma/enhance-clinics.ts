/**
 * Enhance Clinic Data Script
 * Adds realistic capacity numbers, diverse specializations, and patient intake data
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// More diverse specializations for pediatric clinics
const PEDIATRIC_SPECIALIZATIONS = [
  'Pediatrics',
  'Family Medicine',
  'Pediatric Cardiology',
  'Pediatric Pulmonology',
  'Pediatric Neurology',
  'Adolescent Medicine',
  'Pediatric Gastroenterology',
  'Pediatric Endocrinology',
  'Pediatric Oncology',
  'Pediatric Surgery',
  'Neonatology',
  'Pediatric Emergency Medicine',
  'Pediatric Psychiatry',
  'Child Development',
  'Pediatric Infectious Diseases',
  'Pediatric Rheumatology',
  'Pediatric Nephrology',
  'Developmental Pediatrics',
  'Pediatric Orthopedics',
  'Pediatric Intensive Care'
]

// Generate realistic clinic capacity based on clinic type and location
function generateClinicCapacity(clinicName: string, region: string | null): { capacity: number, currentPatients: number } {
  let baseCapacity = 30 // Default capacity
  
  // Adjust capacity based on clinic type
  if (clinicName.toLowerCase().includes('hospital') || clinicName.toLowerCase().includes('hôpital')) {
    baseCapacity = Math.floor(Math.random() * 40) + 60 // 60-100 for hospitals
  } else if (clinicName.toLowerCase().includes('centre') || clinicName.toLowerCase().includes('center')) {
    baseCapacity = Math.floor(Math.random() * 30) + 40 // 40-70 for centers
  } else if (clinicName.toLowerCase().includes('clinic') || clinicName.toLowerCase().includes('clinique')) {
    baseCapacity = Math.floor(Math.random() * 25) + 20 // 20-45 for private clinics
  }
  
  // Add some regional variation
  if (region?.includes('MONTREAL') || region?.includes('CIUSSS')) {
    baseCapacity += Math.floor(Math.random() * 15) // Higher capacity in major urban areas
  }
  
  // Generate current patients (60-95% capacity)
  const utilizationRate = 0.6 + Math.random() * 0.35
  const currentPatients = Math.floor(baseCapacity * utilizationRate)
  
  return {
    capacity: baseCapacity,
    currentPatients: Math.min(currentPatients, baseCapacity)
  }
}

// Generate realistic specializations based on clinic type
function generateSpecializations(clinicName: string, region: string | null): string[] {
  const specializations = ['Pediatrics'] // Always include general pediatrics
  
  // Number of additional specializations based on clinic size
  let numSpecializations = 1
  if (clinicName.toLowerCase().includes('hospital') || clinicName.toLowerCase().includes('hôpital')) {
    numSpecializations = Math.floor(Math.random() * 4) + 3 // 3-6 specializations for hospitals
  } else if (clinicName.toLowerCase().includes('centre') || clinicName.toLowerCase().includes('center')) {
    numSpecializations = Math.floor(Math.random() * 3) + 2 // 2-4 specializations for centers
  } else {
    numSpecializations = Math.floor(Math.random() * 2) + 1 // 1-2 additional specializations for clinics
  }
  
  // Add Family Medicine for most clinics
  if (Math.random() > 0.3) {
    specializations.push('Family Medicine')
  }
  
  // Add random additional specializations
  const availableSpecs = PEDIATRIC_SPECIALIZATIONS.filter(spec => 
    !specializations.includes(spec)
  )
  
  for (let i = 0; i < numSpecializations && availableSpecs.length > 0; i++) {
    const randomIndex = Math.floor(Math.random() * availableSpecs.length)
    const selectedSpec = availableSpecs.splice(randomIndex, 1)[0]
    specializations.push(selectedSpec)
  }
  
  return specializations
}

/**
 * Update clinic acceptance status based on capacity
 */
function determineAcceptingNew(capacity: number, currentPatients: number): boolean {
  const utilizationRate = currentPatients / capacity
  
  // 95%+ capacity - not accepting
  if (utilizationRate >= 0.95) return false
  
  // 85-94% capacity - 70% chance of accepting
  if (utilizationRate >= 0.85) return Math.random() > 0.3
  
  // Below 85% capacity - always accepting
  return true
}

/**
 * Main enhancement function
 */
async function enhanceClinics() {
  console.log('🔧 Starting clinic data enhancement...')
  
  try {
    // Fetch all existing clinics
    const clinics = await prisma.clinic.findMany({
      where: { isActive: true }
    })
    
    console.log(`📊 Found ${clinics.length} clinics to enhance`)
    
    let enhanced = 0
    let skipped = 0
    
    for (const clinic of clinics) {
      try {
        // Skip if clinic already has capacity and multiple specializations
        if (clinic.capacity > 0 && clinic.specializations.length > 1) {
          console.log(`⏭️  Skipping ${clinic.name} - already enhanced`)
          skipped++
          continue
        }
        
        // Generate enhanced data
        const { capacity, currentPatients } = generateClinicCapacity(clinic.name, clinic.region)
        const specializations = generateSpecializations(clinic.name, clinic.region)
        const acceptingNew = determineAcceptingNew(capacity, currentPatients)
        
        // Update clinic
        await prisma.clinic.update({
          where: { id: clinic.id },
          data: {
            capacity,
            currentPatients,
            specializations,
            acceptingNew
          }
        })
        
        enhanced++
        console.log(`✅ Enhanced ${clinic.name}:`)
        console.log(`   📍 ${clinic.region || 'No region'}`)
        console.log(`   👥 Capacity: ${currentPatients}/${capacity} patients`)
        console.log(`   🏥 Specializations: ${specializations.join(', ')}`)
        console.log(`   ${acceptingNew ? '✅' : '❌'} Accepting new patients`)
        console.log('')
        
      } catch (error) {
        console.error(`❌ Error enhancing clinic ${clinic.name}:`, error)
      }
    }
    
    console.log(`\n🎉 Clinic enhancement completed!`)
    console.log(`📊 Summary:`)
    console.log(`   - Enhanced: ${enhanced} clinics`)
    console.log(`   - Skipped: ${skipped} clinics`)
    console.log(`   - Total processed: ${enhanced + skipped} clinics`)
    
    // Show final statistics
    const totalClinics = await prisma.clinic.count({ where: { isActive: true } })
    const acceptingClinics = await prisma.clinic.count({ 
      where: { isActive: true, acceptingNew: true } 
    })
    const avgCapacity = await prisma.clinic.aggregate({
      where: { isActive: true },
      _avg: { capacity: true, currentPatients: true }
    })
    
    console.log(`\n📈 Final database statistics:`)
    console.log(`   - Total active clinics: ${totalClinics}`)
    console.log(`   - Accepting new patients: ${acceptingClinics}`)
    console.log(`   - Average capacity: ${Math.round(avgCapacity._avg.capacity || 0)}`)
    console.log(`   - Average current patients: ${Math.round(avgCapacity._avg.currentPatients || 0)}`)
    
  } catch (error) {
    console.error('❌ Error during clinic enhancement:', error)
    throw error
  }
}

/**
 * Main function
 */
async function main() {
  try {
    await enhanceClinics()
  } catch (error) {
    console.error('❌ Enhancement failed:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

// Run the enhancement if this file is executed directly
if (require.main === module) {
  main()
}

export { enhanceClinics } 