import { NextResponse, NextRequest } from 'next/server'
import { db } from '@/lib/db'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const userId = searchParams.get('userId')

  if (typeof userId !== 'string') {
    return NextResponse.json(
      { error: 'Invalid user ID' },
      {
        status: 400,
      },
    )
  }

  try {
    const user = await db.user.findUnique({
      where: { clerkId: userId },
      include: {
        bunkers: true,
      },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        {
          status: 404,
        },
      )
    }
    return NextResponse.json(
      {
        data: user.bunkers,
      },
      {
        status: 200,
      },
    )
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Error fetching user's bunkers",
      },
      {
        status: 500,
      },
    )
  }
}
