import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async (req, res) => {
  const movies = await prisma.flick.findMany();
  res.status(200).json(movies)
}
