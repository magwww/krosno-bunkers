import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  try {
    const bunker = await db.bunker.findUnique({
      where: { id },
      include: {
        users: {
          include: {
            user: true,
          },
        },
      },
    })

    if (!bunker) {
      return NextResponse.json({ error: 'Bunker not found' }, { status: 404 })
    }

    return NextResponse.json(bunker, { status: 200 })
  } catch (error) {
    console.error('Error fetching bunker:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
