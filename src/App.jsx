import { BrowserRouter, Routes, Route } from "react-router"
import "./App.css"
import Home from './Home'

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}