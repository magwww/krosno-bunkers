import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { currentUser } from '@clerk/nextjs/server'

export async function POST() {
  try {
    const user = await currentUser()

    if (!user || !user.id || !user.emailAddresses[0]?.emailAddress) {
      return NextResponse.json(
        {
          success: false,
          error: 'No clerk user found',
        },
        { status: 400 },
      )
    }

    const match = await db.user.findUnique({
      where: {
        clerkId: user.id,
      },
    })

    if (!match) {
      await db.user.create({
        data: {
          clerkId: user.id,
          email: user.emailAddresses[0].emailAddress,
        },
      })
    }

    return NextResponse.json(
      {
        data: user,
      },
      { status: 200 },
    )
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'

    return NextResponse.json(
      {
        success: false,
        error: `Error creating user: ${errorMessage}`,
      },
      { status: 500 },
    )
  }
}
