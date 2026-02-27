import * as React from "react"
import { API_URL, fetchCfg } from "./config"
import VerseCard from "./VerseCard"
import VerseReferenceCard from "./VerseReferenceCard"
import VerseButtons from "./VerseButtons"
import BookDescription from "./BookDescription"
import { VerseEntry } from "./types"

let timerId: ReturnType<typeof setTimeout> | undefined

const getTime = () => {
  const now = new Date()
  let hour = now.getHours()
  hour = hour % 12
  hour = hour ? hour : 12
  const minute = now.getMinutes()
  const seconds = now.getSeconds()
  return { hour, minute, seconds }
}

export default function Time() {
  const [verses, setVerses] = React.useState<VerseEntry[]>([])
  const [currentMinute, setCurrentMinute] = React.useState<number>()

  const fetchVerseFull = async ({ chapter, verse }: { chapter: number; verse: number }) => {
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

  const setTimeWithoutVerse = () => {
    const { hour, minute } = getTime()
    setVerses([
      {
        noVerse: true,
        chapter: hour,
        verse: `${minute}`,
        scripture: <BookDescription />,
      },
    ])
  }

  const update = () => {
    const { hour, minute, seconds } = getTime()

    if (timerId && minute === currentMinute) {
      return
    }

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
