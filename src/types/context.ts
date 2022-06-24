import { Prisma, PrismaClient } from "@prisma/client"
import { Response, Request} from "express"

export type Context ={
  res: Response,
  req: Request,
  db:PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>
}