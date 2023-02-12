import { Context } from '../types/context';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import {
  EditUser,
  LoginCredentials,
  SignUpCredentials,
  ForgotDetails,
  User,
  Confirmation,
} from '../entities/User';
import {
  AuthenticationError,
  UserInputError,
  ValidationError,
} from 'apollo-server-core';
import argon2 from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import nodemailer from 'nodemailer';

@Resolver()
export class UserResolver {
  // fetch information for user based on the email
  @Query(() => User, { nullable: true })
  async getInfo(
    @Ctx() { db }: Context,
    @Arg('userId') userId: string
  ): Promise<User | null> {
    const myself = await db.user.findUnique({
      where: { id: Number(userId) },
      include: { bookings: true },
    });
    return myself;
  }

  @Query(() => [User])
  async getUsers(@Ctx() { db }: Context): Promise<User[]> {
    try {
      const users = db.user.findMany({});
      return users;
    } catch (e) {
      throw new Error('Could not fetch all users');
    }
  }

  @Mutation(() => User)
  async validateUser(
    @Arg('code') code: string,
    @Arg('email') email: string,
    @Ctx() { db }: Context
  ): Promise<User> {
    const user = await db.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) throw new ValidationError('This email does not exist');

    const confirmation = await db.confirmation.findUnique({
      where: { userId: user.id },
    });

    if (!confirmation || confirmation.validation !== Number(code))
      throw new ValidationError('Code is not valid, request a new one');

    await db.confirmation.delete({ where: { userId: user.id } });

    const updateUser = db.user.update({
      where: { email: email.toLowerCase() },
      data: {
        activated: true,
      },
    });

