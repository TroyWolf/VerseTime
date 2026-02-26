import * as React from "react"
import { useParams } from "react-router"
import { API_URL, fetchCfg } from "./config"
import VerseCard from "./VerseCard"
import VerseReferenceCard from "./VerseReferenceCard"
import VerseButtons from "./VerseButtons"
import BookDescription from "./BookDescription"

export default function Verse() {
  const params = useParams()

  const [verses, setVerses] = React.useState([])

  const fetchVerse = async () => {
    let isFound = false
    const { book, chapter, verse } = params
    const url = `${API_URL}/verse/${book}/${chapter}/${verse}`
    console.log(url)
    try {
      const res = await fetch(url, {
        ...fetchCfg(),
      })
      if (res.status === 200) {
        const data = await res.json()
        if (data.error) {
          console.log(data)
        }
        isFound = true
        setVerses([data])
      }
    } catch (error) {
      console.error(error)
    }

    if (!isFound) {
      setVerses([
        {
          noVerse: true,
          chapter,
          verse,
          scripture: <BookDescription book={params.book} />,
        },
      ])
    }
  }

  React.useEffect(() => {
    fetchVerse()
  }, [])

  const verse = verses[0]

  if (!verse) {
    return null
  }

  return (
    <>
      <VerseButtons verse={verse} />
      <div id="screenshot-target" className="p-4 md:p-8">
        <VerseCard verses={verses} verseNum={verse.verse} />
        {!verse.noVerse && <VerseReferenceCard verse={verse} />}
      </div>
    </>
  )
}
