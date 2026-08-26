import * as React from "react";
import html2canvas from "html2canvas";
import { Link } from "react-router";
import SVG from "./SVG";
import { VerseEntry } from "./types";

interface Props {
  verse: VerseEntry;
}

export default function Buttons({ verse }: Props) {
  const [isDark, setIsDark] = React.useState(() =>
    document.documentElement.classList.contains("dark"),
  );

  const toggleTheme = () => {
    const next = !isDark;
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    setIsDark(next);
  };

  const captureScreenshot = () => {
    const screenshotTarget = document.getElementById("screenshot-target");
    if (!screenshotTarget) return;
    const bgColor = getComputedStyle(document.documentElement).backgroundColor;
    html2canvas(screenshotTarget, { backgroundColor: bgColor }).then(
      (canvas) => {
        const base64image = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = base64image;
        link.download = `${verse.book}-${verse.chapter}-${verse.verse}.png`;
        link.click();
      },
    );
  };

  const openBibleHub = () => {
    if (!verse.chapter) return;
    const bookName = verse.book ?? "";
    const book = bookName.includes("Song") ? "songs" : bookName;
    const url = `https://biblehub.com/bsb/${book
      .toLowerCase()
      .replace(" ", "_")}/${verse.noVerse ? 1 : verse.chapter}.htm`;
    window.open(url, "_blank");
  };

  return verse.scripture ? (
    <div className="text-left flex">
      <button
        type="button"
        onClick={captureScreenshot}
        className="mr-4 mb-2 align-middle"
        title="Download a screenshot of this verse"
      >
        <SVG name="camera" />
      </button>
      <button
        type="button"
        onClick={openBibleHub}
        className="mr-4 mb-2 align-middle"
        title="Open in BibleHub"
      >
        <SVG name="external" />
      </button>
      <a
        className="mr-4 mb-2 align-middle"
        href="mailto:troy@versetime.net"
        title="Email Troy about VerseTime"
      >
        <SVG name="email" />
      </a>
      <Link
        className="mr-4 mb-2 align-middle"
        to="/about"
        title="How Versetime works"
      >
        <SVG name="info" />
      </Link>
      <button
        type="button"
        onClick={toggleTheme}
        className="mr-4 mb-2 align-middle"
        title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      >
        <SVG name={isDark ? "sun" : "moon"} />
      </button>
    </div>
  ) : null;
}
