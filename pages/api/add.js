import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async (req, res) => {
  if (req.method === 'POST') {
    const { body: { id } } = req;
    const response = await fetch(`http://www.omdbapi.com/?i=${id}&apiKey=${process.env.API_KEY}`)
    const body = await response.json()
    const data = {
      title: body.Title,
      year: parseInt(body.Year),
      runtime: body.Runtime,
      genre: body.Genre,
      plot: body.Plot,
      poster: body.Poster,
      imdbRating: body.imdbRating,
      imdbVotes: body.imdbVotes,
      imdbID: body.imdbID,
      type: body.Type,
      totalSeasons: body.totalSeasons ? parseInt(body.totalSeasons) : 0,
    }
    const flick = await prisma.flick.create({ data });
    res.status(200).json(flick)
  }
}
