import * as React from "react"
import { API_URL, fetchCfg } from "./config"
import externalSvg from "./assets/external.svg"
import cameraSvg from "./assets/camera.svg"
import html2canvas from "html2canvas"

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

export default function App() {
  const [verses, setVerses] = React.useState([])
  const [currentMinute, setCurrentMinute] = React.useState()

  const captureScreenshot = () => {
    const screenshotTarget = document.getElementById("screenshot-target")
    const imageEls = screenshotTarget.getElementsByTagName("img")
    for (const el of imageEls) {
      el.style.display = "none"
    }
    html2canvas(screenshotTarget).then((canvas) => {
      const base64image = canvas.toDataURL("image/png")

      // Create a link element and trigger a download
      const link = document.createElement("a")
      link.href = base64image
      link.download = `${verse.book}-${verse.chapter}-${verse.verse}.png`
      link.click()
      for (const el of imageEls) {
        el.style.display = "block"
      }
    })
  }

  const fetchVerseFull = async ({ chapter, verse }) => {
    setCurrentMinute(verse)
    try {
      const res = await fetch(`${API_URL}/full/${chapter}/${verse}`, {
        ...fetchCfg(),
      })
      if (res.status > 200) {
        setTimeWithoutVerse()
        console.log("TROY")
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
        book: "",
        chapter: hour,
        verse: `${minute}`,
        scripture: "",
      },
    ])
  }

  const update = () => {
    const { hour, minute, seconds } = getTime()

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

  const openBibleHub = () => {
    if (!verse.chapter) {
      return
    }

    // Translate book name for BibleHub
    const book = verse.book.includes("Song") ? "songs" : verse.book

    const url = `https://biblehub.com/bsb/${book
      .toLowerCase()
      .replace(" ", "_")}/${verse.chapter}.htm`
    window.open(url, "_blank")
  }

  const verse = React.useMemo(
    () => verses?.find((v) => v.verse === currentMinute) || verses[0],
    [currentMinute, verses]
  )

  const verseLength = React.useMemo(
    () => verses.reduce((acc, v) => acc + v.scripture.length, 0),
    [verses]
  )

  const fontSize = React.useMemo(() => {
    if (verseLength > 300) {
      return "md:text-2xl"
    }
    if (verseLength > 250) {
      return "text-lg md:text-3xl"
    }
    if (verseLength > 200) {
      return "text-xl md:text-4xl"
    }
    return "text-3xl md:text-5xl"
  }, [verseLength])

  if (!verses.length) return null

  return (
    <div id="screenshot-target" className="p-8">
      <div className={`${fontSize} font-extralight text-left pb-4 lg:pb-10`}>
        {verses.map((v) => (
          <span key={v.verse}>
            {verses.length > 1 && (
              <sup className="px-2 first:pr-2">{v.verse}</sup>
            )}
            <span
              className={`${
                verses.length > 1 && v.verse !== currentMinute
                  ? "font-thin"
                  : ""
              }`}
            >
              {v.scripture}
            </span>
          </span>
        ))}
      </div>
      <h1 className="text-2xl lg:text-4xl font-thin text-right">
        {verse.scripture && (
          <>
            <button
              type="button"
              onClick={captureScreenshot}
              className="mr-4 mb-2 align-middle"
            >
              <img
                src={cameraSvg}
                className="w-8"
                alt="Open chapter in new window"
              />
            </button>
            <button
              type="button"
              onClick={openBibleHub}
              className="mr-4 mb-2 align-middle"
            >
              <img
                src={externalSvg}
                className="w-8"
                alt="Open chapter in new window"
              />
            </button>
          </>
        )}
        {verse.book}
        <button type="button" onClick={() => window.location.reload()}>
          <span className="font-semibold text-4xl lg:text-7xl pr-6 md:pr-10 ml-2">
            {verse.chapter}:{verse.verse.toString().padStart(2, "0")}
          </span>
        </button>
      </h1>
    </div>
  )
}
