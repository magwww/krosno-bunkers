import { UserService } from './UserService'
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

        const userService = new UserService(authService, userRepository)

        const userResponse = await userService.createUser()
        // eslint-disable-next-line testing-library/no-await-sync-queries
        const user = await userRepository.getById('123')

        expect(userResponse).toEqual({
          data: {
            id: '123',
            email: 'test@test.com',
            firstName: 'John',
            lastName: 'Doe',
          },
        })

        expect(user).toEqual({
          id: '123',
          clerkId: '123',
          email: 'test@test.com',
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
          },
        ])

        const userService = new UserService(authService, userRepository)

        await userService.createUser()
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
      const userService = new UserService(authService, userRepository)

      await expect(userService.createUser()).rejects.toThrow('Error creating user: No clerk user found')
    })
  })

  describe('given an error from the auth service', () => {
    const authService = {
      getUser: jest.fn().mockRejectedValue(new Error('Authorization error')),
    }

    it('should throw an error', async () => {
      const userRepository = new InMemoryUserRepository()
      const userService = new UserService(authService, userRepository)

      await expect(userService.createUser()).rejects.toThrow('Error creating user: Authorization error')
    })
  })
})
