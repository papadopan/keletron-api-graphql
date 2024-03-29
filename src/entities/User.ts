import { Field, ID, InputType, ObjectType } from 'type-graphql';
import { Booking } from './Booking';

@ObjectType()
export class Confirmation {
  @Field(() => ID)
  userId: number;

  @Field(() => Number)
  validation: number;
}
@ObjectType()
export class User {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  email: string;

  @Field(() => String)
  first_name: string;

  @Field(() => String)
  last_name: string;

  @Field(() => String)
  city: string;

  @Field(() => String)
  country: string;

  @Field(() => String)
  token_id: string;

  @Field(() => Boolean)
  admin: boolean;

  @Field(() => [Booking], { nullable: true })
  bookings?: Booking[];
}

@InputType()
export class LoginCredentials {
  @Field(() => String, { nullable: false })
  email: string;

  @Field(() => String, { nullable: false })
  password: string;
}

@InputType()
export class ForgotDetails {
  @Field(() => String, { nullable: false })
  email: string;

  @Field(() => String, { nullable: false })
  password: string;

  @Field(() => String, { nullable: false })
  code: string;
}

@InputType()
export class SignUpCredentials {
  @Field(() => String, { nullable: false })
  email: string;

  @Field(() => String, { nullable: false })
  first_name: string;

  @Field(() => String, { nullable: false })
  last_name: string;

  @Field(() => String, { nullable: false })
  password: string;

  @Field(() => String, { nullable: true })
  city?: string;

  @Field(() => String, { nullable: true })
  country?: string;
}

@InputType()
export class EditUser {
  @Field(() => String, { nullable: true })
  first_name?: string;

  @Field(() => String, { nullable: true })
  last_name?: string;

  @Field(() => String, { nullable: true })
  password?: string;

  @Field(() => String, { nullable: true })
  city?: string;

  @Field(() => String, { nullable: true })
  country?: string;

  @Field(() => String, { nullable: true })
  token_id?: string;
}
