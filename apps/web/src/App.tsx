import { BrowserRouter, Routes, Route } from "react-router"
import "./App.css"
import Time from './Time'
import Verse from './Verse'
import About from './About'
import Coverage from './Coverage'

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Time />} />
          <Route path="/random/:chapter/:verse" element={<Time />} />
          <Route path="/verse/:book/:chapter/:verse" element={<Verse />} />
          <Route path="/about" element={<About />} />
          <Route path="/coverage" element={<Coverage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
