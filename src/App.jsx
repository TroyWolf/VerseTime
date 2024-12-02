import { BrowserRouter, Routes, Route } from "react-router"
import "./App.css"
import Time from './Time'

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Time />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}