    return updateUser;
  }

  @Mutation(() => User)
  async updateForgottenPassword(
    @Arg('details') details: ForgotDetails,
    @Ctx() { db }: Context
  ): Promise<User> {
    const { email, password, code } = details;

    const user = await db.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) throw new ValidationError('Email does not exist');

    const validationCode = await db.confirmation.findUnique({
      where: { userId: user.id },
    });

    if (!validationCode)
      throw new ValidationError('Confirmation Code does not exist');

    if (validationCode.validation !== Number(code))
      throw new ValidationError('The code you provided does not match');

    // delete this code
    await db.confirmation.delete({ where: { userId: user.id } });

    // hash the password
    const hashPassword = await argon2.hash(password);

    // update the user with the new password
    const updatedUser = await db.user.update({
      where: { email: user.email },
      data: {
        password: hashPassword,
      },
    });

    return updatedUser;
  }

  @Mutation(() => Confirmation)
  async forgotPassword(
    @Arg('email') email: string,
    @Ctx() { db }: Context
  ): Promise<Confirmation> {
    const user = await db.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) throw new AuthenticationError('This email does not exist');

    const currentConfirmation = await db.confirmation.findUnique({
      where: { userId: user.id },
    });

    // delete if confirmation for that user already exists
    if (currentConfirmation)
      await db.confirmation.delete({ where: { userId: user.id } });

    const confirmation = await db.confirmation.create({
      data: {
        userId: user.id,
        validation: Math.floor(Math.random() * 8000000),
      },
    });

    if (!confirmation) throw new Error('Confirmation code was not created');

    const mailTransporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'keletronapp@gmail.com',
        pass: process.env.GOOGLE_PWD,
      },
    });

    const details = {
      from: '<no response email>',
      to: email.toLowerCase(),
      subject: 'Keletron Tennis Academy',
      html: `Your code to activate your account is ${confirmation.validation}`,
    };

    mailTransporter.sendMail(details, err => console.log(err));

    return confirmation;
  }

  @Mutation(() => User)
  async login(
    @Arg('credentials') credentials: LoginCredentials,
    @Ctx() { db }: Context
  ): Promise<User> {
    const { email, password } = credentials;

    const user = await db.user.findUnique({
      where: { email: email.toLowerCase() },
      include: { bookings: true },
    });
    // if the user does not exist, it means that there is no such email
    // in the db, therefore it is an authentication error
    if (!user) throw new AuthenticationError('This email does not exist');
    const isPasswordValid = await argon2.verify(user.password, password);
    // in case the password
    if (!isPasswordValid) throw new UserInputError('Password is incorrect');

    if (!user.activated) throw new Error('This account is not activated yet!');

    return user;
  }

  @Mutation(() => User)
  async signup(
    @Arg('credentials') credentials: SignUpCredentials,
    @Ctx() { db }: Context
  ): Promise<User> {
    const { password, email } = credentials;

    // hash the password
    const hashPassword = await argon2.hash(password);

    try {
      const newUser = await db.user.create({
        data: {
          ...credentials,
          email: email.toLowerCase(),
          password: hashPassword,
        },
      });

      // create a new confitmation record
      const conf = await db.confirmation.create({
        data: {
          userId: newUser.id,
          validation: Math.floor(Math.random() * 8000000),
        },
      });

      const mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'keletronapp@gmail.com',
          pass: process.env.GOOGLE_PWD,
        },
      });

      const details = {
        from: '<no response email>',
        to: email.toLowerCase(),
        subject: 'Keletron Tennis Academy',
        html: `Your code to activate your account is ${conf.validation}`,
      };

      mailTransporter.sendMail(details, err => console.log(err));

      return newUser;
    } catch (e) {
      let message = 'Saving user was not possible, please try again';
      if (e instanceof PrismaClientKnownRequestError && e.code == 'P2002') {
        message = 'This email is already registered!!!';
      }
      throw new ValidationError(message);
    }
  }

  @Mutation(() => User)
  async editUser(
    @Arg('fields') fields: EditUser,
    @Arg('email') email: string,
    @Ctx() { db }: Context
  ): Promise<User> {
    try {
      const updatedUser = await db.user.update({
        where: { email: email },
        data: fields,
      });
      return updatedUser;
    } catch (e) {
      let message;
      if (e instanceof PrismaClientKnownRequestError) {
        message = e.meta?.cause as string;
      }
      throw Error(message || 'Updating was not successful, please try again');
    }
  }

  @Mutation(() => String)
  async confirmUser(
    @Ctx() { db }: Context,
    @Arg('id') id: string
  ): Promise<string> {
    const confirmation = await db.confirmation.findUnique({
      where: { id: id },
    });
    if (!confirmation) throw new Error('Please provide a valid id');

    if (confirmation.confirmed)
      throw new Error('This is account is already confirmed');
    const now = new Date();

    // more than half an hour
    const isExpired = confirmation.expiration.getTime() - now.getTime() > 1800;
    if (isExpired)
      throw new Error(
        'This confirmation id is expired, please request a new one'
      );

    try {
      await db.user.update({
        where: { id: confirmation.userId },
        data: { activated: true },
      });

      await db.confirmation.update({
        where: { id: id },
        data: { confirmed: true },
      });
    } catch (e) {
      throw new Error('Confirmation update was not successful');
    }

    return 'User Confirmed';
  }

  @Mutation(() => User)
  async getActivationCode(
    @Arg('email') email: string,
    @Ctx() { db }: Context
  ): Promise<User> {
    const user = await db.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) throw new AuthenticationError('This email does not exist');

    const currentConfirmation = await db.confirmation.findUnique({
      where: { userId: user.id },
    });

    // delete if confirmation for that user already exists
    if (currentConfirmation)
      await db.confirmation.delete({ where: { userId: user.id } });

    const confirmation = await db.confirmation.create({
      data: {
        userId: user.id,
        validation: Math.floor(Math.random() * 8000000),
      },
    });

    if (!confirmation) throw new Error('Confirmation code was not created');

    const mailTransporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'keletronapp@gmail.com',
        pass: process.env.GOOGLE_PWD,
      },
    });

    const details = {
      from: '<no response email>',
      to: user.email,
      subject: 'Keletron Tennis Academy',
      html: `Your activation code is ${confirmation.validation}`,
    };

    mailTransporter.sendMail(details, err => console.log(err));

    return user;
  }
}
