import { Field, ID, InputType, Int, ObjectType } from 'type-graphql'

@ObjectType()
export class Booking {
  @Field(() => ID)
  id: number
}

@InputType()
export class Details {
  @Field(() => String)
  court: string

  @Field(() => String)
  date_booking: string

  @Field(() => String)
  time_slot: string

  @Field(() => Int)
  num_players: number

  @Field(() => [String])
  opponents: string[]
}
