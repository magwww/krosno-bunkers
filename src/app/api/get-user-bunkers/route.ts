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
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        {
          status: 404,
        },
      )
    }

    const userBunkers = await db.userBunker.findMany({
      where: { userId: user.id },
      include: {
        bunker: true,
      },
    })

    return NextResponse.json(
      {
        data: userBunkers,
      },
      {
        status: 200,
      },
    )
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'

    return NextResponse.json(
      {
        success: false,
        error: `Error fetching user's bunkers, ${errorMessage}`,
      },
      {
        status: 500,
      },
    )
  }
}
