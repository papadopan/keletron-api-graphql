import { Field, ID, InputType, ObjectType } from "type-graphql";

@ObjectType()
export class User {
  @Field(() => ID)
  id: number;
}


@InputType()
export class LoginCredentials {
  @Field(()=>String, {nullable: false})
  email: string

  @Field(()=> String, {nullable: false})
  password: string
}