import { Booking, Details } from '../entities/Booking'
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'
import { Context } from '../types/context'

@Resolver()
export class BookingResolver {
  @Mutation(() => Booking)
  async addBooking(
    @Arg('details') details: Details,
    @Ctx() { db }: Context
  ): Promise<Booking> {
    try {
      const booking = await db.booking.create({ data: details })
      return booking
    } catch (e) {
      throw new Error('there is a problem while saving, please try again')
    }
  }
}
