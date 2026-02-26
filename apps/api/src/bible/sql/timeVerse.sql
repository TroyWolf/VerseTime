SELECT *
FROM bsb
WHERE
  chapter = :chapter
  AND verse = :verse
  AND scripture != '';