import { User, UserRepository, UserId } from './types'
import { db } from '@/lib/db'

export class PrismaUserRepository implements UserRepository {
  async getById(id: UserId): Promise<User | undefined> {
    const user = await db.user.findUnique({ where: { id } })

    if (!user) return undefined

    return {
      id: user.id,
      clerkId: user.clerkId,
      email: user.email,
    }
  }

  async create(user: User): Promise<User> {
    return await db.user.create({ data: user })
  }
}
