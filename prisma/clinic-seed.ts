/**
 * CareBridge Clinic Database Seeding Script
 * Populates the database with comprehensive outbound clinic data
 */

import { PrismaClient } from '@prisma/client'
import { standardizePhoneNumber, standardizeFaxNumber } from '../src/lib/phone-utils'

const prisma = new PrismaClient()

// Montreal area outbound clinics data
const OUTBOUND_CLINICS_DATA = {
  "The Children's Care Clinic Pierrefonds": {
    "Region": "CIUSSS Ouest",
    "Phone number": "(514) 696-2442",
    "Fax number": "514-624-3099",
    "Email": "cathy.ammendolea@bell.net",
    "Address": "14770 Boul. de Pierrefonds Suite 100, Pierrefonds-Roxboro, QC H9H 4Y6"
  },
  "Lasalle Hospital Pediatrics": {
    "Region": "CIUSSS Ouest",
    "Phone number": "(514) 362-8000",
    "Fax number": "514-367-8328",
    "Email": "pediatrie.lasalle.comtl@ssss.gouv.qc.ca",
    "Address": "8585 Terr. Champlain, LaSalle, QC H8P 1C1"
  },
  "Tiny tots": {
    "Region": "CIUSSS Centre-Ouest",
    "Phone number": "(514) 342-9911",
    "Fax number": null,
    "Email": "info@clubtinytots.ca",
    "Address": "6900 Décarie Boulevard, Suite 3550 Montréal Québec H3X 2T8"
  },
  "Bloom Clinic": {
    "Region": "CIUSSS Centre-Ouest",
    "Phone number": "(438) 793-2853",
    "Fax number": "438-858-2077",
    "Email": "patients@lotusmedical.ca",
    "Address": "3535 Queen Mary Rd Suite 600, Montreal, Quebec H3V 1H8"
  },
  "The Children's Clinic": {
    "Region": "",
    "Phone number": "(514) 904-2422",
    "Fax number": "514.905.9091",
    "Email": null,
    "Address": "\n5100 de Maisonneuve West 2nd floor, Montréal, Québec, H4A 3T2"
  },
  "Hopital Notre Dame Pediatrics": {
    "Region": "CIUSSS Centre-Sud",
    "Phone number": "(514) 413-8777 x 24400 or x124399 5144138700*2 to discuss if pt has been seen",
    "Fax number": "514-362-2828",
    "Email": " ",
    "Address": "Hôpital Notre-Dame 1560, rue Sherbrooke Est H2L 4M1"
  },
  "Hopital Maisonneuve-Rosemont": {
    "Region": "CIUSSS Est",
    "Phone number": null,
    "Fax number": "514-374-8101",
    "Email": "consultation.ped.cemtl@ssss.gouv.qc.ca",
    "Address": "5345 Bd de l'Assomption #225, Montréal, QC H1T 4B3"
  },
  "Centre ambulatoire de pediatrique CIUSSS Du Nord-de l'ile": {
    "Region": "CIUSSS Nord",
    "Phone number": "514-495-6767",
    "Fax number": "514-495-6755 ",
    "Email": "pediatrie.cnmtl@ssss.gouv.qc.ca          coralie-jeanne.leblicq.med@ssss.gouv.qc.ca",
    "Address": "1415 rue Jarry Est, 4eme etage, local D810; H2E1A7"
  },
  "Pediatrie Hôpital de Rouyn-Noranda": {
    "Region": "ABITIBI-TÉMISCAMINGUE",
    "Phone number": "(819) 764-5131",
    "Fax number": null,
    "Email": null,
    "Address": "4 9e Rue, Rouyn-Noranda, QC J9X 2B2"
  },
  "Pédiatrie Hôpital régional de Rimouski": {
    "Region": "BAS-SAINT-LAURENT",
    "Phone number": "418 724-8591",
    "Fax number": null,
    "Email": null,
    "Address": "150 Av. Rouleau, Rimouski, QC G5L 5T1"
  },
  "Clinique Sainte-Foy": {
    "Region": "CAPITALE-NATIONALE",
    "Phone number": "(418) 781-0480",
    "Fax number": "(418) 659-7072",
    "Email": null,
    "Address": "2e étage 2600, boulevard Laurier, Suite 295 Québec (Québec) G1V 4T3"
  },
  "Hôtel-Dieu d'Arthabaska": {
    "Region": "CENTRE DU QUÉBEC",
    "Phone number": "(819) 357-2030",
    "Fax number": "(819) 357-2303",
    "Email": "genevieve_beaudoin@ssss.gouv.qc.ca",
    "Address": "5 rue des Hospitalières Victoriaville QC G6P 6N2"
  },
  "Clinique Pédiatrique Sept-Îles-CISSS de la Cote-Nord": {
    "Region": "COTE NORD",
    "Phone number": "(418) 962-9761*452070",
    "Fax number": null,
    "Email": "josee.leblanc.09cissss@ssss.gouv.qc.ca",
    "Address": "45 Rue Père Divet, Sept-Îles, QC G4R 3N7"
  },
  "ESTRIE": {
    "Region": "COTE NORD",
    "Phone number": null,
    "Fax number": null,
    "Email": null,
    "Address": "Québec (Québec) G1V 4T3"
  },
  "CIUSSS de l'Estrie - Centre hospitalier Universitaire de Sherbrooke": {
    "Region": "COTE NORD",
    "Phone number": "819-780-2220",
    "Fax number": "819-564-5398",
    "Email": null,
    "Address": "300 Rue King E, Sherbrooke, QC J1G 1B1"
  },
  "CISSS de Gaspésie-Hôpital de Maria": {
    "Region": "GASPÉSIE-ÎLES-DE-LA-MADELAINE",
    "Phone number": null,
    "Fax number": null,
    "Email": "philippe.noel.cisssgaspesie@ssss.gouv.qc.ca",
    "Address": "419 Bd Perron, Maria, QC G0C 1Y0"
  },
  "Hopital Pierre-Le Gardeur Pediatrie": {
    "Region": "LANAUDIÈRE",
    "Phone number": "450-654-7525",
    "Fax number": "450-470-9705",
    "Email": "pediatrie.desrosierslanglois.cissslan@ssss.gouv.qc.ca\njulie.tonnerre.cissslan@ssss.gouv.qc.ca",
    "Address": "911 Mnt des Pionniers, Terrebonne, QC J6V 2H2"
  },
  "Pediatrie Hôpital de Joliette": {
    "Region": "LANAUDIÈRE",
    "Phone number": "450-759-8222 ext x2787",
    "Fax number": "450-756-4973",
    "Email": " ",
    "Address": "1000 Bd Sainte-Anne, Saint-Charles-Borromée, QC J6E 6J2"
  },
  "Clinique Pédiatrique des Milles Iles (Ste Eustache)": {
    "Region": "LAURENTIDES",
    "Phone number": " 450-434-8006",
    "Fax number": "450-434-8007",
    "Email": " ",
    "Address": "233 Rue Turgeon, Sainte-Thérèse, QC J7E 3J8"
  },
  "Pédiatres de l'Hôpital de St-Eustache": {
    "Region": "LAURENTIDES",
    "Phone number": " ",
    "Fax number": " ",
    "Email": "pediatrie.lddm.cissslau@ssss.gouv.qc.ca",
    "Address": "520 Bd Arthur-Sauvé, Saint-Eustache, QC J7R 5B1"
  },
  "Dre Caroline Drolet, Clinique Santé Praticienne Plus": {
    "Region": "LAURENTIDES",
    "Phone number": "450-227-4243",
    "Fax number": "450-227-4223",
    "Email": null,
    "Address": " \n570 boulevard des Laurentides, Piedmont, Qc, J0R 1K0. "
  },
  "Dr Charles Haccoun, Clinique médicale St-Antoine": {
    "Region": "LAURENTIDES",
    "Phone number": "450-432-3308",
    "Fax number": "450-432-1004",
    "Email": "\n",
    "Address": "305 rue du Docteur Charles-Léonard, bureau 300, St-Jérôme, Qc, J7Y 0M9"
  },
  "Clinique Pédiatrique St Jerome": {
    "Region": "LAURENTIDES",
    "Phone number": "450-436-9818",
    "Fax number": "450-436-9817",
    "Email": " ",
    "Address": "1000 Rue Labelle #2100, Saint-Jérôme, QC J7Z 5N6"
  },
  "Clinique médicale Cité Mirabel": {
    "Region": "LAURENTIDES",
    "Phone number": "450-508-1012",
    "Fax number": "450-508-1011",
    "Email": " ",
    "Address": "11 800 rue de Chaumont suite 300, Mirabel J7J 0T8"
  },
  "Pédiatres de Ste-Agathe": {
    "Region": "LAURENTIDES",
    "Phone number": null,
    "Fax number": "819-324-4108",
    "Email": "secretariat.pediatrie.sommets@ssss.gouv.qc.ca",
    "Address": "201 rue St-Vincent, Ste-Agathe, J8C2E3"
  },
  "Trois Rivieres": {
    "Region": "MAURICIE",
    "Phone number": "819-375-0504",
    "Fax number": "819-375-0686",
    "Email": null,
    "Address": "1991, boulevard du Carmel Trois-Rivières (Québec) G8Z 3R9"
  },
  "Hopital Charles Lemoyne": {
    "Region": "MONTÉRÉGIE CENTRE",
    "Phone number": null,
    "Fax number": "450-466-5437",
    "Email": "cliniqueambulatoirepediatrie.hclm.cisssmc16@ssss.gouv.qc.ca",
    "Address": "3120 Taschereau Blvd, Greenfield Park, Quebec J4V 2H1"
  },
  "Hôpital du Haut-Richelieu pediatrics": {
    "Region": "MONTÉRÉGIE CENTRE",
    "Phone number": " (450) 359-5000",
    "Fax number": "450-359-5397",
    "Email": null,
    "Address": "920 Bd du Séminaire N, Saint-Jean-sur-Richelieu, QC J3A 1B7"
  },
  "Hopital Pierre boucher": {
    "Region": "MONTÉRÉGIE EST",
    "Phone number": "(450) 468-8111 x 88337",
    "Fax number": "450-468-7157",
    "Email": "cliniquepediatrique.pb.cisssme16@ssss.gouv.qc.ca",
    "Address": "1333, boulevard Jacques-Cartier Est Longueuil QC J4M 2A5"
  },
  "Hôpital Honoré-Mercier Pavillon Saint-Charles": {
    "Region": "MONTÉRÉGIE EST",
    "Phone number": "450-771-3425",
    "Fax number": "450-771-3626",
    "Email": "guylaine.hebert.csssry16@ssss.gouv.qc.ca",
    "Address": "2750, boulevard Laframboise, Saint-Hyacinthe J2S 4Y8"
  },
  "Anna Laberge Hospital": {
    "Region": "MONTÉRÉGIE OUEST",
    "Phone number": "(450) 699-2425",
    "Fax number": "450-699-2490",
    "Email": null,
    "Address": "200 Bd Brisebois, Châteauguay, QC J6K 4W8"
  },
  "Northern Program-Montreal Children's Hospital": {
    "Region": "NORD DE QUÉBEC",
    "Phone number": null,
    "Fax number": null,
    "Email": "18tcr.crds.eeyouistchee@ssss.gouv.qc.ca",
    "Address": "G0G, G0W, G8P postal codes"
  },
  "Clinique Le Copain-CISSSO Outaouais Hôpital de Gatineau": {
    "Region": "OUTAOUAIS",
    "Phone number": "(819) 966-6100*333059 *333057",
    "Fax number": "(819) 966-6203",
    "Email": "07_csssg_copain@ssss.gouv.qc.ca",
    "Address": "909 Bd la Vérendrye O, Gatineau, QC J8P 7H2"
  },
  "Clinique de Pédiatrie du Saguenay": {
    "Region": "SAGUENAY LAC-SAINT-JEAN",
    "Phone number": "(418) 549-1034",
    "Fax number": 4186964673,
    "Email": "clinique@pediatriesaguenay.ca",
    "Address": "475 Bd Talbot, Chicoutimi, QC G7H 4A3"
  },
  "Clinique Pédiatrie Alma": {
    "Region": "SAGUENAY LAC-SAINT-JEAN",
    "Phone number": "(418) 487-2494",
    "Fax number": null,
    "Email": null,
    "Address": "935 ave du Pont Alma, Québec G8B 2V5"
  }
}

