import { doQuery } from '../database.js'
import { Verse, ErrorResponse } from '../types.js'

const getVerse = async ({
  book,
  chapter,
  verse,
}: {
  book: string
  chapter: string | number
  verse: string | number
}): Promise<Verse | ErrorResponse> => {
  const result = await doQuery('bible.verse', { book, chapter, verse })
  if (!result || !result.rows[0]) {
    return { code: 404 }
  }
  return result.rows[0] as Verse
}

const getChapter = async ({
  book,
  chapter,
}: {
  book: string
  chapter: string | number
}): Promise<Verse[] | ErrorResponse> => {
  const result = await doQuery('bible.chapter', { book, chapter })
  if (!result || !result.rows[0]) {
    return { code: 404 }
  }
  return result.rows as Verse[]
}

const getTimeVerse = async ({
  chapter,
  verse,
}: {
  chapter: string | number
  verse: string | number
}): Promise<Verse | ErrorResponse> => {
  const result = await doQuery('bible.timeVerse', { chapter, verse })
  if (!result || !result.rows[0]) {
    return { code: 404 }
  }
  return result.rows[Math.floor(Math.random() * result.rows.length)] as Verse
}

const getTimeVerseFull = async ({
  chapter,
  verse,
}: {
  chapter: string | number
  verse: string | number
}): Promise<Verse[] | ErrorResponse> => {
  let verseNum = Number(verse)
  const rows: Verse[] = []
  let item = await getTimeVerse({ chapter, verse: verseNum })
  if ('code' in item) {
    return item
  }
  rows.push(item)

  // If verse does not start with a capital letter, grab the preceding verse too
  let prevNum = verseNum
  let firstLetterCode = item.scripture.slice(0, 1).charCodeAt(0)
  while (firstLetterCode > 96 && firstLetterCode < 123) {
    prevNum -= 1
    const prevItem = await getVerse({
      book: item.book,
      chapter,
      verse: prevNum,
    })
    if ('code' in prevItem || !prevItem.scripture) {
      break
    }
    rows.unshift(prevItem)
    firstLetterCode = prevItem.scripture.slice(0, 1).charCodeAt(0)
  }

  // If the verse does not complete a sentence, keep grabbing the next verse
  while ([',', ':', ';', '-', '—'].includes(item.scripture.slice(-1))) {
    verseNum += 1
    const nextItem = await getVerse({ book: item.book, chapter, verse: verseNum })
    if ('code' in nextItem) {
      return rows
    }
    item = nextItem
    rows.push(item)
  }

  return rows
}

export default {
  getVerse,
  getChapter,
  getTimeVerse,
  getTimeVerseFull,
}
