import { doQuery } from '../database.js'

const getVerse = async ({book, chapter, verse}) => {
  const result = await doQuery('bible.verse', { book, chapter, verse })
  if (!result.rows[0]) {
    return {code: 404}
  }
  return result.rows[0]
}

const getChapter = async ({book, chapter, verse}) => {
  const result = await doQuery('bible.chapter', { book, chapter })
  if (!result.rows[0]) {
    return {code: 404}
  }
  return result.rows
}

const getTimeVerse = async ({chapter, verse}) => {
  const result = await doQuery('bible.timeVerse', { chapter, verse })
  if (!result.rows[0]) {
    return {code: 404}
  }
  return result.rows[Math.floor(Math.random() * result.rows.length)]
}

export default {
  getVerse,
  getChapter,
  getTimeVerse,
}