import { Field, ID, InputType, Int, ObjectType } from 'type-graphql';

@ObjectType()
export class Booking {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  court: string;

  @Field(() => String)
  date_booking: string;

  @Field(() => String)
  time_slot: string;

  @Field(() => Int)
  num_players: number;

  @Field(() => Int)
  userId: number;

  @Field(() => [String])
  opponents: string[];
}

@InputType()
export class Details {
  @Field(() => String)
  court: string;

  @Field(() => String)
  date_booking: string;

  @Field(() => String)
  time_slot: string;

  @Field(() => Int)
  num_players: number;

  @Field(() => Int)
  userId: number;

  @Field(() => [String])
  opponents: string[];
}

@ObjectType()
export class Schedule {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  monday: string;

  @Field(() => String)
  tuesday: string;

  @Field(() => String)
  wednesday: string;
  @Field(() => String)
  thursday: string;

  @Field(() => String)
  friday: string;

  @Field(() => String)
  saturday: string;

  @Field(() => String)
  sunday: string;
}
