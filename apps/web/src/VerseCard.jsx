/* eslint-disable react/prop-types */
import * as React from "react"

export default function VerseCard({ verses = [], verseNum }) {
  const verseLength = React.useMemo(
    () => verses.reduce((acc, v) => acc + v.scripture.length, 0),
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
    <div id="screenshot-target" className="p-4 md:p-8">
      <div className={`${fontSize} font-extralight text-left pb-4 lg:pb-10`}>
        {verses.map((v) => (
          <span key={v.verse}>
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
