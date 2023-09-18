import { Booking, Details, Schedule } from '../entities/Booking';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { Context } from '../types/context';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { getErrorMessages } from '../utils/errors';
import { sendNotification } from '../utils/notifications';

@Resolver()
export class BookingResolver {
  @Query(() => [Booking])
  async getMyBookings(
    @Arg('userId') userId: string,
    @Ctx() { db }: Context
  ): Promise<Booking[]> {
    try {
      const bookings = db.booking.findMany({
        where: { userId: Number(userId) },
      });
      return bookings;
    } catch (e) {
      throw new Error('Bookings can not be fetched now');
    }
  }
  @Query(() => [Booking])
  async getAllBookings(@Ctx() { db }: Context): Promise<Booking[]> {
    try {
      const bookings = db.booking.findMany({
        orderBy: { date_booking: 'desc' },
        take: 20,
      });
      return bookings;
    } catch (e) {
      throw new Error('Bookings can not be fetched now');
    }
  }

  @Query(() => [Booking])
  async getBookingsByDate(
    @Arg('date') date: string,
    @Ctx() { db }: Context
  ): Promise<Booking[]> {
    try {
      const bookings = await db.booking.findMany({
        where: { date_booking: date },
      });
      return bookings;
    } catch (e) {
      throw new Error(
        `Bookings for the ${date} where not able to fetch, please try again`
      );
    }
  }

  @Query(() => Schedule)
  async getSchedule(@Ctx() { db }: Context): Promise<Schedule | null> {
    try {
      const schedule = await db.schedule.findFirst();
      return schedule;
    } catch (e) {
      throw new Error('Keletron Schedule was not fetched, please try again');
    }
  }

  @Mutation(() => Booking)
  async addBooking(
    @Arg('details') details: Details,
    @Ctx() { db }: Context
  ): Promise<Booking> {
    try {
      const booking = await db.booking.create({ data: details });
      const admins = (await db.user.findMany({ where: { admin: true } }))
        .map(user => user.token_id)
        .filter(Boolean);
      const user = await db.user.findUnique({
        where: { id: details.userId },
      });

      const date = new Date(details.date_booking).toLocaleDateString('el-GR', {
        weekday: 'long',
        month: 'numeric',
        day: 'numeric',
      });

      sendNotification(admins, {
        title: 'Νεα Κράτηση',
        body: `${user?.last_name} ${user?.first_name} κράτηση στις ${details.time_slot} ${date}`,
      });
      return booking;
    } catch (e) {
      let message = '';
      const defaultMessage = 'Problem while saving. Please try again...';
      if (e instanceof PrismaClientKnownRequestError) {
        message = e.meta ? getErrorMessages(e.meta) : defaultMessage;
      }
      throw new Error(message);
    }
  }

  @Mutation(() => Booking)
  async deleteBooking(
    @Arg('id') id: number,
    @Ctx() { db }: Context
  ): Promise<Booking> {
    try {
      const deleted = await db.booking.delete({ where: { id: id } });
      return deleted;
    } catch (e) {
      throw new Error('Problem while deleting, please try again');
    }
  }
}
