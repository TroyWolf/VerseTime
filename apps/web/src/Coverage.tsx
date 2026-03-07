import * as React from "react";
import { Link } from "react-router";
import { API_URL, fetchCfg } from "./config";

interface CoverageEntry {
  chapter: number;
  verse: number;
  match_count: number;
  matching_books: string | null;
}

type CoverageMap = Map<string, CoverageEntry>;

const key = (chapter: number, verse: number) => `${chapter}:${verse}`;
const fmt = (h: number, m: number) => `${h}:${String(m).padStart(2, "0")}`;

export default function Coverage() {
  const [coverageMap, setCoverageMap] = React.useState<CoverageMap | null>(
    null,
  );
  const [selected, setSelected] = React.useState<{
    chapter: number;
    verse: number;
  } | null>(null);

  React.useEffect(() => {
    fetch(`${API_URL}/coverage`, fetchCfg())
      .then((res) => res.json())
      .then((data: CoverageEntry[]) => {
        const map: CoverageMap = new Map();
        for (const entry of data) {
          map.set(key(entry.chapter, entry.verse), {
            ...entry,
            match_count: Number(entry.match_count),
          });
        }
        setCoverageMap(map);
      });
  }, []);

  const zeroMatches = React.useMemo(() => {
    const result: Array<{ chapter: number; verse: number }> = [];
    for (let h = 1; h <= 12; h++) {
      result.push({ chapter: h, verse: 0 });
    }
    if (!coverageMap) return result;
    for (let h = 1; h <= 12; h++) {
      for (let m = 1; m <= 59; m++) {
        if (!coverageMap.has(key(h, m))) {
          result.push({ chapter: h, verse: m });
        }
      }
    }
    return result.sort((a, b) => a.chapter - b.chapter || a.verse - b.verse);
  }, [coverageMap]);

  const singleMatches = React.useMemo(() => {
    if (!coverageMap) return [];
    const result: CoverageEntry[] = [];
    for (const entry of coverageMap.values()) {
      if (entry.match_count === 1) result.push(entry);
    }
    return result.sort((a, b) => a.chapter - b.chapter || a.verse - b.verse);
  }, [coverageMap]);

  const twoMatches = React.useMemo(() => {
    if (!coverageMap) return [];
    const result: CoverageEntry[] = [];
    for (const entry of coverageMap.values()) {
      if (entry.match_count === 2) result.push(entry);
    }
    return result.sort((a, b) => a.chapter - b.chapter || a.verse - b.verse);
  }, [coverageMap]);

  const threeMatches = React.useMemo(() => {
    if (!coverageMap) return [];
    const result: CoverageEntry[] = [];
    for (const entry of coverageMap.values()) {
      if (entry.match_count === 3) result.push(entry);
    }
    return result.sort((a, b) => a.chapter - b.chapter || a.verse - b.verse);
  }, [coverageMap]);

  const cellColor = (chapter: number, verse: number): string => {
    if (verse === 0) return "bg-rose-900/80";
    if (!coverageMap) return "bg-white/5";
    const entry = coverageMap.get(key(chapter, verse));
    if (!entry) return "bg-rose-900/80";
    if (entry.match_count === 1) return "bg-amber-600/70";
    if (entry.match_count === 2) return "bg-blue-500/80";
    if (entry.match_count === 3) return "bg-violet-600/60";
    return "bg-white/15";
  };

  const cellTitle = (chapter: number, verse: number): string => {
    if (verse === 0) return `${fmt(chapter, verse)} — no verse 0 exists`;
    if (!coverageMap) return "";
    const entry = coverageMap.get(key(chapter, verse));
    if (!entry) return `${fmt(chapter, verse)} — 0 matches`;
    if (entry.match_count <= 3 && entry.matching_books)
      return `${fmt(chapter, verse)} — ${entry.match_count} match${entry.match_count === 1 ? "" : "es"} (${entry.matching_books})`;
    return `${fmt(chapter, verse)} — ${entry.match_count} matches`;
  };

  const zeroMatchesHighMinute = zeroMatches.filter((e) => e.verse > 0);

  return (
    <div className="text-left max-w-3xl mx-auto px-4 py-8">
      <Link
        to="/about"
        className="text-white/40 hover:text-white/70 text-sm mb-8 inline-block"
      >
        ← back
      </Link>

      <h1 className="text-3xl font-extralight mb-2">Coverage map</h1>
      <p className="text-white/50 text-sm font-extralight mb-3">
        Rows are hours (1–12), columns are minutes (:00–:59). Tap or click any
        cell to see details.
      </p>
      <div className="flex flex-wrap gap-4 text-xs text-white/50 mb-4 font-extralight">
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-sm bg-rose-900/80" />0
          matches
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-sm bg-amber-600/70" />1
          match
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-sm bg-blue-500/80" />2
          matches
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-sm bg-violet-600/60" />3
          matches
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-sm bg-white/15" />
          4+ matches
        </span>
      </div>
      <div className="overflow-x-auto">
        <div style={{ minWidth: "540px" }}>
          {/* Minute axis labels */}
          <div className="flex items-end pl-6 mb-0.5">
            {Array.from({ length: 60 }, (_, m) => (
              <div key={m} className="flex-1 text-center">
                {m % 15 === 0 && (
                  <span className="text-[9px] text-white/25 leading-none">
                    :{String(m).padStart(2, "0")}
                  </span>
                )}
              </div>
            ))}
          </div>
          {/* Hour rows */}
          {Array.from({ length: 12 }, (_, h) => (
            <div key={h + 1} className="flex items-center mb-0.5">
              <span className="w-6 shrink-0 text-right text-white/30 text-[10px] pr-1.5 font-extralight">
                {h + 1}
              </span>
              <div className="flex flex-1 gap-px">
                {Array.from({ length: 60 }, (_, m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() =>
                      setSelected((prev) =>
                        prev?.chapter === h + 1 && prev?.verse === m
                          ? null
                          : { chapter: h + 1, verse: m },
                      )
                    }
                    className={`flex-1 h-5 rounded-xs cursor-pointer ${cellColor(h + 1, m)} ${
                      selected?.chapter === h + 1 && selected?.verse === m
                        ? "ring-1 ring-white/70 ring-inset"
                        : "hover:brightness-125"
                    }`}
                    title={cellTitle(h + 1, m)}
                    aria-label={cellTitle(h + 1, m)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3 mb-12 min-h-10">
        {selected ? (
          <div className="px-3 py-2.5 rounded bg-white/5 text-sm font-extralight text-white/70">
            {cellTitle(selected.chapter, selected.verse)}
          </div>
        ) : (
          <div className="px-3 py-2.5 text-sm font-extralight text-white/20">
            Tap a cell to see details
          </div>
        )}
      </div>

      {/* Zero matches */}
      <h2 className="text-xl font-extralight mb-3">
        Times with no verse ({zeroMatches.length})
      </h2>
      <p className="text-white/60 font-extralight mb-5 leading-relaxed">
        These time slots have no matching verse in the Bible. Versetime shows a
        very short book description instead.
      </p>

      <h3 className="text-white/50 text-sm font-extralight mb-1">
        Top of every hour — 12 times
      </h3>
      <p className="text-white/40 text-sm font-extralight mb-6 leading-relaxed">
        Bible verses are numbered starting at 1. Verse 0 does not exist, so all
        twelve top-of-the-hour times (1:00 through 12:00) have zero matches.
      </p>

      {zeroMatchesHighMinute.length > 0 && (
        <>
          <h3 className="text-white/50 text-sm font-extralight mb-1">
            High-minute dead zones — {zeroMatchesHighMinute.length} times
          </h3>
          <p className="text-white/40 text-sm font-extralight mb-3 leading-relaxed">
            Some chapters in the Bible are short. When no book has a verse at
            that minute, the time slot is empty.
          </p>
          <div className="flex flex-wrap gap-2 mb-10">
            {zeroMatchesHighMinute.map(({ chapter, verse }) => (
              <span
                key={key(chapter, verse)}
                className="text-xs font-extralight text-white/50 bg-rose-900/40 rounded px-2 py-1"
              >
                {fmt(chapter, verse)}
              </span>
            ))}
          </div>
        </>
      )}

      {/* Single matches */}
      <h2 className="text-xl font-extralight mb-3">
        Times with only one verse ({singleMatches.length})
      </h2>
      <p className="text-white/60 font-extralight mb-5 leading-relaxed">
        These time slots have exactly one matching verse in the entire Bible. At
        these times, Versetime always shows the same book.
      </p>
      <table className="w-full text-sm font-extralight mb-12">
        <thead>
          <tr className="text-white/30 border-b border-white/10">
            <th className="text-left pb-2 font-extralight">Time</th>
            <th className="text-left pb-2 font-extralight">Only match</th>
          </tr>
        </thead>
        <tbody>
          {singleMatches.map(({ chapter, verse, matching_books }) => (
            <tr
              key={key(chapter, verse)}
              className="border-b border-white/5 hover:bg-white/5"
            >
              <td className="py-1.5 text-amber-500/80">
                {fmt(chapter, verse)}
              </td>
              <td className="py-1.5 text-white/60">{matching_books}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Two matches */}
      <h2 className="text-xl font-extralight mb-3">
        Times with exactly two verses ({twoMatches.length})
      </h2>
      <p className="text-white/60 font-extralight mb-5 leading-relaxed">
        These time slots match exactly two books. Versetime picks one at random
        each time.
      </p>
      <table className="w-full text-sm font-extralight mb-12">
        <thead>
          <tr className="text-white/30 border-b border-white/10">
            <th className="text-left pb-2 font-extralight">Time</th>
            <th className="text-left pb-2 font-extralight">Matches</th>
          </tr>
        </thead>
        <tbody>
          {twoMatches.map(({ chapter, verse, matching_books }) => (
            <tr
              key={key(chapter, verse)}
              className="border-b border-white/5 hover:bg-white/5"
            >
              <td className="py-1.5 text-blue-400/80">{fmt(chapter, verse)}</td>
              <td className="py-1.5 text-white/60">{matching_books}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Three matches */}
      <h2 className="text-xl font-extralight mb-3">
        Times with exactly three verses ({threeMatches.length})
      </h2>
      <p className="text-white/60 font-extralight mb-5 leading-relaxed">
        These time slots match exactly three books. Versetime picks one at
        random each time.
      </p>
      <table className="w-full text-sm font-extralight">
        <thead>
          <tr className="text-white/30 border-b border-white/10">
            <th className="text-left pb-2 font-extralight">Time</th>
            <th className="text-left pb-2 font-extralight">Matches</th>
          </tr>
        </thead>
        <tbody>
          {threeMatches.map(({ chapter, verse, matching_books }) => (
            <tr
              key={key(chapter, verse)}
              className="border-b border-white/5 hover:bg-white/5"
            >
              <td className="py-1.5 text-emerald-500/80">
                {fmt(chapter, verse)}
              </td>
              <td className="py-1.5 text-white/60">{matching_books}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
