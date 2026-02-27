import descriptions from "./assets/book-descriptions"

type BookDescription = [string, string]

const getRandomBookDescription = (): BookDescription =>
  descriptions[Math.floor(Math.random() * descriptions.length)]

const getSpecificBookDescription = (book: string): BookDescription | undefined =>
  descriptions.find((d) => d[0] === book)

const getBookDescription = (book?: string): BookDescription =>
  (book ? getSpecificBookDescription(book) : undefined) ?? getRandomBookDescription()

export default {
  getBookDescription,
}
