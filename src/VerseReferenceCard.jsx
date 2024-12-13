/* eslint-disable react/prop-types */

export default function ReferenceCard({ verse }) {
  return (
    <div className="text-3xl md:text-5xl lg:text-7xl font-thin text-right">
      {!verse.noVerse && verse.book}
      <button type="button" onClick={() => window.location.reload()}>
        <span className="font-semibold text-5xl md:text-6xl lg:text-9xl pr-6 md:pr-10 ml-2">
          {verse.chapter}:{verse.verse.toString().padStart(2, "0")}
        </span>
      </button>
    </div>
  )
}
