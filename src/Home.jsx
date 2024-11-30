import * as React from "react"
import { API_URL, fetchCfg } from "./config"

let verseTimeMinute

export default function App() {
  const [verse, setVerse] = React.useState()

  const fetchVerse = async ({ chapter, verse }) => {
    try {
      const res = await fetch(`${API_URL}/time/${chapter}/${verse}`, {
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

  const setTimeWithoutVerse = () => {
    const { hour, minute } = getTime()
    setVerse({
      book: "",
      chapter: hour,
      verse: `${minute}`,
      scripture: "",
    })
  }

  const doMinute = () => {
    const { hour, minute } = getTime()
    if (minute === 0) {
      setTimeWithoutVerse()
    } else {
      fetchVerse({
        chapter: hour,
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

  const checkTime = () => {
    const { minute } = getTime()
    if (minute !== verseTimeMinute) {
      verseTimeMinute = minute
      doMinute()
    }
    // Check every 5 seconds to see if the clock minute has changed
    window.setTimeout(checkTime, 5000)
  }

  React.useEffect(checkTime, [])

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
