'use server'

import { CreateUserResponse, UserService } from './UserService'
import { ClerkAuthService } from './ClerkAuthService'
import { PrismaUserRepository } from './PrismaUserRepository'

export async function createUser(): Promise<CreateUserResponse> {
  const userService = new UserService(new ClerkAuthService(), new PrismaUserRepository())

  return userService.createUser()
}
