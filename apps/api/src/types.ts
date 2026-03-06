export interface Verse {
  id: number
  book: string
  chapter: number
  verse: number
  scripture: string
}

export interface ErrorResponse {
  code: number
}

export interface CoverageEntry {
  chapter: number
  verse: number
  match_count: number
  matching_books: string | null
}
