import { createUser } from './create-user'
import { InMemoryUserRepository } from './InMemoryUserRepository'

describe('createUser', () => {
  describe('given an authorized user', () => {
    const authService = {
      getUser: jest.fn().mockResolvedValue({
        id: '123',
        email: 'test@test.com',
        firstName: 'John',
        lastName: 'Doe',
      }),
    }

    describe('when the user does not exist', () => {
      it('should create a user', async () => {
        const userRepository = new InMemoryUserRepository()

        await createUser(authService, userRepository)
        const user = await userRepository.getBy({ id: '123' })

        expect(user).toEqual({
          id: '123',
          clerkId: '123',
          email: 'test@test.com',
          firstName: 'John',
          lastName: 'Doe',
        })
      })
    })

    describe('when the user exists', () => {
      it('should not create a user', async () => {
        const userRepository = new InMemoryUserRepository([
          {
            id: '123',
            clerkId: '123',
            email: 'test@test.com',
            firstName: 'John',
            lastName: 'Doe',
          },
        ])

        await createUser(authService, userRepository)
        expect(userRepository.getCount()).toEqual(1)
      })
    })
  })

  describe('given an unauthorized user', () => {
    const authService = {
      getUser: jest.fn().mockResolvedValue(null),
    }

    it('should throw an error', async () => {
      const userRepository = new InMemoryUserRepository()
      await expect(createUser(authService, userRepository)).rejects.toThrow('Error creating user: No clerk user found')
    })
  })

  describe('given an error from the auth service', () => {
    const authService = {
      getUser: jest.fn().mockRejectedValue(new Error('Authorization error')),
    }

    it('should throw an error', async () => {
      const userRepository = new InMemoryUserRepository()
      await expect(createUser(authService, userRepository)).rejects.toThrow('Error creating user: Authorization error')
    })
  })
})
