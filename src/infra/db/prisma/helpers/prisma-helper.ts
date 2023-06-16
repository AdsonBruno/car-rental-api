import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const PrismaHelper = {
  async connect(): Promise<void> {
    this.client = new PrismaClient();
    await this.client.$connect();
  },

  async disconnect(): Promise<void> {
    await this.client.$disconnect();
  },

  getClient: (): PrismaClient => {
    return prisma;
  },
};