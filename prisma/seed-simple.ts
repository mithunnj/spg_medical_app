import { PrismaClient, UserRole } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🏥 Seeding medical database...')

  // Create Montreal Children's Hospital
  const hospital = await prisma.hospital.create({
    data: {
      name: "Montreal Children's Hospital - PICU",
      address: "1001 Decarie Blvd, Montreal, QC H4A 3J1",
      phone: "+1-514-412-4400",
      email: "picu@thechildren.com",
    },
  })

  // Create sample outbound clinics
  const clinic1 = await prisma.clinic.create({
    data: {
      name: "Family Medicine Clinic - Downtown",
      address: "1500 Atwater Ave, Montreal, QC H3Z 1X4",
      phone: "+1-514-555-0101",
      email: "contact@familymed-downtown.ca",
      specializations: ["Family Medicine", "Pediatrics"],
      capacity: 500,
      currentPatients: 320,
      acceptingNew: true,
    },
  })

  const clinic2 = await prisma.clinic.create({
    data: {
      name: "Pediatric Specialists of Montreal",
      address: "2300 Tupper St, Montreal, QC H3H 1P3", 
      phone: "+1-514-555-0202",
      email: "info@pedspec-montreal.ca",
      specializations: ["Pediatrics", "Cardiology", "Neurology"],
      capacity: 300,
      currentPatients: 180,
      acceptingNew: true,
    },
  })

  // Create test users
  const hospitalDoctor = await prisma.user.create({
    data: {
      email: "dr.smith@thechildren.com",
      name: "Dr. Sarah Smith",
      role: UserRole.HOSPITAL_DOCTOR,
      hospitalId: hospital.id,
      licenseNumber: "QC-12345",
      phone: "+1-514-412-4401",
    },
  })

  const clinicDoctor1 = await prisma.user.create({
    data: {
      email: "dr.johnson@familymed-downtown.ca",
      name: "Dr. Michael Johnson",
      role: UserRole.CLINIC_DOCTOR,
      clinicId: clinic1.id,
      licenseNumber: "QC-67890",
      phone: "+1-514-555-0103",
    },
  })

  const clinicDoctor2 = await prisma.user.create({
    data: {
      email: "dr.wilson@pedspec-montreal.ca",
      name: "Dr. Emily Wilson",
      role: UserRole.CLINIC_DOCTOR,
      clinicId: clinic2.id,
      licenseNumber: "QC-54321",
      phone: "+1-514-555-0203",
    },
  })

  const parentUser = await prisma.user.create({
    data: {
      email: "parent@example.com",
      name: "John Doe",
      role: UserRole.PARENT,
      phone: "+1-514-555-0999",
    },
  })

  const adminUser = await prisma.user.create({
    data: {
      email: "admin@thechildren.com",
      name: "Admin User",
      role: UserRole.ADMIN,
      hospitalId: hospital.id,
    },
  })

  // Create test patients with simple encrypted data (base64 encoding for now)
  const patient1 = await prisma.patient.create({
    data: {
      firstNameEnc: Buffer.from("Emma").toString('base64'),
      lastNameEnc: Buffer.from("Thompson").toString('base64'),
      dobEnc: Buffer.from("2018-03-15").toString('base64'),
      healthCardEnc: Buffer.from("THOM18031501").toString('base64'),
      addressEnc: Buffer.from("123 Maple Street, Montreal, QC H1A 1A1").toString('base64'),
      phoneEnc: Buffer.from("+1-514-555-1234").toString('base64'),
      emergencyContactEnc: Buffer.from("Jane Thompson (Mother) - +1-514-555-5678").toString('base64'),
      admissionDate: new Date('2024-01-15'),
      diagnosis: "Post-surgical recovery - Appendectomy",
      medications: ["Amoxicillin 250mg", "Acetaminophen 160mg"],
      allergies: ["Penicillin"],
      specialNeeds: "Requires pediatric cardiology follow-up",
      hospitalId: hospital.id,
    },
  })

  const patient2 = await prisma.patient.create({
    data: {
      firstNameEnc: Buffer.from("Lucas").toString('base64'),
      lastNameEnc: Buffer.from("Martinez").toString('base64'),
      dobEnc: Buffer.from("2020-07-22").toString('base64'),
      healthCardEnc: Buffer.from("MART20072201").toString('base64'),
      addressEnc: Buffer.from("456 Oak Avenue, Montreal, QC H2B 2B2").toString('base64'),
      phoneEnc: Buffer.from("+1-514-555-4321").toString('base64'),
      emergencyContactEnc: Buffer.from("Maria Martinez (Mother) - +1-514-555-8765").toString('base64'),
      admissionDate: new Date('2024-01-20'),
      diagnosis: "Pneumonia - Resolved",
      medications: ["Albuterol inhaler"],
      allergies: [],
      specialNeeds: "No special requirements",
      hospitalId: hospital.id,
    },
  })

  // Create sample discharge requests
  const request1 = await prisma.dischargeRequest.create({
    data: {
      patientId: patient1.id,
      clinicId: clinic2.id, // Pediatric specialists for cardiology follow-up
      createdById: hospitalDoctor.id,
      priority: "HIGH",
      notes: "Patient requires cardiology follow-up within 2 weeks post-discharge",
      requiredCare: ["Pediatric Cardiology", "General Follow-up"],
      followUpNeeded: true,
    },
  })

  const request2 = await prisma.dischargeRequest.create({
    data: {
      patientId: patient2.id,
      clinicId: clinic1.id, // Family medicine for routine follow-up
      createdById: hospitalDoctor.id,
      priority: "NORMAL",
      notes: "Routine post-pneumonia follow-up required",
      requiredCare: ["General Follow-up"],
      followUpNeeded: true,
    },
  })

  console.log('✅ Database seeded successfully!')
  console.log(`
🏥 Created:
   - 1 Hospital: ${hospital.name}
   - 2 Clinics: ${clinic1.name}, ${clinic2.name}
   - 5 Users: Hospital Doctor, 2 Clinic Doctors, Parent, Admin
   - 2 Patients: Emma Thompson, Lucas Martinez
   - 2 Discharge Requests: 1 High Priority, 1 Normal Priority

🔑 Test Login Credentials:
   Hospital Doctor: dr.smith@thechildren.com (License: QC-12345)
   Clinic Doctor 1: dr.johnson@familymed-downtown.ca (License: QC-67890)
   Clinic Doctor 2: dr.wilson@pedspec-montreal.ca (License: QC-54321)
   Parent: parent@example.com
   Admin: admin@thechildren.com
  `)
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 