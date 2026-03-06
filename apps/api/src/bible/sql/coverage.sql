SELECT
  chapter,
  verse,
  COUNT(*) AS match_count,
  CASE WHEN COUNT(*) <= 3 THEN string_agg(book, ', ' ORDER BY book) END AS matching_books
FROM bsb
WHERE
  chapter BETWEEN 1 AND 12
  AND verse BETWEEN 1 AND 59
  AND scripture != ''
GROUP BY chapter, verse
ORDER BY chapter, verse;
