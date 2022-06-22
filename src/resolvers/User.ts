import { Query, Resolver } from "type-graphql";

@Resolver()
export class UserResolver {
  @Query(() => String, { nullable: false })
  async me() {
    return "This is antonios";
  }
}
