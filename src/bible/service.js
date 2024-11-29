import { doQuery } from '../database.js'

const getVerse = async ({book, chapter, verse}) => {
  const result = await doQuery('bible.verse', { book, chapter, verse })
  console.log({result})
  if (!result.rows[0]) {
    return {code: 404}
  }
  return result.rows[0]
}

export default {
  getVerse,
}