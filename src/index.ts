import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import express from "express";
import cors from "cors"
import http from "http";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/User";
import { PrismaClient } from '@prisma/client'
import { Context } from "./types/context";
import { BookingResolver } from "./resolvers/Booking";
const prisma = new PrismaClient()

async function main() {
  const app = express();
  app.use(cors({origin:"*"}))
  const httpServer = http.createServer(app);
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, BookingResolver],
    }),
    context: ({req, res}): Context => ({req, res, db:prisma}),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log(
    `🚀 Server ready at http://localhost:4000${apolloServer.graphqlPath}`
  );
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(() => {});
