import * as React from "react"
// import { useParams } from "react-router"
import { API_URL, fetchCfg } from "./config"
import VerseCard from "./VerseCard"
import VerseReferenceCard from "./VerseReferenceCard"
import VerseButtons from "./VerseButtons"
import BookDescription from "./BookDescription"

let timerId

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

export default function Time() {
  const [verses, setVerses] = React.useState([])
  const [currentMinute, setCurrentMinute] = React.useState()

  // const params = useParams()

  const fetchVerseFull = async ({ chapter, verse }) => {
    setCurrentMinute(verse)
    try {
      const res = await fetch(`${API_URL}/full/${chapter}/${verse}`, {
        ...fetchCfg(),
      })
      if (res.status > 200) {
        setTimeWithoutVerse()
        return
      }
      const data = await res.json()
      if (data.error || !data.length) {
        setTimeWithoutVerse()
        return console.log(data)
      }
      setVerses(data)
    } catch (error) {
      console.error(error)
      setTimeWithoutVerse()
    }
  }

  // We don't have any 0 verses, so just show the time.
  // TODO: Maybe some C.S. Lewis or Oswald Chambers quotes?
  const setTimeWithoutVerse = () => {
    const { hour, minute } = getTime()
    setVerses([
      {
        noVerse: true,
        chapter: hour,
        verse: `${minute}`,
        scripture: <BookDescription />
      },
    ])
  }

  const update = () => {
    const { hour, minute, seconds } = getTime()
    /*
    const hour = 7
    const minute = 0
    const seconds = 1
    */

    if (timerId && minute === currentMinute) {
      return
    }

    // Check just after the next minute arrives
    const nextCheckDelay = 60001 - seconds * 1000
    window.clearTimeout(timerId)
    timerId = window.setTimeout(update, nextCheckDelay)

    if (minute === 0) {
      setTimeWithoutVerse()
    } else {
      fetchVerseFull({
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

  const verse = React.useMemo(
    () => verses?.find((v) => v.verse === currentMinute) || verses[0],
    [currentMinute, verses]
  )

  if (!verses.length) return null

  return (
    <>
      <VerseButtons verse={verse} />
      <div id="screenshot-target" className="p-4 md:p-8">
        <VerseCard verses={verses} verseNum={verse.verse} />
        <VerseReferenceCard verse={verse} />
      </div>
    </>
  )
}
