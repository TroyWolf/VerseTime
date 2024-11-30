SELECT *
FROM bsb
WHERE
  book = :book
  AND chapter = :chapter
ORDER BY chapter;
