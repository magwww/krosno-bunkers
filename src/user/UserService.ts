import { AuthService, User, UserRepository } from './types'

export type CreateUserResponse = {
  data: Omit<User, 'clerkId'>
}

export class UserService {
  constructor(
    private readonly authService: AuthService,
    private readonly userRepository: UserRepository,
  ) {}

  async createUser(): Promise<CreateUserResponse> {
    try {
      const user = await this.authService.getUser()

      // @TOOD: Is this possible to have no ID or email?
      if (!user || !user.id || !user.email) {
        throw new Error('No clerk user found')
      }

      const match = await this.userRepository.getBy({ clerkId: user.id })

      if (!match) {
        await this.userRepository.create({
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
}
