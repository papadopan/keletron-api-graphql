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
@InputType()
export class SignUpCredentials {
  @Field(()=>String, {nullable: false})
  email: string

  @Field(()=>String, {nullable: false})
  first_name: string

  @Field(()=>String, {nullable: false})
  last_name: string

  @Field(()=> String, {nullable: false})
  password: string

  @Field(()=> String, {nullable: true})
  city?: string

  @Field(()=> String, {nullable: true})
  country?: string
}