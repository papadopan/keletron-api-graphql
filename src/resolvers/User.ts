import { Context } from "../types/context";
import { Ctx, Query, Resolver } from "type-graphql";
import { User } from "../entities/User";

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
}
