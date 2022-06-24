import { Context } from "../types/context";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { LoginCredentials, User } from "../entities/User";
import { AuthenticationError, UserInputError } from "apollo-server-core";
import argon2 from "argon2";

@Resolver()
export class UserResolver {
  // fetch information for myself
  @Query(() => User, { nullable: true })
  async me(
    @Ctx() { db }: Context
  ): Promise<User | null> {
    const myself = await db.user.findUnique({where:{email:"antonios.papadopan@gmail.com"}})
    return myself;
  }

  @Mutation(()=>User)
  async login(
    @Arg("credentials") credentials: LoginCredentials,
    @Ctx() {db}: Context
  ): Promise<User>{
    const {email, password} = credentials;

    const user = await db.user.findUnique({where:{email: email}})
    // if the user does not exist, it means that there is no such email
    // in the db, therefore it is an authentication error
    if(!user) throw new AuthenticationError("This email does not exist")
    const isPasswordValid = await argon2.verify(user.password, password)
    // in case the password
    if(!isPasswordValid) throw new UserInputError("Password is incorrect")

    return user
  }
}
