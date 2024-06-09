import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const bunkers = await db.bunker.findMany()
    return NextResponse.json(
      {
        data: bunkers,
      },
      {
        status: 200,
      },
    )
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Error fetching bunkers',
      },
      {
        status: 500,
      },
    )
  }
}