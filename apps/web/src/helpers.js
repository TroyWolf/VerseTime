import descriptions from "./assets/book-descriptions"

const getRandomBookDescription = () =>
  descriptions[Math.floor(Math.random() * descriptions.length)]

const getSpecificBookDescription = (book) =>
  descriptions.find((d) => d[0] === book)

const getBookDescription = (book) =>
  book ? getSpecificBookDescription(book) : getRandomBookDescription()

export default {
  getBookDescription,
}
