SELECT *
FROM bsb
WHERE
  book = :book
  AND chapter = :chapter
  AND verse = :verse;