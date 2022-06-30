import { Booking, Details } from '../entities/Booking'
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { Context } from '../types/context'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { getErrorMessages } from '../utils/errors'

@Resolver()
export class BookingResolver {
  @Query(() => String)
  async getMyBookings(@Arg('userId') userId: number, @Ctx() { db }: Context) {
    try {
      const bookings = db.booking.findFirst({ where: { userId: userId } })
      return bookings
    } catch (e) {
      throw new Error('Bookings can not be fetched now')
    }
  }

  @Mutation(() => Booking)
  async addBooking(
    @Arg('details') details: Details,
    @Ctx() { db }: Context
  ): Promise<Booking> {
    try {
      const booking = await db.booking.create({ data: details })
      return booking
    } catch (e) {
      let message = ''
      const defaultMessage = 'Problem while saving. Please try again...'
      if (e instanceof PrismaClientKnownRequestError) {
        message = e.meta ? getErrorMessages(e.meta) : defaultMessage
      }
      throw new Error(message)
    }
  }

  @Mutation(() => Booking)
  async deleteBooking(
    @Arg('id') id: number,
    @Ctx() { db }: Context
  ): Promise<Booking> {
    try {
      const deleted = await db.booking.delete({ where: { id: id } })
      return deleted
    } catch (e) {
      throw new Error('Problem while deleting, please try again')
    }
  }
}
