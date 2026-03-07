import * as React from "react"
import { VerseEntry } from "./types"

interface Props {
  verses: VerseEntry[]
  verseNum: number | string
}

export default function VerseCard({ verses = [], verseNum }: Props) {
  const verseLength = React.useMemo(
    () => verses.reduce((acc, v) => acc + (typeof v.scripture === 'string' ? v.scripture.length : 0), 0),
    [verses]
  )

  const fontSize = React.useMemo(() => {
    if (verseLength > 300) {
      return "md:text-xl"
    }
    if (verseLength > 250) {
      return "text-lg md:text-2xl"
    }
    if (verseLength > 200) {
      return "text-xl md:text-3xl"
    }
    return "text-3xl md:text-4xl"
  }, [verseLength])

  if (!verses.length) return null

  return (
    <div>
      <div className={`${fontSize} font-extralight text-left pb-4 lg:pb-10`}>
        {verses.map((v) => (
          <span key={v.verse as React.Key}>
            {verses.length > 1 && (
              <sup className="px-2 first:pr-2">{v.verse}</sup>
            )}
            <span
              className={` leading-snug ${
                verses.length > 1 && v.verse !== verseNum ? "font-thin" : ""
              }`}
            >
              {v.scripture}
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
