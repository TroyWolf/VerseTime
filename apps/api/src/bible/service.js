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
  let prevNum = verseNum
  let firstLetterCode = item.scripture.slice(0, 1).charCodeAt()
  while (firstLetterCode > 96 && firstLetterCode < 123) {
    prevNum -= 1
    const prevItem = await getVerse({
      book: item.book,
      chapter,
      verse: prevNum,
    })
    if (!prevItem.scripture) {
      break
    }
    rows.unshift(prevItem)
    firstLetterCode = prevItem.scripture.slice(0, 1).charCodeAt()
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
