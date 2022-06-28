import { Context } from '../types/context'
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import {
  EditUser,
  LoginCredentials,
  SignUpCredentials,
  User,
} from '../entities/User'
import { AuthenticationError, UserInputError } from 'apollo-server-core'
import argon2 from 'argon2'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'

@Resolver()
export class UserResolver {
  // fetch information for user based on the email
  @Query(() => User, { nullable: true })
  async getInfo(
    @Ctx() { db }: Context,
    @Arg('email') email: string
  ): Promise<User | null> {
    const myself = await db.user.findUnique({
      where: { email: email },
      include: { bookings: true },
    })
    return myself
  }

  @Mutation(() => User)
  async login(
    @Arg('credentials') credentials: LoginCredentials,
    @Ctx() { db }: Context
  ): Promise<User> {
    const { email, password } = credentials

    const user = await db.user.findUnique({ where: { email: email } })
    // if the user does not exist, it means that there is no such email
    // in the db, therefore it is an authentication error
    if (!user) throw new AuthenticationError('This email does not exist')
    const isPasswordValid = await argon2.verify(user.password, password)
    // in case the password
    if (!isPasswordValid) throw new UserInputError('Password is incorrect')

    return user
  }

  @Mutation(() => User)
  async signup(
    @Arg('credentials') credentials: SignUpCredentials,
    @Ctx() { db }: Context
  ): Promise<User> {
    const { password } = credentials
    // hash the password
    const hashPassword = await argon2.hash(password)

    const newUser = await db.user.create({
      data: {
        ...credentials,
        password: hashPassword,
      },
    })

    if (!newUser)
      throw new Error('Saving user was not possible, please try again')

    return newUser
  }

  @Mutation(() => User)
  async editUser(
    @Arg('fields') fields: EditUser,
    @Arg('email') email: string,
    @Ctx() { db }: Context
  ): Promise<User> {
    try {
      const updatedUser = await db.user.update({
        where: { email: email },
        data: fields,
      })
      return updatedUser
    } catch (e) {
      let message
      if (e instanceof PrismaClientKnownRequestError) {
        message = e.meta?.cause as string
      }
      throw Error(message || 'Updating was not successful, please try again')
    }
  }
}
