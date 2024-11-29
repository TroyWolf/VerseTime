import * as React from "react"
import bibleData from "./data"
import { API_URL, fetchCfg } from "./config"

export default function App() {
  const [verse, setVerse] = React.useState()

  const fetchVerse = async ({ book, chapter, verse }) => {
    try {
      const res = await fetch(`${API_URL}/${book}/${chapter}/${verse}`, {
        ...fetchCfg(),
      })
      console.log(res)
      if (res.status > 403) {
        return console.error(res)
      }
      const data = await res.json()
      if (data.error) {
        return console.log(data.error)
      }
      console.log(data)
      setVerse(data)
    } catch (error) {
      console.error(error)
    }
  }

  // Find a random verse that can work for the hour and minute
  const getVerse = (hour, minute) => {
    const verses = bibleData.filter(
      (d) => d.chapter === hour && d.verseCount >= minute
    )
    return verses?.[Math.floor(Math.random() * verses.length)]
  }

  const doMinute = (hour, minute) => {
    const verse = getVerse(hour, minute)
    fetchVerse({
      ...verse,
      verse: minute,
    })
  }

  const update = () => {
    window.setTimeout(update, 60000)
    const now = new Date()
    let hour = now.getHours()
    // const ampm = hour >= 12 ? "PM" : "AM"
    hour = hour % 12
    hour = hour ? hour : 12 // the hour '0' should be '12'
    const minute = now.getMinutes()
    doMinute(hour, minute)
  }

  React.useEffect(update, [])

  if (!verse) return null

  return (
    <>
      <div className="text-5xl italic text-left pb-10">
        {verse.scripture}
      </div>
      <h1 className="text-9xl">
        {verse.book} {verse.chapter}:
        {verse.verse.toString().padStart(2, "0")}
      </h1>
    </>
  )
}
