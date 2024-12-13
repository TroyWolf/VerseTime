import { BrowserRouter, Routes, Route } from "react-router"
import "./App.css"
import Time from './Time'
import Verse from './Verse'

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Time />} />
          <Route path="/random/:chapter/:verse" element={<Time />} />
          <Route path="/verse/:book/:chapter/:verse" element={<Verse />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}