import { Global, Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

@Global()
@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    const connectionString = process.env.DATABASE_URL?.trim();

    if (!connectionString) {
      throw new Error('DATABASE_URL must be set and must be a non-empty string');
    }

    const adapter = new PrismaPg({
      connectionString,
    });
    super({ adapter });
  }
}