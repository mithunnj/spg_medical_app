import { NextResponse } from 'next/server'
import { getAllActiveClinics } from '@/lib/clinic-queries'

export async function GET() {
  try {
    const clinics = await getAllActiveClinics()
    return NextResponse.json(clinics)
  } catch (error) {
    console.error('Error fetching clinics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch clinics' },
      { status: 500 }
    )
  }
} 