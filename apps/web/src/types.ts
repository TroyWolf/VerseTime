import { ReactNode } from 'react'

export interface Verse {
  id: number
  book: string
  chapter: number
  verse: number
  scripture: string
}

export interface VerseEntry {
  id?: number
  book?: string
  chapter: number
  verse: number | string
  scripture: string | ReactNode
  noVerse?: boolean
}
