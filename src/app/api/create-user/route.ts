import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { currentUser } from '@clerk/nextjs/server'

export async function POST() {
  try {
    const user = await currentUser()

    const match = await db.user.findUnique({
      where: {
        clerkId: user?.id,
      },
    })

    if (!match) {
      await db.user.create({
        data: {
          clerkId: user?.id!,
          email: user?.emailAddresses[0].emailAddress!,
        },
      })
    }

    return NextResponse.json(
      {
        data: user,
      },
      {
        status: 200,
      },
    )
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Error creating user',
      },
      {
        status: 500,
      },
    )
  }
}
