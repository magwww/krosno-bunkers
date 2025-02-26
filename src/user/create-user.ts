'use server'

import { CreateUserResponse, UserService } from './UserService'
import { ClerkAuthService } from './ClerkAuthService'
import { InMemoryUserRepository } from './InMemoryUserRepository'

export async function createUser(): Promise<CreateUserResponse> {
  const userService = new UserService(new ClerkAuthService(), new InMemoryUserRepository())

  return userService.createUser()
}
