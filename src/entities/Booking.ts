import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Booking {
  @Field()
  id: string
}