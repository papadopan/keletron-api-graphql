import { Query, Resolver } from 'type-graphql'

@Resolver()
export class BookingResolver {
  @Query(() => String)
  async me(): Promise<string> {
    return 'this is it '
  }
}
