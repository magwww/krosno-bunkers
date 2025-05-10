'use server'

import { CreateUserResponse, UserService } from './UserService'
import { ClerkAuthService } from './ClerkAuthService'
import { PrismaUserRepository } from './PrismaUserRepository'

const userService = new UserService(new ClerkAuthService(), new PrismaUserRepository())

export async function createUser(): Promise<CreateUserResponse> {
  return userService.createUser()
}
