import helpers from "./helpers"

interface Props {
  book?: string
}

export default function BookDescription({ book }: Props) {
  const [bookName, description] = helpers.getBookDescription(book)
  return (
    <>
      <div className="pb-2 font-medium">{bookName}</div>
      <div className="pb-6 italic text-lg font-extralight">
        a short description
      </div>
      <div className="font-light">{description}</div>
    </>
  )
}
