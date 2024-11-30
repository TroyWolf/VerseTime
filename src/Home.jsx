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
      if (res.status > 403) {
        return console.error(res)
      }
      const data = await res.json()
      if (data.error || !data.scripture) {
        setTimeWithoutVerse()
        return console.log(data)
      }
      setVerse(data)
    } catch (error) {
      console.error(error)
      setTimeWithoutVerse()
    }
  }

  // Find a random verse that can work for the hour and minute
  const getVerse = (hour, minute) => {
    const verses = bibleData.filter(
      (d) => d.chapter === hour && d.verseCount >= minute
    )
    return verses?.[Math.floor(Math.random() * verses.length)]
  }

  const setTimeWithoutVerse = () => {
    const { hour, minute } = getTime()
    setVerse({
      book: "",
      chapter: hour,
      minute,
      verse: `${minute}`,
      scripture: "",
    })
  }

  const doMinute = () => {
    const { hour, minute } = getTime()
    if (minute === 0) {
      setTimeWithoutVerse()
    } else {
      const verse = getVerse(hour, minute)
      fetchVerse({
        ...verse,
        verse: minute,
      })
    }
  }

  const getTime = () => {
    const now = new Date()
    let hour = now.getHours()
    // const ampm = hour >= 12 ? "PM" : "AM"
    hour = hour % 12
    hour = hour ? hour : 12 // the hour '0' should be '12'
    const minute = now.getMinutes()
    return { hour, minute }
  }

  const update = () => {
    window.setTimeout(update, 60000)
    doMinute()
  }

  React.useEffect(update, [])

  if (!verse) return null

  return (
    <>
      <div className="text-3xl lg:text-5xl font-thin text-left pb-4 lg:pb-10">
        {verse.scripture}
      </div>
      <h1 className="text-2xl lg:text-4xl font-thin text-right">
        {verse.book}{" "}
        <span className="font-semibold text-4xl lg:text-7xl pr-6 lg:pr-12 ml-2">
          {verse.chapter}:{verse.verse.toString().padStart(2, "0")}
        </span>
      </h1>
    </>
  )
}
