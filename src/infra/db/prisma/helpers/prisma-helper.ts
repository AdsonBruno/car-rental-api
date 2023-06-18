import { PrismaClient } from '@prisma/client';

export const PrismaHelper = {
  client: null as PrismaClient,

  async connect(url: string): Promise<void> {
    this.client = new PrismaClient({
      datasources: {
        db: { url: url || process.env.DATABASE_URL },
      },
    });
    await this.client.$connect();
  },

  async disconnect(): Promise<void> {
    await this.client.$disconnect();
  },

  getClient(): PrismaClient {
    return this.client;
  },
};
