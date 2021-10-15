// https://dev.to/aryanjnyc/introduction-to-prisma-with-next-js-1l0
// https://leerob.io/blog/next-prisma
import fetch from 'node-fetch'

// helper function that prevents html/css/script malice
const cleanseString = (string) => string.replace(/</g, '&lt;').replace(/>/g, '&gt;')

const formatResultObject = (row) => ({
  label: `${row.Title} (${row.Year})`,
  value: row.Title,
  image: row.Poster === 'N/A' ? '' : row.Poster,
  id: row.imdbID,
})

export default async (req, res) => {
  const cleansedFlick = encodeURIComponent(cleanseString(req.query.term));
  let result = []

  try {
    const response = await fetch(`http://www.omdbapi.com/?s=${cleansedFlick}&apiKey=${process.env.API_KEY}`)
    const body = await response.json()
    body.Search.forEach(row => {
      result.push(formatResultObject(row))
    })
  } catch (e) {
    const response = await fetch(`http://www.omdbapi.com/?t=${cleansedFlick}&apiKey=${process.env.API_KEY}`)
    const row = await response.json()
    if (row.Response === 'True') {
      result.push(formatResultObject(row))
    }
  }

  res.status(200).json(result);
}
