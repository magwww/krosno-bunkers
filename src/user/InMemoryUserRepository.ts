import { User, UserRepository, UserSpecification } from './types'

export class InMemoryUserRepository implements UserRepository {
  private users: User[]

  constructor(users: User[] = []) {
    this.users = users
  }

  async getBy(specification: UserSpecification): Promise<User | undefined> {
    return this.users.find((user) => {
      if (specification.id && user.id !== specification.id) return false
      if (specification.clerkId && user.clerkId !== specification.clerkId) return false
      if (specification.email && user.email !== specification.email) return false

      return true
    })
  }

  async create(user: User): Promise<User> {
    this.users.push(user)
    return user
  }

  getCount(): number {
    return this.users.length
  }
}
