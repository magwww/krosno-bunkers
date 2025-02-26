export interface AuthUser {
  id: string
  email: string
  firstName: string
  lastName: string
}

export interface User {
  id: string
  clerkId: string
  email: string
  firstName: string
  lastName: string
}

export interface AuthService {
  getUser: () => Promise<AuthUser | null>
}

export type UserSpecification = {
  id?: string
  clerkId?: string
  email?: string
}

export interface UserRepository {
  getBy: (specification: UserSpecification) => Promise<User | undefined>
  create: (user: User) => Promise<User>
}
