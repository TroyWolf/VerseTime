/* eslint-disable react/prop-types */
import html2canvas from "html2canvas"
import SVG from "./SVG"

export default function Buttons({ verse }) {
  const captureScreenshot = () => {
    const screenshotTarget = document.getElementById("screenshot-target")
    html2canvas(screenshotTarget).then((canvas) => {
      const base64image = canvas.toDataURL("image/png")

      // Create a link element and trigger a download
      const link = document.createElement("a")
      link.href = base64image
      link.download = `${verse.book}-${verse.chapter}-${verse.verse}.png`
      link.click()
    })
  }

  const openBibleHub = () => {
    if (!verse.chapter) {
      return
    }

    // Translate book name for BibleHub
    const book = verse.book.includes("Song") ? "songs" : verse.book

    const url = `https://biblehub.com/bsb/${book
      .toLowerCase()
      .replace(" ", "_")}/${verse.noVerse ? 1 : verse.chapter}.htm`
    window.open(url, "_blank")
  }

  return verse.scripture ? (
    <div className="text-left flex">
      <button
        type="button"
        onClick={captureScreenshot}
        className="mr-4 mb-2 align-middle"
      >
        <SVG name="camera" />
      </button>
      <button
        type="button"
        onClick={openBibleHub}
        className="mr-4 mb-2 align-middle"
      >
        <SVG name="external" />
      </button>
      <a className="mr-4 mb-2 align-middle" href="mailto:troy@versetime.net">
        <SVG name="email" />
      </a>
    </div>
  ) : null
}
