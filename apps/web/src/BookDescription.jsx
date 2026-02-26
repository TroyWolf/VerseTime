/* eslint-disable react/prop-types */
import helpers from "./helpers"

export default function BookDescription(props) {
  const [book, description] = helpers.getBookDescription(props.book)
  return (
    <>
      <div className="pb-2 font-medium">{book}</div>
      <div className="pb-6 italic text-lg font-extralight">
        a short description
      </div>
      <div className="font-light">{description}</div>
    </>
  )
}
