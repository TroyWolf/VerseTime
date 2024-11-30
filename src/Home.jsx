import * as React from "react"
import { API_URL, fetchCfg } from "./config"
import ExternalSvg from "./assets/external.svg"

const getTime = () => {
  const now = new Date()
  let hour = now.getHours()
  // const ampm = hour >= 12 ? "PM" : "AM"
  hour = hour % 12
  hour = hour ? hour : 12 // the hour '0' should be '12'
  const minute = now.getMinutes()
  const seconds = now.getSeconds()
  return { hour, minute, seconds }
}

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

  // We don't have any 0 verses, so just show the time.
  // TODO: Maybe some C.S. Lewis or Oswald Chambers quotes?
  const setTimeWithoutVerse = () => {
    const { hour, minute } = getTime()
    setVerse({
      book: "",
      chapter: hour,
      verse: `${minute}`,
      scripture: "",
    })
  }

  const update = () => {
    const { hour, minute, seconds } = getTime()

    if (minute === verse?.verse) {
      return
    }

    // Check just after the next minute arrives
    const nextCheckDelay = 60001 - seconds * 1000
    window.setTimeout(update, nextCheckDelay)

    if (minute === 0) {
      setTimeWithoutVerse()
    } else {
      fetchVerse({
        chapter: hour,
        verse: minute,
      })
    }
  }

  React.useEffect(update, [])

  React.useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        update()
      }
    }
    document.addEventListener("visibilitychange", handleVisibilityChange)
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange)
  })

  const openBibleGateway = () => {
    if (!verse?.book || !verse?.chapter) {
      return
    }
    const url = `https://www.biblegateway.com/passage/?search=${verse.book}%20${verse.chapter}&version=ESV`
    window.open(url, "_blank")
  }

  if (!verse) return null

  return (
    <>
      <div className="text-3xl lg:text-5xl font-thin text-left pb-4 lg:pb-10">
        {verse.scripture}
      </div>
      <h1 className="text-2xl lg:text-4xl font-thin text-right">
        <button type="button" onClick={openBibleGateway} className="mr-4">
          <img
            src={ExternalSvg}
            className="w-8"
            alt="Open chapter in new window"
          />
        </button>
        {verse.book}{" "}
        <button type="button" onClick={() => window.location.reload()}>
          <span className="font-semibold text-4xl lg:text-7xl pr-6 lg:pr-12 ml-2">
            {verse.chapter}:{verse.verse.toString().padStart(2, "0")}
          </span>
        </button>
      </h1>
    </>
  )
}
