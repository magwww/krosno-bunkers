import { currentUser } from '@clerk/nextjs/server'
import { AuthService, AuthUser } from './types'

export class ClerkAuthService implements AuthService {
  async getUser(): Promise<AuthUser | null> {
    const user = await currentUser()

    if (!user) {
      return null
    }

    return {
      id: user.id,
      email: user.emailAddresses[0].emailAddress,
      firstName: user.firstName ?? '',
      lastName: user.lastName ?? '',
    }
  }
}
