import * as React from "react"
import { BrowserRouter, Routes, Route, useLocation } from "react-router"
import "./App.css"
import Time from './Time'
import Verse from './Verse'
import About from './About'
import Coverage from './Coverage'

function ScrollToTop() {
  const { pathname } = useLocation()
  React.useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
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
