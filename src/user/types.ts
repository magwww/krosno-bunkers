export type UserId = string

export interface AuthUser {
  id: UserId
  email: string
  firstName: string
  lastName: string
}

export interface User {
  id: UserId
  clerkId: string
  email: string
}

export interface AuthService {
  getUser: () => Promise<AuthUser | null>
}

export interface UserRepository {
  getById: (id: UserId) => Promise<User | undefined>
  create: (user: User) => Promise<User>
}
