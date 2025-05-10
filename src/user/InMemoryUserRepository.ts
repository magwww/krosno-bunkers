import { User, UserId, UserRepository } from './types'

export class InMemoryUserRepository implements UserRepository {
  private users: User[]

  constructor(users: User[] = []) {
    this.users = users
  }

  async getById(id: UserId): Promise<User | undefined> {
    return this.users.find((user) => user.id === id)
  }

  async create(user: User): Promise<User> {
    this.users.push(user)
    return user
  }

  getCount(): number {
    return this.users.length
  }
}
