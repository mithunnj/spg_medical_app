import { NextRequest, NextResponse } from 'next/server'
import { getAllActiveClinics } from '@/lib/clinic-queries'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const acceptingOnly = searchParams.get('acceptingOnly') === 'true'
    
    // Fetch clinics from database
    const clinics = await getAllActiveClinics()
    
    // Filter by accepting status if requested
    const filteredClinics = acceptingOnly 
      ? clinics.filter(clinic => clinic.acceptingNew)
      : clinics
    
    // Transform clinic data for the frontend with availability status
    const enrichedClinics = filteredClinics.map(clinic => {
      const availableSlots = Math.max(0, clinic.capacity - clinic.currentPatients)
      const utilizationPercentage = clinic.capacity > 0 
        ? Math.round((clinic.currentPatients / clinic.capacity) * 100) 
        : 0
      
      // Add availability status
      let availabilityStatus: 'AVAILABLE' | 'LIMITED' | 'FULL' = 'AVAILABLE'
      if (utilizationPercentage >= 95) {
        availabilityStatus = 'FULL'
      } else if (utilizationPercentage >= 80) {
        availabilityStatus = 'LIMITED'
      }
      
      return {
        id: clinic.id,
        name: clinic.name,
        region: clinic.region || 'Quebec',
        address: clinic.address,
        phone: clinic.phone,
        email: clinic.email,
        specializations: clinic.specializations,
        capacity: clinic.capacity,
        currentPatients: clinic.currentPatients,
        availableSlots,
        utilizationPercentage,
        availabilityStatus,
        acceptingNew: clinic.acceptingNew,
        isActive: clinic.isActive
      }
    })
    
    return NextResponse.json({
      success: true,
      data: enrichedClinics,
      total: enrichedClinics.length
    })
  } catch (error) {
    console.error('Error fetching clinics:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch clinics',
        data: [] 
      },
      { status: 500 }
    )
  }
} 