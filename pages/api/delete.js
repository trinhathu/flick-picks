import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async (req, res) => {
  if (req.method === 'POST') {
    const { body: { id } } = req;
    const flick = await prisma.flick.delete({ where: { id } });
    res.status(200).json(flick)
  }
}