/**
 * Clean and standardize clinic data
 */
function processClinicData(name: string, data: any) {
  // Clean email - handle empty strings and whitespace
  let email = data.Email
  if (!email || email.trim() === '' || email.trim() === ' ' || email.trim() === '\n') {
    email = null
  } else {
    email = email.trim().replace(/\n/g, ' ').replace(/\s+/g, ' ')
    // Handle multiple emails - take the first one
    if (email.includes(' ')) {
      email = email.split(' ')[0]
    }
  }

  // Clean region
  let region = data.Region
  if (!region || region.trim() === '') {
    region = null
  }

  // Clean address
  let address = data.Address
  if (address) {
    address = address.trim().replace(/\n/g, ' ').replace(/\s+/g, ' ')
  }

  return {
    name: name.trim(),
    region,
    address,
    phone: standardizePhoneNumber(data['Phone number']),
    fax: standardizeFaxNumber(data['Fax number']),
    email,
    specializations: ['Pediatrics'], // Default specialization
    acceptingNew: true,
    isActive: true
  }
}

/**
 * Seed the database with outbound clinic data
 */
async function seedOutboundClinics() {
  console.log('🏥 Starting outbound clinic database seeding...')

  try {
    const clinics = []
    let processed = 0
    let skipped = 0

    for (const [clinicName, clinicData] of Object.entries(OUTBOUND_CLINICS_DATA)) {
      try {
        const processedData = processClinicData(clinicName, clinicData)
        
        // Check if clinic already exists
        const existingClinic = await prisma.clinic.findFirst({
          where: { name: processedData.name }
        })

        if (existingClinic) {
          console.log(`⚠️  Clinic already exists: ${processedData.name}`)
          skipped++
          continue
        }

        const clinic = await prisma.clinic.create({
          data: processedData
        })

        clinics.push(clinic)
        processed++
        console.log(`✅ Created clinic: ${clinic.name} (${clinic.region || 'No region'})`)

      } catch (error) {
        console.error(`❌ Error processing clinic ${clinicName}:`, error)
      }
    }

    console.log(`\n🎉 Clinic seeding completed!`)
    console.log(`📊 Summary:`)
    console.log(`   - Processed: ${processed} clinics`)
    console.log(`   - Skipped: ${skipped} existing clinics`)
    console.log(`   - Total in database: ${processed + skipped} clinics`)

    // Verify seeding
    const totalClinics = await prisma.clinic.count()
    const clinicsByRegion = await prisma.clinic.groupBy({
      by: ['region'],
      _count: { id: true },
    })

    console.log(`\n📈 Database statistics:`)
    console.log(`   - Total clinics: ${totalClinics}`)
    console.log(`   - Clinics by region:`)
    
    clinicsByRegion.forEach(({ region, _count }: { region: string | null, _count: { id: number } }) => {
      console.log(`     • ${region || 'No region'}: ${_count.id} clinics`)
    })

    return clinics

  } catch (error) {
    console.error('❌ Error during clinic seeding:', error)
    throw error
  }
}

/**
 * Main seeding function
 */
async function main() {
  try {
    await seedOutboundClinics()
  } catch (error) {
    console.error('❌ Seeding failed:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

// Run the seeding if this file is executed directly
if (require.main === module) {
  main()
}

export { seedOutboundClinics, OUTBOUND_CLINICS_DATA } 