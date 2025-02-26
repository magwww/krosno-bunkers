'use server'

import { AuthService, User, UserRepository } from './types'

export type CreateUserResponse = {
  data: Omit<User, 'clerkId'>
}

export async function createUser(
  authService: AuthService,
  userRepository: UserRepository,
): Promise<CreateUserResponse> {
  try {
    const user = await authService.getUser()

    if (!user || !user.id || !user.email) {
      throw new Error('No clerk user found')
    }

    const match = await userRepository.getBy({ clerkId: user.id })

    if (!match) {
      await userRepository.create({
        id: user.id,
        clerkId: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      })
    }

    return {
      data: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    throw new Error(`Error creating user: ${errorMessage}`)
  }
}
