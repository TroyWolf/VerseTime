import { Link } from "react-router";
import SVG from "./SVG";

export default function About() {
  return (
    <div className="text-left max-w-3xl mx-auto px-4 py-8">
      <Link
        to="/"
        className="text-white/40 hover:text-white/70 text-sm mb-8 inline-block"
      >
        ← back
      </Link>
      <h1 className="text-3xl font-extralight mb-3">What is Versetime</h1>
      <p className="text-white/60 font-extralight mb-10 leading-relaxed">
        Versetime is a &ldquo;Bible clock&rdquo; that shows a different verse
        every minute, based on the current time. It&apos;s a fun way to discover
        new verses and see familiar ones in a new light. Versetime is free to
        use, with no ads or tracking.
      </p>
      <p className="text-white/60 font-extralight mb-10 leading-relaxed">
        Troy Wolf (troy@versetime.net) created Versetime after seeing a
        vaporware ad on Instagram for &ldquo;Bible Clock&rdquo;--a product that
        didn&apos;t exist but looked cool. He liked the idea and decided to
        build a simple web app to prove the concept. He has this running on an
        old Fire tablet in his kitchen. His family and guests love it.
      </p>
      <p className="text-white/60 font-extralight mb-10 leading-relaxed">
        Although the{" "}
        <a
          href="https://bibleclock.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Bible Clock website
        </a>{" "}
        indicates they have a real product and have delivered some to customers,
        I suspect the whole thing is a scam. If you are a real customer who
        actually received one of their clocks, please email me—I&apos;d love to
        hear from you!
      </p>
      <h1 className="text-3xl font-extralight mb-3">How Versetime works</h1>
      <p className="text-white/60 font-extralight mb-10 leading-relaxed">
        Versetime maps the current time to a Bible verse by treating the hour as
        a chapter number and the minute as a verse number. At 3:16, for example,
        it searches for any book with a Chapter 3, Verse 16 — and may find John
        3:16, Genesis 3:16, and others. Each minute it picks one at random.
      </p>

      <h1 id="not-a-perfect-idea" className="text-3xl font-extralight mb-3">
        It's not a perfect idea!
      </h1>
      <p className="text-white/60 font-extralight mb-6 leading-relaxed">
        If the clock used 24 hour time instead of AM/PM, the problems below
        would be a lot worse.
      </p>
      <ul className="list-disc list-outside ml-6 mb-6">
        <li className="text-white/60 font-extralight mb-2 leading-relaxed">
          37 time slots have no corresponding verse at all
        </li>
        <li className="text-white/60 font-extralight mb-2 leading-relaxed">
          40 time slots have only 1 corresponding verse, so you see the same one
          twice a day
        </li>
        <li className="text-white/60 font-extralight mb-2 leading-relaxed">
          45 time slots have only 2 corresponding verses
        </li>
        <li className="text-white/60 font-extralight mb-2 leading-relaxed">
          47 time slots have only 3 corresponding verses
        </li>
        <li className="text-white/60 font-extralight mb-2 leading-relaxed">
          Without context, many verses are sentence fragments that carry little
          meaning on their own
        </li>
      </ul>

      <p className="text-white/60 font-extralight mb-6 leading-relaxed">
        For example, 1 Chronicles 2:14
        <div className="p-4 italic">"Nethanel fourth, Raddai fifth,"</div>
        That is not very meaningful on its own. VerseTime has logic that looks
        backwards and forwards in the chapter in an attempt to return a full
        sentence. VerseTime ends up combining verse 14 and 15 to return:
        <div className="p-4 italic">
          "Nethanel fourth, Raddai fifth, Ozem sixth, and David seventh."
        </div>
        Out of context, this is still not a very impactful verse to show on a
        clock. For some time slots, VerseTime ends up returning a very long list
        of names!
      </p>

      <p className="text-white/60 font-extralight mb-10 leading-relaxed">
        More details in our coverage map.
        <div>
          <Link
            to="/coverage"
            className="text-white/40 hover:text-white/70 text-sm"
          >
            View coverage map →
          </Link>
        </div>
      </p>
      <p className="flex items-center gap-2 text-white/60 font-extralight mb-10 leading-relaxed">
        <SVG name="github" />
        Versetime is open source. You can{" "}
        <a
          href="https://github.com/TroyWolf/VerseTime"
          target="_blank"
          rel="noopener noreferrer"
        >
          view the code on GitHub.
        </a>
      </p>
    </div>
  );
}
