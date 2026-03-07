import { Link } from "react-router";

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

      <h1 className="text-3xl font-extralight mb-3">
        It's not a perfect idea!
      </h1>
      <p className="text-white/60 font-extralight mb-10 leading-relaxed">
        Not all time slots have a corresponding verse, and some have only 1.
        More details and how we handle these edge cases are explained in our
        coverage map.
        <Link
          to="/coverage"
          className="text-white/40 hover:text-white/70 text-sm"
        >
          View coverage map →
        </Link>
      </p>
    </div>
  );
}
