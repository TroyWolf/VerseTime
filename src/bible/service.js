import { doQuery } from "../database.js"

const getVerse = async ({ book, chapter, verse }) => {
  const result = await doQuery("bible.verse", { book, chapter, verse })
  if (!result.rows[0]) {
    return { code: 404 }
  }
  return result.rows[0]
}

const getChapter = async ({ book, chapter, verse }) => {
  const result = await doQuery("bible.chapter", { book, chapter })
  if (!result.rows[0]) {
    return { code: 404 }
  }
  return result.rows
}

const getTimeVerse = async ({ chapter, verse }) => {
  const result = await doQuery("bible.timeVerse", { chapter, verse })
  if (!result.rows[0]) {
    return { code: 404 }
  }
  return result.rows[Math.floor(Math.random() * result.rows.length)]
}

const getTimeVerseFull = async ({ chapter, verse }) => {
  let verseNum = verse / 1
  const rows = []
  let item = await getTimeVerse({ chapter, verse: verseNum })
  if (item.code) {
    return item
  }
  rows.push(item)

  // If verse does not start with capital letter, grab the preceeding verse, too
  const firstLetterCode = item.scripture.slice(0, 1).charCodeAt()
  if (firstLetterCode > 96 && firstLetterCode < 123) {
    const prevItem = await getVerse({
      book: item.book,
      chapter,
      verse: verseNum - 1,
    })
    if (prevItem.scripture) {
      rows.unshift(prevItem)
    }
  }

  // If the verse does not complete a sentence, keep grabbing next verse until complete.
  while ([",", ":", ";", "-", "—"].includes(item.scripture.slice(-1))) {
    verseNum += 1
    item = await getVerse({ book: item.book, chapter, verse: verseNum })
    if (item.code) {
      return rows
    }
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
